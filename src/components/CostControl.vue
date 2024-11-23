<template>
  <div class="cost-control">
    <el-tabs v-model="activeName" class="cost-control-tabs" @tab-click="handleClick">
      <el-tab-pane label="看板" name="bulletin">
        <div class="cost-control-bulletin">
          <div class="cost-control-bulletin-general">
            <div class="cost-control-bulletin-general-left">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-general-budget"></use>
              </svg>
            </div>
            <div class="cost-control-bulletin-general-right">
              <div class="cost-control-bulletin-general-title">
                <span class="cost-control-bulletin-name">总预算</span>
              </div>
              <div class="cost-control-bulletin-general-content">￥{{ costManageData.generalBudget }}</div>
            </div>
          </div>
          <div class="cost-control-bulletin-general">
            <div class="cost-control-bulletin-general-left">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-total-cost"></use>
              </svg>
            </div>
            <div class="cost-control-bulletin-general-right">
              <div class="cost-control-bulletin-general-title">
                <span class="cost-control-bulletin-name">总成本</span>
              </div>
              <div class="cost-control-bulletin-general-content">￥{{ costManageData.totalCost }}</div>
            </div>
          </div>
          <div class="cost-control-bulletin-general">
            <div class="cost-control-bulletin-general-left">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-output-amount"></use>
              </svg>
            </div>
            <div class="cost-control-bulletin-general-right">
              <div class="cost-control-bulletin-general-title">
                <span class="cost-control-bulletin-name">产值金额</span>
              </div>
              <div class="cost-control-bulletin-general-content">￥{{ costManageData.output }}</div>
            </div>
          </div>
          <div class="cost-control-bulletin-general">
            <div class="cost-control-bulletin-general-left">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-budget-amount"></use>
              </svg>
            </div>
            <div class="cost-control-bulletin-general-right">
              <div class="cost-control-bulletin-general-title">
                <span class="cost-control-bulletin-name">预算金额</span>
              </div>
              <div class="cost-control-bulletin-general-content">￥{{ costManageData.budgetBalance }}</div>
            </div>
          </div>
        </div>
        <div class="cost-control-bulletin-line">
          <el-progress :text-inside="true" :percentage="costBudgetProgress" :duration="200" :stroke-width="20" striped
            striped-flow>
            <span>成本/预算{{ costBudgetProgress }}%</span>
          </el-progress>
        </div>
        <div class="cost-control-layout">
          <el-row :gutter="24">
            <el-col :span="8">
              <div class="cost-control-layout-card box">
                <div class="cost-control-layout-card-title">人工成本</div>
                <div class="cost-control-layout-card-amount">￥{{ costManageData.laborCost }}</div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="cost-control-layout-card box">
                <div class="cost-control-layout-card-title">材料成本</div>
                <div class="cost-control-layout-card-amount">￥{{ costManageData.materialCost }}</div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="cost-control-layout-card box">
                <div class="cost-control-layout-card-title">设备成本</div>
                <div class="cost-control-layout-card-amount">￥{{ costManageData.equipmentCost }}</div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="cost-control-layout-card box">
                <div class="cost-control-layout-card-title">费用成本</div>
                <div class="cost-control-layout-card-amount">￥{{ costManageData.expenseCost }}</div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="cost-control-layout-card box">
                <div class="cost-control-layout-card-title">分包成本</div>
                <div class="cost-control-layout-card-amount">￥{{ costManageData.subcontractCost }}</div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="cost-control-layout-card box">
                <div class="cost-control-layout-card-title">其他成本</div>
                <div class="cost-control-layout-card-amount">￥{{ costManageData.otherCost }}</div>
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="cost-control-bulletin-bottom">
          <div class="cost-control-bulletin-bottom-statistics">
            <div class="cost-control-bulletin-bottom-statistics-title">成本项统计</div>
            <app-chart class="cost-control-bulletin-bottom-statistics-content" :option="statisticsOption"
              :autoresize="true"></app-chart>
          </div>
          <DividerLine></DividerLine>
          <div class="cost-control-bulletin-bottom-monthly">
            <div class="cost-control-bulletin-bottom-monthly-title">月度成本</div>
            <app-chart class="cost-control-bulletin-bottom-monthly-content" :option="monthlyOption"
              :autoresize="true"></app-chart>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="表格" name="tabel">
        <el-table :data="tableCostData" style="width: 100%">
          <el-table-column prop="monthName" label="月度" width="480" />
          <el-table-column prop="type" label="成本类型" width="480" />
          <el-table-column prop="monthCost" label="月度合计" width="480" />
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
import { defineProps, onMounted, ref, reactive, computed } from 'vue'
import { ElMessage, ElAvatar, ElRow, ElCol } from 'element-plus'
import { post, get } from '../api/http'
import { projectTotalBudget, costManageUrl, monthCostUrl, tableCostUrl } from '../api/url'
import { useAuthStore } from '@/store'

import { use } from 'echarts/core'
import { LineChart } from 'echarts/charts'
import { GridComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import type { ComposeOption } from 'echarts/core'
import type { LineSeriesOption } from 'echarts/charts'
import type { GridComponentOption } from 'echarts/components'
use([GridComponent, LineChart, CanvasRenderer])

const store = useAuthStore()
const token = store.getToken
const projectItem = store.getProjectItem;

const props = defineProps({
  projectId: {
    type: String,
    default: ''
  }
});

const costManageData = reactive<{ budgetBalance: number, equipmentCost: number, expenseCost: number, generalBudget: number, laborCost: number, materialCost: number, otherCost: number, output: number, subcontractCost: number, totalCost: number }>({
  budgetBalance: 0,
  equipmentCost: 0,
  expenseCost: 0,
  generalBudget: 0,
  laborCost: 0,
  materialCost: 0,
  otherCost: 0,
  output: 0,
  subcontractCost: 0,
  totalCost: 0
});

const monthCostData = reactive<{ monthCost: number, monthCostList: Array<{ month: string, cost: number }> }>({
  monthCost: 0,
  monthCostList: []
})

const costBudgetProgress = computed(() => {
  let progress = (costManageData.totalCost / costManageData.generalBudget) * 100;
  return parseFloat(progress.toFixed(2));
})

const tableCostData = ref([])

// 判断图表类型
type EChartsOption = ComposeOption<GridComponentOption | LineSeriesOption>
const activeName = ref('bulletin')
const tableData = ref([
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
])

const statisticsOption = ref<EChartsOption>({
  tooltip: {
    trigger: 'item'
  },
  legend: {
    top: '5%',
    left: 'center'
  },
  series: [
    {
      name: '成本项统计',
      type: 'pie',
      radius: ['40%', '70%'],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: '#fff',
        borderWidth: 2
      },
      label: {
        show: false,
        position: 'center'
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 40,
          fontWeight: 'bold'
        }
      },
      labelLine: {
        show: false
      },
      data: []
    }
  ]
})

const monthlyOption = ref<EChartsOption>({
  xAxis: {
    type: 'category',
    data: []
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [],
      type: 'line',
      itemStyle: {
        color: '#1197ff'
      }
    }
  ]
})

onMounted(() => {
  // getProjectTotalBudget(projectItem.id);
  getCostManage(projectItem.id);
  getMonthCost(projectItem.id);
  getTableCost(projectItem.id)

})


// const getProjectTotalBudget = (projectId: string) => {
//   get({
//     url: projectTotalBudget,
//     headers: {
//       Authorization: token
//     },
//     data: {
//       id: projectId
//     }
//   }).then((res) => {
//     console.log(res)
//     // dictItemListData.value = res.data.fullResultList
//   })
// }

const getCostManage = (projectId: string) => {
  get({
    url: costManageUrl,
    headers: {
      Authorization: token
    },
    data: {
      projectId: projectId
    }
  }).then((res) => {
    let statisticsData = [
      { value: res.data.laborCost, name: '人工成本' },
      { value: res.data.materialCost, name: '材料成本' },
      { value: res.data.equipmentCost, name: '设备成本' },
      { value: res.data.expenseCost, name: '费用成本' },
      { value: res.data.subcontractCost, name: '分包成本' },
      { value: res.data.otherCost, name: '其他成本' }
    ]
    Object.assign(costManageData, res.data);
    statisticsOption.value.series[0].data = statisticsData;
  }).catch((error) => {
    ElMessage.error('获取项目信息失败!')
    throw error
  })
}
const getMonthCost = (projectId: string) => {
  get({
    url: monthCostUrl,
    headers: {
      Authorization: token
    },
    data: {
      projectId: projectId
    }
  }).then((res) => {
    monthlyOption.value.series[0].data = res.data.map((item: { monthCost: any }) => item.monthCost);
    monthlyOption.value.xAxis.data = res.data.map((item: { monthName: any }) => item.monthName);
  }).catch((error) => {
    ElMessage.error('获取项目信息失败!')
    throw error
  })
}

const getTableCost = (projectId: string) => {
  get({
    url: tableCostUrl,
    headers: {
      Authorization: token
    },
    data: {
      projectId: projectId
    }
  }).then((res) => {
    tableCostData.value = res.data
    console.log(tableCostData.value)
  }).catch((error) => {
    ElMessage.error('获取项目信息失败!')
    throw error
  })
}


const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}
</script>

<style lang="scss">
.cost-control {
  height: 100%;
  width: 100%;

  .cost-control-tabs {
    .el-tabs__item {
      @include text-styles($important-text);
    }

    .cost-control-title {
      flex: 1;
      padding: 10px;
      color: #222222;
      font-size: 18px;
    }

    .cost-control-bulletin {
      display: flex;

      .cost-control-bulletin-general {
        width: 440px;
        margin-right: 280px;
        display: flex;
        align-items: center;

        .cost-control-bulletin-general-left {
          color: $primary-color;
        }

        .cost-control-bulletin-general-right {
          margin-left: 10px;

          .cost-control-bulletin-general-title {
            display: flex;
            align-items: center;
            @include text-styles($important-text);

            .cost-control-bulletin-name {
              @include text-styles($desc-text);
            }
          }

          .cost-control-bulletin-general-content {
            text-align: left;
            @include text-styles($important-text);
          }
        }
      }
    }

    .cost-control-bulletin-line {
      margin: 10px 0;
      width: 100%;
      height: 20px;
    }

    .cost-control-bulletin-bottom {
      display: flex;

      .cost-control-bulletin-bottom-statistics {
        width: 100%;
        height: auto;

        .cost-control-bulletin-bottom-statistics-title {
          font-size: 18px;
          font-weight: 600;
          color: #333333;
        }

        .cost-control-bulletin-bottom-statistics-content {
          width: 800px;
          height: 400px;
        }
      }

      .cost-control-bulletin-bottom-monthly {
        width: 100%;
        height: auto;

        .cost-control-bulletin-bottom-monthly-title {
          font-size: 18px;
          font-weight: 600;
          color: #333333;
        }

        .cost-control-bulletin-bottom-monthly-content {
          width: 800px;
          height: 400px;
        }
      }
    }

    .cost-control-layout {
      .cost-control-layout-card {
        margin: 20px 0;
        padding: 10px 20px;
        background-color: #409eff;
        border-radius: 4px;
        text-align: left;
        position: relative;
        overflow: hidden;
        // background-image: linear-gradient(
        //   63deg,
        //   rgba(0, 0, 0, 0.1) 25%,
        //   transparent 0,
        //   transparent 50%,
        //   rgba(0, 0, 0, 0.1) 0,
        //   rgba(0, 0, 0, 0.1) 75%,
        //   transparent 0,
        //   transparent
        // );
        background-image: linear-gradient(63deg,
            #409eff 25%,
            transparent 0,
            transparent 50%,
            #1197ff 0,
            #409eff 60%,
            transparent 0,
            transparent);
        background-size: 10px 20px;
        background-position: 0 0;
        animation: waveAnimation 3s linear infinite;

        @keyframes waveAnimation {
          0% {
            background-position: 0 0;
          }

          100% {
            background-position: 20px 0;
          }
        }

        .cost-control-layout-card-title {
          @include text-styles($desc-text-white);
        }

        .cost-control-layout-card-amount {
          @include text-styles($important-text-white);
        }
      }
    }
  }
}
</style>
