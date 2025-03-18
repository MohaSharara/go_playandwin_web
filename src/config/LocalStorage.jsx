class LocalStorage {
  setStorage(name, value, ) {
    localStorage.setItem(name, value);
  }

  removeStorage(name) {
    localStorage.removeItem(name);
  }
  getStorage(name) {
    return localStorage.getItem(name);
  }

  checkStorage(name) {
    if (localStorage.getItem(name) === null) {
      return false;
    } else return true;
  }
  clearStorage(){
    localStorage.clear()
  }
}
export default new LocalStorage();
