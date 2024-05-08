import app from './server.js';
import connection from './database.js';
app.listen(3000, () => {
  console.log(`servidor levantado en: http://localhost:${3000}`);
});
connection();
