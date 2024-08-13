const chatRoutes = require('../routes/chatRoutes');

module.exports = (app) => {
  app.use('/api/chat', chatRoutes);
  // 다른 라우트 설정도 이곳에 추가할 수 있습니다.
};
