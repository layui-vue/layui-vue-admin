<template>
  <lay-container :fluid="true" style="padding: 10px">
    <lay-card>
      <div class="search-div">
        <lay-input style="width: 200px"></lay-input>
        <lay-button type="primary" style="margin-left: 10px">查询</lay-button>
        <lay-button>重置</lay-button>
      </div>
    </lay-card>

    <lay-card style="margin-top: 10px; border-radius: 5px">
      <div v-for="(item, index) in articleList" :key="index">
        <div class="article-item">
          <div class="article-item-content">
            <div style="margin: 30px 0 15px">{{ item.title }}</div>
            <div
              class="content-tags"
              v-for="(tagName, index) in item.tags"
              :key="index"
            >
              <lay-tag variant="light">{{ tagName }}</lay-tag>
            </div>
            <div style="font-size: 14px; margin: 15px 0">
              {{ item.content }}
            </div>
            <div class="content-userInfo">
              <lay-avatar
                src="https://foruda.gitee.com/avatar/1677022544584087390/4835367_jmysy_1578975358.png"
                radius
              ></lay-avatar>
              &nbsp;&nbsp;{{ item.user }} 发表于2小时前
            </div>
            <div class="content-start">
              <div class="content-start-item borderR">
                <lay-icon type="layui-icon-star"></lay-icon> 666
              </div>
              <div class="content-start-item borderR">
                <lay-icon type="layui-icon-note"></lay-icon> 666
              </div>
              <div class="content-start-item">
                <lay-icon type="layui-icon-dialogue"></lay-icon> 666
              </div>
            </div>
          </div>
          <div class="article-item-img">
            <img
              src="https://gw.alipayobjects.com/zos/rmsportal/iXjVmWVHbCJAyqvDxdtx.png"
            />
          </div>
        </div>
      </div>
    </lay-card>
  </lay-container>
</template>

<script lang="ts">
import { ref } from 'vue'

export default {
  setup() {
    const page = ref({ total: 100, limit: 10, current: 2 })

    const articleList = [
      {
        id: '1',
        title: 'layui-vue',
        content:
          'layui - vue（谐音：类 UI) 是 一 套 Vue 3.0 的 桌 面 端 组 件 库',
        tags: ['layui-vue', 'UI框架', '设计语言'],
        user: '就眠儀式'
      },
      {
        id: '2',
        title: 'layui-vue',
        content:
          'layui - vue（谐音：类 UI) 是 一 套 Vue 3.0 的 桌 面 端 组 件 库',
        tags: ['layui-vue', 'UI框架', '设计语言'],
        user: '就眠儀式'
      },
      {
        id: '3',
        title: 'layui-vue',
        content:
          'layui - vue（谐音：类 UI) 是 一 套 Vue 3.0 的 桌 面 端 组 件 库',
        tags: ['layui-vue', 'UI框架', '设计语言'],
        user: '就眠儀式'
      },
      {
        id: '4',
        title: 'layui-vue',
        content:
          'layui - vue（谐音：类 UI) 是 一 套 Vue 3.0 的 桌 面 端 组 件 库',
        tags: ['layui-vue', 'UI框架', '设计语言'],
        user: '就眠儀式'
      },
      {
        id: '5',
        title: 'layui-vue',
        content:
          'layui - vue（谐音：类 UI) 是 一 套 Vue 3.0 的 桌 面 端 组 件 库',
        tags: ['layui-vue', 'UI框架', '设计语言'],
        user: '就眠儀式'
      },
      {
        id: '6',
        title: 'layui-vue',
        content:
          'layui - vue（谐音：类 UI) 是 一 套 Vue 3.0 的 桌 面 端 组 件 库',
        tags: ['layui-vue', 'UI框架', '设计语言'],
        user: '就眠儀式'
      },
      {
        id: '7',
        title: 'layui-vue',
        content:
          'layui - vue（谐音：类 UI) 是 一 套 Vue 3.0 的 桌 面 端 组 件 库',
        tags: ['layui-vue', 'UI框架', '设计语言'],
        user: '就眠儀式'
      },
      {
        id: '8',
        title: 'layui-vue',
        content:
          'layui - vue（谐音：类 UI) 是 一 套 Vue 3.0 的 桌 面 端 组 件 库',
        tags: ['layui-vue', 'UI框架', '设计语言'],
        user: '就眠儀式'
      }
    ]

    return {
      articleList,
      page
    }
  }
}
</script>
<style scoped>
:deep(.card-list-item .layui-card-body img) {
  width: 100%;
}

:deep(.card-list-item .layui-card-body) {
  padding: 0px !important;
}
</style>
<style lang="less" scoped>
.button-list {
  display: flex;
}

.button-list > div {
  flex: 1;
  text-align: center;
  color: #909399;
}

.search-div {
  width: 100%;
  padding: 10px 0;
  text-align: center;
}

.article-item {
  display: flex;
  width: 100%;
  height: 230px;
  padding: 10px;
  margin-bottom: 10px;
  box-sizing: border-box;
  border-bottom: 1px solid #ebeef5;
}
.article-item-content {
  flex: 1;
  font-size: 18px;
  color: #131313;
}
.article-item-img {
  width: 300px;
  height: 100%;
  padding-right: 20px;
  box-sizing: border-box;
  > img {
    width: 280px;
    height: 190px;
    border-radius: 5px;
  }
  > img:hover {
    cursor: pointer;
    box-shadow: 1px 1px 10px #dfdfdf;
  }
}
.content-tags {
  display: inline-block;
  > .layui-tag {
    margin-right: 10px;
  }
}
.content-userInfo {
  color: #898989;
  font-size: 14px;
}
.content-start {
  width: 160px;
  margin-top: 5px;
  font-size: 12px;
  color: #878787;
  display: flex;
}
.content-start-item {
  flex: 1;
  height: 20px;
  line-height: 20px;
  display: inline-block;
  text-align: center;
}
.borderR {
  border-right: 1px solid #ebeef5;
}
</style>
