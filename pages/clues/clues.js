import regs from '../../common/regs.js';
import request from '../../utils/request.js';
import urls from '../../common/urls.js';

var app = getApp();
var socketOpen = false;
var frameBuffer_Data, session, SocketTask;
var url = 'ws://zadai.net:8000/ws/im?uid=';
// console.log(wx.getStorageSync("uid"))
var upload_url = '请填写您的图片上传接口地址'
Page({
  data: {
    user_input_text: '',//用户输入文字
    inputValue: '',
    returnValue: '',
    addImg: false,
    //格式示例数据，可为空
    allContentList: [],
    num: 0,
    uid:'',
    userInfo:{},
  },
  // 页面加载
  onLoad: function () {
    //首先获取聊天记录并加载
    




    wx.request({
      url: urls.mainurl + urls.getHistoryMessage,
      method: 'GET',
      header: {
        "Cookie": 'JSESSIONID=' + wx.getStorageSync("sessionid")
      },
      data: {
        pageNum:0,
        pageSize:10,
        uid: wx.getStorageSync("tootherId")
      },
      success: function (response) {
        console.log(response,'聊天记录')
      }
    })


    wx.getUserInfo({
      success: res => {
        app.globalData.userInfo = res.userInfo
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
    this.setData({
      uid: wx.getStorageSync("uid"),
      toId: wx.getStorageSync("tootherId")
    })
    console.log(111,wx.getStorageSync("uid"))
    this.bottom();
  },
  onShow: function (e) {
    console.log(222, wx.getStorageSync("uid"))
    if (!socketOpen) {
      this.webSocket()
    }

    var that = this;
    SocketTask.onOpen(res => {
      socketOpen = true;
      console.log('监听 WebSocket 连接打开事件。', res)
    })
    SocketTask.onClose(onClose => {
      console.log('监听 WebSocket 连接关闭事件。', onClose)
      socketOpen = false;
      this.webSocket()
    })
    SocketTask.onError(onError => {
      console.log('监听 WebSocket 错误。错误信息', onError)
      socketOpen = false
    })
    SocketTask.onMessage(onMessage => {
      console.log('监听WebSocket接受到服务器的消息事件。服务器返回的消息', JSON.parse(onMessage.data))
      console.log(this.data)
      var onMessage_data = JSON.parse(onMessage.data)
      if (onMessage_data.toId == this.data.uid) {
      
        if (onMessage_data.text.slice(0, 9) =="/uploads/"){
          that.data.allContentList.push({ is_ai: true, is_twoimg: urls.mainurl +onMessage_data.text });
          that.setData({
            allContentList: that.data.allContentList,
          })
        }else{
          that.data.allContentList.push({ is_ai: true, is_two: onMessage_data.text });
          that.setData({
            allContentList: that.data.allContentList,
          })
        }

      
        that.bottom()
      }
    })
   
  },
  // 页面加载完成
  onReady: function () {
    wx.setNavigationBarTitle({
      title: wx.getStorageSync("name")
    })
  },
  webSocket: function () {
    // 创建Socket
    SocketTask = wx.connectSocket({
      header:{
        "Cookie":'JSESSIONID='+wx.getStorageSync("sessionid")
      },
      url: url+this.data.uid,
      data: this.data.uid,
      method: 'get',
      success: function (res) {
        console.log('WebSocket连接创建', res)
      },
      fail: function (err) {
        wx.showToast({
          title: '网络异常！',
        })
        console.log(err)
      },
    })
  },

  // 提交文字
  submitTo: function (e) {
    let that = this;
    console.log(that.data)
    var data = {
      text: that.data.inputValue,
      fromId: that.data.uid,
      fromName: that.data.userInfo.nickName,
      toId:that.data.toId,
    }
    console.log(that.data.inputValue)
  
      // 如果打开了socket就发送数据给服务器
      sendSocketMessage(data)
      this.data.allContentList.push({ is_my: { text: this.data.inputValue+"\n" } });
      this.setData({
        allContentList: this.data.allContentList,
        inputValue: '',
         scrollTop: 1000000
      })
 
      that.bottom()
    
  },
  bindKeyInput: function (e) {
    this.setData({
      inputValue: e.detail.value
    })
  },

  onHide: function () {
    SocketTask.close(function (close) {
      console.log('关闭 WebSocket 连接。', close)
    })
  },
  upimg: function () {
    var that = this;
    wx.chooseImage({
      count: 1, 
       sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        console.log(res)
        

        wx.uploadFile({
          url: urls.mainurl + urls.uploadimg, // 仅为示例，非真实的接口地址
          filePath: res.tempFilePaths[0],
          name: 'file',
          formData: {
            //user: 'test'
          },
          success(response) {
            that.webSocket()
            console.log(JSON.parse(response.data))
            // do something
            var data = {
              text: '/uploads/' + JSON.parse(response.data).data,
              fromId: that.data.uid,
              fromName: that.data.userInfo.nickName,
              toId: that.data.toId,
            }

            setTimeout(function () {
              sendSocketMessage(data)
            }, 1000);

          

          
            that.data.allContentList.push({ is_my: { img: res.tempFilePaths } });
            that.setData({
              allContentList: that.data.allContentList,
            })
            that.bottom();
            SocketTask.onMessage(onMessage => {
              console.log('监听WebSocket接受到服务器的消息事件。服务器返回的消息', JSON.parse(onMessage.data))
              var onMessage_data = JSON.parse(onMessage.data)
              if (onMessage_data) {
               
                if (onMessage_data.text.slice(0, 9) == "/uploads/") {
                  that.data.allContentList.push({ is_ai: true, is_twoimg: urls.mainurl + onMessage_data.text });
                  that.setData({
                    allContentList: that.data.allContentList,
                  })
                } else {
                  that.data.allContentList.push({ is_ai: true, is_two: onMessage_data.text });
                  that.setData({
                    allContentList: that.data.allContentList,
                  })
                }
                that.bottom()
              }else{
                console.log("接收失败")
              }
            })

            
          }
        })
       
        //console.log(111,res.tempFilePaths)
        // wx.getFileSystemManager().readFile({
        //   filePath: res.tempFilePaths[0], //选择图片返回的相对路径
        //   encoding: 'base64', //编码格式
        //   success: res2 => { //成功的回调
        //     data.text = 'data:image/png;base64,' + res2.data
        //     //console.log(data.text)
        //     sendSocketMessage(data)
        //   }
        // })
       
      },
    
    })
  },
  addImg: function () {
    this.setData({
      addImg: !this.data.addImg
    })

  },
  // 获取hei的id节点然后屏幕焦点调转到这个节点  
  bottom: function () {
    var that = this;
    this.setData({
      scrollTop: 1000000
    })
  },
})

//通过 WebSocket 连接发送数据，需要先 wx.connectSocket，并在 wx.onSocketOpen 回调之后才能发送。
function sendSocketMessage(msg) {
  var that = this;
  console.log('通过 WebSocket 连接发送数据', JSON.stringify(msg))
  
  SocketTask.send({
    data: JSON.stringify(msg)
  }, function (res) {
    console.log('已发送', res)
  })
}