<template>
    <div>
        <!--/ Header -->
        <my-header></my-header>
        <section class="hero is-info">
            <div class="hero-body">
                <div class="container">
                    <h1 class="title">
                        CSAcademy
                    </h1>
                    <h2 class="subtitle">
                        <p>現在改築中...</p>
                    </h2>
                </div>
            </div>
        </section>
        <!-- Header /-->

        <!--/ Footer -->
        <my-footer></my-footer>
        <!-- Footer /-->

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
        name: "CSA"
    }

</script>

<style scoped>

</style>