
/** Return an RGB or RGBA value of grey from 0% to 100%, where 0 is black and 100 is white */
export const grey = (percent: number, alpha?: number) => {
    let cv = percent * 255 / 100 
    cv = cv > 255 ? 255 : cv < 0 ? 0 : cv
    if(alpha) return `rgba(${cv},${cv},${cv},${alpha})`;
    return `rgb(${cv},${cv},${cv})`;
}
