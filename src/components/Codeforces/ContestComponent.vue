<template>
    <div>
        <table class="table is-hoverable is-fullwidth" style="table-layout: fixed">
            <!--/ ヘッダ -->
            <thead>
                <tr>
                    <th>タイトル</th>
                    <th>難易度</th>
                    <th>Book</th>
                    <th>People</th>
                </tr>
            </thead>
            <!-- ヘッダ /-->
            <!--/ ボディ -->
            <tbody>
                <problem-component v-for="(problem, index) in sortedProblem" v-bind:key="problem.id"
                                   v-bind:problem="problem" v-bind:index="index"
                                   v-on:deleteSyncProblem="deleteSyncProblem" v-on:favoriteSync="favoriteSync"></problem-component>
            </tbody>
            <!-- ボディ /-->
        </table>
    </div>
</template>

<script>

    import ProblemComponent from './ProblemComponent.vue';

    export default {
        components: {
            ProblemComponent
        },
        props: [
            'contest'
        ],
        data() {
            return {}
        },
        methods: {
            deleteSyncProblem(index, problemId) {
                chrome.storage.local.get((items) => {
                    let codeforces = items['codeforces'];
                    let newCodeforces = [];
                    for(let problem of codeforces) if(problem.id != problemId) newCodeforces.push(problem);
                    items['codeforces'] = newCodeforces;
                    chrome.storage.local.set(items);
                    this.$emit('deleteOriginalProblem', problemId);
                })
            },
            favoriteSync(favorite, problemId){
                this.$emit('favoriteSet', favorite, problemId);
            }
        },
        computed: {
            sortedProblem: function () {
                return this.contest.sort(function (a, b) {
                    return a.level > b.level;
                });
            }
        },
        beforeCreate: function () {
        },
        name: "ContestComponent",
    }

</script>

<style scoped>

</style>