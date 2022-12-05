import {fetchSkillTreeData, fetchGoalsData} from "./data-fetching.js";
import {renderTreeView} from "../skill_tree/skill-tree.js";
import {renderGoalView} from "../goals/goals-loader.js";
import {renderTreeViewAlternative} from "../skill_tree/skill-tree-alternative.js";

let panel = document.querySelector('.left-panel');
let mainContainer = document.querySelector('.main-container')

let openMenuButton = document.querySelector('#open-menu-button')

openMenuButton.addEventListener('click', () => {
    if (panel.style.display === 'block') {
        panel.style.display = 'none'
        mainContainer.style.gridColumn = '1/3'
    } else {
        panel.style.display = 'block'
        mainContainer.style.gridColumn = '2/3'
    }
})

let skillTreeAlternative = false;

let panelItems = document.querySelectorAll('.panel-item')
panelItems.forEach(i => {
    i.addEventListener('click', async () => {

        mainContainer.innerHTML = ''

        switch (i.innerText) {
            case 'SKILL TREE':

                const skillTreeDataJson = await fetchSkillTreeData()

                console.log(skillTreeDataJson)

                if (skillTreeAlternative) {
                    renderTreeViewAlternative(mainContainer, skillTreeDataJson)
                } else {
                    renderTreeView(mainContainer, skillTreeDataJson)
                }

                break
            case 'GOALS':
                const goalDataJson = await fetchGoalsData()
                renderGoalView(mainContainer, goalDataJson)
                break;
        }
    })
})

let toggleViewButton = document.querySelector('#change-tree-view-button')
toggleViewButton.addEventListener('click', () => {
    skillTreeAlternative = !skillTreeAlternative;
})

