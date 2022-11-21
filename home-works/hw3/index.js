const CANVAS = document.getElementById("canvas")
const CTX = CANVAS.getContext("2d")

CANVAS.width = window.innerWidth
CANVAS.height = window.innerHeight - 700

const SPRITES = [
    "tile000.png",
    "tile001.png",
    "tile002.png",
    "tile003.png",
    "tile004.png",
    "tile005.png",
    "tile006.png",
    "tile007.png",
    "tile008.png",
    "tile009.png",
    "tile010.png",
    "tile011.png",
    "tile012.png",
    "tile013.png",
    "tile014.png",
    "tile015.png",
]

async function main() {
    let images = []
    let interval;
    for (const s of SPRITES) {
        const res = await fetch(`sprites/${s}`)
        const blob = await res.blob()
        let im = new Image()
        let url = URL.createObjectURL(blob)
        im.src = url
        images.push(im)

    }

    let index = 0;
    function draw(val) {
        index = (((val ? val : 1) + index) + images.length) % images.length
        let image = images[index]
        let s_x = (images.length - index) * image.width / images.length
        CTX.clearRect(0, 0, CANVAS.width, CANVAS.height)
        CTX.drawImage(image, s_x, 0, image.width, image.height)
    }

    draw(1)
    setDisable(false)
    function setDisable(val) {
        next.disabled = val
        prev.disabled = val
        sstop.disabled = !val
    }

    function onstart() {
        index = 0
        if (interval) {
            return
        }
        interval = setInterval(() => {
            draw()
        }, 100);
        setDisable(true)
    }

    function onpause() {
        if (interval) {
            clearInterval(interval)
            interval = null
            setDisable(false)
        } else {
            interval = setInterval(() => {
                draw()
            }, 100);
            setDisable(true)
        }

    }

    function onstop() {
        if (interval) {
            clearInterval(interval)
            interval = null
            setDisable(false)
        }
    }

    function onnext() {
        draw()
    }

    function onprev() {
        draw(-1)
    }

    start.onclick = onstart
    pause.onclick = onpause
    sstop.onclick = onstop
    next.onclick = onnext
    prev.onclick = onprev
}

main()

