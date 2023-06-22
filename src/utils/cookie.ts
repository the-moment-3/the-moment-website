// 判断浏览器是否支持 cookie
export function supportCookie(name = '', extra = '') {
  // 创建测试 cookie
  name = 'utils_support_cookie' + name;
  document.cookie = `${name}=1${extra}`;
  // 检查测试 cookie 是否生效
  const cookies = decodeURIComponent(document.cookie).split(';');
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.indexOf(name) === 0) {
      // 删除测试 cookie
      // document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC${extra}`;
      return true;
    }
  }
  return false;
}

// 判断浏览器是否支持 cookie 的 SameSite = None 特性
// https://caniuse.com/?search=samesite
export function supportCookieSameSiteNone() {
  return supportCookie('_same_site', '; SameSite=None; Secure');
}
