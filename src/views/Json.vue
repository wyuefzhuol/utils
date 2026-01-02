<template>
  <n-grid x-gap="12" :cols="24" item-responsive responsive="screen">
    <n-gi class="p-6 flex items-center" :span="inputVisible ? '12' : '1'">
      <div class="flex-1" v-if="inputVisible">
        <svg t="1679300417962" class="icon mb-4 cursor-pointer" @click="back" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2752" width="24" height="24">
          <path d="M675.328 117.717333A425.429333 425.429333 0 0 0 512 85.333333C276.352 85.333333 85.333333 276.352 85.333333 512s191.018667 426.666667 426.666667 426.666667 426.666667-191.018667 426.666667-426.666667c0-56.746667-11.093333-112-32.384-163.328a21.333333 21.333333 0 0 0-39.402667 16.341333A382.762667 382.762667 0 0 1 896 512c0 212.074667-171.925333 384-384 384S128 724.074667 128 512 299.925333 128 512 128c51.114667 0 100.8 9.984 146.986667 29.12a21.333333 21.333333 0 0 0 16.341333-39.402667z m-324.693333 373.013334l174.464-174.485334a21.141333 21.141333 0 0 0-0.192-29.973333 21.141333 21.141333 0 0 0-29.973334-0.192l-208.256 208.256a20.821333 20.821333 0 0 0-6.122666 14.976c0.042667 5.418667 2.133333 10.837333 6.314666 14.997333l211.178667 211.2a21.141333 21.141333 0 0 0 29.973333 0.213334 21.141333 21.141333 0 0 0-0.213333-29.973334l-172.629333-172.629333 374.997333 2.602667a20.693333 20.693333 0 0 0 21.034667-21.034667 21.482667 21.482667 0 0 0-21.333334-21.333333l-379.242666-2.624z" fill="#3D3D3D" p-id="2753"></path>
        </svg>
        <n-input
          v-model:value="value"
          type="textarea"
          placeholder="Please input JSON String"
          :rows="35"
          @change="inputChange"
          clearable
        />
      </div>
      <div class="p-6 flex items-center" style="width: 5rem">
        <svg t="1679300417962" class="icon mb-4 cursor-pointer" @click="showHideInput" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2752" width="24" height="24" :class="{'rotate-180': !inputVisible}">
          <path d="M675.328 117.717333A425.429333 425.429333 0 0 0 512 85.333333C276.352 85.333333 85.333333 276.352 85.333333 512s191.018667 426.666667 426.666667 426.666667 426.666667-191.018667 426.666667-426.666667c0-56.746667-11.093333-112-32.384-163.328a21.333333 21.333333 0 0 0-39.402667 16.341333A382.762667 382.762667 0 0 1 896 512c0 212.074667-171.925333 384-384 384S128 724.074667 128 512 299.925333 128 512 128c51.114667 0 100.8 9.984 146.986667 29.12a21.333333 21.333333 0 0 0 16.341333-39.402667z m-324.693333 373.013334l174.464-174.485334a21.141333 21.141333 0 0 0-0.192-29.973333 21.141333 21.141333 0 0 0-29.973334-0.192l-208.256 208.256a20.821333 20.821333 0 0 0-6.122666 14.976c0.042667 5.418667 2.133333 10.837333 6.314666 14.997333l211.178667 211.2a21.141333 21.141333 0 0 0 29.973333 0.213334 21.141333 21.141333 0 0 0-0.213333-29.973334l-172.629333-172.629333 374.997333 2.602667a20.693333 20.693333 0 0 0 21.034667-21.034667 21.482667 21.482667 0 0 0-21.333334-21.333333l-379.242666-2.624z" fill="#3D3D3D" p-id="2753"></path>
        </svg>
      </div>
    </n-gi>
    <n-gi class="p-6 h-screen overflow-y-auto" :span="inputVisible ? '12' : '23'">
      <n-space vertical>
        <n-space>
          <n-radio-group v-model:value="formatType" size="small">
            <n-radio-button value="TREE" label="树形模式"></n-radio-button>
            <n-radio-button value="TABLE" label="表格模式"></n-radio-button>
          </n-radio-group>
          <n-button
              v-if="formatType === 'TABLE' && jsonData instanceof Array && jsonData.length > 0 && jsonData[0] instanceof Object"
              type="primary"
              size="small"
              class="mb-2"
              @click="downloadCSV"
          >下载CSV</n-button>
        </n-space>
        <JsonViewer :value="jsonData" copyable boxed expanded theme="dark" v-if="formatType === 'TREE'" />
        <n-data-table
          v-else-if="jsonData instanceof Array && jsonData.length > 0 && jsonData[0] instanceof Object && formatType === 'TABLE'"
          size="small"
          :columns="Object.keys(jsonData[0]).map((item, index) => ({
            title: item,
            key: index,
            width: 100,
            render: (row) => {
              return row[item]
            },
            ellipsis: {
              tooltip: true
            },
            resizable: true,
            sorter: (row1, row2) => row1[item] - row2[item]
          }))"
          :data="jsonData"
          :pagination="{ pageSize: 15 }"
          :scroll-x="Object.keys(jsonData[0]).length * 100"
        />
        <n-empty size="large" description="不是数组类型" v-else />
      </n-space>
    </n-gi>
  </n-grid>
</template>

<script setup>
import { useMessage } from 'naive-ui'
import { useRouter } from 'vue-router'

const message = useMessage()
const router = useRouter()
let obj = {}
const value = ref('')
const formatType = ref('TREE')
const jsonData = ref(obj)
const inputVisible = ref(true)

const back = () => {
  router.push({path: '/'})
}

const showHideInput = () => {
  inputVisible.value = !inputVisible.value
}

const inputChange = () => {
  try {
    if (value.value) {
      jsonData.value = JSON.parse(value.value)
    } else {
      jsonData.value = {}
    }
  } catch (e) {
    jsonData.value = {}
    message.error('It`s not a valid JSON string!')
  }
};

const downloadCSV = () => {
  const keys = Object.keys(jsonData.value[0]);
  const csv = [
    keys.join(','), // header row first
    ...jsonData.value.map(row => keys.map(key => JSON.stringify(row[key], replacer)).join(','))
  ].join('\r\n');

  function replacer(key, value) {
    if (typeof value === 'string') {
      return value.replace(/"/g, '""'); // escape double quotes
    }
    return value;
  }

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.setAttribute('href', url);
  a.setAttribute('download', 'data.csv');
  a.click();
  URL.revokeObjectURL(url);
};
</script>

<style scoped>
.box {
  margin: 15px;
}
</style>
