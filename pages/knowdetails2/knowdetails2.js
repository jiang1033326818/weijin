// pages/knowdetails2/knowdetails2.js
import request from '../../utils/request.js';
import urls from '../../common/urls.js';
import  html2json  from '../../pages/wxParse/html2json.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  //知识库id
  knoweldgeid: function () {
    let that = this;
    wx.request({
      url: urls.mainurl + urls.knowid + wx.getStorageSync("knowid0"),
      method: 'GET',
      header: {
        "Cookie": 'JSESSIONID=' + wx.getStorageSync("sessionid")
      },
      data: {
        // "pageNum": 0,
        // "pageSize": 10,
      },
      success: function (res) {
        console.log(res, 33)
        that.setData({
          knoweldgelist: res.data.data.content
        })
        // WxParse.wxParse('article', 'html', res.data.data.content, that, "1rpx");
      },
      fail: function (err) {
        console.log(err)

      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(wx.getStorageSync("knowid0"))
    // this.knoweldgeid();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.knoweldgeid();
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