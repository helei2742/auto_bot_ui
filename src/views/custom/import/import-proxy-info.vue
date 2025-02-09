<template>
  <div class="app-container">
    <DynamicAddColTable
      :headers="proxyInfoFields"
      :data="proxyInfoList"
      @upload-data-list="uploadDataListHandler"
    />
  </div>
</template>

<script>
import DynamicAddColTable from '@/views/custom/import/components/dynamic-add-col-table.vue'

export default {
  name: 'ImportProxyInfo',
  components: { DynamicAddColTable },
  filters: {},
  data() {
    return {
      proxyInfoFields: [
        'proxy_protocol', 'host', 'port'
      ],
      proxyInfoList: [
        { id: 1, proxy_protocol: 'http', host: 'test1', port: 'test1231awnkj3@qq.com', username:'helei',password: '12321312312' },
        { id: 2, proxy_protocol: 'http', host: 'test1', port: 'test1231awnkj3@qq.com', username:'helei',password: '12321312312' },
        { id: 3, proxy_protocol: 'http', host: 'test1', port: 'test1231awnkj3@qq.com', username:'helei',password: '12321312312' },
        { id: 4, proxy_protocol: 'http', host: 'test1', port: 'test1231awnkj3@qq.com', username:'helei',password: '12321312312' },
        { id: 5, proxy_protocol: 'http', host: 'test1', port: 'test1231awnkj3@qq.com', username:'helei',password: '12321312312' },
        { id: 6, proxy_protocol: 'http', host: 'test1', port: 'test1231awnkj3@qq.com', username:'helei',password: '12321312312' },
      ]
    }
  },
  created() {
  },
  methods: {
    uploadDataListHandler(uploadAccountBaseInfoDataList) {
      console.log(uploadAccountBaseInfoDataList)
      this.$message('保存代理信息...' + uploadAccountBaseInfoDataList)
    }
  }
}
</script>
