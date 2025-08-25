import moment from 'moment';

export function setLocalStorage(responseObj) {
    const expiration = parseInt(responseObj.expiresIn);
    const expires = moment().add(expiration, 'd'); //add 14 days
    localStorage.setItem('token', responseObj.token);
    localStorage.setItem('expires', JSON.stringify(expires.valueOf()));
}

export function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('expires');
}

export function isLoggedIn() {
    return moment().isBefore(this.getExpiration());
}

export function isLoggedOut() {
    return !this.isLoggedIn();
}

export function getExpiration() {
    const expiration = localStorage.getItem('expires');
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
}
