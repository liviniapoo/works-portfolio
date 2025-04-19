let projectList = [];

const addProjectsToHTML = () =>{
    const sectionIDs = ['3dmodelling', 'gamedesign', 'webdesign', 'design'];

    sectionIDs.forEach(id => {
        const assignedSection = document.getElementById(id);
        assignedSection.innerHTML = '';
    });

    if(projectList.length > 0){
        projectList.forEach(project => {
            let focus = project["main-focus"].toLowerCase().replace(/\s/g,'');
            let assignedSection = document.getElementById(focus);

            if(assignedSection){
                let newProject = document.createElement('div');
                newProject.classList.add('project-item');

                newProject.dataset.tags = project.tags.join(',');
                newProject.dataset.visible = 'true';

                newProject.innerHTML = `
                    <img src="${project["project-img"]}">
                    <a href="${project.url}" target="_blank" class="overlay">
                        <h2>${project["project-name"]}</h2>
                        <p>${project["project-description"]}</p>
                    </a>
                `;
                assignedSection.appendChild(newProject);
            }
        });

        sectionIDs.forEach(id => {
            const assignedSection = document.getElementById(id);
            if(assignedSection.children.length === 0){
                assignedSection.innerHTML = `<p class = "no-projects-msg">No projects here :(</p>`;
            }
        });
    }
}

document.getElementById('tagFilter').addEventListener('change', function(){
    const selectedTag = this.value;
    filterProjectsByTag(selectedTag);
});

const filterProjectsByTag = (tag) => {
    const sectionIDs = ['3dmodelling', 'gamedesign', 'webdesign', 'design'];

    sectionIDs.forEach(id => {
        const section = document.getElementById(id);
        let visibleCount = 0;

        Array.from(section.children).forEach(child =>{
            if(child.classList.contains('no-projects-msg')){
                child.remove();
                return;
            }
            const tags = child.dataset.tags || '';
            const shouldShow = tag === 'all' || tags.includes(tag);

            child.style.display = shouldShow ? 'block' : 'none';
            if(shouldShow) visibleCount++;
        });

        if(visibleCount == 0){
            const noMsg = document.createElement('p');
            noMsg.classList.add('no-projects-msg');
            noMsg.innerText = 'No projects here :(';
            section.appendChild(noMsg);
        }
    });
};


const initApp = () =>{
    fetch('projects.json')
    .then(response => response.json())
    .then(data =>{
        projectList = data;
        addProjectsToHTML();
    });
}

initApp();