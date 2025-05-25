// function renderActivities() {
//     const activityContainer = document.getElementById('activityList');
//     activityContainer.innerHTML = ''; // Clear previous content
//     const activities = getAllIdeas();
//     if (Array.isArray(activities)) {
//         activities.forEach(activity => {
//             const activityCard = document.createElement('div');
//             activityCard.className = 'activity-card';
//             activityCard.innerHTML = `
//                 <div class="activity-item">
//                 <div class="activity-info">
//                     <div class="activity-title">${activity.category}</div>
//                     <small class="activity-meta">${activity.title} • ${activity.team}</small>
//                 </div>
//                 <div class="activity-date">
//                     <div>${new Date(activity.timestamp).toLocaleDateString()}</div>
//                     <span class="status-tag">${activity.status}</span>
//                 </div>
//             </div>
//             `;
//             activityContainer.appendChild(activityCard);
//         });
//     }

// }

// function renderActivities(filterMonth = '') {
//   const activityContainer = document.getElementById('activityList');
//   activityContainer.innerHTML = '';

//   const activities = getAllIdeas();

//   if (Array.isArray(activities)) {
//     const filteredActivities = filterMonth
//       ? activities.filter(act => act.month?.toLowerCase() === filterMonth.toLowerCase())
//       : activities;

//     filteredActivities.forEach(activity => {
//       const activityCard = document.createElement('div');
//       activityCard.className = 'activity-card';
//       activityCard.innerHTML = `
//         <div class="activity-item">
//           <div class="activity-info">
//             <div class="activity-title">${activity.category}</div>
//             <small class="activity-meta">${activity.department || ''} • ${activity.manager || ''}</small>
//           </div>
//           <div class="activity-date">
//             <div>${activity.month}</div>
//             <span class="status-tag">${activity.status}</span>
//           </div>
//         </div>
//       `;
//       activityContainer.appendChild(activityCard);
//     });
//   }
// };


function renderActivities(filterMonth = '') {
  const activityContainer = document.getElementById('activityList');
  activityContainer.innerHTML = '';

  const activities = getAllIdeas();
  const filteredActivities = filterMonth
    ? activities.filter(act => act.month?.toLowerCase() === filterMonth.toLowerCase())
    : activities;

  filteredActivities.forEach(activity => {
    const activityCard = document.createElement('div');
    activityCard.className = 'activity-card';
    activityCard.setAttribute('data-id', activity.id);

    activityCard.innerHTML = `
      <div class="activity-item">
        <div class="activity-info">
          <div class="activity-title">${activity.category}</div>
          <small class="activity-meta">${activity.department || ''}</small>
        </div>
        <div class="activity-date">
          <div>${new Date(activity.timestamp).toLocaleDateString()}</div>
          <span class="status-tag">${activity.status}</span>
        </div>
      </div>
    `;

    // On click, show modal
    activityCard.addEventListener('click', () => {
      openActivityModal(activity);
    });

    activityContainer.appendChild(activityCard);
  });
};


function openActivityModal(activity) {
  document.getElementById('modalCategory').value = activity.category || '';
  document.getElementById('modalDepartment').value = activity.department || '';
  document.getElementById('modalManager').value = activity.manager || '';
  // document.getElementById('modalEmpId').value = activity.empId || '';
  document.getElementById('modalStatus').value = activity.status || '';
  document.getElementById('modalVotes').value = activity.num_of_votes || '';
  document.getElementById('modalDescription').value = activity.description || '';
  // document.getElementById('modalMonth').value = activity.month || '';
  // document.getElementById('modalTimestamp').value = new Date(activity.timestamp).toLocaleString();

  document.getElementById('activityModal').classList.remove('hidden');
};

document.getElementById('modalCloseBtn').addEventListener('click', () => {
  document.getElementById('activityModal').classList.add('hidden');
});


document.getElementById('monthFilter').addEventListener('change', function () {
  const selectedMonth = this.value;
  renderActivities(selectedMonth);
});



renderActivities();


//  <div>${new Date(activity.timestamp).toLocaleDateString()}</div>