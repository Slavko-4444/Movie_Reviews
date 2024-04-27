<template>
  <button type="button" v-on:click="isShown = !isShown" class="btn btn-warning my-2">Filter</button>
  <div class="genre-box" v-show="isShown">
    <div class="d-flex justify-content-start flex-row">
      <form @submit.prevent="submitFilter">
        <div class="genre-item" v-for="g in genres" :key="g.id">
          <input class="genre-input"
            type="checkbox"
            :value="g"
            :id="g.id"
            :disabled="checkedOptions.length >= 2 && !isChecked(g)"
            @change="updateCheckedOptions($event, g)"
          />
          <label class="genre-label" :for="g.id">{{ g.genre_name }}</label>
        </div>
        <!-- <button type="submit">Filter</button> -->
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  emits: ['selectionChanged'],

  data() {
    return {
      genres: [],
      checkedOptions: [],
      isShown: false
    };
  },

  mounted() {
    this.allGenres();
  },

  methods: {
    allGenres() {
      axios
        .get("http://127.0.0.1:8000/all-shows/genre/")
        .then((response) => {
          this.genres = response.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },

    updateCheckedOptions(event, genre) {
      const isChecked = event.target.checked;

      if (isChecked) {
        if (this.checkedOptions.length < 2) {
          this.checkedOptions.push(genre);
        } else {
          event.preventDefault(); // Prevent checkbox from being checked if limit is reached
        }
      } else {
        const index = this.checkedOptions.findIndex((g) => g.id === genre.id);
        if (index !== -1) {
          this.checkedOptions.splice(index, 1);
        }
      }
      this.$emit("selectionChanged", this.checkedOptions);
    },

    isChecked(genre) {
      return this.checkedOptions.some((g) => g.id === genre.id);
    },

    submitFilter() {
      // Optionally do something on submit, or just emit the final selected options
      this.$emit("submitGenres", this.checkedOptions);
    },
  },
};
</script>

<style scoped>
.genre-item {
  display: flex;
  flex-direction: row;
  align-content: center;
}

.genre-box {
  padding: 8px;
  border: 2px solid gainsboro;
  border-radius: 8px;
}

.genre-input {
  margin-right: 4px;
  transform: scale(1.3);
}

.genre-label {
  font-size: 16px;
}

.genre {
  margin-top: 10px;
  margin-left: 5px;
}

.genre-cards {
  background: orange;
  border-radius: 10%;
}

.genre-cards:hover {
  background-color: white;
  border-radius: 10%;
}
</style>
