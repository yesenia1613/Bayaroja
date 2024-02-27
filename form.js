document.addEventListener("DOMContentLoaded", function() {
  var contactForm = document.getElementById("contact_form");
  if (contactForm) {
      contactForm.addEventListener("submit", function(event) {
          event.preventDefault();
          var formData = new FormData(contactForm);

          fetch(contactForm.action, {
              method: "POST",
              body: formData
          })
          .then(function(response) {
              return response.json();
          })
          .then(function(data) {
              var successMessage = document.getElementById("mail_success");
              var errorMessage = document.getElementById("mail_fail");

              if (data.success) {
                  successMessage.style.display = "block";
                  errorMessage.style.display = "none";
                  contactForm.reset();
              } else {
                  successMessage.style.display = "none";
                  errorMessage.style.display = "block";
              }
          })
          .catch(function(error) {
              console.error("Error:", error);
              var errorMessage = document.getElementById("mail_fail");
              errorMessage.style.display = "block";
          });
      });
  }
});
