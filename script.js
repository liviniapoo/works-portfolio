let projectList = [];

const addProjectsToHTML = () =>{
    document.querySelectorAll('.projects-list').forEach(section => section.innerHTML = '');

    if(projectList.length > 0){
        projectList.forEach(project => {
            let focus = project["main-focus"].toLowerCase().replace(/\s/g,'');
            let assignedSection = document.getElementById(focus);

            if(assignedSection){
                let newProject = document.createElement('div');
                newProject.classList.add('project-item');
                newProject.innerHTML = `
                    <a href="${project.url}"><img src="${project["project-img"]}"></a>
                    <h2>${project["project-name"]}</h2>
                    <p>${project["project-description"]}</p>
                `;
                assignedSection.appendChild(newProject);
            }
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