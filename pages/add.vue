<template lang="pug">
    div.section   
        div.columns.is-centered
            div.column.is-half
                div.card
                    div.section
                        form(@submit.prevent="save")
                            h1.title.has-text-centered.is-4.has-text-grey New Article
                            div.field
                                textarea.textarea(v-model="title" rows="2" placeholder="title")
                            div.field
                                textarea.textarea(v-model="content" rows="10" placeholder="content")
                            button.button.is-fullwidth.is-primary.has-text-weight-bold(type="submit", :class="{ 'is-loading' : isLoading }") Save
</template>

<script>
import util from '@/assets/js/api/util'
import * as url from '@/assets/js/api/url'

export default {
	data(){
		return {
			title: "What is Lorem Ipsum?",
            content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            isLoading: false
		}
	},

	methods: {
		save () {
            let _this = this;
            this.isLoading = true;
            util.createMethod({
                title: this.title,
                content: this.content
            }, url.ENDPOINTS.articleEndpoint, true, "POST")
                .then(function (data) {
                    console.log(data.data.data);
                    _this.$router.push('/');
                })
		}
	},
	
}
</script>

<style lang="scss">

</style>