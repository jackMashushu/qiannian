<template>
    <div class="personal">
            <div class="header">
                <div>
               <van-icon name="arrow-left" color="rgb(255,255,255)" size="25" @click="back" />  
               <span>个人中心</span>  
               <van-icon name="search" color="rgb(255,255,255)" size="25" style="marginLeft:50vw;" @click="search"/>    
                </div> 
                <img :src="userInfoC.head" :key='userInfoC.head+1' alt="">
                <span class="nickname" v-text="userInfoC.username"></span>
                <p v-text="userInfoC.mood"></p>
                        
            </div>

            <van-grid>
                <van-grid-item icon="wap-home-o" text="主页"  :class="ischoosed[0]" @click="select(0)"/>
                <van-grid-item icon="notes-o" text="我的文章"  :class="ischoosed[1]" @click="select(1)" />
                <van-grid-item icon="chat-o" text="我的评论"  :class="ischoosed[2]" @click="select(2)" />
                <van-grid-item icon="edit" text="发布文章"  :class="ischoosed[3]" @click="select(3)" />
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
            <div class="button">
                <button class="changebtn" @click="random">随机头像</button>
                <button class="changebtn" @click="editZiliao" style="color:rgb(117, 220, 2);border: 1px solid rgb(117, 220, 2);">修改资料</button>
            </div>
            <div class="editmession" v-show="editShow">
                <img :src="pre" alt="" class="pre">
                <div>
                <label for="imginput"  >上传头像</label>
                <input type="file" @change="uploads" id="imginput" hidden>
                </div>


                <van-cell-group>
                 <van-field v-model="value[0]" label="昵称" placeholder="不超过6字符" />
                 <van-field v-model="value[1]" label="签名" placeholder="不超过18字符" />
                 <van-field v-model="value[2]" label="账号" placeholder="请输入新账号" />
                </van-cell-group>
                <van-button round type="info" class="editbtn" @click="confirm" >确认修改</van-button>
                <van-button round type="info" @click="canceledit" color="rgba(117, 220, 2,.7)" class="editbtn">取消操作</van-button>
                              
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
            <h2>我的所有文章</h2>
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
            <h2>我的评论</h2>
          </div>
         <div class="myact">
            <div class="commitems" v-for="(items,index) in commentC" :key="index" >
                <div class="itemcontent">
                    <span v-html="items.atcId.title"></span>
                    <p v-html="items.content"></p>                    
                </div>
                <div class="itembtn">
                    <span class="pre" @click="go(items.atcId._id)" >预览</span>
                    <span class="delet" @click="delet(items._id)">删除</span>
                </div>
            </div> 
             <van-button color="rgb(238,10,36)" plain size="small" style="margin-top:5px;width:100px;margin-left:35vw;" >显示更多</van-button>    
         </div>
        </section>

        <section class="part2" v-show="secShow[3]">
                <span class="warning">抱歉！手机端暂不支持，请移步PC端进行完整操作！</span>
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
import { Cell, CellGroup } from 'vant';

Vue.use(Cell);
Vue.use(CellGroup);



axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
Vue.prototype.$axios = axios;
export default {
    data:function(){
       return {
           pre:'',
           imginput:{},
           modenum:{praiseMode:0,allAticle:0},
           leave:[],
           userInfo:{},
           kongshow:false,
           listkong:true,
           comment:[],
           secShow:[true],
           sendbtn:{},
           chatvalue:'',
           editShow:false,
           ischoosed:['active'],
           value:[],
           preUrl:'http://www.wenhais.cn/',
          listatc:[],
        async getcomment(id){
              let mycomment= await axios.get(this.preUrl+'home/common-p',{params:{id:id,page:1}})
              this.comment=mycomment.data.common
                        
        },
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
        async getnum(val){
              let num= await axios.get(this.preUrl+'home/model-num',{params:{id:val}})
              this.modenum.allAticle=num.data.allAticle
              this.modenum.praiseMode=num.data.praiseMode
              
       },
        async getleave(val){
              let leave= await axios.get(this.preUrl+'home/leave',{params:{id:val}})
               this.leave=leave.data             
       },

        async addleave(val,id){
              let addres= await axios.get(this.preUrl+'home/leave-add',{params:{prama:val,userId:id}})
            this.leave=addres.data         
       },
        async getpre(fd){
          let res= await this.$axios({method: 'post',url:this.preUrl+'home/preview',data:fd})
             this.pre=this.preUrl+ res.data
        },
        async changemes(data){
            let postData = this.$qs.stringify(data)
           await this.$axios({method: 'post',url:this.preUrl+'home/filechange',data:postData})
            .then((res)=>{
                  if(res.data._id){
                        alert('修改成功！点击确定为您重新登陆！');
                        for(let attr in res.data){
                                var str=`${attr}=${res.data[attr]}`;
                                document.cookie=str
                            }
                            location.reload()      
                    }else{
                        alert(res.data);
                    }
            
            })
        },
        async randomhead(id){
        let res=await axios.get(this.preUrl+'home/random',{params:{id:id}})
        let headstr=`head=${res.data}`;
        document.cookie=headstr;
        location.reload();
        },
        async deletcom(val,userId){
             let res= await axios.get(this.preUrl+'home/frondcomm-delet',{params:{id:val}})
        }

       }
    },
    methods:{
    search:function(val){
       this.$router.push({
        path:`/search`
      })         
    },
   delet(val){
        this.deletcom(val)
        this.getcomment(this.userInfo.id)

    },
    go:function(id){
       this.$router.push({
        path:`/detail/${id}`
      })

    },
    random(){
        this.randomhead(this.userInfo.id)
    },
    confirm(){
         let data={
                id:this.userInfo.id,
                username:this.value[0],
                email:this.value[2],
                head:this.pre.split('st/')[1],
                mood:this.value[1]
                }
         let flag=true
         for(let attr in data){
             if(data[attr]==''||data[attr]==undefined){
               alert('请正确填写所有信息，包括头像')
                flag=false
               return 
             }                     
         }
         if(flag==true){
             this.changemes(data)
         }

        
    },

    uploads(){
         const fd=new FormData;
         if(this.imginput.files[0]==undefined){
          alert('请选择合适的图片');
           location.reload()   
          }else{
        fd.append('picName',this.imginput.files[0]);
           this.getpre(fd)  
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
    editZiliao(){
        this.editShow=true
    },
    canceledit(){
        this.editShow=false
    },
    select(index){
        this.secShow=[]
        this.ischoosed=[]
        this.ischoosed[index]='active'
        this.secShow[index]=true
        if(index==1){
            this.getatc(this.userInfo.id)
        }else if(index==2){
            this.getcomment(this.userInfo.id)
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

          this.addleave(this.chatvalue,this.userInfo.id)
        } 
        this.chatvalue=''       
    },
  },
    computed:{
      listatcC:function(){
          let defaulturl=this.preUrl
          if(this.listatc.length==0){
              this.listkong=true
            //   this.totalmsg='共找到'+this.listatc.length+'篇相关文章'
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
        //  this.totalmsg='共找到'+this.listatc.length+'篇相关文章'  
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
      commentC:function(){
          return this.comment
      }
  },
  mounted(){
      this.$router.afterEach((to,from,next)=>{window.scrollTo(0,0)})
      this.sendbtn=document.querySelector('.niming')
      this.imginput=document.querySelector('#imginput')
    //   需要每次清空，否则视图不更新
      this.userInfo={}
      this.leave=[]


      this.userInfo.username=this.getCookie('username')
      this.userInfo.email=this.getCookie('email')
      this.userInfo.head=this.preUrl+this.getCookie('head')
      this.userInfo.mood=this.getCookie('mood')
      this.userInfo.id=this.getCookie('_id')
      this.pre=this.preUrl+this.getCookie('head')
      this.value=[this.getCookie('username'),this.getCookie('mood'),this.getCookie('email')]
      //获取模板数据
      this.getnum(this.userInfo.id)
      //获取留言数据
      this.getleave(this.userInfo.id)

      
    }
}
</script>

<style lang="less">
*{
padding: 0;
margin: 0;
box-sizing: border-box;
 }
.personal{
    height: auto;
    width: 100vw;
    display: flex;
    flex-direction: column;
    background-color: rgb(246, 247, 249);
 .header{
    //  padding: ;
     width: 100vw;
     height: 200px;
     background-color: rgba(255, 68, 0,.7);
     display: flex;
     flex-direction: column;
     align-items: center;
     div{
        //  background-color: black;
         display: flex;
         flex-direction: row;
         align-items: center;
         justify-content: space-between;
         width: 100%;
         height: 60px;
         padding: 0 15px;
         span{
             margin-left: -20px;
             color: rgb(255, 255, 255);
             font-size: 16px;
            }
        };
        img{
            height: 70px;
            width: 70px;
            border-radius: 50%;
            border: 2px solid rgb(232, 232, 232);
            object-fit: cover;
        };
        .nickname{
            padding-top: 10px;
            display: block;
            color: rgb(244, 244, 244);
            font-family: Microsoft jhengHei;
            font-size: 18px;
            font-weight: 600;
        }
        p{  
            display: block;
            margin-top: 5px;
            font-size: 14px;
            color: rgb(255,255,255);
            font-family: Microsoft jhengHei;
            font-weight: 600;
            margin-bottom: 20px;
        }
    };
    .active{
        color: salmon;
    }
    .part1{
        display: flex;
        flex-direction: column;
      .home{
        margin-top: 10px;
        background-color: rgb(255, 255, 255);
        // background-color: salmon;
        width: 100vw;
        height: 120px;
        padding-top: 20px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        .twoicon{
            color: rgba(255, 68, 0,.7);
            font-size: 60px;
        }
        .twoicon1{
            color: rgba(117, 220, 2,.7);
            font-size: 60px;
        }
        .twoicon2{
            color: rgba(255, 203, 1,.7);
            font-size: 60px;
        }
        .praise,.total,.comment{
            height: 100%;
            width: 50%;
            display: flex;
            flex-direction: column;
            span{
                font-size: 14px;
                font-family: Microsoft jhengHei;
                color: #8b8b8b;
            }
        }
    }
    .button{
        height: 50px;
        width: 100vw;
        margin-top: 10px;
        background-color: rgb(255, 255, 255);
        display: flex;
        justify-content: space-around;
        align-items: center;
        .changebtn{
            display:block;
            height: 35px;
            font-size: 14px;
            color: rgba(255, 68, 0,.7);
            padding: 5px 20px;
            background-color: rgb(255, 255, 255);
            border: 1px solid rgb(255, 68, 0);
            border-radius: 5px;            
        }
        .changebtn:active,.changebtn1:active{
            background-color: rgb(230, 230, 230);
            transition: all .4s;
        }
    }
    .editmession{
        height: auto;
        padding-top: 20px;
        width: 100vw;
        margin-top: 10px;
        background-color: rgb(255, 255, 255);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding-bottom: 20px;
        label{
            margin: 10px auto;
            font-size: 14px;
            display: block;
            padding: 5px 10px;
            background-color: rgb(255, 68, 0);
            border-radius: 5px;
            color: rgb(255,255,255);
        }
         label:hover{
             background-color: rgb(204, 92, 51);
         }
        .pre{
           height: 60px;
           width: 60px;
           border: 1px solid rgb(230, 230, 230);
           border-radius: 50%;
           
        }
        .editbtn{
            margin-top: 10px;
            height: 35px;
            width: 120px;
            border: none;
            background-color:rgba(255, 68, 0,.6) ;
        }


    }
    .messageare{
        margin-top: 10px;
        display: flex;
        flex-direction: column;
        background-color: rgb(255, 255, 255);
        margin-bottom: 60px;
    .leavehead{
        height: 40px;
        width: 100vw;
        // background-color: rgb(255, 68, 0);
        display: flex;
        padding-left: 20px;
        justify-content:left;
        align-items: center;
        border-bottom: solid 1px rgb(232, 232, 232);
        h2{
            margin-left: 10px;
            font-size: 18px;
            color: #494949;
            font-family: Microsoft jhengHei;
        }
    }
    .mesbox{
        margin: 10px auto;
        height: 35px;
        width: 70vw;
        background-color: rgba(7, 192, 97,.7);
        border-radius: 5px;
        font-size: 15px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: row;
        position: relative;
        font-family: Microsoft jhengHei;
        color: rgb(240, 240, 240);
        font-weight: 600;
        animation: fadein .5s;
        .loud{
            position: absolute;
            left: -40px;
            color: rgb(255, 68, 0);
            font-size: 25px;
        }


    }
    @keyframes fadein {
    from{
        opacity: 0;
        background-color: rgb(255, 68, 0);
    }
    to{
        opacity: 1;
    }
    }
    .border{   
       width:0;
       height:0;
       border-top-color: #ccFF99;
       border-right-color: #ff0099;
       border-bottom-color: #00ff99;
       border-left-color: #9900ff;
       border-color: transparent rgba(7, 192, 97,.7) transparent transparent;
       border-width: 10px;
       border-style: solid;
       position: absolute;
       left: -20px;
   
    }
    }

   }
   .part2{
       margin-top: 10px;
       background-color: rgb(255,255,255);
       height: auto;
       width: 100vw;
        display: flex;
        flex-direction: column; 
            .warning{
            padding: 40px 20px;
            font-size: 20px;
            color: rgb(255, 68, 0);
            opacity: .7;
        }
    .leavehead{
        height: 40px;
        width: 100vw;
        display: flex;
        padding-left: 20px;
        justify-content:left;
        align-items: center;
        border-bottom: solid 1px rgb(232, 232, 232);
        h2{
            margin-left: 10px;
            font-size: 18px;
            color: #494949;
            font-family: Microsoft jhengHei;
        }
    }
    .myact{
        display: flex;
        padding: 10px 10px;
        // background-color: rgba(117, 220, 2,.7);
        flex-direction: column;
        margin-bottom: 70px;
        .commitems{
            padding: 0 0px;
            display:flex;
            flex-direction: row;
            height:auto;
            width: 100%;
            border-bottom: 1px solid rgb(240, 240, 240);
            .itembtn{
                height: 100%;
                width: 30%;
                display: flex;
                flex-direction: column;
                margin: auto 0px;
                justify-content: right;
                align-items: center;
                span{
                    display: flex;
                   justify-content: center;
                   align-items: center;
                   height:35px;
                   width: 100px;
                   border-radius: 5px;
                   outline: none;
                   border: none;
                   margin-top: 5px;
                   font-size: 14px;
                   color: rgb(255,255,255);
                }
                .pre{background-color: rgba(117, 220, 2,.7);}
                .delet{background-color: rgb(255, 68, 0);}
            }
            .itemcontent{
                display: flex;
                flex-direction: column;
                justify-content: left;
                width: 70vw;
                align-items: flex-start;
                span{
                    margin-top: 10px;
                    display: block;
                    font-size: 17px;
                    color: #494949;
                    font-family: Microsoft jhengHei;
                    font-weight: 600;
                    width: 80%;
                    margin-bottom: 5px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
                p{
                    display: block;
                    font-size: 14px;
                    color: #8b8b8b;
                    font-family: Microsoft jhengHei;
                    font-weight: 600;
                    margin-bottom: 10px; 
                    text-align: left;
                    display: -webkit-box;
                     -webkit-box-orient: vertical;
                    -webkit-line-clamp: 3; 
                    overflow: hidden;
                }
            }
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

}
</style>