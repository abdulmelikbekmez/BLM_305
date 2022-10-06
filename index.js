const el = document.getElementById("iban")
const number = 97

function increment() {
    let string = el.value
    let asdf = string.replace("TR", "")
    const len = asdf.length
    let index = len - 1
    let count = 0

    while (count++ < 2) {
        let el = asdf[index]
        let num = parseInt(el)
        if (isNaN(num)) {
            console.log("format is not valid!!!")
            return
        } else {
            console.log("dneme")
        }
        console.log("num => ", num)
        console.log(el)
        index--;

    }

}

function verifyIBAN() {
    let s = el.value
    console.log("verified => ", s)
    const ASCII_0 = 48, ASCII_A = 65;
    if (typeof s != 'string') s = String(s)
    const E = /[A-Z]{2}[0-9]{2}[A-Z0-9]+/
    if (!s.match(E)) {
        console.log(false)
        return false;
    }
    var acc = 0;
    function add(n) {
        if (n == 32) return
        // if (acc > 1000000) acc %= 97;
        acc = n < ASCII_A ? 10 * acc + n - ASCII_0
            : 100 * acc + n - ASCII_A + 10;
        acc %= 97;
    }
    s = s.substring(4) + s.substring(0, 4)
    for (let i = 0; i < s.length; ++i)
        add(s.charCodeAt(i));
    console.log(acc == 1)
    return acc == 1;
}
