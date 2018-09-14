<template>
    <div>
        <!--/ Header -->
        <my-header></my-header>
        <section class="hero is-success" style="background-color: gray">
            <div class="hero-body">
                <div class="container">
                    <h1 class="title">
                        Codeforces
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
                    <label class="label" style="text-align: left;">Round</label>
                    <div class="control">
                        <input class="input" type="text" placeholder="Search Contest" v-model="searchContestRound">
                    </div>
                </div>
                <div class="field">
                    <label class="label" style="text-align: left;">コンテスト</label>
                    <div class="control">
                        <input class="input" type="text" placeholder="Search Contest" v-model="searchContestName">
                    </div>
                </div>

                <div class="columns">
                    <div class="column">
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
                    <div class="column">
                        <div class="field">
                            <b-checkbox type="is-warning" size="is-medium" v-model="searchFavorite">
                                お気に入り
                            </b-checkbox>
                        </div>
                    </div>
                </div>
            </div>
        </main>
        <!-- Search -->

        <!--/ Codeforces -->
        <main class="columns is-centered" style="margin-top: 20px;">
            <div class="column is-three-quarters">
                <article class="box media">
                    <div class="media-content">
                        <!--/ コンテストごと -->
                        <div v-for="(contest, key) in filteredContests"
                             v-bind:key="contest[0] ?contest[0].contestName : key" v-if="contest[0]">
                            <div class="box">
                                <div class="title">{{key}}</div>
                                <contest-component v-bind:contest="contest"
                                                   v-on:deleteOriginalProblem="deleteOriginalProblem" v-on:favoriteSet="favoriteSet"></contest-component>
                            </div>
                        </div>
                        <!-- コンテストごと /-->
                    </div>
                </article>
            </div>
        </main>
        <!-- Codeforces /-->

        <!--/ Footer -->
        <my-footer></my-footer>
        <!-- Footer /-->

    </div>
</template>

<script>
    import MyHeader from './MyHeader.vue';
    import MyFooter from './MyFooter.vue';
    import ContestComponent from './Codeforces/ContestComponent.vue';

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
                searchContestLevel: 'Level',
                searchContestRound: '',
                searchFavorite: false
            }
        },
        methods: {
            deleteOriginalProblem(problemId) {
                let newCodeObByContest = {};
                for (let key in this.atObByContest) {
                    let contests = [];
                    for (let contest of this.atObByContest[key]) if (contest.id != problemId) contests.push(contest);
                    newCodeObByContest[key] = contests;
                }
                this.codeObByContest = newCodeObByContest;
            },
            favoriteSet(favorite, problemId){
                for(let key in this.atObByContest){
                    for(let key2 in this.atObByContest[key]){
                        if(this.atObByContest[key][key2].id == problemId) this.atObByContest[key][key2].favorite = favorite;
                    }
                }
            }
        },
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

                /*ラウンドでの探索*/
                let contests2 = {};
                if (this.searchContestRound == '') contests2 = contests;
                else {
                    for (let key in contests) {
                        let good = false;
                        let problems = [];
                        for (let key2 in contests[key]) {
                            if (contests[key][key2].contestRound.indexOf(this.searchContestRound) != -1) {
                                good = true;
                                problems.push(contests[key][key2]);
                            }
                        }
                        if (good) {
                            contests2[key] = problems;
                        }
                    }
                }

                /*名前での探索*/
                let contests3 = {};
                if (this.searchContestName == '') contests3 = contests2;
                else {
                    for (let key in contests2) {
                        let _key = key.toLowerCase();
                        let _searchContestName = this.searchContestName.toLowerCase();
                        if (_key.indexOf(_searchContestName) != -1) contests3[key] = contests2[key];
                    }
                }

                /*お気に入りでの探索*/
                let contests4 = {};
                if (this.searchFavorite == false) contests4 = contests3;
                else{
                    for (let key in contests3) {
                        let good = false;
                        let problems = [];
                        for (let key2 in contests3[key]) {
                            if (contests3[key][key2].favorite) {
                                good = true;
                                problems.push(contests3[key][key2]);
                            }
                        }
                        if (good) {
                            contests4[key] = problems;
                        }
                    }
                }

                return contests4;
            }
        },
        beforeCreate: function () {
            let _this = this;
            chrome.storage.local.get((items) => {
                _this.atObject = items['codeforces'];
                _this.atObByContest = {};
                for (let i in _this.atObject) {
                    let contestName = _this.atObject[i].contestName;
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
        name: "CodeforcesPage",
    }

</script>

<style scoped>
    .box {
        margin-bottom: 1rem;
    }
</style>