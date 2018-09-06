<template>
    <div>
        {{contest[0].contestName}}
    </div>
</template>

<script>
    export default {
        components: {
        },
        props:[
            'contest'
        ],
        data() {
            return {
            }
        },
        methods: {
        },
        beforeCreate: function () {
        },
        name: "ContestComponent",
    }

</script>

<style scoped>

</style>