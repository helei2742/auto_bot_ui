<template>
  <el-dialog :close-on-click-modal="false"
             :visible.sync="isVisible">

    <div class="components-container" slot="title">

      <h3>请按照下方输入框中模板填入需导入的数据</h3>

      <el-switch
        style="display: block;float: right"
        v-model="isJsonType"
        active-color="#13ce66"
        inactive-color="#ff4949"
        active-text="JSON格式"
        :active-value="true"
        inactive-text="Excel格式"
        :inactive-value="false">
      </el-switch>

    </div>

    <div v-if="isJsonType" class="components-container">
      <aside>
        注意, 格式为一个JSON数组, 数组里的元素为每一条数据
        <br/>
        需包含 {{ fieldNames }} 字段
      </aside>

      <div class="editor-container">
        <json-editor ref="jsonEditor" v-model="jsonValue"/>
      </div>
    </div>
    <div v-else class="components-container">
      <upload-excel-component :on-success="handleExcelUploadSuccess" :before-upload="beforeExcelUpload" />
      <el-table :data="excelValue" border highlight-current-row style="width: 100%;margin-top:20px;">
        <el-table-column v-for="item of []" :key="item" :prop="item" :label="item" />
      </el-table>
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
import JsonEditor from "@/components/JsonEditor/index.vue";
import ElMessageBox from "dropzone";
import UploadExcelComponent from "@/components/UploadExcel/index.vue";

export default {
  name: "DynamicFieldLoadFrom",
  components: {UploadExcelComponent, JsonEditor, ElMessageBox},
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
      isVisible: this.visible,
      isJsonType: true
    }
  },
  created() {
    let template = {}

    this.fieldNames.forEach(name => {
      let fieldExample = this.fieldExamples[name];
      template[name] = fieldExample === undefined ? null : fieldExample
    })

    this.jsonValue.push(template)
  },
  methods: {
    toggleVisible() {
      // 修改 data 属性
      this.isVisible = !this.isVisible;
    },
    addBatchData() {
      if (this.isJsonType) {
        this.jsonTypeAddBatchData()
      } else {

      }
    },
    beforeExcelUpload(file) {
      const isLt1M = file.size / 1024 / 1024 < 1
      console.log(file)
      if (isLt1M) {
        return true
      }

      this.$message({
        message: 'Please do not upload files larger than 1m in size.',
        type: 'warning'
      })
      return false
    },
    handleExcelUploadSuccess({ results, header }) {
      this.tableData = results
      this.tableHeader = header
    },
    jsonTypeAddBatchData() {
      let isError = false
      let errorMsg = ''

      if (this.jsonValue instanceof Array) {
        isError = true
        errorMsg = '你还未输入内容'
      }

      if (!isError) {
        try {
          let jsonArray = JSON.parse(this.jsonValue);

          if (jsonArray instanceof Array) {
            //逐条检查数据格式对不对
            for (let item of jsonArray) {
              if (isError) break

              for (let fieldName of this.fieldNames) {
                var itemElement = item[fieldName];

                if (itemElement === undefined) {
                  isError = true
                  errorMsg = '元素没有包含所有需要的字段 <' + fieldName + '>'
                }
              }
            }

            // 数据正确
          } else {
            // 警告数据格式不对
            errorMsg = 'json 格式错误'
            isError = true
          }

          if (!isError) {
            console.log('success', jsonArray)
            this.$emit('batch-data-import', jsonArray)
            this.isVisible = false
          }
        } catch (e) {
          errorMsg = '系统异常'
          isError = true
        }
      }

      if (isError) {
        // 弹框提示，
        this.$msgbox(
          '导入数据发生错误,' + errorMsg + ', 请检查输入内容再点击确定',
          '提示',
          {
            confirmButtonText: '确定',
            type: 'error'
          }
        )
      }
    }
  }
}
</script>

<style scoped lang="scss">

</style>
