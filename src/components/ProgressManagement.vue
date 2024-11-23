<template>
  <div class="progress-management">
    <div class="progress-management-left">
      <el-progress type="dashboard" :width="180" :stroke-width="16" :indeterminate="true"
        :percentage="progressData.costProgress">
        <template #default="{ percentage }">
          <div class="progress-management-left-value">{{ progressData.costProgress }}%</div>
          <div class="progress-management-left-label">项目进度</div>
        </template>
      </el-progress>
      <div class="progress-management-duration">
        <li class="progress-management-duration-line">
          <span class="important">计划工期</span>
        </li>
        <li class="progress-management-duration-line">
          <span class="large">{{ progressData.plannedDuration }}</span>
          <span class="mini">天</span>
        </li>
        <div class="progress-management-duration-line">
          <li>
            <span>计划开工：</span>
            <span>{{ progressData.startTime }}</span>
          </li>
          <li>
            <span>计划完工：</span>
            <span>{{ progressData.endTime }}</span>
          </li>
        </div>
      </div>
    </div>
    <DividerLine></DividerLine>

    <div class="progress-management-right">
      <el-space direction="vertical" :size="20">
        <div class="progress-management-right-li">
          <div class="progress-management-right-title">开票进度：</div>
          <el-progress :stroke-width="12" :percentage="progressManageData.billingProgress" :duration="200" striped-flow
            striped />
        </div>
        <div class="progress-management-right-li">
          <div class="progress-management-right-title">回款进度：</div>
          <el-progress :stroke-width="12" :percentage="progressManageData.costProgress" :duration="200" striped-flow
            striped />
        </div>
        <div class="progress-management-right-li">
          <div class="progress-management-right-title">成本进度：</div>
          <el-progress :stroke-width="12" :percentage="progressManageData.paymentProgress" :duration="200" striped-flow
            striped />
        </div>
        <div class="progress-management-right-li">
          <div class="progress-management-right-title">付款进度：</div>
          <el-progress :stroke-width="12" :percentage="progressManageData.paymentSchedule" :duration="200" striped-flow
            striped />
        </div>
        <!-- <div class="progress-management-right-li">
        <div class="progress-management-right-title">分包成本：</div>
        <el-progress :stroke-width="12" :percentage="progressManageData.subcontractCost" :duration="200" striped-flow
          striped />
      </div>
      <div class="progress-management-right-li">
        <div class="progress-management-right-title">其他成本：</div>
        <el-progress :stroke-width="12" :percentage="progressManageData.otherCost" :duration="200" striped-flow
          striped />
      </div> -->
      </el-space>
    </div>
    <!-- </el-space> -->
  </div>
</template>
<script lang="ts" setup>
import { ElProgress } from 'element-plus'
import DividerLine from './divider/DividerLine.vue'
// import Spacer from './spacer/Spacer.vue'
import { defineComponent, onMounted, ref, reactive, computed, onUnmounted } from 'vue'
import { ElMessage } from 'element-plus'
import { post, get } from '../api/http'
import { projectProgressUrl, progressManageUrl } from '../api/url'
import { useAuthStore } from '@/store'
const percentage = ref(0);
const progressData = reactive<{ projectId: string, costProgress: number, plannedDuration: string, startTime: string, endTime: string }>({
  projectId: '',
  costProgress: 0,
  plannedDuration: '',
  startTime: '',
  endTime: ''
});
const progressManageData = reactive<{ billingProgress: number, costProgress: number, paymentProgress: number, paymentSchedule: number }>({
  billingProgress: 0,
  costProgress: 0,
  paymentProgress: 0,
  paymentSchedule: 0
})
let intervalId: ReturnType<typeof setInterval> | null = null;
const store = useAuthStore()
const token = store.getToken;
const projectItem = store.getProjectItem;


onMounted(() => {
  getProjectProgress(projectItem.id)
  getProgressManage(projectItem.id)
  intervalId = setInterval(() => {
    if (percentage.value < progressData.costProgress) {
      percentage.value = (percentage.value % 100) + 1
    } else {
      clearInterval(intervalId)
    }
  }, 10)
})

const getProjectProgress = (projectId: string) => {
  get({
    url: projectProgressUrl,
    headers: {
      Authorization: token
    },
    data: {
      projectId: projectId
    }
  }).then((res) => {
    Object.assign(progressData, res.data);
  }).catch((error) => {
    ElMessage.error('获取项目进度失败!')
    throw error
  })
}

const getProgressManage = (projectId: string) => {
  get({
    url: progressManageUrl,
    headers: {
      Authorization: token
    },
    data: {
      projectId: projectId
    }
  }).then((res) => {
    Object.assign(progressManageData, res.data);
  }).catch((error) => {
    ElMessage.error('获取项目信息失败!')
    throw error
  })
}

onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId)
  }
})
</script>
<style lang="scss">
.progress-management {
  width: 100%;
  display: flex;
  justify-content: space-between;

  .progress-management-left {
    flex: 1;
    display: flex;
    justify-content: space-around;

    .progress-management-left-value {
      margin-top: 20px;
      @include text-styles($h2-text);
      color: $primary-color;
    }

    .progress-management-left-label {
      margin-top: 20px;
      @include text-styles($desc-text);
      color: $primary-color;
    }
  }

  .progress-management-divider {
    width: 1px;
    height: 200px;
  }

  .progress-management-right {
    flex: 1;

    .progress-management-right-li {
      display: flex;
      align-items: center;

      .progress-management-right-title {
        text-align: left;
        width: 100px;
      }

      .el-progress {
        width: 740px;
      }
    }
  }

  .progress-management-duration {
    position: relative;

    .progress-management-duration-line {
      text-align: left;
      line-height: 40px;
      height: 40px;

      .large {
        @include text-styles($h1-text);
        color: #f78f2e;
      }

      .mini {
        @include text-styles($body-text);
        color: #f78f2e;
      }

      .important {
        @include text-styles($important-text);
      }
    }
  }
}
</style>
