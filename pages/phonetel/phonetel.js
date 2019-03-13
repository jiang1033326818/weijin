// pages/phonetel/phonetel.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hidden: true,
    nocancel: false,
    // text:"这是一个页面"
    actionSheetHidden: true,
    actionSheetItems: [
      { bindtap: 'Menu1', txt: '房产' },
      { bindtap: 'Menu2', txt: '车产' },
      { bindtap: 'Menu3', txt: '信用卡' },
      { bindtap: 'Menu4', txt: '极速服务' },
      { bindtap: 'Menu5', txt: '工资流水' },
      { bindtap: 'Menu6', txt: '福利1服务' },
      { bindtap: 'Menu7', txt: '营业执照' },
      { bindtap: 'Menu8', txt: '福利2' },
      // { bindtap: 'Menu9', txt: '微粒贷' },
    ],
    typeList: [{
      name: "155****6567",
      result: '很满意',
      text: '打字沟通觉得很烦费劲,慢不说还说不清楚,电话服务还是挺方便的,有啥不清楚电话里几句说完,快速解决问题,给个好评',
      from: "微金网 王经理",
    }, 
      {
        name: "155****6567",
        result: '很满意',
        text: '打字沟通觉得很烦费劲,慢不说还说不清楚,电话服务还是挺方便的,有啥不清楚电话里几句说完,快速解决问题,给个好评',
        from: "微金网 王经理",
      }, 
      {
        name: "155****6567",
        result: '很满意',
        text: '打字沟通觉得很烦费劲,慢不说还说不清楚,电话服务还是挺方便的,有啥不清楚电话里几句说完,快速解决问题,给个好评',
        from: "微金网 王经理",
      }, 
      {
        name: "155****6567",
        result: '很满意',
        text: '打字沟通觉得很烦费劲,慢不说还说不清楚,电话服务还是挺方便的,有啥不清楚电话里几句说完,快速解决问题,给个好评',
        from: "微金网 王经理",
      }, 
    ],
    menu: ''
  },
  actionSheetTap: function () {
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden
    })
  },
  actionSheetbindchange: function () {
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden
    })
  },
  bindMenu1: function (i) {
    console.log(i)
    this.setData({
      menu: i._relatedInfo.anchorRelatedText,
      actionSheetHidden: !this.data.actionSheetHidden
    })
  },
  bindMenu2: function (i) {
    console.log(i)
    this.setData({
      menu: i._relatedInfo.anchorRelatedText,
      actionSheetHidden: !this.data.actionSheetHidden
    })
  },
  bindMenu3: function (i) {
    console.log(i)
    this.setData({
      menu: i._relatedInfo.anchorRelatedText,
      actionSheetHidden: !this.data.actionSheetHidden
    })
  },
  bindMenu4: function (i) {
    console.log(i)
    this.setData({
      menu: i._relatedInfo.anchorRelatedText,
      actionSheetHidden: !this.data.actionSheetHidden
    })
  },
  bindMenu5: function (i) {
    console.log(i)
    this.setData({
      menu: i._relatedInfo.anchorRelatedText,
      actionSheetHidden: !this.data.actionSheetHidden
    })
  },
  bindMenu6: function (i) {
    console.log(i)
    this.setData({
      menu: i._relatedInfo.anchorRelatedText,
      actionSheetHidden: !this.data.actionSheetHidden
    })
  },
  bindMenu7: function (i) {
    console.log(i)
    this.setData({
      menu: i._relatedInfo.anchorRelatedText,
      actionSheetHidden: !this.data.actionSheetHidden
    })
  },
  bindMenu8: function (i) {
    console.log(i)
    this.setData({
      menu: i._relatedInfo.anchorRelatedText,
      actionSheetHidden: !this.data.actionSheetHidden
    })
  },
  bindMenu9: function (i) {
    console.log(i)
    this.setData({
      menu: i._relatedInfo.anchorRelatedText,
      actionSheetHidden: !this.data.actionSheetHidden
    })
  },

  cancel: function () {
    this.setData({
      hidden: true
    });
  },
  confirm: function () {
    this.setData({
      hidden: true
    });
  },
  gogogo:function(){
    this.setData({
      hidden: false
    });
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