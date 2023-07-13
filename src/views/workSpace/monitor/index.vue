<template>
  <lay-container :fluid="true" style="padding: 10px">
    <lay-row :space="10">
      <lay-col :md="18" :sm="18" :xs="24">
        <lay-card>
          <template #title>用户分布</template>
          <div id="userDistribution" ref="userDistributionRef"></div>
        </lay-card>
      </lay-col>
      <lay-col :md="6" :sm="6" :xs="6">
        <lay-card style="height: 300px">
          <template #title>在线人数</template>
          <lay-row style="text-align: center; margin-top: 30px">
            {{ timeInfo.nowDate }} - {{ timeInfo.nowWeek }} -
            {{ timeInfo.nowTime }}
          </lay-row>
          <lay-row
            style="
              text-align: center;
              font-size: 50px;
              color: #000000e0;
              margin: 40px;
            "
          >
            <lay-count-up
              :startVal="countNum.startVal"
              :endVal="countNum.endVal"
            ></lay-count-up>
          </lay-row>
          <lay-row style="text-align: center"> 在线总人数 </lay-row>
          <lay-row style="text-align: center; margin: 20px; color: #000000e0">
            <lay-badge type="dot" color="blue" ripple></lay-badge>&nbsp;
            {{ countNum.second }}&nbsp;秒后刷新
          </lay-row>
          <!-- 动画人数 -->
        </lay-card>
      </lay-col>
      <lay-col :md="6" :sm="6" :xs="6">
        <lay-card style="height: 290px">
          <template #title>浏览器分布</template>
          <div id="browserDistribution" ref="browserDistributionRef"></div>
        </lay-card>
      </lay-col>
    </lay-row>
  </lay-container>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted, reactive } from 'vue'

import * as echarts from 'echarts'
import china from './moudel/china.json'

export default defineComponent({
  name: 'Analysis',
  setup() {
    const userDistributionRef = ref()
    const browserDistributionRef = ref()
    const timeInfo = reactive({
      setInterval: null,
      nowWeek: '',
      nowDate: '',
      nowTime: ''
    })
    const countNum = reactive({
      startVal: 0,
      endVal: 360,
      second: 10
    })
    function setNowTimes() {
      let myDate = new Date()
      let wk = myDate.getDay()
      let yy = String(myDate.getFullYear())
      let mm = myDate.getMonth() + 1
      let dd = String(
        myDate.getDate() < 10 ? '0' + myDate.getDate() : myDate.getDate()
      )
      let hou = String(
        myDate.getHours() < 10 ? '0' + myDate.getHours() : myDate.getHours()
      )
      let min = String(
        myDate.getMinutes() < 10
          ? '0' + myDate.getMinutes()
          : myDate.getMinutes()
      )
      let sec = String(
        myDate.getSeconds() < 10
          ? '0' + myDate.getSeconds()
          : myDate.getSeconds()
      )

      let weeks = [
        '星期日',
        '星期一',
        '星期二',
        '星期三',
        '星期四',
        '星期五',
        '星期六'
      ]
      let week = weeks[wk]
      timeInfo.nowDate = yy + '-' + mm + '-' + dd + ''
      timeInfo.nowTime = hou + ':' + min + ':' + sec
      timeInfo.nowWeek = week
    }

    var userDistributionOption = {
      tooltip: {
        trigger: 'item'
      },
      dataRange: {
        x: 'left',
        y: 'bottom',
        itemWidth: 20,
        itemHeight: 14,
        splitList: [
          { start: 500, label: '>500人', color: '#3a94e5' },
          { start: 200, end: 500, label: '200 - 500人', color: '#68b1ec' },
          { start: 100, end: 200, label: '100 - 200人', color: '#9cd3f4' },
          { start: 50, end: 100, label: '500 - 100人', color: '#c7eefb' },
          { end: 50, label: '<50人', color: '#e1f4fc' }
        ]
      },
      roamController: {
        show: true,
        x: 'right',
        mapTypeControl: {
          china: true
        }
      },
      series: [
        {
          name: '用户人数',
          type: 'map',
          mapType: 'china',
          roam: false,
          itemStyle: {
            normal: {
              label: {
                show: true,
                textStyle: {
                  color: '#333'
                }
              }
            },
            emphasis: { label: { show: true } }
          },
          data: [
            { name: '广东', value: 800 },
            { name: '湖南', value: 502 },
            { name: '广西', value: 356 },
            { name: '江西', value: 208 },
            { name: '湖北', value: 385 },
            { name: '上海', value: 400 },
            { name: '重庆', value: 580 },
            { name: '河北', value: 1520 },
            { name: '河南', value: 2100 },
            { name: '云南', value: 5 },
            { name: '辽宁', value: 305 },
            { name: '黑龙江', value: 200 },
            { name: '安徽', value: 789 },
            { name: '山东', value: 25 },
            { name: '新疆', value: 2 },
            { name: '江苏', value: 1502 },
            { name: '浙江', value: 152 },
            { name: '北京', value: 430 },
            { name: '天津', value: 200 },
            { name: '甘肃', value: 56 },
            { name: '山西', value: 0 },
            { name: '陕西', value: 0 },
            { name: '吉林', value: 0 },
            { name: '福建', value: 0 },
            { name: '贵州', value: 0 },
            { name: '青海', value: 10 },
            { name: '西藏', value: 88 },
            { name: '四川', value: 860 },
            { name: '宁夏', value: 8 },
            { name: '海南', value: 8 },
            { name: '内蒙古', value: Math.round(Math.random() * 100) },
            { name: '台湾', value: Math.round(Math.random() * 100) },
            { name: '香港', value: Math.round(Math.random() * 100) },
            { name: '澳门', value: Math.round(Math.random() * 100) }
          ]
        }
      ]
    }
    var browserDistributionOption = {
      tooltip: {
        trigger: 'item'
      },
      legend: {
        bottom: '0%',
        left: 'left'
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: ['38%', '60%'],
          center: ['45%', '42%'],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: 'center'
          },
          top: -20,
          labelLine: {
            show: false
          },
          color: ['#5b8ff9', '#61ddaa', '#f6bd16', '#7262fd', '#78d3f8'],
          data: [
            { value: 1048, name: 'Chrome' },
            { value: 735, name: 'Safari' },
            { value: 580, name: 'Firefox' },
            { value: 484, name: 'Edge' },
            { value: 300, name: 'Other' }
          ]
        }
      ]
    }

    onMounted(() => {
      var userDistributionDom = userDistributionRef.value
      // var resizeMyChartContainer = function () {
      //   userDistributionDom.style.width =
      //     document.body.offsetWidth / 2 - 100 + 'px' //页面一半的大小
      // }
      // resizeMyChartContainer()
      echarts.registerMap('china', china)
      var userDistributionDomChart = echarts.init(userDistributionDom)
      userDistributionOption &&
        userDistributionDomChart.setOption(userDistributionOption)
      // window.onresize = function () {
      //   resizeMyChartContainer()
      //   userDistributionDom.resize()
      // }

      var browserDistributionDom = browserDistributionRef.value
      var browserDistributionDomChart = echarts.init(browserDistributionDom)
      browserDistributionOption &&
        browserDistributionDomChart.setOption(browserDistributionOption)

      timeInfo.setInterval = setInterval(() => {
        timeInfo.value = setNowTimes()
        if (countNum.second >= 1) {
          countNum.second -= 1
        } else {
          ;(countNum.endVal += Math.random() * 20), (countNum.second = 10)
        }
      }, 1000)
    })

    return {
      userDistributionRef,
      browserDistributionRef,
      timeInfo,
      countNum
    }
  }
})
</script>

<style lang="less" scoped>
#userDistribution {
  width: 100%;
  height: 540px;
}
#browserDistribution {
  width: 100%;
  height: 240px;
}
</style>
