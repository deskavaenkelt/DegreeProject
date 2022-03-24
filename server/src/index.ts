import express from 'express'
import cors from 'cors'

// Middlewares
const allowedOrigins = ['http://localhost:3000']
const allowedMethods = ['GET', 'POST', 'PUT', 'DELETE']

const options: cors.CorsOptions = {
	origin: allowedOrigins,
	methods: allowedMethods
}

const app = express()
app.use(cors(options))
const PORT = 8000
app.get('/', (req, res) => res.send('API is Alive with TypeScript!'))
app.listen(PORT, () => {
	console.log(`⚡️[server]: Server is running at http://localhost:${ PORT }`)
})

export default app
