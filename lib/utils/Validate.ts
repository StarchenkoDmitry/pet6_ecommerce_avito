// source code from https://melvingeorge.me/blog/check-if-string-is-valid-email-address-javascript

// Regular expression to check if string is email
const regexExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gi;

export function validateEmail(email:string):boolean{
    return regexExp.test(email);
}
