<template>
  <div class="bot-info-content clearfix">
    <el-card class="bot-info-card">
      <div slot="header" class="clearfix">
        <span>About bot</span>
      </div>

      <div class="bot-profile">
        <div class="box-center">
          <pan-thumb :image="botInfo.image" :height="'100px'" :width="'100px'" :hoverable="false" />
        </div>

        <div class="box-center">
          <div class="bot-name text-center">{{ botInfo.name }}</div>
          <div class="bot-role text-center text-muted">id: {{ botInfo.id }}</div>
        </div>
      </div>

      <div class="bot-bio">
        <div class="bot-education bot-bio-section">
          <div class="bot-bio-section-header">
            <i class="el-icon-collection-tag" />
            <el-tag v-for="tag in botInfo.tag" size="mini">{{ tag }}</el-tag>
          </div>
        </div>
      </div>
    </el-card>

    <div class="bot-describe">
      <h3>Bot介绍：</h3>
      <aside>
        {{ botInfo.describe }}
      </aside>

      <el-divider />

      <div class="bot-job-describe">
        <h3>功能列表:</h3>

        <el-collapse
          v-for="(param, jobName) in botInfo.jobParams"
          v-model="activeJobName"
          accordion
        >
          <el-collapse-item
            :name="jobName"
          >
            <template slot="title">
              <el-button
                :type="getJobTagType(param.jobType)"
                size="mini"
                style="margin-right: 8px"
                icon="el-icon-s-help"
                circle
              />
              {{ jobName }}
            </template>

            <div style="padding: 0 25px; width: 600px">

              <aside>{{ param.description }}</aside>

              <el-descriptions title="常规设置" :column="1" border>
                <el-descriptions-item label="名称">{{ jobName }}</el-descriptions-item>
                <el-descriptions-item label="类型">{{ param.jobType }}</el-descriptions-item>
                <el-descriptions-item label="并发数" :span="2">{{ param.concurrentCount }}</el-descriptions-item>
                <el-descriptions-item label="运行间隔">
                  <div v-if="param.intervalInSecond !== undefined && param.cronExpression !== ''">
                    {{ param.intervalInSecond }}(秒)
                  </div>
                  <el-tag v-else-if="param.cronExpression !== undefined && param.cronExpression !== ''">
                    {{ param.cronExpression }}
                  </el-tag>
                  <div v-else>
                    无运行间隔配置
                  </div>
                </el-descriptions-item>
                <el-descriptions-item label="功能介绍">{{ param.description }}</el-descriptions-item>
              </el-descriptions>

              <el-descriptions
                v-if="isWebSocketConfig(param) && param.autoBotJobWSParam !== undefined"
                title="Websocket设置"
                :column="2"
                border
              >
                <el-descriptions-item label="是否刷新ws连接">
                  {{ param.autoBotJobWSParam.isRefreshWSConnection }}
                </el-descriptions-item>
                <el-descriptions-item label="运行无限重连">
                  {{ param.autoBotJobWSParamwsUnlimitedRetry }}
                </el-descriptions-item>
                <el-descriptions-item label="重连次数限制">
                  {{ param.autoBotJobWSParam.reconnectLimit }}
                </el-descriptions-item>
                <el-descriptions-item label="重连次数自减时间间隔" :span="2">
                  {{ param.autoBotJobWSParam.reconnectCountDownSecond }}
                </el-descriptions-item>
                <el-descriptions-item label="websocket连接并发数" :span="2">
                  {{ param.autoBotJobWSParam.wsConnectCount }}
                </el-descriptions-item>
                <el-descriptions-item label="心跳间隔" :span="2">
                  {{ param.autoBotJobWSParamheartBeatIntervalSecond }}
                </el-descriptions-item>
              </el-descriptions>
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
    </div>
  </div>
</template>

<script>
import PanThumb from '@/components/PanThumb/index.vue'
import { Bot_JOB_TYPE } from '@/utils/system-enum'

export default {
  name: 'BotInfoCard',
  components: { PanThumb },
  props: {
    botInfo: {
      name: 'bot-name',
      describe: 'bot-describe',
      image: '',
      tag: [
        'depin',
        'sol',
        'ai'
      ],
      jobParams: {}
    }
  },
  data() {
    return {
      activeJobName: ''
    }
  },
  methods: {
    isWebSocketConfig(param) {
      return param.jobType === Bot_JOB_TYPE.WEB_SOCKET_CONNECT
    },
    getJobTagType(jobType) {
      if (
        jobType === Bot_JOB_TYPE.LOGIN ||
        jobType === Bot_JOB_TYPE.REGISTER ||
        jobType === Bot_JOB_TYPE.QUERY_REWARD) {
        return 'success'
      } else if (jobType === Bot_JOB_TYPE.TIMED_TASK) {
        return 'primary'
      } else if (jobType === Bot_JOB_TYPE.ONCE_TASK) {
        return 'info'
      } else if (jobType === Bot_JOB_TYPE.WEB_SOCKET_CONNECT) {
        return 'warning'
      }
      return 'danger'
    }
  }
}
</script>

<style scoped>
.bot-info-content {
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

.bot-describe {
  float: right;
  height: 350px;
  padding: 25px 20px;
  width: calc(100% - 303px);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15); /* 设置阴影效果 */
  border-radius: 5px;
  background-color: #fff;

  overflow-y: scroll;
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
