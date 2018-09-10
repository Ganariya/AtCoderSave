<template>
    <div>
        <!--/ Header -->
        <my-header></my-header>
        <section class="hero is-info">
            <div class="hero-body">
                <div class="container">
                    <h1 class="title">
                        AtCoder(beta)
                    </h1>
                    <h2 class="subtitle">
                        <p>To Save your error and lead to success.</p>
                    </h2>
                </div>
            </div>
        </section>
        <!-- Header /-->

        <!--/ Search -->
        <main class="columns is-centered" style="margin-top: 20px;">
            <div class="column is-three-quarters">
                <div class="field">
                    <label class="label" style="text-align: left;">コンテスト</label>
                    <div class="control">
                        <input class="input" type="text" placeholder="Search Contest" v-model="searchContestName">
                    </div>
                </div>
                <div class="field">
                    <label class="label" style="text-align: left;">難易度</label>
                    <div class="select">
                        <select v-model="searchContestLevel">
                            <option>Level</option>
                            <option>A</option>
                            <option>B</option>
                            <option>C</option>
                            <option>D</option>
                            <option>E</option>
                            <option>F</option>
                            <option>G</option>
                            <option>H</option>
                            <option>I</option>
                            <option>J</option>
                            <option>K</option>
                        </select>
                    </div>
                </div>
            </div>
        </main>
        <!-- Search -->

        <!--/ AtCoder -->
        <main class="columns is-centered" style="margin-top: 20px;">
            <div class="column is-three-quarters">
                <article class="box media">
                    <div class="media-content">
                        <!--/ コンテストごと -->
                        <div v-for="(contest, key) in filteredContests" v-bind:key="contest[0] ?contest[0].contestName : key" v-if="contest[0]">
                            <div class="box" >
                                <div class="title">{{key}}</div>
                                <contest-component v-bind:contest="contest"></contest-component>
                            </div>
                        </div>
                        <!-- コンテストごと /-->
                    </div>
                </article>
            </div>
        </main>
        <!-- AtCoder /-->

        <!--/ Footer -->
        <my-footer></my-footer>
        <!-- Footer /-->

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
                atObByContest: null,
                searchContestName: '',
                searchContestLevel: 'Level'
            }
        },
        methods: {},
        computed: {
            filteredContests() {

                /*難易度での探索*/
                let contests = {};
                if (this.searchContestLevel == 'Level') {
                    contests = this.atObByContest;
                }
                else {
                    for (let key in this.atObByContest) {
                        let good = false;
                        let problems = [];
                        for (let key2 in this.atObByContest[key]) {
                            if (this.atObByContest[key][key2].level == this.searchContestLevel) {
                                good = true;
                                problems.push(this.atObByContest[key][key2]);
                            }
                        }
                        if (good) {
                            contests[key] = problems;
                        }
                    }
                }

                console.log(contests);

                /*名前での探索*/
                let contests2 = {};
                if (this.searchContestName == '') return contests;
                for (let key in contests) {
                    var _key = key.toLowerCase();
                    var _searchContestName = this.searchContestName.toLowerCase();
                    if (_key.indexOf(_searchContestName) != -1) contests2[key] = contests[key];
                }

                return contests2;
            }
        },
        beforeCreate: function () {
            var _this = this;
            chrome.storage.local.get((items) => {
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
        name: "AtCoderPage",
    }

</script>

<style scoped>
    .box {
        margin-bottom: 1rem;
    }
</style>