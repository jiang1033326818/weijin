import request from './utils/request.js';
import urls from './common/urls.js';
// var WxParse = require('../../wxParse/wxParse.js');
// import requese from './wxParse/wxParse.js';
//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    authorization: '',
    jscode: '',
    userInfo: null
  },
  //记录打电话
  phoneit:function (e) {
      console.log(e)
  },

  //记录聊天
   chatit: function (e) {
    console.log("聊天")
  }





})