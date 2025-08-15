<template>
  <n-grid x-gap="12" :cols="24" item-responsive responsive="screen">
    <n-gi class="p-6" span="8">
      <svg t="1679300417962" class="icon mb-4 cursor-pointer" @click="back" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2752" width="24" height="24">
        <path d="M675.328 117.717333A425.429333 425.429333 0 0 0 512 85.333333C276.352 85.333333 85.333333 276.352 85.333333 512s191.018667 426.666667 426.666667 426.666667 426.666667-191.018667 426.666667-426.666667c0-56.746667-11.093333-112-32.384-163.328a21.333333 21.333333 0 0 0-39.402667 16.341333A382.762667 382.762667 0 0 1 896 512c0 212.074667-171.925333 384-384 384S128 724.074667 128 512 299.925333 128 512 128c51.114667 0 100.8 9.984 146.986667 29.12a21.333333 21.333333 0 0 0 16.341333-39.402667z m-324.693333 373.013334l174.464-174.485334a21.141333 21.141333 0 0 0-0.192-29.973333 21.141333 21.141333 0 0 0-29.973334-0.192l-208.256 208.256a20.821333 20.821333 0 0 0-6.122666 14.976c0.042667 5.418667 2.133333 10.837333 6.314666 14.997333l211.178667 211.2a21.141333 21.141333 0 0 0 29.973333 0.213334 21.141333 21.141333 0 0 0-0.213333-29.973334l-172.629333-172.629333 374.997333 2.602667a20.693333 20.693333 0 0 0 21.034667-21.034667 21.482667 21.482667 0 0 0-21.333334-21.333333l-379.242666-2.624z" fill="#3D3D3D" p-id="2753"></path>
      </svg>
      <n-space vertical>
        <n-card title="UUID 生成设置" size="small">
          <n-space vertical>
            <n-form-item label="版本类型">
              <n-radio-group v-model:value="uuidVersion" size="small">
                <n-radio-button value="v1" label="UUID v1"></n-radio-button>
                <n-radio-button value="v4" label="UUID v4"></n-radio-button>
              </n-radio-group>
            </n-form-item>
            <n-form-item label="生成数量">
              <n-input-number v-model:value="generateCount" :min="1" :max="50" placeholder="输入生成数量" />
            </n-form-item>
            <n-form-item label="格式设置">
              <n-checkbox-group v-model:value="formatOptions">
                <n-checkbox value="uppercase" label="大写字母"></n-checkbox>
                <n-checkbox value="removeDashes" label="移除连字符"></n-checkbox>
              </n-checkbox-group>
            </n-form-item>
            <n-button type="primary" @click="generateUUIDs" block ghost>生成 UUID</n-button>
            <n-button @click="clearAll" block>清空所有</n-button>
          </n-space>
        </n-card>
      </n-space>
    </n-gi>
    <n-gi class="p-6 h-screen overflow-y-auto" span="16">
      <n-space vertical>
        <div v-if="uuidList.length > 0">
          <n-card title="生成的 UUID 列表" size="small">
            <n-space vertical size="small">
              <div class="flex justify-between items-center mb-2">
                <n-text>共生成 {{ uuidList.length }} 个 UUID</n-text>
                <n-button size="small" @click="copyAllUUIDs">复制全部</n-button>
              </div>
              <div v-for="(uuid, index) in uuidList" :key="index" class="uuid-item">
                <n-input
                  :value="uuid"
                  readonly
                  size="small"
                  :class="{ 'highlighted-uuid': isHighlighted(uuid) }"
                >
                  <template #suffix>
                    <n-space size="small">
                      <n-button 
                        text 
                        @click="toggleHighlight(uuid)"
                        :type="isHighlighted(uuid) ? 'warning' : 'default'" class="flex items-center"
                      >
                        <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                          <path
                            d="M368.5 240H272v-96.5c0-8.8-7.2-16-16-16s-16 7.2-16 16V240h-96.5c-8.8 0-16 7.2-16 16 0 4.4 1.8 8.4 4.7 11.3 2.9 2.9 6.9 4.7 11.3 4.7H240v96.5c0 4.4 1.8 8.4 4.7 11.3 2.9 2.9 6.9 4.7 11.3 4.7 8.8 0 16-7.2 16-16V272h96.5c8.8 0 16-7.2 16-16s-7.2-16-16-16z"
                          />
                        </svg>
                      </n-button>
                      <n-button text @click="copyUUID(uuid)" class="flex items-center">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M16 1H4C2.9 1 2 1.9 2 3V17H4V3H16V1ZM19 5H8C6.9 5 6 5.9 6 7V21C6 22.1 6.9 23 8 23H19C20.1 23 21 22.1 21 21V7C21 5.9 20.1 5 19 5ZM19 21H8V7H19V21Z" fill="currentColor"/>
                        </svg>
                      </n-button>
                    </n-space>
                  </template>
                </n-input>
              </div>
            </n-space>
          </n-card>
        </div>
        <n-empty size="large" description="还没有生成UUID，请点击生成按钮" v-else />
      </n-space>
    </n-gi>
  </n-grid>
</template>

<script setup>
import { useMessage } from 'naive-ui'
import { useRouter } from 'vue-router'

const message = useMessage()
const router = useRouter()

// UUID 生成相关状态
const uuidVersion = ref('v4')
const generateCount = ref(1)
const formatOptions = ref([])
const uuidList = ref([])
const highlightedUUIDs = ref(new Set())
const displayMode = ref('LIST')
const inputVisible = ref(true)

// 生成 UUID v4
const generateUUIDv4 = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0
    const v = c === 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}

// 生成 UUID v1 (简化版本，基于时间戳)
const generateUUIDv1 = () => {
  const timestamp = Date.now()
  const timestampHex = timestamp.toString(16).padStart(12, '0')
  const randomPart = Math.random().toString(16).substr(2, 16).padEnd(16, '0')
  
  return `${timestampHex.substr(0, 8)}-${timestampHex.substr(8, 4)}-1${timestampHex.substr(12, 3)}-${randomPart.substr(0, 4)}-${randomPart.substr(4, 12)}`
}

// 格式化 UUID
const formatUUID = (uuid) => {
  let formatted = uuid
  
  if (formatOptions.value.includes('removeDashes')) {
    formatted = formatted.replace(/-/g, '')
  }
  
  if (formatOptions.value.includes('uppercase')) {
    formatted = formatted.toUpperCase()
  }
  
  return formatted
}

// 生成 UUID 列表
const generateUUIDs = () => {
  
  for (let i = 0; i < generateCount.value; i++) {
    let uuid = ''
    
    if (uuidVersion.value === 'v1') {
      uuid = generateUUIDv1()
    } else {
      uuid = generateUUIDv4()
    }
    
    uuid = formatUUID(uuid)
    if (uuidList.value.length >= 50) {
      message.warning(`已成功生成 ${i} 个 UUID，最多只允许生成 50 个 UUID`)
      return
    }
    uuidList.value.push(uuid)
  }

  message.success(`成功生成 ${generateCount.value} 个 UUID`)
}

// 复制单个 UUID
const copyUUID = async (uuid) => {
  try {
    await navigator.clipboard.writeText(uuid)
    message.success('UUID 已复制到剪贴板')
  } catch (err) {
    message.error('复制失败')
  }
}

// 复制所有 UUID
const copyAllUUIDs = async () => {
  try {
    const allUUIDs = uuidList.value.join('\n')
    await navigator.clipboard.writeText(allUUIDs)
    message.success(`已复制 ${uuidList.value.length} 个 UUID 到剪贴板`)
  } catch (err) {
    message.error('复制失败')
  }
}

// 清空所有 UUID
const clearAll = () => {
  uuidList.value = []
  highlightedUUIDs.value.clear()
  message.info('已清空所有 UUID')
}

// 切换UUID高亮状态
const toggleHighlight = (uuid) => {
  if (highlightedUUIDs.value.has(uuid)) {
    highlightedUUIDs.value.delete(uuid)
  } else {
    highlightedUUIDs.value.clear()
    highlightedUUIDs.value.add(uuid)
  }
}

// 检查UUID是否被高亮
const isHighlighted = (uuid) => {
  return highlightedUUIDs.value.has(uuid)
}

// 返回首页
const back = () => {
  router.push({path: '/'})
}

// 显示/隐藏输入面板
const showHideInput = () => {
  inputVisible.value = !inputVisible.value
}

// 表格列配置
const tableColumns = [
  {
    title: '序号',
    key: 'index',
    width: 80,
    render: (row, index) => index + 1
  },
  {
    title: 'UUID',
    key: 'uuid',
    ellipsis: {
      tooltip: true
    },
    render: (row) => row.uuid
  },
  {
    title: '版本',
    key: 'version',
    width: 100,
    render: (row) => row.version
  },
  {
    title: '操作',
    key: 'actions',
    width: 100,
    render: (row) => {
      return h('n-button', {
        size: 'small',
        onClick: () => copyUUID(row.uuid)
      }, '复制')
    }
  }
]

// 表格数据
const tableData = computed(() => {
  return uuidList.value.map(uuid => ({
    uuid,
    version: uuidVersion.value.toUpperCase()
  }))
})
</script>

<style scoped>
.box {
  margin: 15px;
}

.uuid-item {
  margin-bottom: 8px;
}

.icon {
  transition: transform 0.3s ease;
}

.rotate-180 {
  transform: rotate(180deg);
}

.highlighted-uuid {
  background: linear-gradient(135deg, #ffd700, #ffed4e);
  box-shadow: 0 0 10px rgba(245, 158, 11, 0.3);
  animation: glow 2s ease-in-out infinite alternate;
}

@keyframes glow {
  from {
    box-shadow: 0 0 10px rgba(245, 158, 11, 0.3);
  }
  to {
    box-shadow: 0 0 20px rgba(245, 158, 11, 0.6);
  }
}

.highlighted-uuid :deep(.n-input__input-el) {
  background: transparent;
  font-weight: bold;
  color: #92400e;
}
</style>
