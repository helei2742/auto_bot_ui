<template>
  <div>

    <!--    头部搜索、添加、上传 bar-->
    <div class="filter-container">
      <el-select
        v-for="headerName in fullHeaders"
        v-model="headerFilterFieldValues[headerName]"
        @clear="headerFilterFieldValues[headerName] = undefined"
        :placeholder="headerName"
        clearable
        style="width: 90px"
        class="filter-item"
      >
        <el-option v-for="item in getFieldOptions(headerName)" :key="item" :label="item" :value="item"/>
      </el-select>


      <el-button
        v-waves
        class="filter-item"
        style="margin-left: 10px"
        type="primary"
        icon="el-icon-search"
        @click="handleFilter"
      >
        Search
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit"
                 @click="addBatchRowData"
      >
        Add
      </el-button>
      <el-button v-waves class="filter-item" type="success" icon="el-icon-upload" @click="handleUpload">
        Upload
      </el-button>
    </div>

    <!--    表格-->
    <el-table
      :data="filteredTableData()"
      border
      stripe
      fit
      highlight-current-row
      style="width: 100%;"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"/>

      <el-table-column type="index" class-name="status-col" min-width="75">
      </el-table-column>

      <el-table-column v-for="headName in fullHeaders" :label="headName" class-name="status-col" min-width="100">
        <template slot="header">
          {{ headName }}
          <el-badge
            v-if="headers.includes(headName)"
            class="header-badge" :value="''" :max="99" :is-dot="true"
          />
        </template>

        <template slot-scope="{row}">
          <el-tag v-if="'email' === headName">{{ row[headName] }}</el-tag>
          <el-tag v-else-if="'type' === headName" type="success">
            {{ row[headName] }}
          </el-tag>
          <div v-else>{{ row[headName] }}</div>
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

      <el-table-column align="right" width="200">
        <template #header>
          <el-input v-model="newHeaderName" size="small" placeholder="输入新列名"
                    style="display: inline-block;width: 60%"
          />
          <el-button type="primary" size="small" @click="addNewHeaderField">
            Add
          </el-button>
        </template>

        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">
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

    <!--分页条-->
    <pagination v-show="data !== null && data.length >0"
                :total="data.length"
                :page.sync="listQuery.page"
                :limit.sync="listQuery.limit"
    />

    <!--    表格单行编辑弹框-->
    <el-dialog :title="'编辑第 ' + editRowIndex + '行数据'" :visible.sync="editRowFromVisible">

      <el-form ref="dataForm" :rules="rules" :model="editRowData" label-position="left"
               style="width: 400px; margin-left:50px;"
      >
        <el-form-item v-for="headName in fullHeaders" :label="headName" prop="headName">
          <el-input v-if="editRowData !== null" v-model="editRowData[headName]"/>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="editRowFromVisible = false">
          Cancel
        </el-button>
        <el-button type="primary" @click="confirmEditRow">
          Confirm
        </el-button>
      </div>
    </el-dialog>

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
import DynamicFieldLoadFrom from '@/views/custom/import/components/dynamic-field-load-from'

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
    customHeaders: {
      type: Array,
      default() {
        return []
      }
    },
    data: {
      type: Array,
      default() {
        return []
      }
    }

  },
  data() {
    return {
      newHeaderName: '',
      editRowIndex: null,
      editRowData: null,
      editRowFromVisible: false,
      addRowDataFromVisible: false,
      listQuery: {
        page: 1,
        limit: 20
      },
      headerFilterFieldValues: {},
      rules: {
        type: [{ required: true, message: 'type is required', trigger: 'change' }],
        timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        title: [{ required: true, message: 'title is required', trigger: 'blur' }]
      },
      filteredTableDataIdxes: new Set(),
      selectedDataList: []
    }
  },
  created() {
  },
  computed: {
    fullHeaders() {
      return this.headers.concat(this.customHeaders)
    },
    fieldLoadFromRef() {
      return 'dynamicFieldLoadFrom[' + this.headers + ']'
    }
  },
  methods: {
    handleDelete(idx, row) {
      this.data.splice(idx, 1)
    },
    handleEdit(idx, row) {
      this.editRowIndex = idx
      this.editRowData = JSON.parse(JSON.stringify(row))

      this.editRowFromVisible = true
    },
    handleSelectionChange(rows) {
      this.selectedDataList = rows
    },
    handleFilter() {
      this.filteredTableDataIdxes.clear()

      console.log(this.headerFilterFieldValues)
      for (let i = 0; i < this.data.length; i++) {
        let line = this.data[i]
        let flag = true
        for (let headName of this.fullHeaders) {
          let targetValue = this.headerFilterFieldValues[headName]
          let currentValue = line[headName]

          if (targetValue !== undefined && targetValue !== currentValue) {
            flag = false
            break
          }
        }

        if (!flag) this.filteredTableDataIdxes.add(i)
      }

      this.$forceUpdate()
      console.log(this.filteredTableDataIdxes)
    },
    addBatchRowData() {
      this.$refs[this.fieldLoadFromRef].toggleVisible()
    },
    handleUpload() {
      let emitData = this.data
      if (this.selectedDataList !== null && this.selectedDataList.length > 0) {
        emitData = this.selectedDataList
      }
      this.$emit('upload-data-list', emitData)
    },
    confirmEditRow() {
      this.$set(this.data, this.editRowIndex, this.editRowData)

      this.editRowIndex = null
      this.editRowData = null

      this.editRowFromVisible = false
    },
    addNewHeaderField() {
      if (this.newHeaderName === null
        || this.newHeaderName === undefined
        || this.newHeaderName === ''
      ) {
        return
      }

      this.customHeaders.push(this.newHeaderName)
      this.newHeaderName = ''
    },
    /**
     * 批量添加数据
     * @param payload
     */
    batchDataImportHandler(payload) {
      const newDataArray = payload.filteredData
      const customFields = payload.customFields

      this.data.push(...newDataArray)
      console.log(customFields)

      if (customFields !== undefined && customFields !== null && customFields.length > 0) {
        this.customHeaders = [...new Set([...this.customHeaders, ...customFields])]
      }
    },
    getFieldOptions(headerName) {
      let set = new Set()

      if (this.data === undefined || this.data === null) return {}

      for (let line of this.data) {
        let fieldValue = line[headerName]

        if (fieldValue !== undefined) {
          set.add(fieldValue == null ? 'null' : fieldValue)
        }
      }

      return set
    },
    filteredTableData() {
      let res = []
      for (let i = 0; i < this.data.length; i++) {
        if (!this.filteredTableDataIdxes.has(i)) {
          res.push(this.data[i])
        }
      }
      const startIndex = (this.listQuery.page - 1) * this.listQuery.limit
      const endIndex = startIndex + this.listQuery.limit
      return res.slice(startIndex, endIndex)
    },
    buildRowStatus(row) {
      return this.headers.every(header => row[header] !== undefined
        && row[header] !== null && row[header] !== '')
    }
  }
}
</script>
