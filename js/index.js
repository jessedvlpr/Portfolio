let projectsData = JSON.parse(data);
let tagarr = ["Python", "JavaScript", "Java", "CSharp", "RDBMS"];
Object.values(projectsData).forEach((e) => { e.constraints.forEach((e) => { if (!tagarr.map(e => e.toLowerCase()).includes(e)) tagarr.push(e) }) });
let play = false;
let ribbons = Array.from(document.getElementsByClassName('ribbon'));
let params = new Object();
window.location.search.substring(1).split("&").forEach((e) => { params[e.split('=')[0]] = e.split('=')[1] });


if (!checkCookie('pf-fg')) setCookie('pf-fg', [12, 45, 126], 365);
if (!checkCookie('pf-bg')) setCookie('pf-bg', [4, 97, 123], 365);
if (!checkCookie('pf-text')) setCookie('pf-text', [255, 255, 255], 365);

changeColour('fg');
changeColour('bg');
changeColour('text');

for (let i = 0; i < ribbons.length; i++) {
    document.getElementsByClassName('ribbon')[i].classList.add('bottom-shadow');
    document.getElementsByClassName('ribbon')[i].classList.add('inactive-text');
    document.getElementsByClassName('ribbon')[i].onclick = function () {
        ribbonClicked(this);
    }
    document.getElementsByClassName('ribbon')[i].onmouseenter = function () {
        if (!this.classList.contains('toggled')) {
            this.style.paddingTop = 20 + "px";
        }
    }
    document.getElementsByClassName('ribbon')[i].onmouseleave = function () {
        if (!this.classList.contains('toggled')) {
            this.style.paddingTop = 10 + "px";
        }
    }
    document.getElementsByClassName('ribbon')[i].classList.remove('toggled');
}

window.onload = function () {
    if (ribbons.includes(document.getElementById(params.tab + '-ribbon'))) {
        document.getElementById(params.tab + '-ribbon').classList.add('toggled');
        document.getElementById(params.tab + '-ribbon').classList.add('active-text');
        document.getElementById(params.tab + '-ribbon').classList.remove('inactive-text');
        document.getElementById(params.tab + '-ribbon').classList.remove('bottom-shadow');
        document.getElementById(params.tab + '-ribbon').style.paddingTop = 20 + "px";
        document.getElementById(params.tab).style.display = 'block';
        let mainHeight = document.getElementById(params.tab).clientHeight + "px";
        document.getElementById('main').style.height = mainHeight;
    } else {
        document.getElementById('about-ribbon').classList.add('toggled');
        document.getElementById('about-ribbon').classList.add('active-text');
        document.getElementById('about-ribbon').classList.remove('inactive-text');
        document.getElementById('about-ribbon').classList.remove('bottom-shadow');
        document.getElementById('about-ribbon').style.paddingTop = 20 + "px";
        document.getElementById('about').style.display = 'block';
        let mainHeight = document.getElementById('about').clientHeight + "px";
        document.getElementById('main').style.height = mainHeight;
    }
}

window.onresize = function () {
    document.getElementById('main').style.height = 'fit-content';
    let ribbon = document.getElementsByClassName("toggled")[0].id.split("-")[0];
    let newHeight = document.getElementById(ribbon).clientHeight;
    document.getElementById('main').style.height = newHeight + "px";
    cancelGame();
};

window.onmousemove = window.onmousedown = function () {
    clearInterval(mouseInterval);
    document.getElementById('play').style.cursor = 'auto';
    document.getElementById('play-button').style.cursor = 'pointer';
    document.getElementById('play-button-svg').style.cursor = 'pointer';
    mouseInterval = window.setInterval(() => {
        document.getElementById('play').style.cursor = 'none';
        document.getElementById('play-button').style.cursor = 'none';
        document.getElementById('play-button-svg').style.cursor = 'none';
    }, 1000)
}

let mouseInterval = window.setInterval(() => {
    document.getElementById('play').style.cursor = 'none';
    document.getElementById('play-button').style.cursor = 'none';
    document.getElementById('play-button-svg').style.cursor = 'none';
}, 1000)

function ribbonClicked(el) {
    cancelGame();
    if (el.classList.contains('toggled')) return;
    let els = el.parentElement.getElementsByTagName('*');

    el.classList.add('toggled');
    el.style.paddingTop = 20 + "px";
    el.classList.remove('bottom-shadow');
    el.classList.remove('inactive-text');
    el.classList.add('active-text');

    Array.from(document.getElementsByClassName('ribbon')).forEach(e => {
        document.getElementById(e.id.split("-")[0]).style.display = 'none';
        document.getElementById(e.id.split("-")[0]).style.opacity = '0';
    });

    let ribbon = el.id.split("-")[0];

    window.history.replaceState({}, undefined, window.location.search.replace(params.tab == undefined ? '' : "?tab=" + params.tab, "?tab=" + ribbon));
    window.location.search.substring(1).split("&").forEach((e) => { params[e.split('=')[0]] = e.split('=')[1] });

    document.getElementById(ribbon).style.height = "fit-content";
    document.getElementById(ribbon).style.display = 'block';
    switch (ribbon) {
        case 'projects':
            populateProjects();
            populateConstraints();
            break;
        case 'experience':
            Array.from(document.getElementsByClassName('exp-box')).forEach(e => {

            })
            break;
    }
    let startHeight = document.getElementById(ribbon).scrollHeight + "px";
    let endHeight = document.getElementById(ribbon).scrollHeight + "px";

    document.getElementById('main').style.height = endHeight;
    document.getElementById(ribbon).style.opacity = "100";

    for (let i = 0; i < els.length; i++) {
        if (els[i] == el) continue;
        els[i].classList.remove('toggled');
        els[i].classList.add('bottom-shadow');
        els[i].classList.remove('active-text');
        els[i].classList.add('inactive-text');
        els[i].style.paddingTop = 10 + "px";
    }
}

if (ribbons.includes(document.getElementById(params.tab + '-ribbon'))) ribbonClicked(document.getElementById(params.tab + '-ribbon'));
else ribbonClicked(document.getElementById('about-ribbon'))

function populateConstraints() {
    document.getElementById('constraints').innerHTML = '';
    let cons = [];

    for (let i = 0; i < tagarr.length; i++) {
        let tag = document.createElement('p');
        tag.textContent = tagarr[i];
        tag.classList.add('tag');
        tag.classList.add('inactive-text');
        params.tags != undefined ? params.tags.split(',').forEach((e) => {
            if (e == tagarr[i]) {
                tag.classList.add('toggled');
                tag.classList.add('active-text');
                tag.classList.remove('inactive-text');
                cons.push(tagarr[i]);
            }
        }) : null;
        tag.onclick = function () {

            if (this.classList.contains('toggled')) {
                this.classList.remove('toggled');
                this.classList.remove('active-text');
                this.classList.add('inactive-text');
                cons.splice(cons.indexOf(tagarr[i]), 1);
            } else {
                this.classList.add('toggled');
                this.classList.add('active-text');
                this.classList.remove('inactive-text');
                cons.push(tagarr[i]);
            }

            params.tags == undefined ?
                window.history.replaceState({}, undefined, window.location.search + "&tags=" + cons.join(',')) :
                window.history.replaceState({}, undefined, window.location.search.replace("&tags=" + params.tags, "&tags=" + cons.join(',')));
            window.location.search.substring(1).split("&").forEach((e) => { params[e.split('=')[0]] = e.split('=')[1] });
            populateProjects(cons);
        }
        document.getElementById('constraints').appendChild(tag);
    }
}
function populateProjects(constraints) {
    let projects = document.getElementsByClassName('project');
    params.tags == undefined || params.tags == '' ? null : constraints = params.tags.split(',');
    constraints == undefined || constraints == [''] ? constraints = [] : null;
    console.log(constraints)
    Array.from(projects).forEach(e => { e.remove(); });

    for (let i = 0; i < Object.keys(projectsData).length; i++) {
        let project = projectsData[Object.keys(projectsData)[i]];
        if (!constraints.every(r => project["constraints"].map(e => e.toLowerCase()).includes(r.toLowerCase()))) continue;
        document.getElementById('projects').appendChild(createProject(project));
    }
    let endHeight = document.getElementById('projects').scrollHeight + "px";
    document.getElementById('main').style.height = endHeight;
}

function createProject(project) {
    let element = document.createElement('div');
    element.classList.add("project");

    let elementTitle = document.createElement('h2');
    elementTitle.textContent = project["title"];
    elementTitle.style.zIndex = "2";
    elementTitle.style.textAlign = "center";
    elementTitle.style.margin = "0 auto";
    elementTitle.style.marginTop = "10%";

    let elementImg = document.createElement('img');
    elementImg.classList.add("absolute-centered-xy");
    elementImg.style.zIndex = "-1";
    elementImg.alt = project["title"];
    elementImg.src = window.location.origin + project["thumbnail"].slice(1);

    let elementLine = document.createElement('hr');
    elementLine.classList.add("absolute-centered-x");
    elementLine.style.width = "85%";
    elementLine.style.bottom = "50px";

    let elementTags = document.createElement('div');
    elementTags.style.position = "absolute";
    elementTags.style.bottom = "0px";
    elementTags.style.margin = "15px";
    elementTags.style.marginBottom = "10px";
    elementTags.style.maxHeight = "35px";
    elementTags.style.overflow = "hidden";
    // console.log(project["constraints"])
    let tags = project["constraints"].sort(function (a, b) {
        return a.toLowerCase().localeCompare(b.toLowerCase());
    });
    for (let i = 0; i < tags.length; i++) {
        let tag = document.createElement('p');
        tag.textContent = tags[i];
        tag.classList.add("tag");
        elementTags.appendChild(tag);
    }

    element.onclick = function () {
        return createPopup(project);
    }

    // element.appendChild(elementImg)
    element.appendChild(elementTitle);
    element.appendChild(elementLine);
    element.appendChild(elementTags);

    return element;
}

function createPopup(project) {

    if (document.getElementsByClassName('popup').length > 0) return;

    let thumbnail = project["thumbnail"];
    let title = project["title"];
    let tags = project["constraints"].sort(function (a, b) {
        return a.toLowerCase().localeCompare(b.toLowerCase());
    });
    let description = project["description"];
    let weblink = project["weblink"];
    let repolink = project["repolink"];

    let element = document.createElement('div');
    element.className = "popup";

    let titleElement = document.createElement('h1');
    titleElement.textContent = title;

    let tagsElement = document.createElement('ul');
    for (let i = 0; i < tags.length; i++) {
        let tagElement = document.createElement('li');
        tagElement.innerHTML = tags[i];
        tagsElement.appendChild(tagElement);
    }

    let descriptionElement = document.createElement('div');
    descriptionElement.textContent = description;

    let weblinkElement = document.createElement('a');
    weblinkElement.textContent = weblink;
    weblinkElement.href = weblink;
    weblinkElement.style.width = 'fit-content';
    weblinkElement.target = '_blank';

    let repolinkElement = document.createElement('a');
    repolinkElement.textContent = repolink;
    repolinkElement.href = repolink;
    repolinkElement.style.width = 'fit-content';;
    repolinkElement.target = '_blank';

    let closeElement = document.createElement('a');
    closeElement.style.position = "absolute";
    closeElement.style.right = "20px";
    closeElement.style.top = "20px";
    closeElement.classList.add('circle-button');
    closeElement.textContent = "X";
    closeElement.onclick = function () {
        document.body.removeChild(element);
    }

    element.appendChild(titleElement);
    element.appendChild(tagsElement);
    element.appendChild(descriptionElement);
    element.appendChild(weblinkElement);
    element.appendChild(repolinkElement);
    element.appendChild(closeElement);

    document.body.appendChild(element);
}

async function playGame() {
    play ? play = false : play = true;
    if (play) {
        let left = false; let right = false; let up = false; let down = false

        let horiz = Math.floor(Math.random() * 2) == 0 ? -1 : 1;
        let vert = Math.floor(Math.random() * 2) == 0 ? -1 : 1;

        let leftStick = document.getElementById('left-stick');
        let rightStick = document.getElementById('right-stick');
        let ball = document.getElementById('game-ball');

        window.addEventListener('keydown', window.keyDownListener = (e) => {
            switch (e.key) {
                case 'ArrowLeft':
                    e.preventDefault();
                    left = true;
                    right = false;
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    left = false;
                    right = true;
                    break;
                case 'ArrowUp':
                    e.preventDefault();
                    up = true;
                    down = false;
                    break;
                case 'ArrowDown':
                    e.preventDefault();
                    up = false;
                    down = true;
                    break;
            }
        });
        window.addEventListener('keyup', window.keyUpListener = (e) => {
            switch (e.key) {
                case 'ArrowLeft':
                    e.preventDefault();
                    left = false;
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    right = false;
                    break;
                case 'ArrowUp':
                    e.preventDefault();
                    up = false;
                    break;
                case 'ArrowDown':
                    e.preventDefault();
                    down = false;
                    break;
            }
        });
        document.getElementById('play').style.borderColor = document.documentElement.style.getPropertyValue('--fg-colour');
        leftStick.style.backgroundColor = document.documentElement.style.getPropertyValue('--fg-colour');
        rightStick.style.backgroundColor = document.documentElement.style.getPropertyValue('--fg-colour');
        ball.style.backgroundColor = document.documentElement.style.getPropertyValue('--fg-colour');
        ball.style.display = 'auto';
        ball.style.zIndex = '1';
        document.getElementById('play-button-svg').style.clipPath = 'polygon(0 0, 5% 0, 50% 45%, 95% 0, 100% 0, 100% 5%, 55% 50%, 100% 95%, 100% 100%, 95% 100%, 50% 55%, 5% 100%, 0 100%, 0 95%, 45% 50%, 0 5%)';
        document.getElementById('game-score').style.removeProperty('color');
        let lScore = 0;
        let rScore = 0;
        let id = window.setInterval(() => {
            if (play == false) window.clearInterval(id);

            if (up && !down && leftStick.offsetTop > 40) {
                leftStick.style.top = leftStick.offsetTop - 5 + "px";
            } if (down && !up && leftStick.offsetTop < document.getElementById('play').clientHeight - 40) {
                leftStick.style.top = leftStick.offsetTop + 5 + "px";
            }

            if (ball.offsetTop > 40 && ball.offsetTop < document.getElementById('play').clientHeight - 20) {
                ball.style.top = ball.offsetTop + (5 * vert) + "px";
            } else {
                vert = -vert;
                ball.style.top = ball.offsetTop + (5 * vert) + "px";
            }

            if (ball.offsetLeft > 10 && ball.offsetLeft < document.getElementById('play').clientWidth - 10) {
                ball.style.left = ball.offsetLeft + (5 * horiz) + "px";
            } else {
                horiz == 1 ? lScore++ : rScore++;
                horiz = Math.floor(Math.random() * 2) == 0 ? -1 : 1;
                vert = Math.floor(Math.random() * 2) == 0 ? -1 : 1;
                ball.style.removeProperty('top');
                ball.style.removeProperty('left');
            }


            if (ball.offsetLeft > 25 && ball.offsetLeft < 35) {
                if (!(ball.offsetTop < leftStick.offsetTop - (leftStick.clientHeight / 2) ||
                    ball.offsetTop > leftStick.offsetTop + (leftStick.clientHeight / 2))) {
                    horiz = -horiz;
                    ball.style.left = ball.offsetLeft + (5 * horiz) + "px";
                }
            }

            if (ball.offsetLeft > document.getElementById('play').clientWidth - 35 && ball.offsetLeft < document.getElementById('play').clientWidth - 25) {
                if (!(ball.offsetTop < rightStick.offsetTop - (rightStick.clientHeight / 2) ||
                    ball.offsetTop > rightStick.offsetTop + (rightStick.clientHeight / 2))) {
                    horiz = -horiz;
                    ball.style.left = ball.offsetLeft + (5 * horiz) + "px";
                }
            }

            if ((Math.floor(Math.random() * 10) == 0 || (ball.offsetTop + (5 * vert)) < rightStick.offsetTop) &&
                ball.offsetLeft > document.getElementById('play').clientWidth / 2) rightStick.style.top = rightStick.offsetTop - 5 + "px";
            if ((Math.floor(Math.random() * 10) == 0 || (ball.offsetTop + (5 * vert)) > rightStick.offsetTop) &&
                ball.offsetLeft > document.getElementById('play').clientWidth / 2) rightStick.style.top = rightStick.offsetTop + 5 + "px";
            document.getElementById('game-score').textContent = `${lScore} : ${rScore}`
        }, 1000 / 60);
    } else cancelGame();
}

function cancelGame() {
    play = false;
    window.removeEventListener('keydown', window.keyDownListener, false)
    window.removeEventListener('keyup', window.keyUpListener, false)
    document.getElementById('play').style.removeProperty('border-color');
    document.getElementById('left-stick').style.removeProperty('background-color');
    document.getElementById('left-stick').style.removeProperty('top');
    document.getElementById('right-stick').style.removeProperty('background-color');
    document.getElementById('right-stick').style.removeProperty('top');
    document.getElementById('game-ball').style.removeProperty('background-color');
    document.getElementById('game-ball').style.removeProperty('top');
    document.getElementById('game-ball').style.removeProperty('left');
    document.getElementById('game-ball').style.zIndex = '-1';
    document.getElementById('play-button-svg').style.clipPath = 'polygon(0 0, 100% 50%, 0 100%)';
    document.getElementById('game-score').textContent = `${0} : ${0}`
    document.getElementById('game-score').style.color = 'transparent';
}

function colourPicker(area) {
    let pckr = document.getElementById('colour-picker-' + area.split("-")[1]).value;
    let r = parseInt(pckr.substring(1, 3), 16);
    let g = parseInt(pckr.substring(3, 5), 16);
    let b = parseInt(pckr.substring(5, 7), 16);
    setCookie(area, [r, g, b], 365);
    changeColour(area.split("-")[1]);
}

function changeColour(area) {
    let c = getCookie("pf-" + area).split(',');
    document.documentElement.style.setProperty('--' + area + '-colour', `rgb(${c[0]}, ${c[1]}, ${c[2]})`);
    let hexC = '#';
    for (let i = 0; i < c.length; i++) {
        c[i] = Number(c[i]).toString(16);
        if (c[i].length < 2) c[i] = '0' + c[i];
        hexC += c[i];
    }
    document.getElementById('colour-picker-' + area).value = hexC;
}

function resetColours() {
    setCookie('pf-fg', [12, 45, 126], 365);
    setCookie('pf-bg', [4, 97, 123], 365);
    setCookie('pf-text', [255, 255, 255], 365);
    changeColour('fg');
    changeColour('bg');
    changeColour('text');
}