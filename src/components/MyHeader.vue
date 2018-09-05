<template>
    <div>
        ヘッダー
        <router-link to="/">Home</router-link>
        <router-link to="/AtCoder">AtCoder</router-link>
        <router-link to="/Codeforces">Codeforces</router-link>
        <router-link to="/CSAcademy">CSAcademy</router-link>
        <router-link to="/AOJ">AOJ</router-link>
    </div>
</template>

<script>
    export default {
        data: function () {
            return {}
        },
        name: 'MyHeader'
    }
</script>

<style scoped>

</style>