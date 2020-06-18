<template>
    <div class="login">
            <div class="header">
                <div>
               <van-icon name="arrow-left" color="rgb(255,255,255)" size="25" @click="back" />  
               <span>普通用户登录注册</span>  
                </div>             
            </div>

         <!-- 登录盒子 -->
         <div class="login-box" v-show="isShowlogin">
            <img :src="picmsg" alt="" style="borderRadius:20px">

            <van-form @submit="onSubmit">
            <van-field
                v-model="username"
                name="email"
                label="账号"
                placeholder="账号"
                :rules="[{ required: true, message: '请填写用户名' }]"
            />
            <van-field
                v-model="password"
                type="password"
                name="password"
                label="密码"
                placeholder="密码"
                :rules="[{ required: true, message: '请填写密码' }]"
            />
            <div style="margin: 16px;">
                <van-button round block type="info" native-type="submit" color="rgba(238,10,26,.7)">
                登录
                </van-button>
            </div>
            <p @click="toreg">切换到注册页面</p>
            </van-form>

         </div>
        <!-- 注册盒子 -->
         <div class="login-box" v-show="isShowreg">
            <img :src="picmsg" alt=""  style="borderRadius:20px">

            <van-form @submit="onSubmit">
            <van-field
                v-model="username"
                name="email"
                label="账号"
                placeholder="输入账号"
                :rules="[{ required: true, message: '请填写用户名' }]"
            />
            <van-field
                v-model="password"
                type="password"
                name="password"
                label="密码"
                placeholder="密码"
                :rules="[{ required: true, message: '请填写密码' }]"
            />

            <van-field
                v-model="nickname"
                type="text"
                name="username"
                label="昵称"
                placeholder="输入汉字字母"
                :rules="[{ required: true, message: '请填写昵称' }]"
            />
            <div style="margin: 16px;">
                <van-button round block type="info" native-type="submit" color="rgba(179,222,74,.9)">
                注册
                </van-button>
            </div>
            <p @click="tologin">切换到登录页面</p>
            </van-form>

         </div>



    </div>

</template>


<script>
//这些axios的配置缺一不可
import Vue from 'vue'
import axios from 'axios';
import { Form } from 'vant';
import { Field } from 'vant';



Vue.use(Field);
Vue.use(Form);


axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
Vue.prototype.$axios = axios;
export default {
  data() {
    return {
      preUrl:'http://www.wenhais.cn/',
      username: '',
      password: '',
      nickname:'',
      gif:[require('../assets/icon/cat.gif'),require('../assets/icon/cry.jpg'),require('../assets/icon/reg.jpg')],
      picmsg:require('../assets/icon/cat.gif'),
      isShow1:true,
      isShow2:false,
      isShowlogin:true,
      isShowreg:false,
    };
  },
  methods: {
      async onSubmit(values) {
      //利用qs格式化数据
      values.head='/uploads/head/upload_4e0e9c947a034224d72d4de3cdf84703.jpg'
      let postData = this.$qs.stringify(values)
      if(values.username){
        // 注册请求
             this.$axios({method: 'post',url:this.preUrl+'home/register',data:postData})
             .then((res)=>{
                 if(res.data=='bingo'){
                     alert('恭喜你，注册成功，立即登录吧！')
                 }else{
                     this.picmsg=this.gif[1] 
                     alert(res.data+'请重新输入！')

                 }              
            })

      }else{
        //登录请求
             this.$axios({method: 'post',url:this.preUrl+'admins/login',data:postData})
             .then((res)=>{
                if(res.data=='fail'){this.picmsg=this.gif[1] 
                alert('账号或密码错误')}
                else if(res.data.cookies){
                  for(let attr in res.data.cookies){
                       var str=`${attr}=${res.data.cookies[attr]}`;
                       document.cookie=str
                   }
                       //登录成功，跳转到个人中心
                       this.$router.push({ path:`/personal`})
                }
            })

      }     
    },
    toreg(){
        this.isShowlogin=false
        this.isShowreg=true
        this.picmsg=this.gif[2]
    },
    tologin(){
        this.isShowreg=false
        this.isShowlogin=true
        this.picmsg=this.gif[0]
    },
    back(){
      this.$router.goBack()
    },
  },
  computed:{
        isShowboxC:function(){
            console.log('1')
            console.log(this.isShowbox)
            return this.isShowbox
        }
  },
}
</script>

<style lang="less" >
 *{
padding: 0;
margin: 0;
box-sizing: border-box;
 }
.login{
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
 .header{
     width: 100vw;
     height: 120px;
     background-color: rgba(255, 68, 0,.7);
     div{
         padding: 10px;
         display: flex;
         flex-direction: row;
         align-items: center;
         width: 100%;
         height: 60px;
        //  background-color: rgb(209, 55, 214);
         span{
             margin-left: 10px;
             color: rgb(255, 255, 255);
             font-size: 16px;

         }
     }
 }
 .login-box{
     padding-top: 10px;
     height: 70vh;
     width: 100vw;
     border-radius: 15px;
     background-color: rgb(255, 255, 255);
     position: relative;
     top: -20px;
     img{
         height: 100px;
     }
     p{
         font-size: 15px;
         color: #494949;
     }
 }


}
</style>