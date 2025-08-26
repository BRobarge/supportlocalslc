// /shared/include.js

(async () => {
    async function inject(name) {
        const slot = document.querySelector(`[data-include="${name}"]`);
        if (!slot) return;

        const res = await fetch(`/shared/${name}.html`, { cache: 'no-store' });
        slot.innerHTML = await res.text();

        // --- THIS IS THE FIX ---
        // If we just loaded the header, call its initialization script.
        if (name === 'header' && typeof initializeHeader === 'function') {
            initializeHeader();
        }
    }

    await inject('header');
    await inject('footer');
})();