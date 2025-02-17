<template>
  <el-card class="box-card-style">
    <div slot="header" class="clearfix">
      <span class="box-card-title">{{ botSimpleInfo.name }}</span>
      <el-button
        size="mini"
        type="box-card-"
        icon="el-icon-plus"
        style="float: right; "
        circle
        @click="routeToBotConfig"
      />
    </div>

    <div class="clearfix">
      <pan-thumb
        class="box-card-image"
        width="75px"
        height="75px"
        :image="imageContent"
      />

      <div class="box-card-tag">
        <el-tag
          v-for="(value, jobName) in botSimpleInfo.jobParams"
          style="margin: 4px"
        >
          {{ jobName }}
        </el-tag>
      </div>
    </div>
    <div>
      <aside class="box-card-describe">
        {{ botSimpleInfo.describe + 'aknfdkjawndjanwkdnkjandjkaakmdwlkalkwmdklamdlkawmdlkjdnawk' }}
      </aside>
    </div>
  </el-card>
</template>

<script>

import PanThumb from '@/components/PanThumb/index.vue'
import { getAppPathImageBase64 } from '@/utils/image'

export default {
  name: 'BotSimpleCard',
  components: { PanThumb },
  props: {
    botSimpleInfo: {
      name: 'bot-name',
      describe: 'bot-describe',
      image: '',
      jobParams: {}
    }
  },

  data() {
    return {
      imageContent: ''
    }
  },
  created() {
    getAppPathImageBase64(this.botSimpleInfo.image).then(response => {
      this.imageContent = response
    })
  },
  methods: {
    routeToBotConfig() {
      this.$router.push({
        path: '/bot-config',
        query: {
          botInfo: this.botSimpleInfo
        }
      })
    }
  }
}
</script>

<style scoped>
.box-card-style {
  width: 380px;
  margin: 15px;
}

.box-card-image {
  float: left;
}

.box-card-tag {
  display: inline-block;
  height: 100px;
  width: calc(100% - 83px);
  float: right;
  border-left: #5a5e66;
  padding: 3px;

}

.box-card-describe{

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

  font-weight: bold;
  font-size: 21px;
}
</style>
