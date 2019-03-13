// pages/knowdetails/knowdetails.js
import request from '../../utils/request.js';
import urls from '../../common/urls.js';
// import request from '../../wxParse/wxParse.js';
// var WxParse = require('../../wxParse/wxParse.js');
var app = getApp();
var WxParse = require('../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    motto: 'jxcat',
    serverUrl: app.globalData.ajaxUrl,
    baseUrl: app.globalData.baseUrl,
    title: "文章详情",
    article_title: "",
    article_content: "",

    getknowtype: [],
    getknowid: [],
    id:''
    
  },
//通过wxParse设置样式
  onLoad: function () {
    var that = this;
    wx.request({
      url: '',
      method: 'POST',
      data: {
        'id': 13
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        var article = res.data[0].post;
        WxParse.wxParse('article', 'html', article, that, 5);
      }
    })
    this.setData({
      id: wx.getStorageSync("knowid0")})

  },

  //获取知识库的内容

  //获取知识库类型(type)
  knowtype: function () {
    let that = this;
    wx.request({
      url: urls.mainurl + urls.knowtype,
      method: 'GET',
      header: {
        "Cookie": 'JSESSIONID=' + wx.getStorageSync("sessionid")
      },
      data: {
        // "pageNum": 0,
        // "pageSize": 10,

      },
      success: function (res) {
        console.log(res)
        // console.log(7777777777777777777777)
        for (let i in res.data.data.dataList) {
          getknowtype.push(rese.data.data.dataList[i])
          if (res.data.data.dataList[i] !== null) {
            that.setData({
              getknowtype: res.data.data.dataList
            })
          } else {
            getknowtype: res.data.data.dataList[i] = null
          }
        }
      },
      fail: function (err) {
        console.log(err)

      }
    })
  },

  //知识库id
  knoweldgeid: function () {
    let that = this;
    wx.request({
      url: urls.mainurl + urls.knowid+wx.getStorageSync("knowid0"),
      method: 'GET',
      header: {
        "Cookie": 'JSESSIONID=' + wx.getStorageSync("sessionid")
      },
      data: {
        // "pageNum": 0,
        // "pageSize": 10,
      },
      success: function (res) {
        console.log(res,33)
      },
      fail: function (err) {
        console.log(err)

      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  // onLoad: function (options) {


     

  //     })
  // },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log(wx.getStorageSync("knowid0"))
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.knoweldgeid()
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