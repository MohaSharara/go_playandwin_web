import LocalStorage from "./LocalStorage";

class Auth {
    constructor() {
        this.authenticated = this.isAuthenticated();
        this.user = {};
    }

    resetAuthentication() {
        sessionStorage.removeItem('auth-token')
        sessionStorage.removeItem('channel')
        localStorage.removeItem("is-redirected");
        window.location.href = "/";
    }

    isAuthenticated() {
        return sessionStorage.getItem("auth-token") !== null;
    }

    getAuthToken() {
        const authToken = sessionStorage.getItem('auth-token')
        return authToken ? authToken : null;
    }

    setAuthToken(authTokenValue) {
        sessionStorage.setItem("auth-token", authTokenValue)
    }
}

export default new Auth();
