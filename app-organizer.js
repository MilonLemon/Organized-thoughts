window.addEventListener('load', function () {

    var webAuth = new auth0.WebAuth({
        domain: 'organizedthoughts.auth0.com',
        clientID: 'fY6gtnOhfgomjVsasAL90rKRoNx8a2j0',
        responseType: 'token id_token',
        audience: 'https://organizedthoughts.auth0.com/userinfo',
        scope: 'openid',
        redirectUri: 'https://organizedthoughts.auth0.com/v2/logout',
        leeway: 60
    });

    var name = document.getElementById('name');
    var logoutBtn = document.getElementById('btn-logout');

    logoutBtn.addEventListener('click', logout);

    function setSession(authResult) {
        // Set the time that the access token will expire at
        var expiresAt = JSON.stringify(
          authResult.expiresIn * 1000 + new Date().getTime()
        );
        localStorage.setItem('access_token', authResult.accessToken);
        localStorage.setItem('id_token', authResult.idToken);
        localStorage.setItem('expires_at', expiresAt);
        displayButtons();
      }
    
      function logout() {
        // Remove tokens and expiry time from localStorage
        localStorage.removeItem('access_token');
        localStorage.removeItem('id_token');
        localStorage.removeItem('expires_at');
      }
    
      function isAuthenticated() {
        // Check whether the current time is past the
        // access token's expiry time
        var expiresAt = JSON.parse(localStorage.getItem('expires_at'));
        return new Date().getTime() < expiresAt;
      }
    
      function handleAuthentication() {
        webAuth.parseHash(function(err, authResult) {
          if (authResult && authResult.accessToken && authResult.idToken) {
            window.location.hash = '';
            setSession(authResult);
          } else if (err) {
            console.log(err);
            alert(
              'Error: ' + err.error + '. Check the console for further details.'
            );
          }
          displayButtons();
        });
      }
    
      function displayButtons() {
        if (isAuthenticated()) {
          name.textContent = 'You are logged in!';
        } else {
          name.textContent = 'You are not logged in!';
          //location.href='"https://milonlemon.github.io';
        }
      }
    
      handleAuthentication();
});
