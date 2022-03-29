import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()
const PORT = process.env.SERVER_PORT || 8080

// Middlewares
const allowedOrigins = ['http://localhost:3000']
const allowedMethods = ['GET', 'POST', 'PUT', 'DELETE']

const options: cors.CorsOptions = {
	origin: allowedOrigins,
	methods: allowedMethods
}

const app = express()
app.use(cors(options))

app.get('/', (req, res) => {
	console.log('GET request received!')
	res.send('API is Alive with TypeScript!')
})

app.listen(PORT, () => {
	console.log(`⚡️[server]: Server is running at http://localhost:${ PORT }`)
})

export default app
