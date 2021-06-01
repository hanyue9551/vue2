// 密码加密规则
import md5 from 'crypto-js/md5'
import HmacSHA256 from 'crypto-js/hmac-sha256'
import EncBase64 from 'crypto-js/enc-base64'
export const encodePwd = (word) => {
  const key = 'bonreesecret'
  return EncBase64.stringify(HmacSHA256(md5(word).toString(), key))
}
/*
* 写cookie
*/
export const setCookie = (name, value, expire) => {
  var date = new Date()
  date.setSeconds(date.getSeconds() + expire)
  document.cookie = name + '=' + escape(value) + '; expires=' + date.toGMTString() + ';path=/'
  // console.log(document.cookie)
}
/*
* 获取cookie
*/
export const getCookie = (name) => {
  if (document.cookie.length > 0) {
    let start = document.cookie.indexOf(name + '=')
    if (start !== -1) {
      start = start + name.length + 1
      let end = document.cookie.indexOf(';', start)
      if (end === -1) end = document.cookie.length
      return unescape(document.cookie.substring(start, end))
    }
  }
  return ''
}
/*
* 清除cookie
*/
export const delCookie = (name) => {
  setCookie(name, '', -1)
}