<template>
  <div class="buttons">
    <b-button class="capture-btn" @click="goSearchByOCR">
      <b-icon icon="camera"></b-icon>
      <span class="btn-text">撮影検索</span>
    </b-button>
    <!-- <b-button :class="userSelected ? 'btn-orange btn-sm' : 'btn-gray btn-sm'">次へ</b-button> -->
  </div>
</template>

<script>
export default {
  props: ["userSelected"],
  methods: {
    // go to capture-ocr-image page
    goSearchByOCR() {
      this.$store.dispatch("global/setSearchBy", "ocr");
      this.$router.push("/capture-ocr-image");
    },
  },
};
</script>

<style scoped>
.buttons .capture-btn {
  background-color: transparent !important;
  width: 162px;
  height: 41px;
  border: 1px solid #121723;
  border-radius: 4px;
}
.buttons .capture-btn span {
  color: #000 !important;
}
.buttons .capture-btn .btn-text {
  font-style: normal;
  font-weight: 300;
  font-size: 20px;
  line-height: 30px;
  color: #121723;
}
.buttons.floating-btn {
  position: fixed;
  bottom: 25px;
  left: 12px;
  z-index: 9999;
}
.btn-sm {
  width: 210px;
}
.btn-sm span {
  font-weight: 600;
  font-size: 24px;
  line-height: 36px;
}
</style>