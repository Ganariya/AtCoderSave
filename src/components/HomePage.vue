<template>
    <div>
        <my-header></my-header>
        <my-footer></my-footer>
    </div>
</template>

<script>
    import MyHeader from './MyHeader.vue';
    import MyFooter from './MyFooter.vue';

    export default {
        components: {
            "MyHeader": MyHeader,
            "MyFooter": MyFooter
        },
        data() {
            return {}
        },
        name: "HomePage"
    }

</script>

<style scoped>

</style>