"use strict"



function toList(str) {
    function toObject(x) {
        let b = {}
        for (let [i, s] of x.split('\t').entries())
            b[keys[i]] = (isNaN(s) ? s : Number(s))
        return b
    }


    if (str) inp.value = str
    else str = inp.value

    let [d0, ...data] = str.split('\n')
    let keys = d0.split('\t')
    let a = data.map(toObject)
    return a
}

function volume(radius) {
    return (4 / 3) * Math.PI * Math.pow(radius, 3)
}


function mapVolume() {


    function toObject(x) {
        let b = {}
        for (let [i, s] of x.split('\t').entries())
            b[keys[i]] = (isNaN(s) ? s : Number(s))
        return b
    }
    let str = inp.value
    let [d0, ...data] = str.split('\n')
    let keys = d0.split('\t')

    console.log("Keys:", keys)
    let a = data.map(toObject)
    let b = a.map(x => ({ ...x, "Volume": volume(x.Radius) }))

    out.innerText = JSON.stringify(b, '', 2)
    console.table(b)

}

function filterMass() {

    function toObject(x) {
        let b = {}
        for (let [i, s] of x.split('\t').entries())
            b[keys[i]] = (isNaN(s) ? s : Number(s))
        return b
    }
    let str = inp.value
    let [d0, ...data] = str.split('\n')
    let keys = d0.split('\t')

    console.log("Keys:", keys)
    let a = data.map(toObject)
    let b = a.filter((x) => x.Mass > filter.value)

    out.innerText = JSON.stringify(b, '', 2)
    console.log(filter.value)
}
const PLANET =
    `Name	Diam	Mass	Radius	Period
Mercury	0.382	0.06	0.40	0.24
Venus	0.949	0.82	0.72	0.62
Earth	1.000	1.00	1.00	1.00
Mars	0.532	0.11	1.52	1.88
Jupiter	11.209	317.80	5.20	11.86
Saturn	9.449	95.20	9.54	29.46
Uranus	4.007	14.60	19.22	84.01
Neptune	3.883	17.20	30.06	164.80`,

    MOUNT = `mountain	height	place
Kilimanjaro	5895	Tanzania
Everest 	8848	Nepal
Mount Fuji	3776	Japan
Vaalserberg	323	Netherlands
Denali  	6168	United States
Popocatepetl	5465	Mexico
Mont Blanc	4808	Italy/France`


title.innerText = document.title
sample.innerText = toList
inp.value = PLANET
    //toList()  //array of objects

