<template>
  <div class="collection-anagement">
    <el-tabs v-model="activeName" class="collection-anagement-tabs" @tab-click="handleClick">
      <el-tab-pane label="看板" name="bulletin">
        <div class="collection-anagement-contract">
          <div class="collection-anagement-contract-left">
            <li class="collection-anagement-contract-left-title">合同台账</li>
            <li class="collection-anagement-contract-left-line">
              <span class="collection-anagement-contract-left-line-left">合同总数</span>
              <span class="collection-anagement-contract-left-line-num blue">{{ refundManageData.totalContract }}</span>
              <span class="collection-anagement-contract-left-line-right">签证整数</span>
              <span class="collection-anagement-contract-left-line-num yellow">{{ refundManageData.totalVisa }}</span>
            </li>
            <el-radio-group style="display: ruby-text;" v-model="tabPosition" @change="changetTabPosition">
              <el-radio-button value="left">合同回款进度</el-radio-button>
              <el-radio-button value="center">产值回款进度</el-radio-button>
              <el-radio-button value="right">发票回款进度</el-radio-button>
            </el-radio-group>
            <!-- 使用echarts进度 -->
            <!-- <app-chart
              class="collection-anagement-contract-left-chart"
              :option="paymentProgressOption"
              :autoresize="true"
            ></app-chart> -->
            <!-- element进度 -->
            <el-progress type="dashboard" :width="180" :stroke-width="16" :indeterminate="true"
              :percentage="collectionProgress" v-if="tabPosition == 'left'">
              <template #default="{ percentage }">
                <div class="progress-management-left-value">{{ percentage }}%
                </div>
                <div class="progress-management-left-label">合同回款进度</div>
              </template>
            </el-progress>

            <el-progress type="dashboard" :width="180" :stroke-width="16" :indeterminate="true"
              :percentage="outputReceivedProgress" v-if="tabPosition == 'center'">
              <template #default="{ percentage }">
                <div class="progress-management-left-value">{{ percentage }}%
                </div>
                <div class="progress-management-left-label">产值回款进度</div>
              </template>
            </el-progress>

            <el-progress type="dashboard" :width="180" :stroke-width="16" :indeterminate="true"
              :percentage="invoiceProgress" v-if="tabPosition == 'right'">
              <template #default="{ percentage }">
                <div class="progress-management-left-value">{{ percentage }}%
                </div>
                <div class="progress-management-left-label">发票回款进度</div>
              </template>
            </el-progress>

            <div class="collection-anagement-contract-left-div">
              <div class="collection-anagement-contract-left-div-left">
                <li class="collection-anagement-contract-left-div-line">已收金额</li>
                <li class="collection-anagement-contract-left-div-line">￥ {{ refundManageData.contractReceivedAmount }}
                </li>
              </div>
              <div class="collection-anagement-contract-left-div-left">
                <li class="collection-anagement-contract-left-div-line">合同+签证（未收金额）</li>
                <li class="collection-anagement-contract-left-div-line">￥ {{ refundManageData.contractUncollectedAmount
                  }}</li>
              </div>
            </div>
          </div>
          <DividerLine></DividerLine>
          <div class="collection-anagement-contract-right">
            <li class="collection-anagement-contract-right-li">
              <span class="collection-anagement-contract-right-li-span">（合同+签证）金额</span>
              <span class="collection-anagement-contract-right-li-span right">￥{{ refundManageData.contractAmount +
                refundManageData.visaAmount }}</span>
            </li>
            <li>
              <el-progress :percentage="50" :stroke-width="12" :duration="200" striped striped-flow>
                <span>￥{{ refundManageData.contractAmount + refundManageData.visaAmount }}</span>
              </el-progress>
            </li>
            <div class="collection-anagement-contract-right-div">
              <div class="collection-anagement-contract-right-div-left">
                <li class="collection-anagement-contract-right-li-left">
                  <span class="collection-anagement-contract-right-li-span round"></span>
                  <span class="collection-anagement-contract-right-li-span">合同金额</span>
                </li>
                <li class="collection-anagement-contract-right-li">￥{{ refundManageData.contractAmount }}</li>
              </div>
              <div class="collection-anagement-contract-right-div-right">
                <li class="collection-anagement-contract-right-li-right">
                  <span class="collection-anagement-contract-right-li-span round"></span>
                  <span class="collection-anagement-contract-right-li-span right">签证金额</span>
                </li>
                <li class="collection-anagement-contract-right-li">￥{{ refundManageData.visaAmount }}</li>
              </div>
            </div>
            <li class="collection-anagement-contract-right-li">产值金额</li>
            <el-progress :percentage="50" :stroke-width="12" :duration="200" striped striped-flow>
              <span>￥{{ refundManageData.outputAmount }}</span>
            </el-progress>
            <li class="collection-anagement-contract-right-li">已收金额</li>
            <el-progress :percentage="50" :stroke-width="12" :duration="200" striped striped-flow>
              <span>￥{{ refundManageData.receivableAmount }}</span>
            </el-progress>
            <li class="collection-anagement-contract-right--li">应收金额</li>
            <el-progress :percentage="50" :stroke-width="12" :duration="200" striped striped-flow>
              <span>￥{{ refundManageData.amountReceivable }}</span>
            </el-progress>
            <li class="collection-anagement-contract-right-li">待收金额</li>
            <el-progress :percentage="50" :stroke-width="12" :duration="200" striped striped-flow>
              <span>￥{{ refundManageData.amountReceivable }}</span>
            </el-progress>
            <li class="collection-anagement-contract-right-li">销项发票</li>
            <el-progress :percentage="50" :stroke-width="12" :duration="200" striped striped-flow>
              <span>￥{{ refundManageData.outputInvoice }}</span>
            </el-progress>
          </div>
        </div>
        <div class="collection-anagement-bottom">
          <div class="collection-anagement-bottom-title">月度产值</div>
          <app-chart class="collection-anagement-bottom-chart" :option="monthlyOutputOption"
            :autoresize="true"></app-chart>
        </div>
      </el-tab-pane>
      <el-tab-pane label="表格" name="tabel">
        <el-table :data="tableRefundData" style="width: 100%">
          <el-table-column prop="name" label="合同名称" width="160" />
          <el-table-column prop="contractNumber" label="合同编号" width="160" />
          <el-table-column prop="rcvStatus" label="收款状态" width="160" />
          <el-table-column prop="taxIncluded" label="合同金额（含税）" width="160" />
          <el-table-column prop="visaIncluded" label="签证金额（含税）" width="160" />
          <el-table-column prop="totalAmount" label="收款金额" width="160" />
          <el-table-column prop="address" label="付款进度" width="160" />
          <el-table-column prop="address" label="最近收款日期" width="160" />
          <el-table-column prop="signingDate" label="签订日期" width="160" />
          <el-table-column prop="address" label="相对方" width="160" />
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
import { ref, reactive, onMounted, onUnmounted, defineComponent, computed } from 'vue'
import type { TabsInstance, TabsPaneContext } from 'element-plus'
import { use } from 'echarts/core'
import { BarChart } from 'echarts/charts'
import { GridComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import type { ComposeOption } from 'echarts/core'
import type { BarSeriesOption } from 'echarts/charts'
import type { GridComponentOption } from 'echarts/components'
import { useAuthStore } from '@/store'
import { post, get } from '../api/http'
import { refundManageUrl, monthOutputUrl, tableRefundUrl } from '@/api/url'
const store = useAuthStore()
const token = store.getToken;
const projectItem = store.getProjectItem;


const targetPercentage = 60 // 项目进度
const percentage = ref(0)
const refundManageData = reactive<{ amountReceivable: number, contractAmount: number, contractReceivedAmount: number, contractUncollectedAmount: number, outputAmount: number, outputReceivedAmount: number, outputUncollectedAmount: number, receivableAmount: number, receivedAmount: number, receivedInvoiceAmount: number, totalContract: number, totalVisa: number, uncollectedInvoiceAmount: number, visaAmount: number }>({
  amountReceivable: 0,
  contractAmount: 0,
  contractReceivedAmount: 0,
  contractUncollectedAmount: 0,
  outputAmount: 0,
  outputReceivedAmount: 0,
  outputUncollectedAmount: 0,
  receivableAmount: 0,
  receivedAmount: 0,
  receivedInvoiceAmount: 0,
  totalContract: 0,
  totalVisa: 0,
})
// 合同回款进度
const collectionProgress = computed(() => {
  let num = (refundManageData.contractReceivedAmount / refundManageData.contractAmount) * 100
  return num.toFixed(2)
});
// 产值回款进度
const outputReceivedProgress = computed(() => {
  let num = (refundManageData.receivedAmount / refundManageData.outputAmount) * 100
  return num.toFixed(2)
});
// 发票回款进度
const invoiceProgress = computed(() => {
  let num = (refundManageData.receivableAmount / refundManageData.outputInvoice) * 100
  return num.toFixed(2)
});
const monthlyOutputData = ref<Array<any>>([])

const monthlyData = ref<Array<any>>([])

const singleMonthData = ref<Array<any>>([]);

const tableRefundData = ref<Array<any>>([]);


use([GridComponent, BarChart, CanvasRenderer])
type EChartsOption = ComposeOption<GridComponentOption | BarSeriesOption>
const tabPosition = ref<TabsInstance['tabPosition']>('left')
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

const paymentProgressOption = ref<EChartsOption>({
  tooltip: {
    formatter: '{a} <br/>{b} : {c}%'
  },
  series: [
    {
      name: 'Pressure',
      type: 'gauge',
      itemStyle: {
        color: '#1197ff' // 设置颜色
      },
      progress: {
        show: true
      },
      detail: {
        valueAnimation: true,
        formatter: '{value}'
      },
      data: [
        {
          value: 50,
          name: '进度'
        }
      ]
    }
  ]
})

const monthlyOutputOption = ref<EChartsOption>({
  xAxis: {
    type: 'category',
    data: singleMonthData.value
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: monthlyData.value,
      type: 'bar',
      itemStyle: {
        color: '#1197ff', // 设置颜色
        barBorderRadius: [20, 20, 0, 0] // 设置圆角
      }
    }
  ]
});


onMounted(() => {
  getMonthOutput(projectItem.id)
  getRefundManage(projectItem.id);
  getTableRefund(projectItem.id);
  const intervalId = setInterval(() => {
    if (percentage.value < targetPercentage) {
      percentage.value = (percentage.value % 100) + 1
    } else {
      clearInterval(intervalId)
    }
  }, 10)

})

const getRefundManage = (projectId: string) => {
  get({
    url: refundManageUrl,
    headers: {
      Authorization: token
    },
    data: {
      projectId: projectId
    }
  }).then((res) => {
    Object.assign(refundManageData, res.data);
    store.setContractAndVisa({ contractAmount: refundManageData.contractAmount, visaAmount: refundManageData.visaAmount })
  }).catch((error) => {
    throw error
  })
}

const getMonthOutput = (projectId: string) => {
  get({
    url: monthOutputUrl,
    headers: {
      Authorization: token
    },
    data: {
      projectId: projectId
    }
  }).then((res) => {
    Object.assign(monthlyOutputData, res.data);
    // monthlyData.value = res.data.map((item: { monthCost: any }) => item.monthCost);
    // singleMonthData.value = res.data.map((item: { monthName: any }) => item.monthName);
    monthlyOutputOption.value.series[0].data = res.data.map((item: { monthCost: any }) => item.monthCost);
    monthlyOutputOption.value.xAxis.data = res.data.map((item: { monthName: any }) => item.monthName);
  }).catch((error) => {
    // ElMessage.error('获取项目进度失败!')
    throw error
  })
};

const getTableRefund = (projectId: string) => {
  get({
    url: tableRefundUrl,
    headers: {
      Authorization: token
    },
    data: {
      projectId: projectId
    }
  }).then((res) => {
    tableRefundData.value = res.data;
  }).catch((error) => {
    // ElMessage.error('获取项目进度失败!')
    throw error
  })
};

const updateChart = () => {
  if (chartInstance !== null) {
    // 更新图表配置
    chartInstance.setOption(monthlyOutputOption.value);
  }
};


const changetTabPosition = (event: 'left' | 'center' | 'right') => {
  tabPosition.value = event
}
const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}
</script>

<style lang="scss">
.collection-anagement {
  height: 100%;
  width: 100%;

  .collection-anagement-tabs {
    .el-tabs__item {
      @include text-styles($important-text);
    }

    .collection-anagement-contract {
      display: flex;

      .collection-anagement-contract-title {
        font-size: 20px;
        font-weight: 600;
        margin-bottom: 20px;
      }

      .collection-anagement-contract-left {
        flex: 1;

        .collection-anagement-contract-left-title {
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 20px;
        }

        .collection-anagement-contract-left-chart {
          width: 780px;
          height: 300px;
        }

        .collection-anagement-contract-left-div {
          display: flex;
          justify-content: space-between;
          padding: 0 60px;
        }

        .collection-anagement-contract-left-line-num {
          @include text-styles($important-text);
          margin: 4px;
        }

        .collection-anagement-contract-left-line-right {
          margin-left: 20px;
        }
      }

      .collection-anagement-contract-right {
        flex: 1;

        .collection-anagement-contract-right-div {
          margin: 20px 0;
          display: flex;

          .collection-anagement-contract-right-div-left {
            flex: 1;
            text-align: left;
          }
        }

        .collection-anagement-contract-right-li {
          .collection-anagement-contract-right-li-span {
            @include text-styles($important-text);
          }
        }

        .collection-anagement-contract-right-li-left {
          .round {
            display: inline-block;
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background: $primary-color;
            margin-right: 10px;
          }
        }

        .collection-anagement-contract-right-li-right {
          .round {
            display: inline-block;
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background: #fc9352;
            margin-right: 10px;
          }
        }
      }
    }

    .collection-anagement-bottom {
      margin: 20px 0;

      .collection-anagement-bottom-title {
        text-align: left;
        @include text-styles($important-text);
      }

      .collection-anagement-bottom-chart {
        width: 100%;
        height: 600px;
      }

      .collection-anagement-bottom-title {}
    }
  }
}
</style>
