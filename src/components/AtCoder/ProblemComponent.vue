<template>
    <tr>
        <td><a v-bind:href="problem.url" target="_blank">{{problem.title}}</a></td>
        <td>{{problem.level}}</td>
        <td>{{moment(problem.date).format("YYYY-MM-DD HH:mm")}}</td>
        <td>{{moment().diff(moment(problem.date), 'hours')+"h"}}</td>
        <td>
            <a class="button is-outlined" style="background-color: #55acee"
               v-bind:href="'https://twitter.com/intent/tweet?text='+problem.title+'('+problem.contestName.toUpperCase()+problem.level+')やるよ！&url='+problem.url+'&hashtags=AtBookMark'"
               target="_blank">
                <span class="icon"><i class="fab fa-twitter" style="color: white;"></i></span>
            </a>
            <a class="button is-danger">
                <span class="icon is-small">
                    <i class="fas fa-times"></i>
                </span>
            </a>

            <a class="button is-success" id="toSomeOne" @click="clickButtonToModal">
                <span class="icon is-small">
                    <i class="fa fa-chevron-right"></i>
                </span>
            </a>
            <div v-bind:class="{'modal':true, 'is-active': modalshow}" id="modal">
                <div class="modal-background" @click="clickBackgroundToModal"></div>
                <div class="modal-content">
                    <div v-bind:id="'modal-content'+problem.id" style="padding: 20px 30px;">

                    </div>
                </div>
                <button class="modal-close is-large" aria-label="close" @click="clickBackgroundToModal"></button>
            </div>

        </td>
    </tr>
</template>

<script>

    export default {
        components: {},
        props: [
            'problem'
        ],
        data() {
            return {
                moment: moment,
                modalshow: false,
                doc: null
            }
        },
        methods: {
            clickButtonToModal() {
                var _this = this;
                this.modalshow = !this.modalshow;
                $.ajax({
                    url: this.problem.url,
                    type: 'GET',
                    dataType: 'html',
                    success: function (data) {
                        data = data.replace(/<img[^>]+>/gi,'');
                        $('#modal-content' + _this.problem.id).html($(data).find('#task-statement').html());
                    }
                })
            },
            clickBackgroundToModal() {
                this.modalshow = !this.modalshow;
            }
        },
        beforeCreate: function () {
        },
        name: "ProblemComponent",
    }

</script>

<style scoped>

</style>