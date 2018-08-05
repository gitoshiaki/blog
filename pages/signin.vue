<template lang="pug">
    div.section
        div.columns.is-centered
            div.column.is-one-third
                div.card
                    div.section
                        form(@submit.prevent="signin")
                            h1.title.has-text-centered.is-4.has-text-grey Sign in to your account
                            div.field
                                p.control.has-icons-left
                                    input.input(v-model="email" type="email" name="email" placeholder="email")
                                    span.icon.is-small.is-left
                                        i.fas.fa-envelope
                            div.field
                                p.control.has-icons-left
                                    input.input(v-model="password" type="password" name="password" placeholder="password")
                                    span.icon.is-small.is-left
                                        i.fas.fa-lock
                            button.button.is-fullwidth.is-primary.has-text-weight-bold(type="submit", :class="{ 'is-loading' : isLoading }") Sign In 
        div.columns.is-centered
            div.column.is-one-third.has-text-centered
                p.has-text-grey-light New to Blog? <nuxt-link to="/signup">Sign up</nuxt-link>
                        
</template>

<script>
import util from '@/assets/js/api/util'
import * as url from '@/assets/js/api/url'

export default {
    layout: 'guest',
	data(){
		return {
			email: "",
            password: "",
            isLoading: false
		}
	},

	methods: {
		signin () {
            let _this = this;
            this.isLoading = true;
            util.createMethod({
                email: this.email,
                password: this.password
            }, url.ENDPOINTS.signIn, false, "POST")
                .then(function (data) {
                    localStorage.setItem("session",data.data.data.session)
                    localStorage.setItem("session_expire",data.data.data.session_expire)
                    var s = localStorage.getItem('session')
                    _this.$router.push('/')
                })
		}
	},
	
}
</script>

<style lang="scss">

</style>