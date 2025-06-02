function getAllIdeas() {
  return JSON.parse(localStorage.getItem("ideas") || "[]");
}

function updateManagerACount() {
  const ideas = getAllIdeas();
  const managerACount = ideas.filter(
    (idea) => idea.manager === "Manager A"
  ).length;
  document.getElementById("managerACount").textContent = managerACount;
}

// Call the function on page load
updateManagerACount();
