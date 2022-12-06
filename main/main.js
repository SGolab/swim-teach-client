import {fetchSkillTreeData, fetchGoalsData} from "./data-fetching.js";
import {renderTreeView} from "../skill_tree/skill-tree.js";
import {renderGoalView} from "../goals/goals-loader.js";
import {renderTreeViewAlternative} from "../skill_tree/skill-tree-alt.js";

let mainContainer = document.querySelector('.main-container')
let background = document.querySelector('.background')

let treeViewBtn = document.querySelector('#tree-view-button');
let treeViewAltBtn = document.querySelector('#tree-view-alt-button');
let goalsBtn = document.querySelector('#goals-button');
let lessonHistoryBtn = document.querySelector('#lesson-history-button');

treeViewBtn.addEventListener('click', async () => {
    mainContainer.innerHTML = ''
    const skillTreeDataJson = await fetchSkillTreeData()
    renderTreeView(mainContainer, skillTreeDataJson)
})

treeViewAltBtn.addEventListener('click', async () => {
    mainContainer.innerHTML = ''
    const skillTreeDataJson = await fetchSkillTreeData()
    renderTreeViewAlternative(mainContainer, skillTreeDataJson)
})

goalsBtn.addEventListener('click', async () => {
    mainContainer.innerHTML = ''
    const goalDataJson = await fetchGoalsData()
    renderGoalView(mainContainer, goalDataJson)
})

const dotsImg = document.createElement('div')
dotsImg.classList.add('dots-img')

const img = document.createElement('img')
img.src = '../images/dots.png'
dotsImg.appendChild(img)

background.appendChild(dotsImg)
