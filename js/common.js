const IDEAS_LS_KEY = "ideas";
const DRAFT_IDEAS_LS_KEY = "drafts";

function getAllIdeas() {
  try {
    const ideas = JSON.parse(localStorage.getItem(IDEAS_LS_KEY)) || [];
    console.log("ideas22", ideas);
    return ideas;
  } catch (error) {
    console.error("Error getting ideas:", error);
    return [];
  }
}

function getAllDrafts() {
  try {
    const drafts = JSON.parse(localStorage.getItem(DRAFT_IDEAS_LS_KEY)) || [];
    console.log("drafts", drafts);
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
  status = "Submitted"
) {
  const num_of_votes = 0;
  const voted = false;
  const month = "May"; // curently we are using this field to show the data monyh wise, but later on by timestamp we will filter the data
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
}

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

  //Append to body
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

// Save ideas to local storage
function saveIdeasToLocalStorage() {
  const ideas = [
    {
      userName: "Alice",
      empId: "EMP001",
      department: "CE",
      manager: "Manager A",
      seniorManager: "Senior-Manager A",
      category: "Transport",
      subcategory: "Money",
      description: "Create a shuttle service between office branches.",
      attachment: "",
      status: "Submitted",
      feedback: "",
      num_of_votes: 5,
      voted: true,
      month: "January",
      timestamp: Date.now(),
    },
    {
      userName: "Bob",
      empId: "EMP002",
      department: "CP",
      manager: "Manager B",
      seniorManager: "Senior-Manager B",
      category: "Facility",
      subcategory: "Quality",
      description: "Install more ergonomic chairs in workspaces.",
      attachment: "",
      status: "Feedback",
      feedback: "Please provide a cost estimate and vendor details.",
      num_of_votes: 2,
      voted: false,
      month: "February",
      timestamp: Date.now(),
    },
    {
      userName: "Carol",
      empId: "EMP003",
      department: "GRS",
      manager: "Manager C",
      seniorManager: "Senior-Manager A",
      category: "Operation",
      subcategory: "Efficiency",
      description: "Automate daily stand-up reports.",
      attachment: "",
      status: "Submitted",
      feedback: "",
      num_of_votes: 3,
      voted: true,
      month: "March",
      timestamp: Date.now(),
    },
    {
      userName: "David",
      empId: "EMP004",
      department: "IC",
      manager: "Manager D",
      seniorManager: "Senior-Manager B",
      category: "Technology",
      subcategory: "Money",
      description: "Introduce AI-based customer chat bots.",
      attachment: "",
      status: "Approved",
      feedback: "",
      num_of_votes: 10,
      voted: false,
      month: "April",
      timestamp: Date.now(),
    },
    {
      userName: "Eve",
      empId: "EMP005",
      department: "CQT",
      manager: "Manager A",
      seniorManager: "Senior-Manager A",
      category: "Facility",
      subcategory: "Efficiency",
      description: "Upgrade cafeteria food service quality.",
      attachment: "",
      status: "Approved",
      feedback: "",
      num_of_votes: 1,
      voted: true,
      month: "May",
      timestamp: Date.now(),
    },
    {
      userName: "Frank",
      empId: "EMP006",
      department: "CE",
      manager: "Manager B",
      seniorManager: "Senior-Manager B",
      category: "Transport",
      subcategory: "Quality",
      description: "Create carpool matching platform.",
      attachment: "",
      status: "Feedback",
      feedback: "Add more details on the implementation timeline.",
      num_of_votes: 6,
      voted: false,
      month: "June",
      timestamp: Date.now(),
    },
    {
      userName: "Grace",
      empId: "EMP007",
      department: "CP",
      manager: "Manager C",
      seniorManager: "Senior-Manager A",
      category: "Operation",
      subcategory: "Money",
      description: "Deploy remote work monitoring tool.",
      attachment: "",
      status: "Approved",
      feedback: "",
      num_of_votes: 40,
      voted: true,
      month: "July",
      timestamp: Date.now(),
    },
    {
      userName: "Hank",
      empId: "EMP008",
      department: "GRS",
      manager: "Manager D",
      seniorManager: "Senior-Manager B",
      category: "Technology",
      subcategory: "Efficiency",
      description: "Offer online training platforms.",
      attachment: "",
      status: "In Review",
      feedback: "",
      num_of_votes: 81,
      voted: false,
      month: "August",
      timestamp: Date.now(),
    },
    {
      userName: "Ivy",
      empId: "EMP009",
      department: "IC",
      manager: "Manager A",
      seniorManager: "Senior-Manager A",
      category: "Transport",
      subcategory: "Quality",
      description: "Provide electric scooter access.",
      attachment: "",
      status: "Feedback",
      feedback: "Consider safety and parking logistics.",
      num_of_votes: 71,
      voted: true,
      month: "September",
      timestamp: Date.now(),
    },
    {
      userName: "Jake",
      empId: "EMP010",
      department: "CQT",
      manager: "Manager B",
      seniorManager: "Senior-Manager B",
      category: "Facility",
      subcategory: "Money",
      description: "Redesign open office spaces.",
      attachment: "",
      status: "In Review",
      feedback: "",
      num_of_votes: 91,
      voted: false,
      month: "October",
      timestamp: Date.now(),
    },
    {
      userName: "Kate",
      empId: "EMP011",
      department: "CE",
      manager: "Manager C",
      seniorManager: "Senior-Manager A",
      category: "Operation",
      subcategory: "Efficiency",
      description: "Setup team dashboards for productivity.",
      attachment: "",
      status: "Feedback",
      feedback: "Clarify which tools will be used for dashboards.",
      num_of_votes: 43,
      voted: true,
      month: "November",
      timestamp: Date.now(),
    },
    {
      userName: "Leo",
      empId: "EMP012",
      department: "CP",
      manager: "Manager D",
      seniorManager: "Senior-Manager B",
      category: "Technology",
      subcategory: "Money",
      description: "Virtual reality for training.",
      attachment: "",
      status: "In Review",
      feedback: "",
      num_of_votes: 62,
      voted: false,
      month: "December",
      timestamp: Date.now(),
    },
    {
      userName: "Mona",
      empId: "EMP013",
      department: "GRS",
      manager: "Manager A",
      seniorManager: "Senior-Manager A",
      category: "Facility",
      subcategory: "Quality",
      description: "Rest areas for employees.",
      attachment: "",
      status: "Submitted",
      feedback: "",
      num_of_votes: 53,
      voted: true,
      month: "January",
      timestamp: Date.now(),
    },
    {
      userName: "Nick",
      empId: "EMP014",
      department: "IC",
      manager: "Manager B",
      seniorManager: "Senior-Manager B",
      category: "Transport",
      subcategory: "Efficiency",
      description: "On-demand shuttle request system.",
      attachment: "",
      status: "Feedback",
      feedback: "How will the shuttle requests be managed in real-time?",
      num_of_votes: 32,
      voted: false,
      month: "February",
      timestamp: Date.now(),
    },
    {
      userName: "Olivia",
      empId: "EMP015",
      department: "CQT",
      manager: "Manager C",
      seniorManager: "Senior-Manager A",
      category: "Operation",
      subcategory: "Money",
      description: "Cross-departmental collaboration tool.",
      attachment: "",
      status: "Submitted",
      feedback: "",
      num_of_votes: 25,
      voted: true,
      month: "March",
      timestamp: Date.now(),
    },
    {
      userName: "Paul",
      empId: "EMP016",
      department: "CE",
      manager: "Manager D",
      seniorManager: "Senior-Manager B",
      category: "Technology",
      subcategory: "Quality",
      description: "Digital suggestion box.",
      attachment: "",
      status: "In Review",
      feedback: "",
      num_of_votes: 56,
      voted: false,
      month: "April",
      timestamp: Date.now(),
    },
    {
      userName: "Quinn",
      empId: "EMP017",
      department: "CP",
      manager: "Manager A",
      seniorManager: "Senior-Manager A",
      category: "Facility",
      subcategory: "Efficiency",
      description: "Noise-canceling work pods.",
      attachment: "",
      status: "Rejected",
      feedback: "",
      num_of_votes: 17,
      voted: true,
      month: "May",
      timestamp: Date.now(),
    },
    {
      userName: "Rachel",
      empId: "EMP018",
      department: "GRS",
      manager: "Manager B",
      seniorManager: "Senior-Manager B",
      category: "Operation",
      subcategory: "Money",
      description: "Internal idea hackathon.",
      attachment: "",
      status: "Rejected",
      feedback: "",
      num_of_votes: 93,
      voted: false,
      month: "June",
      timestamp: Date.now(),
    },
    {
      userName: "Sam",
      empId: "EMP019",
      department: "IC",
      manager: "Manager C",
      seniorManager: "Senior-Manager A",
      category: "Transport",
      subcategory: "Quality",
      description: "Secure bike storage.",
      attachment: "",
      status: "Feedback",
      feedback: "Please include location options for bike racks.",
      num_of_votes: 69,
      voted: true,
      month: "July",
      timestamp: Date.now(),
    },
    {
      userName: "Tina",
      empId: "EMP020",
      department: "CQT",
      manager: "Manager D",
      seniorManager: "Senior-Manager B",
      category: "Technology",
      subcategory: "Efficiency",
      description: "Augmented reality for onboarding.",
      attachment: "",
      status: "Rejected",
      feedback: "",
      num_of_votes: 12,
      voted: false,
      month: "August",
      timestamp: Date.now(),
    },
  ];
  // Setting sample data in localstorage
  localStorage.setItem(IDEAS_LS_KEY, JSON.stringify(ideas));

  localStorage.setItem("sampleData", JSON.stringify(true));
}
