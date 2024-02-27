document.addEventListener("DOMContentLoaded", function() {
    cargarEncabezado();
    cargarPiePagina();
});

function cargarEncabezado() {
    const headerContainer = document.getElementById("header-container");

    fetch('header.html')
        .then(response => response.text())
        .then(data => {
            headerContainer.innerHTML = data;
        });
}

function cargarPiePagina() {
    const footerContainer = document.getElementById("footer-container");

    fetch('footer.html')
        .then(response => response.text())
        .then(data => {
            footerContainer.innerHTML = data;
        });
}