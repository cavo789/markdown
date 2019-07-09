import appfooter from "../../appfooter/appfooter.vue";
import apptitle from '../../apptitle/apptitle.vue';
import editor from "../../editor/editor.vue";
import github_corner from "../../github_corner/github_corner.vue";

export default {
    name: 'App',
    components: { appfooter, apptitle, editor, github_corner },
    props: {
        app_title: {
            type: String,
            required: true
        },
        app_subtitle: {
            type: String,
            required: false,
            default: ''
        },
        github_url: {
            type: String,
            required: false,
            default: ''
        }
    },
    data: function () {
        return {
            isVisible: true
        }
    },
    created() {
        // Set the <title></title> of the page
        document.title = this.app_title
    },
    methods: {
        toggleVisibility() {
            // A button "Show/Hide editor" is present in the "editor" component
            // The button will show/hide the editor but also emit an event
            // called "toggleVisibility" that will be captured here so a
            // isVisible variable can be set for all other components.
            //this.isVisible = !(this.isVisible);
        }
    }
};
