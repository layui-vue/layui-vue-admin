<template>
  <div>
    <lay-card>
      <p class="title">分步表单</p>
      <p class="describe">
        表单页用于向用户收集或验证信息，基础表单常见于数据项较少的表单场景。表单域标签也可支持响应式.
      </p>
    </lay-card>
    <lay-container :fluid="true" style="padding: 10px; padding-top: 0px">
      <lay-card style="padding: 40px">
        <lay-step :active="active" center>
          <lay-step-item title="第一步" content="填写转账信息">
            <template #pace>
              <lay-icon type="layui-icon-ok"></lay-icon>
            </template>
          </lay-step-item>
          <lay-step-item title="第二步" content="确认转账信息"></lay-step-item>
          <lay-step-item title="第三步" content="转账成功"></lay-step-item>
        </lay-step>

        <div class="step-form">
          <lay-notice-bar
            leftIcon="layui-icon-help-circle"
            rightIcon="layui-icon-close"
            text="请确认您填写的信息无误哦"
            background="#ecf5ff"
          ></lay-notice-bar>
          <div style="height: 20px"></div>

          <lay-form
            v-show="active != 2"
            :model="formValue"
            label-width="120"
            :pane="active == 1"
          >
            <lay-form-item label="付款账户" prop="account" required>
              <lay-input
                :allow-clear="true"
                v-model="formValue.account"
              ></lay-input>
            </lay-form-item>
            <lay-form-item label="收款账户" prop="payee" required>
              <lay-row :span="24">
                <lay-col md="6">
                  <lay-select
                    :allow-clear="true"
                    style="width: 100%; display: inline-block"
                    v-model="formValue.payType"
                    placeholder="请选择"
                  >
                    <lay-select-option value="zhifubao" label="支付宝">
                    </lay-select-option>
                    <lay-select-option value="weixin" label="微信">
                    </lay-select-option>
                  </lay-select>
                </lay-col>
                <lay-col md="18">
                  <lay-input
                    style="width: 100%; display: inline-block"
                    v-model="formValue.payee"
                  >
                  </lay-input>
                </lay-col>
              </lay-row>
            </lay-form-item>
            <lay-form-item label="收款人姓名" prop="payeeName" required>
              <lay-input
                :allow-clear="true"
                v-model="formValue.payeeName"
              ></lay-input>
            </lay-form-item>
            <lay-form-item label="转账金额" prop="amount" required>
              <lay-input :allow-clear="true" v-model="formValue.amount">
                <template #prefix> ￥</template>
              </lay-input>
            </lay-form-item>
            <lay-form-item
              v-show="active == 1"
              label="支付密码"
              prop="password"
              required
            >
              <lay-input
                :allow-clear="true"
                type="password"
                v-model="formValue.password"
              >
              </lay-input>
            </lay-form-item>
          </lay-form>
          <lay-row style="margin-top: 0px">
            <div style="display: inline-block; width: 120px"></div>

            <lay-button
              type="primary"
              style="margin-right: 15px"
              size="sm"
              @click="next"
            >
              下一步
            </lay-button>
            <lay-button size="sm" @click="previous" v-if="active > 0">
              上一步
            </lay-button>
          </lay-row>
          <!-- 
          <lay-button size="xs" @click="previous">上一步</lay-button>
          <lay-button size="xs" @click="next">下一步</lay-button> -->
        </div>
      </lay-card>
    </lay-container>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, reactive } from 'vue'
import { layer } from '@layui/layer-vue'

const model = reactive({
  username: 'admin',
  password: '123456',
  specialty: '1',
  hobby: '1',
  desc: '修复开启 isLazyimg:true 后, 图片懒加载但是图片不存在的报错问题'
})

const submitClick = function () {
  layer.msg(`${JSON.stringify(model)}`, () => {})
}

const loading = ref(true)
const active = ref(0)
const next = () => {
  if (active.value++ >= 2) active.value = 0
  console.log(active.value)
}
const previous = () => {
  if (active.value-- === 0) active.value = 0
}
const formValue = reactive({
  account: 'layuivueadmin@layui-vue.com',
  payType: 'zhifubao',
  payee: 'layuivueadmin@layui-test',
  payeeName: 'layuivueAdmin',
  amount: '500',
  password: '123456'
})
function toReset() {
  formValue.account = ''
  formValue.payType = 'zhifubao'
  formValue.payee = ''
  formValue.payeeName = ''
  formValue.amount = ''
  formValue.password = ''
}

const submit2 = function () {
  layer.open(`${JSON.stringify(model)}`)
}
</script>

<style lang="less" scoped>
.title {
  font-size: 20px;
  font-weight: 500;
  margin-top: 12px;
  margin-bottom: 20px;
}

.describe {
  font-size: 14px;
  margin-bottom: 12px;
}
.step-form {
  width: 100%;
  padding: 20px 150px;
  box-sizing: border-box;

  .layui-row:after,
  .layui-row:before {
    display: none;
  }
}
</style>