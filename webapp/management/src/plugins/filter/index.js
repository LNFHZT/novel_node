// import { isNumber } from '../../assets/js/Utils'

export default {
  install(Vue) {
    /**
     * 时间戳转周几
     */
    Vue.filter('dateToWeek', function (timestamp, isToday = false) {
      //10位时间戳转13位
      if (String(timestamp).length == 10) {
        timestamp += '000'
      }
      //时间戳转数字类型
      timestamp = Number(timestamp)
      //时间戳传入date对象
      const realDate = new Date(timestamp)
      let day = realDate.getDay()
      let currentDate = new Date()
      let weekday = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"]
      // 传参isToday 用来控制是否是今天，缺陷：获取判断的今天时间是获取本地的时间,本地时间可以被修改就会使判断有误
      if (isToday && realDate.toDateString() === currentDate.toDateString()) {
        //今天
        return '今天';
      }
      return weekday[day]
    })


    /**
     * 10/13位时间戳转为北京时间
     * timestamp 时间戳
     * format 时间格式
     * 如需要返回'2019年01月01日'，format传"yyyy年MM月dd日"
     */

    Vue.filter('dateFormat', function (timestamp, format = "yyyy-MM-dd hh:mm:ss") {
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
    })

    Vue.filter('dateFormat2', function (data, format = "yyyy-MM-dd hh:mm:ss") {
      let timestamp = new Date(data).getTime();
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
    })

    //限定字数溢出...
    Vue.filter('limit', function (value, maxLength, obj) {
      //避免当值为undefined时导致报错的问题
      if (!value) return value;
      //仅限制字数，不加...符号
      if (obj && obj.nosign) return value.length > maxLength ? value.slice(0, maxLength) : value;
      //贪婪算法，如限定字数为6时，实际字数为7则显示7，实际字数为大于7时显示6...，其余情况原样显示
      if (obj && obj.greedy) {
        //实际字数为 == 7时，显示7
        if (value.length == maxLength + 1) return value.slice(0, maxLength + 1)
        //实际字数为 > 7时，显示6...
        if (value.length > maxLength + 1) return value.slice(0, maxLength) + "..."
        //实际字数为 < 7时，原样输出
        return value
      }
      //常规限制输出，带...
      return value.length > maxLength ? value.slice(0, maxLength) + "..." : value;
    })

    /**
     * 金额格式化（金额有小数显示两位小数，无小数则不显示小数位）
     * length 小数点后面保留几位，不够自动补0，默认2位
     * round 是否开启保留小数时四舍五入，默认不开启
     */
    // Vue.filter('moneyFormat', function (value, length = 2, round = false) {
    //   if (!isNumber(value)) return '0'
    //   let _result = value
    //   let _base = parseInt('1'.padEnd(length + 1, '0'))
    //   if (round) {
    //     _result = Math.round(_result * _base) / _base
    //   }
    //   _result = _result.toString()
    //   let _index = _result.indexOf('.')
    //   if (_index > 0) {
    //     while (_result.length <= _index + length) {
    //       _result += '0'
    //     }
    //     _result = _result.slice(0, _index + length + 1)
    //     let _Arr = _result.split('.')
    //     if (_Arr[1].indexOf('0'.padEnd(length, '0')) === 0) {
    //       _result = _Arr[0]
    //     }
    //   }
    //   return _result
    // })
  }
}

