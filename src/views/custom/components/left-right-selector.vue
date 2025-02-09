<template>
  <div class="left-right-selector">
    <el-row :span="24">
      <!--      left-->
      <el-col :span="12" class="left-selector">
        <h3 class="clearfix">
          <span style="float: left;"> {{ selectionTitle }}</span>

          <el-button
            style="float: right"
            type="primary"
            plain
            size="mini"
            @click="selectAllData"
          >add all
          </el-button>
        </h3>

        <div>
          <el-select v-model="selectionType" placeholder="select type" size="mini">
            <el-option
              v-for="item in selectTypeList"
              :key="item"
              :label="item + '(' + selectionListMap[item].length + ')'"
              :value="item"
            >
            </el-option>
          </el-select>

          <el-input
            style="width: 150px"
            size="mini"
            placeholder="filter"
            v-model="selectionFilterContext"
          >
            <i slot="append" class="el-icon-search"/>
          </el-input>
        </div>

        <el-divider/>

        <draggable :list="selectionList" group="article" class="dragArea">
          <div v-for="element in selectionList" :key="element.id" class="list-complete-item">
            <div class="list-complete-item-handle2" @click="pushEle(element)">
              {{ itemPrintHandler(element) }}
            </div>
          </div>
        </draggable>
      </el-col>


      <!--      right-->
      <el-col :span="12" class="right-selector">
        <h3 class="clearfix">
          <el-button
            style="float: left"
            type="danger"
            plain
            size="mini"
            @click="removeAll"
          >
            remove all
          </el-button>

          <span style="float: right"> {{ selectedTitle }}</span>
        </h3>

        <div class="clearfix">
          <el-input
            style="width: 150px"
            size="mini"
            placeholder="filter"
            v-model="selectedFilterContext"
          >
            <i slot="append" class="el-icon-search"/>
          </el-input>

          <el-button
            style="float: right"
            type="success"
            plain
            size="mini"
            icon="el-icon-upload"
            @click="saveHandler"
          >
            保存
          </el-button>
        </div>

        <el-divider/>

        <draggable :set-data="setData"
                   :list="filteredSelectedList"
                   group="article"
                   class="dragArea"
        >
          <div v-for="element in filteredSelectedList" :key="element.id" class="list-complete-item">
            <div class="list-complete-item-handle">
              {{ itemPrintHandler(element) }}
            </div>

            <div style="position:absolute;right:0;">

            <span style="float: right ;margin-top: -16px;margin-right:5px;" @click="deleteEle(element)">
              <i style="color:#ff4949" class="el-icon-delete"/>
            </span>
            </div>
          </div>
        </draggable>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import BotInfoCard from '@/views/custom/bot/bot-config/components/bot-info-card.vue'
import DndList from '@/components/DndList/index.vue'

export default {
  name: 'LeftRightSelector',
  components: { DndList, BotInfoCard, draggable },
  props: {
    selectionTitle: {
      type: String,
      default() {
        return 'left-selection'
      }
    },
    selectionListMap: {
      type: Object,
      default() {
        return {}
      }
    },
    selectedTitle: {
      type: String,
      default() {
        return 'right-selected'
      }
    },
    selectedList: {
      type: Array,
      default() {
        return []
      }
    },
    itemPrintHandler: {
      type: Function,
      default() {
        return item => JSON.parse(item)
      }
    }
  },
  computed: {
    selectTypeList() {
      return Object.keys(this.selectionListMap)
    },
    selectionList() {
      return this.filterDataList(this.selectionListMap[this.selectionType], this.selectionFilterContext)
    },
    filteredSelectedList() {
      return  this.filterDataList(this.selectedList, this.selectedFilterContext)
    }
  },
  data() {
    return {
      selectionFilterContext: '',
      selectionType: '',

      selectedFilterContext: '',
      selectedType: ''
    }
  },
  created() {
    this.selectionType = this.selectTypeList[0]
  },
  methods: {
    deleteEle(ele) {
      for (const item of this.selectedList) {
        if (item.id === ele.id) {
          const index = this.selectedList.indexOf(item)
          this.selectedList.splice(index, 1)
          break
        }
      }
      if (this.isNotInSelection(ele)) {
        this.selectionListMap[this.selectionType].push(ele)
      }
    },
    pushEle(ele) {
      let selectionList = this.selectionListMap[this.selectionType]
      for (const item of selectionList) {
        if (item.id === ele.id) {
          const index = selectionList.indexOf(item)
          selectionList.splice(index, 1)
          break
        }
      }
      if (this.isNotInSelected(ele)) {
        this.selectedList.unshift(ele)
      }
    },
    isNotInSelection(v) {
      return this.selectionList.every(k => v.id !== k.id)
    },
    isNotInSelected(v) {
      return this.selectedList.every(k => v.id !== k.id)
    },

    filterDataList(dataList, filterContext) {
      return dataList
        .filter(item => {
          if (filterContext === null || filterContext === '') return true
          const keys = Object.keys(item)

          for (let key of keys) {
            const value = item[key]

            if (value !== undefined && value !== null
              && (value === filterContext || String(value).includes(filterContext))) {
              return true
            }
          }
          return false
        })
    },
    setData(dataTransfer) {
      // to avoid Firefox bug
      // Detail see : https://github.com/RubaXa/Sortable/issues/1012
      dataTransfer.setData('Text', '')
    },

    selectAllData() {
      let selectionList = this.selectionList.filter(i => i !== null)

      for (const item of selectionList) {
        this.pushEle(item)
      }
    },
    removeAll() {
      let filtered = this.filteredSelectedList.filter(i => i !== null)

      for (const item of filtered) {
        this.deleteEle(item)
      }
    },
    saveHandler() {
      this.$emit('save-exchange', this.selectedList)
    }
  }
}
</script>

<style scoped>

.left-right-selector {
  position: relative;
  min-height: 400px;
}

.left-selector {
  border: 1px dashed #60b3f7; /* 虚线边框 */
  border-radius: 10px; /* 圆角 */
  padding: 20px; /* 内边距 */
  min-height: 400px;
}

.right-selector {
  border: 1px dashed #60b3f7; /* 虚线边框 */
  border-radius: 10px; /* 圆角 */
  padding: 20px; /* 内边距 */
  min-height: 400px;
}

.list-complete-item {
  cursor: pointer;
  position: relative;
  font-size: 14px;
  padding: 5px 12px;
  margin-top: 4px;
  border: 1px solid #bfcbd9;
  transition: all 1s;
}

.list-complete-item-handle {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-right: 50px;
}

.list-complete-item-handle2 {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-right: 20px;
}

.list-complete-item.sortable-chosen {
  background: #4AB7BD;
}

.list-complete-item.sortable-ghost {
  background: #30B08F;
}

.list-complete-enter,
.list-complete-leave-active {
  opacity: 0;
}
</style>
