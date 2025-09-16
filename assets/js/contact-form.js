// Contact Form Start........
const PUBLIC_KEY = "rBw2jfVAJ-w_pIj2L";
const SERVICE_ID = "service_zfz38om";
const TEMPLATE_ID = "template_bldq63i";

(function () {
  emailjs.init(PUBLIC_KEY);
})();

window.onload = function () {
  // Get the form element
  const form = document.querySelector(".get-in-form");

  // Get the submit button element
  const submitButton = document.querySelector(".get-in-btn");

  // Add a 'submit' event listener to the form
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    submitButton.disabled = true;

    // Send the form data using EmailJS
    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, this).then(
      () => {
        // Show a success message
        alert("Contact request sent successfully!");
        form.reset();
        submitButton.disabled = false;
      },
      (error) => {
        // Show an error message
        alert("Failed to send Contact request. Please try again.");
        console.error("Email sending failed:", error);
        submitButton.disabled = false;
      }
    );
  });
};

// Contact Form End........
