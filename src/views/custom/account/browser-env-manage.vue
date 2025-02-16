<template>
  <div class="app-container">
    <DynamicAddColTable
      :headers="browserEnvFields"
      :update-data-network="updateBrowserEnvNetwork"
      :delete-data-network="deleteBrowserEnvNetwork"
      :batch-query-data-network="batchBrowserEnvNetwork"
      :upload-data-network="uploadBrowserEnvNetwork"
    />
  </div>
</template>

<script>
import DynamicAddColTable from '@/views/custom/account/components/dynamic-add-col-table.vue'
import { pageQueryBrowserEnv, deleteBrowserEnv, uploadBrowserEnvList } from '@/api/custom/browser-env'

export default {
  name: 'BrowserEnvManage',
  components: { DynamicAddColTable },
  filters: {},
  data() {
    return {
      browserEnvFields: [
        'userAgent'
      ]
    }
  },
  created() {
  },
  methods: {
    batchBrowserEnvNetwork(query, fieldFilter, loadDataCall) {
      const payload = {
        page: query.page,
        limit: query.limit,
        fieldFilter: fieldFilter
      }

      pageQueryBrowserEnv(payload).then(response => {
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
    uploadBrowserEnvNetwork(uploadAccountBaseInfoDataList) {
      return uploadBrowserEnvList(uploadAccountBaseInfoDataList)
    },
    deleteBrowserEnvNetwork(browserEnv) {
      if (browserEnv.id === undefined || browserEnv.id === null) {
        this.$message.error('删除需带有id')
      } else {
        return deleteBrowserEnv([browserEnv.id])
      }
    },
    updateBrowserEnvNetwork(browserEnv) {
      return uploadBrowserEnvList([browserEnv])
    }
  }
}
</script>
