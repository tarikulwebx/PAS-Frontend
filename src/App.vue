<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style>
@import '@/assets/base.css';

#app {
  max-width: 414px;
  min-height: 100vh;
  margin: 0 auto;
  overflow: scroll;
  overflow-x: hidden;
  /* background-color: rgb(0, 0, 0, 0.1); */
}
</style>
