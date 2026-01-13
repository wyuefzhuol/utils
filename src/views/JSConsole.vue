<template>
  <n-grid x-gap="12" :cols="24" item-responsive responsive="screen">
    <n-gi class="p-6" span="8">
      <svg t="1679300417962" class="icon mb-4 cursor-pointer" @click="back" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2752" width="24" height="24">
        <path d="M675.328 117.717333A425.429333 425.429333 0 0 0 512 85.333333C276.352 85.333333 85.333333 276.352 85.333333 512s191.018667 426.666667 426.666667 426.666667 426.666667-191.018667 426.666667-426.666667c0-56.746667-11.093333-112-32.384-163.328a21.333333 21.333333 0 0 0-39.402667 16.341333A382.762667 382.762667 0 0 1 896 512c0 212.074667-171.925333 384-384 384S128 724.074667 128 512 299.925333 128 512 128c51.114667 0 100.8 9.984 146.986667 29.12a21.333333 21.333333 0 0 0 16.341333-39.402667z m-324.693333 373.013334l174.464-174.485334a21.141333 21.141333 0 0 0-0.192-29.973333 21.141333 21.141333 0 0 0-29.973334-0.192l-208.256 208.256a20.821333 20.821333 0 0 0-6.122666 14.976c0.042667 5.418667 2.133333 10.837333 6.314666 14.997333l211.178667 211.2a21.141333 21.141333 0 0 0 29.973333 0.213334 21.141333 21.141333 0 0 0-0.213333-29.973334l-172.629333-172.629333 374.997333 2.602667a20.693333 20.693333 0 0 0 21.034667-21.034667 21.482667 21.482667 0 0 0-21.333334-21.333333l-379.242666-2.624z" fill="#3D3D3D" p-id="2753"></path>
      </svg>
      <n-space vertical>
        <n-card title="预设工具" size="small">
          <ul>
            <li v-for="tool in presetTools" :key="tool.name" class="preset-tool-item">
              <b>{{ tool.name }}</b> <span class="text-gray-400">(变量名: {{ tool.varName }})</span>
            </li>
          </ul>
        </n-card>
        <n-card title="自定义变量" size="small">
          <n-space vertical>
            <n-input v-model:value="customVarName" placeholder="变量名" size="small" />
            <n-input v-model:value="customVarValue" type="textarea" :autosize="{ minRows: 20 }" placeholder="变量值 (JSON或字符串)" size="small" />
            <n-space>
              <n-button size="small" @click="clearCustomVar">清除</n-button>
              <n-button size="small" type="primary" @click="addCustomVar">录入</n-button>
            </n-space>
          </n-space>
        </n-card>
      </n-space>
    </n-gi>
    <n-gi class="p-6 h-screen overflow-y-auto" span="16">
      <n-space vertical>
        <n-space>
          <n-button size="small" @click="clearAllCustomVar">清除</n-button>
          <div>可使用cus.[key]在控制台中使用</div>
        </n-space>
        <JsonViewer :value="customVariables" boxed expanded />
      </n-space>
    </n-gi>
  </n-grid>
</template>

<script setup>
import { useMessage } from 'naive-ui'
import { useRouter } from 'vue-router'
import _ from 'lodash'
import moment from 'moment'
import {onMounted, onUnmounted, ref} from "vue";

const message = useMessage()
const router = useRouter()

const customVariables = ref({})

// 返回首页
const back = () => {
  router.push({path: '/'})
}

const presetTools = [
  { name: 'lodash', varName: '_', value: _ },
  { name: 'moment', varName: 'moment', value: moment }
]
function autowireTool(tool) {
  if (window[tool.varName]) {
    return;
  }
  window[tool.varName] = tool.value;
  console.log(`${tool.name}: ${tool.varName} 已注入到 window，可在开发者工具中直接访问`);
}

onMounted(() => {
  customVariables.value = {};
  presetTools.forEach(tool => autowireTool(tool));
  window.cus = customVariables.value;
});

onUnmounted(() => {
  customVariables.value = {};
  presetTools.forEach(tool => {
    if (window[tool.varName]) {
      delete window[tool.varName];
      console.log(`${tool.name}: ${tool.varName} 已从 window 中移除`);
    }
  });
  delete window.cus;
});

const customVarName = ref('');
const customVarValue = ref('');

function clearAllCustomVar() {
  customVariables.value = {};
}

function clearCustomVar() {
  customVarName.value = '';
  customVarValue.value = '';
}

function addCustomVar() {
  try {
    const parsedValue = JSON.parse(customVarValue.value);
    customVariables.value[customVarName.value] = parsedValue;
    message.success(`变量 ${customVarName.value} 添加成功`);
  } catch (e) {
    customVariables.value[customVarName.value] = customVarValue.value;
    message.success(`变量 ${customVarName.value} 添加成功`);
  }
  clearCustomVar();
}
</script>

<style scoped>

.icon {
  transition: transform 0.3s ease;
}
</style>
