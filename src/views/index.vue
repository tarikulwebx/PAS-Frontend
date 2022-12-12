<template>
  <div id="home">
    <div class="logo">
      <img src="../assets/logo@2x.png" alt="logo" />
    </div>
    <div class="heading">
      <h1 class="title">
        郵便物の登録方法を <br />
        選択してください
      </h1>
    </div>
    <div class="home-form container-fluid">
      <div class="custom-radio">
        <b-field>
          <b-radio-button
            v-model="search_param"
            @input="getSearchParam"
            native-value="search-by-ocr"
          >
            <img
              class="icon"
              src="../assets/icons/camera-o.png"
              width="60"
              height="60"
              alt="icon"
            />
            <span class="btn-txt">写真撮影で登録</span>
          </b-radio-button>

          <b-radio-button
            v-model="search_param"
            @input="getSearchParam"
            native-value="search-by-id"
          >
            <img
              class="icon icon-number"
              src="../assets/icons/number.png"
              width="60"
              height="36"
              alt="icon"
            />
            <span class="btn-txt">ID検索で登録</span>
          </b-radio-button>
        </b-field>
      </div>
    </div>
    <div class="footer">
      <div class="buttons">
        <b-button @click="logout" class="btn-white" expanded
          >業務終了（ログアウト）</b-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import { showToastMessage } from "../utils/message";
export default {
  data() {
    return {
      search_param: "",
    };
  },
  methods: {
    getSearchParam() {
      if (this.search_param == "search-by-id") {
        // if oparetor select search by id
        this.refreshStore();
        this.$store.dispatch("global/setSearchBy", "id");
        this.$router.push("/search-by-id");
      } else {
        // if oparator select search by ocr
        this.refreshStore();
        this.$store.dispatch("global/setSearchBy", "ocr");
        this.$router.push("/capture-ocr-image");
      }
    },
    // oparator logout
    logout() {
      this.$store.dispatch("user/logout").then(() => {
        this.$router.push("/login");
        this.refreshStore();
      });
      // showToastMessage('Logout Successful', "is-success")
    },
    // refresh oparetor selected things from store
    refreshStore() {
      this.$store.dispatch("global/refreshGlobalStore");
      this.$store.dispatch("customer/refreshCustomerStore");
    },
  },
};
</script>

<style scoped>
.logo {
  padding-top: 56px;
  padding-bottom: 25px;
  text-align: center;
  border-bottom: 1px solid #cbcfd6;
}
.logo img {
  width: 201px !important;
}

.heading {
  padding: 26px 0px;
  margin-bottom: 0;
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
.home-form {
  /* border-bottom: 1px solid #CBCFD6; */
  padding-bottom: 200px;
}
.buttons {
  /* padding: 25px 0px; */
  margin-bottom: 0;
}
.icon {
  margin-right: 20px !important;
}

.btn-txt {
  font-weight: 600;
  font-size: 24px;
  line-height: 36px;
  text-align: center;
  color: #e94719;
}
img.icon-number {
  height: 18px !important;
}
</style>