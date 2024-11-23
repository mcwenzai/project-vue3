<template>
  <div class="profit-management">
    <el-tabs v-model="activeName" class="profit-management-tabs" @tab-click="handleClick">
      <el-tab-pane label="看板" name="bulletin">
        <div class="profit-management-contract">
          <div class="profit-management-contract-left">
            <el-progress type="circle" :stroke-width="16" :width="180" :percentage="profitProgress">
              <template #default="{ percentage }">
                <div class="percentage-value">{{ percentage }}%</div>
                <div class="percentage-label">毛利率</div>
              </template>
            </el-progress>
            <div class="profit-management-contract-left-div">
              <li class="profit-management-contract-left-line">项目利润</li>
              <li class="profit-management-contract-left-line">￥ {{ profitData }}</li>
            </div>
          </div>

          <div class="profit-management-contract-right">
            <div class="profit-management-contract-right-li">
              <div class="profit-management-contract-right-title">产值：</div>
              <el-progress :stroke-width="12" :percentage="50">
                <span>￥ {{ profitManageData.outputAmount }}</span>
              </el-progress>
            </div>
            <Spacer bgColor="#ffffff"></Spacer>
            <div class="profit-management-contract-right-li">
              <div class="profit-management-contract-right-title">材料成本：</div>
              <el-progress :stroke-width="12" :percentage="50">
                <span>￥ {{ profitManageData.materialCost }}</span>
              </el-progress>
            </div>
            <Spacer bgColor="#ffffff"></Spacer>
            <div class="profit-management-contract-right-li">
              <div class="profit-management-contract-right-title">劳务成本：</div>
              <el-progress :stroke-width="12" :percentage="50">
                <span>￥ {{ profitManageData.laborCost }}</span>
              </el-progress>
            </div>
            <Spacer bgColor="#ffffff"></Spacer>
            <div class="profit-management-contract-right-li">
              <div class="profit-management-contract-right-title">设备成本：</div>
              <el-progress :stroke-width="12" :percentage="50">
                <span>￥ {{ profitManageData.equipmentCost }}</span>
              </el-progress>
            </div>
            <Spacer bgColor="#ffffff"></Spacer>
            <div class="profit-management-contract-right-li">
              <div class="profit-management-contract-right-title">分包成本：</div>
              <el-progress :stroke-width="12" :percentage="50">
                <span>￥ {{ profitManageData.subcontractingCost }}</span>
              </el-progress>
            </div>
            <Spacer bgColor="#ffffff"></Spacer>
            <div class="profit-management-contract-right-li">
              <div class="profit-management-contract-right-title">其他成本：</div>
              <el-progress :stroke-width="12" :percentage="50">
                <span>￥ {{ profitManageData.otherCost }}</span>
              </el-progress>
            </div>
          </div>
        </div>
        <div class="profit-management-bottom">
          <div class="profit-management-bottom-title">月度收支盈余</div>
          <app-chart class="profit-management-bottom-chart" :option="MonthlyIaesOption" :autoresize="true"></app-chart>
        </div>
      </el-tab-pane>
      <el-tab-pane label="表格" name="tabel">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="date" label="月度" width="480" />
          <el-table-column prop="name" label="成本类型" width="480" />
          <el-table-column prop="address" label="月度合计" width="480" />
          <el-table-column fixed="right" label="操作" min-width="120">
            <template #default>
              <el-button link type="primary" size="small">详情</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive, onMounted, computed } from 'vue'
import { use } from 'echarts/core'
import { LineChart } from 'echarts/charts'
import { GridComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import type { ComposeOption } from 'echarts/core'
import type { LineSeriesOption } from 'echarts/charts'
import type { GridComponentOption } from 'echarts/components'
import { get } from '@/api/http'
import { profitManageUrl, profitMonthManageUrl } from '@/api/url'
import { useAuthStore } from '@/store'

use([GridComponent, LineChart, CanvasRenderer])

type EChartsOption = ComposeOption<GridComponentOption | LineSeriesOption>
const store = useAuthStore()
const token = store.getToken;
const projectItem = store.getProjectItem;
const percentage = ref(0);
const targetPercentage = 60;

const profitManageData = reactive<{ budgetBalance: number, equipmentCost: number, expenseCost: number, laborCost: number, materialCost: number, otherCost: number, outputAmount: number, projectProfit: number, subcontractingCost: number, totalCost: number }>({
  budgetBalance: 0,
  equipmentCost: 0,
  expenseCost: 0,
  laborCost: 0,
  materialCost: 0,
  otherCost: 0,
  outputAmount: 0,
  projectProfit: 0,
  subcontractingCost: 0,
  totalCost: 0
})

const activeName = ref('bulletin')
const tableData = [
  {
    date: '2024-05-03',
    name: '设备租赁',
    address: '18888888'
  },
  {
    date: '2024-05-02',
    name: '设备租赁',
    address: '18888888'
  },
  {
    date: '2024-05-04',
    name: '设备租赁',
    address: '18888888'
  },
  {
    date: '2024-05-01',
    name: '设备租赁',
    address: '18888888'
  }
]

const MonthlyIaesOption = ref<EChartsOption>({
  // title: {
  //   text: '月度收支盈余'
  // },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['2024-03', '2024-04', '2024-05', '2024-06', '2024-07', '2024-08', '2024-09']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [120, -132, -301, 234, 590, 330, 120],
      type: 'line',
      smooth: true,
      itemStyle: {
        color: '#1197ff'
      }
    }
  ]
});

// 付款进度
const profitProgress = computed(() => {
  let num = ((profitManageData.outputAmount - profitManageData.totalCost) / profitManageData.totalCost) * 100
  return num.toFixed(2)
});

const profitData = computed(() => {
  return profitManageData.outputAmount - profitManageData.totalCost
})


onMounted(() => {
  getProfitManage(projectItem.id);
  getProfitMonthManage(projectItem.id)
  const intervalId = setInterval(() => {
    if (percentage.value < targetPercentage) {
      percentage.value = (percentage.value % 100) + 1
    } else {
      clearInterval(intervalId)
    }
  }, 10)
})

const getProfitManage = (projectId: string) => {
  get({
    url: profitManageUrl,
    headers: {
      Authorization: token
    },
    data: {
      projectId: projectId
    }
  }).then((res) => {
    Object.assign(profitManageData, res.data);
  }).catch((error) => {
    // ElMessage.error('获取项目进度失败!')
    throw error
  })
}

const getProfitMonthManage = (projectId: string) => {
  get({
    url: profitMonthManageUrl,
    headers: {
      Authorization: token
    },
    data: {
      projectId: projectId
    }
  }).then((res) => {
    // Object.assign(profitMonthManageData, res.data);
    MonthlyIaesOption.value.series[0].data = res.data.map((item: { monthCost: any }) => item.monthCost);
    MonthlyIaesOption.value.xAxis.data = res.data.map((item: { monthName: any }) => item.monthName);
  }).catch((error) => {
    // ElMessage.error('获取项目进度失败!')
    throw error
  })
}
const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}
</script>

<style lang="scss">
.profit-management {
  height: 100%;
  width: 100%;

  .profit-management-tabs {
    .el-tabs__item {
      @include text-styles($important-text);
    }

    .profit-management-contract {
      display: flex;

      .profit-management-contract-title {
        font-size: 20px;
        font-weight: 600;
        margin-bottom: 20px;
      }

      .profit-management-contract-left {
        flex: 1;
        text-align: center;

        .profit-management-contract-left-title {
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 20px;
        }

        .profit-management-contract-left-chart {
          width: 800px;
          height: 400px;
        }

        .profit-management-contract-left-div {
          display: flex;
          justify-content: space-between;
          padding: 0 60px;
        }
      }

      .profit-management-contract-right {
        flex: 1;

        .profit-management-contract-right-div {
          display: flex;

          .profit-management-contract-right-div-left {
            flex: 1;
            text-align: left;
          }

          .profit-management-contract-right-div-right {
            flex: 1;
            text-align: left;
          }
        }

        .profit-management-contract-right-div-line {
          text-align: left;
        }

        .profit-management-contract-right-progress {
          width: 740px;
        }

        .profit-management-contract-right-li {
          display: flex;
          align-items: center;

          .profit-management-contract-right-title {
            text-align: left;
            width: 100px;
          }

          .el-progress {
            width: 740px;
          }
        }
      }
    }

    .profit-management-bottom {
      .profit-management-bottom-title {
        margin-top: 20px;
        @include text-styles($important-text);
      }

      .profit-management-bottom-chart {
        width: 100%;
        height: 600px;
      }
    }
  }
}
</style>
