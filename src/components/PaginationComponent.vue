<template>
  <div id="pagination" class="container">
    <div class="prev p-10">
       <b-button :disabled="page+1 == 1" class="prev-btn" icon-right="chevron-left" @click="goPrev" /> 
    </div>
    <div class="page p-10">
        {{ page+1 }} / {{ total }}
    </div>
    <div class="next p-10">
        <b-button :disabled="page+1 >= total" class="next-btn" icon-right="chevron-right" @click="goNext" />
    </div>
  </div>
</template>

<script>
export default {
  props: ['total', 'page'],  
  data() {
    return {
      
    };
  },
  methods:{
    // goto next page
      goNext(){
        this.$emit('goNext');
      },
      // goto previous page
      goPrev(){
        this.$emit('goPrev');
      }
  }
};
</script>

<style></style>
