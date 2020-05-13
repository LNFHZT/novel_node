// 公共方法
/**
 * 10/13位时间戳转为北京时间
 * timestamp 时间戳
 * format 时间格式
 * 如需要返回'2019年01月01日'，format传"yyyy年MM月dd日"
 */
export function formatDate(timestamp, format = "yyyy-MM-dd hh:mm:ss") {
  if(timestamp === null || timestamp === undefined) {
    return ''
  }
  //10位时间戳转13位
  if (String(timestamp).length == 10) {
    timestamp += '000'
  }
  //时间戳转数字类型
  timestamp = Number(timestamp)
  //时间戳传入date对象
  const realDate = new Date(timestamp)

  //给单位数前面补0
  function timeFormat(num) {
    return `${num}`.padStart(2, '0')
  }
  let date = [
    ["M+", timeFormat(realDate.getMonth() + 1)],
    ["d+", timeFormat(realDate.getDate())],
    ["h+", timeFormat(realDate.getHours())],
    ["m+", timeFormat(realDate.getMinutes())],
    ["s+", timeFormat(realDate.getSeconds())],
    ["q+", Math.floor((realDate.getMonth() + 3) / 3)],
    ["S+", realDate.getMilliseconds()],
  ]
  let reg1 = /(y+)/i.exec(format)
  // console.log(reg1[0])
  if (reg1) {
    format = format.replace(reg1[1], (realDate.getFullYear() + '').substring(4 - reg1[1].length))
  }
  for (let i = 0; i < date.length; i++) {
    let k = date[i][0]
    let v = date[i][1]

    let reg2 = RegExp("(" + k + ")").exec(format)
    if (reg2) {
      format = format.replace(reg2[1], reg2[1].length == 1 ?
        v : ("00" + v).substring(("" + v).length))
    }
  }
  return format
}

export function formatDate2(timestamp, format = "yyyy-MM-dd hh:mm:ss") {
  //10位时间戳转13位
  // if (String(timestamp).length == 10) {
  //   timestamp += '000'
  // }
  // //时间戳转数字类型
  // timestamp = Number(timestamp)
  //时间戳传入date对象
  const realDate = new Date(timestamp)

  //给单位数前面补0
  function timeFormat(num) {
    return `${num}`.padStart(2, '0')
  }
  let date = [
    ["M+", timeFormat(realDate.getMonth() + 1)],
    ["d+", timeFormat(realDate.getDate())],
    ["h+", timeFormat(realDate.getHours())],
    ["m+", timeFormat(realDate.getMinutes())],
    ["s+", timeFormat(realDate.getSeconds())],
    ["q+", Math.floor((realDate.getMonth() + 3) / 3)],
    ["S+", realDate.getMilliseconds()],
  ]
  let reg1 = /(y+)/i.exec(format)
  // console.log(reg1[0])
  if (reg1) {
    format = format.replace(reg1[1], (realDate.getFullYear() + '').substring(4 - reg1[1].length))
  }
  for (let i = 0; i < date.length; i++) {
    let k = date[i][0]
    let v = date[i][1]

    let reg2 = RegExp("(" + k + ")").exec(format)
    if (reg2) {
      format = format.replace(reg2[1], reg2[1].length == 1 ?
        v : ("00" + v).substring(("" + v).length))
    }
  }
  return format
}
//今天日期
export function getToDay(){
  var getCurrentDate = new Date();
  var getCurrentDate  = formatDate(getCurrentDate,"yyyy-MM-dd");
  return getCurrentDate;
}
//昨天
export function getYesterDay(){
  var nowDate= new Date(); //当天日期
  var nowYear = nowDate.getFullYear();
  //当前月
  var nowMonth = nowDate.getMonth();
  //当前日
  var nowDay = nowDate.getDate();

  var getYesterdayDate = new Date(nowYear, nowMonth, nowDay - 1);
  var yesterdayDate =  formatDate(getYesterdayDate,"yyyy-MM-dd");
  return yesterdayDate
}
//获取上一周
export function getLastWeek(){
  const day = new Date();// 获取当前时间
  const week = day.getDay();
  const millisecond = 1000 * 60 * 60 * 24; // 一天的毫秒数
  const minusDay = week !== 0 ? week - 1 : 6; // 减去的天数
  // 获得当前周的第一天
  const currentWeekDayOne = new Date(day.getTime() - (millisecond * minusDay));
  // 上周最后一天即本周开始的前一天
  const priorWeekLastDay = new Date(currentWeekDayOne.getTime() - millisecond);
  // 上周的第一天
  const priorWeekFirstDay = new Date(priorWeekLastDay.getTime() - (millisecond * 6));
  // 添加至数组
  const firstWeek = formatDate(priorWeekFirstDay,"yyyy-MM-dd");
  const endWeek = formatDate(priorWeekLastDay,"yyyy-MM-dd");
  let arr = [];
  arr.push(firstWeek);
  arr.push(endWeek);
  return arr;
}
//上月
export function lastMonth(){
  var nowDate= new Date(); //当天日期
  var nowYear = nowDate.getFullYear();
  var lastMonthDate = new Date();  //上月日期
  var lastMonth = lastMonthDate.getMonth();

  //获得上月开始时间
  var getLastMonthStartDate = new Date(nowYear, lastMonth - 1, 1);
  var lastMonthStartDate = formatDate(getLastMonthStartDate,"yyyy-MM-dd");

  var monthStartDate1 = new Date(nowYear, lastMonth - 1, 1);
  var monthEndDate1 = new Date(nowYear, lastMonth, 1);
  var   days   =   (monthEndDate1   -   monthStartDate1)/(1000   *   60   *   60   *   24);
  
  //获得上月结束时间
  var getLastMonthEndDate = new Date(nowYear, lastMonth - 1, days);
  var lastMonthEndDate = formatDate(getLastMonthEndDate,"yyyy-MM-dd");
  let arr = [];
  arr.push(lastMonthStartDate);
  arr.push(lastMonthEndDate);
  return arr;
}
/**
 * 取location地址上的参数
 * name 要获取的那个参数的key
 */
export function getUrlParams(name) {
  let _reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)")
  let _r = window.location.search.substr(1).match(_reg)
  if (_r != null) return unescape(_r[2])
  return null
}

/**
 * 授权获取微信code
 * 回调地址，默认是回调到当前地址
 */
export function getWXCode({ appid = store.state.appid, redirectUrl, scope = 'snsapi_userinfo' }) {
  if (!redirectUrl) {
    redirectUrl = `${location.origin + location.pathname}#${store.state.myApp.$route.fullPath}`
  }
  // redirectUrl = 'https://sports.api.ibumobile.com'
  let _url = encodeURIComponent(redirectUrl)
  location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${_url}&response_type=code&scope=${scope}&state=STATE#wechat_redirect`
}

/**
 * 解决遮罩层滚动穿透问题，分别在遮罩层弹出后和关闭前调用
 * 在页面中mouted 函数函数中引入  this._modalHelperFunc = modalHelperFunc()
 * 打开弹窗  this._modalHelperFunc.afterOpen()
 * 关闭弹窗 this._modalHelperFunc.beforeClose()
 */
export function modalHelperFunc() {
  return {
    scrollTop: null,
    afterOpen() {
      this.scrollTop = document.scrollingElement.scrollTop;
      document.body.style.position = "fixed";
      document.body.style.top = -this.scrollTop + 'px';
    },
    beforeClose() {
      document.body.style.position = "";
      document.body.style.top = "";
      document.scrollingElement.scrollTop = this.scrollTop;
    }
  };
}


/**
 * 通过百度地图api根据经纬度获取位置信息
 * @param {Object} _BMap 百度地图对象
 * @param {Number} lat 纬度
 * @param {Number} lng 纬度
 */
export function locationToInfo(_BMap, lat, lng) {
  if (!_BMap) return
  return new Promise((resolve, reject) => {
    let _point = new _BMap.Point(lng, lat)
    let _gc = new _BMap.Geocoder()
    _gc.getLocation(_point, res => {
      resolve(res.addressComponents)
    })
  })
}

export function clone(obj) {
  if (obj === null) return null;
  if (obj.constructor !== 'object') return obj;
  if (obj.constructor === Date) return new Date(obj);
  if (obj.constructor === RegExp) return new RegExp(obj);
  var newObj = new obj.constructor(); //保持继承的原型
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      var val = obj[key];
      newObj[key] = typeof val === 'object' ? arguments.callee(val) : val;
    }
  }
  return newObj;
}


/**
 * 特殊的对象格式化url 参数形式 将数组转换成 
 *  x[]=123&x[]=456
 * @param {*} param 
 * @param {*} key 
 * @param {*} encode 
 */

export function stringify(param, key, encode) {
  if (param == null) return "";
  var paramStr = "";
  var t = typeof param;
  if (t == "string" || t == "number" || t == "boolean") {
    paramStr +=
      "&" +
      key +
      "=" +
      (encode == null || encode ? encodeURIComponent(param) : param);
  } else {
    for (var i in param) {
      var k =
        key == null
          ? i
          : key + (param instanceof Array ? "[" + "]" : "." + i);
      paramStr += stringify(param[i], k, encode);
    }
  }
  return paramStr;
}

/**
 * 判断一个值是否为数字
 * val 值
 * falg 是否开启强转换判断 默认开启
 * 强转换判断：可转换为数值的字符串 也会返回true，比如'123'
 * 弱判断：不转换，比如123才会返回true 字符串'123'返回false
 */
export function isNumber(val, flag = true) {
  if (flag) {
    return parseFloat(val).toString() === "NaN" ? false : true
  } else {
    return typeof (val) === 'number' ? true : false
  }
}
/**
 * 金额格式化（金额有小数显示两位小数，无小数则不显示小数位）
 * length 小数点后面保留几位，不够自动补0，默认2位
 * round 是否开启保留小数时四舍五入，默认开启
 */
export function moneyFormat(value, length = 2, round = true) {
  if (!isNumber(value)) return '0'
  let _result = value
  let _base = parseInt('1'.padEnd(length + 1, '0'))
  if (round) {
    _result = Math.round(_result * _base) / _base
  }
  _result = _result.toString()
  let _index = _result.indexOf('.')
  if (_index > 0) {
    while (_result.length <= _index + length) {
      _result += '0'
    }
    _result = _result.slice(0, _index + length + 1)
    let _Arr = _result.split('.')
    if (_Arr[1].indexOf('0'.padEnd(length, '0')) === 0) {
      _result = _Arr[0]
    }
  }
  return _result
}

/**
 * 获取小数位数
 *
 * @param {*} num
 * @returns {number}
 */
function _getDecimalDigits(num) {
  try {
    return num.toString().split('.')[1].length
  } catch (e) {
    return 0
  }
}
/**
 * 乘法函数
 * @param {...string|number} args 参数
 * @returns {number}
 */
export function accMul(...args) {
  let res = args.reduce((h, item) => {
    let num1 = Number(h),
        num2 = Number(item),
        temp = 0,
        l1 = 0,
        l2 = 0,
        m = 0,
        s1 = num1.toString(),
        s2 = num2.toString()
    l1 = _getDecimalDigits(num1)
    l2 = _getDecimalDigits(num2)
    m = Math.pow(10, l1 + l2)
    temp =
      Number.parseInt(s1.replace('.', '')) *
      Number.parseInt(s2.replace('.', ''))
    return temp / m
  })

  return res
}
/**
 * 除法函数
 * @param {...string|number} args 参数
 * @returns {number}
 */
export function accDivide(...args){
  let res = args.reduce((h,item) => {
    let num1 = Number(h),
        num2 = Number(item),
        temp = 0,
        l1 = 0,
        l2 = 0,
        m = 0,
        s1 = num1.toString(),
        s2 = num2.toString()
    l1 = _getDecimalDigits(num1)
    l2 = _getDecimalDigits(num2)
    m = Math.pow(10, (l2 - l1))
    temp = Number.parseInt(s1.replace('.', '')) / Number.parseInt(s2.replace('.', ''))
    return accMul(temp, m)
  })

  return res
}
/**
 * 加法函数
 * @param {...string|number} args 参数
 * @returns {number}
 */
export function accAdd(...args) {
  let res = args.reduce((h, item) => {
    let num1 = Number(h),
        num2 = Number(item),
        temp = 0,
        l1 = 0,
        l2 = 0,
        m = 0
    l1 = _getDecimalDigits(num1)
    l2 = _getDecimalDigits(num2)
    m = Math.pow(10, Math.max(l1, l2))
    temp = accMul(num1, m) + accMul(num2, m)
    return temp / m
  })

  return res
}
/**
 * 减法函数
 * @param {...string|number} args 参数
 * @returns {number}
 */
export function accSubtract(...args) {
  let res = args.reduce((h, item) => {
    let num1 = Number(h),
        num2 = Number(item)
    return accAdd(num1, -num2)
  })

  return res
}
/**
 * 取余函数 accModulo(1.1, 1) => 0.1
 * @param {string|number} h 参数1
 * @param {string|number} item 参数2
 * @returns {number}
 */
export function accModulo(h, item) {
  let num1 = Number(h),
      num2 = Number(item),
      temp = 0,
      l1 = 0,
      l2 = 0,
      m = 0
  l1 = _getDecimalDigits(num1)
  l2 = _getDecimalDigits(num2)
  m = Math.pow(10, Math.max(l1, l2))
  num1 = accMul(num1, m)
  num2 = accMul(num2, m)
  temp = num1 % num2
  return temp / m
}