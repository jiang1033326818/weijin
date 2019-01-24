// pages/apply/apply.js
import request from '../../utils/request.js';
import urls from '../../common/urls.js';
var interval = null //倒计时函数
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: "4353",
    customItem: '全部',
    region: ['北京市', '北京市', '东城区'],
    array: ['上班族', '学生', '退休人员', '其他'],
    array2: ['现金发放', '储蓄卡',],
    array3: ['3', '6', '9', '12月以上'],
    array4: ['1-3年', '4-6年', '7-10年', '10年以上'],
    array5: ['国企', '外企', '创业公司', '私企(已上市)','私企(未上市)'],
    array6: ['是', '否',],
    array7: ['是', '否',],
    array8: ['1年以下', '1-3年','4-6年','7到10年','10年以上'],
    array9: ['全款', '贷款',],
    array10: ['是', '否',],
    index: 0,
    index2: 0,
    index3: 0,
    index4: 0,
    index5: 0,
    index6: 0,
    index7: 0,
    index8: 0,
    index9: 0,
    index10: 0,
    date: '2019-01-01',
    checked: true,
    time: '获取验证码', //倒计时 
    currentTime: 61,
    huoqu:"huoqu0",
    phone:'',
    phonecode:"",
    age:'',
    name:'',
  },




  getCode: function (options) {
    var that = this;
    var currentTime = that.data.currentTime;
    wx.request({
      url: urls.mainurl + urls.getcode+that.data.phone,
      method: 'GET',
      header: {
        "Cookie": 'JSESSIONID=' + wx.getStorageSync("sessionid")
      },
      data: {
      },
      success: function (response) {
        console.log(response)
        wx.showToast({
          title: '验证码发送成功',
          icon: 'none',
          duration: 2000
        })
      }
    })
    interval = setInterval(function () {
      currentTime--;
      that.setData({
        time: currentTime + '秒'
      })
      if (currentTime <= 0) {
        clearInterval(interval)
        that.setData({
          time: '重新发送',
          currentTime: 61,
          disabled: false
        })
      }
    }, 1000)
  },
  getVerificationCode() {
    if (this.data.phone == '' || this.data.phone.length<11){
      wx.showToast({
        title: '请填写正确的手机号',
        icon: 'none',
        duration: 2000
      })
    }else{
      this.getCode();
      var that = this
      that.setData({
        disabled: true
      })
    }
  },

  phone:function(e){
    this.setData({
      phone: e.detail.value
    })
  },

  phonecode: function (e) {
    this.setData({
      phonecode: e.detail.value
    })
  },


  name: function (e) {
    this.setData({
      name: e.detail.value
    })
  },

  age: function (e) {
    this.setData({
      age: e.detail.value
    })
  },

  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  bindPickerChange2: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index2: e.detail.value
    })
  },
  bindPickerChange3: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index3: e.detail.value
    })
  },
  bindPickerChange4: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index4: e.detail.value
    })
  },
  bindPickerChange5: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index5: e.detail.value
    })
  },
  bindPickerChange6: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index6: e.detail.value
    })
  },
  bindPickerChange7: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index7: e.detail.value
    })
  },
  bindPickerChange8: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index8: e.detail.value
    })
  },
  bindPickerChange9: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index9: e.detail.value
    })
  },
  bindPickerChange10: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index10: e.detail.value
    })
  },


  checked: function (e) {
    console.log(e)
    if (this.data.checked === true) {
      this.setData({
        checked: false
      })
    }
    else {
      this.setData({
        checked: true
      })
    }
  },
  subme: function (e) {
    let that = this;
    if (that.data.checked == false) {
      wx.showToast({
        title: '请同意《微金网入驻协议》',
        icon: 'none',
        duration: 2000
      })
    } else {
      if (that.data.phone === '' || that.data.phonecode === '' || that.data.name === '' || that.data.age === ''){
        wx.showToast({
          title: '请将您的信息填写完全',
          icon: 'none',
          duration: 2000
        })
      }else{
        wx.request({
          url: urls.mainurl + urls.checkmessagecode+that.data.phonecode,
          method: 'GET',
          header: {
            "Cookie": 'JSESSIONID=' + wx.getStorageSync("sessionid")
          },
          data: {
            
          },
          success: function (response) {
            console.log(response)
            wx.request({
              url: urls.mainurl + urls.londadd,
              method: 'POST',
              header: {
                "Cookie": 'JSESSIONID=' + wx.getStorageSync("sessionid")
              },
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
          },
          fail: function (err) {
            console.log(err)
            wx.showToast({
              title: '验证码错误',
              icon: 'none',
              duration: 2000
            })
          }
        })
       
      }
      
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