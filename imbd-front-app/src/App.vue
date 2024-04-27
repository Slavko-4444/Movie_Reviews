<template>
  <main>
    <the-header-vue></the-header-vue>
    <div class="content">
      <router-view />
    </div>
    <the-footer-vue></the-footer-vue>
  </main>
</template>

<script>
import TheFooterVue from "./components/layout/TheFooter.vue";
import TheHeaderVue from "./components/layout/TheHeader.vue";

export default {
  components: {
    TheHeaderVue,
    TheFooterVue,
  },
};
</script>

<style>
/* 
} */
body{
  background-color: rgb(250, 250, 250) !important;
}
.content {
  min-height: 80lvh;
}
</style>
