// pages/details/details.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: "杨经理",
    name2: "微金网",
    type: "房产",
    type2: "高级顾问",
    belong: '新房按揭服务,二手房按揭服务,房屋服务,经营性服务',
    activeIndex: 0, //当前展示的Tab项索引
    star: 0,
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
    typeList: [{
        name: "155****6567",
        result: '很满意',
        text: '打字沟通觉得很烦费劲,慢不说还说不清楚,电话服务还是挺方便的,有啥不清楚电话里几句说完,快速解决问题,给个好评',
        from: "2018年12月2日",
      },
      {
        name: "155****6567",
        result: '很满意',
        text: '打字沟通觉得很烦费劲,慢不说还说不清楚,电话服务还是挺方便的,有啥不清楚电话里几句说完,快速解决问题,给个好评',
        from: "2018年12月2日",
      },
      {
        name: "155****6567",
        result: '很满意',
        text: '打字沟通觉得很烦费劲,慢不说还说不清楚,电话服务还是挺方便的,有啥不清楚电话里几句说完,快速解决问题,给个好评',
        from: "2018年12月2日",
      },
      {
        name: "155****6567",
        result: '很满意',
        text: '打字沟通觉得很烦费劲,慢不说还说不清楚,电话服务还是挺方便的,有啥不清楚电话里几句说完,快速解决问题,给个好评',
        from: "2018年12月2日",
      },
    ],
  },

  // 导航点击事件
  navTabClick: function(e) {
    //console.log(e.currentTarget.id)
    this.setData({
      //sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },

  //关注事件
  allstar: function(e) {
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
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})