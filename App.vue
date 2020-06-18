<template>
  <div id="app">

    <transition :name="transitionName"> 
      <router-view class="Router" />
    </transition>

  </div>
</template>

<script>
export default {
  data() {
　　　　return {
　　　　　　transitionName: 'slide-right'  
　　　　}
　　},
　　watch: {
　　　'$route' (to, from) {
　　　　let isBack = this.$router.isBack  
　　　　　　if(isBack) {
　　　　　　　　this.transitionName = 'slide-right'
　　　　　　} else {
　　　　　　    this.transitionName = 'slide-left'
　　　　　}
　　this.$router.isBack = false
　　}
　  }
}
</script>



<style lang="less">
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  .Router{
     position: absolute;
     width: 100%;
     transition: all .4s ease;

  }

 .slide-left-enter,
 .slide-right-leave-active {
     opacity: 0;
    -webkit-transform: translate(100%, 0);
    transform: translate(100%, 0);
}

.slide-left-leave-active,
.slide-right-enter {
     opacity: 0;
    -webkit-transform: translate(-100%, 0);
    transform: translate(-100% 0);
}

}

</style>
