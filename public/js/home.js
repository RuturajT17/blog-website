document.addEventListener('DOMContentLoaded', () => {
    // Animation for CTA button
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
      ctaButton.addEventListener('mouseenter', () => {
        ctaButton.style.transform = 'translateY(-3px)';
      });
      ctaButton.addEventListener('mouseleave', () => {
        ctaButton.style.transform = 'translateY(0)';
      });
    }
  });