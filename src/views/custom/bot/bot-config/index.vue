<template>
  <div class="components-container">

    <el-row :span="24">
      <bot-info-card :bot-info="botInfo"/>
    </el-row>

    <el-row :span="24">

      <el-col class="account-selector">

        <div>
          <h3 style="padding: 0 15px">运行账户设置</h3>
          <div class="center">
            <el-input v-model="botKey" style="width: 430px;padding: 0" placeholder="请输入Bot名称"/>
          </div>
          <div class="center">
            <el-transfer
              v-model="selectedList"
              style="text-align: left; display: inline-block"
              :titles="['未添加', '已添加']"
              :data="selectionList"
              :format="{
            noChecked:  '',
            hasChecked: '${checked}/${total}'
          }"
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
          </div>

          <div class="center">
            <el-button type="success" @click="addBotHandler">
              确定
            </el-button>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import BotInfoCard from '@/views/custom/bot/bot-config/components/bot-info-card.vue'
import DndList from '@/components/DndList/index.vue'
import LeftRightSelector from '@/views/custom/components/left-right-selector.vue'
import { pageQueryAccountBaseInfo, queryAccountBaseInfoTypedInfo } from '@/api/custom/account-base-info'
import { createBot } from "@/api/custom/bot";
import Index from "@/views/dashboard/admin/components/TodoList/index.vue";

export default {
  name: 'BotConfig',
  components: { Index, LeftRightSelector, DndList, BotInfoCard },
  data() {
    return {
      botId: null,
      botKey: null,
      botInfo: {},
      defaultLimit: 20,
      currentType: null,
      typedContext: {},
      selectionList: [],

      selectedList: [],
      selectedQuery: {
        page: 1,
        limit: 50
      }
    }
  },
  computed: {
    currentPage() {
      const currentTypeContext = this.typedContext[this.currentType]

      if (currentTypeContext === undefined) return 1

      return currentTypeContext.page
    }
  },
  created() {
    // 获取路由参数
    this.botInfo = this.$route.query.botInfo
    this.botId = this.botInfo.id
    this.botKey = this.$route.query.botKey

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

    calPrintTotal(pageDataMap, start) {
      let printTotal = []
      for (let i = 1; i <= start; i++) {
        printTotal = printTotal.concat(pageDataMap[i])
      }

      return printTotal
    },
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

        this.selectionList = this.calPrintTotal(pageDataMap, page)

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
        this.selectionList = this.calPrintTotal(pageDataMap, page)
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
    },
    addBotHandler() {
      const botKey = this.botKey;
      if (botKey === undefined || botKey === null || botKey === '') {
        this.$message.warning("请输入bot名称")
        return
      }

      const botId = this.botId;
      if (botId === undefined || botId === null || botId === '') {
        this.$message.error("请关闭页面重新进入")
        return
      }

      this.$confirm('确定创建[' + botKey + ']吗', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        createBot({
          botId: botId,
          botKey: botKey,
          accountIds: this.selectedList
        }).then(response => {
          this.$message.success('创建Bot成功')
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消创建'
        })
      })
    }
  }
}
</script>

<style scoped>
.components-container {
  position: relative;
  min-height: 100px;
  background-color: #f0f2f5;
  padding: 10px;
}

.account-selector {
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15); /* 设置阴影效果 */
  border: 1px solid #e6ebf5;
  border-radius: 10px;
}

.account-selector >>> .el-transfer-panel {
  width: 400px;
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

.center {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}
</style>
