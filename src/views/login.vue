<template>
  <div id="login-page">
    <div class="container-fluid">
      <div class="logo">
        <img src="../assets/logo@2x.png" alt="logo" />
      </div>
      <h1 class="title">ログイン</h1>
      <div class="login-form">
        <b-field label="ユーザーID" :message="usenameError" type="is-danger">
          <b-input
            @input="getUsernameError"
            @blur="getUsernameError"
            type="text"
            v-model="loginData.userid"
            required
            placeholder="userid"
          >
          </b-input>
        </b-field>
        <b-field label="パスワード" :message="pwError" type="is-danger">
          <b-input
            @input="getUPWError"
            @blur="getUPWError"
            placeholder="password"
            v-model="loginData.password"
            required
            type="password"
          >
          </b-input>
        </b-field>
      </div>
      <div class="buttons">
        <b-button
          @click="onSubmit"
          :class="
            loginData.userid && loginData.password ? 'btn-orange' : 'btn-gray'
          "
          expanded
          :disabled="!loginData.userid || !loginData.password"
          >ログインする</b-button
        >
      </div>
    </div>

    <b-loading
      :is-full-page="isFullPage"
      v-model="isLoading"
      :can-cancel="false"
    ></b-loading>
  </div>
</template>

<script>
import { showToastMessage } from "../utils/message";
export default {
  name: "Login",
  data() {
    return {
      show: false,
      isFullPage: true,
      isLoading: false,
      usenameError: "",
      pwError: "",
      loginData: {
        userid: "",
        password: "",
      },
    };
  },
  created() {
    // redirect set-initial page if user is loged in any try to access login page
    if (this.$store.state.user.token) {
      this.$router.push("/set-initial");
    }
  },
  methods: {
    // show error message if user forget or do not enter userid
    getUsernameError(val) {
      if (!this.loginData.userid || val === null) {
        this.usenameError = "ユーザーIDを入力してください。";
      } else {
        this.usenameError = "";
      }
    },
    // show error message if user forget or do not enter password
    getUPWError(val) {
      if (!this.loginData.password || val === null) {
        this.pwError = "パスワードを入力して下さい";
      } else {
        this.pwError = "";
      }
    },
    // submit for login
    async onSubmit() {
      if (this.loginData.userid && this.loginData.password) {
        this.isLoading = true;
        await this.$store
          .dispatch("user/login", this.loginData)
          .then((response) => {
            if (response && response.status_code == 200) {
              location.href = "/set-initial";
            }
            this.isLoading = false;
          })
          .catch((error) => {
            this.isLoading = false;
            showToastMessage(
              error.message ? error.message : error.response.data.message,
              "is-danger"
            );
          });
      } else {
        this.isLoading = false;
        showToastMessage(
          "ユーザーIDとパスワードを入力してください。",
          "is-danger"
        );
      }
    },
  },
};
</script>

<style scoped>
.logo {
  padding: 70px 0 65px 0;
  text-align: center;
}
.logo img {
  width: 275px;
}

.title {
  font-weight: 600;
  font-size: 32px;
  line-height: 48px;
  color: #e94719;
  text-align: center;
  padding-bottom: 60px;
  margin-bottom: 0;
}
</style>