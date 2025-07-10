const shareBtn = document.getElementById("shareBtn");
const shareCounter = document.getElementById("shareCounter");
const submitBtn = document.getElementById("submitBtn");
const form = document.getElementById("registrationForm");
const thankYou = document.getElementById("thankYou");

let count = 0;

// Prevent resubmission
if (localStorage.getItem("submitted") === "true") {
  disableForm();
}

shareBtn.addEventListener("click", () => {
  if (count >= 5) return;

  const message = encodeURIComponent("Hey Buddy, Join Tech For Girls Community");
  const url = `https://wa.me/?text=${message}`;
  window.open(url, "_blank");

  count++;
  shareCounter.innerText = `Click count: ${count}/5`;

  if (count === 5) {
    alert("Sharing complete. Please continue.");
  }
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (count < 5) {
    alert("Please share 5 times before submitting.");
    return;
  }

  const formData = new FormData(form);

  // Replace with your actual Google Apps Script URL
  const scriptURL = "https://script.google.com/macros/s/AKfycbxlN1nWELA0oYgZT6Z8ivWohdFt4qKrBcofk_QCnKJEItCv8mvlAZCqCcnJ98VheyzIMQ/exec";

  try {
    submitBtn.disabled = true;

    await fetch(scriptURL, {
      method: "POST",
      body: formData,
    });

    localStorage.setItem("submitted", "true");
    disableForm();
  } catch (error) {
    alert("There was an error submitting your form.");
    console.error(error);
  }
});

function disableForm() {
  form.querySelectorAll("input, button").forEach((el) => {
    el.disabled = true;
  });
  thankYou.classList.remove("hidden");
}