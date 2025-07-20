// Get DOM elements
const form = document.getElementById("userForm");
const nameInput = document.getElementById("name");
const ageInput = document.getElementById("age");
const userInfoCard = document.getElementById("userInfoCard");
const displayName = document.getElementById("displayName");
const displayAge = document.getElementById("displayAge");

// Form validation function
function validateForm() {
  const name = nameInput.value.trim();
  const age = parseInt(ageInput.value);

  // Check if name is provided and is a string
  if (!name || name.length === 0) {
    return false;
  }

  // Check if age is provided and is a positive integer
  if (!age || age <= 0 || !Number.isInteger(age)) {
    return false;
  }

  return true;
}
function gradeChecker() {
  const name = nameInput.value.trim();
  const age = parseInt(ageInput.value);
  const gradeMessage = document.getElementById("gradeMessage");

  let message = "";
  let color = "";

  if (age >= 90 && age <= 100) {
    message = `🌟 Excellent work, ${name}! You've earned a Grade A — outstanding performance! 🎓✨`;
    color = "#2ecc71"; // Emerald Green
  } else if (age >= 80 && age <= 89) {
    message = `👏 Great job, ${name}! You've received a Grade B — strong and consistent effort! 💪📘`;
    color = "#3498db"; // Teal Blue
  } else if (age >= 70 && age <= 79) {
    message = `👍 Good effort, ${name}! You've got a Grade C — keep pushing forward! 🚀📚`;
    color = "#f39c12"; // Amber Orange
  } else if (age >= 60 && age <= 69) {
    message = `🙂 You received a Grade D, ${name}. You're on the right track — don’t give up! 🔧📖`;
    color = "#e67e22"; // Deep Orange
  } else if (age >= 50 && age <= 59) {
    message = `⚠️ ${name}, you got a Grade E. You passed, but there’s much room for improvement. 📉🛠️`;
    color = "#e74c3c"; // Strong Red
  } else {
    message = `❌ ${name}, you received a Grade F. Let's review the material and try again! 📘✍️`;
    color = "#c0392b"; // Dark Red
  }

  gradeMessage.textContent = message;
  gradeMessage.style.color = color;
}

function updateUserInfoHelper() {
  // Show user info card with animation
  userInfoCard.classList.add("show");

  // Smooth scroll to user info card
  setTimeout(() => {
    userInfoCard.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  }, 100);
}

// Update user info display
function updateUserInfo() {
  const name = nameInput.value.trim();
  //const age = parseInt(ageInput.value);

  if (validateForm()) {
    // Update display elements
    // displayName.textContent = name;
    //displayAge.textContent = age;
    gradeChecker();

    updateUserInfoHelper();
  } else {
    // Hide user info card if validation fails
    userInfoCard.classList.remove("show");
  }
}

// Form submission handler
form.addEventListener("submit", function (e) {
  e.preventDefault(); // Prevent default form submission

  if (validateForm()) {
    updateUserInfo();

    // Optional: Show success message
    const submitBtn = form.querySelector(".submit-btn");
    const originalText = submitBtn.textContent;

    submitBtn.textContent = "Result!";
    submitBtn.style.backgroundColor = "#00b894";

    // Reset button after 2 seconds
    setTimeout(() => {
      submitBtn.textContent = originalText;
      submitBtn.style.backgroundColor = "#6c5ce7";
    }, 2000);
  } else {
    // Show validation errors
    alert("Please fill in both name and age fields correctly.");
  }
});

// Age input constraints
ageInput.addEventListener("input", function () {
  // Ensure only positive integers
  let value = parseInt(this.value);

  if (value < 1) {
    this.value = "";
  } else if (value > 100) {
    this.value = 100;
  }
});
// prevent numeric number from entering the input name form
nameInput.addEventListener("keydown", function (event) {
  let key = event.key;

  // Allow letters only (A–Z and a–z)
  let isLetter = /^[a-zA-Z]$/.test(key);

  // Allow spacebar
  let isSpace = key === " ";

  // Allow Backspace and Delete
  let isControl = key === "Backspace" || key === "Delete";

  // If not a letter, space, or control key → block it
  if (!isLetter && !isSpace && !isControl) {
    event.preventDefault();
  }
});

//

// prevent non numeric from typing

ageInput.addEventListener("keydown", function (event) {
  let key = event.key;

  // If key is a number, allow it
  if (key >= "0" && key <= "9") {
    return;
  }

  // If key is Backspace or Delete, allow it
  if (key === "Backspace" || key === "Delete") {
    return;
  }

  // If key is Enter, allow it only if the number is between 1 and 100
  if (key === "Enter") {
    let currentValue = parseInt(ageInput.value);
    if (currentValue >= 1 && currentValue <= 100) {
      return; // allow Enter
    } else {
      event.preventDefault(); // block Enter if number is not valid
      return;
    }
  }

  // If it's anything else (like a letter or symbol), block it
  event.preventDefault();
});

//

// Prevent negative values and decimal points in age input
ageInput.addEventListener("keypress", function (e) {
  // Allow only numbers, backspace, delete, tab, escape, enter
  if (
    [46, 8, 9, 27, 13].indexOf(e.e.key) !== -1 ||
    // Allow Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
    (e.e.key === 65 && e.ctrlKey === true) ||
    (e.e.key === 67 && e.ctrlKey === true) ||
    (e.e.key === 86 && e.ctrlKey === true) ||
    (e.e.key === 88 && e.ctrlKey === true)
  ) {
    return;
  }

  // Ensure that it is a number and stop the keypress
  if (
    (e.shiftKey || e.e.key < 48 || e.e.key > 57) &&
    (e.e.key < 96 || e.e.key > 105)
  ) {
    e.preventDefault();
  }
});

// Initialize form state
document.addEventListener("DOMContentLoaded", function () {
  // Hide user info card on page load
  userInfoCard.classList.remove("show");

  // Focus on name input
  nameInput.focus();

  // Set default values to empty
  nameInput.value = "";
  ageInput.value = "";
});
