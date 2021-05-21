const preguntas = document.querySelectorAll('.pregunta');
preguntas.forEach((pregunta) => {
    pregunta.addEventListener('click', (e) => {
        
        e.currentTarget.classList.toggle('activa');

    });
});