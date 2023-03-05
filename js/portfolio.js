let ribbons = document.getElementsByClassName('ribbon')
let projectContainer = document.getElementById('projects')
let constraintContainer = document.getElementById('constraints')
let projectsData = JSON.parse(data)
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
        constraintContainer.innerHTML = ""
        return
    }
    el.setAttribute("toggled", "true")
    el.style.boxShadow = ""
    el.style.color = "#fff"
    populateProjects([el.id.split("-")[0]])
    grow(el)
    for (let i = 0; i < els.length; i++) {
        if (els[i] == el) { continue }
        els[i].setAttribute("toggled", "false")
        els[i].style.boxShadow = "#000 0px -20px 20px -20px inset"
        els[i].style.color = "#444"
        shrink(els[i])
    }
}

function populateProjects(constraints) {
    projectContainer.innerHTML = ""
    constraintContainer.innerHTML = ""
    let tagarr = []

    for (let i = 0; i < Object.keys(projectsData).length; i++) {
        let project = projectsData[Object.keys(projectsData)[i]]

        if (!constraints.includes('all') && !constraints.every(r => project["constraints"].includes(r))) continue

        for (let j = 0; j < project["constraints"].length; j++) {
            if (!tagarr.includes(project["constraints"][j])) {
                tagarr.push(project["constraints"][j])
            }
        }

        projectContainer.appendChild(createProject(project))
    }

    for (let i = 0; i < tagarr.length; i++) {
        let tag = document.createElement('p')
        tag.textContent = tagarr[i]
        tag.classList.add("tag")
        tag.style.marginTop = "10px"
        tag.style.cursor = "pointer"
        constraintContainer.appendChild(tag)
    }
}

function createProject(project) {
    let element = document.createElement('div')
    element.classList.add("project")
    element.style.zIndex = "0"

    let elementTitle = document.createElement('h2')
    elementTitle.textContent = project["title"]
    elementTitle.style.zIndex = "2"
    elementTitle.style.textAlign = "center"
    elementTitle.style.margin = "0 auto"
    elementTitle.style.marginTop = "10%"

    let elementImg = document.createElement('img')
    elementImg.classList.add("absolute-centered-xy")
    elementImg.style.zIndex = "-1"
    elementImg.alt = project["title"]
    elementImg.src = window.location.origin + project["thumbnail"].slice(1)

    let elementLine = document.createElement('hr')
    elementLine.classList.add("absolute-centered-x")
    elementLine.style.width = "85%"
    elementLine.style.bottom = "50px"

    let elementTags = document.createElement('div')
    elementTags.style.position = "absolute"
    elementTags.style.bottom = "0px"
    elementTags.style.margin = "15px"
    elementTags.style.marginBottom = "10px"
    elementTags.style.maxHeight = "35px"
    elementTags.style.overflow = "hidden"
    console.log(project["constraints"])
    for (let i = 0; i < project["constraints"].length; i++) {
        let tag = document.createElement('p')
        tag.textContent = project["constraints"][i]
        tag.classList.add("tag")
        elementTags.appendChild(tag)
    }

    element.onclick = function () {
        return createPopup(project)
    }

    // element.appendChild(elementImg)
    element.appendChild(elementTitle)
    element.appendChild(elementLine)
    element.appendChild(elementTags)

    return element
}

function createPopup(project) {

    if (document.getElementsByClassName('popup').length > 0) return

    let thumbnail = project["thumbnail"]
    let title = project["title"]
    let tags = project["constraints"]
    let description = project["description"]
    let weblink = project["weblink"]
    let repolink = project["repolink"]

    let element = document.createElement('div')
    element.className = "popup"

    let titleElement = document.createElement('h1')
    titleElement.style.width = "100%"
    titleElement.style.textAlign = "center"
    titleElement.textContent = title

    let tagsElement = document.createElement('ul')
    for (let i = 0; i < tags.length; i++) {
        let tagElement = document.createElement('li')
        tagElement.innerHTML = tags[i]
        tagsElement.appendChild(tagElement)
    }

    let descriptionElement = document.createElement('div')
    descriptionElement.style.width = "80%"
    descriptionElement.style.marginLeft = "10%"
    descriptionElement.style.marginRight = "10%"
    descriptionElement.style.textAlign = "center"
    descriptionElement.textContent = description

    let closeElement = document.createElement('a')
    closeElement.style.position = "absolute"
    closeElement.style.right = "20px"
    closeElement.style.top = "20px"
    closeElement.onmouseenter = function () {
        closeElement.style.backgroundColor = "#222"
    }
    closeElement.onmouseleave = function () {
        closeElement.style.backgroundColor = "#333"
    }
    closeElement.style.cursor = "pointer"
    closeElement.style.padding = "10px"
    closeElement.style.backgroundColor = "#333"
    closeElement.textContent = "X"
    closeElement.onclick = function () {
        document.body.removeChild(element)
    }

    element.appendChild(titleElement)
    element.appendChild(tagsElement)
    element.appendChild(descriptionElement)
    element.appendChild(closeElement)

    document.body.appendChild(element)
}