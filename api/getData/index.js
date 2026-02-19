const http = require('http');

module.exports = async function (context) {
  try {
    const data = await new Promise((resolve, reject) => {
      http.get('http://84.47.36.56:7226/', (res) => {
        let body = '';
        res.on('data', (chunk) => body += chunk);
        res.on('end', () => resolve(JSON.parse(body)));
        res.on('error', reject);
      }).on('error', reject);
    });

    context.res = {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
      body: data
    };
  } catch {
    context.res = {
      status: 502,
      headers: { 'Content-Type': 'application/json' },
      body: { error: 'Unable to reach garage sensor' }
    };
  }
};
