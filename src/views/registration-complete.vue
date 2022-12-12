<template>
  <div id="registration-complete">
    <div class="top-bar">
      <div class="container">
        <div class="customer-info">
          <div class="customer-info" v-if="selectedCustomer">
            <div
              v-if="
                selectedCustomer.CompanyName1 || selectedCustomer.CompanyName2
              "
            >
              <p class="name1">
                {{
                  selectedCustomer.CompanyName1
                    ? selectedCustomer.CompanyName1
                    : ""
                }}
              </p>
              <p class="name2">
                {{
                  selectedCustomer.CompanyName2
                    ? selectedCustomer.CompanyName2
                    : ""
                }}
              </p>
            </div>
            <div
              v-else-if="
                selectedCustomer.NameBillTo ||
                selectedCustomer.concat_Name_person
              "
            >
              <p class="billto">
                {{
                  selectedCustomer.NameBillTo ? selectedCustomer.NameBillTo : ""
                }}
              </p>
              <p class="concat">
                {{
                  selectedCustomer.concat_Name_person
                    ? selectedCustomer.concat_Name_person
                    : ""
                }}
              </p>
            </div>
          </div>
        </div>
        <div class="payment-info">
          <p>
            <span class="pay">デポジット残高</span>
            <span class="amount">{{ Azukarikin }}円</span>
          </p>
        </div>
      </div>
    </div>
    <div class="completed">
      <p class="msg">登録完了しました！</p>
      <p class="id-label">顧客ID</p>
      <p class="id-number">
        {{ $store.state.global.userSelections.customer.CustomerID }}
      </p>
    </div>
    <div class="register-info">
      <p>転送発送日：{{ data.DateTransfer }}</p>
      <p>
        転送種類：{{
          transfer_types.find((el) => el.id === data.TransferType)?.name
        }}
      </p>
      <p>実費費用（転送）：{{ data.JippiTransfer }} 円</p>
    </div>
    <!-- {{ images.lenght }} -->
    <div class="row container">
      <div v-for="(image, index) in images" :key="index" class="col-4">
        <img :src="image.image" alt="image" class="img" />
      </div>
    </div>
    <div class="footer">
      <div class="button-group">
        <b-button class="button-id-search" @click="returnIdSearch">
          <span class="btn-txt">ID検索</span>
        </b-button>
        <b-button class="button-ocr" @click="returnOcrSearch">
          <img
            class="icon"
            src="../assets/icons/camera-o.png"
            width="60"
            height="60"
            alt="icon"
          />
          <span class="btn-txt">写真撮影で検索</span>
        </b-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      images: [],
      Azukarikin: 0,
      data: {},
      selectedCustomer: {},
      transfer_types: [
        { id: 11, name: "普通郵便", cost: 200 },
        { id: 12, name: "レターパック", cost: 425 },
        { id: 15, name: "同梱", cost: 0 },
        { id: 3, name: "宅急便", cost: 0 },
        { id: 5, name: "FAX転送", cost: 100 },
        { id: 10, name: "その他", cost: 0 },
        { id: 14, name: "無し", cost: 0 },
      ],
    };
  },
  mounted() {
    this.images = this.$store.state.global.capturedImages; // get oparator's captured images from cache
    this.Azukarikin = this.$route.query.data.Azukarikin; // get oparator's Azukarikin from cache
    this.data = this.$route.query.data; // get response data from finial registration api
    this.selectedCustomer = this.$store.state.global.userSelections.customer; // get oparator selected customer from cache
  },
  methods: {
    // return search by id page
    returnIdSearch() {
      this.refreshStore();
      this.$router.push("/search-by-id");
    },
    // return search by ocr page
    returnOcrSearch() {
      this.refreshStore();
      this.$router.push("/capture-ocr-image");
    },
    // refresh vuex store
    refreshStore() {
      this.$store.dispatch("global/refreshGlobalStore");
      this.$store.dispatch("customer/refreshCustomerStore");
    },
  },
};
</script>

<style scoped>
.field-gap {
  margin-bottom: 25px;
}
.top-bar {
  background-color: #fff5f2;
  border-bottom: 1px solid #e94719;
  padding: 20px 20px 6px;
  gap: 10px;
  position: sticky;
}

.customer-info[data-v-a1064e8c] {
  border-bottom: 1px solid #cbcfd6;
  padding-bottom: 10px;
}
.customer-info p {
  font-weight: 300;
  font-size: 16px;
  line-height: 24px;
  color: #121723;
}

.payment-info {
  padding-top: 10px;
}
.payment-info .pay {
  font-weight: 600;
  font-size: 14px;
  line-height: 21px;
  color: #9199a6;
}
.payment-info .amount {
  font-weight: 300;
  font-size: 16px;
  line-height: 24px;
  color: #121723;
}

.completed {
  text-align: center;
  padding: 24px;
  border-bottom: 1px solid #cbcfd6;
}
.completed .msg {
  font-weight: 300;
  font-size: 20px;
  line-height: 30px;
  color: #000000;
  padding-bottom: 22px;
}
.completed .id-label {
  font-weight: 600;
  font-size: 14px;
  line-height: 21px;
  color: #121723;
}
.completed .id-number {
  font-style: normal;
  font-weight: 700;
  font-size: 64px;
  line-height: 74px;
  letter-spacing: 0.2em;
  color: #121723;
  border: 1px solid #e94719;
  border-radius: 4px;
  padding: 10px;
}
.register-info {
  margin: 24px 16px 8px;
  padding: 16px;
  border: 1px solid #cbcfd6;
  border-radius: 4px;
}
.register-info p {
  font-weight: 300;
  font-size: 16px;
  line-height: 24px;
  color: #373737;
}
.row {
  padding-left: 15px !important;
  padding-right: 15px !important;
  height: 300px;
  overflow-y: scroll;
}
.row > * {
  flex-shrink: 0;
  /* width: 100%; */
  max-width: 100%;
  padding-right: 0;
  padding-left: 0;
  margin-top: var(--bs-gutter-y);
}
.col-4 {
  padding: 8px !important;
}
.row .col-4 .img {
  height: 100px;
  width: 100%;
}

.footer button.button.button-id-search {
  width: 28%;
  height: 72px;
  color: #e94719;
  border: 1px solid #e94719;
  border-radius: 4px;
}
.footer button.button.button-ocr {
  width: calc(72% - 25px);
  margin-left: 25px;
  height: 72px;
  color: #e94719;
  border: 1px solid #e94719;
  border-radius: 4px;
}

.footer button.button.button-ocr img {
  margin-right: 10px;
}
.footer .btn-txt {
  font-weight: 600;
  font-size: 20px;
  line-height: 30px;
  /* color: #FFFFFF; */
}
</style>