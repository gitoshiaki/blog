<template lang="pug">
	div.section
		div.columns.is-centered
			div.column.is-half
				h1.title.has-text-primary.is-1 Favorite Articles
				ul(v-for="article in articles" v-if="articles.length")
					li.article
						p.has-text-right {{article.Author.name}}
						p.is-primary.has-text-weight-bold.is-size-4 {{article.title}}
						p {{article.content}}
						div.level.options
							div.level-left
								div 
									a(@click="toggleLike(article.article_id,article.liked)")
										i.fa-heart(:class="{'fas': article.liked,'far': !article.liked, }")
									span.like_count(v-if="article.like_count !== 0") {{article.like_count}}
							div.level-right
								//- a.action-text(@click="")
								//- 	i.fas.fa-comment
								a.action-text(@click="$router.push('/edit/'+article.article_id)")
									i.fas.fa-pen
								a.action-text(@click="deleteArticle(article.article_id)")
									i.fas.fa-trash-alt
						ul(v-for="comment in article.comments" v-if="article.comments.length")
							li.comment 
								p.is-size-7.has-text-grey-light {{comment.User.name}}
								p {{comment.comment}}
						form(@submit.prevent="commentArticle(article)")
							div.field.has-addons
								div.control.is-expanded
									input.input(v-model="article.mycomment" type="text" placeholder="comment...")
								div.control
									button.button.is-info(type="submit") comment
				p.no-article(v-if="articles.length === 0") No article
				button.add-button(@click="addArticle") 
					i.fas.fa-plus
    
</template>

<script>
import util from '@/assets/js/api/util'
import * as url from '@/assets/js/api/url'

export default {
	data(){
		return {
			articles: [],
		}
	},

	methods: {
		getArticles () {
            let _this = this;
            util.createMethod({
                page: 1,
                per_page: 10
            }, url.ENDPOINTS.articleLike, true, "GET")
                .then(function (data) {
                    _this.articles = data.data.data.articles;
                })
		},

		addArticle () {
			this.$router.push('/add')
		},

		deleteArticle (id) {
			let _this = this;
			util.createMethod({
				article_id: id
			}, url.ENDPOINTS.articleEndpoint, true, "DELETE")
				.then(function (data) {
					_this.getArticles();
				})
		},

		commentArticle(article) {
			let _this = this;
			util.createMethod({
				article_id: article.article_id,
				comment: article.mycomment
			}, url.ENDPOINTS.articleComment, true, "POST")
				.then(function (data) {
					_this.getArticles();
				})
		},

		toggleLike(id,is_like) {
			let _this = this;
			util.createMethod({
				article_id: id,
				is_like: !is_like
			}, url.ENDPOINTS.articleLike, true, "POST")
				.then(function (data) {
					_this.getArticles();
				})
		}
	},

	created(){
		if (process.browser) {
			this.getArticles();
		}
	},

	computed: {

	},

	components: {

	}
    
}
</script>

<style lang="scss">
	.add-button {
		position: fixed;
		right: 3rem;
		bottom: 3rem;
		width: 3rem;
		height: 3rem;
		border-radius: 3rem;
		font-size: 1rem;
		background: blue;
		color: white;
	}
	.article {
		margin: 3rem 0;
	}
	.like_count {
		display: inline-block;
		margin-left: .5rem;
	}
	.action-text {
		margin: 0 .5rem;
	}
	.comment {
		margin : 1rem 0;
	}
	.options {
		margin: 1rem 0;
	}
</style>