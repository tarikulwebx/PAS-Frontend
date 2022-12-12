<template>
  <div id="ocr-search-condition" class="modal-card" style="width: auto">
    <header class="modal-card-head" style="padding-top: 40px">
      <p class="modal-card-title">検索条件の変更</p>
      <button type="button" class="delete" @click="checkSearchCondition" />
    </header>
    <section class="modal-card-body" style="padding: 0">
      <div class="img-div">
        <img
          class="video"
          id="img_prev"
          :src="
            $store.state.global.capturedImages.length > 0
              ? $store.state.global.capturedImages[0].image
              : ''
          "
        />
        <div
          v-for="(text, index) in ocrResponseElements"
          :key="index"
          :style="{
            top: text.y1 + 'px',
            left: text.x1 + 'px',
            width: text.x2 - text.x1 + 'px',
            height: text.y2 - text.y1 + 'px',
          }"
          :class="text.selected ? 'colored-shed' : 'gray-shed'"
          @click="getSelectedElement(text)"
        ></div>
        <!-- <div v-for="(text, index) in ocrResponseElements" :key="index" :style="{top: (text.y1 + ((text.y1 * 9) /100))+'px', left: (text.x1 + ((text.x1 * 9) / 100))+'px', width: ((text.x2 + ((text.x2 * 9) /100))-(text.x1 + ((text.x1 * 9) /100)))+'px', height: ((text.y2 + ((text.y2 * 9) /100))-(text.y1 + ((text.y1 * 9) /100)))+'px' }" :class="text.selected ? 'colored-shed' : 'gray-shed'" @click="getSelectedElement(text)"></div> -->
      </div>
      <div style="padding: 0px 20px 20px">
        <b-field label="検索キーワード">
          <b-input
            v-model="searchCondition.search"
            maxlength="200"
            type="textarea"
          ></b-input>
        </b-field>
        <b-checkbox
          v-model="searchCondition.corporation"
          @input="getCorporationSearchCondition"
          native-value="true"
          :class="searchCondition.corporation ? 'color-text' : ''"
        >
          法人名/屋号
        </b-checkbox>
        <br />
        <b-checkbox
          v-model="searchCondition.personal"
          @input="getPersonalSearchCondition"
          native-value="true"
          :class="searchCondition.personal ? 'color-text' : ''"
        >
          個人名
        </b-checkbox>
        <br />
        <b-field label="拠点" v-if="searchCondition.ContractStore">
          <b-select v-model="searchCondition.ContractStore" expanded>
            <option
              v-for="option in ContractStores"
              :value="option.id"
              :key="option.id"
            >
              {{ option.name }}
            </option>
          </b-select>
        </b-field>
      </div>
    </section>
    <footer class="modal-card-foot">
      <div class="buttons">
        <b-button
          @click="searchAgain"
          :disabled="
            !searchCondition.search ||
            (!this.searchCondition.personal &&
              !this.searchCondition.corporation)
          "
          :class="searchCondition.search ? 'btn-orange' : 'btn-gray'"
          expanded
          >この条件で探す</b-button
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
import camera from "./Camera.vue";
import AlartShowingModelComponent from "./AlartShowingModelComponent.vue";
import { showToastMessage } from "../utils/message";
export default {
  // props: ["searchCondition"],
  components: {
    camera,
    AlartShowingModelComponent,
  },
  data() {
    return {
      ContractStores: [],
      searchCondition: {},
      ocrResponseElements: [],
      ocrResponseSelectedElements: [],
      isComponentModalActive: false,
      modalTitleText: "検索条件の変更",
      modalBodyText: "検索条件の変更を中断しますか？",
      newlySelectedElement: [],
    };
  },
  mounted() {
    this.getSelectedContractStore();
  },
  methods: {
    // get initial and default values
    getSelectedContractStore() {
      this.searchCondition = {
        search: this.$store.state.customer.openSearchQuery.search,
        corporation:
          this.$store.state.customer.openSearchQuery.corporation === 1
            ? true
            : false,
        personal:
          this.$store.state.customer.openSearchQuery.personal === 1
            ? true
            : false,
        ContractStore: this.$store.state.customer.openSearchQuery.ContractStore,
      };
      this.ContractStores = this.$store.state.global.ContractStores;
      this.ocrResponseElements = this.$store.state.customer.ocrResponseElements;
      this.ocrResponseSelectedElements =
        this.$store.state.customer.ocrResponseSelectedElements;
    },
    // get and set corporation search condition
    getCorporationSearchCondition() {
      if (this.searchCondition.corporation) {
        this.searchCondition.corporation = 1;
      } else {
        this.searchCondition.corporation = 0;
      }
    },
    // get and set personal search condition
    getPersonalSearchCondition() {
      if (this.searchCondition.personal) {
        this.searchCondition.personal = 1;
      } else {
        this.searchCondition.personal = 0;
      }
    },
    // get and set search conditions
    async getSelectedElement(element) {
      let textExsists =
        this.$store.state.customer.ocrResponseSelectedElements.find(
          (item) => item.id === element.id
        );
      if (textExsists) {
        textExsists.selected = false;
        element.selected = false;
        await this.$store.state.customer.ocrResponseSelectedElements.splice(
          this.$store.state.customer.ocrResponseSelectedElements.indexOf(
            textExsists
          ),
          1
        );
        if (this.newlySelectedElement.length > 0) {
          this.newlySelectedElement.splice(
            this.newlySelectedElement.indexOf(textExsists),
            1
          );
        }
      } else {
        element.selected = true;
        await this.$store.dispatch(
          "customer/setOCRResponseSelectedElements",
          element
        );
        this.newlySelectedElement.push(element);
      }
      let SearchText = "";
      this.$store.state.customer.ocrResponseSelectedElements.forEach((text) => {
        SearchText += " " + text.text;
      });
      this.searchCondition.search = SearchText;
    },
    // generate image with bounding box for save backend
    generateImage() {
      let imgPrev = document.getElementById("img_prev");
      var canvas = document.createElement("canvas");
      var context = canvas.getContext("2d");
      canvas.setAttribute("width", 500);
      canvas.setAttribute("height", 500);
      context.drawImage(imgPrev, 0, 0, 500, 500);
      this.$store.state.customer.ocrResponseElements.forEach(
        (element, index) => {
          context.beginPath();
          context.rect(
            element.x1 / 0.828,
            element.y1 / 0.828,
            element.x2 / 0.828 - element.x1 / 0.828,
            element.y2 / 0.828 - element.y1 / 0.828
          );
          if (element.selected) {
            context.fillStyle = "rgba(14, 177, 232, 0.4)";
            context.fill();
            context.strokeStyle = "#0EB1E8";
            context.stroke();
          } else {
            context.fillStyle = "rgba(255, 255, 255, 0.2)";
            context.fill();
            context.strokeStyle = "#fff";
            context.stroke();
          }
        }
      );
      let dataURL = canvas.toDataURL("image/jpeg");
      this.$store.dispatch("customer/setBoundingBoxImage", dataURL);
    },
    // check search condition
    checkSearchCondition() {
      if (
        this.searchCondition.search !=
          this.$store.state.customer.openSearchQuery.search ||
        this.searchCondition.corporation !=
          this.$store.state.customer.openSearchQuery.corporation ||
        this.searchCondition.personal !=
          this.$store.state.customer.openSearchQuery.personal ||
        this.searchCondition.ContractStore !=
          this.$store.state.customer.openSearchQuery.ContractStore
      ) {
        this.isComponentModalActive = true;
      } else {
        this.closeParent();
      }
    },
    // modal close
    close() {
      this.isComponentModalActive = false;
    },
    // close parent modal
    closeParent() {
      if (this.newlySelectedElement.length > 0) {
        this.newlySelectedElement.forEach((element) => {
          let el = this.$store.state.customer.ocrResponseElements.find(
            (item) => item.id === element.id
          );
          if (el) {
            el.selected = false;
          }
        });
      }
      this.$emit("close");
    },
    // re-search function
    searchAgain() {
      if (this.searchCondition.search) {
        this.generateImage();
        this.$store.dispatch("customer/setOpenSearchQuery", {
          name: "search",
          value: this.searchCondition.search,
        });
      }
      // if(this.searchCondition.corporation){
      this.$store.dispatch("customer/setOpenSearchQuery", {
        name: "corporation",
        value: this.searchCondition.corporation ? 1 : 0,
      });
      // }
      // if(this.searchCondition.personal){

      this.$store.dispatch("customer/setOpenSearchQuery", {
        name: "personal",
        value: this.searchCondition.personal ? 1 : 0,
      });
      // }
      if (this.searchCondition.ContractStore) {
        this.$store.dispatch("customer/setOpenSearchQuery", {
          name: "ContractStore",
          value: this.searchCondition.ContractStore,
        });
      }

      if (!this.searchCondition.personal && !this.searchCondition.corporation) {
        this.isComponentModalActive = false;
        showToastMessage(
          "検索対象を少なくとも1つ選択してください",
          "is-danger"
        );
      } else {
        this.$emit("searchAgain");
      }
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

.color-text {
  color: #e94719 !important;
}
span.control-label {
  font-size: 20px;
  font-weight: 300;
}
.img-div {
  margin: 0 auto;
  height: 414px;
  width: 414px;
  background: #000;
}
span.control-label {
  font-weight: 300;
  font-size: 20px;
  line-height: 30px;
}
img.video {
  position: relative !important;
  height: 100%;
  width: 100%;
}
.gray-shed {
  position: absolute;
  background: rgba(255, 255, 255, 0.4);
  border: 1px solid #ffffff;
}
.colored-shed {
  position: absolute;
  background: rgba(14, 177, 232, 0.4);
  border: 1px solid #0eb1e8;
}
</style>