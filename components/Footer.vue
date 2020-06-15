<template>
  <div class="footer">
    <div class="footer-content">
      <div style="display: flex;flex-wrap: wrap;justify-content: space-between;flex: 1;">
        <div class="footer-content-item">
          <h1>网站信息</h1>
          <mu-flex>
            <mu-icon size="20" value="place"></mu-icon>
            <span style="color: #69747a;font-size: 13px;">&nbsp;Nanchang, JaingXi Province</span>
          </mu-flex>
          <br>
          <mu-flex>
            <mu-icon size="20" value="mail"></mu-icon>
            &nbsp;<span style="color: #69747a;font-size: 13px;">{{userInfo.email}}</span>
          </mu-flex>
          <br>
          <mu-flex>
            <mu-icon size="20" value="person"></mu-icon>
            &nbsp;总访问&nbsp;<a>{{views.allViews}}</a>, 日访问&nbsp;<a>{{views.dayViews}}</a>
          </mu-flex>
          <br>
          <mu-flex>
            <mu-icon size="20" value="style"></mu-icon>
            &nbsp;文章总数&nbsp;<a>{{total}}</a>
          </mu-flex>
        </div>

        <div class="footer-content-item">
          <h1>推荐链接🔗</h1>
          <p><a href="https://cn.vuejs.org/" target="_blank">Vue官方文档</a></p>
          <p><a href="https://flutterchina.club/" target="_blank">Flutter</a></p>
          <p><a href="https://material.io/" target="_blank">Material</a></p>
          <p><a href="http://www.pytap.com/resume" target="_blank">我的简历</a></p>
        </div>

        <div class="footer-content-item">
          <h1>构建工具</h1>
          <p>Nuxt.js</p>
          <p>SpringBoot</p>
          <p>Muse-UI</p>
          <p>Nginx</p>
        </div>

      </div>
    </div>

    <div class="footer-sign">
      <div class="footer-gird"
           style="display: flex;flex-direction: row;flex-wrap: wrap;justify-content: space-between;margin: 0 auto;padding: 0 15px;">
        <div>
          <p style="margin: 10px;font-size: 12px;line-height: 40px;">
            <span class="">© 2019 · Ecin520 版权所有</span>
            <span class="">赣ICP备20002573号</span>
          </p>
        </div>
        <div>

          <a style="font-size: 2.8em;color: white;margin: 10px;text-decoration: none;"
             href="https://github.com/ecin520/" target="_blank"
             class="icon-plus iconfont icon-github"></a>

        </div>
      </div>

    </div>
  </div>
</template>

<script>
    import {getUserById} from "../api/user";
    import {countArticles} from "../api/article";
    import {getViews} from "../api/web";

    export default {
        name: "Footer",
        data() {
            return {
                userInfo: {
                    id: '',
                    username: '',
                    avatar: '',
                    email: '',
                    tel: '',
                    nickname: 'Ecin520',
                    signature: '我是一名普通的程序员，喜欢写文章和分享软件。希望你们能够喜欢我和我的软件。',
                    views: 0,

                },
                total: 0,
                views: {
                    allViews: 0,
                    dayViews: 0,
                    ipNum: 0,
                    visNum: 0
                }
            }
        },
        methods: {
            init() {

                getUserById(1000).then(response => {
                    this.userInfo = response.content
                })

                countArticles().then(response => {
                    this.total = response.content
                })

                getViews().then(response => {
                    this.views = response.content
                })

            },
        },
        created() {
            this.init()
        }
    }
</script>

<style scoped lang="scss">
  @import "assets/css/index";

  @media screen and (max-width: $mq-mobile) {

    .footer-gird {
      justify-content: center !important;
    }

    .footer-content-item {
      flex: none !important;
    }

  }

  .footer {
    position: absolute;
    width: 100%;
    margin-bottom: 0;
    background: $bottom1-color;
    color: white;

    .footer-content {
      margin: 35px;

      .footer-content-item {
        flex: 2;
        padding: 0 15px 15px;
      }
    }

    .footer-sign {
      border-top: 0.7px solid rgba(255, 255, 255, .1);
      position: absolute;
      margin-bottom: 0;
      background: $bottom2-color;
      width: 100%;
      box-sizing: border-box;

      .footer-sign-content {
        text-align: center;
      }
    }
  }
</style>