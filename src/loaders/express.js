const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');

module.exports = async (app) => {
  app.use(bodyParser.json());

  // 라우트 설정
  routes(app);

  return app;
};
