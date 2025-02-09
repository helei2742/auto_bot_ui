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
      justify="space-around"
      style="margin-top:50px;flex-wrap: wrap;"
    >
      <el-col v-for="info in botSimpleInfoList"
              :span="5"
              style="padding: 0;margin: 10px"
      >
        <bot-simple-card
          :bot-simple-info="info"
        />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import PanThumb from '@/components/PanThumb'
import MdInput from '@/components/MDinput'
import DropdownMenu from '@/components/Share/DropdownMenu'
import waves from '@/directive/waves/index.js'
import BotSimpleCard from '@/views/custom/bot/bot-market/components/bot-simple-card.vue' // 水波纹指令

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
  data() {
    return {
      botSimpleInfoList: [
        {
          id: 1,
          name: 'test-bot-1',
          describe: 'bot detailnakjwndjkawndjknwajkdnakjwndjkawndjkawndjanwkjdnakjndjkawndjaw',
          image: 'https://wpimg.wallstcn.com/577965b9-bb9e-4e02-9f0c-095b41417191'
        },
        {
          id: 2,
          name: 'test-bot-2',
          describe: 'bot detail',
          image: 'https://wpimg.wallstcn.com/577965b9-bb9e-4e02-9f0c-095b41417191'
        },
        {
          id: 3,
          name: 'test-bot-3',
          describe: 'bot detail',
          image: 'https://wpimg.wallstcn.com/577965b9-bb9e-4e02-9f0c-095b41417191'
        },
        {
          id: 4,
          name: 'test-bot-4',
          describe: 'bot detail',
          image: 'https://wpimg.wallstcn.com/577965b9-bb9e-4e02-9f0c-095b41417191'
        },
        {
          id: 5,
          name: 'test-bot-5',
          describe: 'bot detail',
          image: 'https://wpimg.wallstcn.com/577965b9-bb9e-4e02-9f0c-095b41417191'
        },
        {
          id: 6,
          name: 'test-bot-6',
          describe: 'bot detail',
          image: 'https://wpimg.wallstcn.com/577965b9-bb9e-4e02-9f0c-095b41417191'
        },
        {
          id: 7,
          name: 'test-bot-7',
          describe: 'bot detail',
          image: 'https://wpimg.wallstcn.com/577965b9-bb9e-4e02-9f0c-095b41417191'
        },
        {
          id: 8,
          name: 'test-bot-8',
          describe: 'bot detail',
          image: 'https://wpimg.wallstcn.com/577965b9-bb9e-4e02-9f0c-095b41417191'
        }
      ]
    }
  }
}
</script>

<style scoped>

</style>
