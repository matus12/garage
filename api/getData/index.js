var http = require('http');

module.exports = async function (context, req) {
  try {
    var data = await fetchData();
    context.res = {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
      body: data
    };
  } catch (err) {
    context.log('Proxy error:', err.message || err);
    context.res = {
      status: 502,
      headers: { 'Content-Type': 'application/json' },
      body: { error: err.message || 'Unable to reach garage sensor' }
    };
  }
};

function fetchData() {
  return new Promise(function (resolve, reject) {
    var req = http.get('http://84.47.36.56/', function (res) {
      var body = '';
      res.on('data', function (chunk) { body += chunk; });
      res.on('end', function () {
        try {
          resolve(JSON.parse(body));
        } catch (e) {
          reject(new Error('Invalid JSON: ' + body));
        }
      });
    });

    req.on('error', function (e) { reject(e); });
    req.on('timeout', function () {
      req.destroy();
      reject(new Error('Request timed out'));
    });
    req.end();
  });
}
