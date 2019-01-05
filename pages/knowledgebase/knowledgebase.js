// pages/knowledgebase/knowledgebase.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    typeList: [{
      label: '全部',
      value: 0
    }, {
      label: '售电知识',
      value: 'document'
    }, {
      label: 'FAQ',
      value: 'faq'
    }, {
      label: '行业资讯',
      value: 'information'
    }, {
      label: '操作指南',
      value: 'document'
    }],
    statusFilter: 0, // 选中的文章类型
    list: [],
    knowledgeList: [{
      title: '2018政策售电交易解读',
      author: '佚名',
      updateDate: '2018.06.03',
      type: 'document',
    }, {
      title: '2018政策售电交易问答',
      author: '佚名',
      updateDate: '2018.06.03',
      type: 'faq',
    }, {
      title: '2018政策售电交易指南',
      author: '佚名',
      updateDate: '2018.06.03',
      type: 'faq',
    }, {
      title: '2018政策售电交易市场调研',
      author: '佚名',
      updateDate: '2018.06.03',
      type: 'information',
    }, {
      title: '2018政策售电交易规则变更',
      author: '佚名',
      updateDate: '2018.06.03',
      type: 'information',
    }, {
      title: '2018售电市场的十大思考',
      author: '佚名',
      updateDate: '2018.06.03',
      type: 'faq',
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { knowledgeList } = this.data;
    this.setData({
      list: [...knowledgeList]
    });
  },

  // 文章类型改变
  typeChange: function(e) {
    const val = this.data.typeList[e.detail.value].value;
    const { knowledgeList } = this.data;
    let list = [];
    if (val === 0) {
      list = [...knowledgeList];
    } else {
      list = knowledgeList.filter(item => item.type === val);
    }
    this.setData({
      list,
      statusFilter: e.detail.value
    })
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