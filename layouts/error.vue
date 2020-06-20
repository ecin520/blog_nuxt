<template>
    <div>
      <div>
        <div class="lay">
          <mu-icon class="global-hover" size="55" value="home" @click="toHome"></mu-icon>
          <p>404 Page Not Found</p>
        </div>

      </div>
    </div>
</template>

<script>
    export default {
        name: "error",
        methods: {
            toHome() {
                this.$router.push('/')
            }
        }
    }
</script>

<style scoped>
  @import "../assets/css/index.scss";
  .lay {
    padding: 1rem;
    background: #f7f8fb;
    color: #47494e;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-family: sans-serif;
    font-weight: 800!important;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    position: absolute;
    font-size: 2.5em;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
</style>
