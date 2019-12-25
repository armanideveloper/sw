<template>
  <b-card :title="person.name" tag="article" :class="{ 'alert-success': person.winner }">
    <b-list-group flush>
      <b-list-group-item>Height: {{ person["height"] }}</b-list-group-item>
    </b-list-group>
  </b-card>
</template>

<script>
export default {
  name: "Person",
  props: ["person"]
};
</script>
