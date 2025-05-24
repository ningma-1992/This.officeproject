function renderIdeas() {
    const ideasContainer = document.querySelector('.card-container');
    ideasContainer.innerHTML = ''; // Clear previous content

    const ideas = getAllIdeas();

    if (Array.isArray(ideas)) {
        ideas.forEach(idea => {
            const ideaCard = document.createElement('div');
            ideaCard.className = 'card';
            ideaCard.innerHTML = `
            <div class="card__title-row">
                <div class="count-badge count-badge__primary">${idea.category}</div>
                <span class="badge">${idea.status}</span>
            </div>
            <h3 class="card__title">${idea.title}</h3>
            <div class="card__body">
                <p>${idea.description} (${idea.empId})</p>
                <p>Team: ${idea.team}</p>
            </div>
        `;
            ideasContainer.appendChild(ideaCard);
        });
    }
}

renderIdeas();