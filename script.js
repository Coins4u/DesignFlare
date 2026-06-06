document.addEventListener('DOMContentLoaded', () => {
    // Select elements first to avoid ReferenceError
    const navbar = document.getElementById('navbar');
    const mobileMenuBtn = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    // Navbar Scroll Effect
    function updateNavbar() {
        if (window.scrollY > 50) {
            navbar.classList.add('glass', 'shadow-sm', 'bg-white/90');
            navbar.classList.remove('bg-transparent');
        } else {
            // Only remove background if menu is NOT open
            // mobileMenu is now guaranteed to be declared
            if (!mobileMenu || mobileMenu.classList.contains('hidden')) {
                navbar.classList.remove('glass', 'shadow-sm', 'bg-white/90');
                navbar.classList.add('bg-transparent');
            }
        }
    }

    if (navbar) {
        window.addEventListener('scroll', updateNavbar);
        // Initial check
        updateNavbar();
    }

    // Mobile Menu Toggle logic
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            const icon = mobileMenuBtn.querySelector('i');

            if (mobileMenu.classList.contains('hidden')) {
                // Menu Closed
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
                // Re-evaluate navbar transparency
                updateNavbar();
            } else {
                // Menu Open
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
                // Ensure navbar has background when menu is open
                navbar.classList.add('bg-white/90', 'glass', 'shadow-sm');
                navbar.classList.remove('bg-transparent');
            }
        });

        // Close menu when clicking a link
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                const icon = mobileMenuBtn.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
                updateNavbar();
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (navbar && !navbar.contains(e.target) && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
                const icon = mobileMenuBtn.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
                updateNavbar();
            }
        });
    }

    // Animation Observer (if not already handled inline, but keeping it here is good practice)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in-up');
                entry.target.style.opacity = '1';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animateElements = document.querySelectorAll('.glass, .grid > div, h2, h3, .grid-cols-3 > div');
    animateElements.forEach((el, index) => {
        // Only set initial opacity if class not already present
        if (!el.classList.contains('animate-fade-in-up')) {
            el.style.opacity = '0';
            el.style.animationDelay = `${index % 3 * 0.1}s`;
            observer.observe(el);
        }
    });

    // Lead form submission (inline forms on product pages)
    // Optional: <meta name="designflare-api-base" content="https://your-node-host.com/api"> when the API is on another origin
    function getNotifyUrl() {
        const meta = document.querySelector('meta[name="designflare-api-base"]');
        const base = (meta?.getAttribute('content') || '').trim().replace(/\/$/, '');
        if (base) return `${base}/notify-admin`;
        return '/api/notify-admin';
    }

    function escapeLeadHtml(str) {
        return String(str ?? '')
            .replaceAll('&', '&amp;')
            .replaceAll('<', '&lt;')
            .replaceAll('>', '&gt;')
            .replaceAll('"', '&quot;')
            .replaceAll("'", '&#039;');
    }

    function wireInlineLeadForms() {
        const forms = document.querySelectorAll('form[data-df-lead-form="true"]');
        if (!forms.length) return;

        forms.forEach((form) => {
            form.addEventListener('submit', async (e) => {
                e.preventDefault();

                const tierName = form.getAttribute('data-tier-name') || 'DesignFlare Service Request';
                const price = form.getAttribute('data-price') || '';

                const fullName = (form.querySelector('input[name="fullName"]')?.value || '').trim();
                const email = (form.querySelector('input[name="email"]')?.value || '').trim();
                const country = (form.querySelector('input[name="country"]')?.value || '').trim();

                const errorEl = form.querySelector('[data-df-error="true"]');
                const successEl = form.querySelector('[data-df-success="true"]');
                const submitBtn = form.querySelector('button[type="submit"]');
                const idle = submitBtn ? submitBtn.querySelector('.df-submit-idle') : null;
                const loading = submitBtn ? submitBtn.querySelector('.df-submit-loading') : null;

                if (errorEl) {
                    errorEl.classList.add('hidden');
                    errorEl.textContent = '';
                }
                if (successEl) {
                    successEl.classList.add('hidden');
                    successEl.textContent = '';
                }

                if (!fullName || !email || !country) {
                    if (errorEl) {
                        errorEl.textContent = 'Please complete all fields to continue.';
                        errorEl.classList.remove('hidden');
                    }
                    return;
                }

                if (submitBtn) submitBtn.disabled = true;
                if (idle) idle.classList.add('hidden');
                if (loading) loading.classList.remove('hidden');

                try {
                    const notifyUrl = getNotifyUrl();
                    const res = await fetch(notifyUrl, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            fullName,
                            email,
                            country,
                            tierName,
                            price,
                            pageUrl: window.location.href,
                        }),
                    });

                    const rawText = await res.text();
                    const contentType = (res.headers.get('content-type') || '').toLowerCase();
                    const looksLikeHtml = /^\s*</.test(rawText);

                    let payload = null;
                    try {
                        payload = rawText ? JSON.parse(rawText) : {};
                    } catch {
                        payload = null;
                    }

                    const jsonLooksValid =
                        payload !== null && typeof payload === 'object' && typeof payload.ok === 'boolean';

                    if (!jsonLooksValid || payload.ok !== true) {
                        let message = payload?.error;

                        if (!message && !res.ok) {
                            message = `Request failed (HTTP ${res.status}). If testing locally, run “npm run dev” and use http://localhost:3000 — not a file:// link.`;
                        }

                        if (!message && res.ok && (looksLikeHtml || !contentType.includes('application/json'))) {
                            message =
                                'This page reached the server, but there is no email API here (common on static hosting like plain designflare.de). The form only works when you run the Node app: open a terminal in the project folder, run “npm run dev”, then submit again at http://localhost:3000/pack/… — or deploy server.js + .env to a Node host and set <meta name="designflare-api-base" content="https://YOUR-API/api"> in the page head.';
                        }

                        if (!message && res.status === 404) {
                            message =
                                'API not found (404). Use http://localhost:3000 with “npm run dev”, or deploy the Node server that provides /api/notify-admin.';
                        }

                        if (!message) {
                            message =
                                'We could not submit your request. Please try again in a moment.';
                        }

                        if (errorEl) {
                            errorEl.textContent = message;
                            errorEl.classList.remove('hidden');
                        }
                        return;
                    }

                    const mainThanks = `Thank you, ${escapeLeadHtml(fullName)}. Your Whop invoice with a secure payment link has been sent to ${escapeLeadHtml(email)}. Please check your inbox (and spam folder) to complete your order.`;
                    const inboxNote =
                        'As soon as you finish your order, we’ll send you your order details. If it’s not in your inbox in the next few minutes after completing the payment, make sure to check your Spam or Junk folders.';
                    if (successEl) {
                        successEl.innerHTML = `<p class="df-success-main">${mainThanks}</p><p class="df-success-note">${inboxNote}</p>`;
                        successEl.classList.remove('hidden');
                    }
                } catch (err) {
                    if (errorEl) {
                        const isFile =
                            typeof window !== 'undefined' &&
                            window.location?.protocol === 'file:';
                        errorEl.textContent = isFile
                            ? 'Open this page through the local server: http://localhost:3000/pack/… (not as a saved file). Then run: npm run dev'
                            : 'Network error. Ensure the server is running (npm run dev) and try again.';
                        errorEl.classList.remove('hidden');
                    }
                } finally {
                    if (submitBtn) submitBtn.disabled = false;
                    if (idle) idle.classList.remove('hidden');
                    if (loading) loading.classList.add('hidden');
                }
            });
        });
    }

    function wireContactForms() {
        const forms = document.querySelectorAll('form[data-df-contact-form="true"]');
        if (!forms.length) return;

        forms.forEach((form) => {
            form.addEventListener('submit', async (e) => {
                e.preventDefault();

                const fullName = (form.querySelector('input[name="fullName"]')?.value || '').trim();
                const email = (form.querySelector('input[name="email"]')?.value || '').trim();
                const topic = (form.querySelector('[name="topic"]')?.value || '').trim();
                const message = (form.querySelector('[name="message"]')?.value || '').trim();

                const errorEl = form.querySelector('[data-df-error="true"]');
                const successEl = form.querySelector('[data-df-success="true"]');
                const submitBtn = form.querySelector('button[type="submit"]');
                const idle = submitBtn ? submitBtn.querySelector('.df-submit-idle') : null;
                const loading = submitBtn ? submitBtn.querySelector('.df-submit-loading') : null;

                if (errorEl) {
                    errorEl.classList.add('hidden');
                    errorEl.textContent = '';
                }
                if (successEl) {
                    successEl.classList.add('hidden');
                    successEl.textContent = '';
                }

                if (!fullName || !email || !topic || !message) {
                    if (errorEl) {
                        errorEl.className = 'df-alert df-alert-error';
                        errorEl.textContent = 'Please complete all fields.';
                        errorEl.classList.remove('hidden');
                    }
                    return;
                }

                if (submitBtn) submitBtn.disabled = true;
                if (idle) idle.classList.add('hidden');
                if (loading) loading.classList.remove('hidden');

                try {
                    const notifyUrl = getNotifyUrl();
                    const res = await fetch(notifyUrl, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            fullName,
                            email,
                            country: '—',
                            tierName: topic,
                            message,
                            pageUrl: window.location.href,
                        }),
                    });

                    const rawText = await res.text();
                    let payload = null;
                    try {
                        payload = rawText ? JSON.parse(rawText) : {};
                    } catch {
                        payload = null;
                    }

                    if (!payload?.ok) {
                        const fallback =
                            payload?.error ||
                            (res.ok
                                ? 'We could not send your message. Please try again or email contact@designflare.de directly.'
                                : `Request failed (HTTP ${res.status}). Email us at contact@designflare.de if this persists.`);
                        if (errorEl) {
                            errorEl.className = 'df-alert df-alert-error';
                            errorEl.textContent = fallback;
                            errorEl.classList.remove('hidden');
                        }
                        return;
                    }

                    if (successEl) {
                        successEl.innerHTML = `<p class="df-success-main">Thank you, ${escapeLeadHtml(fullName)}. We received your message and will reply to <strong>${escapeLeadHtml(email)}</strong> within 24–48 hours.</p>`;
                        successEl.classList.remove('hidden');
                    }
                    form.reset();
                } catch {
                    if (errorEl) {
                        errorEl.className = 'df-alert df-alert-error';
                        errorEl.textContent =
                            'Network error. Please email contact@designflare.de directly and we will help you there.';
                        errorEl.classList.remove('hidden');
                    }
                } finally {
                    if (submitBtn) submitBtn.disabled = false;
                    if (idle) idle.classList.remove('hidden');
                    if (loading) loading.classList.add('hidden');
                }
            });
        });
    }

    wireInlineLeadForms();
    wireContactForms();
});
