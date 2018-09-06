<template>
    <div>
        <nav class="navbar is-link" role="navigation" aria-label="main navigation" style="margin-bottom: 0;border-radius: 0; background-color: #3F51B5">
            <div class="navbar-brand" style="padding-left: 0">
                <router-link to="/" tag="a" class="navbar-item">
                    <img src="logo.png" alt="Bulma: a modern CSS framework based on Flexbox" style="max-height: 4rem">
                </router-link>
            </div>
            <div class="navbar-menu is-active">
                <div class="navbar-end">
                    <router-link to="/" tag="a" class="navbar-item">Home</router-link>
                    <router-link to="/AtCoder" tag="a" class="navbar-item">AtCoder</router-link>
                    <router-link to="/Codeforces" tag="a" class="navbar-item">Codeforces</router-link>
                    <router-link to="/CSAcademy" tag="a" class="navbar-item">CSAcademy</router-link>
                    <router-link to="/AOJ" tag="a" class="navbar-item">AOJ</router-link>
                </div>
            </div>
        </nav>
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