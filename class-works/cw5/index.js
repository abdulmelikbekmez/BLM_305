
navigator.getBattery().then(b => {
    console.log(b)

    c.innerText = `Is charging => ${b.charging}`
    clevel.innerText = `battery level => ${b.level * 100} % `
    ctime.innerText = `charging time => ${b.chargingTime}`

    b.onchargingchange = () => {
        c.innerText = `Is charging => ${b.charging}`
    };
    b.onchargingtimechange = () => {

        ctime.innerText = `charging time => ${b.chargingTime}`
    }
    b.onlevelchange = () => {
        clevel.innerText = `${b.level * 100} % `
        console.log("onlevelchange")
    }
})
keydown.innerText = "Not pressed"
keyup.innerText = "Not pressed"

window.onkeydown = (e) => keydown.innerText = `last keydown => ${e.code}`
window.onkeyup = (e) => keyup.innerText = `last keyup => ${e.code}`

s_online.innerText = `Network status => ONLINE`
window.ononline = (e) => s_online.innerText = `You are now online`
window.onoffline = (e) => s_online.innerText = ` You are now offline`
