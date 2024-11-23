<template>
  <div class="company">
    <div class="company-header">
      <div class="card item-quantity box">
        <el-icon class="card-icon" :size="24">
          <Memo />
        </el-icon>
        <div class="card-right">
          <div class="title">开工项目数</div>
          <div class="num">{{ companyStatisticsData.projectStartedNum }}</div>
        </div>
      </div>

      <div class="card contract box">
        <el-icon class="card-icon" :size="24">
          <Tickets />
        </el-icon>
        <div class="card-right">
          <div class="title">收入合同数</div>
          <div class="num">{{ companyStatisticsData.revenueContract }}</div>
        </div>
      </div>

      <div class="card output box">
        <el-icon class="card-icon" :size="24">
        </el-icon>
        <div class="card-right">
          <div class="title">产值金额</div>
          <div class="num">{{ companyStatisticsData.outputAmount }}</div>
        </div>
      </div>

      <div class="card collection box">
        <el-icon class="card-icon" :size="24">
          <Money />
        </el-icon>
        <div class="card-right">
          <div class="title">收入金额</div>
          <div class="num">{{ companyStatisticsData.collectionAmount }}</div>
        </div>
      </div>
    </div>

    <div class="company-content">
      <div class="company-project-list">
        <div class="company-income-expenses">
          <el-card class="card box">
            <template #header>
              <div class="card-header">
                <span>收入合同</span>
              </div>
            </template>
            <div class="income-expenses-content">
              <div class="income-expenses-content-line">
                <span class="title">（合同+签证）金额:</span>
                <span class="num">￥{{ companyStatisticsData.contractVisaAmount }}</span>
              </div>
              <el-progress :text-inside="true" :show-text="true" :stroke-width="16" :percentage="70" />
              <div class="income-expenses-content-center">
                <div class="income-expenses-content-center-left">
                  <div class="title">合同金额</div>
                  <div class="num">￥{{ companyStatisticsData.contractAmount }}</div>
                </div>
                <div class="income-expenses-content-center-right">
                  <div class="title">签证金额</div>
                  <div class="num">￥{{ companyStatisticsData.visaAmount }}</div>
                </div>
              </div>
              <div class="income-expenses-content-line">
                <span class="title">合同收款:</span>
                <span class="num">￥{{ companyStatisticsData.revenueContractAmount }}</span>
              </div>
              <el-progress :text-inside="true" :show-text="true" :stroke-width="16" :percentage="70" />
            </div>
          </el-card>
        </div>
        <div class="company-income-expenses">
          <el-card class="card box">
            <template #header>
              <div class="card-header">
                <span>支出合同</span>
              </div>
            </template>
            <div class="income-expenses-content">
              <div class="income-expenses-content-line">
                <span class="title">（合同+签证）金额:</span>
                <span class="num">￥{{ companyStatisticsData.expendContractVisaAmount }}</span>
              </div>
              <el-progress :text-inside="true" :show-text="true" :stroke-width="16" :percentage="70" />
              <div class="income-expenses-content-center">
                <div class="income-expenses-content-center-left">
                  <div class="title">合同金额</div>
                  <div class="num">￥{{ companyStatisticsData.expendContractAmount }}</div>
                </div>
                <div class="income-expenses-content-center-right">
                  <div class="title">签证金额</div>
                  <div class="num">￥{{ companyStatisticsData.expendVisaAmount }}</div>
                </div>
              </div>
              <div class="income-expenses-content-line">
                <span class="title">合同收款:</span>
                <span class="num">￥{{ companyStatisticsData.expendRevenueContractAmount }}</span>
              </div>
              <el-progress :text-inside="true" :show-text="true" :stroke-width="16" :percentage="70" />
            </div>
          </el-card>
        </div>
      </div>


      <el-row :gutter="24">
        <el-card class="card-col box">
          <template #header>
            <div class="card-header">
              <span>回款管理</span>
            </div>
          </template>
          <div class="card-li">
            <div class="card-li-left">
              <span class="title">已收:</span>
              <span class="num">{{ contractReceivedAmount }}</span>
            </div>
            <div class="card-li-left">
              <span class="title">未收:</span>
              <span class="num">{{ contractUncollectedAmount }}</span>
            </div>
          </div>
          <app-chart class="company-chart" :option="collectionOption" :autoresize="true"></app-chart>
        </el-card>
        <el-card class="card-col box">
          <template #header>
            <div class="card-header">
              <span>付款管理</span>
            </div>
          </template>
          <div class="card-li">
            <div class="card-li-left">
              <span class="title">已付:</span>
              <span class="num">{{ contractPaymentAmount }}</span>
            </div>
            <div class="card-li-left">
              <span class="title">应付:</span>
              <span class="num">{{ contractUnPaymentAmount }}</span>
            </div>
          </div>
          <app-chart class="company-chart" :option="paymentOption" :autoresize="true"></app-chart>
        </el-card>
        <!-- <el-card class="card-col box">
          <template #header>
            <div class="card-header">
              <span>支出合同</span>
            </div>
          </template>
          <div class="card-line">
            <span class="title">总金额:</span>
            <span class="num">186955</span>
          </div>
          <el-progress :text-inside="true" :show-text="true" :stroke-width="16" :percentage="70" />
          <div class="line">
            <div class="text item">
              <li class="title">合同金额</li>
              <li class="num">186955</li>
            </div>
            <div class="text item">
              <li class="title">签证金额</li>
              <li class="num">186955</li>
            </div>
          </div>
          <div class="card-line">
            <span class="title">合同收款</span>
            <span class="num">186955</span>
          </div>
          <el-progress :text-inside="true" :show-text="true" :stroke-width="16" :percentage="70" />
        </el-card> -->
        <el-card class="card-col box">
          <template #header>
            <div class="card-header">
              <span>成本分析</span>
            </div>
          </template>
          <div class="card-content">
            <li><span class="title">总成本:</span><span class="num">{{ totalCost }}</span></li>
            <app-chart class="company-chart" :option="costOption" :autoresize="true"></app-chart>
          </div>
        </el-card>
      </el-row>

      <!-- <el-row :gutter="24">
        <el-card class="card-col box">
          <template #header>
            <div class="card-header">
              <span>收入合同</span>
            </div>
          </template>

          <div class="card-line">
            <span class="title">总金额:</span>
            <span class="num">￥{{ companyStatisticsData.contractVisaAmount }}</span>
          </div>
          <el-progress :text-inside="true" :show-text="true" :stroke-width="16" :percentage="70" />
          <div class="line">
            <div class="text item">
              <li class="title">合同金额</li>
              <li class="num">￥{{ companyStatisticsData.contractAmount }}</li>
            </div>
            <div class="text item">
              <li class="title">签证金额</li>
              <li class="num">￥{{ companyStatisticsData.visaAmount }}</li>
            </div>
          </div>
          <div class="card-line">
            <li class="title">合同收款</li>
            <li class="num">￥{{ companyStatisticsData.revenueContractAmount }}</li>
          </div>
          <el-progress :text-inside="true" :show-text="true" :stroke-width="16" :percentage="70" />
        </el-card>

        <el-card class="card-col box">
          <template #header>
            <div class="card-header">
              <span>资金分析</span>
            </div>
          </template>
          <li class="text item">
            <span class="title">资金余额:</span>
            <span class="num">186955</span>
          </li>
          <app-chart class="company-chart" :option="balanceOption" :autoresize="true"></app-chart>
        </el-card>

        <el-card class="card-col box">
          <template #header>
            <div class="card-header">
              <span>采购分析</span>
            </div>
          </template>
          <app-chart class="company-chart" :option="procureOption" :autoresize="true"></app-chart>
        </el-card>
      </el-row> -->

      <el-row :gutter="24">
        <el-card class="card-bottom box">
          <template #header>
            <div class="card-header">
              <span>发票分析</span>
            </div>
          </template>

          <div class="invoice">
            <el-row :gutter="24">
              <el-col :span="8">
                <img src="@/assets/images/xiaoxiangfapiao.png" />
              </el-col>
              <el-col :span="8">
                <div class="invoice-item">
                  <div class="invoice-item-title">销项发票</div>
                  <div class="invoice-item-num">{{ companyCommissionManageData.outputInvoice }}</div>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="invoice-item">
                  <div class="invoice-item-title">进项发票</div>
                  <div class="invoice-item-num">{{ companyCommissionManageData.inputTax }}</div>
                </div>
              </el-col>
              <el-col :span="8">
                <img src="@/assets/images/xiaoxiangshuie.png" />
              </el-col>
              <el-col :span="8">
                <div class="invoice-item">
                  <div class="invoice-item-title">销项税额</div>
                  <div class="invoice-item-num">{{ companyCommissionManageData.outputTax }}</div>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="invoice-item">
                  <div class="invoice-item-title">进项税额</div>
                  <div class="invoice-item-num">{{ companyCommissionManageData.payInvoiceTax }}</div>
                </div>
              </el-col>
              <el-col :span="8">
                <img src="@/assets/images/zengzhishui.png" />
              </el-col>
              <el-col :span="8">
                <div class="invoice-item">
                  <div class="invoice-item-title">应交增值税</div>
                  <div class="invoice-item-num">{{ companyCommissionManageData.VATPayable }}</div>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-card>

        <el-card class="card-bottom box">
          <template #header>
            <div class="card-header">
              <span>税费管理</span>
            </div>
          </template>
          <div class="taxation">
            <el-row :gutter="24">
              <el-col :span="8">
                <img src="@/assets/images/xiaoxiangfapiao.png" />
              </el-col>
              <el-col :span="8">
                <div class="invoice-item">
                  <div class="invoice-item-title">销项发票</div>
                  <div class="invoice-item-num">{{ companyCommissionManageData.outputInvoice }}</div>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="invoice-item">
                  <div class="invoice-item-title">进项发票</div>
                  <div class="invoice-item-num">{{ companyCommissionManageData.inputTax }}</div>
                </div>
              </el-col>
              <el-col :span="8">
                <img src="@/assets/images/xiaoxiangshuie.png" />
              </el-col>
              <el-col :span="8">
                <div class="invoice-item">
                  <div class="invoice-item-title">销项税额</div>
                  <div class="invoice-item-num">{{ companyCommissionManageData.outputTax }}</div>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="invoice-item">
                  <div class="invoice-item-title">进项税额</div>
                  <div class="invoice-item-num">{{ companyCommissionManageData.payInvoiceTax }}</div>
                </div>
              </el-col>
              <el-col :span="8">
                <img src="@/assets/images/zengzhishui.png" />
              </el-col>
              <el-col :span="8">
                <div class="invoice-item">
                  <div class="invoice-item-title">应交增值税</div>
                  <div class="invoice-item-num">{{ companyCommissionManageData.VATPayable }}</div>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-card>
      </el-row>

    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted, computed } from 'vue'
import { use } from 'echarts/core'
import { RadarChart } from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'
import type { ComposeOption } from 'echarts/core'
import type { RadarSeriesOption } from 'echarts/charts'
import { get } from '@/api/http'
import { companyStatisticsUrl, companyRefundManageUrl, companyPaymentManageUrl, companyCostManageUrl, companyCommissionManageUrl } from '@/api/url'
import { useAuthStore } from '@/store'
const store = useAuthStore()
const getToken = store.getToken;
const projectItem = store.getProjectItem;

use([RadarChart, CanvasRenderer])

type EChartsOption = ComposeOption<RadarSeriesOption>
const months = [
  '2024-01',
  '2024-02',
  '2024-03',
  '2024-04',
  '2024-05',
  '2024-06',
  '2024-07',
  '2024-08',
  '2024-09',
  '2024-10',
  '2024-11',
  '2024-12'
]
const balanceData = [0, 0, 0, 500, 2000, 6000, 3000, 0, 0, 1000, 5000, 500]

const companyStatisticsData = reactive<{ projectStartedNum: number, revenueContract: number, outputAmount: number, collectionAmount: number, contractVisaAmount: number, contractAmount: number, visaAmount: number, revenueContractAmount: number, expendContractVisaAmount: number, expendVisaAmount: number }>({
  projectStartedNum: 0,
  revenueContract: 0,
  outputAmount: 0,
  collectionAmount: 0,
  contractVisaAmount: 0,
  contractAmount: 0,
  visaAmount: 0,
  revenueContractAmount: 0,
  expendContractVisaAmount: 0,
  expendContractAmount: 0,
  expendVisaAmount: 0
});
// 已收
const contractReceivedAmount = ref(0);
// 未收
const contractUncollectedAmount = ref(0);

// 已付
const contractPaymentAmount = ref(0);
// 应付
const contractUnPaymentAmount = ref(0);

// const companyRefundManageData = reactive<{ contractAmount: number, contractReceivedAmount: number, contractUncollectedAmount: number, outputAmount: number, outputReceivedAmount: number, outputUncollectedAmount: number, receivableAmount: number, receivedAmount: number, receivedInvoiceAmount: number, totalContract: number, totalVisa: number }>({
//   contractAmount: 0,
//   contractReceivedAmount: 0,
//   contractUncollectedAmount: 0,
// });

// const companyPaymentManageData = reactive<{ contractAmount: number, contractReceivedAmount: number, contractUncollectedAmount: number, outputAmount: number, outputReceivedAmount: number, outputUncollectedAmount: number, receivableAmount: number, receivedAmount: number, receivedInvoiceAmount: number, totalContract: number, totalVisa: number }>({
//   contractAmount: 0,
//   contractReceivedAmount: 0,
//   contractUncollectedAmount: 0
// });

const totalCost = ref(0);
const companyCommissionManageData = reactive<{ VATPayable: number, outputInvoice: number, inputTax: number, payInvoiceTax: number, outputTax: number, salesVolume: number, unionFunds: number, purchaseVolume: number, enterpriseIncomeTax: number }>({
  VATPayable: 0,
  outputInvoice: 0,
  inputTax: 0,
  payInvoiceTax: 0,
  outputTax: 0,
  salesVolume: 0,
  unionFunds: 0,
  purchaseVolume: 0,
  enterpriseIncomeTax: 0
})

const balanceOption = ref<EChartsOption>({
  xAxis: {
    type: 'category',
    data: months
  },
  yAxis: {
    type: 'value',
    min: 0,
    max: 6000
  },
  series: [
    {
      name: '余额',
      type: 'line',
      data: balanceData,
      smooth: true,
      itemStyle: {
        color: '#1197ff' // 设置颜色
      },
    }
  ]
})

const costOption = ref<EChartsOption>({
  tooltip: {
    trigger: 'item'
  },
  legend: {
    top: '5%',
    left: 'center'
  },
  series: [
    {
      name: '成本分析',
      type: 'pie',
      radius: ['40%', '70%'],
      avoidLabelOverlap: false,
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

const collectionOption = ref<EChartsOption>({
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
      type: 'bar',
      showBackground: true,
      itemStyle: {
        color: '#409eff' // 设置颜色
      },
    }
  ]
})

const paymentOption = ref<EChartsOption>({
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
      type: 'bar',
      showBackground: true,
      itemStyle: {
        color: '#409eff' // 设置颜色
      },
    }
  ]
})

const procureOption = ref<EChartsOption>({
  radar: {
    indicator: [
      { name: '采购合同', max: 6500 },
      { name: '合同执行', max: 16000 },
      { name: '采购订单', max: 30000 },
      { name: '入库-退货', max: 38000 },
      { name: '采购发票', max: 52000 },
      { name: '付款登记', max: 25000 }
    ]
  },
  series: [
    {
      name: 'Budget vs spending',
      type: 'radar',
      data: [
        {
          value: [4200, 3000, 20000, 35000, 50000, 18000],
          name: 'Allocated Budget'
        },
        {
          value: [5000, 14000, 28000, 26000, 42000, 21000],
          name: 'Actual Spending'
        }
      ]
    }
  ]
})
onMounted(() => {

  getCompanyStatistics(projectItem.id);
  getPanyRefundManage(projectItem.id);
  getCompanyPaymentManage(projectItem.id);
  getCompanyCostManage(projectItem.id);
  getCompanyCommissionManage(projectItem.id);
})
const getCompanyStatistics = (projectId: string) => {
  get({
    url: companyStatisticsUrl,
    headers: {
      Authorization: getToken
    },
    data: {
      projectId: projectId
    }
  }).then((res: { data: any }) => {
    Object.assign(companyStatisticsData, res.data);
  }).catch((error: any) => {
    // ElMessage.error('获取项目信息失败!')
    throw error
  })
}

const getPanyRefundManage = (projectId: string) => {
  get({
    url: companyRefundManageUrl,
    headers: {
      Authorization: getToken
    },
    data: {
      projectId: projectId
    }
  }).then((res: { data: any }) => {
    // Object.assign(companyRefundManageData, res.data);
    contractReceivedAmount.value = res.data.contractReceivedAmount;
    contractUncollectedAmount.value = res.data.contractUncollectedAmount;
    collectionOption.value.series[0].data = res.data.refundCostList.map((item: { monthCost: any }) => item.monthCost);
    collectionOption.value.xAxis.data = res.data.refundCostList.map((item: { monthName: any }) => item.monthName);
  }).catch((error: any) => {
    // ElMessage.error('获取项目信息失败!')
    throw error
  })
}

const getCompanyPaymentManage = (projectId: string) => {
  get({
    url: companyPaymentManageUrl,
    headers: {
      Authorization: getToken
    },
    data: {
      projectId: projectId
    }
  }).then((res: { data: any }) => {
    // Object.assign(companyPaymentManageData, res.data);
    contractPaymentAmount.value = res.data.contractPaymentAmount;
    contractUnPaymentAmount.value = res.data.contractUnPaymentAmount;

    paymentOption.value.series[0].data = res.data.refundCostList.map((item: { monthCost: any }) => item.monthCost);
    paymentOption.value.xAxis.data = res.data.refundCostList.map((item: { monthName: any }) => item.monthName);

  }).catch((error: any) => {
    // ElMessage.error('获取项目信息失败!')
    throw error
  })
}

const getCompanyCostManage = (projectId: string) => {
  get({
    url: companyCostManageUrl,
    headers: {
      Authorization: getToken
    },
    data: {
      projectId: projectId
    }
  }).then((res: { data: any }) => {
    console.log(res.data);

    costOption.value.series[0].data = [
      { value: res.data.laborCost, name: '人工成本' },
      { value: res.data.materialCost, name: '材料成本' },
      { value: res.data.equipmentCost, name: '设备成本' },
      { value: res.data.expenseCost, name: '费用成本' },
      { value: res.data.subcontractCost, name: '分包成本' },
      { value: res.data.otherCost, name: '其他成本' }
    ]
    totalCost.value = res.data.totalCost;
  }).catch((error: any) => {
    // ElMessage.error('获取项目信息失败!')
    throw error
  })
}

const getCompanyCommissionManage = (projectId: string) => {
  get({
    url: companyCommissionManageUrl,
    headers: {
      Authorization: getToken
    },
    data: {
      projectId: projectId
    }
  }).then((res: { data: any }) => {
    Object.assign(companyCommissionManageData, res.data);
  }).catch((error: any) => {
    // ElMessage.error('获取项目信息失败!')
    throw error
  })
}


</script>

<style lang="scss">
.company {
  width: 100%;
  height: auto;

  .company-header {
    margin: 20px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .card {
      padding: 20px;
      display: flex;
      align-items: center;
      width: calc(25% - 20px);
      height: 60px;
      color: #ffffff;
      border-radius: 10px;

      .card-right {
        margin-left: 10px;
        text-align: left;
      }

      .fund-line {
        width: 400px;
        height: 300px;
      }
    }

    .item-quantity {
      background: #10b19e;
    }

    .contract {
      background: #4d7cfe;
    }

    .output {
      background: #f58018;
    }

    .collection {
      background: #2cacfe;
    }
  }

  .company-content {
    display: block;

    .company-project-list {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .company-income-expenses {
        display: block;
        background: #ffffff;
        border-radius: 10px;

        .income-expenses-header {
          border-bottom: 1px solid #e6e6e6;
          font-size: 18px;
          font-weight: 800;
          color: #222222;
          padding-bottom: 10px;
        }

        .income-expenses-content {
          display: inline;
          margin-top: 20px;
          width: 100%;
          height: auto;


          .income-expenses-content-line {
            width: 100%;
            height: 60px;
            line-height: 60px;
            display: flex;
            justify-content: space-between;

            .title {
              text-align: left;
              font-size: 16px;
              font-weight: 600;
              margin-bottom: 10px;
              color: #333333;
            }

            .num {
              text-align: right;
              font-size: 16px;
              color: #333333;
            }
          }

          .income-expenses-content-center {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            height: 60px;

            .income-expenses-content-center-left {}

            .income-expenses-content-center-right {}
          }
        }
      }
    }



    .item {
      margin-bottom: 10px;
    }

    .line {
      margin: 20px 0 10px 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .card {
      height: auto;
      width: 870px;
      text-align: left;
      box-shadow: none;
      border-radius: 10px;
    }

    .card-col {
      height: auto;
      margin: 10px 10px 10px 12px;
      width: 577px;
      text-align: left;
      box-shadow: none;
      border-radius: 10px;

      .card-li {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .company-chart {
        width: 577px;
        height: 260px;
      }
    }

    .card-bottom {
      height: auto;
      margin: 10px 10px 10px 12px;
      width: 870px;
      text-align: left;
      box-shadow: none;
      border-radius: 10px;

      .taxation {
        width: 870px;
        height: 200px;
        overflow: hidden;

        .invoice-item {
          display: inline-block;

          .invoice-item-title {
            font-size: 16px;
          }

          .invoice-item-num {
            font-size: 16px;
            font-weight: 600;
            color: #333333;
          }
        }

      }

      .invoice {
        width: 870px;
        height: 200px;
        overflow: hidden;

        .invoice-item {
          display: inline-block;

          .invoice-item-title {
            font-size: 16px;
          }

          .invoice-item-num {
            font-size: 16px;
            font-weight: 600;
            color: #333333;
          }
        }
      }
    }
  }
}
</style>
