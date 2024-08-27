import axios from "axios";

const apiCodeBurger = axios.create({
	baseURL: "https://devburger-api-main-nzo1-6rz4oqtc7-diego-alan-hoffmanns-projects.vercel.app"
});
apiCodeBurger.interceptors.request.use(async config => {
	const userData = await localStorage.getItem("codeburger:userData")
	const token = userData && JSON.parse(userData).token
	config.headers.authorization = `Bearer ${token}`
	return config
});
export default apiCodeBurger;