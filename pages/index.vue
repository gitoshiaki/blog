<template lang="pug">
	div.section
		div.columns.is-centered
			div.column.is-half
				h1.title.has-text-primary.is-1 My Articles
				ul(v-for="article in $store.state.my_articles" v-if="$store.state.my_articles.length")
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
								a.is-size-7.has-text-grey-light(@click="userArticles(comment.User.user_id)") {{comment.User.name}}
								p {{comment.comment}}
						form(@submit.prevent="commentArticle(article)")
							div.field.has-addons
								div.control.is-expanded
									input.input(v-model="article.mycomment" type="text" placeholder="comment...")
								div.control
									button.button.is-info(type="submit") comment
				p.no-article(v-if="$store.state.my_articles.length === 0") No article
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

		addArticle () {
			this.$router.push('/add')
		},

		deleteArticle (id) {
			let _this = this;
			util.createMethod({
				article_id: id
			}, url.ENDPOINTS.articleEndpoint, true, "DELETE")
				.then(function (data) {
					_this.$store.commit('getMyArticles')
				})
		},

		commentArticle(article) {
			let _this = this;
			util.createMethod({
				article_id: article.article_id,
				comment: article.mycomment
			}, url.ENDPOINTS.articleComment, true, "POST")
				.then(function (data) {
					_this.$store.commit('getMyArticles')
				})
		},

		toggleLike(id,is_like) {
			let _this = this;
			util.createMethod({
				article_id: id,
				is_like: !is_like
			}, url.ENDPOINTS.articleLike, true, "POST")
				.then(function (data) {
					_this.$store.commit('getMyArticles')
				})
		},

		userArticles (userid) {
            this.$router.push('/user/'+userid)
		}
	},

	created(){
		if (process.browser) {
			this.$store.commit('getMyArticles')
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