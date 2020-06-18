<template>
    <div class="colunm">
       <div class="col-header">
         <van-icon name="arrow-left" color="rgb(238,10,26)" size="22" @click="back" />
         <span>栏目页</span>
         <van-icon name="user-circle-o" color="rgb(238,10,26)" size="22" class="user" @click="login"/>
      </div>
      <van-search v-model="searchData" placeholder="请输入搜索关键词" input-align="center" @search="onSearch" class="serchbox" />
       <van-collapse v-model="activeName" accordion >
         <van-collapse-item title="热点分析" name="1" icon="fire-o" >
              <van-loading type="spinner" color="#1989fa" v-show="isShow[0]" />
                <div class="list-box" v-for="(items,index) in defaultpra1" :key="index" @click="jump(items._id)">
                   <div class="leftimg">
                      <img :src="items.cover" alt="" srcset="">
                   </div>
                   <div class="rightbox">
                     <span>{{items.title}}</span>
                     <p>{{items.describe}}</p>
                     <a>{{items.publishDate}}/{{items.author.username}}</a>
                   </div>
                </div> 
             <van-button color="rgb(238,10,36)" plain size="small" style="margin-top:5px;width:100px" >换一批</van-button>                           
         </van-collapse-item>

         <van-collapse-item title="散文诗词"  name="2" icon="edit"  >
             <van-loading type="spinner" color="#1989fa" v-show="isShow[1]" />
                <div class="list-box" v-for="(items,index) in atc2" :key="index"  @click="jump(items._id)" >
                   <div class="leftimg">
                      <img :src="items.cover" alt="" srcset="">
                   </div>
                   <div class="rightbox">
                     <span>{{items.title}}</span>
                     <p>{{items.describe}}</p>
                     <a>{{items.publishDate}}/{{items.author.username}}</a>
                   </div>
                </div>  
             <van-button color="rgb(238,10,36)" plain size="small" style="margin-top:5px;width:100px" >换一批</van-button>             
         </van-collapse-item>

         <van-collapse-item title="学习心得" name="3" icon="notes-o">
             <van-loading type="spinner" color="#1989fa" v-show="isShow[2]" /> 
                <div class="list-box" v-for="(items,index) in atc3" :key="index"  @click="jump(items._id)">
                   <div class="leftimg">
                      <img :src="items.cover" alt="" srcset="">
                   </div>
                   <div class="rightbox">
                     <span>{{items.title}}</span>
                     <p>{{items.describe}}</p>
                     <a>{{items.publishDate}}/{{items.author.username}}</a>
                   </div>
                </div> 
             <van-button color="rgb(238,10,36)" plain size="small" style="margin-top:5px;width:100px" >换一批</van-button>             
         </van-collapse-item>

         <van-collapse-item title="经典文章" name="4" icon="good-job-o">
             <van-loading type="spinner" color="#1989fa" v-show="isShow[3]" />
                <div class="list-box" v-for="(items,index) in atc4" :key="index" @click="jump(items._id)">
                   <div class="leftimg">
                      <img :src="items.cover" alt="" srcset="">
                   </div>
                   <div class="rightbox">
                     <span>{{items.title}}</span>
                     <p>{{items.describe}}</p>
                     <a>{{items.publishDate}}/{{items.author.username}}</a>
                   </div>
                </div>  
             <van-button color="rgb(238,10,36)" plain size="small" style="margin-top:5px;width:100px" >换一批</van-button> 
         </van-collapse-item>

         <van-collapse-item title="历史故事" name="5" icon="send-gift-o">
             <van-loading type="spinner" color="#1989fa" v-show="isShow[4]" />
                <div class="list-box" v-for="(items,index) in atc5" :key="index"  @click="jump(items._id)">
                   <div class="leftimg">
                      <img :src="items.cover" alt="" srcset="">
                   </div>
                   <div class="rightbox">
                     <span>{{items.title}}</span>
                     <p>{{items.describe}}</p>
                     <a>{{items.publishDate}}/{{items.author.username}}</a>
                   </div>
                </div>
             <van-button color="rgb(238,10,36)" plain size="small" style="margin-top:5px;width:100px" >换一批</van-button>               
         </van-collapse-item>

         <van-collapse-item title="名言警句" name="6" icon="smile-o">
             <van-loading type="spinner" color="#1989fa" v-show="isShow[5]" /> 
                <div class="list-box" v-for="(items,index) in atc6" :key="index"  @click="jump(items._id)">
                   <div class="leftimg">
                      <img :src="items.cover" alt="" srcset="">
                   </div>
                   <div class="rightbox">
                     <span>{{items.title}}</span>
                     <p>{{items.describe}}</p>
                     <a>{{items.publishDate}}/{{items.author.username}}</a>
                   </div>
                </div>  
             <van-button color="rgb(238,10,36)" plain size="small" style="margin-top:5px;width:100px" >换一批</van-button>            
         </van-collapse-item>
       </van-collapse>    

       <div class="footer">
         <span class="logmsg">登录可以做更多哦！还没有账号？</span>
         <van-button plain hairline type="primary" color="rgb(238,10,36)" style="width:50vw;height:30px;" @click="login">立即注册</van-button>
         <span class="logmsg">已经注册过了？</span>
         <van-button plain hairline type="primary"  style="width:50vw;height:30px;" @click="login">马上登录</van-button>
          <div class="msg">
            <a href="http://www.beian.miit.gov.cn/">陕ICP备20006976号</a>
            <p>Copyright ©2020 wenhai Corporation, All Rights Reserved</p>
          </div>
       </div>


    </div>
</template>
<script>
import axios from 'axios'
import Vue from 'vue'
// vant组件引入



import { ShareSheet } from 'vant';
import { Collapse, CollapseItem } from 'vant';
import { Loading } from 'vant';


Vue.use(ShareSheet);

Vue.use(Collapse);
Vue.use(CollapseItem);
Vue.use(Loading);


export default {
    data:function(){
        return{          
            preUrl:'http://www.wenhais.cn/',
            isShow:[true,true,true,true,true,true],
            searchData:'',
            activeName: '1',
            defaultpra:[],
            atc2:[],
            atc3:[],
            atc4:[],
            atc5:[],
            atc6:[],            
        }
    },
    methods:{
       back(){
      this.$router.goBack()
       },
      jump:function(id){
            this.$router.push({
             path:`/detail/${id}`
           })
         },
      login:function(){
       this.$router.push({
        path:`/personal`
      },onComplete => { }, onAbort => { })     
    }, 
    onSearch:function(val){
       this.$router.push({
        path:`/search`, query:{keywords:val}
      })         
    }, 

    },
    computed:{
        defaultpra1:function(){
            let urldefout=this.preUrl
            //默认热点分析
            this.defaultpra.forEach(function(items,index){
                items.cover=urldefout+items.cover
                items.describe=items.describe.replace(/<[^>]+>/g,'')
                if(items.publishDate==null){
                    items.publishDate=''
                }
                items.publishDate=items.publishDate.split('T')[0]
            })
            this.isShow[0]=false
            return this.defaultpra
        },

    },
    //挂载后
    async mounted(){
        let defaultpra=await axios.get('http://www.wenhais.cn/home/special',{params:{class:'hot',page:1}})
        this.defaultpra=defaultpra.data.result
    },
    //更新后
    async updated(){
    let showIndex=this.activeName-0-1
    if(this.activeName==''||this.isShow[showIndex]==false){
        return
    }else{
        let keywords=''
        switch(this.activeName){
          case '1':
          keywords='hot'
          break;
          case '2':
          keywords='poem'
          break;
          case '3':
          keywords='study'
          break;
          case '4':
           keywords='famous'
          break;
          case '5':
          keywords='history'
          break;
          case '6':
          keywords='saying'
          break;
             }         
          let columnatc= await axios.get('http://www.wenhais.cn/home/special',{params:{class:keywords,page:1}})
          let urldefout=this.preUrl
          //发现在计算属性里面会触发无限循环，这里不会
           columnatc.data.result.forEach(function(items,index){
           items.cover=urldefout+items.cover
           items.describe=items.describe.replace(/<[^>]+>/g,'')
           if(items.publishDate==null){
               items.publishDate=''
           }
           items.publishDate=items.publishDate.split('T')[0]                
           })  
        //    开始给数据赋值       
          if(this.activeName==2){this.atc2=columnatc.data.result;
          this.isShow[1]=false}
          else if(this.activeName==3){this.atc3=columnatc.data.result;
          this.isShow[2]=false}
          else if(this.activeName==4){this.atc4=columnatc.data.result;
          this.isShow[3]=false}
          else if(this.activeName==5){this.atc5=columnatc.data.result;
          this.isShow[4]=false}
          else if(this.activeName==6){this.atc6=columnatc.data.result;
          this.isShow[5]=false}
       }

    }



}
</script>
<style lang="less" >
*{
padding: 0;
margin: 0;
box-sizing: border-box;
}
.colunm{
    width: 100vw;
    height: auto;
    min-height: 100vh;
    background-color: rgb(246, 247, 249);
    .col-header{
    background-color: rgb(255, 255, 255);
    padding: 0 20px;
    border-bottom:1px solid rgb(240, 240, 240);
    width: 100vw;
    height: 40px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    }
 .list-box{
    padding: 10px;
    display: flex;
    flex-direction: row;
    justify-content: left;
    border-bottom: 1px solid rgb(240, 240, 240);
    img{
    height: 100px;
    width: 80px;
    object-fit: cover;
    overflow: hidden;
    border-radius: 4px;
    }
    .rightbox{
      padding-left: 10px ;
       display: flex;
       flex-direction: column;
       justify-content: left;
       span{
         font-size: 16px;
         font-family: Microsoft jhengHei;
         font-weight: 600;
         color: #2e2e2e;
         width:200px;
         overflow: hidden;
         text-overflow: ellipsis;
         white-space: nowrap;
       }
       p{
         margin-top: 5px;
        display: flex;
        text-align: left;
        font-size: 13px;
        color: #8b8b8b;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2; 
        overflow: hidden;
       }
       a{
         margin-top: 5px;
         display: flex;
         text-align: left;
         font-size: 14px;
       }
    }
  }


  .footer{
      margin-top: 20px;
      padding-top: 30px;
      background-color: rgb(255, 255, 255);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .logmsg{
        margin-top: 10px;
        margin-bottom: 10px;
        display: block;
        font-size: 14px;
        color: #8b8b8b;
      }
      .msg{
        height: 60px;
        margin-top: 10px;
        a,p{
          font-size: 13px;
           color: #8b8b8b;
           }
      }

  }

}
</style>