<template>
  <div>
    <lay-card style="margin: 10px">
      <p class="top-title">分步表单</p>
      <p class="describe">
        表单页用于向用户收集或验证信息，基础表单常见于数据项较少的表单场景。表单域标签也可支持响应式.
      </p>
    </lay-card>
    <lay-container :fluid="true" style="padding: 10px; padding-top: 0px">
      <lay-card style="padding: 40px">
        <lay-step :active="active" current-status="primary" center>
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
            v-show="active < 2"
            leftIcon="layui-icon-help-circle"
            rightIcon="layui-icon-close"
            :text="
              active < 1
                ? '请确认您填写的信息无误哦'
                : '确认转账后，资金将直接打入对方账户，无法退回'
            "
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
          <div v-if="active == 2" class="option-result">
            <div style="width: 100%; height: 210px; text-align: center">
              <img
                src="../../assets/common/success.png"
                alt=""
                style="width: 80px; height: 80px"
              />
              <div
                style="
                  font-size: 20px;
                  color: #101662;
                  font-weight: 600;
                  margin-top: 15px;
                "
              >
                操作成功
              </div>
              <div style="font-size: 12px; color: #ccc; margin-top: 5px">
                预计两小时内到账
              </div>

              <div style="font-size: 10px; color: #ccc; margin-top: 15px">
                <lay-button size="sm" type="normal" @click="next">
                  在转一笔
                </lay-button>
                <lay-button size="sm"> 查看账单 </lay-button>
              </div>
            </div>

            <lay-row>
              <lay-col md="4" class="title">付款账户</lay-col>
              <lay-col md="20" class="content borderR">
                {{ formValue.account }}
              </lay-col>
            </lay-row>
            <lay-row>
              <lay-col md="4" class="title">收款账户</lay-col>
              <lay-col md="20" class="content borderR">
                {{ formValue.payee }}
              </lay-col>
            </lay-row>
            <lay-row>
              <lay-col md="4" class="title">收款人姓名</lay-col>
              <lay-col md="20" class="content borderR">
                {{ formValue.payeeName }}
              </lay-col>
            </lay-row>
            <lay-row>
              <lay-col md="4" class="title borderB">转账金额</lay-col>
              <lay-col md="20" class="content borderR borderB">
                <span style="font-size: 18px">
                  {{ formValue.amount }} &nbsp;</span
                >元
              </lay-col>
            </lay-row>
          </div>
          <lay-row style="margin-top: 0px" v-if="active < 2">
            <div style="display: inline-block; width: 120px"></div>
            <lay-button
              type="primary"
              :style="{
                marginRight: '15px',
                marginLeft: active < 1 ? '15px' : '0px'
              }"
              size="sm"
              @click="next"
            >
              下一步
            </lay-button>
            <lay-button size="sm" v-show="active > 0" @click="previous">
              上一步
            </lay-button>
          </lay-row>
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
.top-title {
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
.option-result {
  width: 100%;
  height: 400px;
  font-size: 14px;

  .title {
    height: 40px;
    line-height: 40px;
    padding: 0 10px;
    display: inline-block;
    background: #f7f7f7;
    border-top: 1px solid #e8e8e8;
    border-left: 1px solid #e8e8e8;
  }
  .content {
    height: 40px;
    line-height: 40px;
    padding: 0 3px 0 10px;
    border-top: 1px solid #e8e8e8;
    border-left: 1px solid #e8e8e8;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: left;
  }
  .borderR {
    border-right: 1px solid #e8e8e8;
  }
  .borderB {
    border-bottom: 1px solid #e8e8e8;
  }
}
</style>