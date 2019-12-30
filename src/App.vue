<template>
  <div id="app">
    <loading :active.sync="isLoading" :can-cancel="false" />
    <b-container>
      <b-row>
        <b-col cols="1" class="mb-4">
          <b-button variant="success" @click="setData">Play</b-button>
        </b-col>
      </b-row>
      <b-row v-if="this.ready">
        <b-col>
          <Resource :person="leftResource" :score="leftScore" />
        </b-col>
        <b-col>
          <Resource :person="rightResource" :score="rightScore" />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Resource from "./components/Resource.vue";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

export default {
  name: "app",

  components: {
    Resource,
    Loading
  },

  data() {
    return {
      resourceCount: 1,
      leftResource: {},
      rightResource: {},
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
        this.resourceCount = data.count;

        const leftPromise = this.getRandomPerson();
        const rightPromise = this.getRandomPerson();

        Promise.all([leftPromise, rightPromise])
          .then(people => {
            this.leftResource = people[0];
            this.rightResource = people[1];
            this.ready = true;
            this.chooseWinner("height");
          })
          .finally(() => (this.isLoading = false));
      });
    },

    getRandomPerson() {
      return new Promise(resolve => {
        const page = Math.floor(Math.random() * this.resourcePageCount) + 1;

        this.$swapi.getPeople({ page }, data => {
          const people = data.results;
          resolve(people[Math.floor(Math.random() * people.length)]);
        });
      });
    },

    chooseWinner(prop) {
      this.$set(this.leftResource, "winner", false);
      this.$set(this.rightResource, "winner", false);

      const propLeft = parseInt(this.leftResource[prop]) || 0;
      const propRight = parseInt(this.rightResource[prop]) || 0;

      if (propLeft > propRight) {
        this.leftResource.winner = true;
        this.leftScore++;
      }

      if (propRight > propLeft) {
        this.rightResource.winner = true;
        this.rightScore++;
      }
    },
  },

  computed: {
    resourcePageCount() {
      return Math.ceil(this.resourceCount / 10);
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
