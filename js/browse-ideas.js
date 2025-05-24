
function renderIdeas() {
    const ideasContainer = document.querySelector('.card-container');
    ideasContainer.innerHTML = ''; // Clear previous content

    const ideas = getAllIdeas();

    if (Array.isArray(ideas)) {
        ideas.forEach((idea, index) => {
            const ideaCard = document.createElement('div');
            ideaCard.className = 'card';
            ideaCard.innerHTML = `
                <div class="card__title-row">
                    <div class="count-badge count-badge__primary">${idea.category}</div>
                    <span class="badge">${idea.status}</span>
                </div>
                <h3 class="card__title">${idea.department}</h3>
                <div class="card__body">
                    <p>${idea.description} (${idea.empId})</p>
                    <p>Manager: ${idea.manager}</p>
                </div>
                <div class="card__body">
                    <p>
                        <button class="vote-btn" data-index="${index}">
                            ${idea.voted ? '<i class="fa-solid fa-thumbs-up"></i>' : '<i class="fa-regular fa-thumbs-up"></i>'}
                        </button>
                        <span class="vote-count">(${idea.num_of_votes})</span>
                    </p>
                </div>
            `;

            ideasContainer.appendChild(ideaCard);
        });

        // Attach click handlers AFTER appending to DOM
        document.querySelectorAll('.vote-btn').forEach(button => {
            button.addEventListener('click', function () {
                const idx = parseInt(this.getAttribute('data-index'));
                const ideas = getAllIdeas(); // Get latest ideas from storage

                if (!ideas[idx].voted) {
                    ideas[idx].voted = true;
                    ideas[idx].num_of_votes += 1;
                } else {
                    ideas[idx].voted = false;
                    ideas[idx].num_of_votes -= 1;
                }

                // Save updated ideas back to localStorage
                localStorage.setItem('ideas', JSON.stringify(ideas));

                // Re-render UI
                renderIdeas();
            });
        });
    }
}





renderIdeas();
