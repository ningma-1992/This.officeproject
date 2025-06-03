document.addEventListener("DOMContentLoaded", function () {
    const container = document.querySelector(".card-container");

    function getAllIdeas() {
        try {
            const ideas = JSON.parse(localStorage.getItem("ideas")) || [];
            return ideas;
        } catch (error) {
            console.error("Error getting ideas:", error);
            return [];
        }
    }

    function groupIdeasByCategory(ideas) {
        return ideas.reduce((groups, idea) => {
            const category = idea.category || "Uncategorized";
            if (!groups[category]) {
                groups[category] = [];
            }
            groups[category].push(idea);
            return groups;
        }, {});
    }

    function createCard(idea) {
        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
            <div class="card__title-row">
                <div class="count-badge count-badge__primary">${idea.category || "Uncategorized"}</div>
                <span class="badge">${idea.status}</span>
            </div>
            <h3 class="card__title">${idea.department}</h3>
            <div class="card__body">
                <p><strong>Submitted By:</strong> ${idea.userName}</p>
                <p><strong>Manager:</strong> ${idea.manager}</p>
                <p><strong>Description:</strong> ${idea.description}</p>
                <p><strong>Timeline:</strong> ${idea.timeline || ''}</p>
                <button class="vote-btn" data-id="${idea.id}" ${idea.voted ? 'disabled' : ''}>
                    ${idea.voted ? '✅ You Voted' : `👍 Vote (${idea.num_of_votes || 0})`}
                </button>
            </div>
        `;

        const voteButton = card.querySelector(".vote-btn");
        voteButton.addEventListener("click", function () {
            voteForIdea(idea.id);
        });

        return card;
    }

    function voteForIdea(ideaId) {
        const ideas = getAllIdeas();
        const idea = ideas.find(i => i.id === ideaId);
        if (idea) {
            if (!idea.voted) {
                idea.num_of_votes = (idea.num_of_votes || 0) + 1;
                idea.voted = true;
                localStorage.setItem("ideas", JSON.stringify(ideas));
                renderIdeasFromCategory(idea.category);
            } else {
                alert("Aap pehle hi vote kar chuke ho!");
            }
        }
    }

    function renderCategoryBoxes() {
        const ideas = getAllIdeas();
        const groupedIdeas = groupIdeasByCategory(ideas);
        container.innerHTML = "";

        for (const category in groupedIdeas) {
            const box = document.createElement("div");
            box.className = "card"; 
            box.setAttribute("data-category", category);

            const header = document.createElement("h3");
            header.textContent = `${category} (${groupedIdeas[category].length})`;
            header.className = "card__title";
            header.style.cursor = "pointer";
            header.style.color = "black";

            const previewList = document.createElement("div");
            previewList.className = "card__body";

            groupedIdeas[category].slice(0, 2).forEach(idea => {
                const preview = document.createElement("p");
                preview.innerHTML = `
                    <strong>${idea.description}</strong><br/>
                    <small>By ${idea.userName}</small>
                `;
                previewList.appendChild(preview);
            });

            const clickHint = document.createElement("p");
            clickHint.textContent = "Click to view all ideas";
            clickHint.className = "card__body";
            clickHint.style.fontStyle = "italic";
            clickHint.style.color = "#777";

            box.appendChild(header);
            box.appendChild(previewList);
            box.appendChild(clickHint);

            box.addEventListener("click", () => {
                renderIdeasFromCategory(category);
            });

            container.appendChild(box);
        }
    }

    function renderIdeasFromCategory(category) {
        const ideas = getAllIdeas().filter(idea => idea.category === category);
        container.innerHTML = "";

        const backBtn = document.createElement("button");
        backBtn.textContent = "← Back to All Categories";
        backBtn.style.marginBottom = "20px";
        backBtn.style.padding = "10px";
        backBtn.style.border = "1px solid #ccc";
        backBtn.style.borderRadius = "5px";
        backBtn.style.cursor = "pointer";
        backBtn.addEventListener("click", () => {
            renderCategoryBoxes();
        });

        container.appendChild(backBtn);

        ideas.forEach(idea => {
            const ideaCard = createCard(idea);
            container.appendChild(ideaCard);
        });
    }

    renderCategoryBoxes();
});




// document.addEventListener("DOMContentLoaded", function () {
//     const container = document.querySelector(".card-container");

//     function getAllIdeas() {
//         try {
//             const ideas = JSON.parse(localStorage.getItem("ideas")) || [];
//             return ideas;
//         } catch (error) {
//             console.error("Error getting ideas:", error);
//             return [];
//         }
//     }

//     function groupIdeasByCategory(ideas) {
//         return ideas.reduce((groups, idea) => {
//             const category = idea.category || "Uncategorized";
//             if (!groups[category]) {
//                 groups[category] = [];
//             }
//             groups[category].push(idea);
//             return groups;
//         }, {});
//     }

//     function createCard(idea) {
//         const card = document.createElement("div");
//         card.className = "card";

//         card.innerHTML = `
//             <div class="card__title-row">
//                 <div class="count-badge count-badge__primary">${idea.category || "Uncategorized"}</div>
//                 <span class="badge">${idea.status}</span>
//             </div>
//             <h3 class="card__title">${idea.department}</h3>
//             <div class="card__body">
//                 <p>${idea.userName}</p>
//                 <p>Manager: ${idea.manager}</p>
//                 <p><strong>Description:</strong> ${idea.description}</p>
//             </div>
//         `;

//         return card;
//     }

//     function renderCategoryBoxes() {
//         const ideas = getAllIdeas();
//         const groupedIdeas = groupIdeasByCategory(ideas);
//         container.innerHTML = "";

//         for (const category in groupedIdeas) {
//             const box = document.createElement("div");
//             box.className = "card"; // using same class as original card
//             box.setAttribute("data-category", category);

//             const header = document.createElement("h3");
//             header.textContent = `${category} (${groupedIdeas[category].length})`;
//             header.className = "card__title";
//             header.style.cursor = "pointer";
//             header.style.color = "black";

//             const previewList = document.createElement("div");
//             previewList.className = "card__body";

//             groupedIdeas[category].slice(0, 2).forEach(idea => {
//                 const preview = document.createElement("p");
//                 preview.innerHTML = `
//                     <strong>${idea.description}</strong><br/>
//                     <small>By ${idea.userName}</small>
//                 `;
//                 previewList.appendChild(preview);
//             });

//             const clickHint = document.createElement("p");
//             clickHint.textContent = "Click to view all ideas";
//             clickHint.className = "card__body";
//             clickHint.style.fontStyle = "italic";
//             clickHint.style.color = "#777";

//             box.appendChild(header);
//             box.appendChild(previewList);
//             box.appendChild(clickHint);

//             box.addEventListener("click", () => {
//                 renderIdeasFromCategory(category);
//             });

//             container.appendChild(box);
//         }
//     }

//     function renderIdeasFromCategory(category) {
//         const ideas = getAllIdeas().filter(idea => idea.category === category);
//         container.innerHTML = "";

//         const backBtn = document.createElement("button");
//         backBtn.textContent = "← Back to All Categories";
//         backBtn.style.marginBottom = "20px";
//         backBtn.style.padding = "10px";
//         backBtn.style.border = "1px solid #ccc";
//         backBtn.style.borderRadius = "5px";
//         backBtn.style.cursor = "pointer";
//         backBtn.addEventListener("click", () => {
//             renderCategoryBoxes();
//         });

//         container.appendChild(backBtn);

//         ideas.forEach(idea => {
//             const ideaCard = createCard(idea);
//             container.appendChild(ideaCard);
//         });
//     }

//     renderCategoryBoxes();
// });
