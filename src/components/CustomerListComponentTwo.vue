<template>
  <div id="customer-list">
      <div class="search-result" @click="isComponentModalActive = true" v-if="customer.CustomerID">
      <!-- {{ customer }} -->
        <b-field>
            <b-radio-button
                v-model="customerSelected"
                :native-value="customer.CustomerID"
            >
                <span class="id"><span class="lbl">ID</span> <strong>{{ customer.CustomerID }}</strong></span>
                <span class="name-bill-to" v-if="customer.max_score == 2"><span class="lbl">屋号 </span><strong>{{ customer.NameBillTo ? customer.NameBillTo : 'N/A' }}</strong></span>
                <span class="contact" v-if="customer.max_score == 2"><span class="lbl">契約者名（個人）</span> <strong>{{ customer.concat_Name_person ? customer.concat_Name_person : 'N/A' }}</strong></span>
                <span class="name" v-if="customer.max_score == 1"><span class="lbl">契約法人名 </span> <strong>{{ customer.CompanyName1 ? customer.CompanyName1 : 'N/A' }}</strong></span>
                <span class="company" v-if="customer.max_score == 1"><span class="lbl">法人代表者名/担当者名 </span> <strong>{{ customer.CompanyName2? customer.CompanyName2 : 'N/A' }}</strong></span>                
            </b-radio-button>
        </b-field>
    </div>
    <!-- {{ customer }} -->
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
        aria-modal>
        <template #default="props">
          <customer-details-component-vue :customer="customer" @close="props.close" />
        </template>
    </b-modal>
  </div>
</template>

<script>
import CustomerDetailsComponentVue from "./CustomerDetailsComponent.vue";

export default {
    props: ['customer'],
    components: {
    CustomerDetailsComponentVue,
},
    data(){
        return {
            isComponentModalActive: false,
            customerSelected: false,
        }
    }

}
</script>

<style>

</style>