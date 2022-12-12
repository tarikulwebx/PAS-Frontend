<template>
  <div id="capture">
    <head-component
      :backBtnTxt="backBtnTxt"
      :title="headerTitle"
      @captureAgain="captureAgain"
      :prevPage="isOcrImageCapture ? '/capture-ocr-image' : '/'"
    />
    <div class="content">
      <div class="txt-div">
        <div class="txt-content">
          <h1 class="title">{{ titleOne }}</h1>
          <h1 class="title">{{ titleTwo }}</h1>
        </div>
      </div>
      <!-- {{ photos.length }} -->
      <div class="camera">
        <camera
          ref="camera"
          @getPhoto="getPhoto"
          @getText="getText"
          @captureAgain="captureAgain"
        />
        <img
          v-if="showOverlay"
          class="photo"
          src="../assets/Union.png"
          alt="image"
        />
      </div>
      <div class="capture-sample container" v-if="showInstructions">
        <p>青ラインの当て方</p>
        <img
          class="sample"
          src="../assets/yokogaki.png"
          width="90px"
          height="103px"
          alt="sample"
        />
        <img
          class="sample"
          src="../assets/tategaki.png"
          width="105px"
          height="92px"
          alt="sample"
        />
      </div>
      <div class="container-fluid ocr-container" v-if="showTextArea">
        <div class="ocr-text-area">
          <b-field>
            <b-input
              v-model="SearchText"
              maxlength="200"
              type="textarea"
            ></b-input>
          </b-field>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="buttons">
        <b-button
          v-if="showInstructions"
          @click="TakePhoto"
          class="btn-orange"
          expanded
        >
          <img
            class="icon"
            src="../assets/icons/camera.png"
            height="22px"
            width="30px"
            alt="icon"
          />
          <span>撮影する</span>
        </b-button>
        <b-button
          v-if="showTextArea"
          @click="getUsers"
          :disabled="!SearchText"
          :class="SearchText ? 'btn-orange' : 'btn-gray'"
          expanded
        >
          <img
            class="search-icon"
            src="../assets/icons/search.png"
            alt="icon"
          />
          <span>検索する</span>
        </b-button>
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
import camera from "../components/Camera.vue";
import HeadComponent from "@/components/HeaderComponent.vue";
import { showToastMessage } from "../utils/message";
import { getUserInitialStore } from "../utils/auth";
export default {
  components: {
    camera,
    HeadComponent,
  },
  data() {
    return {
      photos: [],
      titleOne: "青ラインに検索対象を重ねて",
      titleTwo: "撮影してください",
      backBtnTxt: "",
      headerTitle: "宛先の撮影",
      isLoading: false,
      isFullPage: true,
      showInstructions: true,
      showTextArea: false,
      showOverlay: true,
      SearchText: "",
      isOcrImageCapture: false,
      selectedTexts: [],
    };
  },
  methods: {
    // after take photo some texts are changed and some properties values are changed
    TakePhoto() {
      this.backBtnTxt = "再撮影";
      this.headerTitle = "検索対象の指定";
      this.titleOne = "検索対象を選択してください。";
      this.titleTwo = "複数選択できます。";
      this.showInstructions = false;
      this.showTextArea = true;
      this.showOverlay = false;
      this.$refs.camera.TakePhoto();
      this.isOcrImageCapture = true;
      this.SearchText = "";
      // this.isLoading = false;
    },
    // latest captured image push on photos array for making all photos array
    getPhoto(photo) {
      this.photos.push(photo);
    },
    // get text from array which texts are selected by oparetor for search
    getText(texts) {
      let SearchText = "";
      // sort array by index to find out which text in assending order
      let txts = texts.sort((a, b) => {
        return a.id - b.id;
      });
      // making search string from selected texts
      txts.forEach((text) => {
        SearchText += " " + text.text;
      });
      this.SearchText = SearchText;
    },
    // get customers by oparator selected search texts from bounding box
    async getUsers() {
      if (!getUserInitialStore()) {
        showToastMessage(
          "初期設定画面へ戻り、拠点を選択しなおしてください。",
          "is-danger"
        );
      } else {
        if (this.SearchText) {
          this.isLoading = true;
          this.$refs.camera.generateImage();
          let query = {
            name: "search",
            value: this.SearchText,
          };
          await this.$store.dispatch("customer/setOpenSearchQuery", query);
          this.$store.dispatch("customer/setOpenSearchQuery", {
            name: "ContractStore",
            value: parseInt(getUserInitialStore()),
          });
          this.$store.dispatch("customer/setOpenSearchQuery", {
            name: "personal",
            value: 1,
          });
          this.$store.dispatch("customer/setOpenSearchQuery", {
            name: "corporation",
            value: 1,
          });
          await this.$store
            .dispatch("customer/getCustomersByOpenSearch")
            .then((response) => {
              this.isLoading = false;
              this.$router.push("/ocr-search-result");
              if (response.length > 0) {
                this.getTopFiveCustomers(response);
              }
            })
            .catch((error) => {
              this.isLoading = false;
              showToastMessage(error.message, "is-danger");
            });
        }
      }
    },
    // get top 5 customers from the openSearch response for save on backend
    getTopFiveCustomers(data) {
      let i = 0;
      let topFive = [];
      for (i = 0; i < 5; i++) {
        if (data[i]) {
          topFive.push(data[i]);
        }
      }
      this.$store.dispatch("customer/setTopFiveCustomers", topFive);
    },
    // if oparator press back button it make the UI same as before photo capture
    captureAgain() {
      this.backBtnTxt = "";
      this.headerTitle = "宛先の撮影";
      this.titleOne = "青ラインに検索対象を重ねて";
      this.titleTwo = "撮影してください";
      this.showInstructions = true;
      this.showTextArea = false;
      this.showOverlay = true;
      this.isOcrImageCapture = false;
      this.$refs.camera.ReTakePhoto();
    },
  },
};
</script>

<style scoped>
#capture {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
}
.content {
  flex: 1 0 auto;
}
.txt-div {
  background-color: #121723;
}
.txt-content {
  padding: 10px 0px;
  width: 280px;
  margin: 0 auto;
  text-align: center;
}
.title {
  font-weight: 600;
  font-size: 20px;
  line-height: 170%;
  text-align: center;
  color: #ffffff;
}
.txt-content h1:not(:first-child) {
  margin-top: 0 !important;
}
.title:not(:last-child) {
  margin-bottom: 0 !important;
}
.content p:not(:last-child) {
  margin-bottom: 0 !important;
}

.camera {
  margin: 0 auto;
  position: relative;
}
img.photo {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
}
.capture-sample {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-content: center;
  justify-content: space-around;
  align-items: center;
  /* border-bottom: 1px solid #cbcfd6; */
  padding: 16px 0px 16px 0px;
}
.capture-sample p {
  font-weight: 600;
  font-size: 16px;
  line-height: 170%;
  display: flex;
  align-items: center;
  color: #000000;
}
.bottom-container {
  padding: 20px 0px;
}
.button .icon {
  height: 25px;
  width: 32px;
  margin-right: 10px;
}
.button .search-icon {
  height: 25px;
  width: 25px;
  margin-right: 10px;
}
.buttons .button span {
  font-weight: 600;
  font-size: 20px;
  line-height: 30px;
  color: #ffffff;
}
.ocr-text-area {
  padding: 13px 0px 20px 0px;
}
.ocr-text-area .field {
  padding-bottom: 0px !important;
  background: #ffffff;
  border: 1px solid #cbcfd6;
  border-radius: 4px;
}
</style>