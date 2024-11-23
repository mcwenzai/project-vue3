<template>
  <div class="board">
    <div class="board-header">
      <div class="board-header-title">
        <div class="board-header-name">
          <el-icon @click="backToDashboard">
            <ArrowLeftBold />
          </el-icon>
          <span>工程项目管理</span>
        </div>
        <div class="board-header-status">在建</div>
      </div>
      <div class="board-header-desc">
        <div class="board-header-desc-left">
          <div>项目负责人</div>
          <div>{{ projectParams.leaderUserName }}</div>
        </div>
        <div class="board-header-desc-center">
          <div>工期（天）</div>
          <div>{{ projectParams.plannedDuration }}</div>
        </div>
        <el-progress type="circle" :width="60" :percentage="projectParams.projectProgress">
          <template #default="{ percentage }">
            <div class="percentage-label">进度</div>
            <div class="percentage-value">{{ percentage }}%</div>
          </template>
        </el-progress>
      </div>
    </div>
    <div class="board-box">
      <el-tabs v-model="activeName" class="board-box-tabs" @tab-click="ClickName">
        <el-tab-pane :label="`${item.projectName}`" :name="item.name" v-for="item in boardHeaderData" :key="item.id">
        </el-tab-pane>
      </el-tabs>
      <div class="board-box-title">
        <div class="board-box-left">
          <span class="board-box-title-light"></span>
          <span class="board-box-title-deep"></span>
        </div>
        <div class="board-box-center">{{ activeName }}</div>
        <div class="board-box-right">
          <span class="board-box-title-deep"></span>
          <span class="board-box-title-light"></span>
        </div>
      </div>
    </div>
    <div class="board-content">
      <ProgressManagement :projectId="projectId" v-if="activeName === '进度管理'"></ProgressManagement>
      <CostControl :projectId="projectId" v-if="activeName === '成本管理'"></CostControl>
      <CollectionManagement :projectId="projectId" v-if="activeName === '回款管理'"></CollectionManagement>
      <PaymentManagement :projectId="projectId" v-if="activeName === '付款管理'"></PaymentManagement>
      <PurchasingManagement :projectId="projectId" v-if="activeName === '采购管理'"></PurchasingManagement>
      <TaxationManagement :projectId="projectId" v-if="activeName === '税费管理'"></TaxationManagement>
      <ProfitManagement :projectId="projectId" v-if="activeName === '利润管理'"></ProfitManagement>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import ProgressManagement from '@/components/ProgressManagement.vue'
import CostControl from '@/components/CostControl.vue'
import CollectionManagement from '@/components/CollectionManagement.vue'
import PaymentManagement from '@/components/PaymentManagement.vue'
import PurchasingManagement from '@/components/PurchasingManagement.vue'
import TaxationManagement from '@/components/TaxationManagement.vue'
import ProfitManagement from '@/components/ProfitManagement.vue'
const router = useRouter()
const route = useRoute();
const boardHeaderData = ref([
  {
    id: 1,
    name: '进度管理',
    projectId: 101,
    projectName: '进度管理'
  },
  {
    id: 2,
    name: '成本管理',
    projectId: 102,
    projectName: '成本管理'
  },
  {
    id: 3,
    name: '回款管理',
    projectId: 103,
    projectName: '回款管理'
  },
  {
    id: 4,
    name: '付款管理',
    projectId: 104,
    projectName: '付款管理'
  },
  {
    id: 5,
    name: '采购管理',
    projectId: 105,
    projectName: '采购管理'
  },
  {
    id: 6,
    name: '税费管理',
    projectId: 106,
    projectName: '税费管理'
  },
  {
    id: 7,
    name: '利润管理',
    projectId: 107,
    projectName: '利润管理'
  }
])

const projectId = ref(router.currentRoute.value.params.projectId)

const projectParams = ref({
  leaderUserName: '',
  plannedDuration: '',
  projectProgress: ''
})

const activeName = ref('进度管理');

onMounted(() => {
  projectId.value = route.query.projectId;
  projectParams.value = JSON.parse(route.params.projectItem);
})

const backToDashboard = () => {
  router.back()
}
const ClickName = (tab: TabsPaneContext, event: Event) => {
  activeName.value = event.currentTarget.innerText
  console.log(tab)
  console.log(event.currentTarget.innerText)
}
</script>

<style lang="scss">
.board {
  width: 100%;
  height: auto;

  .board-header {
    width: 100%;
    height: 160px;
    color: #ffffff;
    background-color: $primary-color;
    text-align: left;
    padding: 0 10px;

    .board-header-title {
      padding: 10px;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .board-header-name {
        display: flex;
        align-items: center;
        @include text-styles($h1-text-white);
      }

      .board-header-status {
        width: 74px;
        height: 32px;
        background-color: #ffffff;
        border-radius: 10px 4px 10px 4px;
        color: $primary-color;
        text-align: center;
        line-height: 32px;
      }
    }

    .board-header-desc {
      margin: 0 40px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .board-header-desc-left,
      .board-header-desc-center {
        @include text-styles($important-text-white);
      }

      .percentage-label {
        color: #ffffff;
      }

      .percentage-value {
        font-size: 18px;
        color: #ffffff;
      }
    }
  }

  .board-box {
    position: relative;
    background-color: #ffffff;
    border-radius: 5px;
    margin: -30px 40px 20px 40px;
    padding: 10px;

    .board-box-tabs {
      display: flex;
      align-items: center;
      padding: 0 10px;

      .el-tabs__item {
        @include text-styles($h2-text);
      }
    }

    .board-box-title {
      margin: 20px 0 10px 0;
      position: relative;
      display: flex;
      justify-content: center;

      .board-box-left {
        position: sticky;

        .board-box-title-light {
          position: relative;
          display: inline-block;
          width: 18px;
          height: 18px;
          background: #cadcfe;
          border-radius: 2px;
          z-index: 1;
          margin-left: 10px;
          top: -4px;
        }

        .board-box-title-deep {
          position: relative;
          display: inline-block;
          width: 18px;
          height: 18px;
          background: $primary-color;
          border-radius: 2px;
          z-index: 2;
          top: 4px;
          left: -6px;
        }
      }

      .board-box-center {
        @include text-styles($important-text);
        font-weight: 600;
      }

      .board-box-right {
        position: sticky;

        .board-box-title-deep {
          position: relative;
          display: inline-block;
          width: 18px;
          height: 18px;
          background: $primary-color;
          border-radius: 2px;
          z-index: 2;
          top: 4px;
          left: 6px;
        }

        .board-box-title-light {
          position: relative;
          display: inline-block;
          width: 18px;
          height: 18px;
          background: #cadcfe;
          border-radius: 2px;
          z-index: 1;
          top: -4px;
        }
      }
    }
  }

  .board-content {
    width: auto;
    height: calc(100% - 60px);
    background-color: #ffffff;
    overflow: auto;

    @each $property, $value in $card-bg {
      #{$property}: #{$value};
    }

    .board-item {
      width: 100%;
      height: 100px;
      margin-bottom: 10px;

      .board-item-header {
        height: 30px;
        border-bottom: 1px solid #e8e8e8;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 10px;
      }
    }
  }
}
</style>
