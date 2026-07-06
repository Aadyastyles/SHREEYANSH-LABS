import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import bodyParser from 'body-parser'
import { initializeApp, getApps, cert } from 'firebase-admin/app'
import { getDatabase } from 'firebase-admin/database'

const serviceAccount = JSON.parse(fs.readFileSync('./serviceAccountKey.json', 'utf-8'));

if (!getApps().length) {
  initializeApp({
    credential: cert(serviceAccount),
    databaseURL: 'https://shreeyansh-labs-default-rtdb.asia-southeast1.firebasedatabase.app'
  });
}

function firebaseBackendPlugin() {
  return {
    name: 'firebase-backend',
    configureServer(server) {
      server.middlewares.use(bodyParser.json());

      // API Endpoint to Save Data to Firebase Realtime Database
      server.middlewares.use('/api/save-data', async (req, res) => {
        if (req.method === 'POST') {
          try {
            const { path, data } = req.body;
            const db = getDatabase();
            const ref = db.ref(path);
            await ref.set(data);
            res.statusCode = 200;
            res.end(JSON.stringify({ success: true, message: 'Data saved securely to Firebase.' }));
          } catch (error) {
            console.error('Firebase save error:', error);
            res.statusCode = 500;
            res.end(JSON.stringify({ success: false, error: error.message }));
          }
        }
      });

      // API Endpoint to Read Data from Firebase Realtime Database
      server.middlewares.use('/api/get-data', async (req, res) => {
        if (req.method === 'POST') {
          try {
            const { path } = req.body;
            const db = getDatabase();
            const ref = db.ref(path);
            const snapshot = await ref.once('value');
            res.statusCode = 200;
            res.end(JSON.stringify({ success: true, data: snapshot.val() }));
          } catch (error) {
            console.error('Firebase read error:', error);
            res.statusCode = 500;
            res.end(JSON.stringify({ success: false, error: error.message }));
          }
        }
      });
    }
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), firebaseBackendPlugin()],
})
