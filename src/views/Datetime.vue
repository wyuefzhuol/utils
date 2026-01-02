<template>
  <n-grid x-gap="12" :cols="24" item-responsive responsive="screen">
    <n-gi class="p-6" span="8">
      <svg t="1679300417962" class="icon mb-4 cursor-pointer" @click="back" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2752" width="24" height="24">
        <path d="M675.328 117.717333A425.429333 425.429333 0 0 0 512 85.333333C276.352 85.333333 85.333333 276.352 85.333333 512s191.018667 426.666667 426.666667 426.666667 426.666667-191.018667 426.666667-426.666667c0-56.746667-11.093333-112-32.384-163.328a21.333333 21.333333 0 0 0-39.402667 16.341333A382.762667 382.762667 0 0 1 896 512c0 212.074667-171.925333 384-384 384S128 724.074667 128 512 299.925333 128 512 128c51.114667 0 100.8 9.984 146.986667 29.12a21.333333 21.333333 0 0 0 16.341333-39.402667z m-324.693333 373.013334l174.464-174.485334a21.141333 21.141333 0 0 0-0.192-29.973333 21.141333 21.141333 0 0 0-29.973334-0.192l-208.256 208.256a20.821333 20.821333 0 0 0-6.122666 14.976c0.042667 5.418667 2.133333 10.837333 6.314666 14.997333l211.178667 211.2a21.141333 21.141333 0 0 0 29.973333 0.213334 21.141333 21.141333 0 0 0-0.213333-29.973334l-172.629333-172.629333 374.997333 2.602667a20.693333 20.693333 0 0 0 21.034667-21.034667 21.482667 21.482667 0 0 0-21.333334-21.333333l-379.242666-2.624z" fill="#3D3D3D" p-id="2753"></path>
      </svg>
      <n-space vertical>
        <n-card title="时间选项" size="small">
          <n-space vertical>
            <n-space>
              <n-button @click="useNow" size="small">当前时间</n-button>
              <n-button @click="useUtcNow" size="small">当前UTC时间</n-button>
            </n-space>
            <n-date-picker v-model:value="datetime" panel type="datetime" @change="onDatetimeChange" clearable />
          </n-space>
        </n-card>
      </n-space>
    </n-gi>
    <n-gi class="p-6 h-screen overflow-y-auto" span="16">
      <n-space vertical>
        <n-card title="时间戳转换器" size="small" class="mb-4">
          <n-space vertical>
            <n-input v-model:value="timeStampDatetime" type="text" placeholder="输入时间戳（毫秒）" @change="onTimestampInputChange" clearable />
          </n-space>
        </n-card>
        <n-card title="代码转换器" size="small">
          <n-space vertical>
            <ul>
              <li v-for="(codes, lang) in codeMap" :key="lang">
                <b>{{ lang }}:</b>
                <n-code v-for="(code, index) in codes" :key="index" :code="code" :language="lang.toLowerCase()" />
              </li>
            </ul>
          </n-space>
        </n-card>
      </n-space>
    </n-gi>
  </n-grid>
</template>

<script setup>
import { useMessage } from 'naive-ui'
import { useRouter } from 'vue-router'
import moment from 'moment'

const message = useMessage()
const router = useRouter()

const datetime = ref(null)
const timeStampDatetime = ref(null)

// 返回首页
const back = () => {
  router.push({path: '/'})
}

const useNow = () => {
  datetime.value = moment().valueOf()
}
const useUtcNow = () => {
  datetime.value = moment().subtract(moment().utcOffset(), 'm').valueOf()
}

const onDatetimeChange = (value) => {
  if (value) {
    timeStampDatetime.value = moment(value).valueOf().toString();
  } else {
    timeStampDatetime.value = '';
  }
}

// 时间戳输入框变化时的处理
const onTimestampInputChange = (value) => {
  const timestamp = parseInt(value, 10);
  if (!isNaN(timestamp)) {
    // 更新日期选择器的值
    datetime.value = timestamp;
  }
}

// 计算属性，生成各个语言的代码
const codeMap = computed(() => {
  const isEmpty = !datetime.value;
  const isValid = !isEmpty && !isNaN(Number(datetime.value));
  let dateStr = '';
  if (isValid) {
    dateStr = moment(Number(datetime.value)).format('YYYY-MM-DD HH:mm:ss');
  }
  return {
    Java: isEmpty ? [
      'new Date()',
      'LocalDateTime.now()',
      'Instant.now()',
      'UTC: LocalDateTime.now(ZoneId.of("UTC"))'
    ] : isValid ? [
      `new Date(\"${dateStr}\")`,
      `LocalDateTime.parse(\"${dateStr.replace(' ', 'T')}\")`
    ] : [],
    Python: isEmpty ? [
      'datetime.datetime.now()',
      'UTC: datetime.datetime.utcnow()'
    ] : isValid ? [
      `datetime.datetime.strptime(\"${dateStr}\", \"%Y-%m-%d %H:%M:%S\")`
    ] : [],
    Oracle: isEmpty ? [
      'SYSDATE',
      'SYSTIMESTAMP',
      'UTC: SYSDATE - 1/3'
    ] : isValid ? [
      `TO_DATE(\"${dateStr}\", 'YYYY-MM-DD HH24:MI:SS')`
    ] : [],
    MongoDB: isEmpty ? [
      'new Date()'
    ] : isValid ? [
      `ISODate(\"${moment(Number(datetime.value)).toISOString(true)}\")`
    ] : [],
    MySQL: isEmpty ? [
      'NOW()',
      'UTC: UTC_TIMESTAMP()'
    ] : isValid ? [
      `STR_TO_DATE(\"${dateStr}\", '%Y-%m-%d %H:%i:%s')`
    ] : [],
    JavaScript: isEmpty ? [
      'new Date()',
      'moment()',
      'UTC: moment().utc()'
    ] : isValid ? [
      `new Date(\"${dateStr.replace(' ', 'T')}\")`,
      `moment(\"${dateStr}\")`
    ] : []
  };
});
</script>

<style scoped>
</style>
