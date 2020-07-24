String.prototype.capitalizeFirstLetter = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

function offset(el) {
    var rect = el.getBoundingClientRect(),
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
}

document.title = `Wahtson - ${path.capitalizeFirstLetter()} @ ${version}`

if(path == 'config') {
    document.querySelector("main").innerHTML += `<h1>Configuration file for version ${version}</h1>`

    if(versions.latest == version) {
        document.querySelector("main").innerHTML += `<i>Latest stable release. <a href="/versions">Other versions</a></i>`
    } else {
        document.querySelector("main").innerHTML += `<i>Newer version(s) available <a href="/versions">here</a></i>`
    }

    for(const [key, value] of Object.entries(data)) {
        if(typeof value == 'object') {
            let html = `<h2><a href="${location.pathname}#${key}">${key}</a></h2>`

            if(key == 'options') {
                html += `<div><pre>${value.join("<br>")}</pre></div>`
            }
            if(key == 'details') {
                html += `<div><p>${value.join("<br>")}</p></div>`
            }

            if(['events', 'actions', 'conditions'].indexOf(key) >= 0) {
                document.querySelector("#sidebar").innerHTML += `<h2><a href="${location.pathname}#${key}">${key}</a></h2>`
                for(const [key1, value1] of Object.entries(value)) {
                    if(Array.isArray(value1)) {
                        html += `<div><p>${value1.join("<br>")}</p></div>`
                    } else {
                        document.querySelector("#sidebar").innerHTML += `<p><a href="${location.pathname}#${key}.${key1}">${key1}</a></p>`

                        html += `<div id="${key}.${key1}"><h4><a href="${location.pathname}#${key}.${key1}">${key1}</a></h4><p>${value1.desc.join("<br>")}</p><pre>${value1.example.join("\n")}</pre><p>${value1.extra.join("<br>")}</p></div>`
                    }
                }
            }
            if(key == 'placeholders') {
                document.querySelector("#sidebar").innerHTML += `<h2><a href="${location.pathname}#${key}">${key}</a></h2>`
                html += `<p>${value.desc.join("<br>")}</p>`
                for(const [key1, value1] of Object.entries(value.list)) {
                    document.querySelector("#sidebar").innerHTML += `<p><a href="${location.pathname}#${key}.${key1}">${key1}</a></p>`

                    html += `<div id="${key}.${key1}"><h4><a href="${location.pathname}#${key}.${key1}">${key1}</a></h4><p>${value1.desc.join("<br>")}</p>${value1.actions.map(a => { return `<a href="${location.pathname}#actions.${a}">${a}</a>` }).join("<br>")}</div>`
                }
            }
            if(key == 'types') {
                document.querySelector("#sidebar").innerHTML += `<h2><a href="${location.pathname}#${key}">${key}</a></h2>`
                for(const [key1, value1] of Object.entries(value.list)) {
                    document.querySelector("#sidebar").innerHTML += `<p><a href="${location.pathname}#${key}.${key1}">${key1}</a></p>`

                    html += `<div id="${key}.${key1}"><h4><a href="${location.pathname}#${key}.${key1}">${key1}</a></h4><p>${value1.join("<br>")}</p></div>`
                }
                html += `<div><p>${value.extra.join("<br>")}</p><div>`
            }
            document.querySelector("main").innerHTML += `<div id="${key}">${html}</div>`
        } else {
            if(value.startsWith('http'))
                document.querySelector("main").innerHTML += `<p class="${key}"><a href="${value}">${key.replace(/\_/g, ' ')}</a></p>`
            else
                document.querySelector("main").innerHTML += `<p class="${key}">${value}</p>`
        }
    }
}

document.querySelectorAll("a").forEach(item => {
    item.addEventListener('click', event => {
        if (new URL(item.href).hash !== "") {
            event.preventDefault()
            if(document.getElementById(new URL(item.href).hash.substr(1)) != undefined) {
                
                scrollTo({
                    top: offset(document.getElementById(new URL(item.href).hash.substr(1))).top - 16,
                    behavior: 'smooth',
                    block: 'start'
                })
                history.pushState({}, document.title, item.href)
            }
        }
    })
})

if(location.hash) {
    scrollTo({
        top: offset(document.getElementById(location.hash.substr(1))).top - 16
    })
}
