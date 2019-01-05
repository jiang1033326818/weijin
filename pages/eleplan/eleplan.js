// pages/eleplan/eleplan.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    seller: {},
    title: '企业尊享购电方案',
    centerTip: '试算一下，一个月净赚多少电费',
    showResult: false,
    totalFee: 53802.32,
    powerNum: 0,
    priceDiff: 0.02, // 差价
    company: '',
  },

  // 公司输入改变事件
  companyChange: function(e) {
    const { value } = e.detail;
    this.setData({
      company: value,
    })
  },

  // 用电量输入改变事件
  powerChange: function (e) {
    const { value } = e.detail;
    this.setData({
      powerNum: value,
    })
  },

  // 计算节省电费
  compute: function () {
    const { company, powerNum, priceDiff } = this.data;
    let errorMsg = '';
    if (!company) {
      errorMsg = '请输入公司名称';
    }
    if (!powerNum || powerNum <= 0) {
      errorMsg = '请输入电量';
    }
    if (errorMsg) {
      wx.showToast({
        title: errorMsg,
        icon: 'none'
      })
    } else {
      wx.showLoading({
        title: '加载中',
      });
      const totalFee = Number(powerNum)*priceDiff*10000;
      setTimeout(() => {
        this.setData({
          title: company + ' 专属购电方案',
          centerTip: '竭诚为您提供专业购电服务',
          totalFee: totalFee.toLocaleString(),
          showResult: true,
        })
        wx.hideLoading();
      }, 2000);
    }
  },

  // 分享给朋友
  onShareAppMessage: function (obj) {
    const { seller } = this.data;
    return {
      title: '售电易',
      path: '/pages/eleplan/eleplan?param=' + JSON.stringify({
        ...seller,
      }),
      success: function() {
        wx.showToast({
          title: '分享成功',
        })
      },
      fail: function() {
        wx.showToast({
          title: '分享失败',
          icon: 'none'
        })
      }
    }
  },

  // 跳转到预约页面
  toBespeak: function() {
    const { company, powerNum, seller } = this.data;
    console.log(JSON.stringify({
      ...seller, company, powerNum
    }));
    wx.navigateTo({
      url: '../bespeak/bespeak?param=' + JSON.stringify({
        ...seller, company, powerNum
      }),
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const param = JSON.parse(options.param);
    this.setData({
      seller: {...param},
    });
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
})