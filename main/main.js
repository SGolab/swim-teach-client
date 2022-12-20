import {fetchSkillTreeData, fetchGoalsData} from "./data-fetching.js";
import {renderTreeView} from "../skill_tree/skill-tree.js";
import {renderGoalView} from "../goals/goals-loader.js";
import {renderTreeViewAlternative} from "../skill_tree_alt/skill-tree-alt.js";
import {renderOptions} from "../options/options.js";


let body = document.querySelector('body')
let mainContainer = document.querySelector('.main-container')

let userInfo = document.querySelector('.user-info')

let user = localStorage.getItem('user');

if (user) {
    userInfo.innerText = 'Logged in: ' + localStorage.getItem('user')
}

let treeViewBtn = document.querySelector('#tree-view-button');
let treeViewAltBtn = document.querySelector('#tree-view-alt-button');
let goalsBtn = document.querySelector('#goals-button');
let lessonHistoryBtn = document.querySelector('#lesson-history-button');
let optionsBtn = document.querySelector('#options-button');

let buttonClicked;

treeViewBtn.addEventListener('click', async function () {
    if (buttonClicked === this) return
    changeButtonClicked(this)

    fetchSkillTreeData()
        .then(json => renderViewAnimated(() => renderTreeView(json)))
})

treeViewAltBtn.addEventListener('click', async function () {
    if (buttonClicked === this) return
    changeButtonClicked(this)

    fetchSkillTreeData()
        .then(json => renderViewAnimated(() => renderTreeViewAlternative(json)))
})

goalsBtn.addEventListener('click', async function () {
    if (buttonClicked === this) return
    changeButtonClicked(this)

    fetchGoalsData()
        .then(json => renderViewAnimated(() => renderGoalView(json)))
})

optionsBtn.addEventListener('click', async function () {
    if (buttonClicked === this) return
    changeButtonClicked(this)

    renderViewAnimated(() => renderOptions())
})

function renderViewAnimated(renderViewFunction) {
    body.style.pointerEvents = 'none' //disable clicking

    const oldView = mainContainer.childNodes[0]
    const newView = renderViewFunction()
    mainContainer.appendChild(newView)

    let promises = []

    if (oldView) {
        promises.push(oldView.animate(
            [
                {
                    transform: 'none'
                },
                {
                    transform: 'translateY(100vh)'
                }
            ],
            {
                duration: 1000,
                easing: 'ease-in-out'
            }
        ).finished
            .then(() => mainContainer.removeChild(oldView)))
    }

    promises.push(newView.animate(
        [
            {
                transform: 'translateY(-100vh)'
            },
            {
                transform: 'none'
            }
        ],
        {
            duration: 1000,
            easing: 'ease-in-out'
        }).finished)

    return Promise.all(promises)
        .then(() => body.style.pointerEvents = 'auto')
}

let background = document.querySelector('.background')

const dotsImg = document.createElement('div')
dotsImg.classList.add('dots-img')

const img = document.createElement('img')
img.src = '../images/dots.png'
dotsImg.appendChild(img)

background.appendChild(dotsImg)

function changeButtonClicked(newButtonClicked) {
    if (buttonClicked) {
        buttonClicked.classList.remove('clicked')
    }
    buttonClicked = newButtonClicked
    buttonClicked.classList.add('clicked')
}



