// // function renderActivities(filterMonth = "") {
// //   const activityContainer = document.getElementById("activityList");
// //   activityContainer.innerHTML = "";

// //   const activities = getAllIdeas();
// //   const filteredActivities = filterMonth
// //     ? activities.filter(
// //         (act) => act.month?.toLowerCase() === filterMonth.toLowerCase()
// //       )
// //     : activities;

// //   filteredActivities.forEach((activity) => {
// //     const activityCard = document.createElement("div");
// //     activityCard.className = "activity-card";
// //     activityCard.setAttribute("data-id", activity.id);

// //     activityCard.innerHTML = `
// //   <div class="activity-item">
// //     <div class="activity-info">
// //       <div class="activity-title">${activity.category}</div>
// //       <small class="activity-meta">${activity.department || ""}</small>
// //     </div>
// //     <div class="activity-date">
// //       <div>${new Date(activity.timestamp).toLocaleDateString()}</div>
// //       <span class="status-tag">${activity.status}</span>
// //     </div>
// //   </div>
// // `;

// //     activityCard.addEventListener("click", () => {
// //       openActivityModal(activity);
// //     });

// //     activityContainer.appendChild(activityCard);
// //   });
// // }

// // function openActivityModal(activity) {
// //   currentEditingIdeaId = activity.id;
// //   document.getElementById("modalEmpName").value = activity.userName || "";
// //   document.getElementById("modalEmpId").value = activity.empId || "";
// //   // document.getElementById("modalEmpId2").textContent = activity.empId || "";
// //   document.getElementById("modalCategory").value = activity.category || "";
// //   document.getElementById("modalSubCategory").value =
// //     activity.sub_category || "";
// //   // document.getElementById("modalDepartment").value = activity.department || "";
// //   // document.getElementById("modalManager").value = activity.manager || "";
// //   document.getElementById("modalStatus").value = activity.status || "";
// //   document.getElementById("modalVotes").value = activity.num_of_votes || "";
// //   document.getElementById("modalDescription").value =
// //     activity.description || "";

// //   if (activity.status == "Feedback" || activity.status == "Re-Submitted") {
// //     openFeedbackBox();
// //   } else {
// //     closeFeedbackBox();
// //   }
// //   document.getElementById("modalFeedback").value = activity.feedback || "";

// //   document.getElementById("activityModal").classList.remove("hidden");
// // }

// // document.getElementById("modalCloseBtn").addEventListener("click", () => {
// //   document.getElementById("activityModal").classList.add("hidden");
// // });

// // document.getElementById("monthFilter").addEventListener("change", function () {
// //   const selectedMonth = this.value;
// //   renderActivities(selectedMonth);
// // });

// // document.getElementById("updateStatusBtn").addEventListener("click", () => {
// //   const updatedStatus = document.getElementById("modalStatus").value;
// //   const updatedFeedback = document.getElementById("modalFeedback").value;
// //   const updatedCategory = document.getElementById("modalCategory").value;
// //   const updatedSubCategory = document.getElementById("modalSubCategory").value;
// //   const ideas = getAllIdeas();
// //   const index = ideas.findIndex((idea) => idea.id === currentEditingIdeaId);
// //   console.log("index", index);
// //   if (index !== -1) {
// //     ideas[index].status = updatedStatus;
// //     ideas[index].feedback = updatedFeedback;
// //     ideas[index].category = updatedCategory;
// //     ideas[index].sub_category = updatedSubCategory;
// //     localStorage.setItem("ideas", JSON.stringify(ideas));
// //     document.getElementById("activityModal").classList.add("hidden");
// //     renderActivities();
// //   }
// // });

// // function handleStatusChange(value) {
// //   if (value === "Feedback") {
// //     openFeedbackBox();
// //   } else {
// //     closeFeedbackBox();
// //   }
// // }

// // function openFeedbackBox() {
// //   const feedbackLabel = document.getElementById("feedbackLabel");
// //   feedbackLabel.style.display = "block"; // Show the feedback textarea
// //   // document.getElementById("feedbackBox").classList.remove("hidden");
// // }
// // function closeFeedbackBox() {
// //   const feedbackLabel = document.getElementById("feedbackLabel");
// //   feedbackLabel.style.display = "none"; // Show the feedback textarea
// //   // document.getElementById("feedbackBox").classList.remove("hidden");
// // }

// // renderActivities();

// let currentEditingIdeaId = null;

// document.getElementById("monthFilter").addEventListener("change", applyFilters);
// document
//   .getElementById("managerFilter")
//   .addEventListener("change", applyFilters);

// function applyFilters() {
//   const selectedMonth = document
//     .getElementById("monthFilter")
//     .value.toLowerCase();
//   const selectedManager = document.getElementById("managerFilter").value;
//   renderActivities(selectedMonth, selectedManager);
// }

// function renderActivities(filterMonth = "", filterManager = "") {
//   const activityContainer = document.getElementById("activityList");
//   activityContainer.innerHTML = "";

//   const activities = getAllIdeas();
//   const filteredActivities = activities.filter((act) => {
//     const monthMatch =
//       !filterMonth || (act.month && act.month.toLowerCase() === filterMonth);
//     const managerMatch = !filterManager || act.manager === filterManager;
//     return monthMatch && managerMatch;
//   });

//   filteredActivities.forEach((activity) => {
//     const activityCard = document.createElement("div");
//     activityCard.className = "activity-card";
//     activityCard.setAttribute("data-id", activity.id);

//     activityCard.innerHTML = `
//   <div class="activity-item">
//     <div class="activity-info">
//       <div class="activity-title">${activity.category}</div>
//       <small class="activity-meta">${activity.department || ""}</small>
//     </div>
//     <div class="activity-date">
//       <div>${new Date(activity.timestamp).toLocaleDateString()}</div>
//       <span class="status-tag">${activity.status}</span>
//     </div>
//   </div>
// `;

//     activityCard.addEventListener("click", () => {
//       openActivityModal(activity);
//     });

//     activityContainer.appendChild(activityCard);
//   });
// }

// function openActivityModal(activity) {
//   currentEditingIdeaId = activity.id;
//   document.getElementById("modalEmpName").value = activity.userName || "";
//   document.getElementById("modalEmpId").value = activity.empId || "";
//   document.getElementById("modalCategory").value = activity.category || "";
//   document.getElementById("modalSubCategory").value =
//     activity.sub_category || "";
//   document.getElementById("modalStatus").value = activity.status || "";
//   document.getElementById("modalVotes").value = activity.num_of_votes || "";
//   document.getElementById("modalDescription").value =
//     activity.description || "";
//   document.getElementById("modalFeedback").value = activity.feedback || "";

//   if (activity.status === "Feedback") {
//     openFeedbackBox();
//   } else {
//     closeFeedbackBox();
//   }

//   document.getElementById("activityModal").classList.remove("hidden");
// }

// document.getElementById("modalCloseBtn").addEventListener("click", () => {
//   document.getElementById("activityModal").classList.add("hidden");
// });

// document.getElementById("updateStatusBtn").addEventListener("click", () => {
//   const updatedStatus = document.getElementById("modalStatus").value;
//   const updatedFeedback = document.getElementById("modalFeedback").value;
//   const updatedCategory = document.getElementById("modalCategory").value;
//   const updatedSubCategory = document.getElementById("modalSubCategory").value;

//   const ideas = getAllIdeas();
//   const index = ideas.findIndex((idea) => idea.id === currentEditingIdeaId);

//   if (index !== -1) {
//     ideas[index].status = updatedStatus;
//     ideas[index].feedback = updatedFeedback;
//     ideas[index].category = updatedCategory;
//     ideas[index].sub_category = updatedSubCategory;
//     localStorage.setItem("ideas", JSON.stringify(ideas));
//     document.getElementById("activityModal").classList.add("hidden");
//     applyFilters(); // Refresh the list with current filters
//   }
// });

// function handleStatusChange(value) {
//   if (value === "Feedback") {
//     openFeedbackBox();
//   } else {
//     closeFeedbackBox();
//   }
// }

// function openFeedbackBox() {
//   document.getElementById("feedbackLabel").style.display = "block";
// }
// function closeFeedbackBox() {
//   document.getElementById("feedbackLabel").style.display = "none";
// }

// // Replace this with your real data retrieval function
// function getAllIdeas() {
//   return JSON.parse(localStorage.getItem("ideas") || "[]");
// }

// renderActivities();

let currentEditingIdeaId = null;

function getAllIdeas() {
  return JSON.parse(localStorage.getItem("ideas") || "[]");
}

function renderActivities(
  filterMonth = "",
  filterManager = "",
  filterStatus = ""
) {
  const activityContainer = document.getElementById("activityList");
  activityContainer.innerHTML = "";

  const activities = getAllIdeas();

  const filteredActivities = activities.filter((act) => {
    const monthMatch =
      !filterMonth || (act.month && act.month.toLowerCase() === filterMonth);
    const managerMatch = !filterManager || act.manager === filterManager;
    const statusMatch = !filterStatus || act.status === filterStatus;
    return monthMatch && managerMatch && statusMatch;
  });

  filteredActivities.forEach((activity) => {
    const activityCard = document.createElement("div");
    activityCard.className = "activity-card";
    activityCard.setAttribute("data-id", activity.id);
    activityCard.innerHTML = `
  <div class="activity-item">
    <div class="activity-info">
      <div class="activity-title">${activity.category}</div>
      <small class="activity-meta">${activity.department || ""}</small>
    </div>
    <div class="activity-date">
      <div>${new Date(activity.timestamp).toLocaleDateString()}</div>
      <span class="status-tag">${activity.status}</span>
    </div>
  </div>
`;

    activityCard.addEventListener("click", () => openActivityModal(activity));

    activityContainer.appendChild(activityCard);
  });
}

function openActivityModal(activity) {
  currentEditingIdeaId = activity.id;
  document.getElementById("modalEmpName").value = activity.userName || "";
  document.getElementById("modalEmpId").value = activity.empId || "";
  document.getElementById("modalCategory").value = activity.category || "";
  document.getElementById("modalSubCategory").value =
    activity.sub_category || "";
  document.getElementById("modalStatus").value = activity.status || "";
  document.getElementById("modalVotes").value = activity.num_of_votes || "";
  document.getElementById("modalDescription").value =
    activity.description || "";
  document.getElementById("modalFeedback").value = activity.feedback || "";

  if (activity.status === "Feedback") {
    openFeedbackBox();
  } else {
    closeFeedbackBox();
  }

  document.getElementById("activityModal").classList.remove("hidden");
}

document.getElementById("modalCloseBtn").addEventListener("click", () => {
  document.getElementById("activityModal").classList.add("hidden");
});

document.getElementById("updateStatusBtn").addEventListener("click", () => {
  const updatedStatus = document.getElementById("modalStatus").value;
  const updatedFeedback = document.getElementById("modalFeedback").value;
  const updatedCategory = document.getElementById("modalCategory").value;
  const updatedSubCategory = document.getElementById("modalSubCategory").value;

  const ideas = getAllIdeas();
  const index = ideas.findIndex((idea) => idea.id === currentEditingIdeaId);

  if (index !== -1) {
    ideas[index].status = updatedStatus;
    ideas[index].feedback = updatedFeedback;
    ideas[index].category = updatedCategory;
    ideas[index].sub_category = updatedSubCategory;
    localStorage.setItem("ideas", JSON.stringify(ideas));
    document.getElementById("activityModal").classList.add("hidden");
    applyFilters(); // re-apply filters
  }
});

function handleStatusChange(value) {
  if (value === "Feedback") {
    openFeedbackBox();
  } else {
    closeFeedbackBox();
  }
}

function openFeedbackBox() {
  document.getElementById("feedbackLabel").style.display = "block";
}
function closeFeedbackBox() {
  document.getElementById("feedbackLabel").style.display = "none";
}

// Filter listeners
document.getElementById("monthFilter").addEventListener("change", applyFilters);
document
  .getElementById("managerFilter")
  .addEventListener("change", applyFilters);
document
  .getElementById("statusFilter")
  .addEventListener("change", applyFilters);

function applyFilters() {
  const month = document.getElementById("monthFilter").value.toLowerCase();
  const manager = document.getElementById("managerFilter").value;
  const status = document.getElementById("statusFilter").value;
  renderActivities(month, manager, status);
}

// Set default filter to Manager A on load
document.getElementById("managerFilter").value = "Manager A";
applyFilters();
