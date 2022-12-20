export function createUserDetailsContainer(json) {
    const userDetailsContainer = document.createElement('div')
    userDetailsContainer.classList.add('user-details-container')

    userDetailsContainer.appendChild(createUserDetailsItem('Username', json.userName))
    userDetailsContainer.appendChild(createUserDetailsItem('Roles', json.roles))
    userDetailsContainer.appendChild(createUserDetailsItem('First Name', json.firstName))
    userDetailsContainer.appendChild(createUserDetailsItem('Last Name', json.lastName))

    return userDetailsContainer;
}

function createUserDetailsItem(propertyName, propertyValue) {
    const detailsItem = document.createElement('div')
    detailsItem.classList.add('details-item')

    const span = document.createElement('span')
    span.classList.add('details-item-property-name')
    span.innerText = propertyName + ": "
    span.innerText += (propertyValue ? propertyValue : 'none')
    detailsItem.appendChild(span)

    return detailsItem;
}