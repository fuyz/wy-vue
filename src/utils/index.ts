export function debounce(fn: any, delay: number) {
    let setT: any = ''
    return function (this: Window, ...argument: any) {
        let context = this
        setT && clearTimeout(setT)
        setT = setTimeout(function () {
            fn.apply(context, argument)
        }, delay)
    }
}

