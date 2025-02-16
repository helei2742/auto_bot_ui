<template>
  <div class="app-container">
    <DynamicAddColTable
      :headers="discordAccountFields"
      :batch-query-data-network="batchQueryDataNetwork"
      :upload-data-network="uploadDataListNetwork"
      :delete-data-network="deleteDataNetwork"
      :update-data-network="updateDataNetwork"
    />
  </div>
</template>

<script>
import DynamicAddColTable from '@/views/custom/account/components/dynamic-add-col-table.vue'
import {
  deleteDiscord,
  pageQueryDiscord,
  uploadDiscordList
} from '@/api/custom/discord'

export default {
  name: 'DiscordAccountManage',
  components: { DynamicAddColTable },
  filters: {},
  data() {
    return {
      discordAccountFields: [
        'username', 'password', 'bindEmail'
      ]
    }
  },
  created() {
  },
  methods: {
    batchQueryDataNetwork(query, filterMap, loadDataCall) {
      const payload = {
        page: query.page,
        limit: query.limit,
        filterMap: filterMap
      }
      pageQueryDiscord(payload)
        .then(response => {
          const pageInfo = response.data

          for (const abi of pageInfo.list) {
            if (abi.params !== undefined && abi.params !== null) {
              for (const key of Object.keys(abi.params)) {
                abi[key] = abi.params[key]
              }

              delete abi.params
            }
          }
          loadDataCall(pageInfo)
        })
    },
    uploadDataListNetwork(uploadAccountBaseInfoDataList) {
      return uploadDiscordList(uploadAccountBaseInfoDataList)
    },
    deleteDataNetwork(accountBaseInfo) {
      if (accountBaseInfo.id !== undefined && accountBaseInfo.id !== null) {
        return deleteDiscord([accountBaseInfo.id])
      } else {
        this.$message.error('参数错误, 删除时必须带有id')
      }
    },
    updateDataNetwork(accountBaseInfo) {
      return uploadDiscordList([accountBaseInfo])
    }
  }
}
</script>
