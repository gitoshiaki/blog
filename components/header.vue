<template lang="pug">
    nav.navbar
        div.navbar-item
            a.navbar-item.title.is-4.is-primary(href="/") My Blog
            //- h1.is-vertical.title.is-3
        div.navbar-menu
            div.navbar-end
                a.navbar-item(href="/favorites") Favorites
                a.navbar-item(@click="signout") Sign out
            //- div.navbar-item.has-dropdown.is-hoverable
            //-     a.navbar-link
            //-     div.navbar-dropdown.is-right
            //-         a.navbar-item Favorites
            //-         a.navbar-item(@click="signout") Sign out
</template>

<script>
export default {
    methods: {
		signout () {
            localStorage.setItem("session","")
            localStorage.setItem("session_expire","")
            this.$router.push('/signin')
		}
	},
}
</script>

<style lang="scss">
    .navbar {
        box-shadow: 0 0 10px 0 rgba(0,0,0,0.1);
    }
</style>