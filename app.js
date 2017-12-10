window.addEventListener('load', function () {
    var content = document.querySelector('.content');
    var loadingSpinner = document.getElementById('loading');    

    var webAuth = new auth0.WebAuth({
        domain: 'organizedthoughts.auth0.com',
        clientID: 'fY6gtnOhfgomjVsasAL90rKRoNx8a2j0',
        responseType: 'token id_token',
        audience: 'https://organizedthoughts.auth0.com/userinfo',
        scope: 'openid',
        redirectUri: 'https://milonlemon.github.io/organizer.html',
        leeway: 60
    });

    var loginBtn = document.getElementById('btn-login');
    var signupBtn = document.getElementById('btn-signup');

    loginBtn.addEventListener('click', function (e) {
        e.preventDefault();
        webAuth.authorize();
    });

    signupBtn.addEventListener('click', function (e) {
        e.preventDefault();
        webAuth.authorize();
    });

    function setSession(authResult) {
        // Set the time that the access token will expire at
        var expiresAt = JSON.stringify(
          authResult.expiresIn * 1000 + new Date().getTime()
        );
        localStorage.setItem('access_token', authResult.accessToken);
        localStorage.setItem('id_token', authResult.idToken);
        localStorage.setItem('expires_at', expiresAt);
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
            loginBtn.style.display = 'none';
            homeView.style.display = 'inline-block';
          } else if (err) {
            homeView.style.display = 'inline-block';
            console.log(err);
            alert(
              'Error: ' + err.error + '. Check the console for further details.'
            );
          }
        });
      }

      handleAuthentication();
});
