<template>
  <div class="home">
    <Header></Header>
    <div class="article-list">
      <div class="navbar-top">
        <br><br><br><br><br>
        <p class="navbar-top-content">
          欢迎来到<span class="nickname-color">{{userInfo.nickname}}</span>的个人博客
        </p>
        <p class="navbar-under-line"></p>
        <p class="navbar-top-signature">
          {{userInfo.signature}}
        </p>
      </div>

      <div class="page__container page__main">

        <div class="page__content">

          <div>
            <mu-card v-for="(item, index) in articles" :key="index" class="pointer show-card page__post">
              <mu-card-media>
                <img @click="articleClick(item)" :src="item.showImage" class="show-image" alt=""/>
              </mu-card-media>
              <mu-card-text>
                <span @click="articleClick(item)" class="title global-hover">{{item.title}}</span>
                <span class="show-card-time">{{item.time}}</span>
                <a @click="articleClick(item)" class="show-card-generalize global-hover">
                  {{item.generalize}}
                </a><br>
                <div class="show-card-tag">
                  <div style="margin-top: 2px">
                    <mu-icon size="16" value="local_offer"></mu-icon>&nbsp;
                  </div>
                  <div @click="tagClick(i)" class="global-hover" v-for="(i, index) in item.tags">{{i.name}} {{index === item.tags.length-1 ? '' : ',&nbsp'}} </div>
                </div>
              </mu-card-text>
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
    import Header from "../../components/Header";
    import Footer from "../../components/Footer";
    import SideList from "../../components/SideList";
    import BackTop from "../../components/BackTop";
    import {listArticles, countArticles} from "../../api/article";
    import {getUserById} from "../../api/user";

    export default {
        components: {Header, Footer, SideList, BackTop},
        data() {
            return {
                topShow: false,
                current: null,
                pageSize: 12,
                total: null
            }
        },
        async asyncData({params}) {

            let userInfo = {};
            let articles = [];
            let total = null;

            await getUserById(1000).then(response => {
                userInfo = response.content
            });


            await countArticles().then(response => {
                total = response.content;
            });

            await listArticles(params.id, 12).then(response => {
                articles = response.content;
            });

            return {
                userInfo: userInfo,
                articles: articles,
                total: total
            }

        },
        methods: {
            init() {

                if (process.browser) {
                    window.addEventListener("scroll", this.showIcon)
                }

                this.current = Number(this.$route.params.id)


            },
            changePage() {
                this.$router.push({path: `/list/${this.current}`})
            },
            tagClick(item) {
                this.$router.push({path: `/tag/${item.name}`})
            },
            articleClick(item) {
                this.$router.push({path: `/article/${item.id}`})
            },
            showIcon() {
                if (process.browser) {
                    this.topShow = !!document.documentElement.scrollTop && document.documentElement.scrollTop > 200;
                }
            },
            scrollTop() {
                if (process.browser) {
                    let distance = document.documentElement.scrollTop || document.body.scrollTop;
                    let step = distance / 20;
                    (function jump() {
                        if (distance > 0) {
                            distance -= step;
                            window.scrollTo(0, distance);
                            setTimeout(jump, 10)
                        }
                    })();
                }
            }

        },
        created() {
            this.init()
        }
    }
</script>

<style scoped lang="scss">

  @import "../../assets/css/index";

  .back-top {
    position: fixed;
    display: block;
    width: 50px;
    height: 50px;
    /*font-size: 25px;*/
    right: 1em;
    bottom: 3em;
    text-align: center;
    /*color: #fff;*/
    transition: background .3s, opacity .3s;
    /*background: #19abd6;*/
    /*background: linear-gradient(to right,#19abd6 35%,#3ac0e8 100%);*/
    background-size: 200% auto;
    border-radius: 50%;
    cursor: pointer;
    opacity: 1;
    z-index: 100;
    color: $theme-widget-color;
    font-size: 3.5em
  }

  .plus-icon-enter-active {
    transition: opacity .5s;
  }

  .plus-icon-enter {
    opacity: 0;
  }

  .plus-icon-leave-active {
    transition: opacity .5s;
  }

  .plus-icon-leave-to {
    transition: .5s;
    opacity: 0;
  }

  .content-enter-active {
    transition: opacity 0.3s;
  }

  .content-enter {
    opacity: 0;
  }

  .content-leave-active {
    transition: opacity 0.3s;
  }

  .content-leave-to {
    transition: 0.3s;
    opacity: 0;
  }
</style>

