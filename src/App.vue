<template>
  <div id="app">
    <loading :active.sync="isLoading" :can-cancel="false" />
    <b-container>
      <b-row class="mb-4">
        <b-col cols="1">
          <b-button variant="success" @click="setData">Play</b-button>
        </b-col>
      </b-row>
      <b-row v-if="this.ready" class="mb-4">
        <b-col>
          <Resource
            :resource="leftResource"
            :score="leftScore"
            :prop="resource.prop"
          />
        </b-col>
        <b-col>
          <Resource
            :resource="rightResource"
            :score="rightScore"
            :prop="resource.prop"
          />
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-button-group>
            <b-button
              :variant="resource.name === 'people' ? 'success' : ''"
              @click="setResource('people', 'height')"
            >
              People
            </b-button>
            <b-button
              :variant="resource.name === 'starships' ? 'success' : ''"
              @click="setResource('starships', 'length')"
            >
              Ships
            </b-button>
          </b-button-group>
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
      rightScore: 0,
      resource: {
        name: "people",
        prop: "height"
      }
    };
  },

  methods: {
    setData() {
      this.isLoading = true;

      this.swapiReq(data => {
        this.resourceCount = data.count;

        const leftPromise = this.getRandomResource();
        const rightPromise = this.getRandomResource();

        Promise.all([leftPromise, rightPromise])
          .then(results => {
            this.leftResource = results[0];
            this.rightResource = results[1];

            this.leftResource.prop = this.resource.prop;
            this.rightResource.prop = this.resource.prop;

            this.ready = true;
            this.chooseWinner(this.resource.prop);
          })
          .finally(() => (this.isLoading = false));
      });
    },

    getRandomResource() {
      return new Promise(resolve => {
        const page = Math.floor(Math.random() * this.resourcePageCount) + 1;

        this.swapiReq({ page }, data => {
          const results = data.results;
          resolve(results[Math.floor(Math.random() * results.length)]);
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

    setResource(name, prop) {
      this.resource.name = name;
      this.resource.prop = prop;
    }
  },

  computed: {
    resourcePageCount() {
      return Math.ceil(this.resourceCount / 10);
    },

    swapiReq() {
      const name = this.resource.name;

      return this.$swapi["get" + name.charAt(0).toUpperCase() + name.slice(1)];
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
