
"use strict";
const cx = canvas.getContext('2d');
const img = new Image();
img.style.display = 'none';
img.crossOrigin = 'anonymous';
img.onload = start;

function start() {
    console.log(img.src, "loaded")
    canvas.width = img.width
    canvas.height = img.height
    cx.drawImage(img, 0, 0)
    MENU.W = canvas.width
    MENU.H = canvas.height
    display(MENU)
}
function pick(evt) {
    let x = evt.layerX, y = evt.layerY;
    let rgb, avg;
    try {
        let pixel = cx.getImageData(x, y, 1, 1);
        let data = pixel.data;
        rgb = 'rgb(' + data[0] + ', ' + data[1] + ', ' + data[2] + ')';
        avg = (data[0] + data[1] + data[2]) / 3;
    } catch {
        rgb = 'gray'; avg = 127;
    }
    color.style.background = rgb;
    color.style.color = avg < 127 ? "white" : "black";
    // if (rgb == 'gray') rgb = '';
    color.innerText = '{x:' + x + ', y:' + y + '}  ' + rgb;
}

class Graph extends Menu {
    constructor() {
        super()
        this.canvas = canvas
        this.context = cx
        this.image = img
    }
    loadImage(url) {
        switch (Number(url)) {
            case 1: url = "./images/balon.jpg"
                break;
            case 2: url = "./images/cilek.jpg"
                break;
            case 3: url = "./images/cicek.jpg"
                break;
            default: //do nothing
        }
        img.src = url
    }
    invert() {
        let id = this.context.getImageData(0, 0, this.W, this.H);
        let data = id.data;
        for (let i = 0; i < data.length; i += 4) {
            data[i] = 255 - data[i];   // red
            data[i + 1] = 255 - data[i + 1]; // green
            data[i + 2] = 255 - data[i + 2]; // blue
        }
        this.context.putImageData(id, 0, 0);
    }
    grayscale() {
        let id = this.context.getImageData(0, 0, this.W, this.H);
        let data = id.data;
        for (let i = 0; i < data.length; i += 4) {
            let avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
            data[i] = avg; // red
            data[i + 1] = avg; // green
            data[i + 2] = avg; // blue
        }
        this.context.putImageData(id, 0, 0);
    }
    swap(data, i, j) {
        let r = data[i]
        let g = data[i + 1]
        let b = data[i + 2]

        data[i] = data[j]
        data[i + 1] = data[j + 1]
        data[i + 2] = data[j + 2]

        data[j] = r
        data[j + 1] = g
        data[j + 2] = b
    }

    flip_vertical() {
        let id = this.context.getImageData(0, 0, this.W, this.H)
        let data = id.data
        for (let i = 0; i < data.length / 2; i += 4) {
            this.swap(data, i, data.length - 4 - i);
        }
        this.context.putImageData(id, 0, 0)
    }
    flip_mix() {

        let id = this.context.getImageData(0, 0, this.W, this.H)
        let data = id.data
        for (let i = 0; i < data.length; i += this.W) {
            for (let j = 0; j < this.W / 2; j += 4) {
                this.swap(data, i + j, i + this.W - 4 - j);
            }
        }

        this.context.putImageData(id, 0, 0)

    }
    red_green() {
        let id = this.context.getImageData(0, 0, this.W, this.H);
        let data = id.data;
        for (let i = 0; i < data.length; i += 4) {
            let avg = (data[i] + data[i + 1]) / 2;
            data[i] = avg; // red
            data[i + 1] = avg; // green
        }
        this.context.putImageData(id, 0, 0);
    }
    getPixelAt(x, y) {
        return this.context.getImageData(x, y, 1, 1).data;
    }
}

function init() {
    MENU = new Graph(); //global
    display(MENU); display(cx); display(img);
    MENU.loadImage(1)
}
canvas.addEventListener('mousemove', pick);
try {
    inspect(sss, init); //makes Inspector table
    inp.value = "start()";
} catch (e) {
    reportError(e);
}

