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
        <b-card tag="article" :class="{ 'alert-success': resource.winner }">
          <b-card-title>
            {{ resource.name }}
          </b-card-title>
          <b-list-group flush>
            <b-list-group-item>
              {{label}}: {{ resource[resource.prop] }}
            </b-list-group-item>
          </b-list-group>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: "Resource",
  props: ["resource", "score"],

  computed: {
    label() {
      return this.resource.prop.charAt(0).toUpperCase() + this.resource.prop.slice(1);
    }
  }
};
</script>
