import axios from 'axios';
import { Loading, Message } from 'element-ui';



//定义loading变量
let loading 

function startLoading() {    //使用Element loading-start 方法
    loading = Loading.service({
        lock: true,
        text: '加载中...',
        background: 'rgba(0, 0, 0, 0.7)'
    })
}


function endLoading() {    //使用Element loading-close 方法
    loading.close()
}


//@请求拦截
axios.interceptors.request.use(config => {
    //加载
    startLoading()
    console.log("得到请求")
    if(localStorage.eleToken)
        config.headers.Authorization = localStorage.eleToken
    return config
},error =>{
    return Promise.reject(error)
})


//@响应拦截
axios.interceptors.response.use(response =>{
    endLoading();
    return response;
},error =>{
    endLoading();
    Message.error(error.response.data);
    
    return Promise.reject(error);
})

export default axios