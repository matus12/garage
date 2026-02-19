const http = require('http');

module.exports = async function (context, req) {
  try {
    const data = await new Promise(function (resolve, reject) {
      var options = {
        hostname: '84.47.36.56',
        port: 7226,
        path: '/',
        method: 'GET',
        timeout: 5000
      };

      var request = http.request(options, function (res) {
        var body = '';
        res.on('data', function (chunk) { body += chunk; });
        res.on('end', function () {
          try {
            resolve(JSON.parse(body));
          } catch (e) {
            reject(e);
          }
        });
      });

      request.on('error', function (e) { reject(e); });
      request.on('timeout', function () { request.destroy(); reject(new Error('timeout')); });
      request.end();
    });

    context.res = {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
      body: data
    };
  } catch (err) {
    context.log('API proxy error:', err);
    context.res = {
      status: 502,
      headers: { 'Content-Type': 'application/json' },
      body: { error: 'Unable to reach garage sensor' }
    };
  }
};
