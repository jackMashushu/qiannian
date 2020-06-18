import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Colunm from '../views/colunm.vue'
import Detail from '../views/Detail.vue'
import Login from '../views/Login.vue'
import Personal from '../views/personal.vue'
import Search from '../views/Search.vue'
import Other from '../views/Other.vue'

Vue.use(VueRouter)

VueRouter.prototype.goBack = function () { 
  　　this.isBack = true
  　　window.history.go(-1)
  }


let getCookie=function(key){
            var value=''
            var co=document.cookie
            const tmpArr=co.split('; ')
            tmpArr.forEach(item=>{
            var tmp=item.split('=')
            if(tmp[0]===key){
                value=tmp[1]
            }
            })
            return value
        }

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path:'/colunm',
    name:'Colunm',
    component:Colunm
  },
  {
    path:'/detail/:id',
    name:'detail',
    component:Detail
  },
  {
    path:'/login',
    name:'login',
    component:Login
  },
  {
    path:'/search/',
    name:'search',
    component:Search
  },
  {
    path:'/personal',
    name:'Personal',
    component:Personal,
    beforeEnter: (to, from, next) => {
      if(getCookie('_id')==''){
        next({path:'/login'})
      }else{
        next()
      }

    }

  },
  {
    path:'/other',
    name:'Other',
    component:Other 
  }

]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})
router.afterEach((to,from,next)=>{window.scrollTo(0,0)})

export default router
