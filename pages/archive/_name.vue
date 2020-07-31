<template>
  <div>
    <Header></Header>
    <div class="archive">
      <p></p>
      <div class="page__container page__main">

        <div class="page__content">
          <br>
          <div class="archive-div">
            <a @click="yearClick(item)" :style="item === year ? 'color: #4183c4' : ''" v-for="(item, index) in years" :key="index" class="archive-time">
              {{item}}
            </a>
          </div>

          <div>
            <mu-card v-for="(item, index) in articles" :key="index" class="pointer show-card page__post">
              <mu-card-media>
                <img @click="articleClick(item)" :src="item.showImage" class="show-image" alt=""/>
              </mu-card-media>
              <mu-card-text>
                <span @click="articleClick(item)" class="title global-hover">{{item.title}}</span>
                <span class="show-card-time">{{item.time}}</span>
                <a @click="articleClick(item)" class="show-card-generalize">
                  {{item.generalize}}
                </a><br>
                <div class="show-card-tag">
                  <div style="margin-top: 2px">
                    <mu-icon size="16" value="local_offer"></mu-icon>&nbsp;
                  </div>
                  <div @click="tagClick(i)" class="global-hover" v-for="(i, index) in item.tags">{{i.name}} {{index === item.tags.length-1 ? '' : ',&nbsp'}} </div>
                </div>
              </mu-card-text>

              <mu-card-actions>
              </mu-card-actions>
            </mu-card>
          </div>

          <div class="pagination">
            <mu-flex justify-content="center">
              <mu-pagination class="muse-pagination" @change="changePage" :page-count="5" :page-size="pageSize" raised
                             circle :total="total" :current.sync="current"></mu-pagination>
            </mu-flex>
          </div>

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
    import {countYearArticles, listArticleDtosByYear, listArticleYears} from "../../api/article";
    import Header from "../../components/Header";
    import Footer from "../../components/Footer";

    export default {
        components: {SideList, Header, Footer, BackTop},
        data() {
            return {
                current: 1,
                pageSize: 12,
                total: null,
                articles: [],
                userInfo: {},
                year: this.$route.params.name,
                years: []
            }
        },
        methods: {
            init() {
                this.year = this.$route.params.name
                this.$progress.start();
                let that = this
                that.current = 1

                listArticleYears().then(response => {
                    that.years = response.content
                    this.years.sort((x, y) => {
                        return x - y
                    })
                })

                countYearArticles(that.year).then(response => {
                    that.total = response.content
                    listArticleDtosByYear(that.current, that.pageSize, that.year).then(response => {
                        that.articles = response.content
                        this.$progress.done();
                    })
                })

            },
            scrollTop() {
                let distance = document.documentElement.scrollTop || document.body.scrollTop;
                let step = distance;
                (function jump() {
                    if (distance > 0) {
                        distance -= step;
                        window.scrollTo(0, distance);
                        setTimeout(jump, 3)
                    }
                })();
            },
            changePage() {

                this.$progress.start();
                let that = this
                countYearArticles(that.year).then(response => {
                    that.total = response.content
                    listArticleDtosByYear(that.current, that.pageSize, that.year).then(response => {
                        that.articles = response.content
                        this.scrollTop();
                        this.$progress.done();
                    })
                })
            },
            articleClick(item) {
                this.$router.push({path: `/article/${item.id}`})
            },
            yearClick(item) {
                this.$router.push({
                    path: `/archive/${item}`,
                })
            },
            tagClick(item) {
                this.$router.push({path: `/tag/${item.name}`})
            },
        },
        created() {
            this.init()
        },
        watch: {
            '$route'(to, from) {
                if (to.params.name !== from.params.name) {
                    this.init()
                }
            }
        }
    }
</script>

<style scoped lang="scss">
  @import "assets/css/index";

  .archive-div {
    width: 100%;

    .archive-time {
      cursor: pointer;
      width: 100px;
      color: silver;
      font-size: 1.4em;
      margin: 5px;
      overflow: auto;
    }

    .archive-time:hover {

    }

  }

</style>
