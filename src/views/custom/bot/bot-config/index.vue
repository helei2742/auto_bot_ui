<template>
  <div class="components-container">

    <el-row :span="24">
      <bot-info-card :bot-info="botInfo" />
    </el-row>

    <el-row :span="24">

      <el-col class="account-selector">

        <el-transfer
          v-model="test"
          style="text-align: left; display: inline-block"
          :titles="['未添加', '已添加']"
          :data="selectionList"
          filterable
        >
          <span slot-scope="{ option }">{{ option.key }} - {{ option.name }}-{{ option.email }}</span>

          <div slot="left-footer" style=" display: flex;justify-content: center;">
            <el-pagination
              layout="prev, pager, next"
              background
              :page-size="defaultLimit"
              :total="typedContext[currentType] !== undefined ? typedContext[currentType].total : 0"
              @current-change="pageChangeHandler"
            />
          </div>

          <div slot="right-footer">
            <el-select
              v-model="currentType"
              placeholder=""
              size="mini"
              style="display: block"
              @change="typeChangeHandler"
            >
              <el-option
                v-for="(value, key) in typedContext"
                :key="key"
                :label="key"
                :value="key"
              />
            </el-select>
          </div>
        </el-transfer>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import BotInfoCard from '@/views/custom/bot/bot-config/components/bot-info-card.vue'
import DndList from '@/components/DndList/index.vue'
import LeftRightSelector from '@/views/custom/components/left-right-selector.vue'
import { pageQueryAccountBaseInfo, queryAccountBaseInfoTypedInfo } from '@/api/custom/account-base-info'

export default {
  name: 'BotConfig',
  components: { LeftRightSelector, DndList, BotInfoCard },
  data() {
    return {
      test: [],
      botInfo: {},
      defaultLimit: 20,
      currentType: null,
      typedContext: {},
      selectionList: []
    }
  },
  computed: {
    currentPage() {
      const currentTypeContext = this.typedContext[this.currentType]

      if (currentTypeContext === undefined) return 1

      return currentTypeContext.page
    }
    /**
     * 可选择的列表
     * @returns {*}
     */
    // selectionList() {
    //   return (type, page) => {
    //     let currentTypeContext = this.typedContext[type]
    //
    //     console.log('selection list', type, page)
    //     if (currentTypeContext === undefined) return []
    //
    //     return currentTypeContext.pageDataMap[page]
    //   }
    // },
  },
  created() {
    // 获取路由参数
    this.botInfo = this.$route.query.botInfo
    document.title += this.botInfo.id

    // 获取账户分类信息
    queryAccountBaseInfoTypedInfo().then(response => {
      const typedInfo = response.data

      for (const info of typedInfo) {
        this.typedContext[info.key] = {
          page: 1,
          limit: this.defaultLimit,
          total: info.value,
          pageDataMap: {}
        }

        this.queryTypedABIPageData(1, this.defaultLimit, info.key)
      }
    })
  },
  methods: {
    /**
     * 查询account base info
     *
     * @param page
     * @param limit
     * @param type
     */
    queryTypedABIPageData(page, limit, type) {
      // 有缓存，不请求新的数据
      const pageDataMap = this.typedContext[type].pageDataMap
      if (
        pageDataMap !== undefined && pageDataMap !== null &&
        pageDataMap[page] !== undefined && pageDataMap[page] !== null
      ) {
        this.selectionList = pageDataMap[page]
        return
      }

      // 获取账户信息
      pageQueryAccountBaseInfo({
        page: page,
        limit: limit,
        filterMap: {
          type: type
        }
      }).then(response => {
        const pageInfo = response.data

        pageDataMap[page] = pageInfo.list
        this.selectionList = pageDataMap[page]
        this.currentType = type

        this.typedContext[type].page = page

        for (const ac of pageDataMap[page]) {
          ac.key = ac.id
        }
        this.typedContext[type].total = pageInfo.total
      })
    },

    pageChangeHandler(page) {
      this.queryTypedABIPageData(page, this.defaultLimit, this.currentType)
    },
    typeChangeHandler(type) {
      this.queryTypedABIPageData(this.currentPage, this.defaultLimit, type)
    }
  }
}
</script>

<style scoped>
.components-container {
  position: relative;
  min-height: 100px;
  background-color: #f0f2f5;
}

.account-selector >>> .el-transfer-panel {
  width:400px;
  border: 1px solid #e6ebf5;
  border-radius: 4px;
  overflow: hidden;
  background: #FFFFFF;
  display: inline-block;
  vertical-align: middle;
  max-height: 100%;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  position: relative;
}

.account-selector >>> .el-transfer-panel__body {
  height: calc(100% - 50px);
  min-height: 296px;
}

.account-selector >>> .el-transfer-panel__footer {
  margin: 10px auto 0;
  padding: 6px 5px;
}
</style>
