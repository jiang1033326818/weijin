import urls from '../../common/urls.js';
import request from '../../utils/request.js';
// pages/bespeak/bespeak.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    param: {},
    name: '', // 购电联系人姓名
    mobile: '', // 购电联系人手机
    suggest: '', // 意见及建议
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const param = JSON.parse(options.param);
    this.setData({
      param,
    });
  },

  // 用户姓名改变
  nameChange: function(e) {
    const { value } = e.detail;
    this.setData({
      name: value,
    });
  },

  // 电话输入改变事件
  mobileChange: function (e) {
    const { value } = e.detail;
    this.setData({
      mobile: value,
    });
  },

  // 意见及建议输入
  suggestChange: function (e) {
    const { value } = e.detail;
    this.setData({
      suggest: value,
    });
  },

  // 公司改变事件
  companyChange: function(e) {
    const { value } = e.detail;
    this.setData({
      seller: { ...seller, company: value }
    });
  },

  // 电量改变事件
  powerChange: function (e) {
    const { value } = e.detail;
    this.setData({
      seller: { ...seller, powerNum: value }
    });
  },

  // 提交
  submit: function() {
    const { param, name, mobile, suggest } = this.data;
    let errMsg = '';
    if (!mobile) {
      errMsg = '请输入您的电话';
    }
    if (!name) {
      errMsg = '请输入您的姓名';
    }
    if (errMsg) {
      wx.showToast({
        title: errMsg,
        icon: 'none'
      });
    } else {// 提交预约申请，生成一条私有线索
      request(urls.submitClueUrl, {
        method: 'POST',
        data: {
          companyName: param.company,
          createBy: param.id,
          contactName: name,
          contactMobile: mobile,
          power: param.powerNum,
          remark: suggest,
          tenantId: param.tenantId,
          type: 'PRIVATE',
          tenantName: param.tenantName
        },
        success: function(res) {
          if(res.code === 0) {
            wx.showToast({
              title: '预约成功',
            })
          } else {
            wx.showToast({
              title: res.message,
              icon: 'none'
            })
          }
        }
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
  
  }
})