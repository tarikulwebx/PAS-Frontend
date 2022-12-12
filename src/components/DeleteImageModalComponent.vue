<template>
  <div id="delete-image-modal">
    <div class="modal-card" style="width: 310px; margin: 0 auto">
      <header class="modal-card-head">
        <p class="modal-card-title">削除します</p>
        <button type="button" @click="$emit('close')" class="delete" />
      </header>
      <section class="modal-card-body">
        <p class="card-body-text">こちらの写真を削除してもよろしいでしょうか？</p>
        <img
          :src="item.image"
          alt="image"
          style="height: 277px; width: 277px"
        />
      </section>
      <footer class="modal-card-foot">
        <b-button class="close" @click="$emit('close')" label="もどる" />
        <b-button class="confirm-delete" @click="deleteImage"
          ><span class="btn-txt">削除します</span></b-button
        >
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  props: ["item"],
  methods: {
    // delete image function
    deleteImage() {
      this.$emit("deleteImage", this.item);
    },
  },
};
</script>

<style scoped>
.modal-card-title {
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  color: #121723;
}
.card-body-text {
  font-weight: 300;
  font-size: 16px;
  line-height: 24px;
  color: #121723;
  padding-bottom: 10px;
}
.modal-card-foot {
  align-items: center;
  background-color: whitesmoke;
  display: flex;
  flex-shrink: 0;
  justify-content: flex-end;
  padding: 20px;
  position: relative;
}

.confirm-delete {
  background: #121723;
  border-radius: 4px;
}
.btn-txt {
  color: #fff !important;
}
.close {
  background: #ffffff;
  border: 1px solid #121723;
  border-radius: 4px;
}
.close span {
  color: #121723 !important;
}
.modal-card-head,
.modal-card-foot {
  background-color: #fff !important;
}
</style>