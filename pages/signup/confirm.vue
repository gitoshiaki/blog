<template lang="pug">
    div.section
        div.columns.is-centered
            div.column.is-one-third
                div.card
                    div.section
                        form(@submit.prevent="register")
                            h1.title.has-text-centered.is-4.has-text-grey Sign Up
                            div.field
                                p.control.has-icons-left
                                    input.input(v-model="token" type="text" name="token" placeholder="token")
                                    span.icon.is-small.is-left
                                        i.fas.fa-check-circle
                            div.field
                                p.control.has-icons-left
                                    input.input(v-model="password" type="password" name="password" placeholder="password")
                                    span.icon.is-small.is-left
                                        i.fas.fa-lock
                            div.field
                                p.control.has-icons-left
                                    input.input(type="password" name="password" placeholder="password confirm")
                                    span.icon.is-small.is-left
                                        i.fas.fa-lock
                            button.button.is-fullwidth.is-primary.has-text-weight-bold(type="submit", :class="{ 'is-loading' : isLoading }") Sign Up
        div.columns.is-centered
            div.column.is-one-third
                div.message.is-info.is-small
                    div.message-body you will receive one-time token to the email address you specify

</template>

<script>
import util from '@/assets/js/api/util'
import * as url from '@/assets/js/api/url'

export default {
    layout: 'guest',
	data(){
		return {
			errors: [],
			token: "",
			password: "",
			isLoading: false
		}
    },
    
    methods: {

        register() {
            let _this = this;
            if (!this.checkForm) {
                return false;
            }
            this.isLoading = true;
            util.createMethod({
                token: this.token,
                password: this.password
            }, url.ENDPOINTS.registUser, false, "POST")
                .then(function (data) {
                    console.log(data.data.data);
                    _this.$router.push('/signin')
                })
        },

        checkForm (e) {
            if (this.token && this.password) {
                return true;
            }

            this.errors = [];

            if (!this.token) {
                this.errors.push('token required.');
            }
            if (!this.password) {
                this.errors.push('password required.');
            }

            return false;
        }
    }
    
}
</script>

<style lang="scss">

</style>