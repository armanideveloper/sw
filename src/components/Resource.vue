<template>
  <b-container>
    <b-row>
      <b-col>
        <b-card-title>
          <b-badge variant="success">{{ score }}</b-badge>
        </b-card-title>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-card tag="article" :class="{ 'alert-success': person.winner }">
          <b-card-title>
            {{ person.name }}
          </b-card-title>
          <b-list-group flush>
            <b-list-group-item>Height: {{ person["height"] }}</b-list-group-item>
          </b-list-group>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: "Person",
  props: ["person", "score"]
};
</script>
