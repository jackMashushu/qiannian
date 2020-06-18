<template>
    <div class="detail">
       <div class="deta-header">
         <van-icon name="arrow-left" color="rgb(238,10,26)" size="22" @click="back" />
         <span id="titlex">文章阅读</span>
         <!-- 弹出菜单 -->
         <van-popup v-model="show" closeable position="top" :style="{ height: '40%'}" class="dropbox">
             <!-- 三个图标 -->
            <van-grid :column-num="3" icon-size='32px'>
                <van-grid-item :icon="items.imsurl" 
                v-for="(items,index) in fiveicon" :key="index" :text="items.name" @click="icongo(index)" />
            </van-grid>
             <!-- 返回按钮 -->
             <van-button type="primary"  to="/" block size="samll" color="rgb(238,10,26)" class="backbtn">返回首页</van-button>
         </van-popup>

         <div class="header-btn">
           <van-icon name="user-circle-o" color="rgb(238,10,26)" size="24" class="user" @click="login"/>
           <van-icon name="browsing-history-o" color="rgb(238,10,26)" size="24" @click="night" />
           <van-icon name="wap-nav" @click="showPopup" color="rgb(238,10,26)" size="28" />
         </div>

      </div>
    
   <section class="article-area">
    <h1>{{articleC.title}}</h1>
    <div class="many-messages">
        <span>{{articleC.publishDate}}</span>/
        <span>{{articleC.author.username}}</span>/
        <span>栏目·{{articleC.class}}</span>
    </div>
    <article>
        <div class="imgbox">
           <img :src="articleC.cover" alt="">
        </div>
      <p v-html="articleC.content"></p>
      <van-icon name="like" size='40' :badge='articleC.love'  class="heart" @click="love" />
    </article>

   <div class="next">
       <span  @click="before" >上一篇</span>
       <span @click="author" style="color:rgb(255, 68, 0);border:1px solid rgb(255, 68, 0);padding:5px 10px;border-radius:5px;" >作者</span>
       <span @click="next">下一篇</span>
   </div>
    
   </section>

     <!-- 推荐模块 -->
    <div class="command">
    <div class="command-title">
      <span>猜你喜欢</span> 
      <p id="ppp" style="height:25px; width: 90px;">喜不喜欢？</p>
    </div>
    <div class="slide-box">
      <div class="slide-item" v-for="(items,index) in relationC" :key="index" @click="go(index)">
        <img :src="items.cover" alt="">
        <span>{{items.title}}</span>
      </div>
    </div>
    </div>

    <!-- 评论模块 -->
    <div class="comment">
        <div class="comment-header">
            <span>评论({{commentC.length}})</span>

        </div>
        <span id="sofa" v-show="sofa">崭新的沙发，坐上来吧！</span>
        <div class="commentItems" v-for="(items,index) in commentC" :key="index">
           <div class="head">
               <img :src="items.userId.head" @click="pinger(items.userId._id)">
           </div>
           <div class="mann">
               <span>{{items.userId.username}}</span>
               <p>{{items.content}}</p>
               <label >{{items.time}}</label>
           </div>
        </div>
    </div>
   <van-share-sheet v-model="showShare" :options="options" class="share-box" />
    <!-- 评论输入框 -->
     <div class="inputbox">
         <van-icon name="smile-o" class="smile"/>
         <input type="text" v-model="chatvalue" @input="inpting(chatvalue)" class="chatbox" placeholder="此地输入开始评论……">
         <button class="niming" @click="send">立即发送</button>
     </div>

</div>
</template>  
 
<script>
import Vue from 'vue'
import axios from 'axios';
import { Popup } from 'vant';

Vue.use(Popup);


axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
Vue.prototype.$axios = axios;
export default {
    data() {
    return {
      background:{flag:false},
      preUrl:'http://www.wenhais.cn/',
      show: false,
      sendbtn:{},
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
       nextabefore:[],
       comment:[],
       chatvalue:'',
       relation:[],
       showShare: false,
       async getData(params){
              let detailatc= await axios.get(this.preUrl+'home/article',{params:{id:this.$route.params.id}})
              // console.log(detailatc)
              this.article=detailatc.data.article
              this.comment=detailatc.data.comments
                if(detailatc.data.before==null){
                  this.nextabefore[0]=false
                }else{
                  this.nextabefore[0]=detailatc.data.before._id
                }
                if(detailatc.data.next==null){
                  this.nextabefore[1]=false
                }else{
                  this.nextabefore[1]=detailatc.data.next._id
                }
       },
       sofa:true,
          // 使用cookie渲染数据===========================
        getCookie(key){
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
        },
        async addcomment(data){
           let postData = this.$qs.stringify(data)
            await this.$axios({method: 'post',url:this.preUrl+'home/comment-m',data:postData})
            .then((res)=>{this.comment=res.data.comments})
        },
    };
  },
  computed:{
      //文章计算
      articleC:function(){
          if(this.article.author==undefined){
              return''
          }else{
          this.article.cover=this.preUrl+this.article.cover
          if(this.article.publishDate==null){
              this.article.publishDate={}
          }else{
              this.article.publishDate=this.article.publishDate.split('T')[0]
          }
          return this.article              
          }
      },
      //相关文章计算
      relationC:function(){
          let currentpre=this.preUrl
          this.relation.forEach(function(items,index){
             items.cover=currentpre+items.cover
          })
          return this.relation
      },
      //评论计算
      commentC:function(){
            let currentpre=this.preUrl
            if(this.comment==0){
              this.sofa=true
              return this.comment;
            }else{
            this.comment.forEach(function(items,index){
              items.userId==null?items.userId={}:items.userId=items.userId
              items.userId.head=currentpre+items.userId.head
              items.time=items.time.split('T')[0]
            })
            this.sofa=false
            return this.comment
            }

      },
  },
  methods: {
    pinger(id){  this.$router.push({ path:`/other`, query:{id:id}   })},
    icongo(index){
      if(index==0){this.$router.push({path:`/colunm`})}
      else if(index==1){ this.$router.push({path:`/personal`},onComplete => { }, onAbort => { }) }
      else if(index==2){this.showShare=true}
    },
    //评论添加
    async send(){
        if(this.chatvalue.length>100||this.chatvalue.length==0){
            alert('留言不大于100字符且不小于1字符');
            return;
        }else{
          if(this.getCookie('_id')){
             let data={content:this.chatvalue,
                       atcId:this.$route.params.id,
                       userId:this.getCookie('_id')} 
              this.addcomment(data)   
               this.chatvalue=''         
          }else{
            this.$router.push({path:`/login`})
          }
          
        } 

    },
    inpting(val){
       if(val!=''){          
           this.sendbtn.style.backgroundColor='rgb(7,192,97)'
           this.sendbtn.style.color='rgb(255,255,255)'
       }else{
           this.sendbtn.style.backgroundColor='rgb(239,239,239)'
           this.sendbtn.style.color='#494949'
       }
    },
    login:function(){
       this.$router.push({
        path:`/personal`
      },onComplete => { }, onAbort => { })     
    },
    back(){
      this.$router.goBack()
    },
    showPopup() {
      this.show = true;
    },
    shabi(){
        console.log('1')
    },
    night(){
      if(this.background.flag==false){
        this.background.articleback.style.backgroundColor='green'
        this.background.flag=true
      }else{
        this.background.articleback.style.backgroundColor='rgb(255, 255, 255)'
        this.background.flag=false
      }
      
    },
    author(id){console.log( this.article.author._id)
        this.$router.push({
        path:`/other`, query:{id:this.article.author._id}   })
    },
    //相关推荐重新渲染你
    go(index){
      this.$route.params.id=this.relation[index]._id
      this.getData() 
      },
    before(){
        if(this.nextabefore[0]==false){
           alert('已经没有了')
        }else{
            this.$route.params.id=this.nextabefore[0]
        }
        this.getData()      
    },
    async love(){
      let currentpre=this.preUrl
      this.article.love++
      await axios.get(currentpre+'home/praise',{params:{love:this.article.love,id:this.$route.params.id}})
    },
    next(){
        if(this.nextabefore[1]==false){
           alert('已经没有了')
        }else{
            this.$route.params.id=this.nextabefore[1]
        }
        this.getData()       
    }
  },

  async mounted(){
      this.sendbtn=document.querySelector('.niming')
      this.getData()
      //相关文章
      let relationAtc=await axios.get(this.preUrl+'home/correlation',{params:{id:this.$route.params.id}})
      this.relation=relationAtc.data
      let articlebac=document.querySelector('.article-area')
      this.background.articleback=articlebac
  }
}
</script>

<style lang="less">
*{
padding: 0;
margin: 0;
box-sizing: border-box;
}
.detail{
    width: 100vw;
    height: auto;
    min-height: 100vh;
    background-color: rgb(246, 247, 249);
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
      margin-left: -10px;
      min-width: 80px;
    }
    .header-btn{
        height: 100%;
        width: 100px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-left: 38vw;
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

    // 文章区域
    .article-area{
        // background-color: red;
        background-color: rgb(255, 255, 255);
        margin-top: 50px;
        padding: 30px 20px;
        width: 100vw;
        height: auto;
        text-align: left;
        h1{
            font-size: 20px;
            font-family: SimSun;
            font-weight: 600;
            color: #2e2e2e;
        };
        .many-messages{
            span{
                font-size: 14px;
                color: #8b8b8b;
            };
        };
        .imgbox{
            margin-top: 10px;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: auto;
            object-fit: cover;
            img{
                width: 60%;
                object-fit: cover;
            }
        };
        p{
            letter-spacing: 2px;
            line-height: 25px;
            font-size: 15px
        };
        .heart{
            color: rgb(238,10,26);
            margin-top: 30px;
            margin-left: 40vw;
            transition: all .5s
        };
        .heart:active{
            transform: scale(1.6);
            opacity: .4;
        };
        .next{
            border-top: 1px solid rgb(240, 240, 240);
            margin-top: 20px;
            padding-top: 10px;
            height: 30px;
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: -15px;
            span{
                display: block;
                font-size: 15px;
                color: #8b8b8b;
            }
            
        }
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
  .comment{
      margin-top: 10px;
      margin-bottom: 60px;
      height: auto;
      width: 100vw;
      padding: 0 15px 20px 15px;
      background-color: rgb(255, 255, 255);
      display: flex;
      flex-direction: column;
      .comment-header{
          width: 100%;
          height: 40px;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid rgb(240, 240, 240);
          span{
              font-size: 16px;
              color: #2e2e2e;
              font-weight: 500;
          };
          div{
              display: flex;
              flex-direction: row;
              justify-content: center;
              align-items: center;
              p{
                  font-size: 15px;
                  color: rgb(238,10,26);
                  margin-left: 10px;
              }
          }

      };
      #sofa{
        margin-top: 30px;
        font-size: 18px;
        font-family:Microsoft jhengHei ;
        font-weight: 600;
        color: #8b8b8b;
        opacity: .5;
        padding-bottom: 20px;
        border-bottom: 1px solid rgb(240, 240, 240);
      }
      .commentItems{
          padding-left: 5px;
          width: 100%;
          height: auto;
          display: flex;
          flex-direction: row;
          margin-top: 10px;
          padding-bottom: 10px;
          border-bottom: 1px solid rgb(240, 240, 240);
          .head{
              padding-top: 0;
              width: 70px;
              height: 70px;
            //   background-color: rgb(241, 62, 73);
              img{
                  height: 40px;
                  width: 40px;
                  margin-right: 5px;
                  border-radius: 50%;
                  object-fit: cover;
                  overflow: hidden;
              }
          };
          .mann{
              width: 100%;
              height: auto;
              display: flex;
              flex-direction: column;
              justify-content: left;
              span{
                  text-align: left;
                  font-size: 18px;
                  color: #494949;
                  font-family: Microsoft jhengHei;
                  font-weight: 600;
              };
              p{
                  font-size: 14px;
                  color:#494949 ;
                  text-align: left;
                  letter-spacing: 2px;
              };
              label{
                  margin-top: 5px;
                  text-align: left;
                  font-size: 13px;
                  color: #8b8b8b;}
          }
      }
  }
.inputbox{
    position: fixed;
    bottom: 0;
    height: 45px;
    width: 100vw;
    background-color: red;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    background-color: rgb(255,255,255);
    border-top: 1px solid rgb(240, 240, 240);
    .smile{
        font-size: 28px;
        color: #494949;

    }
    input::-webkit-input-placeholder {
        color: #8b8b8b;
        font-size: 14px;
        font-family: Microsoft jhengHei;
    }
    .chatbox{
        height: 30px;
        width: 60vw;
        padding-left: 10px;
        border: 1px solid rgb(240, 240, 240);
        outline: none;
        font-size: 15px;
        border-radius: 5px;
        font-weight: 600;
        color: rgb(222, 22, 21);
        font-family: Microsoft jhengHei;
    }
    .niming{
        height: 30px;
        border-radius: 5px;
        border: none;
        width: 80px;
        font-size: 14px;
        transition: all .5s;
    }
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

}
</style>