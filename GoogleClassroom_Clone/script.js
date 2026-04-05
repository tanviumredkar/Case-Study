// LOGIN
function login() {
  const name = document.getElementById("username").value.trim();
  if (!name) {
    alert("Please enter your name.");
    return;
  }
  localStorage.setItem("user", name);
  window.location.href = "dashboard.html";
}

// SHOW USER
document.addEventListener("DOMContentLoaded", () => {
  const userElements = document.querySelectorAll("#user");
  const userName = localStorage.getItem("user");
  userElements.forEach(el => el.innerText = userName);

  if (document.getElementById("teacherName")) {
    document.getElementById("teacherName").innerText = userName;
  }
});

// ADD CLASS
function addClass() {
  const className = document.getElementById("className").value.trim();
  if (!className) {
    alert("Please enter a class name.");
    return;
  }

  const classes = JSON.parse(localStorage.getItem("classes")) || [];
  classes.push(className);

  localStorage.setItem("classes", JSON.stringify(classes));
  displayClasses();
  hideAddClass();
  document.getElementById("className").value = "";
}

// DISPLAY CLASSES
function displayClasses() {
  const classes = JSON.parse(localStorage.getItem("classes")) || [];
  const container = document.getElementById("classList");

  container.innerHTML = "";

  classes.forEach((cls, index) => {
    const card = document.createElement("div");
    card.className = "card";
    card.onclick = () => openClass(index);

    card.innerHTML = `
      <div class="card-header"></div>
      <div class="card-content">
        <h3>${cls}</h3>
        <p>${localStorage.getItem("user")}</p>
      </div>
    `;

    container.appendChild(card);
  });
}

// OPEN CLASS
function openClass(index) {
  localStorage.setItem("currentClass", index);
  window.location.href = "class.html";
}

// GO BACK
function goBack() {
  window.location.href = "dashboard.html";
}

// SHOW ADD CLASS FORM
function showAddClass() {
  document.getElementById("addClassForm").style.display = "flex";
}

// HIDE ADD CLASS FORM
function hideAddClass() {
  document.getElementById("addClassForm").style.display = "none";
}

// LOAD ON PAGE
if (document.getElementById("classList")) {
  displayClasses();
}

// LOAD CLASS TITLE
document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("classTitle")) {
    const classes = JSON.parse(localStorage.getItem("classes")) || [];
    const index = localStorage.getItem("currentClass");

    document.getElementById("classTitle").innerText = classes[index];

    loadPosts();
    loadAssignments();

    // Set default active tab
    showTab('stream');
  }
});

// TAB SWITCHING
function showTab(tab) {
  const contents = document.querySelectorAll(".tab-content");
  contents.forEach(content => content.classList.remove("active"));

  const buttons = document.querySelectorAll(".tab-btn");
  buttons.forEach(button => button.classList.remove("active"));

  document.getElementById(tab).classList.add("active");
  event.target.classList.add("active");
}

// ADD POST
function addPost() {
  const input = document.getElementById("postInput").value.trim();
  if (!input) {
    alert("Please enter an announcement.");
    return;
  }
  const index = localStorage.getItem("currentClass");

  const posts = JSON.parse(localStorage.getItem("posts_" + index)) || [];
  posts.push(input);

  localStorage.setItem("posts_" + index, JSON.stringify(posts));
  loadPosts();
  document.getElementById("postInput").value = "";
}

// LOAD POSTS
function loadPosts() {
  const index = localStorage.getItem("currentClass");
  const posts = JSON.parse(localStorage.getItem("posts_" + index)) || [];
  const container = document.getElementById("postList");

  if (!container) return;

  container.innerHTML = "";

  posts.forEach(post => {
    const postElement = document.createElement("div");
    postElement.className = "post";

    postElement.innerHTML = `
      <div class="post-header">
        <div class="user-avatar">
          <span class="material-icons">account_circle</span>
        </div>
        <div>
          <strong>${localStorage.getItem("user")}</strong>
          <span class="post-time">Just now</span>
        </div>
      </div>
      <div class="post-content">${post}</div>
    `;

    container.appendChild(postElement);
  });
}

// ADD ASSIGNMENT
function addAssignment() {
  const input = document.getElementById("assignmentInput").value.trim();
  if (!input) {
    alert("Please enter an assignment title.");
    return;
  }
  const index = localStorage.getItem("currentClass");

  const assignments = JSON.parse(localStorage.getItem("assign_" + index)) || [];
  assignments.push(input);

  localStorage.setItem("assign_" + index, JSON.stringify(assignments));
  loadAssignments();
  document.getElementById("assignmentInput").value = "";
}

// LOAD ASSIGNMENTS
function loadAssignments() {
  const index = localStorage.getItem("currentClass");
  const assignments = JSON.parse(localStorage.getItem("assign_" + index)) || [];
  const container = document.getElementById("assignmentList");

  if (!container) return;

  container.innerHTML = "";

  assignments.forEach(assignment => {
    const assignmentElement = document.createElement("div");
    assignmentElement.className = "assignment";

    assignmentElement.innerHTML = `
      <div class="assignment-header">
        <div class="user-avatar">
          <span class="material-icons">account_circle</span>
        </div>
        <div>
          <strong>${localStorage.getItem("user")}</strong> posted a new assignment
          <span class="post-time">Just now</span>
        </div>
      </div>
      <div class="assignment-content">
        <h4>${assignment}</h4>
        <p>Due: No due date</p>
      </div>
    `;

    container.appendChild(assignmentElement);
  });
}