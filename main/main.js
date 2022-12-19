import {fetchSkillTreeData, fetchGoalsData} from "./data-fetching.js";
import {renderTreeView} from "../skill_tree/skill-tree.js";
import {renderGoalView} from "../goals/goals-loader.js";
import {renderTreeViewAlternative} from "../skill_tree/skill-tree-alt.js";
import {renderOptions} from "../options/options.js";

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

treeViewBtn.addEventListener('click', async () => {
    mainContainer.innerHTML = ''
    const skillTreeDataJson = await fetchSkillTreeData()
    mainContainer.appendChild(renderTreeView(skillTreeDataJson))
})

treeViewAltBtn.addEventListener('click', async () => {
    fetchSkillTreeData()
        .then(json => renderViewAnimated(() => renderTreeViewAlternative(json)))
})

goalsBtn.addEventListener('click', async () => {
    fetchGoalsData()
        .then(json => renderViewAnimated(() => renderGoalView(json)))
})

optionsBtn.addEventListener('click', async () => {
    renderViewAnimated(() => renderOptions())
})

function renderViewAnimated(renderViewFunction) {
    const oldView = mainContainer.childNodes[0]
    const newView = renderViewFunction()
    mainContainer.appendChild(newView)

    if (oldView) {
        oldView.animate(
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
            .then(() => mainContainer.removeChild(oldView))
    }

    newView.animate(
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
        })

}

let background = document.querySelector('.background')

const dotsImg = document.createElement('div')
dotsImg.classList.add('dots-img')

const img = document.createElement('img')
img.src = '../images/dots.png'
dotsImg.appendChild(img)

background.appendChild(dotsImg)



