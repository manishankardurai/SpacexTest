const { app } = require("./server");
const { env } = require("../config");
const { APP_PORT } = env;

module.exports = {
  serve: function() {
    app.listen(APP_PORT, err => {
      if (err) {
        console.error(err); // eslint-disable-line
      }
      console.info(`Listening on port ${process.env.PORT || APP_PORT} ✅`); // eslint-disable-line
    });
  }
};
