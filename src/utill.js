import errorCode from "./errorCode";

// sleep
const sleep = (time) => {
    return new Promise((resolve) => setTimeout(resolve, time))
}

function debounce(fn, delay) {
    let time = null;
    return function (...args) {
        if (time != null) {
            clearTimeout(time);
        }
        time = setTimeout(() => {
            fn.call(this, ...args);
        }, delay || 300);
    };
}

function throttle(fn, delay) {
    let flag = true
    return function (...args) {
        if (flag) {
            setTimeout(() => {
                fn.call(this, ...args);
                flag = true
            }, delay || 300);
        }
        flag = false
    };
}

/*
 *针对错误码表进行检查
 *@request : request body
 */
function checkResult(request) {
    const {
        data,
        code
    } = request
    if (code !== -1 && errorCode[code]) {
        return {
            ...errorCode[code],
            code
        }
    } else if (code !== -1 && !errorCode[code]) {
        return {
            code,
            msg: '系统错误，请稍后再试',
            type: 'systemError'
        }
    }
    return data
}

export {
    sleep,
    debounce,
    throttle,
    checkResult
}