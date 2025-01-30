const CHARS = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
const BASE = CHARS.length;
const MIN_VALUE = 100000000000;
const MAX_VALUE = Math.pow(BASE, 7) - 1;

exports.encodeBase62 = (num) => {
    if (num === 0) {
        return CHARS[0].padStart(7, '0');
    }

    let encoded = '';
    while (num > 0) {
        encoded = CHARS[num % BASE] + encoded;
        num = Math.floor(num / BASE);
    }

    return encoded.padStart(7, '0');
};

exports.decodeBase62 = (str) => {
    let num = 0;
    for (let char of str) {
        num = num * BASE + CHARS.indexOf(char);
    }
    return num;
};

exports.getRange = () => ({ MIN_VALUE, MAX_VALUE });