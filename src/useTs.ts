
interface ImageElement {
    view: (image: HTMLImageElement) => void;
    destroy: (image: HTMLImageElement) => void;
    width: number,
    height: number
}

const ImageView = (ie: ImageElement, img: HTMLImageElement): void => {
    ie.destroy(img);
    ie.view(img);
    console.log(ie.width, ie.height);
}

class IE {
    constructor(public width: number, public height: number) {}
    view(img: HTMLImageElement) {
        console.log(img);
    }
    destroy(img: HTMLImageElement) {
        console.log(img);
    }
}

const ie = new IE(100, 100);
const img = document.createElement('img');

export default () => {
    ImageView(ie, img);
}