<template>
  <div class="home" id="home">
    <div class="header">
      <img :src="log" class="logo">
      <van-icon name="user-circle-o" color="rgb(238,10,26)" size="22" class="user" @click="login"/>
    </div>
  
  
   <van-swipe :autoplay="3000" >
      <van-swipe-item v-for="(image, index) in images" :key="index">
      <img v-lazy="image" class="swiperimg" />
      </van-swipe-item>
   </van-swipe>
<van-search v-model="searchData" placeholder="请输入搜索关键词" @search="onSearch" input-align="center" class="serchbox" />
   <!-- 五个图标 -->
  <van-grid :column-num="5" icon-size='32px'>
      <van-grid-item :icon="items.imsurl" 
       v-for="(items,index) in fiveicon" :key="index" :text="items.name" @click="icongo(index)" />
  </van-grid>

  <!-- 推荐模块 -->
<div class="command">
<div class="command-title">
  <span>原创文章</span> 
  <p id="ppp" style="height:25px; width: 90px;">最新原创推荐</p>
</div>
<div class="slide-box">
  <div class="slide-item" v-for="(items,index) in original" :key="index" @click="go(items._id)">
    <img :src="items.cover" alt="">
    <span>{{items.title}}</span>
  </div>
</div>
</div>

<!-- tab卡片 -->
<van-tabs type="card" class="tabCard">
  <van-tab title="获赞榜">
   <div class="slide-box">
      <div class="slide-item" v-for="(items,index) in modelatc" :key="index" @click="go(items._id)" >
        <img :src="items.cover" alt="">
        <span>{{items.title}}</span>
      </div>
   </div>
  </van-tab>

  <van-tab title="吐槽榜">
   <div class="slide-box">
      <div class="slide-item" v-for="(items,index) in hateatc" :key="index" @click="go(items._id)" >
        <img :src="items.cover" alt="">
        <span>{{items.title}}</span>
      </div>
   </div>
  </van-tab>

</van-tabs>

  
<!-- 文章列表 -->
<div class="command">
<div class="command-title">
  <span>最新发布</span> 
  <p id="ppp" style="height:25px; width: 90px;">今日文章推荐</p>
</div>
<div class="list-box" v-for="(items,index) in listatcC" :key="index" @click="go(items._id)" >
   <div class="leftimg">
      <img :src="items.cover" alt="" srcset="">
   </div>
   <div class="rightbox">
     <span>{{items.title}}</span>
     <p>{{items.describe}}</p>
     <a>{{items.publishDate}}/{{items.author.username}}</a>
   </div>
</div>
<van-button color="rgb(238,10,36)" plain size="small" style="margin-top:5px;width:100px" @click="concat">显示更多</van-button>
</div>

<!-- 网站编辑 -->
<div class="command" id="anchor">
<div class="command-title">
  <span>网站编辑</span> 
  <p id="ppp" style="height:25px; width: 90px;">主要用户列表</p>
</div>
<div class="rank-box">
  <div class="rank-item" v-for="(items,index) in editorList" :key="index" @click="editorjum(items._id)">
    <img :src="items.head" alt="">
    <span>{{items.username}}</span>
    <p>{{items.count}}篇</p>
  </div>
</div>
</div>
<van-share-sheet v-model="showShare" :options="options" class="share-box" />
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
import { Lazyload, ContactList,Swipe, SwipeItem,Icon,Button,Grid,GridItem,Tab,Tabs,Search,ShareSheet } from 'vant'

Vue.use(Swipe);Vue.use(SwipeItem);Vue.use(Icon);Vue.use(Button);Vue.use(Grid);
Vue.use(GridItem);Vue.use(Tab);Vue.use(Tabs);Vue.use(Search);Vue.use(ShareSheet);
Vue.use(Lazyload);
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import Axios from 'axios'

export default {
  name: 'Home',
  data:function(){
     return {
       page:1,
      preUrl:'http://www.wenhais.cn/',
       log:require('../assets/icon/main-logo.gif'),
       searchData:'',
       images:[],
       showShare: false,
       fiveicon:[
         {name:'栏目',imsurl:require('../assets/icon/clum.png')},
         {name:'精选',imsurl:require('../assets/icon/hot.png')},
         {name:'发文',imsurl:require('../assets/icon/author.png')},
         {name:'分享',imsurl:require('../assets/icon/share.png')},
         {name:'鲜花',imsurl:require('../assets/icon/flow.png')},
       ],
       original:[],
       modelatc:[],
       hateatc:[],
       listatc:[],
       editorList:[],
       options: [
        {
          name: '微信',
          icon: require('../assets/icon/wechat.png'),
        },
        {
          name: '微博',
          icon:  require('../assets/icon/weibo.png'),
        },
        {
          name: 'QQ',
          icon:  require('../assets/icon/QQ.png'),
        },
                {
          name: 'QQ空间',
          icon:  require('../assets/icon/qz.png'),
        },
      ],
      async getmorelist(page){
              let morelist= await axios.get(this.preUrl+'home/firstshow-more',{params:{page:page}})
              this.listatc=this.listatc.concat(morelist.data.listatc)
       },      
     }
  },
  methods:{
    concat(){
      this.page++
      this.getmorelist(this.page)
      },
    icongo(index){
      if(index==0){this.$router.push({path:`/colunm`})}
      else if(index==1){this.$router.push({path:`/search`})}
      else if(index==2){ this.$router.push({path:`/personal`},onComplete => { }, onAbort => { }) }
      else if(index==3){this.showShare=true}
      else if(index==4){
        var anchor = this.$el.querySelector('#anchor')
        document.body.scrollTop = anchor.offsetTop; // chrome
        document.documentElement.scrollTop = anchor.offsetTop; // firefox

      }
    },
    editorjum(id){
        this.$router.push({
        path:`/other`, query:{id:id}
      })  
    },
    go:function(id){
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
     listatcC(){
       let preUrl='http://www.wenhais.cn/'
       let start=this.listatc.length
       let pages=this.page
       if(this.page==1){
         pages=this.page+1
       }
          this.listatc.forEach(function(items,index){
          if(index>(pages-1)*7-1){
            items.cover=preUrl+items.cover
          }
          items.describe=items.describe.replace(/<[^>]+>/g,'')
          if(items.publishDate==null){
              items.publishDate=''
            }
          items.publishDate=items.publishDate.split('T')[0]
        })
        return this.listatc
     }
  },
  async mounted(){
    //轮播请求
    const swiper=await axios.get('http://www.wenhais.cn/home/slide')
    let preUrl='http://www.wenhais.cn/'
    let imgBox=[]
    swiper.data.slideall.forEach(function(items,index){
      preUrl+=items.path
      imgBox.push(preUrl)
      preUrl='http://www.wenhais.cn/'
    })
    this.images=imgBox

   //原创专区请求
   const original= await axios.get('http://www.wenhais.cn/home/firstshow')
   //编辑模块请求
   const editor= await axios.get('http://www.wenhais.cn/home/rank')
   //原创推荐
   original.data.showatc.forEach(function(items,index){
     items.cover=preUrl+items.cover
   })
   this.original=original.data.showatc
   //点赞排行
   original.data.modelatc.forEach(function(items,index){
     items.cover=preUrl+items.cover
   })
   this.modelatc=original.data.modelatc
   //点踩排行
   original.data.hateatc.forEach(function(items,index){
     items.cover=preUrl+items.cover
   })
   this.hateatc=original.data.hateatc
   //文章列表
   //第一次渲染需要在这加文件名前缀，后面就不加了
   original.data.listatc.forEach(function(items,index){
     items.cover=preUrl+items.cover
   })
   this.listatc=original.data.listatc
  //编辑模块
  editor.data.forEach(function(items,index){
    items.head=preUrl+items.head
  })
  this.editorList=editor.data
  }
}
</script>

<style lang="less" >
*{padding: 0;
margin: 0;
box-sizing: border-box;
}
#home{
  background-color: rgb(246, 247, 249);
  .header{
    background-color: rgb(255, 255, 255);
    width: 100vw;
    height: 45px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 0 40px rgba(0, 0, 0, 0.1);
    .logo{
      height: 45px;
      width: auto;
      object-fit: cover;
      overflow: hidden;
    }
  .user{
    margin-right: 10vw;
  }
  }
  .serchbox{
    height: 40px;
  }
  .swiperimg{
    margin-top: 10px;
    box-sizing: border-box;
    height: 150px;
    width: 98vw;
    object-fit: cover;
  };

  // 推荐模块
  .command{
    margin-top: 10px;
    height: auto;
    width: 100%;
    background: rgb(255, 255, 255);
    padding-bottom: 10px;
      .command-title{
        padding-top: 10px;
        height: 40px;
        width: 100vw;
       display: flex;
       flex-direction: row;
      //  justify-content: center;
       span{
         margin-left: 3vw;
         padding-left: 5px;
         box-sizing: border-box;
         border-left: 3px solid rgb(241, 62, 73);
         display: flex;
         align-items: center;
         justify-content: center;
         height: 55%;
         width: auto;
         font-size: 18px;
         font-family: SimSun;
         font-weight: 600;
       }
      #ppp{
         margin-top: -3px;
         display: flex;
         align-items: center;
        //  background: chartreuse;
         color: #8b8b8b;
         font-size: 13px;
         font-family: Microsoft jhengHei;
         justify-content: center;
         align-items: center;
         height: 100%;
         width: 40%;
          }
       
      }

      .slide-box { 
        height: 150px;
        overflow-x: scroll; 
        display: -webkit-box; 
        -webkit-overflow-scrolling: touch; 
      }
      .slide-item { 
        margin-left: 10px;
        width: 70px; 
        height: 140px; 
        margin-right: 10px;
        img{
          border-radius: 4px;
          height: 100px;
          width: 80px;
          object-fit: cover;
          overflow: hidden;
        };
        span{
              font-family: Microsoft jhengHei;
              color: #494949;
              font-size: 14px;
              font-weight: 600;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2; 
              overflow: hidden;
        }
        }
      .slide-box::-webkit-scrollbar {width:0;height:0;display: none;}
  };
  .tabCard{
    font-family: Microsoft jhengHei;
    box-sizing: border-box;
    margin-top: 10px;
    padding: 10px;
    background-color: rgb(255, 255, 255);
    height: 220px;
    width: 100vw;
    .slide-box { 
        height: 150px;
        margin-top: 20px;
        overflow-x: scroll; 
        display: -webkit-box; 
        -webkit-overflow-scrolling: touch; 
      }
    .slide-item { 
        margin-left: 10px;
        width: 70px; 
        height: 140px; 
        // border: 1px solid #ccc;
        margin-right: 10px;
        // background:pink;
        img{
          height: 100px;
          width: 80px;
          object-fit: cover;
          overflow: hidden;
          border-radius: 4px;
        };
        span{
              font-family: Microsoft jhengHei;
              color: #494949;
              font-size: 14px;
              font-weight: 600;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2; 
              overflow: hidden;
        }
        }
      .slide-box::-webkit-scrollbar {width:0;height:0;display: none;}
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
  .rank-box{
     height: 150px;
        margin-top: 20px;
        overflow-x: scroll; 
        display: -webkit-box; 
        -webkit-overflow-scrolling: touch; 
    .rank-item { 
        margin-left: 10px;
        width: 70px; 
        height: 140px; 
        // border: 1px solid #ccc;
        margin-right: 10px;
        // background:pink;
        img{
          height: 80px;
          width: 80px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid snow;
          overflow: hidden;
        };
        span{
              font-family: Microsoft jhengHei;
              color: #494949;
              font-size: 14px;
              font-weight: 600;
              overflow: hidden;
        };
        p{
          font-size: 14px;
          color: #8b8b8b;
        }
        }
      .rank-box::-webkit-scrollbar {width:0;height:0;display: none;}        
  }
  .share-box{
    border-radius: 0;
    margin-bottom: 0;
    .van-share-sheet__cancel{
      margin-top: 0;
      background-color: rgb(179, 222, 73);
      font-size: 15px;
      font-weight: 600;
      color: rgb(255, 255, 255);
    }
  }
  .footer{
      margin-top: 10px;
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
