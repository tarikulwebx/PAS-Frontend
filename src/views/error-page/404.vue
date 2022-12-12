<template>
  <div id="page-404">
    <div class="logo">
      <img src="../../assets/logo@2x.png" alt="logo" />
    </div>
    <div class="page-404">
      <h1>Page Not Found</h1>
      <p class="home-link">
        <router-link to="/">Back To Home</router-link>
      </p>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.logo {
  padding-top: 56px;
  padding-bottom: 25px;
  text-align: center;
  border-bottom: 1px solid #cbcfd6;
}
.logo img {
  width: 201px !important;
}
#page-404 {
  width: 100%;
  height: 100vh;
  overflow: hidden;
}
h1 {
  text-align: center;
  margin: auto;
  font-size: 40px;
  font-weight: 900;
  color: #e94719;
  margin-top: auto;
}
.home-link {
  text-align: center;
  font-size: 20px;
  text-decoration: underline;
}
</style>