window.addEventListener('load', function () {

    var webAuth = new auth0.WebAuth({
        domain: 'organizedthoughts.auth0.com',
        clientID: 'fY6gtnOhfgomjVsasAL90rKRoNx8a2j0',
        responseType: 'token id_token',
        audience: 'https://organizedthoughts.auth0.com/userinfo',
        scope: 'openid',
        redirectUri: 'https://milonlemon.github.io/organizer.html?'
    });

    var loginBtn = document.getElementById('btn-login');
    var signupBtn = document.getElementById('btn-signup');
    var logoutBtn = document.getElementById('btn-logout');

    loginBtn.addEventListener('click', function (e) {
        e.preventDefault();
        webAuth.authorize();
    });

    signupBtn.addEventListener('click', function (e) {
        e.preventDefault();
        webAuth.authorize();
    });

    logoutBtn.addEventListener('click', logout);
});