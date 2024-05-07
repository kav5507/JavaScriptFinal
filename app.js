const express = require('express')

const app = express();
const port = process.env.port || 3000;

// Middleware
app.use(express.static('public'));
app.use(express.json());

app.use(require('./routes/api-v1'))
app.use(require('./routes/static'))

app.listen(port, ()=> console.log(`Server is running at http://localhost:${port}`));