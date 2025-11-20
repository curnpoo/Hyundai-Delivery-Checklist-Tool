/**
 * Data Loader Module
 * Handles fetching and parsing of CSV and JSON data.
 */

export async function loadData() {
    try {
        const [modelsResponse, featuresResponse] = await Promise.all([
            fetch('../src/data/models_trims_2025_2026.csv'),
            fetch('../src/data/features.json')
        ]);

        const modelsText = await modelsResponse.text();
        const featuresData = await featuresResponse.json();

        const modelsData = parseCSV(modelsText);

        return {
            models: modelsData,
            features: featuresData
        };
    } catch (error) {
        console.error('Error loading data:', error);
        return { models: [], features: {} };
    }
}

function parseCSV(csvText) {
    const lines = csvText.trim().split('\n');
    const headers = lines[0].split(',').map(h => h.trim());

    const result = [];

    for (let i = 1; i < lines.length; i++) {
        // Handle quoted strings (e.g., "Focus on...")
        const row = parseCSVLine(lines[i]);
        if (row.length === headers.length) {
            const obj = {};
            headers.forEach((header, index) => {
                obj[header] = row[index];
            });
            result.push(obj);
        }
    }

    return result;
}

// Helper to handle CSV lines with quoted values containing commas
function parseCSVLine(text) {
    const result = [];
    let current = '';
    let inQuotes = false;

    for (let i = 0; i < text.length; i++) {
        const char = text[i];

        if (char === '"') {
            inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
            result.push(current.trim());
            current = '';
        } else {
            current += char;
        }
    }
    result.push(current.trim());

    return result;
}
