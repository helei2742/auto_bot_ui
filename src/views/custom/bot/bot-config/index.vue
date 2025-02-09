<template>
  <div class="components-container">

    <el-row :span="24">
      <bot-info-card :bot-info="botInfo"/>
    </el-row>

    <el-row :span="24">
      <left-right-selector
        :selection-title="'未选择账号'"
        :selection-list-map="typedAccountListMap"
        :selected-title="'已选择账号'"
        :selected-list="bindAccountList"
        :item-print-handler="itemPrintHandler"
        @save-exchange="saveExchangeHandler"
      />
    </el-row>

  </div>
</template>

<script>
import BotInfoCard from '@/views/custom/bot/bot-config/components/bot-info-card.vue'
import DndList from '@/components/DndList/index.vue'
import LeftRightSelector from '@/views/custom/components/left-right-selector.vue'

export default {
  name: 'BotConfig',
  components: { LeftRightSelector, DndList, BotInfoCard },
  data() {
    return {
      botInfo: {
        id: null,
        name: 'test',
        describe: '123',
        image: '123213',

        beginTime: '2025-01-03 03:21:02',
        updateTime: '2025-02-03 03:21:02',
        tag: [
          'depin',
          'sol',
          'ai'
        ]
      },
      bindAccountList: [],
      typedAccountListMap: {
        google: [
          {
            id: 1,
            type: 'google',
            name: 'test1',
            password: '123',
            email: 'qwneij21@google.com',
            params: { k1: 'v1', k2: 'v2' }
          },
          {
            id: 2,
            type: 'google',
            name: 'test2',
            password: '123',
            email: 'qwneij22@google.com',
            params: { k1: 'v1', k2: 'v2' }
          },
          {
            id: 3,
            type: 'google',
            name: 'test3',
            password: '123',
            email: 'qwneij23@google.com',
            params: { k1: 'v1', k2: 'v2' }
          }
        ],
        xinglan: [
          {
            id: 4,
            type: 'xinglan',
            name: 'test4',
            password: '123',
            email: 'qwneij21@xinglan.com',
            params: { k1: 'v1', k2: 'v2' }
          }
        ]
      }
    }
  },
  created() {
    this.botInfo.id = this.$route.params.id
    document.title += this.botInfo.id
  },
  methods: {
    itemPrintHandler(accountInfo) {
      return accountInfo.id + ' [' + accountInfo.type + ']-[' + accountInfo.name + ']-' + accountInfo.email
    },
    saveExchangeHandler(updatedList){
      console.log(updatedList)
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
</style>
