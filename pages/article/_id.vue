<template>
  <div>
    <Header></Header>
    <div class="article">
      <p></p>
      <div class="page__container page__main">

        <div class="page__content article__content">
          <br>

          <h1 class="article-title">{{article.title}}</h1>
          <mu-flex class="article-tags">
            <mu-icon size="20" value="local_offer"></mu-icon>
            <span style="font-size: 13px" v-for="(item, index) in article.tags">&nbsp;{{item.name}} {{index === article.tags.length-1 ? '' : ',&nbsp;&nbsp;'}}</span>
          </mu-flex>
          <mu-flex class="article-categories">
            <mu-icon size="20" value="class"></mu-icon>
            <span style="font-size: 13px" v-for="(item, index) in article.categories">&nbsp;{{item.name}} {{index === article.categories.length-1 ? '' : ',&nbsp;'}}</span>
          </mu-flex>
          <p class="article-time">{{article.time}}</p>
          <div v-highlight class="markdown-body article__details" v-html="showContent"></div>

        </div>

        <div class="page__sidebar">
          <side-list></side-list>
        </div>

      </div>
    </div>
    <Footer></Footer>

    <back-top></back-top>
  </div>
</template>

<script>
    import SideList from "../../components/SideList";
    import BackTop from "../../components/BackTop";
    import marked from 'marked'

    import {getArticleById} from "../../api/article";

    import Header from "../../components/Header";
    import Footer from "../../components/Footer";
    import {getUserById} from "../../api/user";

    export default {
        name: "Article",
        components: {SideList, Header, Footer, BackTop},
        data() {
            return {
                current: 1,
                userInfo: {}
            }
        },
        async asyncData({params}) {

            let articleId = params.id;


            let resp = await getArticleById(articleId);

            marked.setOptions({
                renderer: new marked.Renderer(),
                gfm: true,
                tables: true,
                breaks: false,
                pedantic: false,
                smartLists: true,
                smartypants: false
            });

            return {showContent: marked(resp.content.content), article: resp.content}
        },
        methods: {
            init() {

            }
        },
        created() {
            this.init()
        },
        watch: {
            '$route'(to, from) {
                if (to.params.id !== from.params.id) {
                    this.init()
                }
            }
        }
    }
</script>

<style scoped lang="scss">

  @import "../../assets/css/index";

  .article-title {
    color: $theme-widget-color;
  }

  .article-tags {
    color: #666;
    margin-top: 8px;
  }

  .article-categories {
    color: #666;
    margin-top: 8px;
  }

  .article-time {
    color: $theme-widget-color;
  }

  /*.markdown-body > > > pre {*/
  /*  border-style: solid;*/
  /*  border-width: 0.5px;*/
  /*  border-color: #e0e3e7;*/
  /*  !*border-radius: 7px;*!*/
  /*  !*background: #333333;*!*/
  /*  !*background: #fdfdfe;*!*/
  /*  background: #2f2f2f;*/
  /*}*/

  /*.markdown-body > > > code {*/
  /*  font-size: 12px;*/
  /*  font-family: my-font;*/
  /*}*/

  /*.markdown-body {*/
  /*  box-sizing: border-box;*/
  /*  !*min-width: 200px;*!*/
  /*  !*max-width: 980px;*!*/
  /*  font-size: 14px;*/
  /*  margin: 0 auto;*/
  /*  padding: 1px;*/
  /*  color: #666;*/
  /*  font-family: my-font;*/
  /*}*/

  /*.markdown-body > > > blockquote {*/
  /*  border-left: 4px solid rgb(66, 185, 131);*/
  /*  padding: 10px 15px;*/
  /*  color: rgb(119, 119, 119);*/
  /*  background-color: rgba(66, 185, 131, 0.1);*/
  /*}*/

</style>
