document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Sticky Header Effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Scroll Animations (Fade Up)
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.service-card, .work-item, .section-title, .hero-content');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });

    // Add visible class styling dynamically
    const style = document.createElement('style');
    style.innerHTML = `
        .visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);

    // Services Hover Logic (Optional: Add 'active' class on click for mobile if needed, but CSS hover works for desktop)
    const accordionItems = document.querySelectorAll('.accordion-item');
    accordionItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            // Remove active from peers for cleaner transition
            accordionItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
        });
    });
});

// Preloader Animation Logic
document.addEventListener('DOMContentLoaded', () => {
    const introOverlay = document.getElementById('intro-overlay');
    const introLogoContainer = document.querySelector('.intro-logo-container');
    const introLogo = document.getElementById('intro-logo');
    const headerLogo = document.querySelector('.logo img');

    if (introOverlay && introLogo && headerLogo) {
        // Ensure header logo is hidden initially (already set in HTML but double check/clean)
        headerLogo.style.opacity = '0';

        // 1. Reveal Logo (Part by Part via CSS Clip-Path)
        // Delay slightly to ensure render
        setTimeout(() => {
            introLogoContainer.classList.add('reveal');
        }, 50);

        // 2. Move Logo to Header Position
        // Wait for reveal animation (1.5s) to mostly finish or finish
        setTimeout(() => {
            // Get viewport-relative positions
            const startRect = introLogo.getBoundingClientRect();
            const endRect = headerLogo.getBoundingClientRect();

            // Calculate translation needed
            const x = endRect.left - startRect.left;
            const y = endRect.top - startRect.top;

            // Calculate scale needed (based on height to preserve aspect ratio)
            const scale = endRect.height / startRect.height;

            // Apply styles for animation
            introLogo.style.transformOrigin = 'top left';
            introLogo.style.transition = 'transform 1s cubic-bezier(0.77, 0, 0.175, 1), opacity 0.5s ease';
            introLogo.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;

            // Concurrently fade out the overlay background
            introOverlay.classList.add('fade-out'); // handles bg transparency

        }, 1800); // reduced overall time slightly as well

        // 3. Finalize and Swap
        setTimeout(() => {
            // Show real header logo
            headerLogo.style.opacity = '1';

            // Hide intro logo to prevent double visual if alignment isn't pixel perfect
            introLogo.style.opacity = '0';

            // Allow cleanup
            setTimeout(() => {
                introOverlay.style.display = 'none';
            }, 500);
        }, 2900);
    }
});
