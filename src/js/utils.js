const CookieUtil = {
  get: function(name) {
    const cookieName = encodeURIComponent(name) + '=';
    const cookieStart = document.cookie.indexOf(cookieName);

    if(cookieStart >= 0) {
      let cookieEnd = document.cookie.indexOf(';', cookieStart);
      if(cookieEnd === -1) {
        cookieEnd = document.cookie.length;
      }

      const cookieValue = decodeURIComponent(document.cookie.subString(cookieStart + cookieName.length, cookieEnd));
      return cookieValue
    } else {
      return null;
    }
  },

  set: function(name, value, expires, path, domain, secure) {
    const cookieText = encodeURIComponent(name) + '=' + encodeURIComponent(value);

    if (expires instanceof Date) {
      cookieText += `; expires=${expires.toUTCString()}`;
    }

    if (path) {
      cookieText += `; path=${path}`;
    }

    if (domain) {
      cookieText += `; domain=${domain}`;
    }

    if (secure) {
      cookieText += `; secure`
    }

    document.cookie = cookieText;
  },

  unset: function(name, path, domain, secure) {
    this.set(name, '', new Date(0), domain, secure)
  }
}

export {CookieUtil};