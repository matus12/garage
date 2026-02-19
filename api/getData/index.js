module.exports = async function (context, req) {
  context.res = {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
    body: { temp: 0, proximity: 1, test: true }
  };
};
