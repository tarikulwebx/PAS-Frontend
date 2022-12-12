<template>
  <div id="customer-list">
      <div class="search-result" @click="isComponentModalActive = true" v-if="customer.CustomerID">
        <b-field>
            <b-radio-button
                v-model="customerSelected"
                :native-value="customer.CustomerID"
            >
                <span class="id">ID <strong>{{ customer.CustomerID }}</strong></span>
                <span class="company">契約法人名 <strong>{{ customer.CompanyName1 }}</strong></span>
                <span class="name"> 法人代表者名/担当者名 <strong>{{ customer.CompanyName2 }}</strong></span>
                <span class="name-bill-to">屋号（個人）<strong>{{ customer.NameBillTo }}</strong></span>
                <span class="contact">契約者名（個人）<strong>{{ customer.concat_Name_person }}</strong></span>
            </b-radio-button>
        </b-field>
    </div>
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
import CustomerDetailsComponentVue from "../components/CustomerDetailsComponent.vue";
export default {
    props: ['customer'],
    components: {
        CustomerDetailsComponentVue
    },
    data(){
        return {
            isComponentModalActive: false,
            customerSelected: false,
        }
    }

}
</script>

<style scoped>

</style>