function renderCount(ideas) {
    const mainContainer = document.querySelector(".main-content");
    let totalIdeas = 0;
    let totalOperationIdeas = 0;
    if (Array.isArray(ideas)) {
        totalIdeas = ideas.length;
        totalOperationIdeas = ideas.filter(idea => String(idea.category).trim().toLowerCase() === "facility").length;
    }

    const summaryCounter = document.createElement("div");
    summaryCounter.className = "summary-counter";
    summaryCounter.innerHTML = `
        <span class="summary-counter__primary">${totalOperationIdeas} contributors</span>
        <small class="summary-counter__secondary">${totalIdeas} ideas</small>
    `;
    mainContainer.appendChild(summaryCounter);
}

function renderIdeas(ideas) {
    const ideasContainer = document.createElement('div');
    ideasContainer.className = 'card-container';
    const mainContainer = document.querySelector(".main-content");
    mainContainer.appendChild(ideasContainer);
    ideasContainer.innerHTML = ''; // Clear previous content

    if (Array.isArray(ideas)) {
        ideas.filter(el => String(el.category).toLowerCase() === "facility").forEach(idea => {
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
                <p>Submitted: ${new Date(idea.timestamp).toLocaleDateString()}</p>
            </div>
        `;
            ideasContainer.appendChild(ideaCard);
        });
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const ideas = getAllIdeas();
    renderCount(ideas);
    renderIdeas(ideas);
});