function acceptCookies() {
    document.getElementById('cookieConsentContainer').style.display = 'none';
    localStorage.setItem('cookiesAccepted', 'true');
  }
  
  window.onload = function() {
    if (localStorage.getItem('cookiesAccepted') !== 'true') {
      document.getElementById('cookieConsentContainer').style.display = 'block';
    }
  }
  