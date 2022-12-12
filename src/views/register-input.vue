<template>
  <div id="register-input">
    <div class="top-bar">
      <div class="customer-info" v-if="selectedCustomer">
        <div
          v-if="selectedCustomer.CompanyName1 || selectedCustomer.CompanyName2"
        >
          <p class="name1">
            {{
              selectedCustomer.CompanyName1 ? selectedCustomer.CompanyName1 : ""
            }}
          </p>
          <p class="name2">
            {{
              selectedCustomer.CompanyName2 ? selectedCustomer.CompanyName2 : ""
            }}
          </p>
        </div>
        <div
          v-else-if="
            selectedCustomer.NameBillTo || selectedCustomer.concat_Name_person
          "
        >
          <p class="billto">
            {{ selectedCustomer.NameBillTo ? selectedCustomer.NameBillTo : "" }}
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
      <div class="payment-info">
        <p>
          <span class="pay">デポジット残高</span>
          <span class="amount"> {{ Azukarikin }} 円</span>
        </p>
        <p class="color-txt">{{ NoticeMessage ? NoticeMessage : "" }}</p>
      </div>
    </div>
    <div class="register-form">
      <div class="receipt-date field-gap container-fluid">
        <p class="label">
          <span class="label-name">受取日</span> <span class="flag">必須</span>
        </p>
        <b-field>
          <b-datepicker v-model="register.ArriveDate" locale="ja-JP" editable>
          </b-datepicker>
        </b-field>
      </div>
      <div class="receipt-type field-gap container-fluid">
        <p class="label">
          <span class="label-name">受取種類</span>
          <span class="flag">必須</span>
        </p>
        <div class="row">
          <div
            v-for="(Type, index) in receipt_types"
            :key="index"
            :class="[Type.id == 1 ? 'full-width' : 'half-width']"
          >
            <b-field
              :class="[register.Type == Type.id ? 'border selected' : 'border']"
            >
              <b-radio
                @input="getReceiptType(Type)"
                v-model="register.Type"
                :native-value="Type.id"
                type="is-danger"
              >
                <span class="radio-txt">{{ Type.name }}</span>
              </b-radio>
            </b-field>
          </div>
        </div>
      </div>
      <div class="actual-cost field-gap container-fluid">
        <p class="label">
          <span class="label-name">実費費用（受取）</span>
          <span class="flag">必須</span>
        </p>
        <b-field :label-position="labelPosition">
          <b-numberinput v-model="register.Jippi" class="cost"></b-numberinput>
          <p class="control">
            <span class="sign">円</span>
          </p>
        </b-field>
      </div>
      <div class="receipt-status field-gap">
        <p>受取状態</p>
        <b-button class="button-status">
          <span v-if="uketori === 0" class="btn-txt">転送</span>
          <span v-if="uketori === 1" class="btn-txt">都度転送</span>
          <span v-if="uketori === 2" class="btn-txt">来店</span>
          <span v-if="uketori === 3" class="btn-txt">その他</span>
        </b-button>
      </div>
      <div
        class="receipt-date field-gap transfer-shipping-date container-fluid"
      >
        <p class="label">
          <span class="label-name">転送発送日</span>
          <!-- <span class="flag">必須</span> -->
        </p>
        <b-field>
          <b-datepicker v-model="register.TransferDate" locale="ja-JP" editable>
          </b-datepicker>
        </b-field>
      </div>
      <!-- -------------------------start-------------- -->
<div class="histories field-gap" v-if="!isLoading">
  <div class="head">
    <h2>登録履歴（最新{{ histories.length }}件）</h2>
  </div>
  <div class="body">
    <div v-if="histories.length > 0">
      <div v-for="(history, index) in histories" :key="index" class="history">
        <p>
          転送発送日:
          {{ history.DateTransfer ? history.DateTransfer : "" }}
        </p>
        <p>
          転送種類：{{
          transfer_types.find((el) => el.id === history.TransferType)
          ? transfer_types.find(
          (el) => el.id === history.TransferType
          ).name
          : ""
          }}
        </p>
        <p>
          実費費用（転送）：{{
          history.JippiTransfer ? history.JippiTransfer : "0"
          }} 円
        </p>
      </div>
    </div>
    <div v-else>
      <div class="history">
        <p></p>
      </div>
    </div>
  </div>
</div>

<div :class="
  register.label_check
    ? 'selected address-label field-gap'
    : 'address-label field-gap'
">
  <b-checkbox v-model="register.label_check" native-value="true">
    <span>ラベル印刷</span>
  </b-checkbox>
</div>
      <!------------------------------- close -------------------------->
      <div class="receipt-type transfer-type field-gap container-fluid">
        <p class="label">
          <span class="label-name">転送種類</span>
          <span class="flag">必須</span>
        </p>
        <div class="row">
          <div
            v-for="(transfer_type, index) in transfer_types"
            :key="index"
            :class="[transfer_type.id == 11 ? 'full-width' : 'half-width']"
          >
            <b-field
              :class="
                register.TransferType == transfer_type.id
                  ? 'border selected'
                  : 'border'
              "
            >
              <b-radio
                @input="getActualCostTransfer(transfer_type)"
                v-model="register.TransferType"
                :native-value="transfer_type.id"
                type="is-danger"
              >
                <span>{{ transfer_type.name }}</span>
              </b-radio>
            </b-field>
          </div>
        </div>
      </div>
      <!-- <div class="traking_number field-gap container-fluid">
        <p class="label"><span class="label-name">追跡番号</span></p>
        <b-field :label-position="labelPosition">
          <b-input v-model="register.t_number"></b-input>
        </b-field>
      </div> -->
      <div class="actual-cost field-gap container-fluid">
        <p class="label">
          <span class="label-name">実費費用（転送）</span>
          <span class="flag">必須</span>
        </p>
        <b-field :label-position="labelPosition">
          <b-numberinput
            v-model="register.JippiTransfer"
            class="cost"
          ></b-numberinput>
          <p class="control">
            <span class="sign">円</span>
          </p>
        </b-field>
      </div>
      <!-- <div class="histories field-gap" v-if="!isLoading">
        <div class="head">
          <h2>登録履歴（最新{{ histories.length }}件）</h2>
        </div>
        <div class="body">
          <div v-if="histories.length > 0">
            <div
              v-for="(history, index) in histories"
              :key="index"
              class="history"
            >
              <p>
                転送発送日:
                {{ history.DateTransfer ? history.DateTransfer : "" }}
              </p>
              <p>
                転送種類：{{
                  transfer_types.find((el) => el.id === history.TransferType)
                    ? transfer_types.find(
                        (el) => el.id === history.TransferType
                      ).name
                    : ""
                }}
              </p>
              <p>
                実費費用（転送）：{{
                  history.JippiTransfer ? history.JippiTransfer : "0"
                }} 円
              </p>
            </div>
          </div>
          <div v-else>
            <div class="history">
              <p></p>
            </div>
          </div>
        </div>
      </div> -->
      <!-- <div
        :class="
          register.label_check
            ? 'selected address-label field-gap'
            : 'address-label field-gap'
        "
      >
        <b-checkbox v-model="register.label_check" native-value="true">
          <span>ラベル印刷</span>
        </b-checkbox>
      </div> -->
      <div class="packing-fee field-gap container-fluid">
        <p class="field-title">梱包代</p>
        <b-field>
          <b-switch
            @input="getPackingFee"
            v-model="register.is_packing"
          ></b-switch>
        </b-field>
        <b-field :label-position="labelPosition">
          <b-numberinput
            :disabled="!register.is_packing"
            v-model="register.packing_val"
            class="cost"
          ></b-numberinput>
          <p class="control">
            <span class="sign">円</span>
          </p>
        </b-field>
      </div>
      <div class="cardboard-fee field-gap container-fluid">
        <p class="field-title">ダンボール代</p>
        <b-field>
          <b-switch
            @input="getCardboardFee"
            v-model="register.is_packing_cardboard"
          ></b-switch>
        </b-field>
        <b-field :label-position="labelPosition">
          <b-numberinput
            :disabled="!register.is_packing_cardboard"
            v-model="register.packing_cardboard_val"
            class="cost"
          ></b-numberinput>
          <p class="control">
            <span class="sign">円</span>
          </p>
        </b-field>
      </div>
      <!-- start -->
      <div class="traking_number field-gap container-fluid">
        <p class="label"><span class="label-name">追跡番号</span></p>
        <b-field :label-position="labelPosition">
          <b-input v-model="register.t_number"></b-input>
        </b-field>
      </div>
      <!-- close -->
      <div class="mail-type field-gap container-fluid">
        <p class="label field-gap">備考（お客様に公開されます）</p>
        <div class="row mix-row">
          <div
            v-for="(remark, index) in remarks"
            :key="index"
            class="mix-width"
          >
            <b-field
              :class="
                register.MailType == remark.id ? 'border selected' : 'border'
              "
            >
              <b-radio
                @input="getRemark(remark)"
                v-model="register.MailType"
                :native-value="remark.id"
                type="is-danger"
              >
                <span>{{ remark.name }}</span>
              </b-radio>
            </b-field>
          </div>
        </div>
      </div>
      <div class="remarks field-gap container-fluid">
        <!-- <p class="label"><span class="label-name">内部メモ（非公開）</span></p> -->
        <b-field horizontal>
          <b-input
            v-model="register.Remark"
            ref="text"
            id="textarea"
            maxlength="500"
            type="textarea"
          ></b-input>
        </b-field>
      </div>
      <div class="internal-memo field-gap container-fluid">
        <p class="label"><span class="label-name">内部メモ（非公開）</span></p>
        <b-field horizontal>
          <b-input
            placeholder="oyanagi"
            v-model="register.Note"
            maxlength="500"
            ref="text"
            type="textarea"
          ></b-input>
        </b-field>
      </div>
      <div class="footer">
        <div class="button-group">
          <b-button class="button-cancel" @click="cancel"
            ><span class="btn-txt">戻る</span></b-button
          >
          <b-button
            class="button-save btn-orange"
            :disabled="
              !register.TransferType ||
              register.Jippi === null ||
              register.JippiTransfer === null ||
              // register.TransferDate === null    //required transfer date avoid
              register.ArriveDate === null   
            "
            @click="save"
            ><span class="btn-txt">登録する</span></b-button
          >
        </div>
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
  data() {
    const today = new Date();
    return {
      labelPosition: "right",
      isFullPage: true,
      isLoading: false,
      Azukarikin: 0,
      totalCost: 0,
      histories: [],
      NoticeMessage: "",
      userID: "",
      selectedCustomer: {},
      uketori: 1,
      register: {
        ArriveDate: null,
        Type: 1,
        Jippi: 0,
        t_number: "",
        JippiTransfer: 0,
        packing_val: 0,
        packing_cardboard_val: 0,
        receipt_status: null,
        TransferDate: new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate()
        ),
        Remark: "",
        Note: "",
        TransferType: "",
        image: [],
        label_check: 0,
        openSearch: [],
        ocr: [],
        ocrImage: "",
        selected_text: [],
      },
      receipt_types: [
        { id: 1, name: "普通郵便（メール便含む)", cost: 0 },
        { id: 3, name: "書留", cost: 300 },
        { id: 12, name: "レターパック", cost: 300 },
        { id: 4, name: "宅急便", cost: 300 },
        { id: 13, name: "不在票", cost: 0 },
        { id: 14, name: "その他", cost: 0 },
      ],
      transfer_types: [
        { id: 11, name: "普通郵便", cost: 200 },
        { id: 12, name: "レターパック", cost: 425 },
        { id: 15, name: "同梱", cost: 0 },
        { id: 3, name: "宅急便", cost: 0 },
        { id: 5, name: "FAX転送", cost: 100 },
        { id: 10, name: "その他", cost: 0 },
        { id: 14, name: "無し", cost: 0 },
      ],
      remarks: [
        {
          id: 0,
          name: "テンプレート未選択",
          remark: "",
          minHeight: "8em",
        },
        {
          id: 1,
          name: "屋号（保管）",
          remark: `ご登録のない屋号にて到着しております。
屋号のご登録をお願い致します。メールにて屋号登録の申請をお願い致します。
ご申請いただけない場合は差出人様へ返還対応となりますので、お早めにお手続きをお願い致します。
登録完了後のお渡しとなりますのでご了承ください。`,
          minHeight: "18em",
        },
        {
          id: 2,
          name: "デポ不足（保管）",
          remark: `デポジットが不足しているため保管対応とさせていただきます。
※デポジットが不足している場合は転送ができませんのでご了承ください。
残金をご確認いただき、ご入金をお願い致します。`,
          minHeight: "12em",
        },
        {
          id: 3,
          name: "デポ不足（不在票）",
          remark: `デポジットが不足しているため不在票対応とさせていただきます。
残金をご確認いただきご入金をお願い致します。
再配達は保管期間をご確認いただき、ご入金後お手数ではございますがご自身でお願い致します。
配達業者：
種類：
伝票番号（追跡番号）：
電話番号：　　　　　　　　　　　　または
保管期間：
郵便番号（または営業所）：
配達時間：午前中→1    12～14時→2   14～16時→3    16～18時→4`,
          minHeight: "25em",
        },
        {
          id: 4,
          name: "法人（保管）",
          remark: `ご登録のない法人名にて到着しております。
履歴事項全部証明書の全ページをご提出いただき、個人から法人への切替をお願い致します。
※ご提出はPDFもしくは画像にしていただきメール添付でお願い致します。（電子版不可・6ヶ月以内に発行されたもの）
履歴事項全部証明書提出後のお渡しとなりますのでご了承ください。
法人への切替をご申請いただけない場合は差出人様へ返還対応となりますので、お早めにお手続きをお願い致します。`,
          minHeight: "20em",
        },
        {
          id: 5,
          name: "法人（不在票）",
          remark: `ご登録のない法人名にて到着しているため不在票対応とさせていただきます。
履歴事項全部証明書の全ページをご提出いただき、個人から法人への切替をお願い致します。
再配達は保管期間をご確認いただき、切替申請後お手数ではございますがご自身でお願い致します。
配達業者：
種類：
保管期間：
伝票番号（追跡番号）：
電話番号：　　　　　　　　　　　または
郵便番号（または営業所）：
配達時間：午前中→1    12～14時→2   14～16時→3    16～18時→4`,
          minHeight: "25em",
        },
        {
          id: 6,
          name: "クール便・生物（不在票）",
          remark: `お受取ができないため不在票にて対応しております。
※生物やクール便は保管ができないため不在票とさせて頂きます。
再配達は保管期間をご確認いただき、お手数ではございますが会員様ご自身で転送先の変更をお願い致します。
配達業者：
種類：
伝票番号（追跡番号）：
電話番号：　　　　　　　　　　　または
保管期間：
郵便番号（または営業所）：
配達時間：午前中→1    12～14時→2   14～16時→3    16～18時→4`,
          minHeight: "25em",
        },
      ],
    };
  },
  watch: {
    register: {
      handler(val) {
        let textarea = document.getElementById("textarea");
        if (val.remarks == "屋号（保管）") {
          textarea.style.height = "500px";
        }
      },
      deep: true,
    },
  },
  created() {
    // console.log(this.$store.state.global.userSelections);
    this.setArriveDate(); // by default set oparator seletced date from initial page
    this.register.CustomerID =
      this.$store.state.global.userSelections.customerId; // set oparator selected customers id
    this.register.Note = this.$store.state.user.userid; // set oparator userid as note by default
    this.selectedCustomer = this.$store.state.global.userSelections.customer; // get oparator's selected customers
    this.getData();
  },
  methods: {
    // by default set oparator selected date from initial page
    setArriveDate() {
      if (this.$store.state.global.userSelections.initial) {
        this.register.ArriveDate = new Date(
          this.$store.state.global.userSelections.initial.date
        );
      }
    },
    // get selectd customer details information about payment, balance, history etc
    async getData() {
      this.isLoading = true;
      await this.$store
        .dispatch("customer/getCustomerData", this.register.CustomerID)
        .then((response) => {
          this.isLoading = false;
          if (response.status_code === 200) {

            this.Azukarikin = response.balance.Azukarikin;
            this.histories = response.history;
            this.uketori = response.balance.uketori;
            this.NoticeMessage = response.balance.NoticeMessage;
            this.register.label_check =
              response.balance.label_check == 1 ? true : false;
            this.isLoading = false;
          } else {
            this.isLoading = false;
            showToastMessage(response.message, "is-danger");
          }
        })
        .catch((error) => {
          this.isLoading = false;
          showToastMessage(error.message, "is-danger");
        });
    },
    // if oparator wanna go back
    cancel() {
      this.$router.push("/captured-images");
    },
    // get ocr orignial response for save backend
    getOcrOriginalSelected() {
      let originals = [];
      this.$store.state.customer.ocrResponseSelectedElements.forEach(
        (element) => {
          let item = this.$store.state.customer.ocrOriginalResponse.find(
            (ocr, index) => index === element.id
          );
          if (item) {
            originals.push(item);
          }
        }
      );
      this.$store.dispatch(
        "customer/setOCROriginalResponseSelectedElements",
        originals
      );
    },
    // registration form submit function
    save() {
      if (
        this.register.ArriveDate == "Invalid Date" ||
        this.register.ArriveDate == null
      ) {
        showToastMessage("受取日を選択してください。", "is-danger");
      }
      // else if (
      //   this.register.TransferDate == "Invalid Date" ||
      //   this.register.TransferDate == null
      // ) {
      //   showToastMessage("転送発送日を選択してください。", "is-danger");
      // }
      else if (!this.register.CustomerID) {
        this.$router.push("/");
        this.$store.dispatch("customer/refreshCustomerStore");
        this.$store.dispatch("global/refreshGlobalStore");
        showToastMessage(
          "検索画面へ戻り、転送先の会員を選択しなおしてください。",
          "is-danger"
        );
      } else if (this.register.TransferType == "") {
        showToastMessage("転送種類を選んでください。", "is-danger");
      } else if (this.register.Jippi == null) {
        showToastMessage("実費費用（受取）を入力してください。", "is-danger");
      } else if (this.register.JippiTransfer == null) {
        showToastMessage("実費費用（転送）を入力してください。", "is-danger");
      } else {
        let totalCost =
          this.register.Jippi +
          this.register.JippiTransfer +
          this.register.packing_val +
          this.register.packing_cardboard_val;
        if (totalCost > this.Azukarikin) {
          showToastMessage("デポジットが不足しています", "is-danger");
        } else {
          this.getOcrOriginalSelected();
          this.isLoading = true;
          let images = this.$store.state.global.capturedImages;
          images.forEach((image) => {
            this.register.image.push(image.image);
          });
          this.register.openSearch =
            this.$store.state.customer.topFiveCustomers;
          this.register.ocr = this.$store.state.customer.ocrOriginalResponse;
          this.register.ocrImage = this.$store.state.customer.boundingBoxImage;
          this.register.selected_text =
            this.$store.state.customer.ocrOriginalResponseSelectedElements;
          this.register.totalCost = totalCost;
          this.register.uketori = this.uketori;
          this.register.DateArrive = new Date(
            this.register.ArriveDate
          ).toLocaleDateString("ja-JP");
          this.register.DateTransfer = new Date(
            this.register.TransferDate
          ).toLocaleDateString("ja-JP");
          if (this.register.label_check) {
            this.register.label_check = 1;
          } else {
            this.register.label_check = 0;
          }

         // console.log(this.register.DateTransfer);

          this.$store
            .dispatch("customer/registerNewDocument", this.register)
            .then((response) => {
              //console.log(response);
              this.isLoading = false;
              if (response.status_code === 200) {
                showToastMessage(response.message, "is-success");
                this.$router.push({
                  path: "/registration-complete",
                  query: { Azukarikin: this.Azukarikin, data: response.data },
                });
              } else {
                showToastMessage(response.message, "is-danger");
              }
            })
            .catch((error) => {
              this.isLoading = false;
              showToastMessage(error.response.data.message, "is-danger");
            });
        }
      }
    },
    // get jippi from oparator selection
    getReceiptType(item) {
      this.register.Jippi = item.cost;
    },
    // get Jippi Transfer from oparator selection
    getActualCostTransfer(item) {
      this.register.JippiTransfer = item.cost;
    },
    // get packing fee from oparator selection
    getPackingFee() {
      if (this.register.is_packing) {
        this.register.packing_val = 550;
        this.register.is_packing = 1;
      } else {
        this.register.packing_val = 0;
        this.register.is_packing = 0;
      }
    },
    // get cardboard fee from oparator selection
    getCardboardFee() {
      if (this.register.is_packing_cardboard) {
        this.register.packing_cardboard_val = 230;
        this.register.is_packing_cardboard = 1;
      } else {
        this.register.packing_cardboard_val = 0;
        this.register.is_packing_cardboard = 0;
      }
    },
    // get remarks from oparator selection
    getRemark(item) {
      this.register.Remark = item.remark;
      let textarea = document.getElementById("textarea");
      textarea.style.height = item.minHeight;
      // textarea.style.min-height = item.minHeight;
    },
  },
};
</script>

<style scoped>
.field-gap {
  margin-bottom: 24px;
}
.top-bar {
  /* position: fixed; */
  width: 100%;
  background-color: #fff5f2;
  border-bottom: 1px solid #e94719;
  padding: 20px 20px 6px;
  gap: 10px;
  z-index: 2;
}
.customer-info p {
  /* font-family: 'Hiragino Kaku Gothic Pro'; */
  font-weight: 300;
  font-size: 16px;
  line-height: 24px;
  color: #121723;
}

/* .payment-info {
    padding-top: 11.5px;
} */
.payment-info .pay {
  /* font-family: 'Hiragino Kaku Gothic Pro'; */
  font-weight: 600;
  font-size: 14px;
  line-height: 21px;
  color: #9199a6;
}
.payment-info .amount {
  /* font-family: 'Hiragino Kaku Gothic Pro'; */
  font-weight: 300;
  font-size: 16px;
  line-height: 24px;
  color: #121723;
}
.payment-info .color-txt {
  /* font-family: 'Hiragino Kaku Gothic Pro'; */
  font-weight: 300;
  font-size: 14px;
  line-height: 21px;
  color: #e94719;
}
/* .register-form {
    height: 634px;
    overflow-y: auto;
} */
.register-form {
  padding-top: 39.5%;
}
.label {
  display: flex;
  align-content: center;
  align-items: center;
  flex-direction: row;
  padding-bottom: 4px;
}
.label .label-name {
  /* font-family: 'Hiragino Kaku Gothic Pro'; */
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: #9199a6;
  padding: 3px;
}
.label .flag {
  font-weight: 500;
  font-size: 12px;
  line-height: 12px;
  color: #e94719;
  background: #ffe4dc;
  border-radius: 4px;
  padding: 3px 4px;
  margin-left: 8px;
}
.border {
  border: 1px solid #9199a6;
  border-radius: 70px;
  width: 100%;
  padding-left: 8px;
  padding-right: 7px;
  height: 100%;
  display: flex;
}

.full-width {
  background: #ffffff;
  width: 100%;
  height: 40px;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0 auto;
}
.half-width {
  width: 50%;
  height: 40px;
  border-radius: 70px;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 8px;
}
.half-width:nth-child(n + 2) {
  padding-right: 8px;
}
.half-width:nth-child(2n + 1) {
  padding-left: 8px;
}
/* .half-width:last-child {
    margin-left:16px !important;
} */
.mix-width {
  width: auto;
  height: 40px;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.mix-width .b-radio.radio:not(.button) {
  margin-right: 0 !important;
}
.selected {
  background: #fff5f2 !important;
  border: 1px solid #e94719 !important;
}
.half-width span,
.half-width span,
.field.mix-width span {
  font-weight: 300;
  font-size: 16px;
  line-height: 24px;
  color: #121723;
}
.control .sign {
  padding: 17px 12px;
  width: 40px;
  height: 50px;
  background: #e1e3e8;
}
.field.has-addons {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.cost {
  width: 100%;
  background: #ffffff;
  border: 1px solid #e1e3e8 !important;
}

.receipt-status {
  background: #f1f2f5;
  border-radius: 4px;
  height: 50px;
  display: flex;
  align-items: center;
  margin-left: 16px;
  margin-right: 16px;
}
.receipt-status p {
  /* font-family: 'Hiragino Kaku Gothic Pro'; */
  font-weight: 300;
  font-size: 16px;
  line-height: 24px;
  color: #121723;
  margin: 0 18px;
}
.receipt-status button.button.button-status {
  background: #ffffff;
  border: 1px solid #e94719;
  border-radius: 60px;
}

.receipt-status span.btn-txt {
  /* font-family: 'Hiragino Kaku Gothic Pro'; */
  font-weight: 300;
  font-size: 20px;
  line-height: 24px;
  color: #e94719;
}
.histories {
  border: 1px solid #cbcfd6;
  border-radius: 6px;
  margin-left: 16px;
  margin-right: 16px;
}
.head {
  background: #f1f2f5;
}
.head h2 {
  /* font-family: 'Hiragino Kaku Gothic Pro'; */
  font-weight: 300;
  font-size: 16px;
  line-height: 24px;
  color: #606775;
  padding: 6px 12px;
}
.body .history {
  border-bottom: 1px solid #cbcfd6;
  padding: 6px 12px;
}
.body .history p {
  /* font-family: 'Hiragino Kaku Gothic Pro'; */
  font-size: 14px;
  font-weight: 300;
  color: #373737;
}
.address-label {
  border: 1px solid #cbcfd6;
  border-radius: 6px;
  margin-left: 16px;
  margin-right: 16px;
}
.address-label span {
  /* font-family: 'Hiragino Kaku Gothic Pro'; */
  font-weight: 300;
  font-size: 16px;
  line-height: 100%;
  color: #121723;
}
label.b-checkbox.checkbox {
  padding: 18px;
}

.packing-fee,
.cardboard-fee {
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: center;
  align-items: center;
  flex-wrap: nowrap;
  width: 100%;
}
.packing-fee .field-title,
.cardboard-fee .field-title {
  /* font-family: 'Hiragino Kaku Gothic Pro'; */
  width: 40%;
  font-weight: 300;
  font-size: 14px;
  line-height: 21px;
  color: #606775;
}
.mail-type {
  border-top: 1px solid #cbcfd6;
  padding-top: 24px;
}
.remarks {
  border-bottom: 1px solid #cbcfd6;
}
.mail-type .label {
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: #121723;
  padding-bottom: 8px;
}

.footer {
  padding: 24px 16px;
  background-color: #fff;
  border-top: 1px solid #cbcfd6;
}
.footer button.button.button-cancel {
  width: 28%;
  height: 72px;
  margin-right: 7%;
}
.footer button.button.button-save.btn-orange {
  width: 65%;
  height: 72px;
  color: #fff;
}
.footer .btn-txt {
  font-weight: 600;
  font-size: 20px;
  line-height: 30px;
  /* color: #FFFFFF; */
}

#register-input {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
}
.top-bar {
  max-width: 414px;
  background-color: #fff5f2;
  border-bottom: 1px solid #e94719;
  padding: 20px 20px 6px;
  z-index: 2;
}
.payment-info .color-txt {
  white-space: pre-wrap;
  font-weight: 300;
  font-size: 14px;
  line-height: 1.5;
  color: #e94719;
}
.register-form {
  flex: 1;
  overflow-y: scroll;
  padding-top: 20px;
  max-width: 414px;
}
</style>