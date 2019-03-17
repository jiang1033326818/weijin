export default {
  mainurl: 'https://zadai.net', // 全局接口地址
  loginUrl: '/login', // 登录接口
  localExpert: '/websocket/localExpert', // 聊天获取当前用户
  useradd: '/user/add', // 顾问申请
  londadd: '/loan/apply', // 服务申请,添加服务信息
  getcode: '/user/sendSmsCheckCode/', // 获取验证码
  checkmessagecode: '/user/checkMessageCode/', // 验证验证码
  getHistoryMessage: '/websocket/getHistoryMessage', // 聊天记录   get
  bindphone: '/user/bondMobile/', // 绑定手机号
  getloanall: '/loan/get', // 查询所有服务  post
  uploadimg: '/user/uploadImg', // 上传图片
  getloanlist: '/loan/listExpert', // 微金专家或本地专家列表
  addloanmark: '/loan/mark/', // 添加关注顾问
  useradviser: '/user/adviser/', // 顾问详情
  knowlist:'/know/list/',//知识库
  knowid:'/know/list/',//知识库id
  knowtype:'/know/showType/',//知识库类别
  consulatanturl:'/consultant/listById/',//查询顾问详情
  assessment:'/consultant/listAll/',//客户评价
  interesting:'/loan/mark/',//添加关注
  getmyadvice: '/loan/chatExpertPre', //我的咨询
  

  phoneandchat:"/advisory/record"
}