// 判断浏览器是否启用 cookie
export function isCookieEnabled() {
  // 尝试在 cookie 中设置一个值
  document.cookie = 'testcookie=1; SameSite=Strict;';
  // 检查是否已设置 cookie 的值
  const isEnabled = document.cookie.indexOf('testcookie=') !== -1;
  // 删除测试 cookie
  document.cookie = 'testcookie=1; SameSite=Strict; expires=Thu, 01 Jan 1970 00:00:00 UTC';
  // 返回是否启用 cookie 的结果
  return isEnabled;
}
