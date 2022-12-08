"use strict";
//global values
// Location
var lat, lon;
// context
let ctx = main.getContext("2d")
ctx.font = "18px serif";

let icon = null
let text = null

function drawCanvas() {
    ctx.clearRect(0, 0, main.width, main.height)
    if (text) {
        ctx.fillText(text, 0, 20)
    }
    if (icon) {
        ctx.drawImage(icon, 100, 50, 100, 100)
    }
}
async function toJSON(url) {
    let r = await fetch(url)
    if (!r.ok) error(r.status)
    return r.json()
}

async function askLocation() {
    let name = 'geolocation'
    let result = await navigator.permissions.query({ name })
    if (result.state == 'denied') {
        let url = "https://ipinfo.io/json"
        toJSON(url).then(getLocation2, error)
    } else {
        navigator.geolocation
            .getCurrentPosition(getLocation1, error);
    }
}
function getLocation2(p) { //Approximate
    console.log("ipinfo.io", p.city)
    let [x, y] = p.loc.split(',')
    lat = Number(x); lon = Number(y);
    askWeather()
}
function getLocation1(p) { //Accurate
    console.log("getCurrentPosition")
    lat = p.coords.latitude; lon = p.coords.longitude;
    askWeather()
}
// Weather
var accessKey;
async function askWeather() {
    let u = "https://api.openweathermap.org/data/2.5/weather?"
        + "lat=" + lat + "&lon=" + lon + "&APPID=" + accessKey;
    let data = await toJSON(u)
    let weather = data.weather[0];
    setIcon(weather.icon)
    let celsius = convert(data.main.temp).toFixed(0)
    let hh = weather.main + "  " + celsius + "°", { sys } = data
    let yy = data.name + ', ' + sys.country
    lat = data.coord.lat; lon = data.coord.lon
    mahal.value = lat.toFixed(2) + ", " + lon.toFixed(2)
    const WIND = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW', 'N']
    let d = (data.wind.deg / 45).toFixed(0)
    text = `${hh} ${yy} Wind ${data.wind.deg}° ${WIND[d]}`
    drawCanvas()
}
function setIcon(i) {
    const u = "https://openweathermap.org/img/w/"
    icon = document.createElement("img")
    icon.src = u + i + ".png"
}
function convert(kelvin) {
    return (kelvin - 273.15);
    //return celsius*1.8 + 32
}
// Interaction
function askUser() {
    let k = prompt('Please enter openweather key:')
    if (!k) error('You need an API key')
    return k
}
function error(e) {
    main.style.display = "none"; //hide
    //refs.style.display = "none";
    err.style.display = ''; //show
    throw e
}
function getAPIkey() {
    if (origin.startsWith('http') && localStorage) {
        if (!localStorage.keys) localStorage.keys = '{}'
        let keys = JSON.parse(localStorage.keys)
        if (!keys.openweather) {
            keys.openweather = askUser()
            localStorage.keys = JSON.stringify(keys)
        }
        accessKey = keys.openweather
    } else { //cannot use localStorage
        accessKey = askUser()
    }
}
err.style.display = "none"
getAPIkey();
askLocation()

mahal.onkeyup = e => {
    let t = e.target
    if (e.keyCode === 13) {
        [lat, lon] = mahal.value.split(/[ ,]+/)
        askWeather()
    }
    if (e.keyCode === 27) t.blur()
}

