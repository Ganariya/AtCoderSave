<template>
    <tr>
        <td><a v-bind:href="problem.url" target="_blank">{{problem.title}}</a></td>
        <td>{{problem.level}}</td>
        <td>{{moment(problem.date).format("YYYY/MM/DD HH:mm") +" ("+ moment().diff(moment(problem.date), 'hours')+"h) "}}</td>
        <td>{{problem.solvedPeople}}</td>
        <td>
            <!--/ ボタン -->
            <a class="button is-outlined" style="background-color: #55acee"
               v-bind:href="'https://twitter.com/intent/tweet?text='+problem.title+'('+problem.contestName.replace('#', '')+problem.level+')やるよ！&url='+problem.url+'&hashtags=AtBookMark'"
               target="_blank">
                <span class="icon"><i class="fab fa-twitter" style="color: white;"></i></span>
            </a>
            <a class="button is-danger" @click="deleteProblem">
                <span class="icon is-small">
                    <i class="fas fa-times"></i>
                </span>
            </a>
            <a class="button is-success" id="toSomeOne" @click="clickButtonToModal">
                <span class="icon is-small">
                    <i class="fa fa-chevron-right"></i>
                </span>
            </a>
            <a class="button is-warning" @click="clickStarButton">
                <span class="icon is-small" v-bind:class="{'favorite': this.favorite}">
                    <i class="fa fa-star"></i>
                </span>
            </a>
            <!-- ボタン /-->
        </td>

        <!--/ モーダル -->
        <div v-bind:class="{'modal':true, 'is-active': modalshow}" id="modal">
            <div class="modal-background" @click="clickBackgroundToModal"></div>
            <div class="modal-content">
                <div v-bind:id="'modal-content'+problem.id" style="padding: 20px 30px;"></div>
            </div>
            <button class="modal-close is-large" aria-label="close" @click="clickBackgroundToModal"></button>
        </div>
        <!-- モーダル /-->
    </tr>

</template>

<script>

    export default {
        components: {},
        props: [
            'problem',
            'index'
        ],
        data() {
            return {
                moment: moment,
                modalshow: false,
                doc: null,
                favorite: !!this.problem.favorite
            }
        },
        methods: {
            clickButtonToModal() {
                let _this = this;
                this.modalshow = !this.modalshow;
                $.ajax({
                    url: this.problem.url,
                    type: 'GET',
                    dataType: 'html',
                    success: function (data) {
                        data = data.replace(/<img[^>]+>/gi, '');
                        $('#modal-content' + _this.problem.id).html($(data).find(".problem-statement").children().eq(1).html());
                    }
                })
            },
            clickBackgroundToModal() {
                this.modalshow = !this.modalshow;
            },
            deleteProblem() {
                this.$emit('deleteSyncProblem', this.index, this.problem.id);
                iziToast.show({
                    theme: 'light',
                    title: '✕',
                    titleColor: '#000000',
                    titleSize: '16px',
                    message: 'Delete!',
                    messageColor: '#000000',
                    messageSize: '14px',
                    backgroundColor: '#FF4500',
                });
            },
            clickStarButton(){
                this.favorite = !this.favorite;
                if(this.favorite){
                    iziToast.show({
                        theme: 'light',
                        title: '★',
                        titleColor: '#ffffff',
                        titleSize: '16px',
                        message: 'My Favorite!',
                        messageColor: '#ffffff',
                        messageSize: '14px',
                        backgroundColor: '#FFD700',
                    });
                }else{
                    iziToast.show({
                        title: '★',
                        titleColor: '#000000',
                        titleSize: '16px',
                        message: 'Not my favorite...',
                        messageColor: '#000000',
                        messageSize: '14px',
                        backgroundColor: '#696969',
                    });
                }
                this.$emit('favoriteSync', this.favorite, this.problem.id);
                let _this = this;
                chrome.storage.local.get((items) => {
                    let codeforces = items['codeforces'];
                    let newCodeforces = [];
                    for(let problem of codeforces){
                        if(problem.id != _this.problem.id){
                            newCodeforces.push(problem);
                        }else{
                            problem.favorite = _this.favorite;
                            newCodeforces.push(problem);
                        }
                    }
                    items['codeforces'] = newCodeforces;
                    chrome.storage.local.set(items);
                })
            }
        },
        beforeCreate: function () {
        },
        name: "ProblemComponent",
    }

</script>

<style scoped>
    .favorite{
        color: #ffffff;
    }
</style>