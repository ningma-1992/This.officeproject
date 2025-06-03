/**
 * js/browse-ideas.js
 *
 * Complete JavaScript for the “Browse Ideas” page, including:
 *  - Grouping ideas by category
 *  - Rendering category boxes
 *  - Rendering idea cards within a category
 *  - Voting logic
 *  - Full-detail modal when clicking an idea card
 *
 * If there’s no <div class="card-container"> on the page,
 * this script will exit immediately and leave all other content alone.
 */

document.addEventListener("DOMContentLoaded", function () {
  // ─────────────────────────────────────────────────────────────────────────────
  // 0. If there's no .card-container on this page, do nothing.
  // ─────────────────────────────────────────────────────────────────────────────
  const container = document.querySelector(".card-container");
  if (!container) {
    return;
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // 1. Selectors for modal and modal fields
  // ─────────────────────────────────────────────────────────────────────────────
  const modal    = document.getElementById("ideaDetailModal");
  const closeBtn = document.getElementById("modalCloseBtn");

  // Modal fields (spans) to populate
  const detailUserName    = document.getElementById("detailUserName");
  const detailEmpId       = document.getElementById("detailEmpId");
  const detailDepartment  = document.getElementById("detailDepartment");
  const detailManager     = document.getElementById("detailManager");
  const detailDescription = document.getElementById("detailDescription");
  const detailTimeline    = document.getElementById("detailTimeline");
  const detailStatus      = document.getElementById("detailStatus");
  const detailVotes       = document.getElementById("detailVotes");

  // ─────────────────────────────────────────────────────────────────────────────
  // 2. Utility: Fetch all ideas from localStorage
  // ─────────────────────────────────────────────────────────────────────────────
  function getAllIdeas() {
    try {
      const ideas = JSON.parse(localStorage.getItem("ideas")) || [];
      return ideas;
    } catch (error) {
      console.error("Error getting ideas from localStorage:", error);
      return [];
    }
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // 3. Utility: Group an array of ideas by their 'category' property
  // ─────────────────────────────────────────────────────────────────────────────
  function groupIdeasByCategory(ideas) {
    return ideas.reduce((groups, idea) => {
      const category = idea.category || "Uncategorized";
      if (!groups[category]) {
        groups[category] = [];
      }
      groups[category].push(idea);
      return groups;
    }, {});
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // 4. Create a single idea card DOM element
  //
  //    - Displays basic info: category badge, status badge,
  //      department, submitted by, manager, truncated description, timeline
  //    - Contains a vote button (disabled if already voted)
  //    - Clicking the vote button calls voteForIdea(...)
  //    - Clicking anywhere else on the card calls openDetailModal(...)
  // ─────────────────────────────────────────────────────────────────────────────
  function createCard(idea) {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <div class="card__title-row">
        <div class="count-badge count-badge__primary">
          ${idea.category || "Uncategorized"}
        </div>
        <span class="badge">${idea.status}</span>
      </div>
      <h3 class="card__title">${idea.department}</h3>
      <div class="card__body">
        <p><strong>Submitted By:</strong> ${idea.userName} (${idea.empId})</p>
        <p><strong>Manager:</strong> ${idea.manager}</p>
        <p class="truncate"><strong>Description:</strong> ${idea.description}</p>
        <p><strong>Timeline:</strong> ${idea.timeline || "–"}</p>
        <button class="vote-btn" data-id="${idea.id}" ${
      idea.voted ? "disabled" : ""
    }>
          ${idea.voted ? "✅ You Voted" : `👍 Vote (${idea.num_of_votes || 0})`}
        </button>
      </div>
    `;

    // Vote-button logic
    const voteButton = card.querySelector(".vote-btn");
    voteButton.addEventListener("click", function (e) {
      // Prevent the card's click listener from firing (which opens the modal)
      e.stopPropagation();
      voteForIdea(idea.id);
    });

    // Card click to open full-detail modal
    card.addEventListener("click", () => {
      openDetailModal(idea);
    });

    return card;
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // 5. Increment vote count for a given idea ID and re-render the category view
  // ─────────────────────────────────────────────────────────────────────────────
  function voteForIdea(ideaId) {
    const ideas = getAllIdeas();
    const target = ideas.find((i) => i.id === ideaId);
    if (!target) return;

    if (!target.voted) {
      target.num_of_votes = (target.num_of_votes || 0) + 1;
      target.voted = true;
      localStorage.setItem("ideas", JSON.stringify(ideas));

      // After voting, re-render that idea’s category
      renderIdeasFromCategory(target.category);
    } else {
      alert("You already voted on this idea!");
    }
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // 6. Render all categories as “boxes” with a preview of up to 2 ideas each
  //
  //    - Clears the container
  //    - For each category, builds a small card showing:
  //      • Category name (with count)
  //      • Up to 2 descriptions as preview
  //      • A “Click to view all ideas” hint
  //    - Clicking a category box calls renderIdeasFromCategory(category)
  // ─────────────────────────────────────────────────────────────────────────────
  function renderCategoryBoxes() {
    const ideas = getAllIdeas();
    const groupedIdeas = groupIdeasByCategory(ideas);

    container.innerHTML = ""; // Clear existing content

    for (const category in groupedIdeas) {
      const box = document.createElement("div");
      box.className = "card";
      box.setAttribute("data-category", category);

      // Category header
      const header = document.createElement("h3");
      header.textContent = `${category} (${groupedIdeas[category].length})`;
      header.className = "card__title";
      header.style.cursor = "pointer";
      header.style.color = "black";

      // Preview list (up to 2 ideas)
      const previewList = document.createElement("div");
      previewList.className = "card__body";
      groupedIdeas[category].slice(0, 2).forEach((idea) => {
        const preview = document.createElement("p");
        preview.innerHTML = `
          <strong>${idea.description}</strong><br/>
          <small>By ${idea.userName}</small>
        `;
        previewList.appendChild(preview);
      });

      // “Click to view” hint
      const clickHint = document.createElement("p");
      clickHint.textContent = "Click to view all ideas";
      clickHint.className = "card__body";
      clickHint.style.fontStyle = "italic";
      clickHint.style.color = "#777";

      box.appendChild(header);
      box.appendChild(previewList);
      box.appendChild(clickHint);

      box.addEventListener("click", () => {
        renderIdeasFromCategory(category);
      });

      container.appendChild(box);
    }
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // 7. Render every idea card for a specific category
  //
  //    - Clears the container
  //    - Adds a “Back to All Categories” button at the top
  //    - Loops through each idea in that category, calls createCard(idea),
  //      and appends it to the container
  // ─────────────────────────────────────────────────────────────────────────────
  function renderIdeasFromCategory(category) {
    const ideas = getAllIdeas().filter((idea) => idea.category === category);

    container.innerHTML = ""; // Clear existing content

    // Back button
    const backBtn = document.createElement("button");
    backBtn.textContent = "← Back to All Categories";
    backBtn.className = "back-btn";
    backBtn.addEventListener("click", () => {
      renderCategoryBoxes();
    });

    container.appendChild(backBtn);

    // Append each idea card
    ideas.forEach((idea) => {
      const ideaCard = createCard(idea);
      container.appendChild(ideaCard);
    });
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // 8. Open full-detail modal for a given idea object
  //
  //    - Populates each span inside the modal with the idea’s properties
  //    - Removes the “hidden” class to make the modal visible
  //    - Adds “modal-active” to <main> to blur/disable background
  // ─────────────────────────────────────────────────────────────────────────────
  function openDetailModal(idea) {
    detailUserName.textContent    = idea.userName;
    detailEmpId.textContent       = idea.empId;
    detailDepartment.textContent  = idea.department;
    detailManager.textContent     = idea.manager;
    detailDescription.textContent = idea.description;
    detailTimeline.textContent    = idea.timeline || "–";
    detailStatus.textContent      = idea.status;
    detailVotes.textContent       = idea.num_of_votes || 0;

    modal.classList.remove("hidden");
    document.querySelector("main").classList.add("modal-active");
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // 9. Close-modal logic
  //
  //    - Clicking the “×” button hides the modal and removes blur on background
  // ─────────────────────────────────────────────────────────────────────────────
  closeBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
    document.querySelector("main").classList.remove("modal-active");
  });

  // ─────────────────────────────────────────────────────────────────────────────
  // 10. Initial render: Show all categories on page load
  // ─────────────────────────────────────────────────────────────────────────────
  renderCategoryBoxes();
});
