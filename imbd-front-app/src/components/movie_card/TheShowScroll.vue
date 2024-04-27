<template>
  <movie-slide></movie-slide>
</template>

<script>
import MovieSlide from "./MovieSlide.vue";

export default {
  components: {
    MovieSlide,
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Limelight&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Limelight&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap");


body {
  margin: 0;
  height: 100%;
  font-family: "Roboto", sans-serif;
  font-weight: 500;
  font-style: normal;
}
h1,
h2,
h3,
h4,
h5 {
  font-family: "Limelight", cursive;
  font-size: 50px;
  color: #000000;
}
</style>
