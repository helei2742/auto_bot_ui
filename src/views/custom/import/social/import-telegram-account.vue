<template>
  <div class="app-container">
    <DynamicAddColTable
      :headers="telegramAccountFields"
      :data="telegramAccountList"
      @upload-data-list="uploadDataListHandler"
    />
  </div>
</template>

<script>
import DynamicAddColTable from '@/views/custom/import/components/dynamic-add-col-table.vue'

export default {
  name: 'ImportTelegramAccount',
  components: { DynamicAddColTable },
  filters: {},
  data() {
    return {
      telegramAccountFields: [
        'username', 'phone_prefix', 'phone'
      ],
      telegramAccountList: []
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
