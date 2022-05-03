import envGlobal from 'env';
const {
	BACKEND_API,
} = envGlobal();

export const getMainApi = () => {
	const API = BACKEND_API
	const c = (path = '') => API + path
	return {
	  users: c('/users')
	}
  }
  