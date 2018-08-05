<template lang="pug">
    div.section   
        div.columns.is-centered
            div.column.is-half
                div.card
                    div.section
                        form(@submit.prevent="saveArticle")
                            h1.title.has-text-centered.is-4.has-text-grey Edit Article
                            div.field
                                textarea.textarea(v-model="article.title" placeholder="title")
                            div.field
                                textarea.textarea(v-model="article.content" placeholder="content")
                            button.button.is-fullwidth.is-primary.has-text-weight-bold(type="submit", :class="{ 'is-loading' : isLoading }") Save
</template>

<script>
import util from '@/assets/js/api/util'
import * as url from '@/assets/js/api/url'

export default {
	data(){
		return {
            id: "",
			article: {
                title: "",
                content:  ""
            },
            isLoading: false
		}
    },
    
    created(){
        if (process.browser) {
            this.getArticle(this.$route.params.id);
        }
    },

	methods: {
		saveArticle () {
            let _this = this;
            this.isLoading = true;
            util.createMethod({
                article_id: this.article.article_id,
                title: this.article.title,
                content: this.article.content,
            }, url.ENDPOINTS.articleEndpoint, true, "PUT")
                .then(function (data) {
                    console.log(data.data.data);
                    _this.$router.push('/');
                })
        },
        
        getArticle (id) {
            let _this = this;
            util.createMethod({
                article_id: id
            }, url.ENDPOINTS.articleDetail, true, "GET")
                .then(function (data) {
                    _this.article = data.data.data;
                    console.log(data.data.data);
                })
        },

    },
	
    beforeRouteUpdate (to, from, next) {
        console.log(this.$route.params.id);
        this.id = this.$route.params.id;
        this.getArticle(this.id);
        console.log("created");
        next()
    }
}
</script>

<style lang="scss">

</style>