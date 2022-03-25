import { useEffect, useState } from 'react'
import ApiService from '../utils/api/service/ApiService'

const ApiAlive = () => {
	const [text, setText] = useState('')
	
	function alive() {
		ApiService.alive()
			.then(function (response) {
				console.log(response.data)
				setText(response.data)
			})
			.catch(function (error) {
				console.log(error)
			})
	}
	
	useEffect(() => {
		alive()
	}, [])
	
	return (
		<>
			<h1>Verify Api Alive</h1>
			<h2 style={ {color: 'green'}}>{ text }</h2>
		</>
	)
}

export default ApiAlive
