//메인 서버 파일

const express = require("express");
const http = require("http");
const loaders = require("./src/loaders");
const axios = require("axios");
const socketLoader = require("./src/loaders/socket");

async function startServer() {
  const app = express();
  const server = http.createServer(app);

  await loaders(app); //익스프레스 로더 호출
  socketLoader(server);

  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}
const GOOGLE_CLIENT_ID = ""; // YOUR GOOGLE_CLIENT_ID
const GOOGLE_CLIENT_SECRET = ""; // YOUR GOOGLE_CLIENT_SECRET;
const GOOGLE_LOGIN_REDIRECT_URI = "http://localhost:3000/login/redirect";
const GOOGLE_SIGNUP_REDIRECT_URI = "http://localhost:3000/signup/redirect";
const GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token";
const GOOGLE_USERINFO_URL = "https://www.googleapis.com/oauth2/v2/userinfo";
app.get("/", (req, res) => {
  res.send(`
        <h1>OAuth</h1>
        <a href="/login">Log in</a>
        <a href="/signup">Sign up</a>
    `);
});
//https://velog.io/@mainfn/Node.js-express%EB%A1%9C-%EA%B5%AC%EA%B8%80-OAuth-%ED%9A%8C%EC%9B%90%EA%B0%80%EC%9E%85%EB%A1%9C%EA%B7%B8%EC%9D%B8-%EA%B5%AC%ED%98%84
app.get("/login", (req, res) => {
  let url = "https://accounts.google.com/o/oauth2/v2/auth";
  url += `?client_id=${GOOGLE_CLIENT_ID}`;
  url += `&redirect_uri=${GOOGLE_LOGIN_REDIRECT_URI}`;
  url += "&response_type=code";
  url += "&scope=email profile";
  res.redirect(url);
});

app.get("/signup", (req, res) => {
  let url = "https://accounts.google.com/o/oauth2/v2/auth";
  url += `?client_id=${GOOGLE_CLIENT_ID}`;
  url += `&redirect_uri=${GOOGLE_SIGNUP_REDIRECT_URI}`;
  url += "&response_type=code";
  url += "&scope=email profile";
  res.redirect(url);
});

app.get("/login/redirect", (req, res) => {
  const { code } = req.query;
  console.log(`code: ${code}`);
  res.send("ok");
});

app.get("/signup/redirect", async (req, res) => {
  const { code } = req.query;
  console.log(`code: ${code}`);

  const resp = await axios.post(GOOGLE_TOKEN_URL, {
    code,
    client_id: GOOGLE_CLIENT_ID,
    client_secret: GOOGLE_CLIENT_SECRET,
    redirect_uri: GOOGLE_SIGNUP_REDIRECT_URI,
    grant_type: "authorization_code",
  });

  const resp2 = await axios.get(GOOGLE_USERINFO_URL, {
    headers: {
      Authorization: `Bearer ${resp.data.access_token}`,
    },
  });
  res.json(resp2.data);
});

app.listen(3000, () => {
  console.log("server is running at 3000");
});
