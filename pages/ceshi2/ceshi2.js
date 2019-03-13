Page({

  /**
   * 页面的初始数据
   */
  newsList: [],
  input: null,
  openid: null,
  data: {
  //  indicatorDots: true,  //小点
  //  autoplay: true,  //是否自动轮播
  //  interval: 3000,  //间隔时间
  //  duration: 1000,  //滑动时间
  //  display: "block",

  // newsindicatordots: false,  //小点
  // newsindicatorDots: false,  //小点
  //  newsautoplay:false,  //是否自动轮播
  //  newsinterval: 3000,  //间隔时间
  //  newsduration: 1000,  //滑动时间autoplay: true,  //是否自动轮播
  
    // swiperImgs:[
    //   {
    //     url: 'http://zadai.net:8000/uploads/image001.jpg'
    // },
    //   {
    //     url: 'http://zadai.net:8000/uploads/image002.jpg'
    //   },
    //   {
    //     url: 'http://zadai.net:8000/uploads/image003.jpg'
    //   }
         
    // ],
    // currentTab: 0,
    // swichNav: function (e) {

    //   console.log(e);

    //   var that = this;

    //   if (this.data.currentTab === e.target.dataset.current) {

    //     return false;

    //   } else {

    //     that.setData({

    //       currentTab: e.target.dataset.current,

    //     })

    //   }

    // },

    // swiperChange: function (e) {

    //   console.log(e);

    //   this.setData({

    //     currentTab: e.detail.current,

    //   })
    // }
    // firstNav=[
    //   {
    //     name: "产品中心",
    //   },
    //   {
    //     name: "知识库"
    //   }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    wx.getStorage({
      key: 'OPENID',
      success: function (res) {
        _this.setData({
          openid: res.data
        })
      },
    })
    var _this = this;
    //建立连接
    wx.connectSocket({
      url: 'wss://zadai.net/ws/im?uid=' + _this.data.openid + "/" + options.to,
    })

    //连接成功
    wx.onSocketOpen(function () {
      console.log('连接成功');
    })
    wx.onSocketMessage(function (res) {

      var list = [];
      list = _this.data.newsList;
      var _data = JSON.parse(res.data);

      list.push(_data);
      console.log(list)
      _this.setData({
        newsList: list
      })

    })
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
    
  },
  send: function () {
    var _this = this;
    if (_this.data.input) {
      wx.sendSocketMessage({
        data: _this.data.input,
      })
      var list = [];
      list = this.data.newsList;
      var temp = { 'message': _this.data.input, 'date': utils.formatTime(new Date()), type: 1 };
      list.push(temp);
      this.setData({
        newsList: list,
        input: null
      })
    }

  },
  bindChange: function (res) {
    this.setData({
      input: res.detail.value
    })
  },
  back: function () {
    wx.closeSocket();
    console.log('连接断开');
  }
})

