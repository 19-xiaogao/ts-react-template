const AdminToken = 'AdminToken'

export function setToken(value: any) {
  sessionStorage.setItem(AdminToken, value)
}

export function getToken() {
  return sessionStorage.getItem(AdminToken)
}
export function deleteToken() {
  return sessionStorage.removeItem(AdminToken)
}