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

export async function fetchUserDetails() {
    return fetch(`http://localhost:8080/users/${localStorage.getItem('user')}/details`, {
        'method': 'GET',
        'headers': getHeaders()
    })
        .then(response => response.json())
}

export async function fetchLessonHistory() {
    return fetch("../lesson-history-example.json")
        .then(content => content.json())
}

function getHeaders() {
    return new Headers({
        'Authorization': localStorage.getItem('jwtToken')
    })
}