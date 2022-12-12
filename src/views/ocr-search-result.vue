<template>
  <div id="ocr_search_result">
    <head-component
      :backBtnTxt="backBtnTxt"
      title="選択してください"
      prevPage="/capture-ocr-image"
    />
    <div class="container-fluid">
      <div class="input-field">
        <b-field>
          <b-input
            placeholder="IDを入力して検索"
            icon="magnify"
            v-model="$store.state.customer.openSearchQuery.search"
            @focus="openModal"
          >
          </b-input>
        </b-field>
      </div>
      <div class="search">
        <div class="swtich" v-if="showWithdrawal">
          <span :class="DeleteFlag ? 'color-text' : 'gray-text'"
            >退会者を含む</span
          >
          <b-field>
            <b-switch
              v-model="DeleteFlag"
              type="is-danger"
              @input="filterByDeleteFlag"
            ></b-switch>
          </b-field>
        </div>
      </div>
    </div>
    <!-- sss {{ customers[page] }} -->
    <div class="customers container-fluid">
      <div class="customers-list" v-if="totalCustomers.length > 0">
        <div v-for="(customer, index) in customers[page]" :key="index">
          <customer-list-component-two :customer="customer" />
        </div>
      </div>
      <div v-else class="not-found">
        <p class="not-found-text">
          [ {{ $store.state.customer.openSearchQuery.search }} ] <br />
          は みつかりませんでした
        </p>
      </div>
    </div>
    <div class="container-fluid" id="pagination-div">
      <pagination-component
        v-if="totalCustomers.length > 0"
        :page="page"
        @goNext="goNext"
        @goPrev="goPrev"
        :total="total"
      />
    </div>
    <div class="footer">
      <div class="buttons">
        <b-button
          class="btn-filter"
          @click="isConditionChangeModalActive = true"
          expanded
        >
          <img src="../assets/icons/filter.png" alt="icon" />
          <span>検索条件の変更 - {{ totalCustomers.length }}件</span>
        </b-button>
      </div>
    </div>
    <b-loading
      :is-full-page="isFullPage"
      v-model="isLoading"
      :can-cancel="false"
    ></b-loading>
    <b-modal
      v-model="isComponentModalActive"
      has-modal-card
      full-screen
      close-button-aria-label="Close"
      :can-cancel="true"
      animation="slide-fade-down"
    >
      <re-search-modal-component @searchAgain="searchAgain" @close="close" />
    </b-modal>

    <b-modal
      v-model="isConditionChangeModalActive"
      has-modal-card
      full-screen
      close-button-aria-label="Close"
      :can-cancel="true"
      animation="slide-fade-down"
    >
      <ocr-search-condition-change-component
        @searchAgain="searchAgain"
        @close="close"
      />
    </b-modal>
  </div>
</template>

<script>
import HeadComponent from "@/components/HeaderComponent.vue";
import { showToastMessage } from "../utils/message";
import CustomerListComponentTwo from "../components/CustomerListComponentTwo.vue";
import PaginationComponent from "../components/PaginationComponent.vue";
import ReSearchModalComponent from "../components/ReSearchModalComponent.vue";
import OcrSearchConditionChangeComponent from "../components/OcrSearchConditionChangeComponent.vue";
export default {
  components: {
    HeadComponent,
    CustomerListComponentTwo,
    PaginationComponent,
    ReSearchModalComponent,
    OcrSearchConditionChangeComponent,
  },
  data() {
    return {
      isSearched: false,
      DeleteFlag: false,
      showWithdrawal: true,
      radioButton: "",
      totalCustomers: [],
      backBtnTxt: "再撮影",
      isFullPage: true,
      isLoading: false,
      searched_id: "",
      isComponentModalActive: false,
      isConditionChangeModalActive: false,
      total: 0,
      customers: [],
      ocrResponse: [],
      page: 0,
      perPage: 5,
      topFiveCustomers: [],
    };
  },
  mounted() {
    // showing cache customers lists if oparator come back from registration input page
    this.ocrResponse = this.$store.state.customer.ocrSearchResults;
    this.filterByDeleteFlag();
  },
  methods: {
    // create chank for showing pagination
    createChunk() {
      let input = this.totalCustomers;
      let chunked = [];
      let size = this.perPage;
      if (input.length > 0) {
        Array.from({ length: Math.ceil(input.length / size) }, (val, i) => {
          chunked.push(input.slice(i * size, i * size + size));
        });
        this.total = chunked.length;
      }
      this.customers = chunked;
    },
    // got to next page
    goNext() {
      this.page += 1;
    },
    // come back previous page
    goPrev() {
      this.page -= 1;
    },
    // research function
    async searchAgain() {
      if (this.$store.state.customer.openSearchQuery.search) {
        this.isLoading = true;
        await this.$store
          .dispatch("customer/getCustomersByOpenSearch")
          .then((response) => {
            this.isLoading = false;
            if (response.length > 0) {
              this.ocrResponse = response;
              this.filterByDeleteFlag();
              this.getTopFiveCustomers();
              this.close();
            } else {
              this.ocrResponse = response;
              this.filterByDeleteFlag();
              this.close();
              showToastMessage(
                "認識文字が見つかりませんでした。再度試すか検索文字を入力ください。",
                "is-danger"
              );
            }
          })
          .catch((error) => {
            this.close();
            this.isLoading = false;
            showToastMessage(
              "エラーが発生しました。再度試すか検索文字を入力ください。",
              "is-danger"
            );
          });
      }
    },
    // filter by delete flag. by default showings those customers whose deleteflag is 0
    filterByDeleteFlag() {
      this.page = 0;
      if (this.DeleteFlag) {
        let filtered = this.ocrResponse.filter(
          (customer) => customer.DeleteFlag === 1 || customer.DeleteFlag === 0
        );
        this.totalCustomers = filtered;
        this.createChunk();
      } else {
        let filtered = this.ocrResponse.filter(
          (customer) => customer.DeleteFlag === 0
        );
        this.totalCustomers = filtered;
        this.createChunk();
      }
    },
    // get top five cusotmers for save backend
    getTopFiveCustomers() {
      let topFive = [];
      for (let i = 0; i < 5; i++) {
        if (this.ocrResponse[i]) {
          topFive.push(this.ocrResponse[i]);
        }
      }
      this.$store.dispatch("customer/setTopFiveCustomers", topFive);
    },
    // open edit modal
    openModal() {
      this.isComponentModalActive = true;
    },
    // close modal
    close() {
      this.isComponentModalActive = false;
      this.isConditionChangeModalActive = false;
    },
  },
};
</script>

<style scoped>
.input-field {
  padding: 10px 0px;
}
.swtich {
  display: flex;
  align-content: center;
  justify-content: center;
  margin-bottom: 10px;
  align-items: center;
}

.swtich span {
  font-weight: 300;
  font-size: 14px;
  line-height: 21px;
  margin-right: 10px;
}
button.button.btn-filter.is-fullwidth {
  width: 90%;
  height: 62px;
  margin: 0 auto;
  background: #ffffff;
  border: 1px solid #e94719;
  border-radius: 70px;
}
button.button.btn-filter.is-fullwidth img {
  margin-right: 20px;
}
button.button.btn-filter.is-fullwidth span {
  color: #e94719;
  font-weight: 300;
  font-size: 20px;
  line-height: 30px;
}
.customers {
  height: 54.3vh;
  overflow-y: scroll;
}
.customers-list{
  height: 100%;
}
.btn-container {
  padding: 25px 0px;
  border-top: 1px solid #cbcfd6;
}
.flip-list-move {
  transition: transform 1s;
}

.not-found {
  width: 253px;
  text-align: center;
  margin: 0 auto;
  padding-top: 36px;
}

.not-found .not-found-text {
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 30px;
  text-align: center;

  color: #121723;
}
</style>