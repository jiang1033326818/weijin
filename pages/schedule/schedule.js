// pages/expert/expert.js
import regs from '../../common/regs.js';
import request from '../../utils/request.js';
import urls from '../../common/urls.js';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    typeList: [
      {
      name: '张雄辉',
      time: '5分钟前',
      content:"呵呵",
      num:"5",
      img:"../../images/header/head0.jpg"
    },
      {
        name: '李易峰',
        time: '5分钟前',
        content: "reuiytdsfsldf!",
        num: "5",
        img: "../../images/header/head2.jpg"
      },
      {
        name: '恩柔',
        time: '5分钟前',
        content: "你麻sdfsdf!",
        num: "5",
        img: "../../images/header/head0.jpg"
      },
      {
        name: '张雄辉',
        time: '5分钟前',
        content: "呵呵",
        num: "5",
        img: "../../images/header/head0.jpg"
      },
      {
        name: '张雄辉',
        time: '5分钟前',
        content: "呵呵",
        num: "5",
        img: "../../images/header/head0.jpg"
      },
      {
        name: '张雄辉',
        time: '5分钟前',
        content: "呵呵",
        num: "5",
        img: "../../images/header/head0.jpg"
      },
     ]
  },


  //跳转到聊天
  toclues:function(e){
    wx.navigateTo({
      url: '../clues/clues'
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