export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { query } = req.query;
    if (!query) {
        return res.status(400).json({ error: 'query parameter is required' });
    }

    const apiKey = process.env.GOOGLE_PLACES_API_KEY;
    if (!apiKey) {
        return res.status(500).json({ error: 'Google Places API key not configured' });
    }

    try {
        const textSearchUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(query)}&key=${apiKey}`;
        const textRes = await fetch(textSearchUrl);
        const textData = await textRes.json();

        if (textData.status !== 'OK' && textData.status !== 'ZERO_RESULTS') {
            return res.status(502).json({ error: textData.status, message: textData.error_message });
        }

        const results = textData.results || [];

        // Enrich each result with phone + website (not returned by Text Search)
        const enriched = await Promise.all(results.map(async (place) => {
            try {
                const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place.place_id}&fields=formatted_phone_number,website,address_components&key=${apiKey}`;
                const detailsRes = await fetch(detailsUrl);
                const detailsData = await detailsRes.json();
                const components = detailsData.result?.address_components || [];
                const get = (type) => components.find(c => c.types.includes(type));
                const streetNumber = get('street_number')?.long_name || '';
                const route = get('route')?.long_name || '';
                const streetAddress = [streetNumber, route].filter(Boolean).join(' ') || null;
                return {
                    ...place,
                    formatted_phone_number: detailsData.result?.formatted_phone_number || null,
                    website: detailsData.result?.website || null,
                    street_address: streetAddress,
                    city: get('locality')?.long_name || null,
                    state_abbr: get('administrative_area_level_1')?.short_name || null,
                    zip_code: get('postal_code')?.long_name || null,
                };
            } catch {
                return { ...place, formatted_phone_number: null, website: null };
            }
        }));

        return res.status(200).json({ results: enriched, status: textData.status });
    } catch (err) {
        console.error('Places search error:', err);
        return res.status(500).json({ error: err.message });
    }
}
