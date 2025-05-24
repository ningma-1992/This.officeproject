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
            <div class="card__body">
                <p>
                <button >
                 ${idea.voted ? '<i class="fa-solid fa-thumbs-up"></i>' : '<i class="fa-regular fa-thumbs-up"></i>' }
                </button>
              (${idea.num_of_votes})
                </p>
                
            </div>
        `;
            ideasContainer.appendChild(ideaCard);
            console.log('idea.voted',idea.voted)
        });
    }
}

renderIdeas();


// function renderIdeas() {
//     const ideasContainer = document.querySelector('.card-container');
//     ideasContainer.innerHTML = ''; // Clear previous content

//     const ideas = getAllIdeas();

//     if (Array.isArray(ideas)) {
//         ideas.forEach((idea, index) => {
//             const ideaCard = document.createElement('div');
//             ideaCard.className = 'card';
//             ideaCard.innerHTML = `
//                 <div class="card__title-row">
//                     <div class="count-badge count-badge__primary">${idea.category}</div>
//                     <span class="badge">${idea.status}</span>
//                 </div>
//                 <h3 class="card__title">${idea.title}</h3>
//                 <div class="card__body">
//                     <p>${idea.description} (${idea.empId})</p>
//                     <p>Team: ${idea.team}</p>
//                 </div>
//                 <div class="card__body">
//                     <p>
//                         <button class="vote-btn" data-index="${index}">
//                             ${idea.voted ? '<i class="fa-solid fa-thumbs-up"></i>' : '<i class="fa-regular fa-thumbs-up"></i>'}
//                         </button>
//                         <span class="vote-count">(${idea.num_of_votes})</span>
//                     </p>
//                 </div>
//             `;

//             ideasContainer.appendChild(ideaCard);
//         });

//         // Add click handlers to each vote button
//         // document.querySelectorAll('.vote-btn').forEach(button => {
//         //     button.addEventListener('click', function () {
//         //         const idx = parseInt(this.getAttribute('data-index'));
//         //         if (!ideas[idx].voted) {
//         //             ideas[idx].voted = true;
//         //             ideas[idx].num_of_votes += 1;
//         //         } else {
//         //             ideas[idx].voted = false;
//         //             ideas[idx].num_of_votes -= 1;
//         //         }
//         //         renderIdeas(); // Re-render to reflect changes
//         //     });
//         // });
//     }
// }
