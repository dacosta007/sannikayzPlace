/* help check if localStorage exist */
export function checkLocalStorage(storageName) {
  // check if the window object can be accessed
  if (window.localStorage) return 'Storage can\'t be access'

  const chk = localStorage.getItem(storageName) === null ? false : true
  return chk
}

/* help access localStorage */
function accessLocalStorage(storageName) {
  // check if access to localStorage is now permitted after pageLoad is completed
  const chkStorage = checkLocalStorage(storageName)
  
  if (typeof chkStorage === 'string') return false

  const storageData = chkStorage === false ? undefined : JSON.parse(localStorage.getItem(storageName))

  return storageData
}

/* help save into localStorage */
export function saveIntoLocalStorage(storageName, data) {
  localStorage.setItem(storageName, JSON.stringify(data))
}

/* help delete localStorage key */
export function deleteLocalStorage(storageName) {
  localStorage.removeItem(storageName)
}


export default accessLocalStorage