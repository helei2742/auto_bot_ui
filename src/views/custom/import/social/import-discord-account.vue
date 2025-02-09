<template>
  <div class="app-container">
    <DynamicAddColTable
      :headers="discordAccountFields"
      :data="discordAccountList"
      @upload-data-list="uploadDataListHandler"
    />
  </div>
</template>

<script>
import DynamicAddColTable from '@/views/custom/import/components/dynamic-add-col-table.vue'

export default {
  name: 'ImportDiscordAccount',
  components: { DynamicAddColTable },
  filters: {},
  data() {
    return {
      discordAccountFields: [
        'username', 'password', 'bind_email'
      ],
      discordAccountList: [
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
