// function renderIdeas() {
//     const ideasContainer = document.createElement('div');
//     ideasContainer.className = 'card-container';
//     const mainContainer = document.querySelector(".main-content");
//     mainContainer.appendChild(ideasContainer);
//     ideasContainer.innerHTML = ''; // Clear previous content

//     const ideas = getAllIdeas();

//     if (Array.isArray(ideas)) {
//         ideas.filter(el => String(el.category).toLowerCase() === "operation").forEach(idea => {
//             const ideaCard = document.createElement('div');
//             ideaCard.className = 'card';
//             ideaCard.innerHTML = `
//             <div class="card__title-row">
//                 <div class="count-badge count-badge__primary">${idea.category}</div>
//                 <span class="badge">${idea.status}</span>
//             </div>
//             <div class="card__body">
//                 <p>${idea.userName}(${idea.empId})</p>
//                 <p>Team: ${idea.team}</p>
//                 <div class="user-icon-wrapper">
//                     <div class="user-icon" style="background:red"></div>
//                     <div class="user-icon" style="background:blue"></div>
//                     <div class="user-icon" style="background:green"></div>
//                     <div class="user-icon" style="background:orange"></div>
//                 </div>
//                 <p>Submitted: ${new Date(idea.timestamp).toLocaleDateString()}</p>
//             </div>
//         `;
//             ideasContainer.appendChild(ideaCard);
//         });
//     }
// }

// renderIdeas();



function renderIdeas() {
    const ideasContainer = document.querySelector('.card-container');
    ideasContainer.innerHTML = ''; // Clear previous content

    const drafts = getAllDrafts();

    if (Array.isArray(drafts)) {
        drafts.forEach((idea, index) => {
            const ideaCard = document.createElement('div');
            ideaCard.className = 'card';
            ideaCard.innerHTML = `
                <div class="card__title-row">
                    <div class="count-badge count-badge__primary">${idea.category}</div>
                    <span class="badge">${idea.status}</span>
                </div>
                <h3 class="card__title">${idea.department}</h3>
                <div class="card__body">
                    <p>${idea.userName}</p>
                    <p>Manager: ${idea.manager}</p>
                </div>
                <div class="card__body">
                </div>
            `;

            ideasContainer.appendChild(ideaCard);
        });

        // Attach click handlers AFTER appending to DOM
        // document.querySelectorAll('.vote-btn').forEach(button => {
        //     button.addEventListener('click', function () {
        //         const idx = parseInt(this.getAttribute('data-index'));
        //         const ideas = getAllIdeas(); // Get latest ideas from storage

        //         if (!ideas[idx].voted) {
        //             ideas[idx].voted = true;
        //             ideas[idx].num_of_votes += 1;
        //         } else {
        //             ideas[idx].voted = false;
        //             ideas[idx].num_of_votes -= 1;
        //         }

        //         // Save updated ideas back to localStorage
        //         localStorage.setItem('ideas', JSON.stringify(ideas));

        //         // Re-render UI
        //         renderIdeas();
        //     });
        // });
    }
}


renderIdeas();

