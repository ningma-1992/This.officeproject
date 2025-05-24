document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("export-csv").addEventListener("click", function () {
        const ideas = getAllIdeas()
        const csvContent = [
            ['ID', 'Employee Name', 'Employee ID', 'Team', 'Category', 'Title', 'Description', 'Date', 'Status'],
            ...ideas.map(idea => [
                idea.id,
                `"${idea.userName.replace(/"/g, '""')}"`,
                idea.empId,
                idea.team,
                idea.category,
                `"${idea.title.replace(/"/g, '""')}"`,
                `"${idea.description.replace(/"/g, '""')}"`,
                new Date(idea.timestamp).toLocaleDateString(),
                idea.status
            ])
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `ideas_export_${new Date().toISOString().slice(0, 10)}.csv`;
        link.click();
    });

    function renderPage() {
        const ideas = getAllIdeas(); // This should return your idea array
        const statsContainer = document.getElementById("dashboard-stats");

        if (!ideas || ideas.length === 0) {
            statsContainer.innerHTML += "<p>No ideas submitted yet.</p>";
            return;
        }

        const totalIdeas = ideas.length;
        const teamCounts = {};
        const categoryCounts = {};
        const now = new Date();
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(now.getDate() - 30);

        ideas.forEach(idea => {
            const team = idea.team || "Unknown";
            const category = idea.category || "Uncategorized";
            const ideaDate = new Date(idea.timestamp);

            teamCounts[team] = (teamCounts[team] || 0) + 1;

            if (ideaDate >= thirtyDaysAgo) {
                categoryCounts[category] = (categoryCounts[category] || 0) + 1;
            }
        });

        // Render textual statistics
        const statHTML = `
    <div class="stats-summary">
      <div class="stat-box">
        <p class="stat-label">Total Ideas</p>
        <p class="stat-value">${totalIdeas}</p>
      </div>
    </div>

    <div class="stat-group">
      <h3 class="stat-group-title">Team Distribution</h3>
      <ul class="stat-list">
        ${Object.entries(teamCounts).map(([team, count]) => `<li><span>${team}:</span> ${count}</li>`).join("")}
      </ul>
    </div>

    <div class="stat-group">
      <h3 class="stat-group-title">Category Distribution (Last 30 Days)</h3>
      <ul class="stat-list">
        ${Object.entries(categoryCounts).map(([cat, count]) => `<li><span>${cat}:</span> ${count}</li>`).join("")}
      </ul>
    </div>
  `;
        statsContainer.innerHTML += statHTML;

        // Generate charts
        generateChart("teamChart", teamCounts, "Team Distribution");
        generateChart("categoryChart", categoryCounts, "Category Distribution");
    }

    // Helper: generate Chart.js pie chart
    function generateChart(canvasId, dataObj, label) {
        const ctx = document.getElementById(canvasId).getContext("2d");
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

    renderPage();
});