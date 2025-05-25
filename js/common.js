const IDEAS_LS_KEY = "ideas";
const DRAFT_IDEAS_LS_KEY = "drafts";

function getAllIdeas() {
  try {
    const ideas = JSON.parse(localStorage.getItem(IDEAS_LS_KEY)) || [];
    console.log('ideas22',ideas)
    return ideas;
  } catch (error) {
    console.error("Error getting ideas:", error);
    return [];
  }
};

function getAllDrafts() {
  try {
    const drafts = JSON.parse(localStorage.getItem(DRAFT_IDEAS_LS_KEY)) || [];
    console.log('drafts',drafts)
    return drafts;
  } catch (error) {
    console.error("Error getting drafts:", error);
    return [];
  }
}

function addIdea(
  userName,
  empId,
  manager,
  department,
  category,
  description,
  status = "Rejected"
) {
  const num_of_votes = 30;
  const voted = false;
  const month = "february"; // curently we are using this field to show the data monyh wise, but later on by timestamp we will filter the data
  const newIdea = {
    id: Date.now(),
    userName,
    empId,
    manager,
    department,
    category,
    description,
    status,
    num_of_votes,
    voted,
    month,
    timestamp: new Date().toISOString(),
  };

  const allIdeas = getAllIdeas();
  allIdeas.unshift(newIdea);
  localStorage.setItem(IDEAS_LS_KEY, JSON.stringify(allIdeas));
  return newIdea;
};

function saveDraft(
  userName,
  empId,
  manager,
  department,
  category,
  description,
  status = "as Draft"
) {
  const num_of_votes = 0;
  const voted = false;
  const month = "february"; // curently we are using this field to show the data monyh wise, but later on by timestamp we will filter the data
  const newIdea = {
    id: Date.now(),
    userName,
    empId,
    manager,
    department,
    category,
    description,
    status,
    num_of_votes,
    voted,
    month,
    timestamp: new Date().toISOString(),
  };

  const allDrafts = getAllDrafts();
  allDrafts.unshift(newIdea);
  localStorage.setItem(DRAFT_IDEAS_LS_KEY, JSON.stringify(allDrafts));
  return newIdea;
}

function showAlert(type = "success", message = "") {
  const iconMap = {
    success: "✅",
    error: "❌",
    warning: "⚠️",
    info: "ℹ️",
  };

  const alert = document.createElement("div");
  alert.className = `alert alert--${type}`;
  alert.innerHTML = `
    <span class="alert__icon">${iconMap[type] || ""}</span>
    <span class="alert__message">${message}</span>
    <button class="alert__close" aria-label="Close alert">&times;</button>
  `;

  // Append to body
  document.body.appendChild(alert);

  // Close button handler
  alert.querySelector(".alert__close").addEventListener("click", () => {
    alert.remove();
  });

  // Auto dismiss after 4 seconds
  setTimeout(() => {
    alert.remove();
  }, 4000);
}
