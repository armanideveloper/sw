<template>
    <b-card
            :title=person.name
            tag="article"
            style="max-width: 20rem;"
            class="mb-2"
    >
        <b-list-group flush>
            <b-list-group-item>Mass: {{person['mass']}}</b-list-group-item>
            <b-list-group-item>Height: {{person['height']}}</b-list-group-item>
        </b-list-group>
    </b-card>
</template>

<script>
    export default {
        name: "Person",
        props: ['person']
    }
</script>

<style scoped>

</style>
