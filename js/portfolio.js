let ribbons = document.getElementsByClassName('ribbon')
let projectContainer = document.getElementsByClassName('projects-list')[0]
for (let i = 0; i < ribbons.length; i++) {
    ribbons[i].onclick = function () { return clicked(this) }
    ribbons[i].onmouseenter = function () { return grow(this) }
    ribbons[i].onmouseleave = function () { return shrink(this) }
    ribbons[i].setAttribute("toggled", "false")
}

function grow(el) {
    el.style.paddingTop = 20 + "px"
}
function shrink(el) {
    if (el.getAttribute("toggled") == "false") {
        el.style.paddingTop = 10 + "px"
    }
}
function clicked(el) {
    let els = el.parentElement.getElementsByTagName('*')
    if (el.getAttribute("toggled") == "true") {
        el.setAttribute("toggled", "false")
        shrink(el)
        for (let i = 0; i < els.length; i++) {
            els[i].style.boxShadow = ""
            els[i].style.color = "#fff"
        }
        projectContainer.innerHTML = ""
        return
    }
    el.setAttribute("toggled", "true")
    el.style.boxShadow = ""
    el.style.color = "#fff"
    populateProjects([el.id.split("_")[0]])
    grow(el)
    for (let i = 0; i < els.length; i++) {
        if (els[i] == el) { continue }
        els[i].setAttribute("toggled", "false")
        els[i].style.boxShadow = "#000 0px -20px 20px -20px inset"
        els[i].style.color = "#444"
        shrink(els[i])
    }
}
function populateProjects(filters) {
    projectContainer.innerHTML = ""
    projectsData = JSON.parse(data)
    for (let i = 0; i < Object.keys(projectsData).length; i++) {
        let delims = Object.values(projectsData[Object.keys(projectsData)[i]]["delims"])
        if (!filters.includes('all') && !filters.every(r => delims.includes(r))) continue
        let element = document.createElement('div')
        let titleElement = document.createElement('div')

        element.className = "project"
        element.style.backgroundImage = `url(${projectsData[Object.keys(projectsData)[i]]["thumbnail"]})`

        titleElement.className = "project-name"
        titleElement.innerHTML = projectsData[Object.keys(projectsData)[i]]["title"]

        element.onclick = function () {
            let thumbnail = projectsData[Object.keys(projectsData)[i]]["thumbnail"]
            let title = projectsData[Object.keys(projectsData)[i]]["title"]
            let tags = projectsData[Object.keys(projectsData)[i]]["delims"]
            let description = projectsData[Object.keys(projectsData)[i]]["description"]
            let weblink = projectsData[Object.keys(projectsData)[i]]["weblink"]
            let repolink = projectsData[Object.keys(projectsData)[i]]["repolink"]
            return popup(thumbnail, title, tags, description, weblink, repolink)
        }

        element.appendChild(titleElement)

        projectContainer.appendChild(element)
    }
}

function popup(thumbnail, title, tags, description, weblink, repolink) {
    if (document.getElementsByClassName('popup').length > 0) return
    let element = document.createElement('div')
    element.className = "popup"

    let titleElement = document.createElement('h1')
    titleElement.textContent = title
    titleElement.className = "popup-title"

    let tagsList = document.createElement('ul')
    tagsList.className = "popup-tags"
    for (let i = 0; i < tags.length; i++) {
        let tag = document.createElement('li')
        tag.className = "popup-tag"
        tag.innerHTML = "- " + tags[i]
        tagsList.appendChild(tag)
    }

    let descriptionElement = document.createElement('div')
    descriptionElement.className = "popup-description"
    descriptionElement.textContent = description

    let closeElement = document.createElement('a')
    closeElement.className = "popup-close"
    closeElement.innerHTML = "X"
    closeElement.onclick = function () {
        document.body.removeChild(element)
    }

    element.appendChild(titleElement)
    element.appendChild(tagsList)
    element.appendChild(descriptionElement)
    element.appendChild(closeElement)
    document.body.appendChild(element)
}