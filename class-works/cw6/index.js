
"use strict";
function error(e) {
    err.innerText = e; console.error(e)
    out.hidden = 1; err.hidden = 0
    showRateLimit()
}
function exception(s) {
    switch (s) {
        case 403:
            throw 'Rate limit exceeded'
        case 404:
            throw usr.value + ' not found'
        default:
            throw 'Status ' + s
    }
}
async function toJSON(url) {
    try {
        let r = await fetch(url)
        if (!r.ok) exception(r.status)
        return r.json()
    } catch (e) {
        error(e)
    }
}

function setElement(el, data, def) {
    el.hidden = false
    if (data) {
        el.innerText = data
    } else if (def) {
        el.innerText = def
    } else {
        el.hidden = true
    }
}
async function readUser() {
    const URL = "https://api.github.com/users/"
    let u = await toJSON(URL + usr.value)
    if (!u || !u.login) return
    console.log(u)
    out.hidden = 0; err.hidden = 1
    //start with the avatar
    avatar.src = u.avatar_url

    //name 
    setElement(user, u.name)

    // nickname
    setElement(nick, u.login)

    // location
    setElement(loc, u.location)

    // Blog 
    if (u.blog) {
        blogOut.hidden = false
        blogIn.innerText = u.blog
        blogIn.href = u.blog
    } else {
        blogOut.hidden = true
    }

    showRateLimit()
}
async function showRateLimit() {
    const LIM = "https://api.github.com/rate_limit"
    let { rate } = await toJSON(LIM)
    lim.innerText = rate.used + '/' + rate.limit
}
title.innerText = document.title
sample.innerText = setElement + "\n" + toJSON + '\n' + readUser + '\n'
readUser()
