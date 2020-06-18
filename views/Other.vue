<template>
    <div class="personal">
            <div class="header">
                <div>
               <van-icon name="arrow-left" color="rgb(255,255,255)" size="25" @click="back" />  
               <span  v-text="userInfo.username"></span>  
               <van-icon name="search" color="rgb(255,255,255)" size="25" style="marginLeft:50vw;" @click="search"/>    
                </div> 
                <img :src="userInfoC.head" :key='userInfoC.head+1' alt="">
                <span class="nickname" v-text="userInfoC.username"></span>
                <p v-text="userInfoC.mood"></p>
                        
            </div>

            <van-grid>
                <van-grid-item icon="wap-home-o" text="主页"  :class="ischoosed[0]" @click="select(0)"/>
                <van-grid-item icon="notes-o" text="TA的文章"  :class="ischoosed[1]" @click="select(1)" />
                <van-grid-item icon="chat-o" text="TA的分享"  :class="ischoosed[2]" @click="select(2)" />
                <van-grid-item icon="edit" text="我要献花"  :class="ischoosed[3]" @click="select(3)" />
            </van-grid>
            <!-- 主页展示 -->
         <section class="part1" v-show="secShow[0]">
            <div class="home">
              <div class="praise">
                  <van-icon name="like" class="twoicon" />
                  <span >获赞:{{modenum.praiseMode}}</span>
              </div>
               <div class="total">
                   <van-icon name="comment"  class="twoicon1" />
                  <span>文章:{{modenum.allAticle}}</span>
              </div>
               <div class="comment">
                   <van-icon name="gold-coin" class="twoicon2" />
                  <span>被赏:0</span>
              </div>
            </div>

             
             <!-- 留言区域 -->
             <div class="messageare" >
                <div class="leavehead">
                    <van-icon name="chat-o" size="20" />
                    <h2>匿名留言列表</h2>
                </div>
                <van-empty description="空空如也" v-show="kongshow" />

             <div class="mesbox" v-for="(items,index) in leaveC" :key='index'>
                 <van-icon name="volume-o" class="loud" />
                  <span v-text="items.content"></span>
                 <div class="border"> </div>           
             </div>


             </div>

         </section>
          <!-- 文章列表 -->
        <section class="part2" v-show="secShow[1]">
         <div class="leavehead">
            <van-icon name="more-o" size='25' />
            <h2>TA的文章</h2>
          </div>
         <div class="myact">
                <van-empty description="空空如也" v-show="listkong" />
                
                <div class="list-box" v-for="(items,index) in listatcC" :key="index" @click="go(items._id)" >
                    <div class="leftimg">
                        <img :src="items.cover" alt="" srcset="">
                    </div>
                    <div class="rightbox">
                    <span>{{items.title}}</span>
                    <p>{{items.describe}}</p>
                    <a>{{items.publishDate}}</a>
                    </div>
                </div> 
                <van-button color="rgb(238,10,36)" plain size="small" style="margin-top:5px;width:100px;margin-left:35vw;" >显示更多</van-button>           
         </div>
        </section>


        <section class="part2" v-show="secShow[2]">
         <div class="leavehead">
            <van-icon name="more-o" size='25' />
            <h2>TA的分享</h2>
          </div>         
           <van-empty description="空空如也" v-show="true" />                       
        </section>

        <section class="part2" v-show="secShow[3]">
                <span class="warning">精致鲜花</span>
        </section>
         

         <div class="inputbox">
             <van-icon name="smile-o" class="smile"/>
             <input type="text" v-model="chatvalue" @input="inpting(chatvalue)" class="chatbox" placeholder="直接留言，不需登录……">
             <button class="niming" @click="send">匿名发送</button>
         </div>
       </div>
</template>


<script>
import Vue from 'vue'
import axios from 'axios';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
Vue.prototype.$axios = axios;
export default {
    data:function(){
       return {
           imginput:{},
           modenum:{praiseMode:0,allAticle:0},
           leave:[],
           userInfo:{},
           kongshow:false,
           listkong:true,
           secShow:[true],
           sendbtn:{},
           chatvalue:'',
           editShow:false,
           ischoosed:['active'],
           value:[],
           preUrl:'http://www.wenhais.cn/',
          listatc:[],
       async getatc(id){
              let mylist= await axios.get(this.preUrl+'home/atclist-m',{params:{id:id,page:1}})
              this.listatc=mylist.data.article
       },
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
        async getleave(val){
              let leave= await axios.get(this.preUrl+'home/leave',{params:{id:val}})
               this.leave=leave.data             
       },

        async addleave(val,id){
              let addres= await axios.get(this.preUrl+'home/leave-add',{params:{prama:val,userId:id}})
            this.leave=addres.data           
       },
        async getother(id){
             let userinfomation= await axios.get(this.preUrl+'home/model-num-o',{params:{id:id}})
             this.modenum.praiseMode=userinfomation.data.praiseMode
             this.modenum.allAticle=userinfomation.data.allAticle
             this.userInfo.username=userinfomation.data.userInfo2.username
             this.userInfo.head=this.preUrl+userinfomation.data.userInfo2.head
             this.userInfo.mood=userinfomation.data.userInfo2.mood
             this.userInfo.id=userinfomation.data.userInfo2._id

        }

       }
    },
    methods:{
    search:function(val){
       this.$router.push({
        path:`/search`
      })         
    },

    go:function(id){
       this.$router.push({
        path:`/detail/${id}`
      })

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

    select(index){
        this.secShow=[]
        this.ischoosed=[]
        this.ischoosed[index]='active'
        this.secShow[index]=true
        if(index==1){
            this.getatc(this.$route.query.id)
        }
    },
    back(){
      this.$router.goBack()
    },

    async send(){
        if(this.chatvalue.length>12||this.chatvalue.length==0){
            alert('留言不大于12字符且不小于1字符');
            return;
        }else{

          this.addleave(this.chatvalue,this.$route.query.id)
        } 
         this.chatvalue=''   

    },
  },
    computed:{
      listatcC:function(){
          let defaulturl=this.preUrl
          if(this.listatc.length==0){
              this.listkong=true
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
         this.listkong=false         
          return this.listatc
          }
      },
      userInfoC:function(){
         return this.userInfo
      },
      leaveC:function(){
          if(this.leave.length==0){
              this.kongshow=true
              return this.leave
          }else{
              this.kongshow=false
              return this.leave
          }
      },

  },
  mounted(){
     this.$router.afterEach((to,from,next)=>{window.scrollTo(0,0)})
      this.getother(this.$route.query.id)

      this.sendbtn=document.querySelector('.niming')
      this.imginput=document.querySelector('#imginput')
    //   需要每次清空，否则视图不更新
      this.userInfo={}
      this.leave=[]
      //获取留言数据
      this.getleave(this.$route.query.id)

     

      
    }
}
</script>

