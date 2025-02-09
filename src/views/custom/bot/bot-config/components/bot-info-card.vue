<template>
  <div class="bot-info-content clearfix">
    <el-card class="bot-info-card">
      <div slot="header" class="clearfix">
        <span>About bot</span>
      </div>

      <div class="bot-profile">
        <div class="box-center">
          <pan-thumb :image="botInfo.image" :height="'100px'" :width="'100px'" :hoverable="false"/>
        </div>

        <div class="box-center">
          <div class="bot-name text-center">{{ botInfo.name }}</div>
          <div class="bot-role text-center text-muted">id: {{ botInfo.id }}</div>
        </div>
      </div>

      <div class="bot-bio">
        <div class="bot-education bot-bio-section">
          <div class="bot-bio-section-header">
            <i class="el-icon-collection-tag"/>
            <el-tag v-for="tag in botInfo.tag" size="mini">{{ tag }}</el-tag>
          </div>
        </div>
      </div>
    </el-card>

    <div class="bot-describe">
      {{botInfo.describe}}
    </div>
  </div>
</template>

<script>
import PanThumb from '@/components/PanThumb/index.vue'

export default {
  name: 'BotInfoCard',
  components: { PanThumb },
  props: {
    botInfo: {
      name: 'bot-name',
      describe: 'bot-describe',
      image: 'https://wpimg.wallstcn.com/577965b9-bb9e-4e02-9f0c-095b41417191',
      tag: [
        'depin',
        'sol',
        'ai'
      ]
    }
  },
  methods: {}
}
</script>

<style scoped>
.bot-info-content{
  height: 350px;
  margin-bottom: 8px;
  border-radius: 5px;
}

.bot-info-card {
  float: left;
  margin-bottom: 20px;
  height: 350px;
  width: 300px
}

.bot-describe{
  float: right;
  height: 350px;
  padding: 25px 20px;
  width: calc(100% - 303px);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);  /* 设置阴影效果 */
  border-radius: 5px;
  background-color: #fff;
}


.box-center {
  margin: 0 auto;
  display: table;
}

.text-muted {
  color: #777;
}

.bot-profile {
  .bot-name {
    font-weight: bold;
  }

  .box-center {
    padding-top: 10px;
  }

  .bot-role {
    padding-top: 10px;
    font-weight: 400;
    font-size: 14px;
  }
}

.bot-bio {
  margin-top: 20px;
  color: #606266;

  span {
    padding-left: 4px;
  }

  .bot-bio-section {
    font-size: 14px;
    padding: 15px 0;

    .bot-bio-section-header {
      border-top: 1px solid #dfe6ec;
      padding-top: 10px;
      margin-bottom: 10px;
      font-weight: bold;
    }
  }
}
</style>
