// pages/details/details.js
import urls from '../../common/urls.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // name: "杨经理",
    // name2: "微金网",
    // type: "房产",
    // type2: "高级顾问",
    belong: '新房按揭服务,二手房按揭服务,房屋服务,经营性服务',
    activeIndex: 0, //当前展示的Tab项索引
    star: 0,
    id: '',
    //顾问详情
    useradviceid: '',
    getguesttalk: [],
    tabs: [{
      name: "全部",
      value: 1231
    },
    {
      name: "很满意",
      value: 1231
    },
    {
      name: "满意",
      value: 1231
    },
    {
      name: "不满意",
      value: 1231
    },
    ],
    subscribe: "http://zadai.net:8000/uploads/star.png",
    subscribe2: "http://zadai.net:8000/uploads/starlight.png",
    message: "关注",
    message2: "已关注",

  },

  // 导航点击事件
  navTabClick: function (e) {
    //console.log(e.currentTarget.id)
    this.setData({
      //sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },

  //关注事件
  allstar: function (e) {
    if (this.data.star === 0) {
      this.setData({
        //sliderOffset: e.currentTarget.offsetLeft,
        star: 1
      });
    } else {
      this.setData({
        //sliderOffset: e.currentTarget.offsetLeft,
        star: 0
      });
    }

    wx.request({
      // url: urls.mainurl + urls.consulatanturl + wx.getStorageSync("mid"),
      url: urls.mainurl + urls.interesting + wx.getStorageSync("mid"),
      method: 'GET',
      header: {
        "Cookie": 'JSESSIONID=' + wx.getStorageSync("sessionid")
      },
      data: {

      },
      success: function (e) {
        console.log(e, "999成功")
        wx.showToast({
          title: e.data.data.message,  //标题
          icon: 'success',  //图标，支持"success"、"loading"

          duration: 1000, //提示的延迟时间，单位毫秒，默认：1500
          mask: false,  //是否显示透明蒙层，防止触摸穿透，默认：false
          success: function () { }, //接口调用成功的回调函数
          fail: function () { },  //接口调用失败的回调函数
          complete: function () { } //接口调用结束的回调函数
        })
      },
      fail: function (err) {
        console.log(err)
      }
    })
  },

  // 打电话事件
  callphone: function (e) {
    getApp().phoneit(e.currentTarget.dataset.id)

    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.num
      //仅为示例，并非真实的电话号码
    })
  },

  //咨询事件跳转页面
  bottombtn: function (e) {
    getApp().chatit(e.currentTarget.dataset.id,e.currentTarget.dataset.img)
    console.log(e,444)
    // wx.getStorageSync("mid")
    // wx.setStorageSync("askid", data)
    wx.setStorageSync("tootherId", this.data.useradviceid.uid)
    wx.navigateTo({
      url: '../clues/clues'
    });
  },
  //顾问详情
  useradvice: function () {
    let that = this;
    wx.request({
      // url: urls.mainurl + urls.consulatanturl + wx.getStorageSync("mid"),
      url: urls.mainurl + urls.consulatanturl + wx.getStorageSync("mid"),
      method: 'GET',
      header: {
        "Cookie": 'JSESSIONID=' + wx.getStorageSync("sessionid")
      },
      data: {
        "pageNum": 0,
        "pageSize": 10,
      },
      success: function (e) {
        console.log(e, "成功")
        that.setData({
          // id: currentTarget.dataset.manger,
          // id:wx.getStorageSync("mid"),
          useradviceid: e.data.data,
          star: e.data.data.attention === false ? 0 : 1
        })
      },
      fail: function (err) {
        console.log(err)
      }
    })
  },
  //客户评价接口
  guesttalk: function () {
    let that = this;
    wx.request({
      url: urls.mainurl + urls.assessment,
      method: 'POST',
      header: {
        "Cookie": 'JSESSIONID=' + wx.getStorageSync("sessionid")
      },
      data: {
        "pageNum": 0,
        "pageSize": 10,
      },
      success: function (e) {
        console.log(e, "77")
        that.setData({
          // id: currentTarget.dataset.manger,
          // id:wx.getStorageSync("mid"),
          getguesttalk: e.data.data.dataList
            
        })
      },
      fail: function (err) {
        console.log(err)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.useradvice();
    this.guesttalk();
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