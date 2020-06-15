import Vue from 'vue'

import moment from "moment"

import 'material-design-icons/iconfont/material-icons.css'

import hljs from 'highlight.js';
// import 'highlight.js/styles/lightfair.css'
import 'highlight.js/styles/hopscotch.css'


Vue.directive('highlight',function (el) {
    let blocks = el.querySelectorAll('pre code');
    setTimeout(() =>{
        blocks.forEach((block)=>{
            hljs.highlightBlock(block)
        })
    }, 1)
});

Vue.prototype.$moment = moment;
