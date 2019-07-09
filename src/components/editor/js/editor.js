// Marked for conversion from MD to HTML
import marked from "marked/marked.min.js";

// Copy in clipboard
import ClipboardJS from "clipboard";

import axios from 'axios';

// Import babel-plugin-prismjs
// The list of supported languages can be retrieved in the
// /.babelrc file (in the root folder)
import Prism from "prismjs";

// Primer-css is the new name for github-markdown
import "primer-css/build/build.css";

export default {
    name: "editor",
    props: {
        showEditor: {
            type: Boolean,
            required: false,
            default: true
        },
        MARKDOWN: {
            type: String,
            required: false,
            default:
                "---\n" +
                "title: 'A title'\n" +
                "---\n\n" +
                "# Test\n\n" +
                "> This is a demo text\n\n" +
                "![banner](https://raw.githubusercontent.com/cavo789/marknotes_md2html/master/image/banner.jpg)\n\n" +
                "Lorem ipsum dolor ==sit amet==, consectetur *adipiscing* ==elit==.\n" +
                "[Demo site](https://md2html.avonture.be/)\n\n" +
                "```sql\n" +
                "SELECT … FROM … WHERE … ORDER BY …\n" +
                "```\n\n" +
                "| Column 1 Header | Column 2 Header |\n" +
                "| --- | --- |\n" +
                "| Row 1-1 | Row 1-2 |\n" +
                "| Row 2-1 | Row 2-2 |\n\n" +
                "Demo of `html` source code:\n\n" +
                "```html\n" +
                '<div class="col-sm">\n' +
                "   <title>Marknotes - MD2HTML - Quick convert markdown to HTML</title>\n" +
                "</div>\n" +
                "```\n\n" +
                "```php\n" +
                "<?php\n" +
                "   echo $variable;\n" +
                "```\n"
        }
    },
    data: function () {
        return {
            markdown: this.MARKDOWN,
            showeditor: this.showEditor,
            inputCSV: 0,
            inputMD: 1,
            inputHTML: 0,
            inputXLS: 0,
            outputHTML: 1,
            clipboardEnabled: 0,
            filename: '',
            format: '',
        };
    },
    computed: {
        HTML() {
            if (this.markdown == "") {
                return "";
            }

            var $markdown = this.markdown;

            // Replace the YAML block that can be at the top of the file, f.i.
            //      ---
            //      title: 'a title'
            //      date: 2018-12-25
            //      ---
            // Just remove it
            try {
                $markdown = $markdown.replace(/\s*^-{3}[.\S\s]*^-{3}/gm, "");
                $markdown = $markdown.trim();
            } catch (error) { }

            var $HTML = marked($markdown, {
                sanitize: true,
                gfm: true,
                smartypants: true,
                tables: true
            });

            // Handle a few custom tags
            //   ==WORD==    will put this word in a highlighted span
            $HTML = $HTML.replace(
                /([^=]*)==([^=]*)==([^=]*)/g,
                "$1<span class='highlight'>$2</span>$3"
            );

            // Add classes to tables
            $HTML = $HTML.replace(
                "<table>",
                '<table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">'
            );

            // Strange: need a timeout to give "time" to Prism to
            // highlight the HTML content
            setTimeout(() => {
                Prism.highlightAll();
            }, 10);

            return $HTML;
        }
    },
    methods: {
        doInputCSV() {
            this.inputCSV = 1;
            this.inputHTML = 0;
            this.inputMD = 0;
            this.inputXLS = 0;
        },
        doInputHTML() {
            this.inputCSV = 0;
            this.inputHTML = 1;
            this.inputMD = 0;
            this.inputXLS = 0;
        },
        doInputMD() {
            this.inputCSV = 0;
            this.inputHTML = 0;
            this.inputMD = 1;
            this.inputXLS = 0;
        },
        doInputXLS() {
            this.inputCSV = 0;
            this.inputHTML = 0;
            this.inputMD = 0;
            this.inputXLS = 1;
        },
        doToggle(e) {
            this.showeditor = !this.showeditor;
            // Emit the toggleVisibility() function so other
            // components can react
            this.$emit("toggleVisibility", e);

            // Toggle visibility
            this.inputMD = !this.inputMD;

            var all = document.getElementsByClassName('input');
            for (var i = 0; i < all.length; i++) {
                all[i].style.display = (this.inputMD ? 'inline' : 'none');
            }

        },
        doDownload() {
            window.location.href = 'getfile.php?filename=' + this.filename;
        },
        doExport() {
            var $data = {
                md: window.btoa(unescape(encodeURIComponent(this.markdown))),
                type: this.format
            }

            axios.post('export.php', $data)
                .then((response) => {
                    if (response.status === 200) {
                        if (response.data.status == 'success') {
                            this.filename = response.data.filename;
                            this.$notify({
                                title: 'Download',
                                type: 'success',
                                position: 'bottom-right',
                                message: "Downloading " + this.filename,
                                duration: 5000
                            });
                            this.doDownload();
                        } else {
                            this.$notify({
                                title: 'Error',
                                type: 'error',
                                position: 'bottom-right',
                                dangerouslyUseHTMLString: true,
                                message: response.data.error,
                                duration: 5000
                            });
                        }
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        doExportDOCX() {
            this.format = 'docx';
            this.doExport();
        },
        doExportEPUB() {
            this.format = 'epub';
            this.doExport();
        },
        doExportHTML() {
            this.outputHTML = 1;
        },
        doExportODT() {
            this.format = 'odt';
            this.doExport();
        },
        doExportMD() {
            this.format = 'md';
            this.doExport();
        },
        doExportPDF() {
            this.format = 'pdf';
            this.doExport();
        },
        doExportTXT() {
            this.format = 'txt';
            this.doExport();
        },
    },
    watch: {
        HTML: function () {
            // Call PrismJS if HTML has changed
            Prism.highlightAll();
        }
    },
    mounted() {
        // If ClipboardJS library is correctly loaded,
        // enable the copy to clipboard buttons
        if (typeof ClipboardJS === "function") {
            this.clipboardEnabled = 1;

            // Handle the click event on buttons
            var clipboard = new ClipboardJS(".btnClipboard");

            let that = this;

            clipboard.on("success", function (e) {
                that.$notify({
                    title: 'Copied!',
                    type: 'success',
                    position: 'bottom-right',
                    message: 'HTML has been copied in the clipboard.',

                    duration: 5000
                });
                e.clearSelection();
            });
        }
    }
};
