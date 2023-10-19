<template>
  <lay-container fluid="true" class="file-box">
    <lay-card>
      <lay-form style="margin-top: 10px">
        <lay-row>
          <lay-col :md="5">
            <lay-form-item label="文件名称" label-width="80">
              <lay-input
                v-model="searchQuery.flieName"
                placeholder="请输入"
                size="sm"
                :allow-clear="true"
                style="width: 98%"
              ></lay-input>
            </lay-form-item>
          </lay-col>
          <lay-col :md="5">
            <lay-form-item label="文件路径" label-width="80">
              <lay-input
                v-model="searchQuery.filePath"
                placeholder="请输入"
                size="sm"
                :allow-clear="true"
                style="width: 98%"
              ></lay-input>
            </lay-form-item>
          </lay-col>
          <lay-col :md="5">
            <lay-form-item label="上传人" label-width="80">
              <lay-input
                v-model="searchQuery.uploadUser"
                placeholder="请输入"
                size="sm"
                :allow-clear="true"
                style="width: 98%"
              ></lay-input>
            </lay-form-item>
          </lay-col>

          <lay-col :md="5">
            <lay-form-item label-width="20">
              <lay-button
                style="margin-left: 20px"
                type="normal"
                size="sm"
                @click="toSearch"
              >
                查询
              </lay-button>
              <lay-button size="sm" @click="toReset"> 重置 </lay-button>
            </lay-form-item>
          </lay-col>
        </lay-row>
      </lay-form>
    </lay-card>
    <!-- table -->
    <div class="table-box">
      <lay-table
        :page="page"
        :columns="columns"
        :height="'100%'"
        :loading="loading"
        :default-toolbar="true"
        :data-source="dataSource"
        v-model:selected-keys="selectedKeys"
        @change="change"
        @sortChange="sortChange"
      >
        <template #filePath="{ row }">
          <a
            style="color: #1677ff"
            href="https://foruda.gitee.com/avatar/1677022544584087390/4835367_jmysy_1578975358.png"
            target="_blank"
            >{{ row.filePath }}</a
          >
        </template>

        <template v-slot:toolbar>
          <lay-button size="sm" type="primary" @click="toImport">
            <lay-icon class="layui-icon-upload-drag"></lay-icon>
            上传
          </lay-button>
          <lay-button size="sm" @click="toRemove">
            <lay-icon class="layui-icon-delete"></lay-icon>
            删除
          </lay-button>
        </template>
        <template v-slot:operator="{ row }">
          <lay-button
            size="xs"
            border="green"
            border-style="dashed"
            @click="toDownload(row)"
            >下载</lay-button
          >
          <lay-popconfirm
            content="确定要删除此文件吗?"
            @confirm="confirm"
            @cancel="cancel"
          >
            <lay-button size="xs" border="red" border-style="dashed"
              >删除</lay-button
            >
          </lay-popconfirm>
        </template>
      </lay-table>
    </div>

    <lay-layer
      v-model="visibleImport"
      title="导入文件"
      :area="['380px', '380px']"
    >
      <lay-upload
        :beforeUpload="beforeUpload10"
        style="margin: 60px"
        url="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        v-model="file1"
        field="file"
        :auto="false"
        :drag="true"
      >
        <template #preview>
          {{ file1[0]?.name }}
        </template>
      </lay-upload>
      <div style="width: 100%; text-align: center">
        只能上传小于1000KB的文件
      </div>
    </lay-layer>
  </lay-container>
</template>
<script setup lang="ts">
import { ref, reactive } from 'vue'
import { layer } from '@layui/layui-vue'
const searchQuery = ref({
  filePath: '',
  flieName: '',
  uploadUser: ''
})

const visibleImport = ref(false)
const file1 = ref<any>([])
function toImport() {
  // layer.msg('导入')
  visibleImport.value = true
}
function toReset() {
  searchQuery.value = {
    filePath: '',
    flieName: '',
    uploadUser: ''
  }
}

function toSearch() {
  page.current = 1
  change(page)
}
function toDownload(row: any) {
  layer.msg('下载成功！')
}

const loading = ref(false)
const selectedKeys = ref([])
const page = reactive({ current: 1, limit: 10, total: 100 })
const columns = ref([
  { title: '选项', width: '55px', type: 'checkbox', fixed: 'left' },
  { title: '文件名称', key: 'fileName', sort: 'desc' },
  { title: '文件路径', key: 'filePath', sort: 'desc', customSlot: 'filePath' },
  { title: '文件大小', width: '120px', key: 'fileSize', sort: 'desc' },
  { title: '上传人', width: '120px', key: 'name', sort: 'desc' },
  { title: '上传时间', width: '220px', key: 'joinTime', sort: 'desc' },
  {
    title: '操作',
    width: '150px',
    customSlot: 'operator',
    key: 'operator',
    fixed: 'right'
  }
])
const change = (page: any) => {
  loading.value = true
  setTimeout(() => {
    dataSource.value = loadDataSource(page.current, page.limit)
    loading.value = false
  }, 1000)
}
const sortChange = (key: any, sort: number) => {
  layer.msg(`字段${key} - 排序${sort}, 你可以利用 sort-change 实现服务端排序`)
}
const dataSource = ref([
  {
    id: '1',
    name: '张大福',
    fileSize: '101.1KB',
    sex: '男',
    city: '浙江杭州',
    age: '18',
    fileName: 'eleadmin.jpg',
    joinTime: '2022-02-09 09:45:21',
    filePath: '20220722/881ef0f83ef347a18177ee26ccb33d1a.jpg'
  },
  {
    id: '2',
    name: '李旺',
    fileSize: '36.4KB',
    sex: '男',
    city: '浙江杭州',
    age: '20',
    fileName: 'CyrCNmTJfv7D6GFAg39bjT3eRkkRm5dI-copyright.jpg',
    joinTime: '2022-02-09 09:45:21',
    filePath: '20220722/881ef0f83ef347a18177ee26ccb33d1a.jpg'
  },
  {
    id: '3',
    name: '韩学刚',
    fileSize: '10.5KB',
    sex: '男',
    city: '浙江杭州',
    age: '20',
    fileName: 'fAenQ8nvRjL7x0i0jEfuDBZHvJfHf3v6.jpg',
    joinTime: '2022-02-09 09:45:21',
    filePath: '20220722/881ef0f83ef347a18177ee26ccb33d1a.jpg'
  },
  {
    id: '4',
    name: '张东方',
    fileSize: '12.3KB',
    sex: '男',
    city: '浙江杭州',
    age: '20',
    fileName: 'eleadmin20201020172822.jpg',
    joinTime: '2022-02-09 09:45:21',
    filePath: '20220722/881ef0f83ef347a18177ee26ccb33d1a.jpg'
  },
  {
    id: '5',
    name: '金士顿',
    fileSize: '17.4KB',
    sex: '男',
    city: '浙江杭州',
    age: '20',
    fileName: 'RZ8FQmZfHkcffMlTBCJllBFjEhEsObVo.jpg',
    joinTime: '2022-02-09 09:45:21',
    filePath: '20220722/881ef0f83ef347a18177ee26ccb33d1a.jpg'
  },
  {
    id: '6',
    name: '杨丽娟',
    fileSize: '2.0KB',
    sex: '男',
    city: '浙江杭州',
    age: '20',
    fileName: 'pro202012301.jpg',
    joinTime: '2022-02-09 09:45:21',
    filePath: '20220722/881ef0f83ef347a18177ee26ccb33d1a.jpg'
  },
  {
    id: '7',
    name: '沈恒',
    fileSize: '14.0KB',
    sex: '男',
    city: '浙江杭州',
    age: '18',
    fileName: 'CyrCNmTJfv7D6GFAg39bjT3eRkkRm5dI.jpg',
    joinTime: '2022-02-09 09:45:21',
    filePath: '20220722/881ef0f83ef347a18177ee26ccb33d1a.jpg'
  },
  {
    id: '8',
    name: '程雪生',
    fileSize: '3.7KB',
    sex: '男',
    city: '浙江杭州',
    age: '20',
    fileName: 'LrCTN2j94lo9N7wEql7cBr1Ux4rHMvmZ.jpg',
    joinTime: '2022-02-09 09:45:21',
    filePath: '20220722/881ef0f83ef347a18177ee26ccb33d1a.jpg'
  },
  {
    id: '9',
    name: '石黄平',
    fileSize: '820.3KB',
    sex: '男',
    city: '浙江杭州',
    age: '20',
    fileName: 'eleadmin20201020172822.jpg',
    joinTime: '2022-02-09 09:45:21',
    filePath: '20220722/881ef0f83ef347a18177ee26ccb33d1a.jpg'
  },
  {
    id: '10',
    name: '萍雨安',
    fileSize: '1.4M',
    sex: '男',
    city: '浙江杭州',
    age: '20',
    fileName: 'faa0202700ee455b90fe77d8bef98bc0.jpg',
    joinTime: '2022-02-09 09:45:21',
    filePath: '20220722/881ef0f83ef347a18177ee26ccb33d1a.jpg'
  }
])

const loadDataSource = (page: number, pageSize: number) => {
  var response = []
  var startIndex = (page - 1) * pageSize + 1
  var endIndex = page * pageSize
  for (var i = startIndex; i <= endIndex; i++) {
    response.push({
      id: `${i}`,
      age: '18',
      sex: '男',
      name: `张三${i}`,
      fileSize: '148.4KB',
      fileName: 'eleadmin.jpg',
      joinTime: '2022-02-09 09:45:21',
      city: '浙江杭州',
      filePath: '20220722/881ef0f83ef347a18177ee26ccb33d1a.jpg'
    })
  }
  return response
}
function toRemove() {
  if (selectedKeys.value.length == 0) {
    layer.msg('您未选择数据，请先选择要删除的数据', { icon: 3, time: 2000 })
    return
  }
  layer.confirm('您将删除所有选中的数据？', {
    title: '提示',
    btn: [
      {
        text: '确定',
        callback: (id: any) => {
          layer.msg('您已成功删除')
          layer.close(id)
        }
      },
      {
        text: '取消',
        callback: (id: any) => {
          layer.msg('您已取消操作')
          layer.close(id)
        }
      }
    ]
  })
}

function confirm() {
  layer.msg('您已成功删除')
}
function cancel() {
  layer.msg('您已取消操作')
}
const beforeUpload10 = (file: any) => {
  var isOver = false
  if (file.size > 1000) {
    isOver = true
    layer.msg(`file size over 1000 KB`, { icon: 2 })
  }
  return new Promise((resolver) => resolver(true))
}
</script>

<style scoped>
.file-box {
  width: calc(100vw - 220px);
  height: calc(100vh - 110px);
  margin-top: 10px;
  box-sizing: border-box;
  overflow: hidden;
}
.top-search {
  margin-top: 10px;
  padding: 10px;
  height: 40px;
  border-radius: 4px;
  background-color: #fff;
}
.table-box {
  margin-top: 10px;
  padding: 10px;
  height: 700px;
  width: 100%;
  border-radius: 4px;
  box-sizing: border-box;
  background-color: #fff;
}

.search-input {
  display: inline-block;
  width: 98%;
  margin-right: 10px;
}
.table-style {
  margin-top: 10px;
}
.isChecked {
  display: inline-block;
  background-color: #e8f1ff;
  color: red;
}
</style>