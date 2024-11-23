<template>
  <!-- <Layout> -->
  <div class="basic">
    <div class="list">
      <div v-for="item in dictListData" :key="item.title" @click="selectItem(item)">
        <div class="list-item" v-if="item.dictCode === 'reimbursementtype'">
          <img src="../../assets/images/baoxiaoleixing.png" />
          <div class="title">{{ item.dictName }}</div>
        </div>
        <div class="list-item" v-if="item.dictCode === 'DynamicLabel'">
          <img src="../../assets/images/dongtaibiaoqian.png" />
          <div class="title">{{ item.dictName }}</div>
        </div>
        <div class="list-item" v-if="item.dictCode === 'received_paid'">
          <img src="../../assets/images/shouzhileibie.png" />
          <div class="title">{{ item.dictName }}</div>
        </div>
        <div class="list-item" v-if="item.dictCode === 'status'">
          <img src="../../assets/images/xiangmuzhuangtai.png" />
          <div class="title">{{ item.dictName }}</div>
        </div>
        <div class="list-item" v-if="item.dictCode === 'signet_type'">
          <img src="../../assets/images/yinzhangleixing.png" />
          <div class="title">{{ item.dictName }}</div>
        </div>
        <div class="list-item" v-if="item.dictCode === 'SupplierCategory'">
          <img src="../../assets/images/gongyingshangfenlei.png" />
          <div class="title">{{ item.dictName }}</div>
        </div>
        <div class="list-item" v-if="item.dictCode === 'MaterialCategory'">
          <img src="../../assets/images/cailiaofenlei.png" />
          <div class="title">{{ item.dictName }}</div>
        </div>
        <div class="list-item" v-if="item.dictCode === 'Accounttype'">
          <img src="../../assets/images/zijinzhanghuleixing.png" />
          <div class="title">{{ item.dictName }}</div>
        </div>
        <div class="list-item" v-if="item.dictCode === 'TaxType'">
          <img src="../../assets/images/shuifeileixing.png" />
          <div class="title">{{ item.dictName }}</div>
        </div>
      </div>
    </div>

    <el-dialog v-model="basicItemVisible" :title="itemTitle" width="800">
      <div class="item">
        <div class="item-top">
          <div class="item-top-left">
            <el-button type="primary" @click="handleAdd">新增</el-button>
          </div>
          <div class="item-top-right">
            <el-input v-model="searchInput" style="width: 240px" placeholder="请输入关键词搜索" clearable />
            <el-button type="primary" @click="handleSearch">搜索</el-button>
          </div>
        </div>
        <el-table :data="filteredData" :empty-text="'暂无数据'">
          <el-table-column property="name" label="名称" width="600" />
          <el-table-column fixed="right" label="操作" min-width="80">
            <template #default="{ row }">
              <el-button link type="primary" size="small" @click="handleEdit(row)">编辑</el-button>
              <el-button link type="primary" size="small" @click="handleDelete(row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-dialog v-model="editOrAddVisible" width="500" :title="operateTitle" append-to-body>
        <div class="ea-content">
          <el-form label-width="80px" :rules="rules">
            <el-form-item label="ID" prop="itemId">
              <el-input v-model="formData.itemId" />
            </el-form-item>
            <el-form-item label="名称" prop="itemName">
              <el-input v-model="formData.itemName" />
            </el-form-item>
            <el-form-item label="顺序" prop="showOrder">
              <el-input-number v-model="formData.showOrder" style="width: 100%" placeholder="显示顺序" clearable />
            </el-form-item>
          </el-form>
        </div>
        <template #footer>
          <div class="dialog-footer">
            <el-button type="primary" @click="confirmEditing">确定</el-button>
          </div>
        </template>
      </el-dialog>
    </el-dialog>
  </div>
  <!-- </Layout> -->
</template>

<script lang="ts" setup>
import { defineComponent, onMounted, ref, reactive, computed } from 'vue'
import { ElMessage, ElAvatar, ElRow, ElCol } from 'element-plus'
import { post, get } from '../../api/http'
import { dictList, dictItemList, dictDeleteItem, dictAddItem, dictUpdateItem } from '../../api/url'
import { useAuthStore } from '@/store'

// 使用 Vuex 存储 Token
const store = useAuthStore()
store.setToken(
  'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzZXNzaW9uSWQiOiJhZG1pbl80XzZmYzMyNzlkYmVmZjQ1MjNhNTYyOGE3NjEzNzI5NjJkIiwiQ3JlYXRlZFRpbWUiOjE3MjU0OTg1MTMwMDUsImV4cCI6MTcyNTU3MDUxM30.swCQyL3lUs2zpE9VzejodhcCRs5L6zpntP2mBOhhNCg'
)
const token = store.getToken

// 状态管理
const selectDictCode = ref('')
const basicItemVisible = ref(false)
const editOrAddVisible = ref(false)
const itemTitle = ref('')
const operateTitle = ref('')
const searchInput = ref('')
const rules = reactive({
  itemName: [{ required: true, message: '字典数据名称不能为空', trigger: 'blur' }],
  itemId: [{ required: true, message: 'ID不能为空', trigger: 'blur' }],
  showOrder: [{ required: true, message: '显示顺序不能为空', trigger: 'blur' }]
})
const formData = ref({
  id: undefined,
  itemName: '',
  itemId: undefined,
  showOrder: undefined
})

const dictListData = ref([])
const dictItemListData = ref([])

// 初始化原始数据副本
const originalGridData = ref([...dictItemListData.value])

// 生命周期钩子
onMounted(() => {
  getDictList()
  originalGridData.value = [...dictItemListData.value]
})

// 获取字典列表
const getDictList = () => {
  post({
    url: dictList,
    headers: {
      Authorization: token
    }
  }).then((res) => {
    dictListData.value = res.data.dataList
  })
}

// 获取字典项列表
const getDictItemList = (dictCode: string) => {
  get({
    url: dictItemList,
    headers: {
      Authorization: token
    },
    data: {
      dictCode: dictCode
    }
  }).then((res) => {
    dictItemListData.value = res.data.fullResultList
  })
}

// 过滤数据
const filteredData = computed(() => {
  const keyword = searchInput.value.trim()
  if (keyword) {
    return dictItemListData.value.filter((item) => item.name.includes(keyword))
  } else {
    return dictItemListData.value
  }
})

// 选择菜单项
const selectItem = (item: any) => {
  basicItemVisible.value = true
  itemTitle.value = item.dictName
  getDictItemList(item.dictCode)
  selectDictCode.value = item.dictCode
}

// 新增操作
const handleAdd = () => {
  operateTitle.value = '新增' + itemTitle.value
  formData.value = { itemName: '', itemId: undefined, showOrder: undefined } // 清空表单
  editOrAddVisible.value = true
}

// 编辑操作
const handleEdit = (row: any) => {
  operateTitle.value = '编辑' + itemTitle.value
  formData.value = { ...row }
  editOrAddVisible.value = true
}

// 删除操作
const handleDelete = (row: any) => {
  const index = dictItemListData.value.findIndex((item) => item.id === row.id)
  const argu = {
    dictCode: selectDictCode.value,
    id: row.id
  }
  post({
    url: dictDeleteItem,
    headers: {
      Authorization: token
    },
    data: argu
  }).then((res) => {
    if (res.success === true) {
      dictItemListData.value.splice(index, 1)
      ElMessage.success('删除成功！')
    }
  })
}

// 搜索操作
const handleSearch = () => {
  const keyword = searchInput.value.trim()
  if (keyword) {
    dictItemListData.value = filteredData.value
  } else {
    dictItemListData.value = originalGridData.value
  }
}

// 确认编辑或新增
const confirmEditing = () => {
  if (formData.value.id) {
    updateItem(formData.value)
  } else {
    // 添加新项
    addItem(formData.value)
  }
}

// 更新现有项
const updateItem = (data: any) => {
  data.dictCode = selectDictCode.value
  post({
    url: dictUpdateItem,
    headers: {
      Authorization: token
    },
    data: {
      globalDictItemDto: data
    }
  }).then((res) => {
    if (res.success === true) {
      ElMessage.success('编辑成功！')
      editOrAddVisible.value = false
      getDictItemList(selectDictCode.value)
    }
  })
}

// 添加新项
const addItem = (data: any) => {
  data.dictCode = selectDictCode.value
  post({
    url: dictAddItem,
    headers: {
      Authorization: token
    },
    data: {
      globalDictItemDto: data
    }
  }).then((res) => {
    if (res.success === true) {
      ElMessage.success('添加成功！')
      editOrAddVisible.value = false
      getDictItemList(selectDictCode.value)
    }
  })
}
</script>

<style lang="scss" scoped>
.basic {
  width: 100%;
  height: 100%;
  padding: 16px;

  .list {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;

    .list-item {
      display: flex;
      align-items: center;
      padding: 0 10px;
      width: 100%;
      height: 80px;
      margin-bottom: 8px;
      background: #fff;
      border-radius: 8px;
      transition: all 0.3s ease;
      cursor: pointer;

      &:active {
        background: #ecf5ff;
      }

      &:hover {
        background: #ecf5ff;
      }

      .title {
        font-size: 16px;
        color: #333;
      }

      img {
        width: 40px;
        height: 40px;
        margin-right: 8px;
      }

      .el-avatar {
        width: 40px;
        height: 40px;
      }

      .el-avatar__img {
        width: 40px;
        height: 40px;
      }
    }

    .item:hover {
      background: #ecf5ff;
      border-radius: 8px;
    }
  }

  .item {
    width: 100%;

    .item-top {
      display: flex;
      justify-content: space-between;
      margin-bottom: 16px;
    }
  }
}

.title {
  font-size: 16px;
  color: #333;
}
</style>
