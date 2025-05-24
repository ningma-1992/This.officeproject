function openForm() {
    const modal = document.getElementById("myModal");
    modal.classList.add("modal--active");
}

function closeForm() {
    const modal = document.getElementById("myModal");
    modal.classList.remove("modal--active");
}

function handleFormSubmit(event) {
    console.log('mridu');
    event.preventDefault();
    const form = document.getElementById("idea-form");
    const formData = new FormData(form);
    const idea = Object.fromEntries(formData.entries());
    addIdea(
        idea.userName,
        idea.empId,
        idea.ideaDesc,
        idea.team,
        idea.ideaTitle,
    );
    showAlert("success", "Idea submitted successfully!");
    form.reset();
    closeForm();
    renderCards();
}

function generateChart(canvasId, dataObj, label) {
    const ctx = document.getElementById(canvasId).getContext("2d");
    console.log(dataObj);
    new Chart(ctx, {
        type: "doughnut",
        data: {
            labels: Object.keys(dataObj),
            datasets: [{
                label: label,
                data: Object.values(dataObj),
                backgroundColor: [
                    "#727cf5", "#f77e53", "#47c363", "#ffa534", "#8884d8", "#82ca9d", "#a4de6c"
                ],
                borderColor: "#fff",
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: "bottom"
                }
            }
        }
    });
}


function renderCards() {
    const ideas = getAllIdeas();
    const ideasContainer = document.querySelector('.card-wrapper');
    ideasContainer.innerHTML = ''; // Clear previous content
    const statusCounts = {
        operation: {
            total: 0,
            month: 0
        },
        facility: {
            total: 0,
            month: 0
        },
        transport: {
            total: 0,
            month: 0
        },
        technology: {
            total: 0,
            month: 0
        }
    };
    if (Array.isArray(ideas)) {
        for (const idea of ideas) {
            const category = String(idea.category).trim().toLowerCase();
            if (category) {
                const ideaDate = new Date(idea.timestamp);
                const now = new Date();
                const thirtyDaysAgo = new Date();
                thirtyDaysAgo.setDate(now.getDate() - 30);

                if (ideaDate >= thirtyDaysAgo) {
                    statusCounts[category].month++;
                }
                statusCounts[category].total++;
            }
        }

    }
    for (const category of Object.keys(statusCounts)) {
        const ideaCard = document.createElement('a');
        ideaCard.className = 'card card--link';
        ideaCard.href = `ideas/${category}.html`;
        ideaCard.innerHTML = `
        <div class="card__body">
            <div class="card__title-row">
            <span class="card__title">${category}</span>
            <div class="count-badge">
                <span class="count-badge__primary">${statusCounts[category].month} this month</span>
                <small class="count-badge__secondary">${statusCounts[category].total} total</small>
            </div>
            </div>
            <canvas id="chart-${category}" width="120" height="120"></canvas>
        </div>
        `;
        ideasContainer.appendChild(ideaCard);
        generateChart(`chart-${category}`, {
            'This Month': statusCounts[category].month,
            'Total': statusCounts[category].total - statusCounts[category].month
        }, 'Submissions');
    }
}

document.addEventListener("DOMContentLoaded", function () {
    renderCards();
    document.getElementById("add-idea").addEventListener("click", openForm);
    document.getElementById("close-idea-form").addEventListener("click", closeForm);
    document.getElementById("cancel-idea-form").addEventListener("click", closeForm);
    document.getElementById("idea-form").addEventListener("submit", handleFormSubmit);
});
