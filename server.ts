import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// API de orientación vocacional asistida
app.post('/api/orientacion', async (req, res) => {
  const { tema, grado } = req.body || {};
  const validTemas = ['matematicas', 'campo', 'diferencias', 'campus'];
  const validGrados = ['5', '6'];

  if (!validTemas.includes(tema) || !validGrados.includes(String(grado))) {
    return res.status(400).json({ ok: false, error: 'Parámetros inválidos' });
  }

  const scriptUrl = process.env.APPS_SCRIPT_URL;
  const scriptToken = process.env.APPS_SCRIPT_TOKEN;

  // Si no hay secretos configurados, devolver ok: false para activar el fallback editorial
  if (!scriptUrl || !scriptToken) {
    return res.json({ ok: false, fallback: true });
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 12000);

    const response = await fetch(scriptUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        tema,
        grado: String(grado),
        token: scriptToken,
      }),
      redirect: 'follow',
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!response.ok) {
      return res.json({ ok: false });
    }

    const data = await response.json();
    if (data && data.ok === true && typeof data.texto === 'string') {
      return res.json({ ok: true, texto: data.texto });
    } else {
      return res.json({ ok: false });
    }
  } catch (err) {
    console.error('Apps Script proxy error:', err);
    return res.json({ ok: false });
  }
});

async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Ciudad en Proyecto server active on http://0.0.0.0:${PORT}`);
  });
}

startServer();
