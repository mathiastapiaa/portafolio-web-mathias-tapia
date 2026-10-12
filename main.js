document.addEventListener('DOMContentLoaded', function() {
    
    // 1. Actualizar el año del footer automáticamente
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        const currentYear = new Date().getFullYear();
        yearSpan.textContent = currentYear;
    }

    // 2. Configurar el "Vigilante" (Observer) para las animaciones de scroll
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // La animación se activa cuando el 15% del elemento es visible
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Agregar la clase que activa la animación en CSS
                entry.target.classList.add('is-visible');
                // Dejar de observar para que la animación solo ocurra la primera vez
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Seleccionar todos los elementos a animar y ponerlos bajo observación
    const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');
    elementsToAnimate.forEach(el => scrollObserver.observe(el));

    // 3. Observer específico para las barras de progreso (Skills)
    const progressObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                // Leer el porcentaje guardado en el atributo data-width y aplicarlo al width de CSS
                const targetWidth = progressBar.getAttribute('data-width');
                progressBar.style.width = targetWidth;
                observer.unobserve(progressBar);
            }
        });
    }, { threshold: 0.5 }); // Se activa cuando la barra se ve a la mitad

    // Seleccionar todas las barras de progreso y observarlas
    const progressBars = document.querySelectorAll('.progress-bar');
    progressBars.forEach(bar => progressObserver.observe(bar));

});