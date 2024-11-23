<template>
  <div class="payment-anagement">
    <el-tabs v-model="activeName" class="payment-anagement-tabs" @tab-click="handleClick">
      <el-tab-pane label="看板" name="bulletin">
        <div class="payment-anagement-contract">
          <div class="payment-anagement-contract-left">
            <li class="payment-anagement-contract-left-title">合同台账</li>
            <li class="payment-anagement-contract-left-line">
              <p>
                <span class="payment-anagement-contract-left-line-left">合同总数:</span>
                <span class="payment-anagement-contract-left-line-num blue">{{ paymentManageData.totalContract }}</span>
              </p>
              <p>
                <span class="payment-anagement-contract-left-line-right">签证总数:</span>
                <span class="payment-anagement-contract-left-line-num yellow">{{ paymentManageData.totalVisa }}</span>
              </p>
            </li>
            <el-progress type="dashboard" :width="180" :stroke-width="16" :indeterminate="true"
              :percentage="paymentProgress">
              <template #default="{ percentage }">
                <div class="payment-anagement-contract-left-value blue">{{ percentage }}%</div>
                <div class="payment-anagement-contract-left-label blue">合同付款进度</div>
              </template>
            </el-progress>

            <div class="payment-anagement-contract-right">
              <div class="payment-anagement-contract-right-title">月度付款金额</div>
              <app-chart class="payment-anagement-contract-right-chart" :option="monthlyOutputOption"
                :autoresize="true"></app-chart>
              <!-- <div id="monthlyOutput" class="payment-anagement-contract-right-chart"></div> -->
            </div>
          </div>

          <DividerLine></DividerLine>

          <div class="payment-anagement-contract-right">
            <li class="payment-anagement-contract-right-line">
              <span class="payment-anagement-contract-right-line-span">（合同+签证）金额</span>
              <span class="payment-anagement-contract-right-line-span right">￥{{ paymentManageData.contractAmount +
                paymentManageData.visaAmount }}</span>
            </li>
            <li>
              <el-progress :indeterminate="true" :percentage="paymentProgress" :stroke-width="12" :duration="200"
                striped striped-flow />
            </li>
            <div class="payment-anagement-contract-right-div">
              <div class="payment-anagement-contract-right-div-left">
                <li class="payment-anagement-contract-right-li-left">
                  <span class="round blue-round"></span>
                  <span class="payment-anagement-contract-right-li-span">合同金额</span>
                </li>
                <li class="payment-anagement-contract-right-li">￥{{ paymentManageData.contractAmount }}</li>
              </div>
              <div class="payment-anagement-contract-right-div-right">
                <li class="payment-anagement-contract-right-li-right">
                  <span class="round yellow-round"></span>
                  <span class="payment-anagement-contract-right-li-span right">签证金额</span>
                </li>
                <li class="payment-anagement-contract-right-li">￥{{ paymentManageData.visaAmount }}</li>
              </div>
            </div>
            <app-chart class="payment-anagement-contract-right-chart" :option="paymentProgressOption"
              :autoresize="true"></app-chart>
            <li class="payment-anagement-contract-right-line">
              <span class="payment-anagement-contract-right-line-span">产值金额</span>
            </li>
            <li>
              <el-progress :indeterminate="true" :percentage="50" :stroke-width="12" :duration="200" striped
                striped-flow>
                <span>{{ paymentManageData.visaAmount }}</span>
              </el-progress>
            </li>
            <li class="payment-anagement-contract-right-line">
              <span class="payment-anagement-contract-right-line-span">已收金额</span>
            </li>
            <li>
              <el-progress :indeterminate="true" :percentage="50" :stroke-width="12" :duration="200" striped
                striped-flow />
            </li>
            <li class="payment-anagement-contract-right-line">
              <span class="payment-anagement-contract-right-line-span">应收金额</span>
            </li>
            <li>
              <el-progress :indeterminate="true" :percentage="50" :stroke-width="12" :duration="200" striped
                striped-flow />
            </li>
            <li class="payment-anagement-contract-right-line">
              <span class="payment-anagement-contract-right-line-span">待收金额</span>
            </li>
            <li>
              <el-progress :indeterminate="true" :percentage="50" :stroke-width="12" :duration="200" striped
                striped-flow />
            </li>
            <li class="payment-anagement-contract-right-line">
              <span class="payment-anagement-contract-right-line-span">销项发票</span>
            </li>
            <li>
              <el-progress :indeterminate="true" :percentage="50" :stroke-width="12" :duration="200" striped
                striped-flow />
            </li>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="表格" name="tabel">
        <el-table :data="tablePaymentData" style="width: 100%">
          <el-table-column prop="name" label="合同名称" width="160" />
          <el-table-column prop="contractNumber" label="合同编号" width="160" />
          <el-table-column prop="contractType" label="合同类型" width="160" />
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
import { ref, reactive, onMounted, computed } from 'vue'
import type { TabsInstance, TabsPaneContext } from 'element-plus'
import { use } from 'echarts/core'
import { BarChart } from 'echarts/charts'
import { GridComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import type { ComposeOption } from 'echarts/core'
import type { BarSeriesOption } from 'echarts/charts'
import type { GridComponentOption } from 'echarts/components'
import { useAuthStore } from '@/store'
import { paymentManageUrl, monthManageUrl, tablePaymentUrl } from '@/api/url'
import { get, post } from '@/api/http'

use([GridComponent, BarChart, CanvasRenderer])

const store = useAuthStore()
const token = store.getToken;
const projectItem = store.getProjectItem;
console.log(projectItem)

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
const targetPercentage = 60 // 目标百分比
const percentage = ref(0)

const monthManageData = ref({})

const paymentManageData = reactive<{ contractAmount: number, contractPaymentAmount: number, contractUnPaymentAmount: number, inputInvoice: number, paidAmount: number, payableAmount: number, reconcileAmount: number, totalContract: number, totalVisa: number, visaAmount: number }>({
  contractAmount: 0,
  contractPaymentAmount: 0,
  contractUnPaymentAmount: 0,
  inputInvoice: 0,
  paidAmount: 0,
  payableAmount: 0,
  reconcileAmount: 0,
  totalContract: 0,
  totalVisa: 0,
  visaAmount: 0
})

// 付款进度
const paymentProgress = computed(() => {
  let num = (paymentManageData.paidAmount / paymentManageData.totalCost) * 100
  return num.toFixed(2)
});

const tablePaymentData = ref([])


const paymentProgressOption = ref<EChartsOption>({
  tooltip: {
    trigger: 'item'
  },
  legend: {
    right: '5%',
    left: 'center'
  },
  series: [
    {
      name: '签证+合同金额分析',
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
      data: [
        { value: 1048, name: '分包合同' },
        { value: 735, name: '采购合同' },
        { value: 580, name: '设备合同' },
        { value: 484, name: '劳务合同' },
        { value: 300, name: '其他合同' }
      ]
    }
  ]
})

const monthlyOutputOption = ref<EChartsOption>({
  // title: {
  //   text: '月度付款金额',
  //   left: 'left'
  // },
  xAxis: {
    type: 'category',
    data: ['2024-03', '2024-04', '2024-05', '2024-06', '2024-07', '2024-08', '2024-09']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [120, 200, 150, 80, 70, 110, 130],
      type: 'bar',
      itemStyle: {
        color: '#1197ff', // 设置柱状图的颜色
        barBorderRadius: [20, 20, 0, 0] // 设置圆角
      }
    }
  ]
})

onMounted(() => {

  getPaymentManage(projectItem.id)
  getMonthManage(projectItem.id);
  getTablePayment(projectItem.id)
  const intervalId = setInterval(() => {
    if (percentage.value < targetPercentage) {
      percentage.value = (percentage.value % 100) + 1
    } else {
      clearInterval(intervalId)
    }
  }, 10)
})

const getPaymentManage = (projectId: string) => {
  get({
    url: paymentManageUrl,
    headers: {
      Authorization: token
    },
    data: {
      projectId: projectId
    }
  }).then((res) => {
    Object.assign(paymentManageData, res.data);
  }).catch((error) => {
    // ElMessage.error('获取项目进度失败!')
    throw error
  })
}

const getMonthManage = (projectId: string) => {
  get({
    url: monthManageUrl,
    headers: {
      Authorization: token
    },
    data: {
      projectId: projectId
    }
  }).then((res) => {
    Object.assign(monthManageData, res.data);
    monthlyOutputOption.value.series[0].data = res.data.map((item: { monthCost: any }) => item.monthCost);
    monthlyOutputOption.value.xAxis.data = res.data.map((item: { monthName: any }) => item.monthName);
  }).catch((error) => {
    // ElMessage.error('获取项目进度失败!')
    throw error
  })
}

const getTablePayment = (projectId: string) => {
  get({
    url: tablePaymentUrl,
    headers: {
      Authorization: token
    },
    data: {
      projectId: projectId
    }
  }).then((res) => {
    tablePaymentData.value = res.data
  }).catch((error) => {
    // ElMessage.error('获取项目进度失败!')
  })
}
const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}
</script>

<style lang="scss">
.payment-anagement {
  height: 100%;
  width: 100%;

  .payment-anagement-tabs {
    .el-tabs__item {
      @include text-styles($important-text);
    }

    .payment-anagement-contract {
      display: flex;

      .payment-anagement-contract-title {
        font-size: 20px;
        font-weight: 600;
        margin-bottom: 20px;
      }

      .payment-anagement-contract-left {
        flex: 1;
        text-align: center;

        .payment-anagement-contract-left-title {
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 20px;
        }

        .payment-anagement-contract-left-chart {
          width: 800px;
          height: 400px;
        }

        .payment-anagement-contract-left-div {
          .payment-anagement-contract-left-div-chart {
            width: 800px;
            height: 400px;
          }
        }

        .payment-anagement-contract-left-line {
          width: 100%;
          height: 40px;
          display: flex;
          justify-content: space-between;
          margin-top: 20px;

          .payment-anagement-contract-left-line-left {
            text-align: left;
          }

          .payment-anagement-contract-left-line-right {
            text-align: right;
          }

          .payment-anagement-contract-left-line-num {
            @include text-styles($important-text);
          }
        }

        .payment-anagement-contract-left-label {
          margin-top: 20px;
          @include text-styles($note-text);
        }
      }

      .payment-anagement-contract-right {
        flex: 1;

        .payment-anagement-contract-right-title {
          text-align: left;
          margin-top: 20px;
          @include text-styles($important-text);
        }

        .payment-anagement-contract-right-div {
          margin: 20px 0;
          display: flex;

          .payment-anagement-contract-right-div-left {
            flex: 1;
            text-align: left;
          }

          .payment-anagement-contract-right-div-right {
            flex: 1;
            text-align: left;
          }
        }

        .payment-anagement-contract-right-div-line {
          text-align: left;
        }

        .payment-anagement-contract-right-bottom {
          text-align: left;

          .payment-anagement-contract-right-chart {
            width: 800px;
            height: 400px;
          }
        }
      }

      .payment-anagement-contract-right-chart {
        width: 100%;
        height: 340px;
      }
    }
  }
}
</style>
