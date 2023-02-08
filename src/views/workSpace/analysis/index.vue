<template>
  <lay-container :fluid="true" style="padding: 10px">
    <lay-row :space="10">
      <lay-col :md="6" :sm="6" :xs="12">
        <lay-card class="statistics">
          <template #title>今日访问</template>
          <template #extra>
            <lay-badge theme="green">Hot</lay-badge>
          </template>
          <div class="statistics-body">
            <lay-count-up :startVal="0" :endVal="3600" :decimalPlaces="2"></lay-count-up>
          </div>
          <template #footer>
            访问趋势
          </template>
        </lay-card>
      </lay-col>
      <lay-col :md="6" :sm="6" :xs="12">
        <lay-card class="statistics">
          <template #title>提交次数</template>
          <template #extra>
            <lay-badge type="rim">Hot</lay-badge>
          </template>
          <div class="statistics-body">
            <lay-count-up :startVal="0" :endVal="3600" :decimalPlaces="2"></lay-count-up>
          </div>
          <template #footer>
            最近一月
          </template>
        </lay-card>
      </lay-col>
      <lay-col :md="6" :sm="6" :xs="12">
        <lay-card class="statistics">
          <template #title>下载数量</template>
          <template #extra>
            <lay-badge type="rim">Hot</lay-badge>
          </template>
          <div class="statistics-body">
            <lay-count-up :startVal="0" :endVal="3600" :decimalPlaces="2"></lay-count-up>
          </div>
          <template #footer>
            总下载量
          </template>
        </lay-card>
      </lay-col>
      <lay-col :md="6" :sm="6" :xs="12">
        <lay-card class="statistics">
          <template #title>流量统计</template>
          <template #extra>
            <lay-badge type="rim">Hot</lay-badge>
          </template>
          <div class="statistics-body">
            <lay-count-up :startVal="0" :endVal="3600" :decimalPlaces="2"></lay-count-up>
          </div>
          <template #footer>
            最近一年
          </template>
        </lay-card>
      </lay-col>
      <lay-col :md="24" :sm="24" :xs="24">
        <lay-card>
          <template #title>我的觉悟</template>
          <template #extra>
            <lay-badge type="rim">昨日</lay-badge>
            <lay-badge type="rim">今日</lay-badge>
          </template>
          <lay-row>
            <lay-col :md="18">
              <div id="main" ref="mainRef"></div>
            </lay-col>
            <lay-col :md="6">
              <div style="padding-top:42px;padding-left: 42px;padding-right: 42px;padding-bottom: 10px;">
                <lay-timeline>
                  <lay-timeline-item title="工专路 0 号店" simple>
                    <template #dot>
                      <lay-icon type="layui-icon-face-smile" color="#009688"></lay-icon>
                    </template>
                  </lay-timeline-item>
                  <lay-timeline-item title="工专路 1 号店" simple></lay-timeline-item>
                  <lay-timeline-item title="工专路 2 号店" simple></lay-timeline-item>
                  <lay-timeline-item title="工专路 3 号店" simple></lay-timeline-item>
                  <lay-timeline-item title="工专路 4 号店" simple></lay-timeline-item>
                  <lay-timeline-item title="工专路 5 号店" simple></lay-timeline-item>
                  <lay-timeline-item title="工专路 5 号店" simple></lay-timeline-item>
                </lay-timeline>
              </div>
            </lay-col>
          </lay-row>
        </lay-card>
      </lay-col>
      <lay-col :md="8" :sm="8" :xs="24">
        <lay-card>
          <template #title>留言面板</template>
          <ul class="leaving-messages">
            <li>
              <h3>张爱玲</h3>
              <p>于千万人之中遇到你所要遇到的人，于千万年之中，时间的无涯的荒野中，没有早一步，也没有晚一步，刚巧赶上了，那也没有别的话好说，唯有轻轻的问一声：“噢，原来你也在这里？”。</p>
              <span>5月30日 00:00</span>
            </li>
            <li>
              <h3>王羲之</h3>
              <p>但我只要够快就行了对不对？你就算有无限量的子弹，你换弹匣也需要时间，我只有那么一瞬间，把你打翻，然后就拍屁股走人。</p>
              <span>5月30日 00:00</span>
            </li>
            <li>
              <h3>诸葛亮</h3>
              <p>皓首匹夫！苍髯老贼！你枉活九十有六，一生未立寸功，只会摇唇鼓舌！助曹为虐！一条断脊之犬，还敢在我军阵前狺狺狂吠，我从未见过有如此厚颜无耻之人！</p>
              <span>5月30日 00:00</span>
            </li>
          </ul>
        </lay-card>
      </lay-col>
      <lay-col :md="8" :sm="8" :xs="24">
        <lay-card>
          <template #title>签到统计</template>
          <lay-table :columns="columns21" :data-source="dataSource21">
            <template #state="{ data }">
              <span v-if="data.state == 0" style="color:#FFB800">进行中</span>
              <span v-else-if="data.state == 1" style="color:#5FB878">已完成</span>
              <span v-else style="color:#FF5722">已预期</span>
            </template>
          </lay-table>
        </lay-card>
      </lay-col>
      <lay-col :md="8" :sm="8" :xs="24">
        <lay-card>
          <template #title>本月目标</template>
          <div class="target">
            <lay-progress :percent="90" circle :circleWidth="15" :show-text="true" text="已完成">
              <template v-slot:text="{}">
                <span></span>
              </template>
            </lay-progress>
            <p class="target-title">{{ 100 > 70 ? '恭喜，本月目标已达标！' : '加油， 就快达标了！' }}</p>
          </div>
        </lay-card>
      </lay-col>
    </lay-row>
  </lay-container>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";

import * as echarts from 'echarts';

export default defineComponent({
	name: 'Analysis',
  setup() {

    const mainRef = ref()
    onMounted(() => {
      var chartDom = mainRef.value;
      // @ts-ignore
      var myChart = echarts.init(chartDom);
      var option = {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Bai', 'Fan', 'Yue', 'Qian']
        },
        yAxis: {
          type: 'value'
        },
        grid: {
          x: '50px',
          y: '50px',
          x2: '50px',
          y2: '50px',
        },
        series: [
          {
            data: [120, 200, 150, 80, 70, 110, 130, 50, 40, 70, 100],
            type: 'bar',
            showBackground: true,
            backgroundStyle: {
              color: 'rgba(180, 180, 180, 0.2)'
            },
            itemStyle: {
              normal: {
                color: '#009688'
              },
            }
          }
        ]
      };
      option && myChart.setOption(option);
    })

    const columns21 = [
      {
        type: "number",
      },
      {
        title: "任务内容",
        key: "task",
      }, {
        title: "计划时间",
        key: "time"
      }, {
        title: "完成情况",
        key: "state",
        customSlot: "state"
      }
    ]

    const dataSource21 = [
      { task: "睡觉", time: "两小时", state: "1" },
      { task: "吃饭", time: "两小时", state: "2" },
      { task: "吃饭", time: "两小时", state: "1" },
      { task: "睡觉", time: "两小时", state: "1" },
      { task: "睡觉", time: "两小时", state: "2" },
      { task: "上班", time: "两小时", state: "1" },
      { task: "上班", time: "两小时", state: "1" },
      { task: "上班", time: "两小时", state: "0" },
      { task: "睡觉", time: "两小时", state: "0" },
      { task: "睡觉", time: "两小时", state: "0" }
    ]

    return {
      mainRef,
      columns21,
      dataSource21
    };
  },
});
</script>

<style lang="less" scoped>
#main {
  width: 100%;
  height: 410px;
}

.leaving-messages {
  li {
    position: relative;
    padding: 10px 0;
    border-bottom: 1px solid #eee;

    h3 {
      padding-bottom: 5px;
      font-weight: 700;
    }

    p {
      font-size: 14px;
      padding-bottom: 10px;
    }

    >span {
      color: #999;
    }
  }
}

.target {
  width: 100%;
  height: 440px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}

.target-title {
  margin: 20px;
}

.statistics {
  font-size: 24px !important;
}

.statistics-body {
  padding: 14px 0;
}
</style>
