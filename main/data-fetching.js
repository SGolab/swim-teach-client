export async function fetchSkillTreeData() {
    return fetch('http://localhost:8080/progressTree', {
        'method': 'GET',
        'headers': getHeaders()
    })
        .then(response => response.json())
}

export async function fetchGoalsData() {
    return fetch('http://localhost:8080/goals', {
        'method': 'GET',
        'headers': getHeaders()
    })
        .then(response => response.json())
}

function getHeaders() {
    return new Headers({
        'Authorization': localStorage.getItem('jwtToken')
    })
}