function renderIdeas() {
    const ideasContainer = document.createElement('div');
    ideasContainer.className = 'card-container';
    const mainContainer = document.querySelector(".main-content");
    mainContainer.appendChild(ideasContainer);
    ideasContainer.innerHTML = ''; // Clear previous content

    const ideas = getAllIdeas();

    if (Array.isArray(ideas)) {
        ideas.filter(el => String(el.category).toLowerCase() === "operation").forEach(idea => {
            const ideaCard = document.createElement('div');
            ideaCard.className = 'card';
            ideaCard.innerHTML = `
            <div class="card__title-row">
                <div class="count-badge count-badge__primary">${idea.category}</div>
                <span class="badge">${idea.status}</span>
            </div>
            <div class="card__body">
                <p>${idea.userName}(${idea.empId})</p>
                <p>Team: ${idea.team}</p>
                <div class="user-icon-wrapper">
                    <div class="user-icon" style="background:red"></div>
                    <div class="user-icon" style="background:blue"></div>
                    <div class="user-icon" style="background:green"></div>
                    <div class="user-icon" style="background:orange"></div>
                </div>
                <p>Submitted: ${new Date(idea.timestamp).toLocaleDateString()}</p>
            </div>
        `;
            ideasContainer.appendChild(ideaCard);
        });
    }
}

renderIdeas();