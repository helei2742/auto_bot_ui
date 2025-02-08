<template>
  <div class="app-container">
    <DynamicAddColTable
      :headers="accountBaseInfoFields"
      :data="accountBaseInfoList"
      @upload-data-list="uploadDataListHandler"
    />
  </div>
</template>

<script>
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import DynamicAddColTable from "@/views/custom/import/components/dynamic-add-col-table.vue";

export default {
  name: 'ImportAccountBaseInfo',
  components: {DynamicAddColTable, Pagination},
  directives: {waves},
  filters: {},
  data() {
    return {
      accountBaseInfoFields: [
        'type', 'username', 'email', 'password'
      ],
      accountBaseInfoList: [
        {id: 1, type: 'google', username: 'test1', email: 'test1231awnkj3@qq.com', password: '12321312312'},
        {id: 2, type: 'google', username: 'test0', email: 'test12wanjd123@qq.com', password: '12321312312'},
        {id: 3, type: 'google', username: 'test2', email: 'test123asjd@qq.com', password: '12321312312'},
        {id: 4, type: 'google', username: 'test3', email: 'test1awdwa123@qq.com', password: '12321312312'},
        {type: 'google', username: 'test4', email: 'test123wad123@qq.com', password: '12321312312'},
        {type: 'google', username: 'test5', email: 'test123123awdwa@qq.com', password: '12321312312'}
      ]
    }
  },
  created() {
  },
  methods: {
    uploadDataListHandler(uploadAccountBaseInfoDataList) {
      console.log(uploadAccountBaseInfoDataList)
      this.$message('保存账户基本信息...' + uploadAccountBaseInfoDataList)
    }
  }
}
</script>
