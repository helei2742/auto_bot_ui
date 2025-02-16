<template>
  <el-dialog
    :close-on-click-modal="false"
    :visible.sync="isVisible"
    width="80%"
  >

    <div slot="title" class="components-container">
      <h3>请按照下方输入框中模板填入需导入的数据</h3>

      <el-switch
        v-model="isJsonType"
        style="display: block;float: right"
        active-color="#c59172"
        inactive-color="#13ce66"
        active-text="JSON格式"
        :active-value="true"
        inactive-text="Excel格式"
        :inactive-value="false"
      />
    </div>

    <div class="scrollbar-wrapper">
      <!--    json类型数据导入-->
      <div v-if="isJsonType" class="components-container">
        <aside>
          注意, 格式为一个JSON数组, 数组里的元素为每一条数据
          <br>
          需包含 {{ fieldNames }} 字段
        </aside>

        <div class="editor-container">
          <json-editor ref="jsonEditor" v-model="jsonValue" />
        </div>
      </div>
      <!--    excel类型数据导入-->
      <div v-else class="components-container">
        <aside>
          注意, excel文件的列
          <br>
          需包含 {{ fieldNames }} 字段
        </aside>

        <upload-excel-component :on-success="handleExcelUploadSuccess" :before-upload="beforeExcelUpload" />

        <el-table
          :data="excelValue"
          border
          show-header
          highlight-current-row
          height="600"
          :row-class-name="tableRowClassName"
          style="width: 100%;margin-top:20px;"
        >
          <el-table-column v-for="item of useHeader" :key="item" :prop="item" :label="item">
            <template slot="header">
              {{ item }}
              <el-badge
                v-if="fieldNames.includes(item)"
                class="header-badge"
                :value="''"
                :max="99"
                :is-dot="true"
              />
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

    <div slot="footer" class="dialog-footer">
      <el-button @click="isVisible = false">
        Cancel
      </el-button>
      <el-button type="primary" @click="addBatchData">
        Confirm
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import JsonEditor from '@/components/JsonEditor/index.vue'
import UploadExcelComponent from '@/components/UploadExcel/index.vue'

export default {
  name: 'DynamicFieldLoadFrom',
  components: { UploadExcelComponent, JsonEditor },
  props: {
    fieldNames: {
      type: Array,
      default() {
        return []
      }
    },
    fieldExamples: {
      type: Array,
      default() {
        return []
      }
    },
    visible: {
      type: Boolean,
      default() {
        return false
      }
    }
  },
  data() {
    return {
      jsonValue: [],
      excelValue: [],
      excelHeaders: [],
      isVisible: this.visible,
      isJsonType: false,
      customFields: []
    }
  },
  computed: {
    useHeader() {
      return this.excelHeaders.length === 0 ? this.fieldNames : this.excelHeaders
    }
  },
  created() {
    const template = {}

    this.fieldNames.forEach(name => {
      const fieldExample = this.fieldExamples[name]
      template[name] = fieldExample === undefined ? null : fieldExample
    })

    this.jsonValue.push(template)
  },
  methods: {
    toggleVisible() {
      // 修改 data 属性
      this.isVisible = !this.isVisible
    },
    /**
     * 点击upload按钮触发，会发送事件将数据发送给父组件
     */
    addBatchData() {
      if (this.isJsonType) {
        this.jsonTypeAddBatchData()
      } else {
        this.excelTypeAddBatchData()
      }
    },
    beforeExcelUpload(file) {
      const isLt1M = file.size / 1024 / 1024 < 50

      if (isLt1M) {
        return true
      }

      this.$message({
        message: 'Please do not upload files larger than 50m in size.',
        type: 'warning'
      })
      return false
    },
    handleExcelUploadSuccess({ results, header }) {
      // excel 的header含有需要的全部字段
      console.log(this.fieldNames, header)
      if (this.fieldNames.every(item => header.includes(item))) {
        // 展示
        this.excelValue = results
        this.excelHeaders = header
        this.customFields = header.filter(customField => !this.fieldNames.includes(customField))

        console.log(this.customFields)
      } else {
        this.$message({
          message: 'excel文件没有完全包含需要的字段',
          type: 'error'
        })
      }
    },
    jsonTypeAddBatchData() {
      let isEdit = true
      let errorMsg = ''

      if (this.jsonValue instanceof Array) {
        isEdit = false
        errorMsg = '你还未输入内容'
      }

      let jsonArray = null
      if (isEdit) {
        try {
          jsonArray = JSON.parse(this.jsonValue)

          if (jsonArray instanceof Array) {
            this.trySendImportEvent(this.filterBatchData(jsonArray))

            return
          } else {
            // 警告数据格式不对
            errorMsg = 'json 格式错误'
          }
        } catch (e) {
          errorMsg = '系统异常' + e.message
        }
      }

      this.$msgbox(
        '导入数据发生错误,' + errorMsg + ', 请检查输入内容再点击确定',
        '警告',
        {
          confirmButtonText: '确定',
          type: 'error'
        }
      )
    },

    excelTypeAddBatchData() {
      const filteredData = this.filterBatchData(this.excelValue)

      this.trySendImportEvent(filteredData)
    },

    filterBatchData(batchData) {
      const res = []

      // 逐条检查数据格式对不对
      for (const item of batchData) {
        if (this.checkDataItem(item)) {
          res.push(item)
        }
      }

      return res
    },

    checkDataItem(item) {
      let f = true

      for (const fieldName of this.fieldNames) {
        const itemElement = item[fieldName]
        if (itemElement === undefined || itemElement === null || itemElement === '') {
          f = false
          break
        }
      }
      return f
    },
    trySendImportEvent(filteredData) {
      if (filteredData.length === 0) {
        this.$msgbox(
          '导入数据发生错误, 没有任何合法数据, 请检查输入内容再点击确定',
          '警告',
          {
            confirmButtonText: '确定',
            type: 'error'
          }
        )
      } else {
        this.$emit('batch-data-import', { filteredData, customFields: this.customFields })
        this.isVisible = false
      }
    },

    tableRowClassName({ row, rowIndex }) {
      if (this.checkDataItem(row)) {
        return 'success-row'
      } else {
        return 'warning-row'
      }
    }
  }
}
</script>

<style>
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #ebf9eb;
}
</style>
