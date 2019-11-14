//入口文件
import Vue from 'vue'
import app from './App.vue'

//注册vuex到vue
import Vuex from 'vuex'
Vue.use(Vuex)

var car = JSON.parse(localStorage.getItem('car')||'[]')

var store = new Vuex.Store({
    state:{ //this.$store.state.***
        car:car
    },
    mutations:{//this.$store.commit('方法名',参数)
        addToCar(state,goodsinfo){
            var flag=false;
            state.car.some(item=>{
                if(item.id==goodsinfo.id){
                    item.count+=parseInt(goodsinfo.count);
                    flag=true
                    return true;
                }
            })
            if(!flag){
                state.car.push(goodsinfo)
            }

            localStorage.setItem('car',JSON.stringify(state.car))
        },
        updateGoodsInfo(state,goodsinfo){
            state.car.some(item=>{
                if(item.id==goodsinfo.id){
                    item.count=parseInt(goodsinfo.count)
                    return true

                }
            })
            localStorage.setItem('car',JSON.stringify(state.car))
        },
        removeFromCar(state,id){
            state.car.some((item,i)=>{
                if(item.id==id){
                    state.car.splice(this.i,1)
                    console.log(1);
                    return true;
                }
            })
            localStorage.setItem('car',JSON.stringify(state.car))
        },
        updateGoodsSelected(state,info){
            state.car.some(item=>{
                if(item.id==info.id){
                    item.selected=info.selected
                }
            })
            localStorage.setItem('car',JSON.stringify(state.car))
        }
    },
    getters:{
        getAllCount(state){
            var c=0;
            state.car.forEach(item=>{
                c+=item.count
            })
            return c
        },
        getGoodsCount(state){
            var o={}
            state.car.forEach(item=>{
                o[item.id]=item.count;
            })
            return o
        },
        getGoodsSelected(state){
            var o ={}
            state.car.forEach(item=>{
                o[item.id]=item.selected
            })
            return o
        },
        getGoodsCountAndmount(state){
            var o ={
                count:0, //勾选的数量
                amount:0 //勾选的总件
            };
            state.car.forEach(item=>{
                if(item.selected){
                    o.count+=item.count;
                    o.amount+=item.price*item.count;
                }
            })
            return o
        }
    }

})


//mint-ui组件
import MintUI from 'mint-ui'
Vue.use(MintUI)
import 'mint-ui/lib/style.css'

//导入 MUI 样式
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'

//导入路由包 并安装
import VueRouter from 'vue-router'
Vue.use(VueRouter)

//导入router.js路由模块
import router from './router.js'

//导入vue-resource
import VueResource from 'vue-resource'
Vue.use(VueResource)

//配置全局api接口
Vue.http.options.root='http://www.liulongbin.top:3005/'
Vue.http.options.emulateJSON=true;

//定义全局过滤器
import moment from 'moment'
Vue.filter('dataFormat',function(datastr,pattern="YYYY-MM-DD HH:mm:ss"){
    return moment(datastr).format(pattern)
})

//导入vue-preview
import VuePreview from 'vue-preview'
Vue.use(VuePreview)


var vm= new Vue({
    el:'#app',
    render:c=>c(app),
    router,
    store //挂载store对象
})