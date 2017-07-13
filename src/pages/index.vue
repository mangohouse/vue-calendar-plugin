<template>
    <div id="one">
        <vue-picker ></vue-picker>
    </div>
    </div>
</template>

<script>
    // import Hello from 'Hello'
    import vuePicker from '@/components/vueCalendar'
    // import vuePicker from 'vue-count-to'
    
    export default {
        name: 'datePickertest',
        data() {
            return {
                today: 0,
                originSetDateValue: '2017-11-8', //设置初始日期
                startYear:1990,
                endYear:2020,
                tipsData: { //传入的日历数据
                    '2017-7-6': [{
                        contest: 'hellohello'
                    }, {
                        'task': ['100', '200']
                    }],
                    '2017-7-5': [{
                        contest: 'pk'
                    }, {
                        'task': ['100', '200']
                    }],
                    '2017-7-9': [{
                        contest: 'nba'
                    }, {
                        'task': ['100', '200']
                    }],
                    '2017-8-5': [{
                        contest: 'hello world'
                    }, {
                        'task': ['100', '200']
                    }],
                     '2017-9-5': [{
                        contest: 'hello world'
                    }, {
                        'task': ['100', '200']
                    }]
    
                }
            }
        },
        methods: {
            setCalendar(args) {
                // console.log(args)
            }
        },
        components: {
            vuePicker
        },
        created() {
            // this.init()
        },
        updated() {
    
        },
        mounted() {
    
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .box {
        width: 100%;
    }
</style>

</html>