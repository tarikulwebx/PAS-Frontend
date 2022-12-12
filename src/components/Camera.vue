<template>
  <div class="camera-comp">
    
    <video
      v-show="!photo"
      class="video"
      :class="facingMode === 'user' ? 'front' : ''"
      ref="video"
    />
    <div v-show="isShowCanvas" class="canvas">
      <canvas ref="canva" />
    </div>
    <div id="image_text" v-if="photo">
      <img
        v-if="photo"
        :src="photo"
        alt="photo"
        id="img_prev"
        class="cap-photo"
      />
      <div
        v-show="photo && $store.state.customer.ocrResponseElements.length > 0"
        v-for="(text, index) in $store.state.customer.ocrResponseElements"
        :key="index"
        :style="{
          top: text.y1 + 'px',
          left: text.x1 + 'px',
          width: text.x2 - text.x1 + 'px',
          height: text.y2 - text.y1 + 'px',
        }"
        :class="
          text.selected ? 'colored-shed bounding-box' : 'gray-shed bounding-box'
        "
        @click="getSelectedElement(text)"
      ></div>
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
  components: {},
  data() {
    return {
      isShowCanvas: false,
      photo: null,
      image: null,
      mediaStream: null,
      videoDevices: [],
      facingMode: "environment",
      counter: 0,
      switchingCamera: false,
      canva: null,
      selectedTexts: [],
      isFullPage: true,
      isLoading: false,
      reducedSize: 0,
      start: 0,
      end: 0,
      getOcrStart: 0,
      frontImgRes: 0,
      delayTime: 3000,
      count: 0,
      checkRes:0,
    
    };
  },
  mounted() {
    this.openCamera();
  },
  beforeDestroy() {
    this.closeCamera();
  },
  methods: {
    // open camera for taking pic
    async openCamera() {
      const devices = await navigator.mediaDevices.enumerateDevices();
      this.videoDevices = devices.filter((d) => d.kind === "videoinput");
      await this.StartRecording("environment");
    },
    // camera settings
    async StartRecording(facingMode) {
      this.facingMode = facingMode;
      let video = this.$refs.video;
      video.setAttribute("autoplay", "");
      video.setAttribute("muted", "");
      video.setAttribute("playsinline", "");
      this.mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: facingMode, width: 500, height: 500 },
        audio: false,
      });
      video.srcObject = this.mediaStream;
      return await video.play();
    },
    // re-open camera
    ReTakePhoto() {
      this.photo = null;
      this.openCamera();
    },
    // capture image and send it to the OCR
    async TakePhoto() {
      
      let video = this.$refs.video;
      this.canva = this.$refs.canva;

      let width = video.videoWidth;
      let height = video.videoHeight;
      this.canva.width = width;
      this.canva.height = height;
      let ctx = this.canva.getContext("2d");
      if (this.facingMode === "user") {
        ctx.scale(-1, 1);
        ctx.drawImage(video, 0, 0, width, height);
      } else {
        ctx.drawImage(video, 0, 0, width, height);
      }
      ctx.save();

      this.photo = this.canva.toDataURL("image/jpeg");
      //console.log(this.photo);
      this.closeCamera();
      this.start = new Date().getTime();
      this.Send();
    },

    // close camera
    closeCamera() {
      // // kill camrea after capture
      let video = this.$refs.video;
      const mediaStream = video.srcObject;
      if (mediaStream) {
        const tracks = mediaStream.getTracks();
        tracks[0].stop();
        tracks.forEach((track) => track.stop());
      }
    },

    /**
     * with schuldel, we can get the selected text from the image
     * code start here
     */
    async Send() {
      
      this.isLoading = true;
      let formData = new FormData();
      formData.append("awsInstance", "t2 samll");
      formData.append("image", this.photo);
      
      let start = new Date().getTime();

      // this function request to the backend api and backend keep this request
      // in the queue and response with a id. after getting this id we will request again.
      await this.$store
        .dispatch("customer/getOCRDataBySchedule", formData)
        .then((response) => {
          if (response.status_code === 200 && response.data.status === 0) {

            let end = new Date().getTime();
            let time = end - start;
            let frontRes = end - this.start;
            this.frontImgRes = frontRes;
            console.log("frontStart: " + this.start + " ,frontRes: " + frontRes);
            console.log("ocr request send and response time ="+"start: "+start+" end: "+end+" res time: " + time);

            let data = {
              id: response.data.id,
            };

            this.getOcrStart = new Date().getTime();

            // after getting this id we will call this function
           this.getOCRResult(data);

            
          }
        })
        .catch((error) => {
          this.isLoading = false;
          showToastMessage(
            error.response.data.error + "! " + error.response.data.message,
            "is-danger"
          );
        });
    },
    // if ocr responding successfully it will response with status code 1;
    getOCRResult(id) {
     
      this.$store
        .dispatch("customer/getOCRResult", id)
        .then((response) => {

          let ResStart = new Date().getTime();
          let diffRes = ResStart - this.checkRes;
          this.checkRes = ResStart;
          console.log("ResStart : " + ResStart + " diffRes: " + diffRes);
          console.log("res er: ", this.delayTime, "count: ", this.count);

          if (response.data.status !== 1) {
            let self = this;
            setTimeout(() => {
              this.count++;
              this.count == 1 ? this.delayTime = 50 : this.count > 1 && this.delayTime > 20 ? this.delayTime = this.delayTime - 5 : this.delayTime = 20; 
              // if (this.count == 1) {
              //   this.delayTime = 100;
              // }
              // else if (this.count > 1) {
              //   this.delayTime = this.delayTime - 40;
              //   if (this.delayTime < 20) {
              //     this.delayTime = 50;
              //   }
              // }
              // else {
              //   this.delayTime = 3000;
              // }
              console.log("setTimeOut er : ", this.delayTime, "count: ", this.count);
              self.getOCRResult(id);
            }, this.delayTime); // It will make requests every 100 milliseconds until the status reaches 1
          } else {
            this.delayTime = 3000;
            this.count = 0;
            let successResCome = new Date().getTime();
            let SuccessResTime = successResCome - this.getOcrStart;
            console.log("successResCome : " + successResCome +" ,SuccessResTime : " + SuccessResTime)
            console.log(response.data.status);
            this.isLoading = false;
            if (response.data.ocr_data !== null) {
             //showToastMessage(response.message, "is-success");
             
            } else {
              this.ReTakePhoto();
              showToastMessage(
                "認識文字が見つかりませんでした。再度試すか検索文字を入力ください。",
                "is-danger"
              );
            }
            let photo = {
              id: 0,
              type: "ocr",
              photo: this.photo,
              ocrData: response.data.ocr_data,
              image: this.canva.toDataURL("image/jpeg"),
            };
            this.$store.dispatch("global/setCapturedImages", photo);
            let data = response.data.ocr_data;
            if (data.length > 0) {
              this.$store.dispatch("customer/setOCROriginalResponse", data);
              // this function will make bounding box.
              this.makeBoundingBox(data);
            } else {
              showToastMessage(
                "認識文字が見つかりませんでした。再度試すか検索文字を入力ください。",
                "is-danger"
              );
            }
          }
          let getOcrAllEnd = new Date().getTime();
          let ocrAllResTime = getOcrAllEnd - this.getOcrStart;

          let TotalRes = this.frontImgRes + ocrAllResTime;
          console.log("getOcrStart " + this.getOcrStart + " ,getOcrAllEnd : " + getOcrAllEnd + " , ocrAllResTime : " + ocrAllResTime + " ,TotalRes: " + TotalRes);

        })
        .catch((error) => {
          this.isLoading = false;
          showToastMessage(
            error.response.data.error + "! " + error.response.data.message,
            "is-danger"
          );
        });

      
    },
    /**
     * with schuldel, we can get the selected text from the image
     * code ends here
     */

    /**
     * without schuldel, we can get the selected text from the image
     * code starts here
     */
    // async Send() {
    //   this.isLoading = true;
    //   let formData = new FormData();
    //   formData.append("image", this.photo);
    //   await this.$store
    //     .dispatch("customer/getOCRData", formData)
    //     .then((response) => {
    //       if (response.status_code === 200) {
    //         this.getOCRResult(response.data);
    //       } else {
    //         showToastMessage(response, "is-danger");
    //       }
    //       this.isLoading = false;
    //     })
    //     .catch((error) => {
    //       this.isLoading = false;
    //       showToastMessage(
    //         error.response.data.error + "! " + error.response.data.message,
    //         "is-danger"
    //       );
    //     });
    // },
    // async getOCRResult(data) {
    //   let photo = {
    //     id: 0,
    //     type: "ocr",
    //     photo: this.photo,
    //     ocrData: data,
    //     image: this.canva.toDataURL("image/jpeg"),
    //   };
    //   this.$store.dispatch("global/setCapturedImages", photo);
    //   if (data.length > 0) {
    //     this.$store.dispatch("customer/setOCROriginalResponse", data);
    //     this.makeBoundingBox(data);
    //   } else {
    //     showToastMessage(
    //       "認識文字が見つかりませんでした。再度試すか検索文字を入力ください。",
    //       "is-danger"
    //     );
    //   }
    // },
    /**
     * without schuldel, we can get the selected text from the image
     * code ends here
     */
    makeBoundingBox(data) {
      // from ocr we get total 8 cordinates but we need 4 cordinates (top, left, height, width) for making bounding box
      // so we need to get the cordinates of the top, left, height, width
      // top = y1, left = x1, height = y2 - y1, width = x2 - x1
      let ocrSearchResponsElements = [];
      data.forEach((element, index) => {
        let cordsX = [
          element.bounding_box.x1,
          element.bounding_box.x2,
          element.bounding_box.x3,
          element.bounding_box.x4,
        ];
        let cordsY = [
          element.bounding_box.y1,
          element.bounding_box.y2,
          element.bounding_box.y3,
          element.bounding_box.y4,
        ];
        let x1 = cordsX[0];
        let x2 = cordsX[0];
        let y1 = cordsY[0];
        let y2 = cordsY[0];
        // find smallest x and largest x
        for (let i = 1; i < cordsX.length; i++) {
          if (cordsX[i] > x2) {
            x2 = cordsX[i];
          } else if (cordsX[i] < x1) {
            x1 = cordsX[i];
          }
        }
        // find smallest y and largest y
        for (let j = 1; j < cordsY.length; j++) {
          if (cordsY[j] > y2) {
            y2 = cordsY[j];
          } else if (cordsY[j] < y1) {
            y1 = cordsY[j];
          }
        }

        let ocrSearchResponsElement = {
          id: index,
          text: element.text,
          x1: x1 * 0.828,
          x2: x2 * 0.828,
          y1: y1 * 0.828,
          y2: y2 * 0.828,
          selected: false,
        };
        ocrSearchResponsElements.push(ocrSearchResponsElement);
      });
      this.$store.dispatch(
        "customer/setOCRResponseElements",
        ocrSearchResponsElements
      );
    },
    // generate ocr image with bounding box for save in the backedn
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
    // get the selected text from the image for find open search text
    getSelectedElement(element) {
      let textExists =
        this.$store.state.customer.ocrResponseSelectedElements.find(
          (item) => item.id === element.id
        );
      if (textExists) {
        // remove the selected text from the array
        textExists.selected = false;
        this.$store.state.customer.ocrResponseSelectedElements.splice(
          this.$store.state.customer.ocrResponseSelectedElements.indexOf(
            textExists
          ),
          1
        );
      } else {
        // add the selected text to the array
        element.selected = true;
        this.$store.dispatch(
          "customer/setOCRResponseSelectedElements",
          element
        );
      }
      // get oparetor selected bounding box text
      this.$emit(
        "getText",
        this.$store.state.customer.ocrResponseSelectedElements
      );
    },
  },
};
</script>

<style scoped>

.camera-comp {
  width: 414px;
  height: 414px;
  background: #fffefe;
}
video.video,
canvas {
  width: 414px;
  height: 414px;
  object-fit: cover;
  aspect-ratio: 1;
}
.canvas {
  /* height: 100% !important;
  position: relative; */
}
#highlight {
  position: absolute;
  background: rgba(14, 177, 232, 0.4);
  border: 1px solid #0eb1e8;
}
/* .video.front {
  -webkit-transform: scaleX(-1);
  transform: scaleX(-1);
} */
.wrapper {
  background-color: black;
  display: grid;
  width: auto;
  height: auto;
  /* height: auto; */
  /* height: 100vh; */
  grid-template-columns: [left] 90vw [bs] 5vw [es] 5vw [right];
  grid-template-rows: [top] 5vh [bs] 5vh [es] 60vh [middle] 10vh [bottom] 20vh [end];
  justify-items: center;
  /* overflow: hidden; */
}

.video {
  /* grid-column: left/right;
  grid-row: top / bottom; */
  position: relative;
  user-select: none;
  max-width: unset;
  max-height: unset;
}
img.cap-photo {
  position: relative;
  height: 100%;
  width: 100%;
}

.switch-button {
  position: absolute;
  grid-column: bs / es;
  grid-row: bs / es;
  z-index: 5;
  border-radius: 100%;
  width: 6vh;
  height: 6vh;
  font-size: 3vh;
  right: 0;
  /* text-align: center; */
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

#image_text {
  height: 414px;
}
</style>