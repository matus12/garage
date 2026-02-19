module.exports = async function (context) {
  try {
    const response = await fetch('http://84.47.36.56:7226/');
    const data = await response.json();
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
