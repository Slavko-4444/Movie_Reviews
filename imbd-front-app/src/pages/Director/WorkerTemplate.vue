<template>
  <div class="container d-flex border border-secoundary">
    <div class="main px-2 pt-3  ">
      <h1>{{ worker.first_name }} {{ worker.last_name }}</h1>
      <hr>
      <h6 class="text-end text-muted">Famous {{ worker.nationality }} Producer</h6>
      <div class="card-">
        <p>{{ begginigBio }}</p>
        <p>{{ mainBio }}</p>
      </div>
      <div class="suggest">
        <p class="p" v-if="worker.movies.length">
          {{ worker.first_name }}'s best rated movies are
          <a class="text-decoration-none mx-1 fst-italic px-1 titles" v-for="movie in mostPopular('movies')"
            :key="movie" @click="goToM(movie.id)">{{
        movie.title }} ({{ movie.avg_rating.toFixed(1) }}
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="gold" class="bi bi-star"
              viewBox="0 0 18 18">
              <path
                d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z" />
            </svg>
            )</a>
        </p>
        <p class="fst-italic" v-else>
          {{ worker.first_name }} hasn't record any movie for now.
        </p>

        <p class="p" v-if="worker.series.length">
          {{ worker.first_name }}'s most populare series are
          <a class="text-decoration-none mx-1 fst-italic px-1 titles" v-for="ser in mostPopular('series')" :key="ser"
            @click="goToS(ser.id)">{{
        ser.title }} ({{ ser.avg_rating.toFixed(1) }}
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="gold" class="bi bi-star"
              viewBox="0 0 18 18">
              <path
                d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z" />
            </svg>
            )</a>
        </p>
        <p class="fst-italic" v-else>
          {{ worker.first_name }} hasn't record any series yet.
        </p>
      </div>

    </div>

    <div class="d-flex flex-column last-box">
      <div class="first-block1">
        <img class="card-img" :src="worker.image" alt="">
      </div>
      <h2 class="card-title">{{ worker.first_name }} {{ worker.last_name }}</h2>
      <h5 class="card-title text-secondary">Birth date {{ specDate(worker.birth_date) }}</h5>
      <h6 class="card-title text-secondary my-3">Nacionality {{ worker.nationality }}</h6>
    </div>
  </div>
</template>

<script>
export default {
  props: ['worker'],
  inject: ['goToS', 'goToM'],
  data() {
    return {
      backgroundImage: `url(${this.worker.image})`,
    }
  },
  computed: {

    begginigBio() {
      if (this.worker) {
        const sentences = this.worker.biography.match(/[^.!?]+[.!?]/g);
        if (!sentences)
          return this.worker.biography

        let firstOfSentences = Math.ceil(sentences.length / 2)

        return sentences.slice(0, firstOfSentences).join('.') + '. '
      }
      return ''
    },
    mainBio() {
      if (this.worker) {
        const sentences = this.worker.biography.match(/[^.!?]+[.!?]/g);
        if (!sentences)
          return ''

        let firstOfSentences = Math.ceil(sentences.length / 2)
        return sentences.slice(firstOfSentences).join('.') + '. '
      }
      return ''
    },
  },
  methods: {
    mostPopular(itemType) {
      if (this.worker[itemType].length < 3)
        return this.worker[itemType];

      let mostPopular = this.worker[itemType].slice();
      return mostPopular.sort(this.compareTwo).splice(0, 3);
    },
    compareTwo(first, second) { return second.avg_rating - first.avg_rating },
    specDate(dt) {
      const releaseDate = dt;
      const parts = releaseDate.split("-");
      return `${parts[2]}.${parts[1]}.${parts[0]}`;
    },
  },
}
</script>

<style scoped>
.container {
  min-height: 55vh;
  padding: 5px;
}

.main {
  flex: 3;
  display: flex;
  flex-direction: column;
}

.first-block1 {
  background-position: top center;
  background-size: cover;
  width: 100%;
  height: calc(55vh - 15vh);
  position: relative;
}

.first-block1::before {
  content: "";
  background: rgba(0, 0, 0, 0.5);
  position: absolute;
  border-radius: 5px;
  bottom: 0;
  top: 0;
  left: 0;
  right: 0;
}

img {
  width: 100%;
  display: block;
  height: calc(55vh - 15vh);
  object-fit: cover;
  border-radius: 5px;
}

.last-box {
  flex: 1;
}

.titles {
  text-transform: capitalize;
}

.titles:hover {
  cursor: pointer;
}

.suggest {
  margin-top: auto;
  margin-bottom: 35px;
}

.suggest p {
  margin-bottom: 5px;
}
</style>