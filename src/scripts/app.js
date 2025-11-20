import { loadData } from './dataLoader.js';
import { ModelTrimSelector } from '../components/ModelTrimSelector.js';
import { FeatureCard } from '../components/FeatureCard.js';
import { SectionHeader } from '../components/SectionHeader.js';
import { initNavigation } from './navigation.js';
import { getFeaturesForTrim } from './featureMapper.js';

class App {
    constructor() {
        this.modelsData = [];
        this.featuresData = {};
        this.currentTrimData = null;
        this.currentSection = 'essentials'; // Default section

        this.mainContent = document.getElementById('main-content');
        this.selectorContainer = document.getElementById('model-selector-container');
    }

    async init() {
        const data = await loadData();
        this.modelsData = data.models;
        this.featuresData = data.features;

        this.initSelector();
        initNavigation((section) => this.handleNavChange(section));
    }

    initSelector() {
        this.selectorContainer.innerHTML = '';
        const selector = new ModelTrimSelector(this.modelsData, (trimData) => {
            this.currentTrimData = trimData;
            this.renderContent();
        });
        this.selectorContainer.appendChild(selector.render());
    }

    handleNavChange(section) {
        this.currentSection = section;
        this.renderContent();
    }

    renderContent() {
        this.mainContent.innerHTML = '';

        if (!this.currentTrimData) {
            this.renderWelcome();
            return;
        }

        // Render Delivery Focus Notes if available
        if (this.currentTrimData.delivery_focus_notes) {
            const noteCard = document.createElement('div');
            noteCard.className = 'glass-panel note-card';
            noteCard.innerHTML = `<strong>Delivery Focus:</strong> ${this.currentTrimData.delivery_focus_notes}`;
            this.mainContent.appendChild(noteCard);
        }

        // Get features for this trim using the mapper
        const trimFeatures = getFeaturesForTrim(this.currentTrimData);

        // Filter by current section (category)
        // Categories mapping:
        // essentials -> essentials
        // setup -> setup
        // fun -> fun, adjustments (combining for simplicity or separating?)
        // Prompt asked for: Essentials, Setup, Quick Adjustments, Fun
        // My nav has: Essentials, Setup, Fun. I'll map 'adjustments' to 'fun' or 'setup' or add a tab.
        // Let's map 'adjustments' to 'setup' for now, or 'fun'. 
        // Actually, let's stick to the prompt's 3 nav items: Essentials | Setup | Settings/Fun

        const featuresToRender = trimFeatures.filter(featureId => {
            const feature = this.featuresData[featureId];
            if (!feature) return false;

            if (this.currentSection === 'essentials') {
                return feature.category === 'essentials';
            } else if (this.currentSection === 'setup') {
                return feature.category === 'setup' || feature.category === 'adjustments';
            } else if (this.currentSection === 'fun') {
                return feature.category === 'fun';
            }
            return false;
        });

        if (featuresToRender.length === 0) {
            this.mainContent.innerHTML += `<p class="empty-state">No features found for this section.</p>`;
            return;
        }

        featuresToRender.forEach(featureId => {
            const feature = this.featuresData[featureId];
            const card = new FeatureCard(feature);
            this.mainContent.appendChild(card.render());
        });
    }

    renderWelcome() {
        this.mainContent.innerHTML = `
            <div class="welcome-state">
                <h2>Welcome to your new Hyundai</h2>
                <p>Select your vehicle model and trim above to get started.</p>
            </div>
        `;
    }
}

const app = new App();
app.init();
