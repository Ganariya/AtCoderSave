<template>
    <div>
        <my-header></my-header>
        <section class="hero is-info">
            <div class="hero-body">
                <div class="container">
                    <h1 class="title">
                        AtCoder
                    </h1>
                    <h2 class="subtitle">
                        To Save your error and lead to success.
                    </h2>
                </div>
            </div>
        </section>
        <main class="columns is-centered" style="margin-top: 20px;">
            <div class="column is-three-quarters">
                <article class="box media">
                    <div class="media-content">
                        <div v-for="(contest, key) in atObByContest" v-bind:key="contest[0].contestName">
                            <div class="box">
                                <div class="title">{{key}}</div>
                                <contest-component v-bind:contest="contest"></contest-component>
                            </div>
                        </div>
                    </div>
                </article>
            </div>
        </main>
        <my-footer></my-footer>
    </div>
</template>

<script>
    import MyHeader from './MyHeader.vue';
    import MyFooter from './MyFooter.vue';
    import ContestComponent from './AtCoder/ContestComponent.vue';

    export default {
        components: {
            "MyHeader": MyHeader,
            "MyFooter": MyFooter,
            "ContestComponent": ContestComponent
        },
        data() {
            return {
                atObject: null,
                atObByContest: null
            }
        },
        methods: {},
        beforeCreate: function () {
            var _this = this;
            chrome.storage.local.get((items) => {
                console.log(items);
                _this.atObject = items['atcoder'];
                _this.atObByContest = {};
                for (let i in _this.atObject) {
                    let contestName = _this.atObject[i].contestName.toUpperCase();
                    if (_this.atObByContest[contestName]) {
                        _this.atObByContest[contestName].push(_this.atObject[i]);
                    } else {
                        _this.atObByContest[contestName] = [];
                        _this.atObByContest[contestName].push(_this.atObject[i]);
                    }
                }
                let obj = {};
                Object.keys(_this.atObByContest).sort().forEach(key => obj[key] = _this.atObByContest[key]);
                _this.atObByContest = obj;
            })
        },
        name: "HomePage",
    }

</script>

<style scoped>
    .box {
        margin-bottom: 1rem;
    }
</style>