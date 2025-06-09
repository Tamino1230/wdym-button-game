
document.addEventListener('DOMContentLoaded', () => {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 
    };

    const header = document.querySelector('header');
    const footer = document.querySelector('footer');

    if (header) {
        header.classList.add('fade-in');
        requestAnimationFrame(() => {
            header.classList.add('visible');
        });
    }
    if (footer) {
        footer.classList.add('fade-in');
        requestAnimationFrame(() => {
            footer.classList.add('visible');
        });
    }

    const sectionContainers = document.querySelectorAll('section > .container');
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                entry.target.classList.remove('visible');
            }
        });
    }, observerOptions);

    sectionContainers.forEach(el => {
        el.classList.add('fade-in');
        sectionObserver.observe(el);
    });

    const galleryImages = document.querySelectorAll('#gallery .image-grid img');
    const imageObserverOptions = { ...observerOptions, threshold: 0.2 }; 
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                entry.target.classList.remove('visible'); 
            }
        });
    }, imageObserverOptions);

    galleryImages.forEach(img => {
        img.classList.add('fade-in');
        imageObserver.observe(img);
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            try {
                const targetElement = document.querySelector(this.getAttribute('href'));
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                } else {
                    console.warn("Smooth scroll target not found: ", this.getAttribute('href'));
                }
            } catch (error) {
                console.error("Error in smooth scroll: ", error);
            }
        });
    });
});