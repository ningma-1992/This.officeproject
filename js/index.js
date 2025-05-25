function openForm() {
  const modal = document.getElementById("myModal");
  modal.classList.add("modal--active");
}

function closeForm() {
  const modal = document.getElementById("myModal");
  modal.classList.remove("modal--active");
}

function handleFormSubmit(event) {
  event.preventDefault();
  const form = document.getElementById("idea-form");
  const formData = new FormData(form);
  const idea = Object.fromEntries(formData.entries());
  console.log("idea", idea);
  addIdea(
    idea.userName,
    idea.empId,
    idea.manager,
    idea.department,
    idea.category,
    idea.description
  );
  showAlert("success", "Idea submitted successfully!");
  form.reset();
  closeForm();
  totalIdeas();
  totalApprovedIdeas();
}

function totalIdeas() {
  const ideas = getAllIdeas();
  console.log("ideas", ideas.length);

  const wrapper = document.querySelector(".card-wrapper");

  // Look for or create the total ideas card
  let card = wrapper.querySelector(".card-total");

  if (!card) {
    card = document.createElement("div");
    card.className = "card card-total";
    wrapper.appendChild(card);
  }

  card.innerHTML = `
    <h3>${ideas.length}</h3>
    <p>ideas submitted.</p>
  `;
}

function totalApprovedIdeas() {
  const ideas = JSON.parse(localStorage.getItem(IDEAS_LS_KEY)) || [];

  // Count approved ideas
  const approvedCount = ideas.filter(
    (idea) => idea.status === "Approved"
  ).length;

  console.log("Total Approved Ideas:", approvedCount);

  const wrapper = document.querySelector(".card-wrapper");

  // Look for or create the approved ideas card
  let card = wrapper.querySelector(".card-approved");

  if (!card) {
    card = document.createElement("div");
    card.className = "card card-approved";
    wrapper.appendChild(card);
  }

  card.innerHTML = `
    <h3>${approvedCount}</h3>
    <p>ideas approved.</p>
  `;
};

// Total Rejected Ideas--------
function totalRejectedIdeas() {
  const ideas = JSON.parse(localStorage.getItem(IDEAS_LS_KEY)) || [];

  // Count approved ideas
  const rejectedCount = ideas.filter(
    (idea) => idea.status === "Rejected"
  ).length;

  console.log("Total Rejected Ideas:", rejectedCount);

  const wrapper = document.querySelector(".card-wrapper");

  // Look for or create the rejected ideas card
  let card = wrapper.querySelector(".card-ideasRejected");

  if (!card) {
    card = document.createElement("div");
    card.className = "card card-ideasRejected";
    wrapper.appendChild(card);
  }

  card.innerHTML = `
    <h3>${rejectedCount}</h3>
    <p>ideas rejected.</p>
  `;
};

function showLeaderboard() {
  const ideas = JSON.parse(localStorage.getItem(IDEAS_LS_KEY)) || [];

  // Sort ideas by num_of_votes in descending order
  const sortedIdeas = ideas
    .filter(idea => typeof idea.num_of_votes === 'number')
    .sort((a, b) => b.num_of_votes - a.num_of_votes);

  const wrapper = document.querySelector('.card-wrapper');

  // Look for or create the leaderboard card
  let card = wrapper.querySelector('.card-leaderboard');

  if (!card) {
    card = document.createElement('div');
    card.className = 'card card-leaderboard';
    wrapper.appendChild(card);
  }

  // Generate leaderboard HTML
  const leaderboardHTML = sortedIdeas.map((idea, index) => `
    <div>
      <strong>#${index + 1}:</strong> ${idea.userName} (${idea.num_of_votes} votes)
    </div>
  `).join('');

  card.innerHTML = `
    <h3>Leaderboard</h3>
    ${leaderboardHTML || '<p>No votes yet.</p>'}
  `;
}


// Call both functions
totalIdeas();
totalApprovedIdeas();
totalRejectedIdeas();
showLeaderboard();

document.addEventListener("DOMContentLoaded", function () {
  // renderCards();
  document.getElementById("add-idea").addEventListener("click", openForm);
  document
    .getElementById("close-idea-form")
    .addEventListener("click", closeForm);
  document
    .getElementById("cancel-idea-form")
    .addEventListener("click", closeForm);
  document
    .getElementById("idea-form")
    .addEventListener("submit", handleFormSubmit);
});
