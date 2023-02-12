const { OAuth2Client } = require("google-auth-library");

const CLIENT_ID =
  "781231248766-andg7qqn3te66vti3mc0c31e85pfm3d1.apps.googleusercontent.com";

const client = new OAuth2Client(CLIENT_ID);

async function verify(token) {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: CLIENT_ID,
  });
  const payload = ticket.getPayload();
  const userid = payload["sub"];
  return payload;
}

module.exports = {
  verify,
};
