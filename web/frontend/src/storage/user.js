class User {
  get () {
    return {
      'token': this.getToken(),
      'uid': this.getUid(),
      'account': this.getAccount(),
      'isAdmin': this.getIsAdmin()
    }
  }

  getToken () {
    return localStorage.getItem('token') || ''
  }

  setToken (token) {
    localStorage.setItem('token', token)
    return this
  }

  clear () {
    localStorage.clear()
  }

  getUid () {
    return localStorage.getItem('uid') || ''
  }

  setUid (uid) {
    localStorage.setItem('uid', uid)
    return this
  }

  getAccount () {
    return localStorage.getItem('account') || ''
  }

  setAccount (account) {
    localStorage.setItem('account', account)
    return this
  }

  getIsAdmin () {
    let isAdmin = localStorage.getItem('is_admin')
    return isAdmin === '1'
  }

  setIsAdmin (isAdmin) {
    localStorage.setItem('is_admin', isAdmin)
    return this
  }
}

export default new User()
