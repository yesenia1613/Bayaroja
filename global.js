// global.js
document.addEventListener("DOMContentLoaded", function() {
    const headerContainer = document.getElementById("header-container");
    const footerContainer = document.getElementById("footer-container");

    // Cargar el encabezado
    fetch('header.html')
        .then(response => response.text())
        .then(data => {
            headerContainer.innerHTML = data;
        });

    // Cargar el pie de página
    fetch('footer.html')
        .then(response => response.text())
        .then(data => {
            footerContainer.innerHTML = data;
        });
});