console.log("HELLO")
let projectsUrl = 'http://127.0.0.1:5000/api/projects/' 

let getProjects = () => {
    fetch(projectsUrl)
    .then(response => response.json())
    .then(data => {
        // console.log(data)
        buildProjects(data)
    })
}

let buildProjects = (projects) => {
    let projectsWrapper = document.getElementById('projects--wrapper')
    projectsWrapper.innerHTML = ''
    // console.log('projectsWrapper', projectsWrapper)
    for (let i = 0; projects.length > i; i++){
        let project = projects[i]
        // console.log(project)
        let projectCard = `
            <div class="projects--card">
                <img src="http://127.0.0.1:5000${project.featured_image}"/>
                <div>
                    <div class="card--header">
                        <h3>${ project.title }</h3>
                        <strong class="vote--options" data-vote="up" data-project="${project.id}">&#43;</strong>
                        <strong class="vote--options" data-vote="down" data-project="${project.id}">&#8722;</strong>
                    </div>

                    <i>${project.vote_ratio}% Positive feedback</i>
                    <p>${project.description.substring(0, 150)}</p>
                </div>
            </div>
        `

        projectsWrapper.innerHTML += projectCard
    }
    addVoteEvents()
    // add an event listener

}

let addVoteEvents = () => {
    let voteBtns = document.getElementsByClassName('vote--options')
    for (let i = 0; voteBtns.length > i; i ++){

        voteBtns[i].addEventListener('click', (e) => {
            let token = localStorage.getItem('token')
            console.log(token)
            let vote = e.target.dataset.vote
            let project = e.target.dataset.project
            console.log('project:', project, 'vote:', vote)

            fetch(`http://127.0.0.1:5000/api/projects/${project}/vote/`, {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body:JSON.stringify({'value': vote})
            })
            .then(res => res.json())
            .then(data => {
                console.log('success', data)
                getProjects()
            })
        })
    }
}

getProjects()

