function renderActivities(filterMonth = "") {
  const activityContainer = document.getElementById("activityList");
  activityContainer.innerHTML = "";

  const activities = getAllIdeas();
  const filteredActivities = filterMonth
    ? activities.filter(
        (act) => act.month?.toLowerCase() === filterMonth.toLowerCase()
      )
    : activities;

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

    // On click, show modal
    activityCard.addEventListener("click", () => {
      openActivityModal(activity);
    });

    activityContainer.appendChild(activityCard);
  });
}

function openActivityModal(activity) {
  currentEditingIdeaId = activity.id;
  document.getElementById("modalCategory").value = activity.category || "";
  document.getElementById("modalDepartment").value = activity.department || "";
  document.getElementById("modalManager").value = activity.manager || "";
  document.getElementById("modalStatus").value = activity.status || "";
  document.getElementById("modalVotes").value = activity.num_of_votes || "";
  document.getElementById("modalFeedback").value = activity.feedback || "";

  // if status is feedback then enable description and re-submit button
  if (activity.status === "Feedback") {
    descriptionEnable();
    openFeedbackBox();
    reSubmitButtonEnable();
  } else {
    descriptionDisable();
    closeFeedbackBox();
    reSubmitButtonDisable();
  }
  if (activity.status === "Re-Submitted") {
    reSubmitButtonDisable();
    openFeedbackBox();
  }

  document.getElementById("modalDescription").value =
    activity.description || "";
  document.getElementById("activityModal").classList.remove("hidden");
}

document.getElementById("modalCloseBtn").addEventListener("click", () => {
  document.getElementById("activityModal").classList.add("hidden");
});

document.getElementById("monthFilter").addEventListener("change", function () {
  const selectedMonth = this.value;
  renderActivities(selectedMonth);
});

document.getElementById("reSubmit").addEventListener("click", () => {
  const updatedDescription = document.getElementById("modalDescription").value;
  const ideas = getAllIdeas();
  const index = ideas.findIndex((idea) => idea.id === currentEditingIdeaId);
  if (index !== -1) {
    ideas[index].description = updatedDescription;
    ideas[index].status = "Re-Submitted";
    localStorage.setItem("ideas", JSON.stringify(ideas));
    document.getElementById("activityModal").classList.add("hidden");
    renderActivities();
  }
});

function openFeedbackBox() {
  const feedbackLabel = document.getElementById("feedbackLabel");
  feedbackLabel.style.display = "block"; // Show the feedback textarea
  // document.getElementById("feedbackBox").classList.remove("hidden");
}
function closeFeedbackBox() {
  const feedbackLabel = document.getElementById("feedbackLabel");
  feedbackLabel.style.display = "none"; // Show the feedback textarea
  // document.getElementById("feedbackBox").classList.remove("hidden");
}

function reSubmitButtonEnable() {
  const reSubmitButton = document.getElementById("reSubmit");
  reSubmitButton.style.display = "block";
}
function reSubmitButtonDisable() {
  const reSubmitButton = document.getElementById("reSubmit");
  reSubmitButton.style.display = "none";
}

function descriptionEnable() {
  const descriptionField = document.getElementById("modalDescription");
  descriptionField.disabled = false;
}
function descriptionDisable() {
  const descriptionField = document.getElementById("modalDescription");
  descriptionField.disabled = true;
}

renderActivities();

//  <div>${new Date(activity.timestamp).toLocaleDateString()}</div>
