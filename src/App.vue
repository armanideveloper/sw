<template>
  <div id="app">
    <loading :active.sync="isLoading" :can-cancel="true" />
    <b-container>
      <b-row>
        <b-col cols="1" class="mb-4">
          <b-button variant="success" @click="setData">Play</b-button>
        </b-col>
      </b-row>
      <b-row v-if="this.ready">
        <b-col>
          <Person :person="leftPerson" :score="leftScore" />
        </b-col>
        <b-col>
          <Person :person="rightPerson" :score="rightScore" />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Person from "./components/Person.vue";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

export default {
  name: "app",

  components: {
    Person,
    Loading
  },

  data() {
    return {
      peopleCount: 1,
      people: [],
      leftPerson: {},
      rightPerson: {},
      isLoading: false,
      ready: false,
      leftScore: 0,
      rightScore: 0
    };
  },

  methods: {
    setData() {
      this.isLoading = true;
      this.$swapi.getPeople(data => {
        this.peopleCount = data.count;
        this.people = data.results;

        const leftPromise = this.getRandomPerson();
        const rightPromise = this.getRandomPerson();

        Promise.all([leftPromise, rightPromise])
          .then(people => {
            this.leftPerson = people[0];
            this.rightPerson = people[1];
            this.ready = true;
            this.chooseWinner("height");
          })
          .finally(() => (this.isLoading = false));
      });
    },

    getRandomPerson() {
      return new Promise(resolve => {
        const page = Math.floor(Math.random() * this.peoplePageCount) + 1;

        this.$swapi.getPeople({ page }, data => {
          const people = data.results;
          resolve(people[Math.floor(Math.random() * people.length)]);
        });
      });
    },

    chooseWinner(prop) {
      const propLeft = parseInt(this.leftPerson[prop]) || 0;
      const propRight = parseInt(this.rightPerson[prop]) || 0;

      if (propLeft > propRight) {
        this.leftPerson.winner = true;
        this.leftScore++;
      }

      if (propRight > propLeft) {
        this.rightPerson.winner = true;
        this.rightScore++;
      }
    }
  },

  computed: {
    peoplePageCount() {
      return Math.ceil(this.peopleCount / 10);
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
