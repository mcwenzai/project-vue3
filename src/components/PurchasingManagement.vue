<template>
  <div class="purchasing-management">
    <el-tabs v-model="activeName" class="purchasing-management-tabs" @tab-click="handleClick">
      <el-tab-pane label="看板" name="bulletin">
        <div class="purchasing-management-contract">
          <div class="purchasing-management-contract-left">
            <el-progress type="circle" :stroke-width="16" :width="180" :percentage="80">
              <template #default="{ percentage }">
                <p class="percentage-value">{{ percentage }}%</p>
                <p class="percentage-label">已使用</p>
              </template>
            </el-progress>
            <div class="purchasing-management-contract-left-div">
              <li class="purchasing-management-contract-left-line">材料预算总额</li>
              <li class="purchasing-management-contract-left-line">1515655965652</li>
            </div>
          </div>
          <div class="purchasing-management-contract-right">
            <li class="purchasing-management-contract-right-line">
              <!-- <el-icon size="20" color="#58D9F9">
                <Edit />
              </el-icon> -->
              <span class="purchasing-management-contract-right-line-span">（合同+签证）金额</span>
              <span class="purchasing-management-contract-right-line-span right">￥{{ purchaseManageData.contractAmount
                + purchaseManageData.visaAmount }}</span>
            </li>
            <li>
              <el-progress :percentage="50">
                <span>￥{{ purchaseManageData.contractAmount }}</span>
              </el-progress>
            </li>
            <div class="purchasing-management-contract-right-div">
              <div class="purchasing-management-contract-right-div-left">
                <li class="purchasing-management-contract-right-line">
                  <span class="purchasing-management-contract-right-line-span">合同金额</span>
                </li>
                <li class="purchasing-management-contract-right-line-line">￥{{ purchaseManageData.contractAmount }}</li>
              </div>
              <div class="purchasing-management-contract-right-div-right">
                <li class="purchasing-management-contract-right-line">
                  <span class="purchasing-management-contract-right-line-span right">签证金额</span>
                </li>
                <li class="purchasing-management-contract-right-div-line">￥{{ purchaseManageData.visaAmount }}</li>
              </div>
            </div>
            <li class="purchasing-management-contract-right-div-line">采购合同</li>
            <el-progress :percentage="50">
              <span>￥{{ purchaseManageData.purchaseContract }}</span>
            </el-progress>
            <li class="purchasing-management-contract-right-div-line">采购订单</li>
            <el-progress :percentage="50">
              <span>￥{{ purchaseManageData.purchaseOrder }}</span>
            </el-progress>
            <li class="purchasing-management-contract-right-div-line">采购入库</li>
            <el-progress :percentage="50">
              <span>￥{{ purchaseManageData.purchaseWarehouse }}</span>
            </el-progress>
            <li class="purchasing-management-contract-right-div-line">材料成本</li>
            <el-progress :percentage="50">
              <span>￥{{ purchaseManageData.materialCost }}</span>
            </el-progress>
            <li class="purchasing-management-contract-right-div-line">采购发票</li>
            <el-progress :percentage="50">
              <span>￥{{ purchaseManageData.purchaseInvoice }}</span>
            </el-progress>
            <li class="purchasing-management-contract-right-div-line">采购已付</li>
            <el-progress :percentage="50">
              <span>￥{{ purchaseManageData.purchasePaid }}</span>
            </el-progress>
          </div>
        </div>
        <div class="purchasing-management-bottom">
          <div class="purchasing-management-bottom-title">材料分析曲线</div>
          <app-chart class="purchasing-management-bottom-chart" :option="materialAnalysisOption"
            :autoresize="true"></app-chart>
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
import { ref, reactive, onMounted } from 'vue'
import { use } from 'echarts/core'
import { LineChart } from 'echarts/charts'
import {
  TooltipComponent,
  LegendComponent,
  ToolboxComponent,
  GridComponent
} from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import type { ComposeOption } from 'echarts/core'
import type { LineSeriesOption } from 'echarts/charts'
import type {
  TooltipComponentOption,
  LegendComponentOption,
  ToolboxComponentOption,
  GridComponentOption
} from 'echarts/components'
import { purchaseManageUrl, tablePurchaseUrl, analysisCurveUrl } from '@/api/url'
import { post, get } from '../api/http'
import { useAuthStore } from '@/store'
use([TooltipComponent, LegendComponent, ToolboxComponent, GridComponent, LineChart, CanvasRenderer])

type EChartsOption = ComposeOption<
  | TooltipComponentOption
  | LegendComponentOption
  | ToolboxComponentOption
  | GridComponentOption
  | LineSeriesOption
>

const store = useAuthStore()
const token = store.getToken;
const projectItem = store.getProjectItem;

const contractAndVisa = store.getContractAndVisa;

const targetPercentage = 60
const percentage = ref(0);
const analysisCurveData = ref([])
const activeName = ref('bulletin')

const materialAnalysisOption = ref<EChartsOption>({
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    left: 'right',
    data: ['订单金额', '入库金额', '使用金额']
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  toolbox: {
    feature: {
      saveAsImage: {}
    }
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: []
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      name: '订单金额',
      type: 'line',
      stack: 'Total',
      data: [],
      itemStyle: {
        color: '#1197ff'
      }
    },
    {
      name: '入库金额',
      type: 'line',
      stack: 'Total',
      data: [220, 182, 191, 234, 290, 330, 310]
    },
    {
      name: '使用金额',
      type: 'line',
      stack: 'Total',
      data: [150, 232, 201, 154, 190, 330, 410]
    }
  ]
})

const tablePurchaseData = ref([]);

const purchaseManageData = reactive<{ materialCost: number, purchaseContract: number, purchaseInvoice: number, purchaseOrder: number, purchasePaid: number, purchaseWarehouse: number, totalMaterialBudget: number }>({
  materialCost: 0,
  purchaseContract: 0,
  purchaseInvoice: 0,
  purchaseOrder: 0,
  purchasePaid: 0,
  purchaseWarehouse: 0,
  totalMaterialBudget: 0
})


const getPurchaseManage = (projectId: string) => {
  get({
    url: purchaseManageUrl,
    headers: {
      Authorization: token
    },
    data: {
      projectId: projectId
    }
  }).then((res) => {
    Object.assign(purchaseManageData, res.data);
  }).catch((error) => {
    // ElMessage.error('获取项目进度失败!')
    throw error
  })
}

onMounted(() => {
  getPurchaseManage(projectItem.id);
  getTablePurchase(projectItem.id);
  getAnalysisCurve(projectItem.id);
  const intervalId = setInterval(() => {
    if (percentage.value < targetPercentage) {
      percentage.value = (percentage.value % 100) + 1
    } else {
      clearInterval(intervalId)
    }
  }, 10)
})

const getTablePurchase = (projectId: string) => {
  get({
    url: tablePurchaseUrl,
    headers: {
      Authorization: token
    },
    data: {
      projectId: projectId
    }
  }).then((res) => {
    Object.assign(tablePurchaseData, res.data);
  }).catch((error) => {
    throw error
  })
}

const getAnalysisCurve = (projectId: string) => {
  get({
    url: analysisCurveUrl,
    headers: {
      Authorization: token
    },
    data: {
      projectId: projectId
    }
  }).then((res) => {
    materialAnalysisOption.value.xAxis.data = res.data.map((item: any) => item.monthName);
    materialAnalysisOption.value.series[0].data = res.data.map((item: any) => item.orderCost);
    materialAnalysisOption.value.series[1].data = res.data.map((item: any) => item.storageCost);
    materialAnalysisOption.value.series[1].data = res.data.map((item: any) => item.useCost);
  }).catch((error) => {
    throw error
  })
}




const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}
</script>

<style lang="scss">
.purchasing-management {
  height: 100%;
  width: 100%;

  .purchasing-management-tabs {
    .el-tabs__item {
      @include text-styles($important-text);
    }

    .purchasing-management-contract {
      display: flex;

      .purchasing-management-contract-title {
        font-size: 20px;
        font-weight: 600;
        margin-bottom: 20px;
      }

      .purchasing-management-contract-left {
        flex: 1;
        text-align: center;

        .purchasing-management-contract-left-title {
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 20px;
        }

        .purchasing-management-contract-left-chart {
          width: 100%;
          height: 360px;
        }

        .purchasing-management-contract-left-div {
          display: flex;
          justify-content: space-between;
          padding: 0 60px;
        }
      }

      .purchasing-management-contract-right {
        flex: 1;

        .purchasing-management-contract-right-div {
          display: flex;

          .purchasing-management-contract-right-div-left {
            flex: 1;
            text-align: left;
          }

          .purchasing-management-contract-right-div-right {
            flex: 1;
            text-align: left;
          }
        }

        .purchasing-management-contract-right-div-line {
          text-align: left;
        }
      }
    }

    .purchasing-management-bottom {
      .purchasing-management-bottom-title {
        margin-top: 20px;
        @include text-styles($important-text);
        text-align: left;
      }

      .purchasing-management-bottom-chart {
        width: 100%;
        height: 600px;
      }
    }
  }
}
</style>
