<template>
  <lay-container :fluid="true" style="padding: 10px">
    <lay-row :span="24" style="display: flex">
      <lay-col style="max-width: 400px" :xs="24">
        <lay-card shadow="hover" class="info-user">
          <div style="text-align: center">
            <lay-avatar :src="src" radius class="user-avatar"></lay-avatar>
            <div class="user-name">管理员</div>
            <div class="user-briefing">孤岛高山何其多</div>
          </div>

          <lay-row>
            <lay-icon type="layui-icon-username"> </lay-icon
            >&nbsp;&nbsp;&nbsp;资深前端工程师
          </lay-row>
          <lay-row>
            <lay-icon type="layui-icon-cellphone"> </lay-icon
            >&nbsp;&nbsp;&nbsp;12345678900
          </lay-row>
          <lay-row>
            <lay-icon type="layui-icon-template"> </lay-icon
            >&nbsp;&nbsp;&nbsp;组织机构
          </lay-row>

          <lay-line border-style="dashed" border-width="1px"></lay-line>
          <h1 style="margin: 10px 0">标签</h1>
          <template v-for="tag in tagsList" :key="tag.id">
            <lay-tag style="margin: 0 6px 6px 0">
              &nbsp;<lay-badge type="dot" :theme="tag.theme" ripple></lay-badge>
              &nbsp;&nbsp;{{ tag.tag }}
            </lay-tag>
          </template>
        </lay-card>
      </lay-col>
      <lay-col style="flex: 1; background-color: #fff" :xs="24">
        <lay-tab type="brief" v-model="activeTab">
          <lay-tab-item title="基本信息" id="baseInfo">
            <div class="tab-content">
              <lay-form
                :model="model4"
                ref="layFormRef4"
                label-width="60"
                size="sm"
              >
                <lay-form-item label="昵称" prop="username" required>
                  <lay-input v-model="model4.username" allow-clear></lay-input>
                </lay-form-item>
                <lay-form-item label="密码" prop="password" required>
                  <lay-input
                    v-model="model4.password"
                    type="password"
                    allow-clear
                  ></lay-input>
                </lay-form-item>
                <lay-form-item label="性别" prop="sex">
                  <lay-select
                    v-model="model4.sex"
                    style="width: 100%"
                    placeholder="请选择性别"
                  >
                    <lay-select-option
                      value="man"
                      label="男"
                    ></lay-select-option>
                    <lay-select-option
                      value="woman"
                      label="女"
                    ></lay-select-option>
                  </lay-select>
                </lay-form-item>
                <lay-form-item label="邮箱" prop="email">
                  <lay-input
                    v-model="model4.email"
                    type="email"
                    allow-clear
                  ></lay-input>
                </lay-form-item>
                <lay-form-item label="个人简介" prop="desc">
                  <lay-textarea
                    placeholder="还没有个人简介哦~"
                    v-model="model4.desc"
                    allow-clear
                  ></lay-textarea>
                </lay-form-item>
                <lay-form-item label="联系电话" prop="phone" required>
                  <lay-input
                    v-model="model4.phone"
                    type="phone"
                    allow-clear
                  ></lay-input>
                </lay-form-item>
                <lay-form-item style="text-align: center">
                  <lay-button type="primary" @click="submit4">提交</lay-button>
                  <lay-button @click="clearValidate4">清除校验</lay-button>
                  <lay-button @click="reset4">重置表单</lay-button>
                </lay-form-item>
              </lay-form>
            </div>
          </lay-tab-item>
          <lay-tab-item title="账号绑定" id="bindingInfo">
            <div class="tab-content" style="max-width: unset">
              <template v-for="item in bindingAccountList" :key="item.id">
                <div class="account-item">
                  <div
                    v-if="item.icon != ''"
                    style="width: 45px; display: inline-block"
                  >
                    <lay-icon
                      :type="item.icon"
                      :color="item.color"
                      size="34px"
                    ></lay-icon>
                  </div>
                  <div class="account-desc">
                    <div style="color: #000000e0">{{ item.title }}</div>
                    <div>{{ item.desc }}</div>
                  </div>
                  <div class="account-option">
                    {{ item.option }}
                  </div>
                </div>
              </template>
            </div>
          </lay-tab-item>
        </lay-tab>
      </lay-col>
    </lay-row>
  </lay-container>
</template>

<script lang="ts">
import { ref, reactive } from 'vue'
import { layer } from '@layui/layer-vue'
export default {
  setup() {
    const src =
      'https://foruda.gitee.com/avatar/1677022544584087390/4835367_jmysy_1578975358.png'

    const tagsList = ref([
      { id: 1, tag: '雪', theme: 'blue' },
      { id: 2, tag: '风是从哪儿来wu', theme: '' },
      { id: 3, tag: '漫游星河', theme: 'orange' },
      { id: 4, tag: '春日之花', theme: 'green' },
      { id: 5, tag: 'Hey', theme: 'cyan' },
      { id: 6, tag: '风吹一夏', theme: '' }
    ])
    const activeTab = ref('baseInfo')

    const model4 = reactive({
      username: 'admin',
      password: '123456',
      phone: '12345678900',
      desc: '',
      sex: '',
      email: ''
    })

    const layFormRef4 = ref()

    const submit4 = function () {
      layFormRef4.value.validate(
        (isValidate: boolean, model: any, errors: any) => {
          layer.open({
            type: 1,
            title: '表单提交结果',
            content: `<div style="padding: 10px"><p>是否通过 : ${isValidate}</p> <p>表单数据 : ${JSON.stringify(
              model
            )} </p> <p>错误信息 : ${JSON.stringify(errors)}</p></div>`,
            shade: false,
            isHtmlFragment: true,
            btn: [
              {
                text: '确认',
                callback(index: Number) {
                  layer.close(index)
                }
              }
            ],
            area: '500px'
          })
        }
      )
    }

    const clearValidate4 = () => {
      layFormRef4.value.clearValidate()
    }

    const reset4 = () => {
      layFormRef4.value.reset()
    }

    const bindingAccountList = ref([
      {
        id: 1,
        title: '密保手机',
        desc: '已绑定手机: 12345678901',
        option: '去修改',
        icon: ''
      },
      {
        id: 2,
        title: '密保邮箱',
        desc: '已绑定邮箱: email@layui-vue',
        option: '去修改',
        icon: ''
      },
      {
        id: 3,
        title: '密保问题',
        desc: '未设置密保问题',
        option: '去设置',
        icon: ''
      },
      {
        id: 4,
        title: '绑定QQ',
        desc: '当前未绑定QQ账号',
        option: '去绑定',
        icon: 'layui-icon-login-qq',
        color: '#3492ed'
      },
      {
        id: 5,
        title: '绑定微信',
        desc: '当前未绑定绑定微信账号',
        option: '去绑定',
        icon: 'layui-icon-login-wechat',
        color: '#4daf29'
      },
      {
        id: 6,
        title: '绑定微博',
        desc: '当前未绑定绑定微博账号',
        option: '去绑定',
        icon: 'layui-icon-login-weibo',
        color: '#e6162d'
      }
    ])
    return {
      src,
      model4,
      tagsList,
      activeTab,
      layFormRef4,
      bindingAccountList,
      reset4,
      submit4,
      clearValidate4
    }
  }
}
</script>

<style scoped>
.layui-tag .layui-tag-text {
  margin: 0 8px 8px 0;
}
.info-user {
  max-width: 400px;
  min-width: 320px;
  padding: 20px;
  margin-right: 10px;
}
.user-avatar {
  width: 40%;
  height: 40%;
}
.user-name {
  font-size: 24px;
  margin: 15px;
}
.user-briefing {
  color: #0006;
  font-size: 14px;
  margin-bottom: 10px;
}

.header-title {
  font-size: 20px;
  font-weight: 500;
  margin-top: 12px;
  margin-bottom: 20px;
}

.header-describe {
  font-size: 14px;
  margin-bottom: 12px;
}

.tab-content {
  height: 368px;
  max-width: 500px;
  padding: 0 20px;
  background-color: #fff;
}
.account-item {
  display: flex;
  width: 99%;
  height: 41px;
  line-height: 43px;
  margin-right: 10px;
  padding: 12px 0;
  border-bottom: #ccc solid 1px;
}
.account-item:last-child {
  border-bottom: none;
}
.account-desc {
  flex: 1;
  color: #0006;
  line-height: 24px;
  display: inline-block;
}
.account-option {
  width: 45px;
  display: inline-block;
  color: var(--global-primary-color);
}
</style>