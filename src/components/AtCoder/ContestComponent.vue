<template>
    <div>
        <table class="table is-hoverable is-fullwidth" style="table-layout: fixed">
            <thead>
            <tr>
                <th>タイトル</th>
                <th>難易度</th>
                <th>Book</th>
                <th>Elapsed</th>
            </tr>
            </thead>
            <tbody>
            <problem-component v-for="problem in sortedProblem" v-bind:key="problem.id" v-bind:problem="problem"></problem-component>
            </tbody>
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

        },
        computed:{
            sortedProblem: function () {
                return this.contest.sort(function(a, b){
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