
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
                <p>${idea.userName}</p>
                <p>Manager: ${idea.manager}</p>
                <p><strong>Description:</strong> ${idea.description}</p>
            </div>
        `;
        return card;
    }

    function renderCategoryBoxes() {
        const ideas = getAllIdeas();
        const groupedIdeas = groupIdeasByCategory(ideas);
        container.innerHTML = "";

        for (const category in groupedIdeas) {
            const box = document.createElement("div");
            box.className = "category-box";
            box.setAttribute("data-category", category);
            box.style.border = "2px solid #007bff";
            box.style.marginBottom = "20px";
            box.style.padding = "20px";
            box.style.borderRadius = "10px";
            box.style.backgroundColor = "#f0f8ff";
            box.style.cursor = "pointer";

            const header = document.createElement("h3");
            header.textContent = `${category} (${groupedIdeas[category].length})`;
            header.style.color = "#0056b3";

            const preview = document.createElement("p");
            preview.textContent = "Click to view all ideas";
            preview.style.fontStyle = "italic";
            preview.style.color = "#777";

            box.appendChild(header);
            box.appendChild(preview);

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
