import request from './utils/request.js';
import urls from './common/urls.js';
//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    // wx.login({
    //   success: res => {
    //     const _ = this;
    //     // 登录成功向后台发送临时登录凭证code,并记录登录凭证
    //     if (res.errMsg === 'login:ok') {
    //       this.globalData.jscode = res.code;
    //       request(urls.sendLoginCode, {
    //         data: {
    //           jscode: res.code
    //         },
    //         success: function (res) {
    //           // 记录用户权限信息
    //           _.globalData.authorization = res.content;
    //         }
    //       });
    //     }
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //   }
    // })
    // 获取用户信息
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
  }
})