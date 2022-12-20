import {createOptionsItems} from "./options-dom.js";
import {createUserDetailsContainer} from "./user-details/user-details-dom.js";
import {fetchUserDetails} from "../main/data-fetching.js";

let optionsContainer;

export function renderOptions() {
    const optionsView = document.createElement('div');
    optionsView.classList.add('options-view')

    optionsContainer = document.createElement('div');
    optionsContainer.classList.add('options-container')

    const options = [
        {
            text: 'USER DETAILS',
            action: () => {
                fetchUserDetails()
                    .then(json => optionsView.appendChild(createUserDetailsContainer(json)))
            }
        },
        {
            text: 'LOG OUT',
            action: logOut
        }
    ]

    let optionsItems = createOptionsItems(options);
    optionsItems.forEach(item => {
        optionsContainer.appendChild(item)
    })

    optionsView.appendChild(optionsContainer)
    return optionsView;
}


function logOut() {
    localStorage.clear()
    window.location.replace("../login/login.html");
}
