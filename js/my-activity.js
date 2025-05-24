function renderActivities() {
    const activityContainer = document.getElementById('activityList');
    activityContainer.innerHTML = ''; // Clear previous content
    const activities = getAllIdeas();
    if (Array.isArray(activities)) {
        activities.forEach(activity => {
            const activityCard = document.createElement('div');
            activityCard.className = 'activity-card';
            activityCard.innerHTML = `
                <div class="activity-item">
                <div class="activity-info">
                    <div class="activity-title">${activity.category}</div>
                    <small class="activity-meta">${activity.title} • ${activity.team}</small>
                </div>
                <div class="activity-date">
                    <div>${new Date(activity.timestamp).toLocaleDateString()}</div>
                    <span class="status-tag">${activity.status}</span>
                </div>
            </div>
            `;
            activityContainer.appendChild(activityCard);
        });
    }

}

renderActivities();