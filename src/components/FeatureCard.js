export class FeatureCard {
    constructor(featureData) {
        this.data = featureData;
    }

    render() {
        const card = document.createElement('div');
        card.className = 'feature-card glass-panel';

        const icons = {
            essentials: '🛡️',
            setup: '⚙️',
            adjustments: '🔧',
            fun: '✨'
        };
        const icon = icons[this.data.category] || '🚙';

        const header = document.createElement('div');
        header.className = 'feature-header';
        header.innerHTML = `<h3><span class="icon">${icon}</span> ${this.data.title}</h3>`;

        const overview = document.createElement('p');
        overview.className = 'feature-overview';
        overview.textContent = this.data.overview;

        card.appendChild(header);
        card.appendChild(overview);

        if (this.data.steps && this.data.steps.length > 0) {
            const stepsList = document.createElement('ol');
            stepsList.className = 'feature-steps';
            this.data.steps.forEach(step => {
                const li = document.createElement('li');
                li.textContent = step;
                stepsList.appendChild(li);
            });

            // Initially hide steps to keep UI clean? Or show by default?
            // Prompt says "optional step-by-step". Let's show them for now.
            card.appendChild(stepsList);
        }

        return card;
    }
}
