require('dotenv').config();
const app = require('./app.js');
const setupDB = require('./setupDB.js');

const port = process.env.PORT || 3000;
async function startServer() {
  try {
    await setupDB();
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });

  } catch (err) {
    console.error("Server failed to start:", err);
  }
}

startServer();


