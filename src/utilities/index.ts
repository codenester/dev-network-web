export function setCookie(opt: { name: string, value: string, expire?: number }) {
  const { name, value, expire } = opt;
  const d = new Date();
  d.setTime(d.getTime() + ((expire ?? 1) * 24 * 60 * 60 * 1000));
  let expires = "expires=" + d.toUTCString();
  document.cookie = `${name}=${value};${expires};path=/`;
  // name + "=" + value + ";" + expires + ";path=/";
}
export function deleteCookie(name: string) {
  if (checkCookie(name)) {
    const d = new Date()
    const pastDate = new Date(d.getFullYear() - 1, 1, 1);
    const exp = "expires=" + pastDate.toUTCString();
    document.cookie = `${name}=;${exp};path=/`;
  }
}
export function getCookie(name: string) {
  let n = name + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(n) == 0) {
      return c.substring(n.length, c.length);
    }
  }
  return "";
}
export function checkCookie(name: string) {
  let username = getCookie(name);
  if (username) return true
  return false
}
