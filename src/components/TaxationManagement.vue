<template>
  <div class="taxation-management">
    <el-tabs v-model="activeName" class="taxation-management-tabs" @tab-click="handleClick">
      <el-tab-pane label="看板" name="bulletin">
        <div class="taxation-management-bulletin">
          <div class="taxation-management-bulletin-title">应缴增值税</div>
          <el-row :gutter="24" justify="space-between">
            <el-col :span="6">
              <div class="taxation-management-bulletin-card box">
                <div class="taxation-management-bulletin-card-title">销项发票</div>
                <div class="taxation-management-bulletin-card-amount blue">￥{{ commissionData.outputInvoice }}</div>
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-xxfapiao"></use>
                </svg>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="taxation-management-bulletin-card box">
                <div class="card-content">
                  <div class="taxation-management-bulletin-card-title">进项发票</div>
                  <div class="taxation-management-bulletin-card-amount blue">￥{{ commissionData.inputTax }}</div>
                </div>
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-jxfapiao"></use>
                </svg>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="taxation-management-bulletin-card box">
                <div class="card-content">
                  <div class="taxation-management-bulletin-card-title">销项税额</div>
                  <div class="taxation-management-bulletin-card-amount blue">￥{{ commissionData.outputTax }}</div>
                </div>
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-xxshuie"></use>
                </svg>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="taxation-management-bulletin-card box">
                <div class="card-content">
                  <div class="taxation-management-bulletin-card-title">进项税额</div>
                  <div class="taxation-management-bulletin-card-amount blue">￥{{ commissionData.inputTax }}</div>
                </div>
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-jxshuie"></use>
                </svg>
              </div>
            </el-col>
          </el-row>

          <div class="taxation-management-bulletin-title">其他税费</div>

          <el-row :gutter="24">
            <el-col :span="6">
              <div class="taxation-management-bulletin-card box">
                <div class="card-content">
                  <div class="taxation-management-bulletin-card-title">销售额</div>
                  <div class="taxation-management-bulletin-card-amount blue">￥{{ commissionData.salesVolume }}</div>
                </div>
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-xiaoshoue"></use>
                </svg>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="taxation-management-bulletin-card box">
                <div class="card-content">
                  <div class="taxation-management-bulletin-card-title">工会经费</div>
                  <div class="taxation-management-bulletin-card-amount blue">￥{{ commissionData.unionFunds }}</div>
                </div>
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-jingfei"></use>
                </svg>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="taxation-management-bulletin-card box">
                <div class="card-content">
                  <div class="taxation-management-bulletin-card-title">采购额</div>
                  <div class="taxation-management-bulletin-card-amount blue">￥{{ commissionData.purchaseVolume }}</div>
                </div>
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-caigoue"></use>
                </svg>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="taxation-management-bulletin-card box">
                <div class="card-content">
                  <div class="taxation-management-bulletin-card-title">企业所得税</div>
                  <div class="taxation-management-bulletin-card-amount blue">￥{{ commissionData.enterpriseIncomeTax }}
                  </div>
                </div>
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-qiyesuodeshui"></use>
                </svg>
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="taxation-management-amount">
          <div class="taxation-management-amount-top">
            <div class="taxation-management-amount-top-title">发票金额</div>
            <div class="taxation-management-amount-top-tag">
              <span class="taxation-management-amount-top-tag-xx">销项发票</span>
              <span class="taxation-management-amount-top-tag-jx">进项发票</span>
            </div>
          </div>
          <app-chart class="taxation-management-amount-content" :option="invoiceValueOption"
            :autoresize="true"></app-chart>
        </div>

        <div class="taxation-management-bulletin-bottom">
          <div class="taxation-management-bulletin-bottom-statistics">
            <div class="taxation-management-bulletin-bottom-statistics-title">发票税额</div>
            <app-chart class="taxation-management-bulletin-bottom-statistics-content" :option="invoiceAmountOption"
              :autoresize="true"></app-chart>
          </div>
          <DividerLine></DividerLine>
          <div class="taxation-management-bulletin-bottom-added">
            <div class="taxation-management-bulletin-bottom-added-title">增值税额</div>
            <app-chart class="taxation-management-bulletin-bottom-added-content" :option="addedAmountOption"
              :autoresize="true"></app-chart>
          </div>
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
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import { use } from 'echarts/core'
import { BarChart, LineChart } from 'echarts/charts'
import { GridComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import type { ComposeOption } from 'echarts/core'
import type { LineSeriesOption } from 'echarts/charts'
import type { GridComponentOption } from 'echarts/components'
import DividerLine from './divider/DividerLine.vue'
import { commissionManageUrl, invoiceMonthManageUrl, monthInvoiceUrl, monthTaxUrl } from '@/api/url'
import { post, get } from '../api/http'
import { useAuthStore } from '@/store'
use([GridComponent, BarChart, LineChart, CanvasRenderer])

type EChartsOption = ComposeOption<GridComponentOption | LineSeriesOption>

const store = useAuthStore()
const token = store.getToken;
const projectItem = store.getProjectItem;

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

const colors = ['#1197ff', '#fc904d'];
// const commissionData = ref<object>({});
const invoiceMonthManageData = ref<object>({});

const commissionData = reactive<{ enterpriseIncomeTax: number, inputTax: number, outputInvoice: number, outputTax: number, purchaseVolume: number, salesVolume: number, unionFunds: number, vATPayable: number }>({
  enterpriseIncomeTax: 0,
  inputTax: 0,
  outputInvoice: 0,
  outputTax: 0,
  purchaseVolume: 0,
  salesVolume: 0,
  unionFunds: 0,
  vATPayable: 0
})

const invoiceValueOption = ref<EChartsOption>({
  // color: colors,
  xAxis: {
    type: 'category',
    data: []
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      name: '进项发票',
      data: [120, 110, 234, 159, 218, 150, 13, 70, 110, 130, 172, 104],
      type: 'bar',
      itemStyle: {
        color: '#fc904d', // 设置柱状图的颜色
        barBorderRadius: 40 // 设置圆角
      }
    },
    {
      name: '销项发票',
      data: [120, 110, 136, 150, 70, 110, 130, 200, 234, 159, 218, 69],
      type: 'bar',
      itemStyle: {
        color: '#1197ff', // 设置柱状图的颜色
        barBorderRadius: 40 // 设置圆角
      }
    }
  ]
})

const invoiceAmountOption = ref<EChartsOption>({
  xAxis: {
    type: 'category',
    data: []
  },
  yAxis: {
    type: 'value'
  },
  // series: [
  //   {
  //     data: [
  //       120,
  //       110,
  //       150,
  //       {
  //         value: 290,
  //         itemStyle: {
  //           color: '#FF8C1C'
  //         }
  //       },
  //       70,
  //       110,
  //       130
  //     ],
  //     type: 'bar',
  //     itemStyle: {
  //       color: '#1197ff',
  //       barBorderRadius: [20, 20, 0, 0]
  //     }
  //   }
  // ]
  series: [
    {
      name: '进项发票',
      data: [120, 110, 234, 159, 218, 150, 13, 70, 110, 130, 172, 104],
      type: 'bar',
      itemStyle: {
        color: '#fc904d', // 设置柱状图的颜色
        barBorderRadius: 40 // 设置圆角
      }
    },
    {
      name: '销项发票',
      data: [120, 110, 136, 150, 70, 110, 130, 200, 234, 159, 218, 69],
      type: 'bar',
      itemStyle: {
        color: '#1197ff', // 设置柱状图的颜色
        barBorderRadius: 40 // 设置圆角
      }
    }
  ]
})

const addedAmountOption = ref<EChartsOption>({
  xAxis: {
    type: 'category',
    data: []
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [150, 230, 224, 218, 135, 147, 260],
      type: 'line',
      itemStyle: {
        color: '#1197ff'
      }
    }
  ]
})

onMounted(() => {
  getCommission(projectItem.id);
  getInvoiceMonthManage(projectItem.id);
  getMonthInvoice(projectItem.id);
  getMonthTax(projectItem.id);
})

const getCommission = (projectId: string) => {
  get({
    url: commissionManageUrl,
    headers: {
      Authorization: token
    },
    data: {
      projectId: projectId
    }
  }).then((res) => {
    Object.assign(commissionData, res.data);
  }).catch((error) => {
    // ElMessage.error('获取项目进度失败!')
    throw error
  })
};

const getInvoiceMonthManage = (projectId: string) => {
  get({
    url: invoiceMonthManageUrl,
    headers: {
      Authorization: token
    },
    data: {
      projectId: projectId
    }
  }).then((res) => {
    Object.assign(invoiceMonthManageData, res.data);
    addedAmountOption.value.series[0].data = res.data.map((item: { monthCost: any }) => item.monthCost);
    addedAmountOption.value.xAxis.data = res.data.map((item: { monthName: any }) => item.monthName);
  }).catch((error) => {
    // ElMessage.error('获取项目进度失败!')
    throw error
  })
};

const getMonthInvoice = (projectId: string) => {
  get({
    url: monthInvoiceUrl,
    headers: {
      Authorization: token
    },
    data: {
      projectId: projectId
    }
  }).then((res) => {
    invoiceValueOption.value.xAxis.data = res.data.map((item: { monthName: any }) => item.monthName);
    invoiceValueOption.value.series[0].data = res.data.map((item: { inputInvoice: any }) => item.inputInvoice);
    invoiceValueOption.value.series[1].data = res.data.map((item: { outputInvoice: any }) => item.outputInvoice);
  })
};

const getMonthTax = (projectId: string) => {
  get({
    url: monthTaxUrl,
    headers: {
      Authorization: token
    },
    data: {
      projectId: projectId
    }
  }).then((res) => {
    invoiceAmountOption.value.xAxis.data = res.data.map((item: { monthName: any }) => item.monthName);
    invoiceAmountOption.value.series[0].data = res.data.map((item: { inputTax: any }) => item.inputTax);
    invoiceAmountOption.value.series[1].data = res.data.map((item: { outputTax: any }) => item.outputTax);
  })
}


const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}
</script>

<style lang="scss">
.taxation-management {
  width: 100%;
  height: auto;

  .taxation-management-tabs {
    .el-tabs__item {
      @include text-styles($important-text);
    }

    .taxation-management-bulletin {
      .taxation-management-bulletin-title {
        @include text-styles($important-text);
        text-align: left;
        margin: 20px 0;
      }

      .taxation-management-bulletin-card {
        position: relative;
        background-color: #e7f4ff;
        border-radius: 4px;
        text-align: left;
        padding: 10px 20px;
        padding-right: 40px;

        .card-content {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 100%;
        }

        .taxation-management-bulletin-card-title {
          @include text-styles($body-text);
        }

        .taxation-management-bulletin-card-amount {
          @include text-styles($important-text);
        }

        .icon {
          position: absolute;
          top: 20px;
          right: 10px;
          // color: $primary-color;
          color: #9ad3ff;
        }
      }

      .taxation-management-bulletin-general {
        width: 400px;

        .taxation-management-bulletin-general-title {
          display: flex;
          align-items: center;

          .taxation-management-bulletin-name {
            font-size: 18px;
            color: #6b778c;
          }
        }

        .taxation-management-bulletin-general-content {
          text-align: left;
        }
      }
    }

    .taxation-management-amount {
      .taxation-management-amount-top {
        display: flex;
        justify-content: space-between;

        .taxation-management-amount-top-title {
          margin-top: 20px;
          @include text-styles($important-text);
        }

        .taxation-management-amount-top-tag {
          @include text-styles($desc-text-white);

          .taxation-management-amount-top-tag-xx {
            color: #fff;
            background-color: $primary-color;
            border: 1px solid #0091ff;
            border-radius: 2px;
          }

          .taxation-management-amount-top-tag-jx {
            color: #fff;
            background-color: #fc904d;
            border: 1px solid #ff6200;
            border-radius: 2px;
          }
        }
      }

      .taxation-management-amount-content {
        @include text-styles($body-text);
        width: 100%;
        height: 300px;
      }
    }

    .taxation-management-bulletin-line {
      margin: 10px 0;
      width: 100%;
      height: 20px;
    }

    .taxation-management-bulletin-bottom {
      display: flex;

      .taxation-management-bulletin-bottom-statistics {
        width: 100%;
        height: auto;

        .taxation-management-bulletin-bottom-statistics-title {
          @include text-styles($important-text);
          margin-top: 20px;
        }

        .taxation-management-bulletin-bottom-statistics-content {
          width: 800px;
          height: 400px;
        }
      }

      .taxation-management-bulletin-bottom-added {
        width: 100%;
        height: auto;

        .taxation-management-bulletin-bottom-added-title {
          font-size: 18px;
          font-weight: 600;
          color: #333333;
        }

        .taxation-management-bulletin-bottom-added-content {
          width: 100%;
          height: 400px;
        }
      }
    }
  }
}
</style>
