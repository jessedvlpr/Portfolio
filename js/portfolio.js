let ribbons = document.getElementsByClassName('ribbon')
let topContainer = document.getElementById('top')
let mainContainer = document.getElementById('main')
let projectsData = JSON.parse(data)
let tagarr = []

for (let i = 0; i < ribbons.length; i++) {
    ribbons[i].onclick = function () {
        ribbonClicked(this)

    }
    ribbons[i].onmouseenter = function () {
        if (!this.classList.contains('toggled')) {
            this.style.paddingTop = 20 + "px"
        }
    }
    ribbons[i].onmouseleave = function () {
        if (!this.classList.contains('toggled')) {
            this.style.paddingTop = 10 + "px"
        }
    }
    ribbons[i].classList.remove('toggled')
}
ribbonClicked(document.getElementById('about-ribbon'))

function ribbonClicked(el) {
    let els = el.parentElement.getElementsByTagName('*')
    if (el.classList.contains('toggled')) {
        el.classList.remove('toggled')
        el.style.paddingTop = 10 + "px"
        for (let i = 0; i < els.length; i++) {
            els[i].classList.remove('bottom-shadow')
            els[i].classList.remove('inactive-text')
            els[i].classList.add('active-text')
        }
        mainContainer.innerHTML = ""
        mainContainer.removeAttribute("style")
        topContainer.innerHTML = ""
        topContainer.removeAttribute("style")
        return
    }
    mainContainer.innerHTML = ""
    mainContainer.removeAttribute("style")
    topContainer.innerHTML = ""
    topContainer.removeAttribute("style")

    el.classList.add('toggled')
    el.style.paddingTop = 20 + "px"
    el.classList.remove('bottom-shadow')
    el.classList.remove('inactive-text')
    el.classList.add('active-text')

    let ribbon = el.id.split("-")[0]
    switch (ribbon) {
        case "about":
            mainContainer.innerHTML = about
            mainContainer.style.paddingTop = "50px"
            break
        case "projects":
            populateProjects(ribbon)
            populateConstraints()
            break
        case "experience":
            mainContainer.innerHTML = experience
            mainContainer.style.paddingTop = "50px"
            break
        case "education":
            mainContainer.innerHTML = education
            mainContainer.style.paddingTop = "50px"
            break
        case "contact":
            mainContainer.innerHTML = contact
            mainContainer.style.paddingTop = "50px"
            break
    }

    for (let i = 0; i < els.length; i++) {
        if (els[i] == el) { continue }
        els[i].classList.remove('toggled')
        els[i].classList.add('bottom-shadow')
        els[i].classList.add('inactive-text')
        els[i].style.paddingTop = 10 + "px"
    }
}

function populateConstraints() {
    topContainer.innerHTML = ""
    let cons = []

    for (let i = 0; i < tagarr.length; i++) {
        let tag = document.createElement('p')
        tag.textContent = tagarr[i]
        tag.classList.add('tag')
        tag.style.marginTop = "10px"
        tag.style.cursor = "pointer"
        tag.classList.add('inactive-text')
        tag.onclick = function () {
            if (!this.classList.contains('toggled')) {
                this.classList.add('toggled')
                this.classList.add('active-text')
                this.classList.remove('inactive-text')
                cons.push(tagarr[i])
                populateProjects(cons)
                return
            }
            this.classList.remove('toggled')
            this.classList.remove('active-text')
            this.classList.add('inactive-text')
            cons.splice(cons.indexOf(tagarr[i]), 1)
            populateProjects(cons)
        }
        topContainer.appendChild(tag)
    }
}
function populateProjects(constraints) {
    mainContainer.innerHTML = ""

    for (let i = 0; i < Object.keys(projectsData).length; i++) {
        let project = projectsData[Object.keys(projectsData)[i]]
        if (!constraints.includes('projects') && !constraints.every(r => project["constraints"].includes(r))) continue

        for (let j = 0; j < project["constraints"].length; j++) {
            if (!tagarr.includes(project["constraints"][j]) && !constraints.includes(project["constraints"][j])) {
                // if (!tagarr.includes(project["constraints"][j])) {
                tagarr.push(project["constraints"][j])
            }
        }
        let projectElement = createProject(project)
        mainContainer.appendChild(projectElement)
        let tags = projectElement.getElementsByClassName("tag")
    }

    if (mainContainer.childNodes.length <= 0) {
        mainContainer.innerHTML = "No projects found."
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
    // console.log(project["constraints"])
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