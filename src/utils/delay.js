export function delay(timeout, value) {
    return new Promise(function (resolve) {
        setTimeout(resolve.bind(null, value), timeout)
    });
}