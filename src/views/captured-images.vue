<template>
  <div id="captured-images">
    <head-component
      :backBtnTxt="backBtnTxt"
      :title="headerTitle"
      :prevPage="searchedBy === 'id' ? '/search-by-id' : '/ocr-search-result'"
    />
    <div class="content">
      <div class="txt-div">
        <div class="txt-content">
          <h1 class="title" v-html="title"></h1>
        </div>
      </div>
      <div class="camera">
        <camera-component ref="cameraComp" @photoTaken="photoTaken" />
      </div>
      <div class="captured-image-list" id="captured-image-list">
        <div>
          <b-carousel
            v-model="carousel"
            with-carousel-list
            :autoplay="false"
            indicator-custom
            :indicator-inside="false"
            :overlay="gallery"
            id="main"
          >
            <b-carousel-item
              v-for="(item, i) in items.length > demoImageNumber
                ? items
                : demoImageNumber"
              :key="i"
            >
              <a class="image">
                <img :src="item.image" alt="image" />
              </a>
            </b-carousel-item>

            <template #indicators="props">
              <div class="carousel-slides" :draggable="true">
                <figure
                  class="al image carousel-slide"
                  as-indicator
                  v-bind="al"
                >
                  <img
                    @click="viewImage(items[props.i])"
                    class="indecator-image"
                    :src="items[props.i] ? items[props.i].image : demo"
                    :title="props.i"
                  />
                  <img
                    v-if="items[props.i] && items[props.i].type !== 'ocr'"
                    @click="openDeleteImageModal(items[props.i])"
                    class="delete-icon"
                    src="../assets/icons/delete.png"
                    style="width: 28px; height: 28px"
                    alt="icon"
                  />
                </figure>
              </div>
            </template>
          </b-carousel>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="buttons">
        <b-button class="btn-orange capture" @click="TakePhoto">
          <img
            class="cam-icon"
            src="../assets/icons/camera.png"
            alt="icon"
            width="30"
            height="22"
          />
          <span>撮影する</span>
        </b-button>
        <b-button
          @click="goNext"
          :disabled="!isCapturedDoc"
          :class="!isCapturedDoc ? 'btn-white next' : 'btn-orange next'"
        >
          <span class="btn-txt">次へ</span>
        </b-button>
      </div>
    </div>

    <b-modal
      v-model="openImageDeleteModal"
      has-modal-card
      animation="slide-fade-down"
      :can-cancel="false"
    >
      <delete-image-modal-component
        :item="selectedItem"
        @close="close"
        @deleteImage="deleteImage"
      />
    </b-modal>

    <b-modal
      v-model="viewImageModal"
      has-modal-card
      full-screen
      animation="slide-fade-down"
      :can-cancel="false"
    >
      <image-showing-component
        :items="items"
        :item="selectedItem"
        @deleteImage="deleteImage"
        @close="close"
      />
    </b-modal>
  </div>
</template>

<script>
import HeadComponent from "@/components/HeaderComponent.vue";
import CameraComponent from "@/components/CameraComponent.vue";
import DeleteImageModalComponent from "@/components/DeleteImageModalComponent.vue";
import ImageShowingComponent from "@/components/ImageShowingComponent.vue";
import { showToastMessage } from "../utils/message";

export default {
  components: {
    HeadComponent,
    CameraComponent,
    DeleteImageModalComponent,
    ImageShowingComponent,
  },
  data() {
    return {
      totalScrollWidth: 0,
      showDemoSection: true,
      title: "",
      gallery: false,
      demoImageNumber: 3,
      carousel: 0,
      al: {
        hasGrayscale: false,
        itemsToShow: 2.5,
      },
      imageIndex: 3,
      backBtnTxt: "検索結果",
      headerTitle: "写真追加",
      items: [],
      elements: [],
      openImageDeleteModal: false,
      selectedItemForDelete: "",
      viewImageModal: false,
      selectedItem: {},
      selectedIndex: "",
      tracks: [],
      isCapturedDoc: false,
      searchedBy: "",
      settings: {
        focusOnSelect: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        speed: 500,
      },
      demo: "data:image/png;base64,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",
    };
  },
  mounted() {
    // if oparetor take ocr image before it shows as first element in the images slider by default
    if (this.$store.state.global.capturedImages.length > 0) {
      this.items = this.$store.state.global.capturedImages;
      if (this.items.length < 2) {
        this.demoImageNumber = this.items.length + 2;
      } else {
        this.demoImageNumber = this.items.length + 1;
      }
    } else if (
      this.$store.state.global.capturedImages.length > 0 &&
      this.$store.state.global.capturedImages[0].type === "ocr"
    ) {
      this.items.push(this.$store.state.global.capturedImages[0]);
    }
    // for showing 3 placeholder image
    if (this.items.length >= this.demoImageNumber) {
      this.demoImageNumber = this.items.length;
    }
    // get what oparator select from the home screen search by id or search by ocr
    if (this.$store.state.global.userSelections) {
      this.searchedBy = this.$store.state.global.userSelections.searchBy;
    }
    // get document image captured or not
    this.docImageCaptured();
    // showing defferent text based on oparator selection from home screen
    if (this.$store.state.global.userSelections.searchBy === "id") {
      this.title = `全体や裏面などの写真を <br> 追加しましょう`;
    } else {
      this.title = `全体の写真など <br> 追加しましょう`;
    }
  },
  methods: {
    // image capture function
    TakePhoto() {
      this.$refs.cameraComp.TakePhoto();
      this.showDemoSection = true;
    },
    // if any document photo captured
    async photoTaken() {
      this.items = this.$store.state.global.capturedImages;
      this.docImageCaptured();
      if (this.items.length >= this.demoImageNumber) {
        this.demoImageNumber += 1; // add placeholder image as last element
        this.carousel++;
      }
      setTimeout(() => {
        this.autoScroll();
      }, -10);
    },
    autoScroll() {
      let itemWidth = 145;
      let main = document.querySelector(".carousel-indicator");
      if (this.items.length > 2) {
        this.totalScrollWidth = this.items.length * itemWidth;
      }
      main.scrollLeft = this.totalScrollWidth;
    },
    // shownig image delete modal
    openDeleteImageModal(item) {
      this.getSelectedItem(item);
      this.openImageDeleteModal = true;
    },
    // image delete function
    deleteImage(item) {
      this.getSelectedItem(item);
      if (item.type === "doc") {
        this.items.splice(this.selectedIndex, 1);
        this.items = this.$store.state.global.capturedImages;
        if (this.demoImageNumber > 3) {
          this.demoImageNumber -= 1;
        }
      }
      this.close();
      this.docImageCaptured();
    },
    // get selected image for image preview
    getSelectedItem(item) {
      let index = this.items.indexOf(item);
      if (index > -1) {
        this.selectedItem = item;
        this.selectedIndex = index;
      } else {
        this.selectedIndex = -1;
      }
    },
    // close modal
    close() {
      this.openImageDeleteModal = false;
      this.viewImageModal = false;
    },
    // image preview modal
    viewImage(item) {
      this.getSelectedItem(item);
      if (this.selectedIndex !== -1) {
        this.viewImageModal = true;
      }
    },
    // any document image captured or not. this is for validation
    docImageCaptured() {
      let doc = this.items.find(
        (item) => item.type === "doc" || item.type === "ocr"
      );
      if (doc) {
        this.isCapturedDoc = true;
      } else {
        this.isCapturedDoc = false;
      }
    },
    // go to the registration page
    goNext() {
      if (this.isCapturedDoc) {
        this.$router.push("/register-input");
      } else {
        showToastMessage("郵便物の写真を追加して下さい。", "is-danger");
      }
    },
  },
};
</script>

<style scoped>
.txt-div {
  background-color: #000000;
}
.txt-content {
  padding: 12px 0px;
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

.captured-image-list {
  width: 100%;
  height: 100%;
  /* overflow-x: scroll; */
  /* margin-bottom: 25px; */
}

#captured-images #main .carousel-items {
  height: 300px !important;
  display: none;
}
.photo-button-container {
  z-index: 1000 !important;
}
/* #captured-images .carousel-slide {
  width: 80px;
  height: 100px;
} */
.cam-icon {
  margin-right: 15px;
}
.button.button.capture {
  width: calc(63% - 2rem);
  margin-right: 2rem;
}
.button.next {
  width: 37%;
}
.button.button.btn-orange.next {
  background: #ffffff;
  border: 1px solid #e94719;
  color: #e94719;
}
.button.button.btn-orange.next .btn-txt {
  color: #e94719;
}
img.indecator-image {
  position: relative;
  width: 100%;
}
img.delete-icon {
  position: absolute;
  top: -8%;
  right: -8%;
  cursor: pointer;
}
.demo-carousel-slides {
  width: 106%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 19px 0px;
  margin-left: 19px;
}
.content figure:not(:last-child) {
  margin: 0em !important;
}
.content figure:not(:first-child) {
  margin-top: 0em !important;
}
.content figure:not(:last-child) {
  margin-right: 1rem !important;
}
</style>