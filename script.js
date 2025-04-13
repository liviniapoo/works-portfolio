let projectListHTML = document.querySelector('.projects-list');
let projectList = [];

const addProjectsToHTML = () =>{
    projectListHTML.innerHTML='';
    if(projectList.length > 0){
        projectList.forEach(project => {
            let newProject = document.createElement('div');
            newProject.classList.add('project-item');
            newProject.innerHTML = `
                <a href="${project.url}"><img src="${project["project-img"]}"></a>
                <h2>${project["project-name"]}</h2>
                <p>${project["project-description"]}</p>
            `;
            projectListHTML.appendChild(newProject);
        });
    }
}


const initApp = () =>{
    fetch('projects.json')
    .then(response => response.json())
    .then(data =>{
        projectList = data;
        addProjectsToHTML();
    });
}

initApp();