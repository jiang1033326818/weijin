// pages/adviser/adviser.js
import request from '../../utils/request.js';
import urls from '../../common/urls.js';

Page({
  /**
   * 页面的初始数据
   */
  data: {
    address:"4353",
    customItem: '全部',
    region: ['北京市', '北京市', '东城区'],
    array: ['上班族', '学生', '退休人员', '其他'],
    index: 0,
    date: '2019-01-01',
    checked:true,
    danwei:"",
  },



  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },

  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },

  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },

  danwei:function (e){
    this.setData({
      danwei: e.detail.value
    })
  },




  chooseImage: function () {
    var that = this;
    console.log('aaaaaaaaaaaaaaaaaaaa')

    wx.chooseImage({
     // count: this.data.count[this.data.countIndex],
      success: function (res) {
        //缓存下 
        wx.showToast({
          title: '正在上传...',
          icon: 'loading',
          mask: true,
          duration: 2000,
          success: function (ress) {
            console.log('成功加载动画');
          }
        })

        wx.getFileSystemManager().readFile({
          filePath: res.tempFilePaths[0], //选择图片返回的相对路径
          encoding: 'base64', //编码格式
          success: res => { //成功的回调
            that.setData({
              image0: 'data:image/png;base64,' + res.data
            })
            console.log('data:image/png;base64,' + res.data)
          }
        })
      

        console.log(res)
        that.setData({
          imageList: res.tempFilePaths
        })
        //获取第一张图片地址 
        var filep = res.tempFilePaths[0]
        //向服务器端上传图片 
       
     
      }
    })
  },
  previewImage: function (e) {
    var current = e.target.dataset.src

    wx.previewImage({

      current: current,
      urls: this.data.imageList
    })
  },


  chooseImage2: function () {
    var that = this;
    console.log('aaaaaaaaaaaaaaaaaaaa')

    wx.chooseImage({
      // count: this.data.count[this.data.countIndex],
      success: function (res) {
        console.log('ssssssssssssssssssssssssss')
        //缓存下 
        wx.showToast({
          title: '正在上传...',
          icon: 'loading',
          mask: true,
          duration: 2000,
          success: function (ress) {
            console.log('成功加载动画');
          }
        })

        wx.getFileSystemManager().readFile({
          filePath: res.tempFilePaths[0], //选择图片返回的相对路径
          encoding: 'base64', //编码格式
          success: res => { //成功的回调
            that.setData({
              image1: 'data:image/png;base64,' + res.data
            })
            console.log('data:image/png;base64,' + res.data)
          }
        })

        that.setData({
          imageList2: res.tempFilePaths
        })
        //获取第一张图片地址 
        var filep = res.tempFilePaths[0]
        //向服务器端上传图片 
        // getApp().data.servsers,这是在app.js文件里定义的后端服务器地址 
        wx.uploadFile({
          url: getApp().data.servsers + '/weixin/wx_upload.do',
          filePath: filep,
          name: 'file',
          formData: {
            'user': 'test'
          },
          success: function (res) {
            console.log(res)
            console.log(res.data)
            var sss = JSON.parse(res.data)
            var dizhi = sss.dizhi;
            //输出图片地址 
            console.log(dizhi);
            that.setData({
              "dizhi": dizhi
            })

            //do something  
          }, fail: function (err) {
            console.log(err)
          }
        });
      }
    })
  },
  previewImage2: function (e) {
    var current2 = e.target.dataset.src

    wx.previewImage({

      current2: current2,
      urls: this.data.imageList2
    })
  },


  checked:function(e){
        console.log(e)
    if (this.data.checked ===true) {
      this.setData({
        checked:false
      })
    }
    else {
      this.setData({
        checked: true
      })
    }
  },
  subme:function(e){
    let that=this;
    if(that.data.checked==false){
      wx.showToast({
        title: '请同意《微金网入驻协议》',
        icon: 'none',
        duration: 2000
      })
    } else{
      wx.request({
        url: urls.mainurl + urls.useradd,
        method: 'POST',
        data: {
          "area": "string",
          "avatarUrl": that.data.image0,
          "business": that.data.array[that.data.index],
          "checkCode": "string",
          "city": that.data.region[2],
          "company": that.data.danwei,
          "companyImage": "string",
          "country": "string",
          "employment": that.data.image1,
          "gender": 0,
          "joinTime": that.data.date,
          "hashCode": "string",
          "language": "string",
          "mobile": "string",
          "name": "string",
          "nikeName": "string",
          "openid": "string",
          "pageNum": 0,
          "pageSize": 0,
          "password": "string",
          "personImage": that.data.image0,
          "province": "string",
          "unionid": "tom"
        },
        success: function (response) {
          console.log(response)
        }
      })
    } 
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})