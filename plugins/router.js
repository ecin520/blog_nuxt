import {getToken} from "../utils/auth";

export default ({app}) => {
  app.router.beforeEach((to, from, next) => {
    console.log(getToken());
    if (getToken() !== undefined) {
      next()
    } else {
      console.log('sb')
    }
  })
}
