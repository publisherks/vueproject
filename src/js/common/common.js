/*
 * Select Box Default Value
 */
const selectDefault = {
    text: "전체",
    value: 0
}

/*
 * empty value check
 */
const isEmpty = (value) => {
    return (value == "" || value == null || value == undefined || (value != null && typeof value == "object" && !Object.keys(value).length)) ? true : false
}


const reg = (value) => {
    return /[^가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z0-9|\s]/.test(value);
}

/*
 * 255, 255, 255 => #000000
*/
const rgbToHex = (r, g, b) => {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}


/*
 * #000000 => 255, 255, 255
*/
const hexToRgb = (hex) => {
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if(result){
        let r= parseInt(result[1], 16);
        let g= parseInt(result[2], 16);
        let b= parseInt(result[3], 16);
        return r+","+g+","+b;//return 23,14,45 -> reformat if needed 
    } 
    return null;
}


/*
 * random color
*/
const rand = (min, max) => {
    return parseInt(Math.random() * (max-min+1), 10) + min;
}


const rgbToHsl = (r, g, b) => {
    r /= 255, g /= 255, b /= 255;
    let max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if(max == min){
        h = s = 0; // achromatic
    }else{
        let d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch(max){
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    return [h*360, s*100, l*100];
}


const getRandomColor = (hex, adj) => {
    hex = hex.replace('#', '');
    let r = parseInt(hex.substr(0,2), 16);
    let g = parseInt(hex.substr(2,2), 16);
    let b = parseInt(hex.substr(4,2), 16);

    let hsl = rgbToHsl(r, g, b);

    let h = Math.min(360, hsl[0]+rand(adj*(-2), adj*2));
    let s = Math.min(100, hsl[1]+rand(adj*(-1/2), adj*(1/2)));
    let l = Math.min(100, hsl[2]+rand(adj*(-1), adj));

    hsl = "hsl("+h+","+s+"%,"+l+"%)";
    return hsl;
}


export {
    selectDefault,
    isEmpty,
    reg,
    rgbToHex,
    hexToRgb,
    getRandomColor
}