<template>
  <div class="modal-card" style="width: auto" id="research">
    <header class="modal-card-head">
      <p class="modal-card-title">検索ワードの変更</p>
      <button type="button" class="delete" @click="checkSearchCondition" />
    </header>
    <section class="modal-card-body" style="padding: 20px">
      <b-field>
        <b-input
          v-model="orc_searched_text"
          maxlength="200"
          type="textarea"
        ></b-input>
      </b-field>
    </section>
    <footer class="modal-card-foot">
      <div class="buttons">
        <b-button
          @click="searchAgain"
          :disabled="!orc_searched_text"
          :class="orc_searched_text ? 'btn-orange' : 'btn-gray'"
          expanded
          >再検索</b-button
        >
      </div>
    </footer>
    <b-modal
      v-model="isComponentModalActive"
      :width="300"
      has-modal-card
      trap-focus
      :destroy-on-hide="false"
      aria-role="dialog"
      aria-label="Example Modal"
      close-button-aria-label="Close"
      animation="slide-fade-down"
      aria-modal
    >
      <template>
        <alart-showing-model-component
          :title="modalTitleText"
          :bodyText="modalBodyText"
          @closeParent="closeParent"
          @close="close"
        />
      </template>
    </b-modal>
  </div>
</template>

<script>
import AlartShowingModelComponent from "./AlartShowingModelComponent.vue";
export default {
  components: {
    AlartShowingModelComponent,
  },
  data() {
    return {
      isComponentModalActive: false,
      orc_searched_text: "",
      modalTitleText: "検索ワードの変更",
      modalBodyText: "再検索を中断しますか？",
    };
  },
  mounted() {
    this.orc_searched_text = this.$store.state.customer.openSearchQuery.search;
  },
  methods: {
    // check search condition
    checkSearchCondition() {
      if (
        this.orc_searched_text !==
        this.$store.state.customer.openSearchQuery.search
      ) {
        this.isComponentModalActive = true;
      } else {
        this.closeParent();
      }
    },
    // searrch again function
    searchAgain() {
      if (this.orc_searched_text) {
        this.$store.dispatch("customer/setOpenSearchQuery", {
          name: "search",
          value: this.orc_searched_text,
        });
      }
      this.$emit("searchAgain");
    },
    // close modal
    close() {
      this.isComponentModalActive = false;
    },
    // close parent modal
    closeParent() {
      this.$emit("close");
    },
  },
};
</script>

<style scoped>
.modal-card-head,
.modal-card-foot {
  align-items: center;
  background-color: white;
  display: flex;
  flex-shrink: 0;
  justify-content: flex-start;
  padding: 20px;
  position: relative;
}
p.modal-card-title {
  text-align: center;
  font-weight: 600;
  font-size: 18px;
  line-height: 22px;
  letter-spacing: -0.408px;
  color: #121723;
}
.buttons {
  width: 100%;
}
</style>