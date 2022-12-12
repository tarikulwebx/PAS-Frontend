<template>
  <div id="set-initial-page">
    <div class="logo">
      <img src="../assets/logo@2x.png" alt="logo" />
    </div>
    <div class="heading">
      <h1 class="title">
        本日の初期条件を <br />
        設定してください
      </h1>
    </div>
    <div class="initial-form container-fluid">
      <b-field class="" label="本日">
        <b-datepicker v-model="initial.date" :locale="locale" editable>
        </b-datepicker>
      </b-field>

      <!-- open my code -->
      <b-field class="" label="通常転送日">
        <b-datepicker v-model="initial.date2" :locale="locale" editable required>
        </b-datepicker>
      </b-field>
      <!-- close my code -->

      <div class="custom-radio">
        <b-field label="拠点">
          <b-radio-button v-for="(store, index) in ContractStores" v-show="store.id != 9" :key="index"
            v-model="initial.ContractStore" :native-value="store.id">
            <span>{{ store.name }}</span>
          </b-radio-button>
        </b-field>
      </div>
    </div>
    <div class="footer">
      <div class="buttons">
        <b-button :disabled="!initial.ContractStore" @click="onSubmit" :class="
          initial.date && initial.ContractStore && initial.date2 ? 'btn-orange' : 'btn-gray'
        " expanded>次へ</b-button>
      </div>
    </div>
  </div>
</template>

<script>
import { showToastMessage } from "../utils/message";

export default {
  data() {
    const today = new Date();
    return {
      ContractStores: [],
      locale: "ja-JP",
      initial: {
        date: new Date(today.getFullYear(), today.getMonth(), today.getDate()),
        ContractStore: "",
        date2:null,
      },
    };
  },
  created() {
    // get all contract stores from store
    this.ContractStores = this.$store.state.global.ContractStores;
  },
  methods: {

    showDate() {
      console.log("check");
      //console.log(this.initial.date, this.initial.date2);
    },
    // after selecting contract store submit for go home page
    onSubmit() {
      if (this.initial.date && this.initial.ContractStore) {
        this.$store
          .dispatch("global/setUserInitial", this.initial)
          .then((res) => {
            if (res == "success") {
              // set selected contractstore id for openSearch
              let query = {
                name: "ContractStore",
                value: this.initial.ContractStore,
              };
              this.$store.dispatch("customer/setOpenSearchQuery", query);
              this.$router.push("/");
            } else {
              showToastMessage(
                "エラーが発生しました。再度試してください。",
                "is-danger"
              );
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        showToastMessage("日付と拠点を選択してください。", "is-danger");
      }
    },
  },
};
</script>

<style scoped>
#set-initial-page {
  min-height: 100vh;
}
.initial-form{
  margin-bottom: 100px;
}

.logo {
  padding-top: 56px;
  padding-bottom: 25px;
  text-align: center;
  border-bottom: 1px solid #cbcfd6;
}

.logo img {
  width: 201px;
}

.heading {
  padding: 22px 0px;
  text-align: center;
}

.title {
  font-weight: 600;
  font-size: 24px;
  line-height: 36px;
  text-align: center;
  color: #121723;
  margin: 0 !important;
}

.buttons {
  padding: 0px;
}
</style>