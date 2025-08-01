document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("rsvp-form");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = form.elements["name"].value.trim();
    const attendance = form.elements["attendance"].value;
    const message = form.elements["message"].value.trim();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("attendance", attendance);
    formData.append("message", message);

    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycby_UpnF9puo7z81YV_VR2tGQF6Tga4LlQnxbIky3HAwEjT2N3SI2klsF2G4E-SA8xk/exec",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        if (attendance === "Attending") {
          window.location.href = "thankyou.html";
        } else {
          window.location.href = "thankyou-decline.html";
        }
      } else {
        alert("Submission failed. Please try again.");
      }
    } catch (error) {
      console.error("Error!", error.message);
      alert("Something went wrong. Please try again later.");
    }
  });
});
