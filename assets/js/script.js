document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    lucide.createIcons();

    // Header Scroll Effect
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 50);
    });

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // If it's a pricing CTA, pass the tariff to the form
                if (this.hasAttribute('data-tariff')) {
                    const tariffInput = document.createElement('input');
                    tariffInput.type = 'hidden';
                    tariffInput.name = 'tariff';
                    tariffInput.value = this.getAttribute('data-tariff');
                    tariffInput.id = 'hidden-tariff';

                    const existing = document.getElementById('hidden-tariff');
                    if (existing) existing.remove();

                    document.getElementById('lead-form').appendChild(tariffInput);
                }

                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Form submission handling
    const form = document.getElementById('lead-form');
    const successMessage = document.getElementById('form-success');
    const resetBtn = document.getElementById('reset-form');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            // Collect Data
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());

            // Console log to simulate API Request
            console.log('Sending request to server:', data);

            // Simulate network delay
            const submitBtn = form.querySelector('.submit-btn');
            const originalBtnText = submitBtn.innerHTML;

            submitBtn.innerHTML = '<i data-lucide="loader-2" class="spin"></i> <span>Отправка...</span>';
            lucide.createIcons();
            submitBtn.disabled = true;

            setTimeout(() => {
                successMessage.classList.add('active');
                form.reset();
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
                lucide.createIcons();
            }, 1000);
        });
    }

    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            successMessage.classList.remove('active');
        });
    }

    // Input masking for phone (simple implementation)
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function (e) {
            let x = e.target.value.replace(/\D/g, '').match(/(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);
            if (!x[1]) return;

            let num = x[1] === '7' || x[1] === '8' ? '+7' : '+' + x[1];

            e.target.value = !x[2] ? num : num + ' (' + x[2] + (x[3] ? ') ' + x[3] : '') + (x[4] ? '-' + x[4] : '') + (x[5] ? '-' + x[5] : '');
        });
    }
});
