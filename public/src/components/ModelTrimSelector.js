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
        modelSelect.innerHTML = '<option value="">Select Vehicle</option>';

        // Create unique vehicle identifiers (Year + Model + Powertrain)
        // We use a Map to ensure uniqueness and store the display string
        const uniqueVehicles = new Map();

        this.modelsData.forEach(m => {
            const key = `${m.model_year}|${m.model}|${m.powertrain_family}`;
            const display = `${m.model_year} ${m.model} ${m.powertrain_family !== 'Gas' ? `(${m.powertrain_family})` : ''}`;
            uniqueVehicles.set(key, display);
        });

        // Sort vehicles for better UX (Newest first, then alphabetical)
        const sortedVehicles = Array.from(uniqueVehicles.entries()).sort((a, b) => {
            // Sort by display name
            return a[1].localeCompare(b[1]);
        });

        sortedVehicles.forEach(([key, display]) => {
            const option = document.createElement('option');
            option.value = key;
            option.textContent = display;
            modelSelect.appendChild(option);
        });

        // Trim Dropdown (initially disabled)
        const trimSelect = document.createElement('select');
        trimSelect.className = 'glass-input';
        trimSelect.innerHTML = '<option value="">Select Trim</option>';
        trimSelect.disabled = true;

        // Event Listeners
        modelSelect.addEventListener('change', (e) => {
            this.selectedModelKey = e.target.value;
            this.selectedTrim = null;
            this.updateTrimOptions(trimSelect);
            this.onSelectionChange(null); // Reset selection until trim picked
        });

        trimSelect.addEventListener('change', (e) => {
            const trimName = e.target.value;
            if (!this.selectedModelKey) return;

            const [year, model, powertrain] = this.selectedModelKey.split('|');

            // Find the full data object for this specific trim
            const fullTrimData = this.modelsData.find(m =>
                m.model_year === year &&
                m.model === model &&
                m.powertrain_family === powertrain &&
                m.trim_name === trimName
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

        if (!this.selectedModelKey) {
            trimSelect.disabled = true;
            return;
        }

        const [year, model, powertrain] = this.selectedModelKey.split('|');

        const trims = this.modelsData
            .filter(m =>
                m.model_year === year &&
                m.model === model &&
                m.powertrain_family === powertrain
            )
            .map(m => m.trim_name);

        // Remove duplicates just in case
        [...new Set(trims)].forEach(trim => {
            const option = document.createElement('option');
            option.value = trim;
            option.textContent = trim;
            trimSelect.appendChild(option);
        });

        trimSelect.disabled = false;
    }
}
