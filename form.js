document.getElementById("contact_form").addEventListener("submit", function(event) {
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
      document.getElementById("response").textContent = data.message;
      if (data.success) {
        form.reset();
      }
    })
    .catch(function(error) {
      console.error("Error:", error);
    });
  });