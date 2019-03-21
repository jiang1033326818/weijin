// pages/expert/expert.js
import regs from '../../common/regs.js';
import request from '../../utils/request.js';
import urls from '../../common/urls.js';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // typeList: [
    //   {
    //   name: '张雄辉',
    //   time: '5分钟前',
    //   content:"呵呵",
    //   num:"5",
    //   img:"http://zadai.net:8000/uploads/header/head0.jpg",
    // },
    //   {
    //     name: '李易峰',
    //     time: '5分钟前',
    //     content: "reuiytdsfsldf!",
    //     num: "5",
    //     img: "http://zadai.net:8000/uploads/header/head2.jpg"
    //   },
    //   {
    //     name: '恩柔',
    //     time: '5分钟前',
    //     content: "你麻sdfsdf!",
    //     num: "5",
    //     img: "http://zadai.net:8000/uploads/header/head0.jpg"
    //   },
    //   {
    //     name: '张雄辉',
    //     time: '5分钟前',
    //     content: "呵呵",
    //     num: "5",
    //     img: "http://zadai.net:8000/uploads/header/head0.jpg"
    //   },
    //   {
    //     name: '张雄辉',
    //     time: '5分钟前',
    //     content: "呵呵",
    //     num: "5",
    //     img: "http://zadai.net:8000/uploads/header/head0.jpg"
    //   },
    //   {
    //     name: '张雄辉',
    //     time: '5分钟前',
    //     content: "呵呵",
    //     num: "5",
    //     img: "http://zadai.net:8000/uploads/header/head0.jpg"
    //   },
    //  ]
    getaboutour:[],
  },


  //跳转到聊天
  toclues:function(e){
    wx.navigateTo({
      url: '../clues/clues'
    });
    console.log(e)
    wx.setStorageSync("tootherId", e.currentTarget.id)
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
    let that=this;
    //获取联系人
    wx.request({
      url: urls.mainurl + urls.localExpert,
      method: 'GET',
      data: JSON.stringify({
        
      }),
      header: {
        "Cookie": 'JSESSIONID=' + wx.getStorageSync("sessionid")
      },
      success: function (response) {
        console.log(1111,response.data.data)
        that.setData({
          typeList: response.data.data
        })
      }
    })
  },
//获取关于我们顾问列表

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
    this.aboutour();
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