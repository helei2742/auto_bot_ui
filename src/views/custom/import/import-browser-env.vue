<template>
  <div class="app-container">
    <DynamicAddColTable
      :headers="browserEnvFields"
      :data="browserEnvList"
      @upload-data-list="uploadDataListHandler"
    />
  </div>
</template>

<script>
import DynamicAddColTable from '@/views/custom/import/components/dynamic-add-col-table.vue'

export default {
  name: 'ImportBrowserEnv',
  components: { DynamicAddColTable },
  filters: {},
  data() {
    return {
      browserEnvFields: [
        'user_agent'
      ],
      browserEnvList: [
      ]
    }
  },
  created() {
  },
  methods: {
    uploadDataListHandler(uploadAccountBaseInfoDataList) {
      console.log(uploadAccountBaseInfoDataList)
      this.$message('保存浏览器环境信息...' + uploadAccountBaseInfoDataList)
    }
  }
}
</script>
