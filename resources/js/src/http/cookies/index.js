const tokenTitle = 'token-vmz'

const cookies = {
    getCookie(cname) {
        const name = cname + '=';
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) === 0) {
                return c.substring(name.length, c.length);
            }
        }
        return '';
    },
    getObjectCookie(cname) {
        const cookie = this.getCookie(cname);
        return cookie ? JSON.parse(cookie) : undefined;
    },
    eraseTokenInCookie(name = tokenTitle) {
        document.cookie = `${name}=undefined;max-age=0;`;
    },
    getTokenByCookies(refresh = false) {
        const jsonData = this.getObjectCookie(tokenTitle);
        if ((jsonData === undefined) && !(jsonData instanceof Object)) {
            this.eraseTokenInCookie(tokenTitle);
            return false;
        } else {
            return refresh ? jsonData.token.refresh_token : jsonData.token.access_token;
        }
    },
    createTokenDataInCookies(token) {
        this.eraseTokenInCookie(tokenTitle);
        const objToken = JSON.parse(token);
        const expires = (objToken instanceof Object) ? objToken.token.ExpiresIn : 21600;

        document.cookie = `${tokenTitle}=${token};max-age=${expires}`;
    }
}

export default cookies
