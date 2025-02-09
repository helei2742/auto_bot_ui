<template>
  <div class="app-container">
    <DynamicAddColTable
      :headers="twitterAccountFields"
      :data="twitterAccountList"
      @upload-data-list="uploadDataListHandler"
    />
  </div>
</template>

<script>
import DynamicAddColTable from '@/views/custom/import/components/dynamic-add-col-table.vue'

export default {
  name: 'ImportTwitterAccount',
  components: { DynamicAddColTable },
  filters: {},
  data() {
    return {
      twitterAccountFields: [
        'username', 'password'
      ],
      twitterAccountList: [
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
