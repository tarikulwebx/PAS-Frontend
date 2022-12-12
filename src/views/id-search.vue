<template>
  <div id="id_search">
    <head-component
      :backBtnTxt="backBtnTxt"
      title="ID検索で登録"
      :prevPage="isSearched ? '/search-by-id' : '/'"
      @searchAgain="searchAgain"
    />
    <div class="container-fluid">
      <div class="input-field">
        <b-field :message="errorMsg" type="is-danger">
          <b-numberinput
            @input="getValue"
            placeholder="IDを入力して検索"
            type="search"
            icon="magnify"
            v-model="id_number"
          >
          </b-numberinput>
        </b-field>
      </div>
      <div class="search">
        <div class="swtich" v-if="showWithdrawal">
          <span :class="DeleteFlag ? 'color-text' : 'gray-text'"
            >解約者を含む</span
          >
          <b-field>
            <b-switch
              v-model="DeleteFlag"
              type="is-danger"
              @input="filterByDeleteFlag"
            ></b-switch>
          </b-field>
        </div>
        <div
          class="search-not-found"
          v-if="
            (!hasSearchResult && isSearched) ||
            (customers.length < 1 && isSearched)
          "
        >
          <span
            >[ ID {{ searched_id }} ] は <br />
            みつかりませんでした</span
          >
        </div>
        <div class="customers-list" v-if="customers.length > 0">
          <div v-for="(customer, index) in customers" :key="index">
            <customer-list-component :customer="customer" />
          </div>
        </div>
      </div>
      <div class="buttons" v-if="customers.length == 0 && !isSearched">
        <b-button
          @click="onSubmit"
          :class="id_number ? 'btn-orange' : 'btn-gray'"
          expanded
          :disabled="!id_number"
          >IDで検索する</b-button
        >
      </div>
      <div class="buttons" v-if="customers.length == 0 && isSearched">
        <b-button
          @click="reSearch"
          :class="id_number ? 'btn-orange' : 'btn-gray'"
          expanded
          :disabled="!id_number"
          >IDを入力し直す</b-button
        >
      </div>
    </div>
    <b-loading
      :is-full-page="isFullPage"
      v-model="isLoading"
      :can-cancel="false"
    ></b-loading>
    <floating-button class="floating-btn" />
  </div>
</template>

<script>
import HeadComponent from "@/components/HeaderComponent.vue";
import FloatingButton from "@/components/FloatingButton.vue";
import { showToastMessage } from "../utils/message";
import CustomerListComponent from "../components/CustomerListComponent.vue";
import { getUserInitialStore } from "../utils/auth";

export default {
  components: {
    HeadComponent,
    FloatingButton,
    CustomerListComponent,
  },
  data() {
    return {
      DeleteFlag: false,
      isSearched: false,
      id_number: null,
      showWithdrawal: false,
      radioButton: "",
      customers: [],
      totalCustomers: [],
      backBtnTxt: "",
      isFullPage: true,
      isLoading: false,
      searched_id: "",
      isComponentModalActive: false,
      hasSearchResult: false,
      errorMsg: "",
    };
  },
  mounted() {
    // cache for back button
    if (
      this.$store.state.global.userSelections &&
      this.$store.state.global.userSelections.customer
    ) {
      this.customers.push(this.$store.state.global.userSelections.customer);
      this.totalCustomers.push(
        this.$store.state.global.userSelections.customer
      );
      this.filterByDeleteFlag();
    }
  },
  methods: {
    getValue(val) {
      if (val === null) {
        this.errorMsg = "IDは数値のみを入力してください。";
      } else {
        this.errorMsg = "";
      }
    },
    // Delete flag filter function
    filterByDeleteFlag() {
      if (this.DeleteFlag) {
        let filtered = this.totalCustomers.filter(
          (customer) => customer.DeleteFlag === 1 || customer.DeleteFlag === 0
        );
        this.customers = filtered;
      } else {
        this.customers = this.totalCustomers.filter(
          (customer) => customer.DeleteFlag === 0
        );
      }
    },
    // id search submit function
    onSubmit() {
      if (this.id_number) {
        let data = {
          id: this.id_number,
          ContractStore: parseInt(getUserInitialStore()),
        };
        if (!data.ContractStore) {
          showToastMessage(
            "初期設定画面へ戻り、拠点を選択しなおしてください。",
            "is-danger"
          );
        } else {
          this.backBtnTxt = "ID入力";
          this.isLoading = true;
          this.$store.dispatch("global/setSearchedId", data);
          this.$store
            .dispatch("customer/getCustomerByID", data)
            .then((response) => {
              this.searched_id = this.id_number;
              if (response.length > 0) {
                this.customers = response;
                this.totalCustomers = response;
                this.filterByDeleteFlag();
                this.isLoading = false;
                this.isSearched = true;
                this.showWithdrawal = true;
                this.hasSearchResult = true;
              } else {
                this.isLoading = false;
                this.isSearched = true;
                this.showWithdrawal = true;
                this.hasSearchResult = false;
              }
            })
            .catch((error) => {
              this.isSearched = true;
              this.showWithdrawal = true;
              this.hasSearchResult = false;
              // if(error.response.status == 404){
              //   showToastMessage("該当するデータが見つかりません。別のIDで検索をしてください。", "is-danger");
              // } else if (error.response.status == 401){
              //   showToastMessage('ログアウトしました。再度ログインしてください。', "is-danger");
              // } else {
              //   showToastMessage(error.response.data ? error.response.data.message : 'サーバーエラー！', "is-danger");
              // }
              this.searched_id = this.id_number;
              this.isLoading = false;
            });
        }
      } else {
        this.isLoading = false;
        showToastMessage("IDは必須です。", "is-danger");
      }
    },
    // go back with id
    searchAgain() {
      this.isSearched = false;
      this.showWithdrawal = false;
      this.customers = [];
      this.totalCustomers = [];
      this.DeleteFlag = false;
      this.hasSearchResult = false;
      this.backBtnTxt = "";
    },
    // go back without id
    reSearch() {
      this.isSearched = false;
      this.showWithdrawal = false;
      this.customers = [];
      this.totalCustomers = [];
      this.id_number = null;
      this.DeleteFlag = false;
      this.hasSearchResult = false;
      this.backBtnTxt = "";
    },
  },
};
</script>

<style scoped>
.input-field {
  padding: 20px 0px;
}
.swtich {
  display: flex;
  align-content: center;
  justify-content: center;
  margin-bottom: 20px;
  align-items: center;
}

.swtich span {
  font-weight: 300;
  font-size: 14px;
  line-height: 21px;
  margin-right: 10px;
}
.search-not-found {
  width: 220px;
  text-align: center;
  margin: 25px auto;
}

.search-not-found span {
  font-weight: 600;
  font-size: 20px;
  line-height: 30px;
  text-align: center;
  color: #121723;
}

.color-text {
  color: #e94719;
}
.gray-text {
  color: #606775;
}

.search-result .control span {
  font-weight: 300;
  font-size: 16px;
  line-height: 24px;
  color: #121723;
}

.buttons {
  margin-bottom: 0;
}
.buttons .button {
  margin-bottom: 0;
  height: auto;
  padding: 16px;
}
.buttons .button span {
  font-weight: 600;
}
</style>