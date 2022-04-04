document.getElementById('limpiar').addEventListener('click', () => {
    document.getElementById('datosTabla').innerHTML = '';
});

// Validación de los input de teléfono para permitir solo números [0-9]
for(const textbox of document.getElementsByClassName('num')) {
    // Validación de input numérico utilizando expresión regular
    textbox.addEventListener('keypress', (event) => {
        let ch = String.fromCharCode(event.which);
        if(!/^[0-9]+$/.test(ch)) {
            event.preventDefault();
        }
    });

    // Evitar que se puede pegar sobre el cuadro de texto
    textbox.onpaste = e => {
        e.preventDefault();
        return false;
    };

    // Evitar que se arrastrar sobre el cuadro de texto
    textbox.ondragstart = e => {
        e.preventDefault();
        return false;
    }

    textbox.ondrop = e => {
        e.preventDefault();
        return false;
    }
}