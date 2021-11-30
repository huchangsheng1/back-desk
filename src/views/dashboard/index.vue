<template>
  <div class="dashboard-container">
    <img v-show="false" class="backgroundsrc" src="../../assets/resources_images/Backstage_Poster.png" alt="" srcset="">
    <!-- <div class="dashboard-text">123</div> -->
      
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  mounted() {
    
    document.body.style.background = `url(${document.querySelector('.backgroundsrc').src}) no-repeat`;
    document.body.style.backgroundSize = '100% 100%';  
    
  },
  destroyed() {
    document.body.style.background = 'none';
  }
  
}
</script>

<style lang="scss" scoped>

.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}


</style>
