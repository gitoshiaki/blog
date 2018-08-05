import Vuex from 'vuex'
import util from '@/assets/js/api/util'
import * as url from '@/assets/js/api/url'

const store = () => new Vuex.Store({

    state: {
        my_articles : [],
        user_articles : {}
    },
    
    mutations: {
        getMyArticles(state) {
            util.createMethod({
                page: 1,
                per_page: 10
            }, url.ENDPOINTS.articleEndpoint, true, "GET")
                .then(function (data) {
                    console.log(data.data.data.articles);
                    state.my_articles = data.data.data.articles;
                })
        },
        getUserArticles(state, userid) {
            util.createMethod({
                memid: userid,
                page: 1,
                per_page: 10
            }, url.ENDPOINTS.articleUser, true, "GET")
                .then(function (data) {
                    console.log(data.data.data.articles);
                    state.user_articles[userid] = data.data.data.articles;
                    console.log(state.user_articles[userid]);
                })
        }
    }
})

export default store