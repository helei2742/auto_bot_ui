<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span class="box-card-title">{{ botSimpleInfo.name}}</span>
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
        width="75px"
        height="75px"
        :image="imageContent"
      >
      </pan-thumb>

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
      <aside class="box-card-describe" >
        {{ botSimpleInfo.describe + 'aknfdkjawndjanwkdnkjandjkaakmdwlkalkwmdklamdlkawmdlkjdnawk'}}
      </aside>
    </div>
  </el-card>
</template>

<script>

import PanThumb from '@/components/PanThumb/index.vue'
import {getAppPathImageBase64} from '@/utils/image'

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
  methods: {
    routeToBotConfig() {
      this.$router.push({
        path: '/bot-config/' + this.botSimpleInfo.id
      })
    }
  },
  created() {
    getAppPathImageBase64(this.botSimpleInfo.image).then(response=>{
      this.imageContent = response
    })
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
