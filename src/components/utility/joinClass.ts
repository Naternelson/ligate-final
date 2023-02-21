export const joinClass = (...classNames: Array<undefined | string>) => {
    return classNames.filter(el => !!el).join(" ")
}