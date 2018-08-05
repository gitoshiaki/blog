<template lang="pug">
	div.section
		div.columns.is-centered
			div.column.is-one-third
				div.card
					div.section
						form(@submit.prevent="signup")
							h1.title.has-text-centered.is-4.has-text-grey Sign up
							div.field
								p.control.has-icons-left
									input.input(v-model="email" type="email" name="email" placeholder="email")
									span.icon.is-small.is-left
										i.fas.fa-envelope
							div.field
								p.control.has-icons-left
									input.input(v-model="name" type="text" name="name" placeholder="username")
									span.icon.is-small.is-left
										i.fas.fa-user
							ul.errors(v-if="errors.length")
								li.has-text-danger.is-size-7(v-for="error in errors") {{error}}
							button.button.is-fullwidth.is-primary.has-text-weight-bold(type="submit", :class="{ 'is-loading' : isLoading }") Submit
		div.columns.is-centered
			div.column.is-one-third.has-text-centered
				p.has-text-grey-light Already have an account? <nuxt-link to="/signin">Sign in</nuxt-link>
</template>

<script>
import util from '@/assets/js/api/util'
import * as url from '@/assets/js/api/url'

export default {
	layout: 'guest',
	data(){
		return {
			errors: [],
			email: "",
			name: "",
			isLoading: false
		}
	},

	methods: {

		signup () {
			let _this = this;
			if (!this.checkForm) {
				return false;
			}
			this.isLoading = true;
			util.createMethod({
				email: this.email,
				name: this.name
			},url.ENDPOINTS.signUp,false,"POST")
				.then(function(data){
					console.log(data.data.data);
					_this.$router.push('/signup/confirm')
				})
		},

		checkForm (e) {
			if (this.name && this.email) {
				return true;
			}

			this.errors = [];

			if (!this.email) {
				this.errors.push('email required.');
			}
			if (!this.name) {
				this.errors.push('name required.');
			}

				return false;
			}
		},
	
}
</script>

<style lang="scss">

</style>