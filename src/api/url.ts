import { baseURL } from './axios.config'

// 登录
export const doLogin = baseURL + 'admin/upms/login/doLogin'

// 退出登录
export const doLogout = baseURL + 'admin/upms/login/doLogout'

// 字典
export const dictList = baseURL + 'admin/upms/globalDict/list'

// 字典子类
export const dictItemList = baseURL + 'admin/upms/globalDict/listAll'

// 添加子类
export const dictAddItem = baseURL + 'admin/upms/globalDict/addItem'

// 删除子类
export const dictDeleteItem = baseURL + 'admin/upms/globalDict/deleteItem'

// 编辑子类
export const dictUpdateItem = baseURL + 'admin/upms/globalDict/updateItem'

export const projectTotalBudget = baseURL + 'kanban/analyze/project/total/budget';

export const projectList = baseURL + 'kanban/analyze/ProjectProgressVo';

// 项目进度管理
export const projectProgressUrl = baseURL + 'kanban/analyze/project/progress';

// 项目成本进度
export const progressManageUrl = baseURL + 'kanban/analyze/project/progress/manage';
// 月度成本管理
export const monthCostUrl = baseURL + 'kanban/analyze/project/month/cost';

// 回款管理
export const refundManageUrl = baseURL + 'kanban/analyze/project/refund/manage';

// 回款管理-月度产值统计
export const monthOutputUrl = baseURL + 'kanban/analyze/project/refund/manage/month/output';

// 采购管理
export const purchaseManageUrl = baseURL + 'kanban/analyze/project/purchase/manage';

// 付款管理
export const paymentManageUrl = baseURL + 'kanban/analyze/project/payment/manage';

// 付款管理-月度付款金额
export const monthManageUrl = baseURL + 'kanban/analyze/project/payment/month/manage';

// 税费管理
export const commissionManageUrl = baseURL + 'kanban/analyze/project/commission/manage';

// 发票金额-月度发票金额
export const invoiceMonthManageUrl = baseURL + 'kanban/analyze/project/invoice/month/manage';

// 利润管理
export const profitManageUrl = baseURL + 'kanban/analyze/project/profit/manage';

// 利润管理-月度收支盈余
export const profitMonthManageUrl = baseURL + 'kanban/analyze/project/profit/month/manage';

// 成本管理
export const costManageUrl = baseURL + 'kanban/analyze/project/cost/manage';

// 项目总成本
export const projectTotalCost = baseURL + 'kanban/analyze/project/total/cost';

// 公司看板统计
export const companyStatisticsUrl = baseURL + 'kanban/analyze/project/company/statistics';

// 公司看板回款管理
export const companyRefundManageUrl = baseURL + 'kanban/analyze/project/company/refund/manage';

// 公司看板付款管理
export const companyPaymentManageUrl = baseURL + 'kanban/analyze/project/company/payment/manage';

// 公司看板成本管理
export const companyCostManageUrl = baseURL + 'kanban/analyze/project/company/cost/manage';

// 公司看板税费管理
export const companyCommissionManageUrl = baseURL + 'kanban/analyze/project/company/commission/manage';

// 项目列表
export const projectListUrl = baseURL + 'kanban/analyze/project/list';

// 成本管理-表格
export const tableCostUrl = baseURL + 'kanban/analyze/project/table/cost';

// 回款管理-表格
export const tableRefundUrl = baseURL + 'kanban/analyze/project/refund/table/manage';

// 付款管理-表格
export const tablePaymentUrl = baseURL + 'kanban/analyze/project/payment/table/manage';
// 采购管理-表格
export const tablePurchaseUrl = baseURL + 'kanban/analyze/project/purchase/table/manage';

//材料分析曲线
export const analysisCurveUrl = baseURL + 'kanban/analyze/project/material/analysis/curve';

// 发票金额-月份统计
export const monthInvoiceUrl = baseURL + 'kanban/analyze/project/receive/month/invoice';

// 发票税额-月份统计
export const monthTaxUrl = baseURL + 'kanban/analyze/project/receive/month/tax';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $urlPath: Record<string, string>
  }
}
