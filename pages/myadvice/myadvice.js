
import * as echarts from '../../ec-canvas/echarts';

const tabs = [
  {
    name: "图文咨询"
  },
  {
    name: "电话咨询"
  },
];

Page({
  data: {
    onOff: true ,
    tabs: tabs,     //展示的数据
    slideOffset: 0,//指示器每次移动的距离
    activeIndex: 0,//当前展示的Tab项索引
    sliderWidth: 96,//指示器的宽度,计算得到
    contentHeight: 0,//页面除去头部Tabbar后，内容区的总高度，计算得到
    typeList: [{
      name:"杨经理",
      label: '高级融资顾问',
      value: 'head0',
      from:"微金网",
      time:"2019-01-01 13:34",
      pingjia:"已评价",
      belong:"擅长:房产服务",
      people:"44646",
    }, {
        name: "杨经理",
        label: '高级融资顾问',
        value: 'head2',
        from: "微金网",
        pingjia: "待评价",
        time: "2019-01-01 13:34",
        belong: "擅长:房产服务",
        people: "44646",
      },
    ],
      typeList2: [{
      name: "杨经理",
      label: '高级融资顾问',
      value: 'head0',
      from: "微金网",
      time: "2019-01-01 13:34",
      pingjia: "已评价",
      belong: "擅长:房产服务",
      people: "44646",
    }, {
      name: "杨经理",
      label: '高级融资顾问',
      value: 'head2',
      from: "微金网",
      pingjia: "待评价",
      time: "2019-01-01 13:34",
      belong: "擅长:房产服务",
      people: "44646",
    },
    ]

  },
  toclues:function(e){
    wx.setStorageSync("tootherId", e.currentTarget.id)
    wx.setStorageSync("name", e.currentTarget.name)

    wx.navigateTo({
      url: '../clues/clues'
    });
  },
  // 导航点击滑动
  tapMove: function(e) {
    this.setData({
      scrollTop: this.data.scrollTop + 10
    })
    
  },
	bindChange: function (e) {
    console.log(this.data.scrollTop)
    var current = e.detail.current;
    if (e.currentTarget.dataset.index === 1) {
      this.setData({
        height: this.data.typeList.length * 410 + 50
      })
    } else {
      this.setData({
        height: this.data.typeList2.length * 410 + 50
      })
    }
    wx.pageScrollTo({
      scrollTop: 0
    })
    this.setData({
      scrollTop: 0,
      activeIndex: current,
      sliderOffset: this.data.sliderWidth * current
    });
  },
	// 导航点击事件
  navTabClick: function (e) {
    console.log(e.currentTarget.id)
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
    if (e.currentTarget.id === "0") {
      this.setData({
        height: this.data.typeList.length * 410 + 50
      })
    } else {
      this.setData({
        height: this.data.typeList2.length * 410 + 50
      })
    }
  },
  // 点击饼图
  touchPieHandler: function (e) {
    console.log(pieChart.getCurrentDataIndex(e));
  },
  // 点击环图
  touchRingHandler: function (e) {
    console.log(ringChart.getCurrentDataIndex(e));
  },
  // 环图加载 条形图加载
  onReady: function (e) {
    
  },
  // 点图事件
  touchHandler: function (e) {
    lineChart.scrollStart(e);
  },
  moveHandler: function (e) {
    lineChart.scroll(e);
  },
  touchEndHandler: function (e) {
    lineChart.scrollEnd(e);
    lineChart.showToolTip(e, {
      format: function (item, category) {
        return category + ' ' + item.name + ':' + item.data
      }
    });
  },
  createSimulationData: function () {
    var categories = [];
    var data = [];
    for (var i = 0; i < 10; i++) {
      categories.push('2018年08月0' + (i + 1)+'日');
      data.push(Math.random() * (20 - 10) + 10);
    }
    return {
      categories: categories,
      data: data
    }
  },
  //评论
  // btnclick: function () {
  //   console.log(6868)
  //   wx.showModal({
  //     success: function (res) {
  //       if (res.confirm) {
  //         console.log('用户点击确定')
  //       } else if (res.cancel) {
  //         console.log('用户点击取消')
  //       }
  //     }
  //   })
  // },

  btnclick: function () {
    console.log(6868)
    this.setData({
      onOff: false,
    })
  },
  modalConfirm:function(){
    this.setData({
      onOff: true,
    })
    wx.showToast({
      title: '评论成功',  //标题
      icon: 'success',  //图标，支持"success"、"loading"

      duration: 1000, //提示的延迟时间，单位毫秒，默认：1500
      mask: false,  //是否显示透明蒙层，防止触摸穿透，默认：false
      success: function () { }, //接口调用成功的回调函数
      fail: function () { },  //接口调用失败的回调函数
      complete: function () { } //接口调用结束的回调函数
    })
  },
  modalCancel: function () {
    this.setData({
      onOff: true,
    })
    
  },
  
  // 第一页饼图加载
  onLoad: function (e) {
    
  },
});


//漏斗图
function initChart(canvas, width, height) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: "600rpx"
  });
  canvas.setChart(chart);
  var seriesLabel = {
    normal: {
      show: true,
      textBorderColor: '#333',
      textBorderWidth: 2
    }
  }
  var option = {
    title: {
      text: '',
      //subtext: ''
    },
    tooltip: {
      trigger: 'item',
      formatter: "{a} <br/>{b} : {c}%"
    },
    toolbox: {
      feature: {
        dataView: { readOnly: false },
        restore: {},
        saveAsImage: {}
      }
    },
    legend: {
      data: [ '线索总数', '已沟通','未确认', '合同成交']
    },
    calculable: true,
    series: [
      {
        name: '',
        type: 'funnel',
        left: '10%',
        top: 60,
        //x2: 80,
        bottom: 60,
        width: '80%',
        height:410,
        // height: {totalHeight} - y - y2,
        min: 0,
        max: 100,
        minSize: '0%',
        maxSize: '100%',
        sort: 'descending',
        gap: 2,
        label: {
          
          normal: {
            show: true,
            position: 'inside',
            formatter: function (value) {
              //console.log(value)
              return value.data.name+"("+value.value+"%)";
            },
          },
          emphasis: {
            textStyle: {
              fontSize: 20
            }
          }
        },
        labelLine: {
          normal: {
            length: 10,
            lineStyle: {
              width: 1,
              type: 'solid'
            }
          }
        },
        itemStyle: {
          normal: {
            borderColor: '#fff',
            borderWidth: 1
          }
        },
        data: [
          { value: 100, name: '线索总数' },
          { value: 35, name: '已沟通' },
          { value: 50, name: '未确认' },
          { value: 15, name: '合同成交' },
        ]
      }
    ]
  };
  chart.setOption(option);
  return chart;
}

//负荷预测
function initcast(canvas, width, height) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);
  var colors = ['#5793f3', '#d14a61', '#675bba'];
  var option = {
    color: colors,

    tooltip: {
      trigger: 'none',
      axisPointer: {
        type: 'cross'
      }
    },
    legend: {
      data: ['实际用电量', '预测用电量']
    },
    grid: {
      top: 70,
      bottom: 50
    },
    xAxis: [
      {
        type: 'category',
        axisTick: {
          alignWithLabel: true
        },
        axisLine: {
          onZero: false,
          lineStyle: {
            color: colors[1]
          }
        },
        axisPointer: {
          label: {
            formatter: function (params) {
              return '预测值  ' + params.value
                + (params.seriesData.length ? '：' + params.seriesData[0].data : '');
            }
          }
        },
        data: ["2017-1", "2017-2", "2017-3", "2017-4", "2017-5", "2017-6", "2017-7", "2017-8", "2017-9", "2017-10", "2017-11", "2017-12"]
      },
      {
        type: 'category',
        axisTick: {
          alignWithLabel: true
        },
        axisLine: {
          onZero: false,
          lineStyle: {
            color: colors[0]
          }
        },
        axisPointer: {
          label: {
            formatter: function (params) {
              return '用电量  ' + params.value
                + (params.seriesData.length ? '：' + params.seriesData[0].data : '');
            }
          }
        },
        data: ["2017-1", "2017-2", "2017-3", "2017-4", "2017-5", "2017-6", "2017-7", "2017-8", "2017-9", "2017-10", "2017-11", "2017-12"]
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: '实际用电量',
        type: 'line',
        xAxisIndex: 1,
        smooth: true,
        data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
      },
      {
        name: '预测用电量',
        type: 'line',
        smooth: true,
        data: [3.9, 5.9, 11.1, 18.7, 48.3, 69.2, 231.6, 46.6, 55.4, 18.4, 10.3, 0.7]
      }
    ]
  };
  chart.setOption(option);
  return chart;
}

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
      data: ['长协','竞价']
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
        name: '长协',
        type: 'bar',
        label: seriesLabel,
        data: [110, 220, 82, 63,985,962,654,357,158,632,958,987],
        barMaxWidth:"40",
      },
      {
        name: '竞价',
        type: 'bar',
        label: seriesLabel,
        data: [220, 82, 63, 150, 105, 220, 82, 63, 985, 962, 654, 357 ],
        barMaxWidth: "40",
      }
    ]
   
  };
  chart.setOption(option);
  return chart;
}


//饼状图
function initpie(canvas, width, height) {
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
      text: '',
      //subtext: '纯属虚构',
      x: 'center'
    },
    tooltip: {
      trigger: 'item',
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
      x: 'center',
      y: 'bottom',
      data: ['农、林、牧、渔业', '采矿业', '综合（含投资类、主业不明显）', '电力、热力、燃气及水的生产和供应业', '环境和公共设施管理业', '建筑业', '制造业','其它']
    },
    toolbox: {
      show: true,
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        magicType: {
          show: true,
          type: ['pie', 'funnel']
        },
        restore: { show: true },
        saveAsImage: { show: true }
      }
    },
    calculable: true,
    series:

      {
        name: '面积模式',
        type: 'pie',
        radius: [30, 110],
        center: ['50%', '35%'],
        roseType: 'area',
        data: [{
          name: '农、林、牧、渔业',
          value: 15,
        }, {
          name: '采矿业',
          value: 35,
        }, {
          name: '制造业',
          value: 78,
        }, {
          name: '电力、热力、燃气及水的生产和供应业',
          value: 63,
        }, {
          name: '环境和公共设施管理业',
          value: 35,
        }, {
          name: '建筑业',
          value: 78,
        }, {
          name: '综合（含投资类、主业不明显）',
          value: 78,
        }, {
          name: '其它',
          value: 78,
        }],
      }
    

  };
  chart.setOption(option);
  return chart;
}