import {createOptionsItems} from "./options-dom.js";

export function renderOptions(mainContainer) {
    const optionsView = document.createElement('div');
    optionsView.classList.add('options-view')

    const optionsContainer = document.createElement('div');
    optionsContainer.classList.add('options-container')

    const options = [
        {
            text: 'USER DETAILS',
            action: showUserDetails
        },
        {
            text: 'LOG OUT',
            action: logOut
        },
        //todo delete start
        {
            text: 'LOG OUT',
            action: logOut
        },
        {
            text: 'LOG OUT',
            action: logOut
        },
        {
            text: 'LOG OUT',
            action: logOut
        }
        //todo end
    ]

    let optionsItems = createOptionsItems(options);
    optionsItems.forEach(item => {
        optionsContainer.appendChild(item)
    })

    optionsView.appendChild(optionsContainer)
    mainContainer.appendChild(optionsView)
}

function showUserDetails() {
    alert('SHOWING USER DETAILS')
}

function logOut() {
    localStorage.clear()
    window.location.replace("../login/login.html");
}
