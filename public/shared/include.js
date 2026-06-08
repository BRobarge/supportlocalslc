// /shared/include.js

(async () => {
    async function inject(name) {
        const slot = document.querySelector(`[data-include="${name}"]`);
        if (!slot) return;

        const res = await fetch(`/shared/${name}.html`, { cache: 'no-store' });
        slot.innerHTML = await res.text();

        if (name === 'header') {
            // Wire up dropdown/hamburger behaviour (defined in header-nav.js)
            if (typeof initializeHeader === 'function') initializeHeader();
            // Update auth buttons now that the header elements are in the DOM.
            // apply() is module-scoped in auth-nav.js; it exposes itself as
            // window.applyAuthNav so we can call it from this non-module script.
            if (typeof window.applyAuthNav === 'function') window.applyAuthNav();
        }
    }

    await inject('header');
    await inject('footer');
})();