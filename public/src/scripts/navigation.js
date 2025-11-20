export function initNavigation(onNavChange) {
    const navItems = document.querySelectorAll('.nav-item');

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            // Remove active class from all
            navItems.forEach(nav => nav.classList.remove('active'));

            // Add active class to clicked
            // Handle click on icon/span inside button
            const targetButton = e.target.closest('.nav-item');
            targetButton.classList.add('active');

            const targetSection = targetButton.dataset.target;
            onNavChange(targetSection);
        });
    });
}
