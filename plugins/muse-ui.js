import Vue from 'vue';
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import Toast from 'muse-ui-toast';
import NProgress from 'muse-ui-progress';
import loading from "../utils/loading";

Vue.use(MuseUI);
Vue.use(Toast);
Vue.use(NProgress, loading);