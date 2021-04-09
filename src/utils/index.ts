export function debounce(fn: any, delay: number) {
    let setT: any = ''
    return function (this: Window, ...argument: any) {
        setT && clearTimeout(setT)
        setT = setTimeout(() => {
            fn.apply(this, argument)
        }, delay)
    }
}

