const IDEAS_LS_KEY = 'ideas';

function getAllIdeas() {
    try {
        const ideas = JSON.parse(localStorage.getItem(IDEAS_LS_KEY)) || [];
        return ideas;
    } catch (error) {
        console.error("Error getting ideas:", error);
        return [];
    }
}

function addIdea(
    userName,
    empId,
    description,
    team,
    title,
    category = title,
    status = 'Submitted'
) {
    const newIdea = {
        id: Date.now(),
        userName,
        empId,
        team,
        title,
        category,
        description,
        timestamp: new Date().toISOString(),
        status
    };

    const allIdeas = getAllIdeas();
    allIdeas.unshift(newIdea);
    localStorage.setItem(IDEAS_LS_KEY, JSON.stringify(allIdeas));
    return newIdea;
}


function showAlert(type = 'success', message = '') {
    const iconMap = {
        success: '✅',
        error: '❌',
        warning: '⚠️',
        info: 'ℹ️'
    };

    const alert = document.createElement('div');
    alert.className = `alert alert--${type}`;
    alert.innerHTML = `
    <span class="alert__icon">${iconMap[type] || ''}</span>
    <span class="alert__message">${message}</span>
    <button class="alert__close" aria-label="Close alert">&times;</button>
  `;

    // Append to body
    document.body.appendChild(alert);

    // Close button handler
    alert.querySelector('.alert__close').addEventListener('click', () => {
        alert.remove();
    });

    // Auto dismiss after 4 seconds
    setTimeout(() => {
        alert.remove();
    }, 4000);
}
