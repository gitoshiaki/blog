<template lang="pug">
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
</template>

<script>
export default {
    name : "TheArticle",
    props: {
        article: Object
    }
}
</script>
