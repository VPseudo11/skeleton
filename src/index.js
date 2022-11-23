const express = require('express')
const { port } = require('./config')
const db = require('./utils/database')
const useRouter = require('./users/users.router')
const authRouter = require('./auth/auth.router')
const initModels = require('./models/initModels')

const app = express()

app.use(express.json())

db.authenticate()
    .then(() => console.log('Database Autenticate'))
    .catch(err => console.log(err))

db.sync()
    .then(() => console.log('Database synced'))
    .catch(err => console.log(err))

app.get('/', (req, res) => {
    res.status(200).json({
        message: 'OK',
        users: `localhost:${port}/api/v1/users`
    })
})

initModels()

app.use('/api/v1/users', useRouter)
app.use('/api/v1/auth', authRouter)

app.listen(port, () => { console.log('Server started 😼😼😼', port) })