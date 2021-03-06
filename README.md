# vue-calendar-plugin

> vue 日历选择控件
>两种模式选择，仿ios的picker模式（基于better-picker插件做了部份修改（https://www.npmjs.com/package/better-picker））
还有一种日历选择模式，可通过tipsData属性绑定日历事件，进去当前事件日期会高亮显示，点击该日期可回传日历信息，可通过setCalendar函数获取当前日历信息
#使用方法如下
```js
    npm install  vue-calendar-plugin --save-dev
```
```html
<template>
    <div>
        <vue-calendar :originDateValue="originSetDateValue" :tipsData="tipsData" @set-Calendar="setCalendar" :startYear="startYear" :endYear="endYear"></vue-calendar>
    </div>
    </div>
</template>
```
```js
<script>

    import vueCalendar from 'vue-calendar-plugin'
    import Css from 'vue-calendar-plugin/dist/vue-calendar.min.css'
    export default {
        name: 'vueCalendar',
        data() {
            return {
                today: 0,
                originSetDateValue: '2017-11-8', //设置初始日期
                startYear:1990, //起始年份
                endYear:2020,//结束年份
                tipsData: { //传入的日历数据，必须以日期为键值格式为2008-8-8
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
            setCalendar(args) { //通过该函数可获取当前日期的日历事件
                console.log(args)
            }
        },
        components: {
            vueCalendar
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
```


</html>
