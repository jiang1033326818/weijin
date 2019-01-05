import regs from '../../common/regs.js';
import request from '../../utils/request.js';
import urls from '../../common/urls.js';
const app = getApp();
const tabs = [
  {
    name: "①公司信息"
  },
  {
    name: "②联系人"
  },
  {
    name: "③合同信息"
  },
  {
    name: "④用电信息"
  }
];
Page({
  data: {
		tabs: tabs,
    slideOffset: 0,
    activeIndex: 0,
    sliderWidth: 96,
    contentHeight: 0,
		array: ["双边合同","月竞合同"],
		month: ["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],
		inputShowed: false,
		inputVal: "",
		mobileBCheckMsg:'',
		mobileACheckMsg:'',
		contractCheckMsg: '',
		companyACheckMsg: '',
		companyBCheckMsg: '',
		managerACheckMsg: '',
		managerBCheckMsg: '',
		phoneACheckMsg: '',
		phoneBCheckMsg: '',
		voltageCheckMsg: '',
		janCheckMsg: '',
		febCheckMsg: '',
		marCheckMsg: '',
		aprCheckMsg: '',
		mayCheckMsg: '',
		junCheckMsg: '',
		julCheckMsg: '',
		augCheckMsg: '',
		sepCheckMsg: '',
		octCheckMsg: '',
		novCheckMsg: '',
		decCheckMsg: '',
		biddingCheckMsg:'',
		bilateralCheckMsg:'',
		spreadCheckMsg: '',
		contractCodeACheckMsg: '',
		contractCodeBCheckMsg: '',
		emailACheckMsg: '',
		emailBCheckMsg: '',
		index: 0,
		region: ["北京市", "北京市", "东城区"],
		linkmanAAdress: ["北京市", "北京市", "东城区"],
		linkmanBAdress: ["北京市", "北京市", "东城区"],
		companyAAdress: ["北京市", "北京市", "东城区"],
		companyBAdress: ["北京市", "北京市", "东城区"],
		toView: 'red',
		scrollTop: 0,
		selectedId: 1,
		companyALegalPerson:'',
		count: 0,
		selectShow: false,
		companyA: '',
		contactAName: ''
	},
	onLoad: function (options) {
		if(options.companyAId&&options.companyAId!==''){
			this.findCompanyDetail(options.companyAId);
		}
		let myDate = new Date();
		const year = myDate.getFullYear();
		const month = myDate.getMonth() + 1;
		const day = myDate.getDate();
		this.setData({
			effectiveTime:`${year}年${month}月${day}日`,
			expiryDate: `${year}年${month}月${Number(day)+1}日`,
			start: `${year}-${month}-${day}`,
			end: `${year}-${month}-${Number(day)+1}`,
			currentMonth: month,
		});
		let that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderWidth: res.windowWidth / that.data.tabs.length,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex,
          contentHeight: res.windowHeight - res.windowWidth / 750 * 68
        });
      }
		});
		this.findContractInfo();
	},
	findContractInfo: function() {
		request(urls.companyInfo, {
			success: (response) => {
				const str = response.content.areaName?response.content.areaName:'';
				const value = str.split(",");
				this.setData({
					companyBAdress: value,
					companyBId: response.content.companyId,
					companyBName: response.content.companyName,
					legalPersonB: response.content.legalPerson
				})
			},
			fail: () => {
				console.log('搜索失败');
			}
		});
	},
	findCompanyBLinkmanList: function() {
		const that = this;
		const companyBid = that.data.companyBId;
		request(urls.companyLinkman+companyBid+'/contacts',{
			success: (response) => {
				this.setData({
					companyBlinkmanList: response.content
				})
			},
			fail: (response) => {
				console.log(response,'乙方公司联系人列表调用失败');
			}
		})
	},
	findCompanyALinkmanList: function() {
		const that = this;
		const companyAid = that.data.companyAId;
		request(urls.companyLinkman+companyAid+'/contacts',{
			success: (response) => {
				this.setData({
					companyAlinkmanList: response.content
				})
			},
			fail: (response) => {
				console.log(response,'甲方公司联系人列表调用失败');
			}
		})
	},
	findCompanyList: function(name) {
		request(urls.companyList,{
			data: {
				name: name
			},
			success: (response) => {
				if(response.code===0) {
					this.setData({
						companyList: response.content,
					})
				} else {
					console.log(response.message,'错误信息');
				}
			},
			fail: () => {
				console.log('搜索失败');
			}
		})
	},
	findCompanyDetail: function (companyId) {
		request(urls.companyDetail+companyId+'/info',{
			data: {
				companyId: companyId
			},
			success: (response) => {
				const str = response.content.regionName?response.content.regionName:'';
				const value = str.split(",");
				this.setData({
					companyADetail: response.content,
					companyALegalPerson: response.content.legalPerson?response.content.legalPerson:'',
					companyAAdress: value,
					companyAId: response.content.companyId,
					companyACheckMsg: '',
					companyA: response.content.companyName
				})
			},
			fail: () => {
				console.log('搜索失败');
			}
		})
	},
	upper: function(e) {
    // console.log(e)
  },
  lower: function(e) {
    // console.log(e)
  },
  scroll: function(e) {
    // console.log(e)
  },
  tap: function(e) {
    for (var i = 0; i < order.length; ++i) {
      if (order[i] === this.data.toView) {
        this.setData({
          toView: order[i + 1]
        })
        break
      }
    }
  },
  tapMove: function(e) {
    this.setData({
      scrollTop: this.data.scrollTop + 10
    })
  },
	bindChange: function (e) {
    var current = e.detail.current;
    this.setData({
      activeIndex: current,
      sliderOffset: this.data.sliderWidth * current
    });
  },
  navTabClick: function (e) {
    // this.setData({
    //   sliderOffset: e.currentTarget.offsetLeft,
    //   activeIndex: e.currentTarget.id
    // });
  },
	showInput: function () {
		this.setData({
			inputShowed: true
		});
	},
	hideInput: function () {
		this.setData({
			inputVal: "",
			inputShowed: false
		});
	},
	clearInput: function () {
		this.setData({
			inputVal: ""
		});
	},
	contractChangeOver: function (e) {
		if(e.detail.value===''){
      this.setData({
        contractCheckMsg: '合同名称不能为空'
      })
    } else {
      this.setData({
        contractCheckMsg: ''
      })
    }
	},
	companyAChangeOver: function (e) {
		const name = e.detail.value;
		if(this.timer) {
			clearTimeout(this.timer);
		}
		this.timer = setTimeout(()=>{
			this.findCompanyList(name);
		},1000);
	},
	companyAFocus: function (e) {
		this.findCompanyList('');
	},
	companyABlur: function (e) {
		if(e.detail.value===''){
      this.setData({
        companyACheckMsg: '公司名称不能为空'
      })
    } else {
      this.setData({
				companyACheckMsg: '',
				companyA: e.detail.value
      })
    }
	},
	selectComapnyA: function(e) {
		const selectedCompanyId = e.detail.companyId;
		const selectedCompanyName = e.detail.companyName;
		this.setData({
			companyA: selectedCompanyName,
			companyACheckMsg: '',
			managerACheckMsg: ''
		})
		this.findCompanyDetail(selectedCompanyId);
	},
	companyBChangeOver: function (e) {
		if(e.detail.value===''){
      this.setData({
        companyACheckMsg: '公司名称不能为空'
      })
    } else {
      this.setData({
        companyACheckMsg: ''
      })
    }
	},
	linkmanAChangeOver: function (e) {
		const name = e.detail.value;
		this.setData({
			contactAName: e.detail.value
		})
	},
	linkmanAFocus: function (e) {
		const that = this;
		const companyAid = that.data.companyAId?that.data.companyAId:'';
		if (companyAid && companyAid !== '') {
			this.findCompanyALinkmanList();
		} else {
			this.setData({
				selectShow: true
			})
		}
	},
	linkmanBFocus: function (e) {
		const that = this;
		const companyBid = that.data.companyBId?that.data.companyBId:'';
		if(companyBid!==''){
			this.findCompanyBLinkmanList();
		}
	},
	selectLinkmanA: function(e) {
		const contactId = e.detail.contactId;
		const selectedContactName = e.detail.contactName;
		this.setData({
			contactAName : selectedContactName
		});
		request(urls.linkmanDetail+contactId+'/detail',{
			data: {
				contactId: contactId
			},
			success: (response) => {
				const str = response.content.contactAddr?response.content.contactAddr:'';
				const value = str.split(",");
				this.setData({
					linkmanAAdress: value,
					contactAMobile: response.content.contactMobile?response.content.contactMobile:'',
					contactAName: response.content.contactName?response.content.contactName:'',
					contactAPhone: response.content.contactPhone?response.content.contactPhone:'',
					linkmanACheckMsg: '',
					mobileACheckMsg: '',
					phoneACheckMsg: ''
				})
			},
			fail: () => {
				console.log('搜索失败');
			}
		})
	},
	linkmanABlur: function (e) {
		if(e.detail.value===''){
			this.setData({
				linkmanACheckMsg: '联系人不能为空'
			})
		} else {
			this.setData({
				linkmanACheckMsg: '',
				contactAName: e.detail.value
			})
		}
	},
	linkmanBChangeOver: function (e) {
		const name = e.detail.value;
	},
	selectLinkmanB: function(e) {
		const contactId = e.detail.contactId;
		const selectedContactName = e.detail.contactName;
		request(urls.linkmanDetail+contactId+'/detail',{
			data: {
				contactId: contactId
			},
			success: (response) => {
				const str = response.content.contactAddr?response.content.contactAddr:'';
				const value = str.split(",");
				this.setData({
					linkmanBAdress: value,
					contactBMobile: response.content.contactMobile?response.content.contactMobile:'',
					contactBName: response.content.contactName?response.content.contactName:'',
					contactBPhone: response.content.contactPhone?response.content.contactPhone:'',
					linkmanACheckMsg: '',
					mobileBCheckMsg: '',
					phoneBCheckMsg: ''
				})
			},
			fail: () => {
				console.log('搜索失败');
			}
		})
	},
	linkmanBBlur: function (e) {
		if(e.detail.value===''){
			this.setData({
				linkmanACheckMsg: '联系人不能为空'
			})
		} else {
			this.setData({
				linkmanACheckMsg: ''
			})
		}
	},
	managerAChangeOver: function (e) {
		if(e.detail.value===''){
      this.setData({
        managerACheckMsg: '法人信息不能为空'
      })
    } else {
      this.setData({
        managerACheckMsg: ''
      })
    }
	},
	managerBChangeOver: function (e) {
		if(e.detail.value===''){
      this.setData({
        managerBCheckMsg: '法人信息不能为空'
      })
    } else {
      this.setData({
        managerBCheckMsg: ''
      })
    }
	},
	mobileAChangeOver: function (e) {
		if(e.detail.value===''){
			this.setData({
				mobileACheckMsg: '法人手机号不能为空'
			})
		} else {
			if(!regs.PHONE.test(e.detail.value)){
				this.setData({
					mobileACheckMsg: '法人手机号格式错误'
				})
			} else {
				this.setData({
					mobileACheckMsg: '',

				})
			}
		}
	},
	mobileBChangeOver: function (e) {
		if(e.detail.value===''){
			this.setData({
				mobileBCheckMsg: '法人手机号不能为空'
			})
		} else {
			if(!regs.PHONE.test(e.detail.value)){
				this.setData({
					mobileBCheckMsg: '法人手机号格式错误'
				})
			} else {
				this.setData({
					mobileBCheckMsg: ''
				})
			}
		}
	},
	phoneAChangeOver: function (e) {
		if(e.detail.value===''){
			this.setData({
				phoneACheckMsg: '办公电话不能为空'
			})
		} else {
			if(!regs.TELEPHONE.test(e.detail.value)){
				this.setData({
					phoneACheckMsg: '办公电话格式错误'
				})
			} else {
				this.setData({
					phoneACheckMsg: ''
				})
			}
		}
	},
	phoneBChangeOver: function (e) {
		if(e.detail.value===''){
			this.setData({
				phoneBCheckMsg: '办公电话不能为空'
			})
		} else {
			if(!regs.TELEPHONE.test(e.detail.value)){
				this.setData({
					phoneBCheckMsg: '办公电话格式错误'
				})
			} else {
				this.setData({
					phoneBCheckMsg: ''
				})
			}
		}
	},
	bindPickerChange: function(e) {
    this.setData({
      index: e.detail.value
    })
	},
	bindEffectiveTimeChange: function(e) {
		const value = e.detail.value;
		const year = value.substr(0,4);
		const month = Number(value.substr(5,2));
		const day = Number(value.substr(8,2));
    this.setData({
      effectiveTime: `${year}年${month}月${day}日`
    })
	},
	bindBiddingChange: function(e) {
		const value = e.detail.value;
		const year = value.substr(0,4);
		const month = Number(value.substr(5,2));
		const day = Number(value.substr(8,2));
    this.setData({
      expiryDate: `${year}年${month}月${day}日`
    })
	},
	bindLinkmanARegionChange: function (e) {
		this.setData({
      linkmanAAdress: e.detail.value
    })
	},
	bindLinkmanBRegionChange: function (e) {
		this.setData({
      linkmanBAdress: e.detail.value
    })
	},
	bindCompanyARegionChange: function (e) {
		this.setData({
			companyAAdress: e.detail.value
		})
	},
	bindCompanyBRegionChange: function (e) {
		this.setData({
			companyBAdress: e.detail.value
		})
	},
	voltageChange: function (e) {
		if(e.detail.value===''){
      this.setData({
        voltageCheckMsg: '电压等级不能为空'
      })
    } else {
      this.setData({
        voltageCheckMsg: ''
      })
    }
	},
	bilateralChange: function (e) {
		if(e.detail.value===''){
      this.setData({
        bilateralCheckMsg: '双边电价不能为空'
      })
    } else {
      this.setData({
        bilateralCheckMsg: ''
      })
    }
	},
	janChange: function (e) {
		if(e.detail.value===''){
      this.setData({
        janCheckMsg: '一月份电量不能为空'
      })
    } else {
      this.setData({
				janCheckMsg: ''
      })
    }
	},
	febChange: function (e) {
		if(e.detail.value===''){
      this.setData({
        febCheckMsg: '二月份电量不能为空'
      })
    } else {
      this.setData({
				febCheckMsg: ''
      })
    }
	},
	marChange: function (e) {
		if(e.detail.value===''){
      this.setData({
        marCheckMsg: '三月份电量不能为空'
      })
    } else {
      this.setData({
        marCheckMsg: ''
      })
    }
	},
	aprChange: function (e) {
		if(e.detail.value===''){
      this.setData({
        aprCheckMsg: '四月份电量不能为空'
      })
    } else {
      this.setData({
        aprCheckMsg: ''
      })
    }
	},
	mayChange: function (e) {
		if(e.detail.value===''){
      this.setData({
        mayCheckMsg: '五月份电量不能为空'
      })
    } else {
      this.setData({
        mayCheckMsg: ''
      })
    }
	},
	junChange: function (e) {
		if(e.detail.value===''){
      this.setData({
        junCheckMsg: '六月份电量不能为空'
      })
    } else {
      this.setData({
        junCheckMsg: ''
      })
    }
	},
	julChange: function (e) {
		if(e.detail.value===''){
      this.setData({
        julCheckMsg: '七月份电量不能为空'
      })
    } else {
      this.setData({
        julCheckMsg: ''
      })
    }
	},
	augChange: function (e) {
		if(e.detail.value===''){
      this.setData({
      	augCheckMsg: '八月份电量不能为空'
      })
    } else {
      this.setData({
        augCheckMsg: ''
      })
    }
	},
	sepChange: function (e) {
		if(e.detail.value===''){
      this.setData({
        sepCheckMsg: '九月份电量不能为空'
      })
    } else {
      this.setData({
        sepCheckMsg: ''
      })
    }
	},
	octChange: function (e) {
		if(e.detail.value===''){
      this.setData({
        octCheckMsg: '十月份电量不能为空'
      })
    } else {
      this.setData({
        octCheckMsg: ''
      })
    }
	},
	novChange: function (e) {
		if(e.detail.value===''){
      this.setData({
        novCheckMsg: '十一月份电量不能为空'
      })
    } else {
      this.setData({
        novCheckMsg: ''
      })
    }
	},
	decChange: function (e) {
		if(e.detail.value===''){
      this.setData({
        decCheckMsg: '十二月份电量不能为空'
      })
    } else {
      this.setData({
        decCheckMsg: ''
      })
    }
	},
	biddingChange: function (e) {
		if(e.detail.value===''){
      this.setData({
        biddingCheckMsg: '月竞电量不能为空'
      })
    } else {
      this.setData({
        biddingCheckMsg: ''
      })
    }
	},
	bindMonthChange: function (e) {
		let myDate = new Date();
		const value = Number(e.detail.value) + 1;
		const year = myDate.getFullYear();
		const month = Number(value) < 10 ? `0${value}`: value;
		const submitMonth = `${year}-${month}`;
    this.setData({
			currentMonth: e.detail.value,
			submitMonth: submitMonth
    })
	},
	spreadChange: function (e) {
		if(e.detail.value===''){
      this.setData({
        spreadCheckMsg: '价差不能为空'
      })
    } else {
      this.setData({
        spreadCheckMsg: ''
      })
    }
	},
	contractCodeAChangeOver: function (e) {
		if(e.detail.value===''){
      this.setData({
        contractCodeACheckMsg: '合同编号不能为空'
      })
    } else {
      this.setData({
        contractCodeACheckMsg: ''
      })
    }
	},
	contractCodeBChangeOver: function (e) {
		if(e.detail.value===''){
      this.setData({
        contractCodeBCheckMsg: '合同编号不能为空'
      })
    } else {
      this.setData({
        contractCodeBCheckMsg: ''
      })
    }
	},
	emailAChangeOver: function (e) {
		if(e.detail.value===''){
			this.setData({
				emailACheckMsg: '邮箱不能为空'
			})
		} else {
			if(!regs.EMAIL.test(e.detail.value)){
				this.setData({
					emailACheckMsg: '邮箱格式错误'
				})
			} else {
				this.setData({
					emailACheckMsg: ''
				})
			}
		}
	},
	emailBChangeOver: function (e) {
		if(e.detail.value===''){
			this.setData({
				emailBCheckMsg: '邮箱不能为空'
			})
		} else {
			if(!regs.EMAIL.test(e.detail.value)){
				this.setData({
					emailBCheckMsg: '邮箱格式错误'
				})
			} else {
				this.setData({
					emailBCheckMsg: ''
				})
			}
		}
	},
	linkmanAChangeOver: function (e) {
		if(e.detail.value===''){
      this.setData({
        linkmanACheckMsg: '联系人不能为空'
      })
    } else {
      this.setData({
        linkmanACheckMsg: ''
      })
    }
	},
	linkmanBChangeOver: function (e) {
		if(e.detail.value===''){
      this.setData({
        linkmanBCheckMsg: '联系人不能为空'
      })
    } else {
      this.setData({
        linkmanBCheckMsg: ''
      })
    }
	},
	handleExit: function () {
		wx.navigateBack({
			url: "../contracts/contracts"
		})
	},
	handleFirstNext: function (e) {
		let warn = "";
		var flag = true;
		const value = e.detail.value;
		if(this.data.companyA===''){
			warn = '请填写甲方公司名称!',
			this.setData({
				companyACheckMsg: '请填写甲方公司名称!'
			})
		} else if(value.managerA===''){
			warn = '请填写甲方法人姓名!',
			this.setData({
				managerACheckMsg: '请填写甲方法人姓名!'
			})
		} else if (value.contractCodeA===''){
			warn = '请输入甲方合同编号!',
			this.setData({
				contractCodeACheckMsg: '请输入甲方合同编号!'
			})
		} else if (value.voltage==='') {
			warn = '请输入电压等级!',
			this.setData({
				voltageCheckMsg: '请输入电压等级!'
			})
		} else if (value.transformerCapacity===''){
			warn = '请输入变压器容量!',
			this.setData({
				transformerCheckMsg: '请输入变压器容量!'
			})
		} else if (value.companyAAdress===[]){
			warn = '请选择甲方公司地址!'
		} else if (value.companyB===''){
			warn = '请填写乙方公司名称!',
			this.setData({
				companyBName: '请填写乙方公司名称!'
			})
		} else if (value.managerA===''){
			warn = '请填写乙方法人姓名!',
			this.setData({
				legalPersonB: '请填写乙方法人姓名!'
			})
		} else if (value.contractCodeB===''){
			warn = '请输入乙方合同编号!',
			this.setData({
				contractCodeBCheckMsg: '请输入乙方合同编号!'
			})
		} else if (value.companyBAdress==[]){
			warn = '请选择乙方公司地址!'
		} else {
			flag = false;
			const that = this;
			const activeIndex = that.data.activeIndex + 1;
			this.setData({
				activeIndex: activeIndex
			})
		}
		if(flag==true){
			wx.showModal({
				title: '提示',
				content: warn
			})
		}
	},
	handleSecondNext: function (e) {
		let warn = "";
		var flag = true;
		const value = e.detail.value;
		if(this.data.contactAName===''){
			warn = '请填写甲方联系人名称!',
			this.setData({
				linkmanACheckMsg: '请填写甲方联系人名称!'
			})
		} else if(value.mobileA===''){
			warn = '甲方联系人手机号不能为空!',
			this.setData({
				mobileACheckMsg: '甲方联系人手机号不能为空!'
			})
		} else if (!regs.PHONE.test(value.mobileA)){
			warn = '甲方联系人手机号格式错误!',
			this.setData({
				mobileACheckMsg: '甲方联系人手机号格式错误!'
			})
		} else if (value.emailA===''){
			warn = '甲方联系人邮箱号不能为空!',
			this.setData({
				emailACheckMsg: '甲方联系人邮箱号不能为空!'
			})
		} else if (!regs.EMAIL.test(value.emailA)) {
			warn = '甲方联系人邮箱号格式错误!',
			this.setData({
				emailACheckMsg: '甲方联系人邮箱号格式错误!'
			})
		} else if (value.phoneA===''){
			warn = '甲方联系人办公电话不能为空!',
			this.setData({
				phoneACheckMsg: '甲方联系人办公电话不能为空!'
			})
		} else if (!regs.TELEPHONE.test(value.phoneA)){
			warn = '甲方联系人办公电话格式错误!',
			this.setData({
				phoneACheckMsg: '甲方联系人办公电话格式错误!'
			})
		} else if (value.linkmanAAdress===[]){
			warn = '请选择甲方联系人地址!'
		} else if(this.data.contactBName===''){
			warn = '请填写乙方联系人名称!',
			this.setData({
				linkmanBCheckMsg: '请填写乙方联系人名称!'
			})
		} else if(value.mobileB===''){
			warn = '乙方联系人手机号不能为空!',
			this.setData({
				mobileBCheckMsg: '乙方联系人手机号不能为空!'
			})
		} else if (!regs.PHONE.test(value.mobileB)){
			warn = '乙方联系人手机号格式错误!',
			this.setData({
				mobileBCheckMsg: '乙方联系人手机号格式错误!'
			})
		} else if (value.emailB===''){
			warn = '乙方联系人邮箱号不能为空!',
			this.setData({
				emailBCheckMsg: '乙方联系人邮箱号不能为空!'
			})
		} else if (!regs.EMAIL.test(value.emailB)) {
			warn = '乙方联系人邮箱号格式错误!',
			this.setData({
				emailBCheckMsg: '乙方联系人邮箱号格式错误!'
			})
		} else if (value.phoneB===''){
			warn = '乙方联系人办公电话不能为空!',
			this.setData({
				phoneBCheckMsg: '乙方联系人办公电话不能为空!'
			})
		} else if (!regs.TELEPHONE.test(value.phoneB)){
			warn = '乙方联系人办公电话格式错误!',
			this.setData({
				phoneBCheckMsg: '乙方联系人办公电话格式错误!'
			})
		} else if (value.linkmanBAdress===[]){
			warn = '请选择乙方联系人地址!'
		} else {
			flag = false;
			const that = this;
			const activeIndex = that.data.activeIndex + 1;
			this.setData({
				activeIndex: activeIndex
			})
		}
		if(flag==true){
			wx.showModal({
				title: '提示',
				content: warn
			})
		}
	},
	handleThirdNext: function (e) {
		let warn = "";
		var flag = true;
		const value = e.detail.value;
		const effectiveTime = value.effectiveTime;
		const expiryDate = value.expiryDate;
		const dateOne = new Date(effectiveTime);
		const dateTwo = new Date(expiryDate);
		if (value.contract === '') {
			warn = '请填写合同名称!',
			this.setData({
				contractCheckMsg: '请填写合同名称!'
			})
		} else if (dateOne.getTime() > dateTwo.getTime()) {
			warn = '请选择正确的合同时间!'
		} else {
			flag = false;
			const that = this;
			const activeIndex = that.data.activeIndex + 1;
			this.setData({
				activeIndex: activeIndex
			})
		}
		if(flag==true){
			wx.showModal({
				title: '提示',
				content: warn
			})
		}
	},
	handleNext: function () {
		const that = this;
		const activeIndex = that.data.activeIndex + 1;
		this.setData({
			activeIndex: activeIndex
		})
	},
	handlePre: function () {
		const that = this;
		const activeIndex = that.data.activeIndex - 1;
		this.setData({
			activeIndex: activeIndex
		})
	},
	formSubmit: function (e) {
			let warn = "";
			var flag = true;
			const value = e.detail.value;
			const time = value.effectiveTime;
			const effectiveStr = time.split("-");
			const year = effectiveStr[0];
			const month = Number(effectiveStr[1]);
			const exmonth = month < 10 ? `0${month}` : month;
			const day = Number(effectiveStr[2]);
			const exday = day < 10 ? `0${day}` : day;
			const effectiveTime = `${year}-${exmonth}-${exday}`;
			const timeOne = value.expiryDate;
			const expiryDateStr = timeOne.split("-");
			const yearOne = expiryDateStr[0];
			const monthOne = Number(expiryDateStr[1]);
			const exmonthOne = monthOne < 10 ? `0${monthOne}` : monthOne;
			const dayOne = Number(expiryDateStr[2]);
			const exdayOne = dayOne < 10 ? `0${dayOne}` : dayOne;
			const expiryDate = `${yearOne}-${exmonthOne}-${exdayOne}`;
			const companyA = this.data.companyA;
			const contactAName = this.data.contactAName;
			let formulateCreatePOList = [{
					"power": value.Jan ? Number(value.Jan) : 0,
					"month": year + "-01",
				},
				{
					"power": value.Feb ? Number(value.Feb) : 0,
					"month": year + "-02",
				},
				{
					"power": value.Mar ? Number(value.Mar) : 0,
					"month": year + "-03",
				},
				{
					"power": value.Apr ? Number(value.Apr) : 0,
					"month": year + "-04",
				},
				{
					"power": value.May ? Number(value.May) : 0,
					"month": year + "-05",
				},
				{
					"power": value.Jun ? Number(value.Jun) : 0,
					"month": year + "-06",
				},
				{
					"power": value.Jul ? Number(value.Jul) : 0,
					"month": year + "-07",
				},
				{
					"power": value.Aug ? Number(value.Aug) : 0,
					"month": year + "-08",
				},
				{
					"power": value.Sep ? Number(value.Sep) : 0,
					"month": year + "-09",
				},
				{
					"power": value.Oct ? Number(value.Oct) : 0,
					"month": year + "-10",
				},
				{
					"power": value.Nov ? Number(value.Nov) : 0,
					"month": year + "-11",
				},
				{
					"power": value.Dec ? Number(value.Dec) : 0,
					"month": year + "-12",
				},
			]
			if (Number(value.contractType) === 0) {
				if (value.bilateral === '') {
					warn = '请填写双边电价!',
					this.setData({
						bilateralCheckMsg: '请填写双边电价!'
					})
				} else if (value.Jan === '') {
					warn = '请填写一月电量!',
					this.setData({
						janCheckMsg: '请填写一月电量!'
					})
				} else if (value.Feb === '') {
					warn = '请填写二月电量!',
					this.setData({
						febCheckMsg: '请填写二月电量!'
					})
				} else if (value.Mar === '') {
					warn = '请填写三月电量!',
					this.setData({
						marCheckMsg: '请填写三月电量!'
					})
				} else if (value.Apr === '') {
					warn = '请填写四月电量!',
					this.setData({
						aprCheckMsg: '请填写四月电量!'
					})
				} else if (value.May === '') {
					warn = '请填写五月电量!',
					this.setData({
						mayCheckMsg: '请填写五月电量!'
					})
				} else if (value.Jun === '') {
					warn = '请填写六月电量!',
					this.setData({
						junCheckMsg: '请填写六月电量!'
					})
				} else if (value.Jul === '') {
					warn = '请填写七月电量!',
					this.setData({
						julCheckMsg: '请填写七月电量!'
					})
				} else if (value.Aug === '') {
					warn = '请填写八月电量!',
					this.setData({
						augCheckMsg: '请填写八月电量!'
					})
				} else if (value.Sep === '') {
					warn = '请填写九月电量!',
					this.setData({
						sepCheckMsg: '请填写九月电量!'
					})
				} else if (value.Oct === '') {
					warn = '请填写十月电量!',
					this.setData({
						octCheckMsg: '请填写十月电量!'
					})
				} else if (value.Nov === '') {
					warn = '请填写十一月电量!',
					this.setData({
						novCheckMsg: '请填写十一月电量!'
					})
				} else if (value.Dec === '') {
					warn = '请填写十二月电量!',
					this.setData({
						decCheckMsg: '请填写十二月电量!'
					})
				} else {
					flag = false;
					const value = e.detail.value;
					request(urls.addBilateralContract, {
						method: 'POST',
						data: {
							areaName: `${value.companyAAdress[0]},${value.companyAAdress[1]},${value.companyAAdress[2]}`,
							effectiveTime: effectiveTime,
							expiryTime: expiryDate,
							monthlyPowers: formulateCreatePOList,
							name: value.contract,
							partyACode: value.contractCodeA,
							partyAContactAddr: `${value.linkmanAAdress[0]},${value.linkmanAAdress[1]},${value.linkmanAAdress[2]}`,
							partyAContactMobile: value.mobileA,
							partyAContactName: contactAName,
							partyAContactPhone: value.phoneA,
							partyALegalPerson: value.managerA,
							partyAName: companyA,
							partyBCode: value.contractCodeB,
							// partyBContactId: 0,
							price: Number(value.bilateral),
							transformerCapacity: value.transformerCapacity,
							voltageLevel: value.voltage
						},
						success: (res) => {
							if (res.code === 0) {
								wx.showToast({
									title: '新建长协合同成功',
									icon: 'success',
									duration: 2000
								});
								wx.navigateBack({
									url: "../contracts/contracts"
								})
							} else {
								wx.showToast({
									title: '创建失败',
									icon: 'none',
								});
							}
						},
						fail: () => {
							wx.showToast({
								title: '创建失败',
								icon: 'none',
							});
							wx.navigateBack({
								url: "../contracts/contracts"
							})
						}
					})
				}
			} else {
				if (value.biddingPower === '') {
					warn = '请填写月竞电量!',
					this.setData({
						biddingCheckMsg: '请填写月竞电量!'
					})
				} else if (value.spread === '') {
					warn = '请填写月竞价差!',
					this.setData({
						spreadCheckMsg: '请填写月竞价差!'
					})
				} else {
					flag = false;
					const value = e.detail.value;
					const contractMonth = value.contractMonth ? value.contractMonth + 1 : month + 1;
					const changeMonth = Number(contractMonth) < 10 ? `0${contractMonth}` : contractMonth;
					const sunmitMonth = `${year}-${changeMonth}`;
					const companyA = this.data.companyA;
					const contactAName = this.data.contactAName;
					request(urls.addBiddingContract, {
						method: 'POST',
						data: {
							areaName: `${value.companyAAdress[0]},${value.companyAAdress[1]},${value.companyAAdress[2]}`,
							effectiveTime: effectiveTime,
							expiryTime: expiryDate,
							name: value.contract,
							partyACode: value.contractCodeA,
							partyAContactAddr: `${value.linkmanAAdress[0]},${value.linkmanAAdress[1]},${value.linkmanAAdress[2]}`,
							partyAContactMobile: value.mobileA,
							partyAContactName: contactAName,
							partyAContactPhone: value.phoneA,
							partyALegalPerson: value.managerA,
							partyAName: companyA,
							partyBCode: value.contractCodeB,
							// partyBContactId: 0,
							monthStr: sunmitMonth,
							spread: value.spread,
							transformerCapacity: value.transformerCapacity,
							voltageLevel: value.voltage,
							power: value.biddingPower
						},
						success: (res) => {
							if (res.code === 0) {
								wx.showToast({
									title: '新建月竞合同成功',
									icon: 'success',
									duration: 2000
								});
								wx.navigateBack({
									url: "../contracts/contracts"
								})
							} else {
								wx.showToast({
									title: '创建失败',
									icon: 'none',
								});
							}
						},
						fail: (res) => {
							wx.showToast({
								title: res.message,
								icon: 'none',
							});
						}
					})
				}
			};
			if (flag == true) {
				wx.showModal({
					title: '提示',
					content: warn
				})
			};
	},
	tapName: function (e) {
		const id = e.currentTarget.dataset.value;
		this.setData({
			selectedId: id,
		})
	},
	catchTouchMove:function(res){
    return false
  }
})