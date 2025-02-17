<template>

  <!--  <div class="bot-account-config">-->
  <!--    <el-transfer-->
  <!--      style="text-align: left; display: inline-block"-->
  <!--      v-model=""-->
  <!--      filterable-->
  <!--      :left-default-checked="[2, 3]"-->
  <!--      :right-default-checked="[1]"-->
  <!--      :titles="['Source', 'Target']"-->
  <!--      :button-texts="['到左边', '到右边']"-->
  <!--      :render-content="renderPrintLineStr"-->
  <!--      :format="{-->
  <!--        noChecked: '${total}',-->
  <!--        hasChecked: '${checked}/${total}'-->
  <!--      }"-->
  <!--      :data="accountBaseInfoList">-->
  <!--      <el-button class="transfer-footer" slot="left-footer" size="small">操作</el-button>-->
  <!--      <el-button class="transfer-footer" slot="right-footer" size="small">操作</el-button>-->
  <!--    </el-transfer>-->
  <!--  </div>-->
</template>

<script>

export default {
  name: 'BotAccountConfig'
  // props: {
  //   accountBaseInfoList: []
  // },
  // methods: {
  //   renderPrintLineStr(h, accountInfo) {
  //     return accountInfo.id + ' [' + accountInfo.type + ']-[' + accountInfo.name + ']-' + accountInfo.email
  //   }
  // }
}
</script>

<style scoped>
.bot-account-config {

}
</style>
