<template>
    <div class="search">
      <div class="deta-header">
         <van-icon name="arrow-left" color="rgb(238,10,26)" size="22" @click="back" />
         <span id="titlex">搜索</span>
         <!-- 弹出菜单 -->
         <van-popup v-model="show" closeable position="top" :style="{ height: '40%'}" class="dropbox">
             <!-- 三个图标 -->
            <van-grid :column-num="3" icon-size='32px'>
                <van-grid-item :icon="items.imsurl" 
                v-for="(items,index) in fiveicon" :key="index" :text="items.name" @click="icongo(index)"  />
            </van-grid>
             <!-- 返回按钮 -->
             <van-button type="primary"  to="/" block size="samll" color="rgb(238,10,26)" class="backbtn">返回首页</van-button>
         </van-popup>

         <div class="header-btn">
           <van-icon name="user-circle-o" color="rgb(238,10,26)" size="24" class="user"  @click="login"/>
           <van-icon name="wap-nav" @click="showPopup" color="rgb(238,10,26)" size="28" />
         </div>

      </div>

      <div class="searchcontent">
        <van-search v-model="value" placeholder="请输入搜索关键词" show-action   @search="onSearch" @cancel="onCancel"/>
          <div class="label">
           <van-tag round size="large"  @click="labelc(labeltext[0])" >热点</van-tag>
           <van-tag round type="primary" size="large"  @click="labelc(labeltext[1])" >小说</van-tag>
           <van-tag round type="success" size="large"  @click="labelc(labeltext[2])" >散文诗歌</van-tag>
           <van-tag round type="danger" size="large"  @click="labelc(labeltext[3])" >爱情</van-tag>
           <van-tag round type="warning" size="large" @click="labelc(labeltext[4])" >前端</van-tag>
          </div>
          <span v-text="totalmsg" class="totalmsg"></span>
        <van-empty description="空空如也" v-show="kongshow" />
        
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

      </div>
     <van-share-sheet v-model="showShare" :options="options" class="share-box" />

    </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import { Tag } from 'vant';
import { Empty } from 'vant';

Vue.use(Tag);
Vue.use(Empty);


export default {
    data() {
    return {
      labeltext:['热点','小说','散文诗歌','爱情','前端'],
      kongshow:false,
      showShare: false,
      totalmsg:'',
      value:'',
      preUrl:'http://www.wenhais.cn/',
      show: false,
      fiveicon:[
         {name:'栏目',imsurl:require('../assets/icon/clum.png')},       
         {name:'发文',imsurl:require('../assets/icon/author.png')},
         {name:'分享',imsurl:require('../assets/icon/share.png')},        
       ],
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
       article:{author:{username:0}},
       listatc:[],
       async getlist(keywords){
              let searchlist= await axios.get(this.preUrl+'home/search',{params:{keywords:keywords,page:1}})
              this.listatc=searchlist.data.pramas
       },
    };
  },
  computed:{
      listatcC:function(){
          let defaulturl=this.preUrl
          if(this.listatc.length==0){
              this.kongshow=true
              this.totalmsg='共找到'+this.listatc.length+'篇相关文章'
              return this.listatc
          }else{
             this.listatc.forEach(function(items,index){
               items.cover=defaulturl+items.cover
               items.describe=items.describe.replace(/<[^>]+>/g,'')
               if(items.publishDate==null){
                    items.publishDate=''
                }
               items.publishDate=items.publishDate.split('T')[0]
             }) 
         this.totalmsg='共找到'+this.listatc.length+'篇相关文章'  
         this.kongshow=false         
          return this.listatc
          }
      }
  },
  methods:{
      login:function(){
       this.$router.push({
        path:`/personal`
      },onComplete => { }, onAbort => { })     
    },  
    icongo(index){
      if(index==0){this.$router.push({path:`/colunm`})}
      else if(index==1){ this.$router.push({path:`/personal`},onComplete => { }, onAbort => { }) }
      else if(index==2){this.showShare=true}
    },
    go:function(id){
       this.$router.push({
        path:`/detail/${id}`
      })

    },    
    back(){
      this.$router.goBack()
    },
    showPopup() {
      this.show = true;
    },
    onSearch(val){
      this.getlist(val)
    },
    onCancel(){
        this.value=''
    },
    labelc(val){
      this.getlist(val)
      this.value=val
    }

  },
  mounted(){
      if(this.$route.query.keywords==undefined){
        return
      }else{
      this.getlist(this.$route.query.keywords)
      this.value=this.$route.query.keywords
      }

  }


}
</script>

<style lang="less">
*{
padding: 0;
margin: 0;
box-sizing: border-box;
}
.search{
    background-color: rgb(255, 255, 255);
    display: flex;
    flex-direction: column;
    .deta-header{
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    background-color: rgb(255, 255, 255);
    padding: 0 20px;
    border-bottom:1px solid rgb(240, 240, 240);
    width: 100vw;
    font-size: 15px;
    height: 45px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    #titlex{
      // background-color: black;
      margin-left: -10px;
      min-width: 50px;
    }
    .header-btn{
      // background-color: black;
        height: 100%;
        width: 70px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-left: 50vw;
    }
    .dropbox{
      padding-top: 50px;
      .backbtn{
        margin: 5px auto;
        width: 70vw;
        height: 35px;
        border-radius: 10px;
    }
    }
    
    }
    .searchcontent{
        height: auto;
        width: 100vw;
        margin-top: 45px;
        .label{
            margin: 5px auto;
            display: flex;
            height: 30px;
            width: 70vw;
            justify-content: space-around;
            opacity: .7;
        }
        .totalmsg{
            display: block;
            margin-top:10px;
            height: 30px;
            font-size: 15px;
            color: #8b8b8b;
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
    } 
    


}

</style>