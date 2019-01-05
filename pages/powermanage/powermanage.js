// pages/home/home.js
import request from '../../utils/request.js';
import urls from '../../common/urls.js';
import * as echarts from '../../ec-canvas/echarts';
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    companyName: '河南焦作冶金公司',
    number1: 1000,
    number2: 800,
    number3: `80%`,
    number4: 5000,
    number5: 10002,
    number6: 50,
    barbar: {
      onInit: initbar
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  // onShow: function () {

  // },

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
});

//柱状图
function initbar(canvas, width, height) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);
  var colors = ['#5793f3', '#d14a61', '#675bba'];
  var seriesLabel = {
    normal: {
      show: true,
      textBorderColor: '#333',
      textBorderWidth: 2
    }
  }
  var option = {
    title: {
      text: ''
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      data: ['总电量','长协','竞价','实际用电']
    },
    grid: {
      left: 60
    },
    toolbox: {
      show: true,
      feature: {
        saveAsImage: {}
      }
    },
    xAxis: {
      type: 'value',
      name: 'Days',
      axisLabel: {
        formatter: '{value}'
      }
    },
    yAxis: {
      type: 'category',
      inverse: true,
      data: ['一月', '二月', '三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
      axisLabel: {
        formatter: function (value) {
          return  value ;
        },

      }
    },
    series: [
      {
        name: '总电量',
        type: 'bar',
        label: seriesLabel,
        data: [330, 302, 145, 213, 985, 962, 654, 357, 158, 632, 958, 987],
        barMaxWidth:"60",
      },
      {
        name: '长协',
        type: 'bar',
        label: seriesLabel,
        data: [110, 220, 82, 63, 985, 962, 654, 357, 158, 632, 958, 987],
        barMaxWidth:"60",
      },
      {
        name: '竞价',
        type: 'bar',
        label: seriesLabel,
        data: [220, 82, 63, 150, 105, 220, 82, 63, 985, 962, 654, 357],
        barMaxWidth: "60",
      },
      {
        name: '实际用电',
        type: 'bar',
        label: seriesLabel,
        data: [330, 302, 145, 213, 985, 962, 654, 357, 158, 632, 958, 987],
        barMaxWidth: "60",
      }
    ]
  };
  chart.setOption(option);
  return chart;
}