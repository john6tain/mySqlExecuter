var compact = VueColor.Compact;
let config = Vue.component('config', {
    data() {
        return {
            host: 'sql7.freemysqlhosting.net',
            user: 'sql7296281',
            password: 'uzPFLtt98s',
            database: 'sql7296281',
        }
    },
    methods: {
        exec(event) {
            this.$emit('clicked', true)
        }
    }
});
let exec = Vue.component('exec', {
    data() {
        return {
            query: 'SELECT * FROM TEST;',
        }
    },
    methods: {
        exec(event) {
            this.$emit('clicked', false)
        },
        backend(query) {
            var xhttp = new XMLHttpRequest();
            var that = this;
            xhttp.onreadystatechange = function () {
                if (this.readyState === 4 && this.status == 200) {
                    that.$root.$emit('res', JSON.parse(this.responseText));
                } else if(this.status !== 200){
                    that.$root.$emit('error', this.responseText);
                }
            };
            xhttp.open("POST", "/exec", true);
            xhttp.setRequestHeader('Content-type', 'application/json');
            query = typeof (query) === 'string' ? query : this.query;
            xhttp.send(JSON.stringify({ query: query }));
        },
        selectedText(e) {
            const elem = e.target;
            const query = elem.value.substr(elem.selectionStart, elem.selectionEnd);
            this.backend(query);
        }
    }
});
let tableview = Vue.component('tableview', {
    mounted() {
        this.$root.$on('res', (responseText) => {
            this.rows = responseText;
        });
    },
    data() {
        return {
            rows: [{ "pk": 1, "name": "Tom B. Erichsen" }, { "pk": 2, "name": "John" }],
        }
    },
    methods: {
        exec(event) {
            this.$emit('clicked', false)
        }
    }
});
var app = new Vue({
    el: '#app',
    data() {
        return {
            color: JSON.parse(localStorage.getItem('colors')) || { hex: '#fffff' },
            exec: true,
            error: false,
        }
    },
    mounted() {
        this.$root.$on('error', (error) => {
            this.error = error;
        });
    },
    watch: {
        color: (newColor, oldColor) => {
            localStorage.setItem('colors', JSON.stringify(newColor));
        }
    },
    components: {
        config: config,
        exec: exec,
        tableview: tableview,
        'compact-picker': compact,
    },
});