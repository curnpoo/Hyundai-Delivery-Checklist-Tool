/**
 * Feature Mapper
 * Assigns features to vehicles based on their Model, Trim, and Powertrain.
 * This acts as the logic layer since the CSV doesn't have granular feature flags.
 */

export function getFeaturesForTrim(modelData) {
    const { model, trim_name, powertrain_family } = modelData;

    // Base features for ALL vehicles
    let features = [
        'CruiseControl',
        'PhonePairing',
        'CarPlay',
        'LFA',
        'DriveModes',
        'AutoHold',
        'BlueLink'
    ];

    // EV Specifics
    if (powertrain_family === 'EV' || powertrain_family === 'Plug-in Hybrid') {
        features.push('ChargingBasics');
        features.push('RegenBraking');
        if (powertrain_family === 'EV') {
            features.push('IPedal');
            features.push('V2L'); // Most new Hyundai EVs have V2L, usually
        }
    }

    // Trim Level Logic (Heuristic based on typical Hyundai packaging)
    const lowerTrim = trim_name.toLowerCase();

    // Mid-tier and up (SEL, SEL Convenience, etc.)
    if (lowerTrim.includes('sel') || lowerTrim.includes('limited') || lowerTrim.includes('calligraphy') || lowerTrim.includes('xrt') || lowerTrim.includes('n line')) {
        features.push('HeatedSeats');
        features.push('PowerLiftgate');
        features.push('DigitalKey');
    }

    // High-tier (Limited, Calligraphy)
    if (lowerTrim.includes('limited') || lowerTrim.includes('calligraphy')) {
        features.push('SurroundView');
        features.push('BoseAudio');
        features.push('AmbientLighting');
        features.push('HDA'); // Usually HDA 2 on top trims
        features.push('HUD');
        features.push('RSPA');
        features.push('VisionRoof');
    }

    // Specific Model Overrides
    if (model.includes('Ioniq 5') && lowerTrim.includes('limited')) {
        features.push('VisionRoof');
    }

    if (model.includes('Palisade') && lowerTrim.includes('calligraphy')) {
        features.push('ErgoMotionSeat'); // If we had it in JSON
    }

    return features;
}
