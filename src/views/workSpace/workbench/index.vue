<template>
  <lay-container fluid="true" style="padding: 10px">
    <lay-row space="10">
      <lay-col md="18" sm="18" xs="24">
        <lay-row :space="10">
          <lay-col :md="24">
            <lay-card class="project-grids">
              <template v-slot:title> 最近更新 </template>
              <template v-slot:extra> 全部更新 </template>
              <template v-slot:body>
                <lay-row>
                  <lay-col :md="8">
                    <div class="project-grid">
                      <div class="project-grid-title">
                        <lay-icon
                          type="layui-icon-face-smile"
                          color="#da242a"
                          size="24px"
                        ></lay-icon>
                        <a>upload</a>
                      </div>
                      <p class="project-grid-center">
                        修复开启 isLazyimg:true 后,
                        图片懒加载但是图片不存在的报错问题
                      </p>
                      <p class="project-grid-footer">
                        <a>文件上传</a>
                        <span>7天前</span>
                      </p>
                    </div>
                  </lay-col>
                  <lay-col :md="8">
                    <div class="project-grid">
                      <div class="project-grid-title">
                        <lay-icon
                          type="layui-icon-theme"
                          color="#ffdc00"
                          size="24px"
                        ></lay-icon>
                        <a>upload</a>
                      </div>
                      <p class="project-grid-center">
                        修复开启 isLazyimg:true 后,
                        图片懒加载但是图片不存在的报错问题
                      </p>
                      <p class="project-grid-footer">
                        <a>文件上传</a>
                        <span>7天前</span>
                      </p>
                    </div>
                  </lay-col>
                  <lay-col :md="8">
                    <div class="project-grid">
                      <div class="project-grid-title">
                        <lay-icon
                          type="layui-icon-username"
                          color="#2870df"
                          size="24px"
                        ></lay-icon>
                        <a>upload</a>
                      </div>
                      <p class="project-grid-center">
                        修复开启 isLazyimg:true 后,
                        图片懒加载但是图片不存在的报错问题
                      </p>
                      <p class="project-grid-footer">
                        <a>文件上传</a>
                        <span>7天前</span>
                      </p>
                    </div>
                  </lay-col>
                  <lay-col :md="8">
                    <div class="project-grid">
                      <div class="project-grid-title">
                        <lay-icon
                          type="layui-icon-diamond"
                          color="#10bd72"
                          size="24px"
                        ></lay-icon>
                        <a>upload</a>
                      </div>
                      <p class="project-grid-center">
                        修复开启 isLazyimg:true 后,
                        图片懒加载但是图片不存在的报错问题
                      </p>
                      <p class="project-grid-footer">
                        <a>文件上传</a>
                        <span>7天前</span>
                      </p>
                    </div>
                  </lay-col>
                  <lay-col :md="8">
                    <div class="project-grid">
                      <div class="project-grid-title">
                        <lay-icon
                          type="layui-icon-dialogue"
                          color="#ff79c6"
                          size="24px"
                        ></lay-icon>
                        <a>upload</a>
                      </div>
                      <p class="project-grid-center">
                        修复开启 isLazyimg:true 后,
                        图片懒加载但是图片不存在的报错问题
                      </p>
                      <p class="project-grid-footer">
                        <a>文件上传</a>
                        <span>7天前</span>
                      </p>
                    </div>
                  </lay-col>
                  <lay-col :md="8">
                    <div class="project-grid">
                      <div class="project-grid-title">
                        <lay-icon
                          type="layui-icon-search"
                          color="#742cc1"
                          size="24px"
                        ></lay-icon>
                        <a>upload</a>
                      </div>
                      <p class="project-grid-center">
                        修复开启 isLazyimg:true 后,
                        图片懒加载但是图片不存在的报错问题
                      </p>
                      <p class="project-grid-footer">
                        <a>文件上传</a>
                        <span>7天前</span>
                      </p>
                    </div>
                  </lay-col>
                </lay-row>
              </template>
            </lay-card>
          </lay-col>
          <lay-col :md="24">
            <lay-card>
              <template v-slot:title> 最近动态 </template>
              <dl>
                <dd class="dynamic">
                  <div class="layui-status-img">
                    <a href="javascript:;"
                      ><img
                        src="https://tse1-mm.cn.bing.net/th/id/OIP-C.0fLeVmNXnV-6Eom3FEUNjgAAAA?w=196&h=196&c=7&r=0&o=5&dpr=1.5&pid=1.7"
                    /></a>
                  </div>
                  <div>
                    <p>
                      张三 在
                      <a href="javascript:;/vipclub/list/layuiadmin/">讨论区</a>
                      回答问题
                    </p>
                    <span>几秒前</span>
                  </div>
                </dd>
                <dd class="dynamic">
                  <div class="layui-status-img">
                    <a href="javascript:;"
                      ><img
                        src="https://tse1-mm.cn.bing.net/th/id/OIP-C.0fLeVmNXnV-6Eom3FEUNjgAAAA?w=196&h=196&c=7&r=0&o=5&dpr=1.5&pid=1.7"
                    /></a>
                  </div>
                  <div>
                    <p>
                      张三 在
                      <a href="javascript:;/vipclub/list/layuiadmin/">讨论区</a>
                      回答问题
                    </p>
                    <span>几秒前</span>
                  </div>
                </dd>
                <dd class="dynamic">
                  <div class="layui-status-img">
                    <a href="javascript:;"
                      ><img
                        src="https://tse1-mm.cn.bing.net/th/id/OIP-C.0fLeVmNXnV-6Eom3FEUNjgAAAA?w=196&h=196&c=7&r=0&o=5&dpr=1.5&pid=1.7"
                    /></a>
                  </div>
                  <div>
                    <p>
                      张三 在
                      <a href="javascript:;/vipclub/list/layuiadmin/">讨论区</a>
                      回答问题
                    </p>
                    <span>几秒前</span>
                  </div>
                </dd>
                <dd class="dynamic">
                  <div class="layui-status-img">
                    <a href="javascript:;"
                      ><img
                        src="https://tse1-mm.cn.bing.net/th/id/OIP-C.0fLeVmNXnV-6Eom3FEUNjgAAAA?w=196&h=196&c=7&r=0&o=5&dpr=1.5&pid=1.7"
                    /></a>
                  </div>
                  <div>
                    <p>
                      张三 在
                      <a href="javascript:;/vipclub/list/layuiadmin/">讨论区</a>
                      回答问题
                    </p>
                    <span>几秒前</span>
                  </div>
                </dd>
              </dl>
            </lay-card>
          </lay-col>
        </lay-row>
      </lay-col>
      <lay-col md="6" sm="6" xs="24">
        <lay-row :space="10">
          <lay-col :md="24">
            <lay-card>
              <template v-slot:title> 便捷导航 </template>
              <div class="links">
                <a>操作一</a>
                <a>操作二</a>
                <a>操作三</a>
                <a>操作四</a>
                <a>操作五</a>
                <a>操作六</a>
                <a>操作七</a>
                <a>操作八</a>
              </div>
            </lay-card>
          </lay-col>
          <lay-col :md="24">
            <lay-card>
              <template v-slot:title> 八卦新闻 </template>
              <div id="main" ref="mainRef"></div>
            </lay-card>
          </lay-col>
          <lay-col :md="24">
            <lay-card>
              <template #title> 产品动态 </template>
              <a class="news">官网文档</a>
            </lay-card>
          </lay-col>
        </lay-row>
      </lay-col>
    </lay-row>
  </lay-container>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import * as echarts from 'echarts'
import { useI18n } from '@layui/layui-vue'

export default defineComponent({
  setup() {
    const { t } = useI18n()

    const mainRef = ref()
    onMounted(() => {
      var chartDom = mainRef.value

      // @ts-ignore
      var myChart = echarts.init(chartDom)

      var option = {
        radar: {
          indicator: [
            { name: '进攻', max: 6500 },
            { name: '技巧', max: 16000 },
            { name: '力量', max: 30000 },
            { name: '速度', max: 38000 },
            { name: '体能', max: 52000 },
            { name: '防守', max: 25000 }
          ]
        },
        series: [
          {
            name: 'Budget vs spending',
            type: 'radar',
            data: [
              {
                value: [4200, 3000, 20000, 35000, 50000, 18000]
              },
              {
                value: [5000, 14000, 28000, 26000, 42000, 21000]
              }
            ]
          }
        ]
      }
      myChart.setOption(option)
    })
    return {
      mainRef,
      t
    }
  }
})
</script>

<style lang="less" scoped>
.project-grids {
  :deep(.layui-card-body) {
    padding: 0;
  }
}

.project-grid:hover {
  box-shadow: 1px 1px 17px #ccc;
}
.project-grid {
  padding: 24px;
  background-color: #f8f8f8;
  border-radius: 4px;
  margin: 10px;
  color: #777;

  .project-grid-title {
    padding-bottom: 10px;

    i {
      margin-right: 10px;
      font-size: 24px;
      color: #009688;
    }

    a {
      line-height: 24px;
      font-size: 16px;
      vertical-align: top;
    }
    .layui-icon {
      font-weight: 600;
    }
  }

  .project-grid-center {
    height: 44px;
    line-height: 22px;
    margin-bottom: 10px;
    overflow: hidden;
  }

  .project-grid-footer {
    position: relative;

    a {
      color: #777;
      font-size: 12px;
      text-overflow: ellipsis;
      word-break: break-all;
    }

    span {
      color: #ccc;
      font-size: 12px;
      position: absolute;
      right: 0;
    }
  }
}

.dynamic {
  padding: 15px 0;
  border-bottom: 1px solid #eee;
  display: -webkit-flex;
  display: flex;

  .layui-status-img img {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background-color: #009688;
    margin-right: 15px;
  }

  a {
    color: #0481ff;
  }

  span {
    color: #bbb;
  }
}

.links {
  padding: 10px;
}

.links a {
  width: 25%;
  font-size: 14px;
  margin-top: 8px;
  margin-bottom: 8px;
  display: inline-block;
  color: #666;
}
.links a:hover {
  color: #11be73;
}

.news {
  display: block;
  line-height: 60px;
  text-align: center;
  background-color: #009688 !important;
  color: #fff !important;
  margin-bottom: 10px;
}

#main {
  height: 300px;
  width: 100%;
}
</style>
