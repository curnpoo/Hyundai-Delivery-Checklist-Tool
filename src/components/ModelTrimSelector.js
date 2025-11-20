export class ModelTrimSelector {
    constructor(modelsData, onSelectionChange) {
        this.modelsData = modelsData;
        this.onSelectionChange = onSelectionChange;
        this.selectedModel = null;
        this.selectedTrim = null;
    }

    render() {
        const container = document.createElement('div');
        container.className = 'selector-container';

        // Model Dropdown
        const modelSelect = document.createElement('select');
        modelSelect.className = 'glass-input';
        modelSelect.innerHTML = '<option value="">Select Model</option>';

        // Get unique models
        const uniqueModels = [...new Set(this.modelsData.map(m => m.model))];
        uniqueModels.forEach(model => {
            const option = document.createElement('option');
            option.value = model;
            option.textContent = model;
            modelSelect.appendChild(option);
        });

        // Trim Dropdown (initially disabled)
        const trimSelect = document.createElement('select');
        trimSelect.className = 'glass-input';
        trimSelect.innerHTML = '<option value="">Select Trim</option>';
        trimSelect.disabled = true;

        // Event Listeners
        modelSelect.addEventListener('change', (e) => {
            this.selectedModel = e.target.value;
            this.selectedTrim = null;
            this.updateTrimOptions(trimSelect);
            this.onSelectionChange(null); // Reset selection until trim picked
        });

        trimSelect.addEventListener('change', (e) => {
            const trimName = e.target.value;
            // Find the full data object for this specific trim
            const fullTrimData = this.modelsData.find(m =>
                m.model === this.selectedModel && m.trim_name === trimName
            );
            this.selectedTrim = fullTrimData;
            this.onSelectionChange(fullTrimData);
        });

        container.appendChild(modelSelect);
        container.appendChild(trimSelect);
        return container;
    }

    updateTrimOptions(trimSelect) {
        trimSelect.innerHTML = '<option value="">Select Trim</option>';

        if (!this.selectedModel) {
            trimSelect.disabled = true;
            return;
        }

        const trims = this.modelsData
            .filter(m => m.model === this.selectedModel)
            .map(m => m.trim_name);

        trims.forEach(trim => {
            const option = document.createElement('option');
            option.value = trim;
            option.textContent = trim;
            trimSelect.appendChild(option);
        });

        trimSelect.disabled = false;
    }
}
