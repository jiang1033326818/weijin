// pages/phonetel/phonetel.js
import urls from '../../common/urls.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    menu2:'',
    hidden: true,
    nocancel: false,
    index:0,
    actionSheetHidden: true,
    actionSheetItems: ['房产', '车产', '信用卡', '急速服务', '工资流水', '福利服务', '营业执照', '福利','微粒贷'],
    actionnum: {txt:'房产',key:0},
   righttype: ['上班族', '学生', '退休人员', '无业人员'],
    typeList: [{
      name: "155****6567",
      result: '很满意',
      text: '打字沟通觉得很烦费劲,慢不说还说不清楚,电话服务还是挺方便的,有啥不清楚电话里几句说完,快速解决问题,给个好评',
      from: "微金网 石经理",
    }, 
      {
        name: "180****4876",
        result: '满意',
        text: '这个客服服务态度很好,非常耐心的解答我的疑问,给她的专业态度和服务点个赞',
        from: "微金网 姜经理",
      }, 
      {
        name: "139****5639",
        result: '很满意',
        text: '微金的客服态度是非常好的，正面回答你的问题，不会问你一些无关的问题,一直到你没有疑问为止',
        from: "微金网 张经理",
      }, 
      {
        name: "155****6567",
        result: '很满意',
        text: '先感谢一下我的客服经过10多分钟的沟通,解决了我所有的疑惑,从客户的工作态度能看出来这个公司非常靠谱',
        from: "微金网 王经理",
      }, 
    ],
    menu: '',
    // servetype: '',
    phonenum:'',
    getgo:'',
  },
  //服务类型
//   servetype1:function(e){
//     wx.getStorageSync("itemnum", e.actionSheetItems.key)
//     console.log("itemnum"),
//   this.setData({
//     servetype:e.menu
//  })
//   },
    //接听手机
  phoneint: function (e) {
console.log(e,"接听手机")
this.setData({
  phonenum:e.detail.value
})
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
  // bindMenu1: function (i) {
  //   console.log(i)
  //   this.setData({
  //     menu: i._relatedInfo.anchorRelatedText,
  //     menu2: i.currentTarget.dataset.itemnum2,
     
  //           actionSheetHidden: !this.data.actionSheetHidden,
            
               
  //     actionSheetHidden: !this.data.actionSheetHidden
  //   })
  // },
  // bindMenu2: function (i) {
  //   console.log(i)
  //   this.setData({
  //     menu: i._relatedInfo.anchorRelatedText.itemnum,
  //     menu2: i.currentTarget.dataset.itemnum2,
  //     actionSheetHidden: !this.data.actionSheetHidden
  //   })
  // },
  // bindMenu3: function (i) {
  //   console.log(i)
  //   this.setData({
  //     menu: i.currentTarget.dataset.itemnum,
  //     menu2: i.currentTarget.dataset.itemnum2,
  //     actionSheetHidden: !this.data.actionSheetHidden
  //   })
  // },
  // bindMenu4: function (i) {
  //   console.log(i)
  //   this.setData({
  //     menu: i.currentTarget.dataset.itemnum,
  //     menu2: i.currentTarget.dataset.itemnum2,
  //     actionSheetHidden: !this.data.actionSheetHidden
  //   })
  // },
  // bindMenu5: function (i) {
  //   console.log(i)
  //   this.setData({
  //     menu: i.currentTarget.dataset.itemnum,
  //     menu2: i.currentTarget.dataset.itemnum2,
  //     actionSheetHidden: !this.data.actionSheetHidden
  //   })
  // },
  // bindMenu6: function (i) {
  //   console.log(i)
  //   this.setData({
  //     menu: i.currentTarget.dataset.itemnum,
  //     menu2: i.currentTarget.dataset.itemnum2,
  //     actionSheetHidden: !this.data.actionSheetHidden
  //   })
  // },
  // bindMenu7: function (i) {
  //   console.log(i)
  //   this.setData({
  //     menu: i.currentTarget.dataset.itemnum,
  //     menu2:i.currentTarget.dataset.itemnum2,
  //     actionSheetHidden: !this.data.actionSheetHidden
  //   })
  // },
  // bindMenu8: function (i) {
  //   console.log(i)
  //   this.setData({
  //     menu: i.currentTarget.dataset.itemnum,
  //     menu2: i.currentTarget.dataset.itemnum2,
  //     actionSheetHidden: !this.data.actionSheetHidden
  //   })
  // },
  // bindMenu9: function (i) {
  //   console.log(i)
  //   this.setData({
  //     menu: i.currentTarget.dataset.itemnum,
  //     menu2: i.currentTarget.dataset.itemnum2,
  //     actionSheetHidden: !this.data.actionSheetHidden
  //   })
  // },

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
  //服务类型里面值的选择
  righttype222: function (e) {
    console.log(this.data)
    console.log('picker发送选择改变，携带值为', e)
    this.setData({
      index: e.detail.value
    })
  },

  gogogo :function(e){
  
    this.setData({
      hidden: false
    });
    wx.request({
      url: urls.mainurl + urls.fastphone+this.data.phonenum+"/"+this.data.index,
      method: 'GET',
      header: {
        "Cookie": 'JSESSIONID=' + wx.getStorageSync("sessionid")
      },
      data: {
      
      },
      success: function (e) {
        console.log(e, "快捷电话成功")
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