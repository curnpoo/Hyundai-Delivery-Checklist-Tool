/**
 * Data Loader Module
 * Handles fetching and parsing of CSV and JSON data.
 */

export async function loadData() {
    console.time('loadData');
    try {
        // Use relative paths from index.html (which is in /public)
        // Data is now in /public/data, so path is 'data/...'
        const [modelsResponse, featuresResponse] = await Promise.all([
            fetch('data/models_trims_2025_2026.csv'),
            fetch('data/features.json')
        ]);

        if (!modelsResponse.ok) throw new Error(`Failed to load models: ${modelsResponse.status}`);
        if (!featuresResponse.ok) throw new Error(`Failed to load features: ${featuresResponse.status}`);

        const modelsText = await modelsResponse.text();
        const featuresData = await featuresResponse.json();

        console.time('parseCSV');
        const modelsData = parseCSV(modelsText);
        console.timeEnd('parseCSV');

        console.timeEnd('loadData');
        return {
            models: modelsData,
            features: featuresData
        };
    } catch (error) {
        console.error('Error loading data:', error);
        console.timeEnd('loadData');
        return { models: [], features: {} };
    }
}

function parseCSV(csvText) {
    // Handle various line endings
    const lines = csvText.trim().split(/\r\n|\n|\r/);
    if (lines.length === 0) return [];

    const headers = lines[0].split(',').map(h => h.trim());

    const result = [];

    for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;

        const row = parseCSVLine(line);
        // Allow for some flexibility in trailing commas or slight mismatches if needed
        if (row.length >= headers.length) {
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
