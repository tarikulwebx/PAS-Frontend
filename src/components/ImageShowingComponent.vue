<template>
  <div id="show-image-modal">
    <div class="modal-card show-modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">写真確認</p>
        <button type="button" @click="$emit('close')" class="delete" />
      </header>
      <section class="modal-card-body my-card-body">
        <div class="custom-indicator">
          <div
            v-if="items.length > 1"
            :class="`icon-left ${carousel > 0 ? 'arrow-dark' : 'arrow-gray'}`"
          >
            <img
              @click="prev"
              src="../assets/icons/left-arrow.png"
              alt="image"
            />
          </div>
          <div class="page-indecator">
            {{ carousel + 1 }}/ {{ items.length }}
          </div>
          <div
            v-if="items.length > 1"
            :class="`icon-left ${
              carousel < items.length - 1 ? 'arrow-dark' : 'arrow-gray'
            }`"
          >
            <img
              @click="next"
              src="../assets/icons/right-arrow.png"
              alt="image"
            />
          </div>
        </div>
        <b-carousel
          v-model="carousel"
          :has-drag="drag"
          :autoplay="autoPlay"
          :indicator-inside="false"
          :indicator="indicator"
          class="carousel-img"
          @click="hideZoomInstration"
        >
          <b-carousel-item v-for="(item, i) in items" :key="i">
            <pinch-scroll-zoom
              ref="zoomer"
              :scale="1"
              :height="414"
              :width="414"
            >
              <b-image
                class="image"
                :src="item.image"
                style="height: 414px"
              ></b-image>
            </pinch-scroll-zoom>
          </b-carousel-item>
          <img
            v-if="$store.state.user.zoomInstration"
            src="../assets/pic-gesture.png"
            alt="image"
            class="zoom"
          />
        </b-carousel>
      </section>
      <footer class="modal-card-foot">
        <b-button class="close" @click="$emit('close')" label="もどる" />
        <b-button
          :disabled="currentItem.type === 'ocr'"
          class="confirm-delete"
          @click="openDeleteModal"
        >
          <span class="btn-txt">削除します</span>
        </b-button>
      </footer>
    </div>
    <b-modal
      v-model="openImageDeleteModal"
      has-modal-card
      animation="slide-fade-down"
      :can-cancel="false"
    >
      <delete-image-modal-component
        :item="currentItem"
        @close="close"
        @deleteImage="deleteImage"
      />
    </b-modal>
  </div>
</template>

<script>
import { setZoomInstraction, getZoomInstraction } from "@/utils/zoom";
import DeleteImageModalComponent from "@/components/DeleteImageModalComponent.vue";
import PinchZoom from "vue-pinch-zoom";
import PinchScrollZoom from "@coddicat/vue-pinch-scroll-zoom";
export default {
  props: ["item", "items"],
  components: {
    DeleteImageModalComponent,
    PinchZoom,
    PinchScrollZoom,
  },
  data() {
    return {
      indicator: false,
      drag: false,
      indicatorInside: true,
      carousel: 0,
      autoPlay: false,
      openImageDeleteModal: false,
      currentItem: {},
    };
  },
  mounted() {
    this.carousel = this.items.indexOf(this.item);
    this.currentItem = this.item;
    setTimeout(() => {
      this.setZoomInstraction();
    }, 5000);
  },
  methods: {
    // open modal
    openDeleteModal() {
      this.openImageDeleteModal = true;
    },
    // image delete function
    deleteImage(item) {
      this.$emit("deleteImage", item);
    },
    // go to previous image
    prev() {
      if (this.carousel > 0) {
        this.carousel--;
        this.currentItem = this.items[this.carousel];
      }
    },
    // goto next image
    next() {
      if (this.carousel < this.items.length - 1) {
        this.carousel++;
        this.currentItem = this.items[this.carousel];
      }
    },
    // zoom instraction icon showing function
    setZoomInstraction() {
      this.$store.state.user.zoomInstration = false;
      setZoomInstraction(false);
    },
    // open or hide zoom icon
    hideZoomInstration() {
      this.setZoomInstraction();
    },
    // modal close
    close() {
      this.openImageDeleteModal = false;
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
  color: #121723;
}
.card-body-text {
  font-weight: 300;
  font-size: 16px;
  line-height: 24px;
  color: #121723;
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
.carousel-item {
  display: block;
}

.custom-indicator {
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: space-around;
  align-items: center;
  padding: 20px;
}
.icon-left,
.icon-right {
  width: 32px;
  height: 32px;
  border: 1px solid #ffffff;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.arrow-dark {
  background: #121723;
}
.arrow-gray {
  background: #cbcfd6;
}

.carousel.carousel-img {
  position: relative;
}

img.zoom {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, 50%);
}

.page-indecator {
  font-size: 20px;
  font-weight: 600;
}
</style>