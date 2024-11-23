<template>
  <el-header>
    <HeaderIndex></HeaderIndex>
  </el-header>
  <div class="dashboard">
    <el-tabs v-model="activeName" class="tabs" @tab-click="handleClick">
      <el-tab-pane label="项目看板" name="project">
        <project-options @click="goTOBoard" :list="projectListData" />
      </el-tab-pane>
      <el-tab-pane label="公司看板" name="company">
        <company-options v-if="showCompanyOptions" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import type { TabsPaneContext } from 'element-plus'
import { get } from '@/api/http';
import { projectListUrl } from '@/api/url'
import { useAuthStore } from '@/store'
const store = useAuthStore()
const authStore = useAuthStore()
const getToken = computed(() => authStore.getToken);

const router = useRouter()
type ProjectParamsType = {
  id: string;
  name: string;
};

type ProjectListDataType = any[];

// const projectParams = ref<ProjectParamsType>({
//   id: '1821451139875344384',
//   name: 'sampleProject'
// });

const activeName = ref<string>('project');
const showCompanyOptions = ref<boolean>(false);
const projectListData = ref<ProjectListDataType>([]);

onMounted(() => {
  getProjectList()
})

const getProjectList = (projectId: string) => {
  get({
    url: projectListUrl,
    headers: {
      Authorization: getToken
    },
    data: {
      projectId: projectId
    }
  }).then((res: { data: any }) => {
    Object.assign(projectListData.value, res.data);
  }).catch((error: any) => {
    // ElMessage.error('获取项目信息失败!')
    throw error
  })
}

const goTOBoard = (item: any) => {
  const itemString = JSON.stringify(item);
  store.setProjectItem(item);
  router.push({
    name: 'BoardData',
    params: { projectItem: itemString },
    query: { id: item.id }
  })
}

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab.paneName)
  if (tab.paneName === 'company') {
    showCompanyOptions.value = true
  } else {
    showCompanyOptions.value = false
  }
}
</script>
<style lang="scss">
.dashboard {
  // width: 100%;
  height: auto;
  // @each $property, $value in $card-bg {
  //   #{$property}: #{$value};
  // }
  margin: 0 40px;
  padding: 16px 24px;

  .el-tabs__header {
    margin: 0;
  }

  .el-tabs__item {
    @include text-styles($h2-text);
  }
}
</style>
