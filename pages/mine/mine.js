// pages/mine/mine.js
import regs from '../../common/regs.js';
import request from '../../utils/request.js';
import urls from '../../common/urls.js';
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {}, // 用户信息
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },
 //联系客服
 left1:function(e){
   wx.setStorageSync("uid", "14")
   wx.navigateTo({
     url: '../clues/clues'
   });
 },
  aboutus:function(){
    wx.navigateTo({
      url:'../adviser/adviser'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    if (e.detail.userInfo) {
      app.globalData.userInfo = e.detail.userInfo
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })
    } else {
      wx.showToast({
        icon: 'none',
        title: '获取用户信息失败',
      })
    }
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
  
   loginout: function () {
     wx.redirectTo({
       url: '../login/login'
     })
  },
  aboutus: function () {
    wx.navigateTo({
      url: '../adviser/adviser'
    });
  },
  toadviser:function(){
    let a = wx.getStorageSync("expert")
    if(a==="-1"||a==="null"){
      wx.navigateTo({
        url: '../adviser/adviser'
      });
    }else{
      wx.navigateTo({
        url: '../schedule/schedule'
      });
    }
   
  },
   toconsu: function () {
    console.log(444)
    wx.navigateTo({
      url: '../consultant/consultant'
    });
  },
  tocooperation:function(){
    wx.navigateTo({
      url: '../cooperation/cooperation'
    });
  },

})