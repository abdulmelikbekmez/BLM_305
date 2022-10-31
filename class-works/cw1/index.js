const el = document.getElementById("iban")

function setCharAt(str, index, chr) {
    if (index > str.length - 1) return str;
    return str.substring(0, index) + chr + str.substring(index + 1);
}

function getToAdd(count) {
    if (count == 1)
        return 7
    if (count == 2)
        return 9
    return 0
}

function increment() {
    let string = el.value
    let replaced = string.replace("TR", "")
    const len = replaced.length
    let index = len - 1
    let count = 0
    let elde = 0

    while (count++ < 2 || elde > 0) {
        let el = replaced[index]
        let num = parseInt(el)
        if (isNaN(num)) {
            console.log(num, "format is not valid!!!")
            return
        }
        const toAdd = getToAdd(count)
        num += toAdd + elde
        elde = 0
        if (num > 9) {
            elde++
            num %= 10
        }
        replaced = setCharAt(replaced, index, num.toString())
        /* console.log("replaced => ", replaced) */
        /**/
        /**/
        /* console.log("num => ", num) */
        /* console.log(el) */
        index--;

    }
    el.value = "TR" + replaced

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

code.innerText = setCharAt + "\n" + getToAdd + "\n " + increment
