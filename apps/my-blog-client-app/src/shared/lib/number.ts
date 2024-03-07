const THOUSAND_NUMBER = 1000;
const MILLION_NUMBER = 1000000;

const ZERO_CHAR = "0";
const THOUSAND_PREFIX = "K";
const MILLION_PREFIX = "M";

export const shortenNumber = (num: number): string => {
    let strNum = "";
    let prefix = "";

    if (num >= MILLION_NUMBER) {
        strNum = (num / MILLION_NUMBER).toFixed(2);
        prefix = MILLION_PREFIX;
    } else if (num >= THOUSAND_NUMBER) {
        strNum = (num / THOUSAND_NUMBER).toFixed(2);
        prefix = THOUSAND_PREFIX;
    } else {
        strNum = num.toString();
    }

    if (strNum.length > 1) {
        const lastChar = strNum.at(strNum.length - 1);
        const penulChar = strNum.at(strNum.length - 2);
    
        if (lastChar === ZERO_CHAR) {
            if (penulChar === ZERO_CHAR) {
                strNum = strNum.slice(0, strNum.length - 3);
            } else {
                strNum = strNum.slice(0, strNum.length - 1);
            }
        }
    }

    return strNum + prefix;
};
