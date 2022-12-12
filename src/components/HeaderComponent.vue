<template>
  <div class="header">
    <!-- <div class="container"> -->
      <div class="header-content">
        <div :class="backBtnTxt ? 'left-icon grow1': 'left-icon grow0'" @click="goBack">
          <router-link :to="prevPage">
            <img src="./../assets/icons/arrow-left.png" alt="icon" />
            <span>{{ backBtnTxt }}</span>
          </router-link>
        </div>
        <div :class="backBtnTxt ? 'title grow1': 'title grow0'">
          <span>{{ title }}</span>
        </div>
        <div :class="backBtnTxt ? 'right-icon grow1': 'right-icon grow0'">
          <router-link to="/"><img src="./../assets/icons/home.png" alt="icon" /></router-link>
        </div>
      </div>
    <!-- </div> --> 
  </div>
</template>

<script>
export default {
  props: ['prevPage', 'backBtnTxt', 'title'],
  methods: {
    // go back function
    goBack(){
      if(this.$store.state.global.userSelections.searchBy === 'ocr'){
        this.$emit('captureAgain');
      }else{
        this.$emit('searchAgain');
      }
    }
  }
};
</script>

<style scoped>

.left-icon, .right-icon {
  display: flex;
  align-items: center;
}
.left-icon {
  justify-content: flex-start;
}
.right-icon {
  justify-content: flex-end;
}
.grow1 {
  flex-grow: 1;
}
.grow0 {
  flex-grow: 0;
}
.left-icon span {
  /* font-family: "SF Pro Text"; */
  font-weight: 400;
  font-size: 18px;
  line-height: 22px;
  color: #121723;
  padding-left: 6px;
}
.left-icon a {
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: center;
}
</style>
