<template>
  <div>
    <lay-card style="margin: 10px">
      <p class="title">基础表单</p>
      <p class="describe">
        表单页用于向用户收集或验证信息，基础表单常见于数据项较少的表单场景。表单域标签也可支持响应式.
      </p>
    </lay-card>
    <lay-container :fluid="true" style="padding: 10px; padding-top: 0px">
      <lay-card style="padding: 40px">
        <lay-row>
          <lay-col :md="10" :md-offset="7">
            <lay-form :model="model">
              <lay-form-item label="账户" prop="username">
                <lay-input v-model="model.username"></lay-input>
              </lay-form-item>
              <lay-form-item label="密码" prop="password">
                <lay-input v-model="model.password" type="password"></lay-input>
              </lay-form-item>
              <lay-form-item label="爱好" prop="hobby">
                <lay-select v-model="model.hobby">
                  <lay-select-option value="1" label="学习"></lay-select-option>
                  <lay-select-option value="2" label="编码"></lay-select-option>
                  <lay-select-option value="3" label="运动"></lay-select-option>
                </lay-select>
              </lay-form-item>
              <lay-form-item label="特长" prop="specialty">
                <lay-radio v-model="model.specialty" name="specialty" value="1"
                  >写作</lay-radio
                >
                <lay-radio v-model="model.specialty" name="specialty" value="2"
                  >画画</lay-radio
                >
                <lay-radio v-model="model.specialty" name="specialty" value="3"
                  >编码</lay-radio
                >
              </lay-form-item>
              <lay-form-item label="描述" prop="desc">
                <lay-textarea
                  placeholder="请输入描述"
                  v-model="model.desc"
                ></lay-textarea>
              </lay-form-item>
              <lay-form-item label="详情">
                {{ model }}
              </lay-form-item>
              <lay-form-item>
                <lay-row :space="20">
                  <lay-col :md="12">
                    <lay-button
                      :fluid="true"
                      @click="submitClick"
                      type="primary"
                      >提交</lay-button
                    >
                  </lay-col>
                  <lay-col :md="12">
                    <lay-button :fluid="true" @click="submitClick"
                      >重置</lay-button
                    >
                  </lay-col>
                </lay-row>
              </lay-form-item>
            </lay-form>
          </lay-col>
        </lay-row>
      </lay-card>
    </lay-container>
  </div>
</template>

<script lang="ts">
import { reactive } from 'vue'
import { layer } from '@layui/layer-vue'
import { useRouter, useRoute } from 'vue-router'

export default {
  setup() {
    const route = useRoute()
    const router = useRouter()

    const model = reactive({
      username: 'admin',
      password: '123456',
      desc: '修复开启 isLazyimg:true 后, 图片懒加载但是图片不存在的报错问题',
      specialty: '1',
      hobby: '1'
    })

    const submitClick = function () {
      layer.msg(`${JSON.stringify(model)}`, () => {})
    }

    return {
      model,
      submitClick,
      route
    }
  }
}
</script>

<style scoped>
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
</style>
