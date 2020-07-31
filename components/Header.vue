<template>
  <div class="navbar">
    <div @click="stepBack" class="logo">
      <mu-icon size="40" value="flash_on"></mu-icon>
    </div>
    <div class="navbar-item-style">
      <div>
        <span @click="toHome" class="navbar-item">首页</span>
        <span @click="toArchive" class="navbar-item">归档</span>
        <span @click="toAbout" class="navbar-item">关于</span>
        <span @click="toCreate" class="navbar-item">创作</span>
      </div>
    </div>

    <mu-dialog
        :scrollable="true"
        transition="scale"
        :lock-scroll="false"
        overlay-color="hsla(209, 100%, 56%, 0.73)"
        :overlay="true"
        :open.sync="loginVisible">
      <div>
        <mu-form :model="login" class="mu-demo-form" label-position="left" label-width="60">
          <mu-form-item prop="input" label="用户名">
            <mu-text-field v-model="login.username"></mu-text-field>
          </mu-form-item>
          <mu-form-item prop="input" label="密码">
            <mu-text-field type="password" v-model="login.password"></mu-text-field>
          </mu-form-item>
        </mu-form>
        <mu-flex justify-content="center">
          <mu-button @click="loginClick" color="green">登录</mu-button>
        </mu-flex>
      </div>
    </mu-dialog>

  </div>
</template>

<script>
    import {getUserById, login} from "../api/user";
    import {listArticleYears} from "../api/article";

    import {getToken, setToken, clearToken} from '../utils/auth'
    import {getUserInfo, setUserInfo, clearUserInfo} from '../utils/user'

    export default {
        name: "Header",
        data() {
            return {
                loginVisible: false,
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
                login: {
                    username: '',
                    password: ''
                },
            }
        },
        methods: {
            init() {
                getUserById(1000).then(response => {
                    this.userInfo = response.content
                })
            },
            toHome() {
                this.$router.push({path: '/'})
            },
            stepBack() {
                this.$router.push('/')
            },
            toArchive() {
                listArticleYears().then(response => {
                    let years = response.content;
                    years.sort((x, y) => {
                        return x - y
                    });
                    this.$router.push({
                        path: `/archive/${years[0]}`,
                    })
                })
            },
            toAbout() {
                this.$router.push({path: '/about'})
            },
            toCreate() {
                console.log(getToken());
                console.log(getUserInfo());

                if (getToken() && getUserInfo()) {
                    this.$router.push({path: '/control-center'})
                } else {
                    this.loginVisible = true
                }
            },
            loginClick() {
                login(this.login.username, this.login.password).then(response => {
                    if (response.code === 200) {
                        console.log(response)
                        this.$store.dispatch("login", {
                            token: response.token,
                            userInfo: response.user
                        });
                        this.$router.push({path: '/control-center'})
                    }
                })
            }
        },
        created() {
            this.init()
        }
    }
</script>

<style scoped lang="scss">
  @import "../assets/css/index";
  .navbar {
    position: fixed;
    /*box-shadow: 0 1px 5px #d9d7d7;*/
    top: 0;
    background: $theme-color;
    display: block;
    width: 100%;
    height: 60px;
    transition: height .3s;
    z-index: 999;

    .logo {
      cursor: pointer;
      float: left;
      margin: 12px;
      letter-spacing: 10px;
      color: $theme-text-color;
    }

    .logo:hover {
      color: $bar-color-hover;
    }

    .navbar-item-style {
      color: $theme-text-color;
      float: right;
      margin: 20px;
      letter-spacing: 5px;
    }

    .navbar-item {
      cursor: pointer;
    }

    .navbar-item:hover {
      color: $bar-color-hover;
    }
  }
</style>
