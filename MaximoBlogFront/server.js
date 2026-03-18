const express = require('express');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 8080;

// Serve static directory where the angular build is generated
const DIST_FOLDER = path.join(process.cwd(), 'dist/MaximoBlogFront/browser');
app.use(express.static(DIST_FOLDER));

// All other routes should redirect to index.html for Angular's HTML5 PathLocationStrategy
app.get('*', (req, res) => {
  res.sendFile(path.join(DIST_FOLDER, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Node Express server listening on http://localhost:${PORT}`);
});
