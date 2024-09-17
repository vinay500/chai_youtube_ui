import { Cookies, useCookies } from 'react-cookie';


// const [ setCookie, removeCookie] = useCookies(["accessTokenCookie"]);
const cookies = new Cookies();

const accessTokenCookie = cookies.get('accessTokenCookie');
const refreshTokenCookie = cookies.get('refreshTokenCookie');
console.log("accessTokenCookie: ",accessTokenCookie)

const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${accessTokenCookie}`
}

export default headers;