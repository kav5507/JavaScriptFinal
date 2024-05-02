const express = require('express')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(express.static('public'))
app.use('/api/events', require('./routes/api-v1'))
app.use(require('./routes/static'))

app.listen(port, () => console.log(`Server running: http://localhost:${port}`))