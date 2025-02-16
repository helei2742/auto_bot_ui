<template>
  <div class="app-container">
    <DynamicAddColTable
      :headers="accountBaseInfoFields"
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
  uploadAccountBaseInfoList,
  deleteAccountBaseInfo,
  pageQueryAccountBaseInfo
} from '@/api/custom/account-base-info'
import { id } from 'html-webpack-plugin/lib/chunksorter'

export default {
  name: 'AccountBaseInfoManage',
  components: { DynamicAddColTable },
  filters: {},
  data() {
    return {
      accountBaseInfoFields: [
        'type', 'name', 'email', 'password'
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
      pageQueryAccountBaseInfo(payload)
        .then(response => {
          let pageInfo = response.data

          for (let abi of pageInfo.list) {
            if (abi.params !== undefined && abi.params !== null) {
              for (let key of Object.keys(abi.params)) {
                abi[key] = abi.params[key]
              }

              delete abi.params
            }
          }
          loadDataCall(pageInfo)
        })
    },
    uploadDataListNetwork(uploadAccountBaseInfoDataList) {
      return uploadAccountBaseInfoList(uploadAccountBaseInfoDataList)
    },
    deleteDataNetwork(accountBaseInfo) {
      if (accountBaseInfo.id !== undefined && accountBaseInfo.id !== null) {
        return deleteAccountBaseInfo([accountBaseInfo.id])
      } else {
        this.$message.error('参数错误, 删除时必须带有id')
      }
    },
    updateDataNetwork(accountBaseInfo) {
      return uploadAccountBaseInfoList([accountBaseInfo])
    }
  }
}
</script>
