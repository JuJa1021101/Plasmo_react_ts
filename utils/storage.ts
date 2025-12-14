export const formatStorageKey = (key: string) => {
  return `JR_${key}`
}

export const localStorageUtil = {
  set(key: string, value: string) {
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        localStorage.setItem(`JR_${key}`, value)
      }
    } catch (error) {
      console.error("** [JR] error of localStorageUtil **", error)
    }
  },
  get(key: string) {
    if (typeof window !== "undefined" && window.localStorage) {
      return localStorage.getItem(`JR_${key}`)
    }

    return null
  },
  remove(key: string) {
    if (typeof window !== "undefined" && window.localStorage) {
      localStorage.removeItem(`JR_${key}`)
    }
  }
}

export const sessionStorageUtil = {
  set(key: string, value: string) {
    try {
      if (typeof window !== "undefined" && window.sessionStorage) {
        sessionStorage.setItem(`JR_${key}`, value)
      }
    } catch (error) {
      console.error("** [JR] error of sessionStorageUtil **", error)
    }
  },
  get(key: string) {
    if (typeof window !== "undefined" && window.sessionStorage) {
      return sessionStorage.getItem(`JR_${key}`)
    }
    return null
  },

  clear() {
    const reservedKeys = ["sentryReplaySession"]
    if (typeof window !== "undefined" && window.sessionStorage) {
      const keys = Object.keys(sessionStorage)
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i]
        if (key && !reservedKeys.includes(key)) {
          window.sessionStorage.removeItem(key)
        }
      }
    }
  }
}
