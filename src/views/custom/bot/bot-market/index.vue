<template>
  <div class="mixin-components-container">
    <el-row>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>Types</span>
        </div>
        <div style="margin-bottom:50px;">
          <el-col :span="4" class="text-center">
            <router-link class="pan-btn blue-btn" to="/documentation/index">
              Depin
            </router-link>
          </el-col>
          <el-col :span="4" class="text-center">
            <router-link class="pan-btn light-blue-btn" to="/icon/index">
              ETH
            </router-link>
          </el-col>
          <el-col :span="4" class="text-center">
            <router-link class="pan-btn pink-btn" to="/excel/export-excel">
              Ai
            </router-link>
          </el-col>
          <el-col :span="4" class="text-center">
            <router-link class="pan-btn green-btn" to="/table/complex-table">
              Daily
            </router-link>
          </el-col>
          <el-col :span="4" class="text-center">
            <router-link class="pan-btn tiffany-btn" to="/example/create">
              SOL
            </router-link>
          </el-col>
          <el-col :span="4" class="text-center">
            <router-link class="pan-btn yellow-btn" to="/theme/index">
              TESTNET
            </router-link>
          </el-col>
        </div>
      </el-card>
    </el-row>

    <el-row
      :gutter="20"
      type="flex"
      justify="center"
      style="margin-top:50px;flex-wrap: wrap;"
    >
      <el-col v-for="info in botInfoList"
              :span="9"
              style="padding: 0;margin: 10px"
      >
        <bot-simple-card
          :bot-simple-info="info"
        />
      </el-col>
    </el-row>

    <div class="block">
      <el-pagination
        layout="prev, pager, next"
        :total="listQuery.total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import PanThumb from '@/components/PanThumb'
import MdInput from '@/components/MDinput'
import DropdownMenu from '@/components/Share/DropdownMenu'
import waves from '@/directive/waves/index.js'
import BotSimpleCard from '@/views/custom/bot/bot-market/components/bot-simple-card.vue' // 水波纹指令
import {pageQueryBot} from '@/api/custom/bot'

export default {
  name: 'BotMarket',
  components: {
    BotSimpleCard,
    PanThumb,
    MdInput,
    DropdownMenu
  },
  directives: {
    waves
  },
  created() {

    pageQueryBot({
      page: this.listQuery.page,
      limit: this.listQuery.limit
    }).then(response=>{
      const pageInfo = response.data

      if (pageInfo != null) {
        this.listQuery.total = pageInfo.total
        this.botInfoList = pageInfo.list
      } else {
        this.$message.warning('查询bot list失败')
      }
    })
  },
  data() {
    return {
      listQuery: {
        page: 1,
        limit: 10,
        total: 0
      },
      botInfoList: [
        {
          id: 1,
          name: 'test-bot-1',
          describe: 'bot detailnakjwndjkawndjknwajkdnakjwndjkawndjkawndjanwkjdnakjndjkawndjaw',
          image: 'https://wpimg.wallstcn.com/577965b9-bb9e-4e02-9f0c-095b41417191'
        }
      ]
    }
  }
}
</script>

<style scoped>

</style>
