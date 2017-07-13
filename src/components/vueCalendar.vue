<template>
    <div id="one" :tipsData="tipsData" :startYear="startYear" :endYear="endYear">
        <input type="text" v-model="setDateValue" @change="setDate(setDateValue)" ref="picker" readonly :originDateValue="originDateValue">
        <!--div class="show-btn" v-show="showCalendarBtn" @click="show">日历</div-->
        <div v-show="showCalendar" class="show-calendars">
    
            <!--input type="text" v-model="setDateValue" @change="setDate(setDateValue)" readonly :originDateValue="originDateValue"-->
            <div class="close" @click="closeCalendar">关闭</div>
            <div class="box">
                <div class="data-text">
                    {{dataText}}
                </div>
                <div class="set-month box-cont">
                    <div class="pre-month" @click="preMonth">
                        <</div>
                            <div class="to-current" @click="toCurrent">当前日期</div>
                            <div class="current-month">{{ currentYear }}/{{ String(+this.currentMonth+1) }}/{{this.currentDay}}</div>
                            <div class="next-month" @click="nextMonth"> > </div>
                    </div>
    
                    <div class="week box-cont">
                        <div class="weekday">周一</div>
                        <div class="weekday">周二</div>
                        <div class="weekday">周三</div>
                        <div class="weekday">周四</div>
                        <div class="weekday">周五</div>
                        <div class="weekday">周六</div>
                        <div class="weekday">周日</div>
                    </div>
                    <div class="days-cont " @touchstart="touchStart($event)" @touchend="touchEnd($event)" @touchmove="touchMove($event)">
                        <div :title="item.date" v-for=" item in dateObj.days" class="day-item" :class="{'red': !!item.tipsData,'today': item.date == realCurrentDate ,'current-day': item.day == currentDay, 'disable-item' : item.month == currentMonth}" @click="setDay(item)">
                            <span>{{ item.day }}</span>
                            <!--span>{{ item.date }}</span-->
                        </div>
                    </div>
                </div>
            </div>
        </div>
</template>

<script>
    import Picker from '../../static/js/picker.min.js'
    export default {
        name: 'datePicker',
        // props: ['tipsData', 'originDateValue', 'endYear', 'startYear'],
        props: {
            tipsData: {
                type: Object,
                default: null,
            },
            originDateValue: {
                type: String,
                default: null,
            },
            startYear: {
                type: Number,
                default: 1999,
            },
            endYear: {
                type: Number,
                default: 2020,
            }
        },
        data() {
            return {
                today: 0,
                currentDay: 1,
                currentWeekday: 0,
                currentMonth: 0,
                currentYear: 0,
                firstDay: 0,
                monthOfDays: [],
                realCurrentMonth: 0,
                dateObj: {},
                setDateValue: '',
                // originSetDateValue: '', //设置初始日期
                isSetDate: false,
                data1: [],
                data2: [],
                data3: [],
                nodePicker: null,
                showCalendar: false,
                showCalendarBtn: false,
                dataText: '',
                myPicker: null
            }
        },
        methods: {
            touchStart(e) {
                this.clientX = e.touches[0].clientX
                this.clientY = e.touches[0].clientY
            },
            touchEnd(e) {
                if (this.clientX > e.changedTouches[0].clientX + 50) { //左滑
                    console.log('left')
                    this.preMonth()
                }
                if (this.clientX < e.changedTouches[0].clientX - 50) { //右滑
                    console.log('right')
                    this.nextMonth()
                }
            },
            touchMove(e) {
                // console.log(e.changedTouches[0].clientX - this.clientX)
            },
            closeCalendar() {
                this.showCalendar = false
                this.showCalendarBtn = true
            },
            setCalendar(args) {
                this.$emit('set-Calendar', args)
            },
            show() {
                this.showCalendar = true
                this.showCalendarBtn = false
            },
            setDate(setDateValue) { //通过input设置日期
                this.isSetDate = true
                var date = setDateValue
                var dateArr = date.split('-') //将input内的日期转为数组
                this.currentYear = dateArr[0]
                this.currentMonth = dateArr[1]
                this.currentDay = dateArr[2]
                this.getDate()
            },
            preMonth() { //上一月
                this.currentMonth--
                    if (this.currentMonth < 0) {
                        this.currentYear--
                            this.currentMonth = 11
                    }
    
                this.getDate()
            },
            toCurrent() { //回到当前时间
                this.getNowDate()
                this.getDate()
            },
            getNowDate() {
                var date = new Date()
                var month = date.getMonth() + 1
                var year = date.getFullYear()
                var day = date.getDate()
                this.realCurrentDate = year + '-' + month + '-' + day
                this.currentYear = date.getFullYear()
                this.currentMonth = date.getMonth()
                this.today = this.currentDay = date.getDate()
                this.currentWeekday = date.getDay()
            },
            setDay(item) { //设置当前选择时间
                if (item.month == this.currentMonth) {
                    return
                }
                if (item.tipsData) {
                    this.dataTexte = item.tipsData[0].contest
                }
                this.$emit('set-Calendar', item.tipsData)
                item.tipsData ? this.dataText = item.tipsData[0].contest : this.dataText = ''
                this.currentDay = item.day
                this.setDateValue = this.currentYear + '-' + String(+this.currentMonth + 1) + '-' + this.currentDay
                // this.vuePicker()
            },
            nextMonth() { //下一月
                this.currentMonth++
                    if (this.currentMonth > 11) {
                        this.currentYear++
                            this.currentMonth = 0
                    }
    
                this.getDate()
            },
            init() { //日期初始化
                this.getNowDate()
                if (this.originDateValue == '' || !this.originDateValue) { //未设置初始日期时，默认系统当前日期
                    // console.log(originDateValue)
                    this.getDate()
                } else {
                    var dates = this.originDateValue.split('-')
                    dates[1] = dates[1] - 1
                    var dateArr = dates.join('-')
                    this.setDate(dateArr)
                }
    
            },
            getDate() { //根据选择月份设置日历列表数据
                this.dateObj = {
                    date: this.realCurrentDate,
                    days: []
                }
                this.firstDay = new Date(this.currentYear, this.currentMonth, 1) // 设置日期为当月第一天的
                this.dayOfWeek = this.firstDay.getDay() //获取当月第一天是周几
                this.dayOfWeek == 0 ? this.dayOfWeek = 7 : this.dayOfWeek
                this.monthOfDays = new Array(31, 28 + this.isLeap(this.currentYear), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31) //创建月份数组
                for (var i = 1; i <= this.monthOfDays[this.currentMonth]; i++) { //创建当前月份日历数组
                    var real_month1 = String(+this.currentMonth + 1)
                    var itemDate1 = this.currentYear + '-' + real_month1 + '-' + i
                    var obj = {
                        day: i,
                        month: String(+this.currentMonth + 1),
                        date: itemDate1,
                        tipsData: null
                    }
                    for (var key in this.tipsData) {
                        if (key == itemDate1) {
                            obj.tipsData = this.tipsData[key]
                        }
                    }
                    this.dateObj.days.push(obj)
                };
                for (var i = this.monthOfDays[this.currentMonth - 1]; i > this.monthOfDays[this.currentMonth - 1] - this.dayOfWeek + 1; i--) { //创建当前上一月的部分天数数据
                    var real_month2 = this.currentMonth
                    var itemDate2 = this.currentYear + '-' + real_month2 + '-' + i
                    var obj = {
                        day: i,
                        month: this.currentMonth,
                        date: itemDate2
                    }
                    this.dateObj.days.unshift(obj)
                }
                this.dateObj.month = String(+this.currentMonth + 1)
                this.setDateValue = this.currentYear + '-' + String(+this.currentMonth + 1) + '-' + this.currentDay
            },
            isLeap(year) { //判断是否为闰年
                return year % 4 == 0 ? (year % 100 != 0 ? 1 : (year % 400 == 0 ? 1 : 0)) : 0;
            },
            vuePicker() {
                var that = this
                var nameEl = that.nodePicker
                that.data1 = []
    
                for (var i = that.startYear; i < that.endYear; i++) {
                    var obj = {
                        text: i,
                        value: i
                    }
                    that.data1.push(obj)
                }
    
                that.data2 = []
                for (var i = 1; i <= 12; i++) {
                    var obj = {
                        text: i,
                        value: i - 1
                    }
                    that.data2.push(obj)
                }
                that.data3 = []
                for (var i = 1; i <= 31; i++) {
                    var obj = {
                        text: i,
                        value: i,
                        date: that.currentYear + '-' + String(+that.currentMonth + 1) + '-' + i,
                        hasTips: false,
                        dataTips: null
                    }
                    that.data3.push(obj)
                }
                var yearIndex, monthIndex, dayIndex
                var picker = that.myPicker = new Picker({
                    data: [that.data1, that.data2, that.data3],
                    selectedIndex: [that.currentYear - that.startYear, that.currentMonth, that.currentDay - 1],
                    title: '日期选择'
                });
    
                picker.on('picker.select', function(selectedVal, selectedIndex) {
                    nameEl.innerText = that.data1[selectedIndex[0]].text + ' ' + that.data2[selectedIndex[1]].text + ' ' + that.data3[selectedIndex[2]].text;
                })
    
                picker.on('picker.change', function(index, selectedIndex) {
                    var monthDays = []
                    if (index == 0) {
                        that.currentYear = that.data1[selectedIndex].text
                    }
                    if (index == 1) {
                        that.currentMonth = that.data2[selectedIndex].value
                    }
                    if (index == 2) {
                        that.currentDay = that.data3[selectedIndex].text
                        that.$emit('set-Calendar', that.data3[selectedIndex].dataTips)
                    }
                    monthDays = new Array(31, 28 + that.isLeap(that.currentYear), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31) //创建月份数组
                    that.data3 = []
                    for (var i = 1; i <= monthDays[that.currentMonth]; i++) {
                        var obj = {
                            text: i,
                            value: i,
                            date: that.currentYear + '-' + String(+that.currentMonth + 1) + '-' + i,
                            hasTips: false,
                            dataTips: null
                        }
                        for (var key in that.tipsData) {
    
                            if (key == obj.date) {
                                obj.text = i,
                                    obj.hasTips = true
                                obj.dataTips = that.tipsData[key]
                            }
    
                        }
                        that.data3.push(obj)
                    }
                    picker.refillColumn(2, that.data3); //重填某列的值
                    var setDates = that.currentYear + '-' + that.currentMonth + '-' + that.currentDay
                    that.setDate(setDates)
                });
                picker.on('picker.valuechange', function() {
                    that.showCalendar == true ? that.showCalendar = false : that.showCalendar = true
                });
                nameEl.addEventListener('click', function() {
                    picker.show();
                });
            }
        },
        created() {
    
        },
        updated() {
    
        },
        mounted() {
            this.init()
            this.nodePicker = this.$refs.picker
            this.vuePicker()
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .box {
        width: 100%;
    }
    
    .box-cont {
        display: -moz-box;
        display: -webkit-box;
        display: box;
        -moz-box-orient: horizontal;
        -webkit-box-orient: horizontal;
        box-orient: horizontal;
        -moz-box-align: center;
        -webkit-box-align: center;
        -o-box-align: center;
        box-align: center;
        font-size: 0;
    }
    
    .weekday {
        width: 14.2%;
        height: 30px;
        line-height: 30px;
        text-align: center;
        font-size: 12px;
    }
    
    .days-cont {}
    
    .day-item {
        width: 14%;
        height: 30px;
        line-height: 30px;
        // display: inline-block;
        float: left;
        text-align: center;
        font-size: 12px;
        box-sizing: border-box;
        border: 1px solid transparent;
    }
    
    span {
        font-size: 10px;
    }
    
    .current-day {
        /*background: rgba(57, 140, 247, 0.73);*/
        border: 1px solid #ccc;
    }
    
    .today {
        background: rgba(57, 140, 247, 0.73);
        border: 1px solid #fff;
    }
    
    .red {
        background: rgba(255, 9, 9, 0.46);
        border: 1px solid #fff;
    }
    
    .set-month {
        /*width: 200px;*/
        height: 50px;
        margin: 0 auto;
        font-size: 16px;
        color: #000;
        text-align: center;
        -moz-box-pack: justify;
        -webkit-box-pack: justify;
        box-pack: justify;
    }
    
    .set-month div {
        padding: 0 20px;
    }
    
    .disable-item {
        color: #aaa;
        border: 1px solid transparent;
    }
    
    .pre-month,
    .next-month {
        color: #666;
        font-size: 22px;
        font-weight: bold;
    }
    
    .data-text {}
    
    .show-btn {
        position: fixed;
        bottom: 195px;
        right: 65px;
        z-index: 9999;
    }
    
    .data-text {
        min-height: 28px;
        line-height: 28px;
        width: 90%;
        margin: 0 auto;
        word-wrap: break-word;
        text-align: left;
    }
    
    .close {
        position: absolute;
        right: 20px;
        display: inline-block;
        width: 60px;
        height: 30px;
        line-height: 30px;
        top: /*padding: 5px;*/
    }
    
    .show-calendars {
        position: fixed;
        bottom: 0;
        z-index: 999;
        background: #fff;
        padding-top: 10px;
        height: 295px;
        width: 98%;
    }
</style>