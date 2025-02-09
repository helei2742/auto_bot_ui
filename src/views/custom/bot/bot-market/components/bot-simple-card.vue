<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span class="box-card-title">{{ botSimpleInfo.name + 'lwndkwlndklnawkwdlwnlkdnlwndljwndwljndljwdw' }}</span>
      <el-button
        size="mini"
        type="box-card-"
        icon="el-icon-plus"
        style="float: right; "
        @click="routeToBotConfig"
        circle
      />
    </div>

    <div class="clearfix">
      <pan-thumb
        class="box-card-image"
        width="100px"
        height="100px"
        :image="botSimpleInfo.image"
      >
        vue-element-admin
      </pan-thumb>

      <div class="box-card-describe">
        {{ botSimpleInfo.describe }}
      </div>
    </div>
  </el-card>
</template>

<script>

import PanThumb from '@/components/PanThumb/index.vue'

export default {
  name: 'BotSimpleCard',
  components: { PanThumb },
  props: {
    botSimpleInfo: {
      name: 'bot-name',
      describe: 'bot-describe',
      image: 'https://wpimg.wallstcn.com/577965b9-bb9e-4e02-9f0c-095b41417191'
    }
  },
  methods: {
    routeToBotConfig() {
      this.$router.push({
        path: '/bot-config/' + this.botSimpleInfo.id
      })
    }
  }
}
</script>

<style scoped>
.box-card {
  width: 380px;
  max-width: 100%;
}

.box-card-image {
  float: left;
}

.box-card-describe {
  display: inline-block;
  height: 100px;
  width: calc(100% - 120px);
  float: right;
  border-left: #5a5e66;
  padding: 3px;

  font-size: 14px;
  color: #666;
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* 限制显示2行 */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.box-card-title {
  width: 70%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap; /* 如果需要多行省略可用下方样式替换 */
  margin: 8px 0;
  float: left;
}
</style>
