<template>
  <div id="customer-details-modal">
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">会員詳細</p>
        <button type="button" class="delete" @click="$emit('close')" />
      </header>
      <section class="modal-card-body">
        <div>
          <b-field label="ID">
            <b>{{ customer.CustomerID }}</b>
          </b-field>
          <b-field label="契約法人名">
            <div class="para">
              <p><b>{{ customer.CompanyName1 }}</b></p>
              <p class="kana">{{ customer.CompanyName_Kana ?  customer.CompanyName_Kana: '' }}</p>
            </div>
          </b-field>
          <b-field label="法人代表者名/担当者名">
            <b>{{ customer.CompanyName2 }}</b>
          </b-field>
          <b-field label="屋号">
            <b>{{ customer.NameBillTo }}</b>
            <p class="kana">{{ customer.NameBillTo2 ?  customer.NameBillTo2: '' }}</p>
          </b-field>
          <b-field label="契約者名">
            <b>{{ customer.concat_Name_person }}</b>
            <p class="kana">{{ customer.Name_Kana ?  customer.Name_Kana: '' }}</p>
          </b-field>
        </div>
      </section>
      <footer class="modal-card-foot">
        <b-button class="close" label="もどる" @click="$emit('close')" />
        <b-button class="confirm" @click="captureImage" label="選択する" />
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  props: ["customer"],
  methods: {
    // go to captured-images page
    captureImage() {
      this.$store.dispatch("global/setSelectedCustomer", this.customer);
      this.$router.push('/captured-images');
    }
  }
};
</script>

<style scoped>
.modal-card-title {
  /* font-family: "SF Pro Display"; */
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #212529;
}
.modal-card-head,
.modal-card-foot {
  background-color: #fff !important;
}
.para {
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
}
b {
    /* font-family: "SF Pro Display"; */  
    font-weight: 600;
    font-size: 16px;
    line-height: 170%;
    color: #121723;
    display: block;
}
strong {
    /* font-family: "SF Pro Display"; */  
    font-weight: 600;
    font-size: 16px;
    line-height: 170%;
    color: #121723;
}
p {
    /* font-family: "SF Pro Display"; */
    font-weight: 600;
    font-size: 14px;
    line-height: 170%;
    color: #9199A6; 
    display: block;
}
.kana {
  /* font-family: "SF Pro Display"; */
  font-style: normal;
  /* font-weight: 300; */
  font-size: 16px;
  color: #121723;
  display: block;
}
.modal-card-head, .modal-card-foot {
    align-items: center;
    background-color: whitesmoke;
    display: flex;
    flex-shrink: 0;
    justify-content: flex-end;
    padding: 20px;
    position: relative;
}
.button.close {
    /* font-family: "SF Pro Display"; */
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
    background: #FFFFFF;
    border: 1px solid #E94719;
    border-radius: 4px;
    color: #E94719;
}
button.button.confirm {
    /* font-family: "SF Pro Display"; */
    font-size: 16px;
    line-height: 24px;
    font-weight: 400;
    background: #E94719;
    border-radius: 4px;
    color: #fff;
}
</style>
