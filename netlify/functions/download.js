const axios = require('axios');

exports.handler = async (event, context) => {
    // POST Request එකක් නෙවෙයි නම් Error එකක් දෙන්න
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Method Not Allowed" };
    }

    try {
        const body = JSON.parse(event.body);
        const videoUrl = body.url;

        // Cobalt API එකට සර්වර් එකේ ඉඳන් කතා කරනවා (එතකොට Block වෙන්නේ නෑ)
        const response = await axios.post('https://api.cobalt.tools/api/json', {
            url: videoUrl,
            downloadMode: "audio",
            audioFormat: "mp3"
        }, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*", // CORS ප්‍රශ්නය මෙතනින් විසඳෙනවා
                "Content-Type": "application/json"
            },
            body: JSON.stringify(response.data)
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message })
        };
    }
};
