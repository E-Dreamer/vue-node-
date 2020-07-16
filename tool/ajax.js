import axios from 'axios'
import qs from 'qs'
import {
  Loading
} from 'element-ui';
import {
  Message
} from 'element-ui';
import {
  MessageBox
} from 'element-ui';
const alert = MessageBox.alert
axios.defaults.headers = {
  "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
  "X-Requested-With": "XMLHttpRequest"
}

axios.defaults.timeout = 50000;

if (process.env.NODE_ENV == 'development') {
  axios.defaults.baseURL = '/api'
} else if (process.env.NODE_ENV == 'production') {
  axios.defaults.baseURL = 'http://127.0.0.1:5000'
}
let loadingInstance = {};
//请求拦截器
axios.interceptors.request.use(config => {
  let rust = !(config.data instanceof URLSearchParams) && config.data instanceof Object
	var isloading = true // 是否开启加载框
	if (config.method === 'post' && rust) {
		config.data.loading == false ? isloading = false : isloading = true
		if (!(config.headers["Content-Type"] == "application/json")) config.data = qs.stringify(config.data);

	}
  if (config.url == '/login') {
		loadingInstance = Loading.service({ //加载loading
			fullscreen: true,
			text: '加载中...',
			body: true,
			background: 'rgba(0, 0, 0, 0.8)',
		});
  }else {
		loadingInstance = {};
		//console.log('开启加载框',isloading)
		store.commit("setLoading", isloading);
	}
  if (config.url != "/login") {
		if (process.env.NODE_ENV == 'development') {
			config.url = config.url + '?sysHttpTokenId=' + sessionStorage.getItem("token");
		} else {
			config.headers.sysHttpTokenId = sessionStorage.getItem("token")
		}
	}
  return config;
})

//响应拦截器
axios.interceptors.response.use(response => {
  console.log(response);
  return response.data
})

export default axios
