import http from '../Api'


const ApiService = {
	alive: () => {
		return http.get('/')
	}
}

export default ApiService
