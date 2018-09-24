<template>
    <div>
        <!--/ Header -->
        <my-header></my-header>
        <section class="hero is-info">
            <div class="hero-body">
                <div class="container">
                    <h1 class="title">
                        Home
                    </h1>
                    <h2 class="subtitle">
                        <p>現在改築中...</p>
                    </h2>
                </div>
            </div>
        </section>
        <!-- Header /-->

        <!--/ Search -->
        <main class="columns is-centered" style="margin-top: 20px;">
            <div class="column is-three-quarters">
                <div class="field">
                    <label class="label" style="text-align: left; line-height: 2rem">
                        AtCoder User Name
                        <button class="button is-success" @click="setUserName">Save</button>
                    </label>
                    <div class="control">
                        <input class="input" type="text" placeholder="UserName" v-model="atCoderUserName">
                    </div>
                </div>
                <div class="field">
                    <label class="label" style="text-align: left; line-height: 2rem">
                        AtCoderSolved更新
                        <button class="button is-black" @click="updateSolvedAtCoder">Update</button>
                    </label>
                </div>
            </div>
        </main>
        <!-- Search -->

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
            return {
                atCoderUserName: null
            }
        },
        name: "HomePage",
        methods: {
            setUserName() {
                let _this = this;
                if (_this.atCoderUserName == null) return;
                chrome.storage.local.get((items) => {
                    items['atcoderUserName'] = _this.atCoderUserName;
                    chrome.storage.local.set(items);
                    iziToast.success({
                        title: 'Saved!',
                        message: _this.atCoderUserName
                    });
                })
            },
            numToChar(num) {
                let res = String.fromCharCode('a'.charCodeAt(0) + parseInt(num, 10));
                return res;
            },
            charTo2(ch) {
                let res = String.fromCharCode(ch.charCodeAt(0) + parseInt('2', 10));
                return res;
            },
            updateSolvedAtCoder() {
                let _this = this;
                if (_this.atCoderUserName == null) return;
                let url = "http://kenkoooo.com/atcoder/atcoder-api/results?user=" + _this.atCoderUserName;
                axios
                    .get(url)
                    .then((res) => {
                        if (res['data'].length > 0) {
                            console.log(res);

                            //スクレイピングデータ
                            let acProblems = {};
                            for (let data of res['data']) {
                                if (data.result == "AC") {

                                    //数字を変換
                                    if ((data.contest_id.substr(0, 3) == "arc" || data.contest_id.substr(0, 3) == "abc") && data.contest_id.substr(3, 3) <= "042") {
                                        if (data.problem_id[7] >= '0' && data.problem_id[7] <= '9') {
                                            let problem_id = data.problem_id.substr(0, 6);
                                            problem_id += '_' + _this.numToChar(data.problem_id[7]);
                                            data.problem_id = problem_id;
                                        }
                                    }

                                    //コンテストがABCなら
                                    if (data.contest_id.substr(0, 3) == "abc") {
                                        //問題IDがARCなら
                                        if (data.problem_id.substr(0, 3) == "arc") {
                                            let ch = data.problem_id.slice(-1);
                                            ch = _this.charTo2(ch);
                                            data.contest_id += ch;
                                        }
                                        //問題IDがABCなら
                                        if (data.problem_id.substr(0, 3) == "abc") {
                                            let ch = data.problem_id.slice(-1);
                                            data.contest_id += ch;
                                        }
                                    } else if (data.contest_id.substr(0, 3) == "arc") {
                                        //コンテストがARCなら
                                        let ch = data.problem_id.slice(-1);
                                        data.contest_id += ch;
                                    } else {
                                        //その他
                                        let ch = data.problem_id.slice(-1);
                                        data.contest_id += ch;
                                    }

                                    //コンテスト+難易度でカウント
                                    if (acProblems[data.contest_id] == null) acProblems[data.contest_id] = 1;
                                    else acProblems[data.contest_id]++;
                                }
                            }

                            //設定
                            chrome.storage.local.get((items) => {
                                let atObjects = [];
                                for (let item of items['atcoder']) {
                                    item.solved = 0;
                                    for (let key in acProblems) if (item.contestName == key.slice(0, -1) && item.level.toLowerCase() == key.slice(-1)) item.solved += acProblems[key];
                                    atObjects.push(item);
                                }
                                items['atcoder'] = atObjects;
                                chrome.storage.local.set(items, () => {
                                    iziToast.success({
                                        title: 'Finish!',
                                        message: 'update finish'
                                    })
                                });
                            })
                        }
                    })
                    .catch((err) => {
                        iziToast.error({
                            title: 'Error',
                            message: 'Sorry, failed...'
                        })
                    })
            }
        },
        beforeCreate: function () {
            let _this = this;
            chrome.storage.local.get((items) => {
                if (items['atcoderUserName']) _this.atCoderUserName = items['atcoderUserName'];
                chrome.storage.local.set(items);
            })

        }
    }

</script>

<style scoped>

</style>