export default {
    name: "apptitle",
    props: {
        title: {
            type: String,
            required: false,
            default: 'app_Title'
        },
        subtitle: {
            type: String,
            required: false,
            default: 'app_SubTitle'
        }
    }
};
