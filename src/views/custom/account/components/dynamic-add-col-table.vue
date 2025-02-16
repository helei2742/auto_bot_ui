<template>
  <div>
    <!--    头部搜索、添加、上传 bar-->
    <div class="filter-container clearfix">

      <el-dropdown
        plain
        split-button
        class="filter-item"
        style="margin-right: 5px"
        type="info"
        size="medium"
      >
        展示列
        <el-dropdown-menu slot="dropdown">
          <el-checkbox-group v-model="currentParams.selectedFilterHeader">
            <el-dropdown-item v-for="item in headers">
              <el-checkbox :label="item" disabled/>
            </el-dropdown-item>

            <el-dropdown-item v-for="item in currentParams.customHeaders">
              <el-checkbox :label="item"/>
            </el-dropdown-item>
          </el-checkbox-group>
        </el-dropdown-menu>
      </el-dropdown>


      <el-select
        size="medium"
        v-for="headerName in headers"
        v-model="currentParams.headerFilterFieldValues[headerName]"
        :placeholder="headerName"
        clearable
        style="width: 90px"
        class="filter-item"
        @clear="currentParams.headerFilterFieldValues[headerName] = undefined"
      >
        <el-option v-for="item in getFieldOptions(headerName)" :key="item" :label="item" :value="item"/>
      </el-select>

      <el-button
        size="medium"
        v-waves
        class="filter-item"
        style="margin-left: 10px"
        type="primary"
        icon="el-icon-search"
        @click="handleFilter"
      >
        Search
      </el-button>
      <el-button
        size="medium"
        v-if="useImportData"
        class="filter-item"
        style="margin-left: 10px;"
        type="primary"
        icon="el-icon-plus"
        @click="addBatchRowData"
      >
        Add
      </el-button>
      <el-button
        size="medium"
        v-if="useImportData"
        v-waves
        class="filter-item"
        type="success"
        icon="el-icon-upload"
        @click="handleUpload"
      >
        Upload
      </el-button>

      <el-switch
        v-model="useImportData"
        class="filter-item"
        style="float: right; top: 10px"
        active-text="导入"
        inactive-text="查看"
      />
    </div>

    <!--    表格-->
    <el-table
      :data="filteredTableData"
      border
      stripe
      fit
      highlight-current-row
      style="width: 100%;"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" fixed="left"/>

      <el-table-column
        v-if="currentParams.customHeaders.indexOf(idField) < 0"
        type="index"
        class-name="status-col"
        style="color: #2ac06d"
        min-width="75"
      />

      <el-table-column v-for="headName in fullHeaders" :label="headName" class-name="status-col" min-width="200">
        <template slot="header">
          {{ headName }}
          <el-badge
            v-if="headers.includes(headName)"
            class="header-badge"
            :value="''"
            :max="99"
            :is-dot="true"
          />
        </template>

        <template slot-scope="scope">
          <div v-if="!currentParams.editLineIndexMap[scope.$index]">{{ scope.row[headName] }}</div>
          <el-input
            v-else
            v-model="scope.row[headName]"
            size="mini"
            placeholder="请输入内容"
          />
        </template>
      </el-table-column>

      <el-table-column label="Status" class-name="status-col" width="75">
        <template slot-scope="{row}">
          <el-button
            v-if="buildRowStatus(row)"
            type="success"
            icon="el-icon-check"
            size="mini"
            circle
          />
          <el-button
            v-else
            type="warning"
            icon="el-icon-close"
            size="mini"
            circle
          />
        </template>
      </el-table-column>

      <el-table-column align="right" width="200" fixed="right">
        <template #header>
          <el-input
            v-model="newHeaderName"
            size="small"
            placeholder="输入新列名"
            style="display: inline-block;width: 60%"
          />
          <el-button type="primary" size="small" @click="addNewHeaderField">
            Add
          </el-button>
        </template>

        <template #default="scope">
          <el-button
            v-if="currentParams.editLineIndexMap[scope.$index]"
            size="small"
            type="success"
            :loading="currentParams.updatingLineIndexMap[scope.$index]"
            :disabled="currentParams.updatingLineIndexMap[scope.$index]"
            @click="confirmEditRow(scope.$index, scope.row)"
          >
            Confirm
          </el-button>
          <el-button
            v-else
            type="info"
            size="small"
            @click="handleEdit(scope.$index, scope.row)"
          >
            Edit
          </el-button>

          <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
          >
            Delete
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--      v-show="filteredTableData() !== null && filteredTableData().length >0"-->

    <!--分页条-->
    <pagination
      :total="currentParams.listQuery.total"
      :page.sync="currentParams.listQuery.page"
      :limit.sync="currentParams.listQuery.limit"
      @pagination="pageChangeHandler"
    />

    <!--    添加界面-->
    <dynamic-field-load-from
      :ref="fieldLoadFromRef"
      :field-names="headers"
      :visible="addRowDataFromVisible"
      @batch-data-import="batchDataImportHandler"
    />
  </div>
</template>

<script>
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination'
import DynamicFieldLoadFrom from '@/views/custom/account/components/dynamic-field-load-from'
import row from 'element-ui/packages/row'

export default {
  name: 'DynamicAddColTable',
  components: { Pagination, DynamicFieldLoadFrom },
  directives: { waves },
  filters: {},
  props: {
    title: {
      type: String,
      default() {
        return ''
      }
    },
    headers: {
      type: Array,
      default() {
        return []
      }
    },
    idField: {
      type: String,
      default() {
        return 'id'
      }
    },
    batchQueryDataNetwork: {
      type: Function,
      default() {
        return () => {
        }
      }
    },
    uploadDataNetwork: {
      type: Function,
      default() {
        return () => {
        }
      }
    },
    deleteDataNetwork: {
      type: Function,
      default() {
        return () => {
        }
      }
    },
    updateDataNetwork: {
      type: Function,
      default() {
        return () => {
        }
      }
    }
  },
  data() {
    return {
      importData: [],
      data: [],

      newHeaderName: '',
      useImportData: false,
      addRowDataFromVisible: false,

      typedParam: {
        import: {
          filteredTableDataIdxes: new Set(),
          headerFilterFieldValues: {},
          editLineIndexMap: {},
          editLineRowMap: {},
          updatingLineIndexMap: {},
          listQuery: {
            page: 1,
            limit: 20,
            total: 0
          },
          selectedDataList: [],
          customHeaders: [],
          selectedFilterHeader: []
        },
        display: {
          filteredTableDataIdxes: new Set(),
          headerFilterFieldValues: {},
          editLineIndexMap: {},
          editLineRowMap: {},
          updatingLineIndexMap: {},
          listQuery: {
            page: 1,
            limit: 20,
            total: 0
          },
          selectedDataList: [],
          customHeaders: [],
          selectedFilterHeader: []
        }
      }
    }
  },
  computed: {
    row() {
      return row
    },
    fullHeaders() {
      return this.headers.concat(this.currentParams.selectedFilterHeader)
    },
    fieldLoadFromRef() {
      return 'dynamicFieldLoadFrom[' + this.headers + ']'
    },
    currentParams() {
      return this.useImportData ? this.typedParam['import'] : this.typedParam['display']
    },
    currentData() {
      return this.useImportData ? this.importData : this.data
    },
    filteredTableData() {
      const curData = this.currentData

      const res = []
      for (let i = 0; i < curData.length; i++) {
        if (!this.currentParams.filteredTableDataIdxes.has(i)) {
          res.push(curData[i])
        }
      }

      return res
    }
  },
  created() {
    this.queryDisplayData()
  },
  methods: {
    handleDelete(idx, row) {
      if (this.useImportData) {
        this.importData.splice(idx, 1)
      } else {

        this.$confirm('是否删除该行数据?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

          const network =  this.deleteDataNetwork(row)
          if (network instanceof Promise) {
            network
              .then(response => {
                this.$message.success('删除成功')
                // this.currentData.splice(idx, 1)
                this.queryDisplayData()
              })
              .catch(e => {
                this.$message.error('删除失败, ' + e)
              })
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      }
    },
    handleEdit(idx, row) {
      this.$set(this.currentParams.editLineIndexMap, idx, true)
      this.$set(this.currentParams.editLineRowMap, idx, JSON.parse(JSON.stringify(row)))
    },
    handleSelectionChange(rows) {
      this.currentParams.selectedDataList = rows
    },
    handleFilter() {
      // 导入，前端筛选，
      this.currentParams.filteredTableDataIdxes.clear()

      const currentData = this.currentData
      for (let i = 0; i < currentData.length; i++) {
        const line = currentData[i]
        let flag = true
        for (const headName of this.fullHeaders) {
          const targetValue = this.currentParams.headerFilterFieldValues[headName]
          const currentValue = line[headName]

          if (targetValue !== undefined && targetValue !== currentValue) {
            flag = false
            break
          }
        }

        if (!flag) this.currentParams.filteredTableDataIdxes.add(i)
      }

      if (!this.useImportData) {
        // 展示，发送请求获取新数据
        this.queryDisplayData()
      }
    },
    handleUpload() {
      let uploadData = this.currentData
      if (this.currentParams.selectedDataList !== null && this.currentParams.selectedDataList.length > 0) {
        uploadData = this.currentParams.selectedDataList
      }
      const uploadDataNetwork = this.uploadDataNetwork(uploadData)
      if (uploadDataNetwork instanceof Promise) {
        uploadDataNetwork
          .then(response => {
            this.$message.success('上传成功')
          })
          .catch(e => {
            this.$message.error('上传失败, ' + e)
          })
      }

    },
    /**
     * 批量添加数据
     * @param payload
     */
    batchDataImportHandler(payload) {
      console.log(payload)
      const newDataArray = payload.filteredData
      const customFields = payload.customFields

      this.importData.push(...newDataArray)

      if (customFields !== undefined && customFields !== null && customFields.length > 0) {
        this.currentParams.customHeaders = [...new Set([...this.currentParams.customHeaders, ...customFields])]
      }
    },
    pageChangeHandler({ page, limit }) {
      this.currentParams.listQuery.page = page
      this.currentParams.listQuery.limit = limit

      if (!this.useImportData) {
        this.queryDisplayData()
      }
    },
    confirmEditRow(index, row) {
      this.$set(this.currentParams.updatingLineIndexMap, index, true)

      if (!this.useImportData) {
        const originRow = this.currentParams.editLineRowMap[index]

        let isRPC = false
        for (let key of Object.keys(row)) {
          if (originRow[key] !== row[key]) {
            isRPC = true
            break
          }
        }

        this.$set(this.currentParams.editLineRowMap, index, row)
        if (isRPC) {
          const network =  this.updateDataNetwork(row)
          if (network instanceof Promise) {
            network
              .then(response => {
                this.$message.success('上传成功')
              })
              .catch(e => {
                this.$message.error('上传失败, ' + e)
              })
              .finally(() => {
                this.$set(this.currentParams.editLineIndexMap, index, false)
                this.$set(this.currentParams.updatingLineIndexMap, index, false)
              })
          } else {
            this.$set(this.currentParams.editLineIndexMap, index, false)
            this.$set(this.currentParams.updatingLineIndexMap, index, false)
          }
        } else {
          this.$set(this.currentParams.editLineIndexMap, index, false)
          this.$set(this.currentParams.updatingLineIndexMap, index, false)
        }
      } else {
        this.$set(this.currentParams.editLineIndexMap, index, false)
        this.$set(this.currentParams.updatingLineIndexMap, index, false)
      }
    },
    addNewHeaderField() {
      if (this.newHeaderName === null ||
        this.newHeaderName === undefined ||
        this.newHeaderName === ''
      ) {
        return
      }

      if (this.currentParams.customHeaders.indexOf(this.newHeaderName) === -1 && this.headers.indexOf(this.newHeaderName) === -1) {
        this.currentParams.customHeaders.push(this.newHeaderName)
        this.currentParams.selectedFilterHeader.push(this.newHeaderName)
      }

      this.newHeaderName = ''
    },
    addBatchRowData() {
      this.$refs[this.fieldLoadFromRef].toggleVisible()
    },
    getFieldOptions(headerName) {
      const set = new Set()
      const currentData = this.currentData

      if (currentData === undefined || currentData === null) return {}

      for (const line of currentData) {
        const fieldValue = line[headerName]

        if (fieldValue !== undefined) {
          set.add(fieldValue == null ? 'null' : fieldValue)
        }
      }

      return set
    },
    buildRowStatus(row) {
      return this.headers.every(header => row[header] !== undefined &&
        row[header] !== null && row[header] !== '')
    },
    /**
     * 网络请求获取数据
     */
    queryDisplayData() {
      const display = this.typedParam.display

      this.batchQueryDataNetwork(display.listQuery, display.headerFilterFieldValues, pageInfo => {
        this.data = pageInfo.list

        for (let item of this.data) {
          for (let key of Object.keys(item)) {
            if (this.headers.indexOf(key) === -1 && this.currentParams.customHeaders.indexOf(key) === -1) {
              this.currentParams.customHeaders.push(key)
            }
          }
        }

        display.listQuery.total = pageInfo.total
      })
    }
  }
}
</script>
