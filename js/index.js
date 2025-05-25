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
  totalRejectedIdeas();
  showLeaderboard();
};

// Saving as draft

function saveAsDraft(event) {
  event.preventDefault();
  const form = document.getElementById("idea-form");
  const formData = new FormData(form);
  const idea = Object.fromEntries(formData.entries());
  console.log("idea", idea);
  saveDraft(
    idea.userName,
    idea.empId,
    idea.manager,
    idea.department,
    idea.category,
    idea.description
  );
  showAlert("success", "Saved as draft!");
  form.reset();
  closeForm();
  totalIdeas();
  totalApprovedIdeas();
  totalRejectedIdeas();
  showLeaderboard();
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
    <h3 class="heading-count-icon"><span class="home-icon"><svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="25" height="25"><path fill="#fff" d="m12.5,12h-1V4h1v8Zm-.5,2c-.552,0-1,.448-1,1s.448,1,1,1,1-.448,1-1-.448-1-1-1Z"/><path fill="#fff" d="m17.987,2.28C16.075.575,13.507-.233,10.937.062c-3.993.458-7.293,3.674-7.846,7.646-.414,2.964.593,5.827,2.764,7.854,1.363,1.273,2.146,3.029,2.146,4.816v3.622h8v-3.853c0-1.686.752-3.309,2.118-4.571,1.831-1.694,2.882-4.091,2.882-6.576,0-2.563-1.098-5.012-3.013-6.72Zm-2.987,20.72h-6v-2.622c0-.463-.046-.925-.134-1.378h6.233c-.066.377-.1.76-.1,1.147v2.853Zm2.439-8.158c-.987.912-1.695,1.993-2.087,3.158h-6.754c-.407-1.186-1.111-2.281-2.063-3.169-1.929-1.802-2.823-4.347-2.455-6.985.491-3.528,3.422-6.384,6.969-6.792,2.32-.267,4.547.434,6.272,1.972,1.701,1.518,2.678,3.695,2.678,5.973,0,2.24-.909,4.315-2.561,5.842Z"/></svg></span> ${ideas.length}</h3>
    <p>Ideas Submitted</p>
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
    <h3 class="heading-count-icon"><span class="home-icon"><svg xmlns="http://www.w3.org/2000/svg" id="Bold" viewBox="0 0 24 24" width="18" height="18"><path fill="#fff" d="M12,6A3,3,0,0,0,9,9V21a3,3,0,0,0,6,0V9A3,3,0,0,0,12,6Z"/><path fill="#fff"  d="M21,0a3,3,0,0,0-3,3V21a3,3,0,0,0,6,0V3A3,3,0,0,0,21,0Z"/><path fill="#fff" d="M3,12a3,3,0,0,0-3,3v6a3,3,0,0,0,6,0V15A3,3,0,0,0,3,12Z"/></svg></span>${approvedCount}</h3>
    <p>Ideas Approved</p>
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
    <h3 class="heading-count-icon"><span class="home-icon"> <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="20" height="20">
  <path fill="#fff" d="m19.707,15.707l-1.293,1.293,1.293,1.293c.391.391.391,1.023,0,1.414-.195.195-.451.293-.707.293s-.512-.098-.707-.293l-1.293-1.293-1.293,1.293c-.195.195-.451.293-.707.293s-.512-.098-.707-.293c-.391-.391-.391-1.023,0-1.414l1.293-1.293-1.293-1.293c-.391-.391-.391-1.023,0-1.414s1.023-.391,1.414,0l1.293,1.293,1.293-1.293c.391-.391,1.023-.391,1.414,0s.391,1.023,0,1.414Zm4.293,1.293c0,3.859-3.141,7-7,7s-7-3.141-7-7,3.141-7,7-7,7,3.141,7,7Zm-2,0c0-2.757-2.243-5-5-5s-5,2.243-5,5,2.243,5,5,5,5-2.243,5-5Zm-12,6c0,.553-.447,1-1,1h-4c-2.757,0-5-2.243-5-5V5C0,2.243,2.243,0,5,0h4.515c1.869,0,3.627.728,4.95,2.05l2.501,2.502c.892.89,1.525,1.997,1.833,3.2.076.299.011.617-.179.861s-.481.387-.79.387h-5.116c-1.496,0-2.714-1.218-2.714-2.714V2.023c-.16-.015-.322-.023-.485-.023h-4.515c-1.654,0-3,1.346-3,3v14c0,1.654,1.346,3,3,3h4c.553,0,1,.447,1,1Zm2-16.714c0,.394.32.714.714.714h3.635c-.217-.374-.484-.722-.797-1.033l-2.501-2.502c-.318-.318-.671-.587-1.051-.805v3.626Z"/>
</svg></span>${rejectedCount}</h3>
    <p>Ideas Rejected</p>
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
      <strong class="leaderboard-index">#${index + 1}</strong> ${idea.userName} (${idea.num_of_votes} votes)
    </div>
  `).join('');

  card.innerHTML = `
    <h3 class="heading-count-icon"><span class="home-icon"><svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="20" height="20">
  <path fill="#fff" d="m10.427,3.971l-1.437-1.391,2.499-2.58h1.51v7h-2v-3.62l-.573.591Zm-4.427,5.029h-2.405c1.145-.65,2.405-1.485,2.405-3,0-1.654-1.346-3-3-3S0,4.346,0,6h2c0-.552.449-1,1-1s1,.448,1,1c0,.484-.944,1.012-1.702,1.435-1.077.601-2.298,1.282-2.298,2.565v1h6v-2Zm18,2.5c0-.72-.306-1.369-.794-1.825.187-.35.294-.75.294-1.175,0-1.379-1.122-2.5-2.5-2.5h-3v2h3c.276,0,.5.225.5.5s-.224.5-.5.5h-1v2h1.5c.276,0,.5.225.5.5s-.224.5-.5.5h-3.5v2h3.5c1.378,0,2.5-1.121,2.5-2.5Zm0,7v5.5H0v-8.5c0-1.379,1.122-2.5,2.5-2.5h4c.171,0,.338.017.5.05v-1.55c0-1.379,1.122-2.5,2.5-2.5h5c1.378,0,2.5,1.121,2.5,2.5v4.55c.162-.033.329-.05.5-.05h4c1.378,0,2.5,1.121,2.5,2.5Zm-15,3.5h6v-10.5c0-.275-.224-.5-.5-.5h-5c-.276,0-.5.225-.5.5v10.5Zm-7,0h5v-6.5c0-.275-.224-.5-.5-.5H2.5c-.276,0-.5.225-.5.5v6.5Zm20-3.5c0-.275-.224-.5-.5-.5h-4c-.276,0-.5.225-.5.5v3.5h5v-3.5Z"/>
</svg></span>Leaderboard</h3>
    <div class="leaderboard-chart">${leaderboardHTML || '<p>No votes yet.</p>'}</div>
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
    .getElementById("save-as-draft")
    .addEventListener("click", saveAsDraft);
  document
    .getElementById("idea-form")
    .addEventListener("submit", handleFormSubmit);
});
