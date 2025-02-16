<template>
  <div class="app-container">
    <DynamicAddColTable
      :headers="proxyInfoFields"
      :upload-data-network="uploadDataListNetwork"
      :batch-query-data-network="batchQueryProxyNetwork"
      :delete-data-network="deleteProxyNetwork"
      :update-data-network="updateProxyNetwork"
    />
  </div>
</template>

<script>
import DynamicAddColTable from '@/views/custom/account/components/dynamic-add-col-table.vue'
import { uploadProxyInfoList, pageQueryProxyInfo, deleteProxyInfo } from '@/api/custom/proxy-info'

export default {
  name: 'ProxyInfoManage',
  components: { DynamicAddColTable },
  filters: {},
  data() {
    return {
      proxyInfoFields: [
        'proxyProtocol', 'host', 'port'
      ]
    }
  },
  created() {

  },
  methods: {
    batchQueryProxyNetwork(query, fieldFilter, loadDataCall) {
      const payload = {
        page: query.page,
        limit: query.limit,
        fieldFilter: fieldFilter
      }

      pageQueryProxyInfo(payload).then(response => {
        const pageInfo = response.data

        for (const item of pageInfo.list) {
          if (item.params !== undefined && item.params !== null) {
            for (const key of Object.keys(item.params)) {
              item[key] = item.params[key]
            }

            delete item.params
          }
        }

        loadDataCall(pageInfo)
      })
    },
    uploadDataListNetwork(uploadAccountBaseInfoDataList) {
      return uploadProxyInfoList(uploadAccountBaseInfoDataList)
    },
    deleteProxyNetwork(proxyInfo) {
      if (proxyInfo.id === undefined || proxyInfo.id === null) {
        this.$message.error('删除需带有id')
      } else {
        return deleteProxyInfo([proxyInfo.id])
      }
    },
    updateProxyNetwork(proxyInfo) {
      return uploadProxyInfoList([proxyInfo])
    }
  }
}
</script>
