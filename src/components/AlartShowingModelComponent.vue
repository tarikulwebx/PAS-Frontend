<template>
  <div class="alart-showing-modal-comp">
    <div class="modal-card" style="width: auto">
      <header class="modal-card-head">
        <p class="modal-card-title">{{ title }}</p>
        <button type="button" class="delete" @click="$emit('close')" />
      </header>
      <section class="modal-card-body">
        <p>{{ bodyText }}</p>
      </section>
      <footer class="modal-card-foot"> 
        <b-button class="close" @click="$emit('close')" label="いいえ" />
        <b-button class="confirm" @click="$emit('closeParent')" ><span class="btn-txt">中断する</span></b-button>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
    props: ['title', 'bodyText']
};
</script>

<style scoped>
.modal-card-head, .modal-card-foot {
    align-items: center;
    background-color: white;
    display: flex;
    flex-shrink: 0;
    justify-content: flex-start;
    /* padding: 20px; */
    position: relative;
}
.modal-card-head {
    padding: 20px;
}
.modal-card-foot {
  justify-content: flex-end;
  padding: 16px;
}
p.modal-card-title {
    /* text-align: center; */
    font-family: 'Hiragino Kaku Gothic Pro';
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 24px;
    letter-spacing: -0.408px;
    color: #121723;
}
.modal-card-body p {
    font-family: 'Hiragino Kaku Gothic Pro';
    font-style: normal;
    font-weight: 300;
    font-size: 16px;
    line-height: 170%;
    padding: 16px;
}
.buttons {
    width: 100%;
}
.confirm {
  background: #121723;
  border-radius: 4px;
}
.btn-txt {
  color: #fff !important;
}
.close {
  background: #FFFFFF;
  border: 1px solid #121723;
  border-radius: 4px;
}
.close span {
  color: #121723 !important;
}
</style>
