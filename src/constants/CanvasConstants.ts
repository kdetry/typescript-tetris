export const CanvasWidth = 200;
export const CanvasHeight = 400;
export const CanvasScaleWidth = 20;
export const CanvasScaleHeight = CanvasScaleWidth;
export const CanvasOffsetX = 1;
export const CanvasOffsetY = 1;
export const CanvasWidthTile = CanvasWidth/CanvasScaleWidth;
export const CanvasHeightTile = CanvasHeight/CanvasScaleHeight;


export enum ColorEnum {
    black = '#fafafa',
    red = '#F38630',
    aqua = '#FA6900',
    blue = '#A7DBD8',
    orange = '#69D2E7',
    yellow = '#315267',
    green = '#DA4F26',
    purple = '#a026f0'
}

export const GameColors: Array<ColorEnum>  = [
    ColorEnum.black, 
    ColorEnum.red, 
    ColorEnum.aqua, 
    ColorEnum.blue,
    ColorEnum.orange,
    ColorEnum.yellow,
    ColorEnum.green,
    ColorEnum.purple
];