import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

new Vue({
    el: '#app',
    render: h => h(App, {
        props: {
            app_title: 'Markdown - Various tools',
            app_subtitle: 'Tools around the Markdown language such as a markdown to doc/epub/html/odt/pdf/txt converter, from csv/html/xls to markdown, …',
            github_url: 'https://github.com/cavo789/markdown'
        }
    }),
});
