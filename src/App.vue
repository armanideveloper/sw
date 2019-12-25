<template>
  <div id="app">
    <b-container>
      <b-row>
        <b-col>
          <Person :person="leftPerson" />
        </b-col>
        <b-col>
          <Person :person="rightPerson" />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Person from './components/Person.vue'

export default {
  name: "app",

  components: {
    Person
  },

  data() {
    return {
      peopleCount: 1,
      people: [],
      leftPerson: {},
      rightPerson: {}
    };
  },

  mounted() {
    this.setData();
  },

  methods: {
    setData() {
      this.$swapi.getPeople(data => {
        this.peopleCount = data.count;
        this.people = data.results;
        this.setPerson('leftPerson');
        this.setPerson('rightPerson');
      });
    },

    setPerson(pos) {
      this.getRandomPerson().then(p => {
        this[pos] = p;
      });
    },

    getRandomPerson() {
      return new Promise(resolve => {
        const page = Math.floor(Math.random() * this.peoplePageCount) + 1;

        this.$swapi.getPeople({page}, data => {
          const people = data.results;
          resolve(people[Math.floor(Math.random() * people.length)])
        });
      });
    }
  },

  computed: {
    peoplePageCount() {
      return Math.ceil(this.peopleCount / 10)
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
