// // function renderIdeas() {
// //     const ideasContainer = document.createElement('div');
// //     ideasContainer.className = 'card-container';
// //     const mainContainer = document.querySelector(".main-content");
// //     mainContainer.appendChild(ideasContainer);
// //     ideasContainer.innerHTML = ''; // Clear previous content

// //     const ideas = getAllIdeas();

// //     if (Array.isArray(ideas)) {
// //         ideas.filter(el => String(el.category).toLowerCase() === "operation").forEach(idea => {
// //             const ideaCard = document.createElement('div');
// //             ideaCard.className = 'card';
// //             ideaCard.innerHTML = `
// //             <div class="card__title-row">
// //                 <div class="count-badge count-badge__primary">${idea.category}</div>
// //                 <span class="badge">${idea.status}</span>
// //             </div>
// //             <div class="card__body">
// //                 <p>${idea.userName}(${idea.empId})</p>
// //                 <p>Team: ${idea.team}</p>
// //                 <div class="user-icon-wrapper">
// //                     <div class="user-icon" style="background:red"></div>
// //                     <div class="user-icon" style="background:blue"></div>
// //                     <div class="user-icon" style="background:green"></div>
// //                     <div class="user-icon" style="background:orange"></div>
// //                 </div>
// //                 <p>Submitted: ${new Date(idea.timestamp).toLocaleDateString()}</p>
// //             </div>
// //         `;
// //             ideasContainer.appendChild(ideaCard);
// //         });
// //     }
// // }

// // renderIdeas();



// // function renderIdeas() {
// //     const ideasContainer = document.querySelector('.card-container');
// //     ideasContainer.innerHTML = ''; // Clear previous content

// //     const drafts = getAllDrafts();

// //     if (Array.isArray(drafts)) {
// //         drafts.forEach((idea, index) => {
// //             const ideaCard = document.createElement('div');
// //             ideaCard.className = 'card';
// //             ideaCard.innerHTML = `
// //                 <div class="card__title-row">
// //                     <div class="count-badge count-badge__primary">${idea.category}</div>
// //                     <span class="badge">${idea.status}</span>
// //                 </div>
// //                 <h3 class="card__title">${idea.department}</h3>
// //                 <div class="card__body">
// //                     <p>${idea.userName}</p>
// //                     <p>Manager: ${idea.manager}</p>
// //                 </div>
// //                 <div class="card__body">
// //                 </div>
// //             `;

// //             ideasContainer.appendChild(ideaCard);
// //         });
// //     }
// // }


// // renderIdeas();


// function renderIdeas() {
//     const ideasContainer = document.querySelector('.card-container');
//     ideasContainer.innerHTML = ''; // Clear previous content

//     const drafts = getAllDrafts();

//     if (Array.isArray(drafts)) {
//         drafts.forEach((idea, index) => {
//             const ideaCard = document.createElement('div');
//             ideaCard.className = 'card';
//             ideaCard.innerHTML = `
//                 <div class="card__title-row">
//                     <div class="count-badge count-badge__primary">${idea.category}</div>
//                     <span class="badge">${idea.status}</span>
//                 </div>
//                 <h3 class="card__title">${idea.department}</h3>
//                 <div class="card__body">
//                     <p>${idea.userName}</p>
//                     <p>Manager: ${idea.manager}</p>
//                 </div>
//                 <div class="card__body">
//                     <button class="edit-btn" data-index="${index}">Edit</button>
//                     <button class="delete-btn" data-index="${index}">Delete</button>
//                 </div>
//             `;

//             ideasContainer.appendChild(ideaCard);
//         });

//         // Delete button handler with confirmation
//         document.querySelectorAll('.delete-btn').forEach(button => {
//             button.addEventListener('click', function () {
//                 const index = parseInt(this.getAttribute('data-index'));
//                 const confirmDelete = confirm("Are you sure you want to delete this idea?");
//                 if (confirmDelete) {
//                     drafts.splice(index, 1);
//                     localStorage.setItem('drafts', JSON.stringify(drafts));
//                     renderIdeas();
//                 }
//             });
//         });

//         // Edit button handler with modal
//         document.querySelectorAll('.edit-btn').forEach(button => {
//             button.addEventListener('click', function () {
//                 const index = parseInt(this.getAttribute('data-index'));
//                 const idea = drafts[index];
//                 showEditModal(idea, index);
//             });
//         });
//     }
// }

// // function showEditModal(idea, index) {
// //     let modal = document.getElementById('editModal');
// //     if (!modal) {
// //         modal = document.createElement('div');
// //         modal.id = 'editModal';
// //         modal.className = 'modal';
// //         modal.innerHTML = `
// //             <div class="modal-content">
// //                 <span class="close-btn">&times;</span>
// //                 <h3>Edit Idea</h3>
// //                 <form id="editForm">
// //                     <label>Category: <input name="category" required></label><br>
// //                     <label>Department: <input name="department" required></label><br>
// //                     <label>Manager: <input name="manager" required></label><br>
// //                     <label>User Name: <input name="userName" required></label><br>
// //                     <label>Status: <input name="status" required></label><br>
// //                     <button type="submit">Save</button>
// //                 </form>
// //             </div>
// //         `;
// //         document.body.appendChild(modal);

// //         // Close modal on click
// //         modal.querySelector('.close-btn').onclick = () => modal.style.display = 'none';
// //         window.onclick = e => {
// //             if (e.target == modal) modal.style.display = 'none';
// //         };
// //     }

// //     const form = modal.querySelector('#editForm');
// //     form.category.value = idea.category || '';
// //     form.department.value = idea.department || '';
// //     form.manager.value = idea.manager || '';
// //     form.userName.value = idea.userName || '';
// //     form.status.value = idea.status || '';

// //     form.onsubmit = e => {
// //         e.preventDefault();
// //         const updated = {
// //             ...idea,
// //             category: form.category.value,
// //             department: form.department.value,
// //             manager: form.manager.value,
// //             userName: form.userName.value,
// //             status: form.status.value,
// //         };
// //         const drafts = getAllDrafts();
// //         drafts[index] = updated;
// //         localStorage.setItem('drafts', JSON.stringify(drafts));
// //         renderIdeas();
// //         modal.style.display = 'none';
// //     };

// //     modal.style.display = 'block';
// // }

// // function showEditModal(idea, index) {
// //     const modal = document.getElementById('editIdeaModal');
// //     const form = document.getElementById('editIdeaForm');

// //     console.log('showEditModal getting called')

// //     // Fill form fields
// //     document.getElementById('editCategory').value = idea.category || '';
// //     document.getElementById('editDepartment').value = idea.department || '';
// //     document.getElementById('editUserName').value = idea.userName || '';
// //     document.getElementById('editManager').value = idea.manager || '';
// //     document.getElementById('editStatus').value = idea.status || '';
// //     document.getElementById('editDescription').value = idea.description || '';
// //     document.getElementById('editMonth').value = idea.month || '';

// //     // Show modal
// //     modal.classList.remove('hidden');

// //     // Handle close
// //     document.getElementById('editModalCloseBtn').onclick = () => {
// //         modal.classList.add('hidden');
// //     };
// //     window.onclick = (event) => {
// //         if (event.target == modal) {
// //             modal.classList.add('hidden');
// //         }
// //     };

// //     // Handle form submit
// //     form.onsubmit = (e) => {
// //         e.preventDefault();
// //         const updated = {
// //             ...idea,
// //             category: document.getElementById('editCategory').value,
// //             department: document.getElementById('editDepartment').value,
// //             userName: document.getElementById('editUserName').value,
// //             manager: document.getElementById('editManager').value,
// //             status: document.getElementById('editStatus').value,
// //             description: document.getElementById('editDescription').value,
// //             month: document.getElementById('editMonth').value
// //         };

// //         const drafts = getAllDrafts();
// //         drafts[index] = updated;
// //         localStorage.setItem('drafts', JSON.stringify(drafts));
// //         renderIdeas();
// //         modal.classList.add('hidden');
// //     };
// // }

// function showEditModal(idea, index) {
//     console.log('getting called')
//     const modal = document.getElementById('myModal');
//     const form = document.getElementById('idea-form');
//     console.log('idea',idea);

//     // Pre-fill form fields
//     document.getElementById('userName').value = idea.userName || '';
//     document.getElementById('empId').value = idea.empId || '';
//     document.getElementById('department').value = idea.department || '';
//     document.getElementById('manager').value = idea.manager || '';
//     document.getElementById('category').value = idea.category || '';
//     document.getElementById('description').value = idea.description || '';

//     // Show modal
//     modal.classList.add('open');

//     // Clear any previous submit handlers to prevent duplicates
//     const newForm = form.cloneNode(true);
//     form.parentNode.replaceChild(newForm, form);

//     newForm.addEventListener('submit', function (e) {
//         e.preventDefault();

//         const updatedIdea = {
//             ...idea,
//             userName: newForm.userName.value,
//             empId: newForm.empId.value,
//             department: newForm.department.value,
//             manager: newForm.manager.value,
//             category: newForm.category.value,
//             description: newForm.description.value,
//             timestamp: new Date().toISOString() // Optional: update timestamp
//         };

//         const drafts = getAllDrafts();
//         drafts[index] = updatedIdea;
//         localStorage.setItem('drafts', JSON.stringify(drafts));

//         modal.classList.remove('open');
//         renderIdeas();
//     });

//     // Handle Cancel and Close
//     document.getElementById('cancel-idea-form').onclick = () => modal.classList.remove('open');
//     document.getElementById('close-idea-form').onclick = () => modal.classList.remove('open');
// }



// renderIdeas();


function renderIdeas() {
  const ideasContainer = document.querySelector('.card-container');
  ideasContainer.innerHTML = '';

  const drafts = getAllDrafts();

  if (Array.isArray(drafts)) {
    drafts.forEach((idea, index) => {
      const ideaCard = document.createElement('div');
      ideaCard.className = 'card';
      ideaCard.innerHTML = `
        <div class="card__title-row">
            <div class="count-badge count-badge__primary">${idea.category}</div>
            <span class="badge">${idea.status}</span>
        </div>
        <h3 class="card__title">${idea.department}</h3>
        <div class="card__body">
            <p>${idea.userName}</p>
            <p>Manager: ${idea.manager}</p>
        </div>
        <div class="card__body">
            <button class="edit-btn" data-index="${index}">Edit</button>
            <button class="delete-btn" data-index="${index}">Delete</button>
        </div>
      `;
      ideasContainer.appendChild(ideaCard);
    });

    document.querySelectorAll('.delete-btn').forEach(button => {
      button.addEventListener('click', function () {
        const index = parseInt(this.getAttribute('data-index'));
        const confirmDelete = confirm("Are you sure you want to delete this idea?");
        if (confirmDelete) {
          drafts.splice(index, 1);
          localStorage.setItem('drafts', JSON.stringify(drafts));
          renderIdeas();
        }
      });
    });

    document.querySelectorAll('.edit-btn').forEach(button => {
      button.addEventListener('click', function () {
        const index = parseInt(this.getAttribute('data-index'));
        const idea = drafts[index];
        showEditModal(idea, index);
      });
    });
  }
}

function showEditModal(idea, index) {
  const modal = document.getElementById('myModal');
  const form = document.getElementById('idea-form');

  // Fill the form
  form.userName.value = idea.userName || '';
  form.empId.value = idea.empId || '';
  form.department.value = idea.department || '';
  form.manager.value = idea.manager || '';
  form.category.value = idea.category || '';
  form.description.value = idea.description || '';

  modal.classList.add('open');

  // Reset any previous listeners
  const newForm = form.cloneNode(true);
  form.parentNode.replaceChild(newForm, form);

  // Cancel and close handlers
  document.getElementById('cancel-idea-form').onclick = () => modal.classList.remove('open');
  document.getElementById('close-idea-form').onclick = () => modal.classList.remove('open');

  // Save as Draft
  newForm.querySelector('#save-as-draft').onclick = function () {
    const updatedDraft = {
      ...idea,
      userName: newForm.userName.value,
      empId: newForm.empId.value,
      department: newForm.department.value,
      manager: newForm.manager.value,
      category: newForm.category.value,
      description: newForm.description.value,
      status: 'as Draft',
      timestamp: new Date().toISOString()
    };

    const drafts = getAllDrafts();
    drafts[index] = updatedDraft;
    localStorage.setItem('drafts', JSON.stringify(drafts));
    modal.classList.remove('open');
    renderIdeas();
  };

  // Submit as Final Idea
  newForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const submittedIdea = {
      ...idea,
      userName: newForm.userName.value,
      empId: newForm.empId.value,
      department: newForm.department.value,
      manager: newForm.manager.value,
      category: newForm.category.value,
      description: newForm.description.value,
      status: 'Submitted',
      timestamp: new Date().toISOString(),
      voted: false,
      num_of_votes: 0
    };

    const ideas = getAllIdeas();
    ideas.push(submittedIdea);
    localStorage.setItem('ideas', JSON.stringify(ideas));

    // Remove from drafts
    const drafts = getAllDrafts();
    drafts.splice(index, 1);
    localStorage.setItem('drafts', JSON.stringify(drafts));

    modal.classList.remove('open');
    renderIdeas();
  });
}

// Helpers to read from localStorage
function getAllDrafts() {
  return JSON.parse(localStorage.getItem('drafts')) || [];
}
function getAllIdeas() {
  return JSON.parse(localStorage.getItem('ideas')) || [];
}

renderIdeas();
