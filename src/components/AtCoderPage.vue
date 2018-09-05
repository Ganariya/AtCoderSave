<template>
    <div>
        <my-header></my-header>
        <button class="button is-primary" @click="showAtCoder">AtCoderの証</button>
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
            return {
                atcoderObjects: null
            }
        },
        methods: {
            showAtCoder(){
                console.log(this.atcoderObjects);
            }
        },
        beforeCreate: function () {
            var _this = this;
            chrome.storage.local.get((items) => {
                _this.atcoderObjects = items['atcoder'];
            })
        },
        name: "HomePage",
    }

</script>

<style scoped>

</style>