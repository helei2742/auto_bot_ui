<template>
  <div class="bot-runtime-display-card">
    <div class="card-header clearfix">
      <div style="display:flex; float: left">
        <el-image class="head-image"/>
        <div style="font-weight: 700;font-size: 16px">
          {{ botInfo.name }}
        </div>
      </div>

      <div style="float: right">
        <i class="el-icon-setting icon-button"/>
      </div>
    </div>

    <div class="data-print-line">

    </div>

    <div class="card-detail">
      <div class="card-detail-content">

      </div>

        <el-button class="start-button" icon="el-icon-video-play" type="success" plain>
          Start Auto Bot
        </el-button>
    </div>
  </div>
</template>

<script>

export default {
  name: 'BotRuntimeDisplayCard',
  props: {
    botInfo: {
      type: Object,
      default() {
        return {
          name: 'TestName'
        }
      }
    }
  }
}
</script>

<style scoped>
.bot-runtime-display-card {
  width: 416px;
  height: 398px;
  background-color: #202735;
  padding: 24px;

  margin-left: 12px;

  color: #9da3ae;
  border-radius: 10px;
}

.card-header {
  height: 48px;
}

.data-print-line {
  height: 48px;
  margin-top: 16px;

}

.card-detail {
  height: 222px;
  margin-top: 16px;
}

.head-image {
  height: 48px;
  width: 48px;
  margin-right: 8px;
}

.icon-button {
  width: 24px;
  height: 24px;
  color: #9da3ae;
  font-size: 20px;

  cursor: pointer;
}
.icon-button:hover {
  transform: scale(1.2); /* 鼠标悬浮时放大 */
  color: #007BFF; /* 鼠标悬浮时改变颜色 */
}

.card-detail-content {
  height: 184px;
}
.start-button {
  width: 368px;
  height: 44px;

  font-size: 16px;
  font-weight: 500;
}
</style>
