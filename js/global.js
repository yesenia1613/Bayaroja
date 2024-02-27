// Función para cargar el encabezado
function cargarEncabezado() {
    fetch('../header.html')
        .then(response => response.text())
        .then(html => {
            document.getElementById('header-container').innerHTML = html;
        });
}

// Función para cargar el pie de página
function cargarPieDePagina() {
    fetch('../footer.html')
        .then(response => response.text())
        .then(html => {
            document.getElementById('footer-container').innerHTML = html;
        });
}

// Llamar a las funciones para cargar el encabezado y el pie de página
cargarEncabezado();
cargarPieDePagina();