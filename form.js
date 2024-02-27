// form
document.addEventListener("DOMContentLoaded", function() {
  var contactForm = document.getElementById("contact_form");
  if (contactForm) {
      contactForm.addEventListener("submit", function(event) {
          event.preventDefault();
          var form = event.target;
          var formData = new FormData(form);

          fetch(form.action, {
              method: "POST",
              body: formData
          })
          .then(function(response) {
              return response.json();
          })
          .then(function(data) {
              if (data.success) {
                  document.getElementById("success_message").style.display = "block";
                  document.getElementById("error_message").style.display = "none";
                  form.reset();
              } else {
                  document.getElementById("success_message").style.display = "none";
                  document.getElementById("error_message").style.display = "block";
              }
          })
          .catch(function(error) {
              console.error("Error:", error);
              document.getElementById("success_message").style.display = "none";
              document.getElementById("error_message").style.display = "block";
          });
      });
  }
});
