<template>
    <div>
        <MyHeader></MyHeader>
        <button @click="onclick" class="button is-primary">
            click
        </button>
        <Hello></Hello>
    </div>
</template>

<script>

    import Hello from './Hello.vue';
    import MyHeader from './MyHeader.vue';

    export default {
        data: function () {
            return {
                text: ""
            }
        },
        methods: {
            onclick: function () {
                console.log("おしたおｌ！！");
            }
        },
        components: {
            MyHeader,
            Hello
        }
    }
</script>

<style scoped>

</style>