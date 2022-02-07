import express from 'express'

const app = express()
const PORT = 8000
app.get('/', (req, res) => res.send('API is Alive with TypeScript!'))
app.listen(PORT, () => {
	console.log(`⚡️[server]: Server is running at http://localhost:${ PORT }`)
})

export default app
