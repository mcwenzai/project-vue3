<template>
  <!-- <Layout> -->
  <HomeApps></HomeApps>
  <!-- </Layout> -->
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue'
import HomeApps from '@/components/apps/HomeApps.vue'
import { get } from '../api/http'
import { projectList } from '@/api/url'
import { useAuthStore } from '@/store'
import { useRouter } from 'vue-router'
const router = useRouter()
const store = useAuthStore();

type ProjectListDataType = any[];
const projectParams = ref<ProjectParamsType>({
  id: '1821451139875344384',
  name: 'sampleProject'
});

const authStore = useAuthStore()
const getToken = computed(() => authStore.getToken);
onMounted(() => {
  getProjectList(projectParams.value.id)
})


const getProjectList = (projectId: string) => {
  get({
    url: projectList,
    headers: {
      Authorization: getToken
    },
    data: {
      projectId: projectId
    }
  }).then((res: { data: any }) => {
    Object.assign(projectListData, res.data);
  }).catch((error: any) => {
    // ElMessage.error('获取项目信息失败!')
    throw error
  })
}
</script>

<style lang="scss" scoped>
.home-view {
  width: 100%;
  height: 100%;
}

.home-view-container {
  .el-aside {
    color: $primary-color;
    background: $primary-color;
  }

  .el-menu {
    border-right: none;
  }

  .el-main {
    padding: 0;
  }
}
</style>
