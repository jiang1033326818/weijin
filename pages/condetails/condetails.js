// pages/condetails/condetails.js
import * as echarts from '../../ec-canvas/echarts';
import regs from '../../common/regs.js';
import request from '../../utils/request.js';
import urls from '../../common/urls.js';
var barec = null
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabledis: "none",
    chartdis: "block",
    no3dis: 'block',
    phoneimg: "../../images/tel.png",
    tableimg: "../../images/table.png",
    tableimg2: "../../images/table2.png",
    chartimg: '../../images/charts.png',
    chartimg2: '../../images/charts2.png',
    cular: '../../images/cular3.png',
    list: {},
    list2: [
    ],
   
    
    customerStatus2: [{
        label: '已成交',
        value: "APPROVED"
      },
      {
        label: '已取消',
        value: "UNAPPROVED"
      },
    ],
    list4: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    barbar: {
      onInit: function (canvas, width, height) {
        barec = echarts.init(canvas, null, {
          width: width,
          height: 180,
        });
        canvas.setChart(barec);
        return barec;
    }
    },
  },

  //打电话
  phoneCall: function(e) {
    //const { phone } = e.target.id;
    //console.log(e.target.id)
    wx.makePhoneCall({
      phoneNumber: e.target.id,
    });
    request(urls.addCallNum +"/"+ this.data.id, {
      method: 'GET',
      data: {
        id:this.data.id
      },
      success: (res) => {
        this.getContractsNum()
      }
    })
  },

  /**
   * 根据时间戳返回结构化的时间字符串
   */
  getFormatDate: function (timestamp) {
    const d = new Date(timestamp);
    const y = d.getFullYear();
    const m = d.getMonth() + 1;
    const dd = d.getDate();
    return `${y}-${m}-${dd}`;
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let id = options.id
    let typedata = wx.getStorageSync('typedata')
    this.setData({
      id: id,
      typedata: typedata === 0 ? "BILATERAL" : "BIDDING ",
      no3dis: typedata === 0 ? "block" : "none",
    })
  },

  checktable: function(e) {
    const _ = this;
    this.setData({
      tabledis: "none",
      chartdis: "block",
    })
  },

  checkchart: function(e) {
    const _ = this;
    _.setData({ 
      tabledis: "block",
      chartdis: "none",
    })
  },

  // 获取合同详情
  getContractsNum: function() {
    wx.showLoading({
      title: '加载中...',
    })
    const _ = this;  
    const list0=[];
    request(urls.contractdetails + this.data.id + "/" + this.data.typedata, {
      method: 'GET',
      success: (res) => {
        for(let i in res.content.monthlyPowers){
          list0.push(res.content.monthlyPowers[i].power)
        }
        console.log(_.data)
        barec.setOption({
          title: {
            text: ''
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          grid: {
            left: 40,
            top: -15,
          },
          toolbox: {
            show: true,
            feature: {
              saveAsImage: {}
            }
          },
          xAxis: {
            type: 'category',
            data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
            axisTick: {
              alignWithLabel: true
            }
          },
          yAxis: {
            type: 'value',
            //inverse: true,
            axisLabel: {
              formatter: function (value) {
                return value;
              },
            }
          },
          series: [
            {
              name: '用电量',
              type: 'bar',
              label: {
                normal: {
                  show: true,
                  textBorderColor: '#333',
                  textBorderWidth: 2
                }
              },
              data: list0,
              barMaxWidth: "40",
              color: "#009DFF",
            },
          ]
        })
        const list2 = [];
        list2.push({
          name: '新建合同',
          time: _.getFormatDate(res.content.createTime),
          compony: res.content.partyBName,
          paple: res.content.createBy,
        });
        if (res.content.updateBy) {
          list2.push({
            name: '修改合同',
            time: _.getFormatDate(res.content.updateTime),
            compony: res.content.partyBName,
            paple: res.content.updateBy,
          });
        }
        let list3 = [];
        if (this.data.typedata === 'BILATERAL') {
          list3 = [{
            month: "1月",
            value: res.content.monthlyPowers[0].power,
          },
          {
            month: "2月",
            value: res.content.monthlyPowers[1].power,
          },
          {
            month: "3月",
            value: res.content.monthlyPowers[2].power,
          },
          {
            month: "4月",
            value: res.content.monthlyPowers[3].power,
          },
          {
            month: "5月",
            value: res.content.monthlyPowers[4].power,
          },
          {
            month: "6月",
            value: res.content.monthlyPowers[5].power,
          },
          {
            month: "7月",
            value: res.content.monthlyPowers[6].power,
          },
          {
            month: "8月",
            value: res.content.monthlyPowers[7].power,
          },
          {
            month: "9月",
            value: res.content.monthlyPowers[8].power,
          },
          {
            month: "10月",
            value: res.content.monthlyPowers[9].power,
          },
          {
            month: "11月",
            value: res.content.monthlyPowers[10].power,
          },
          {
            month: "12月",
            value: res.content.monthlyPowers[11].power,
          },
          ];
        }
        _.setData({
          list4: list0,
          list2,
          list: res.content,
          statusFilter: res.content.status,
          list3,
        });
        wx.hideLoading(); 
      }
    })
  },


  // 修改合同状态
  getContractsStatus: function(e) {
    const _ = this;
    // const { id } = this.data.id;
    request(urls.contractsStatus, {
      method: 'POST',
      data: {
        id: this.data.list.id,
        status: this.data.customerStatus2[parseInt(e.detail.value)].value,
        type: this.data.typedata,
      },
      success: (res) => {
        wx.showToast({
          title: '修改成功',
        })
        this.getContractsNum()
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    setTimeout(this.getContractsNum, 500);
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
   
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享 
   */
  onShareAppMessage: function() {

  }
})


