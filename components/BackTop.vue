<template>
  <div>
    <transition name="plus-icon" mode="out-in">
      <i @click="scrollTop" v-if="topShow === true"
         class="back-top icon-plus iconfont icon-md-rocket"></i>
    </transition>
  </div>
</template>

<script>
    export default {
        name: "BackTop",
        data() {
            return {
                topShow: false,
            }
        },
        methods: {
            init() {
                if (process.browser) {
                    window.addEventListener("scroll", this.showIcon)
                }
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
            this.init();
        }
    }
</script>

<style scoped lang="scss">
  @import "../assets/css/index.scss";

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
