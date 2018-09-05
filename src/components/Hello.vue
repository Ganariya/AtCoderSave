<template>
    <p @click="C">
        {{name}}
    </p>
</template>

<script>
    export default {
        data: function () {
            return {
                name: 'hello'
            }
        },
        methods: {
            C: function () {
                this.name = "try";
            }
        }
    }
</script>

<style scoped>

</style>