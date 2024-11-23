<template>
  <div class="home">
    <div class="home-approval">
      <li class="home-title">
        <p class="home-approval-title">我的审批</p>
      </li>
      <el-row :gutter="20">
        <el-col :span="6" v-for="(item, index) in state.approvalList" :key="item.id" class="approval-item box">
          <div class="home-approval-content">
            <div class="home-approval-content-left">
              <img :src="item.icon" :alt="item.name" />
            </div>
            <div class="home-approval-content-right">
              <div class="home-approval-content-num">{{ item.num }}</div>
              <div class="home-approval-content-text">{{ item.name }}</div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <Spacer></Spacer>
    <div class="home-itxst">
      <li class="home-title">
        <p class="home-itxst-title">常用应用</p>
        <p class="home-itxst-add" @click="addApp">添加</p>
      </li>
      <draggable :list="state.commonList" item-key="id" ghost-class="ghost" chosen-class="chosenClass" animation="300"
        @start="onStart" @end="onEnd">
        <template #item="{ element }">
          <div class="item box">
            <img class="item-icon" :src="element.icon" />
            {{ element.name }}
            <el-popover placement="right" trigger="hover" width="160">
              <template #reference>
                <el-icon>
                  <Edit />
                </el-icon>
              </template>
              <div class="popover-content">
                <div class="popover-title">编辑应用</div>
                <div class="popover-actions">
                  <el-button type="primary" link @click="editApp(element)">编辑</el-button>
                  <el-button type="danger" link @click="deleteApp(element)">删除</el-button>
                </div>
              </div>
            </el-popover>
          </div>
        </template>
      </draggable>
      <div class="item" @click="showAllApps" v-if="!showAll">
        <img class="item-icon" src="../../assets/images/quanbuyingyong.png" />
        <span>全部应用</span>
      </div>
      <transition name="fade">
        <div v-if="showAll" class="home-all-apps">
          <li class="home-title">项目管理</li>
          <div class="item">
            <img class="item-icon" src="../../assets/images/xiangmuguanli.png" />
            <span>项目</span>
          </div>
          <div class="item">
            <img class="item-icon" src="../../assets/images/xiangmuguanli.png" />
            <span>项目预算</span>
          </div>
          <div class="item">
            <img class="item-icon" src="../../assets/images/xiangmuguanli.png" />
            <span>项目管理</span>
          </div>
          <li class="home-title">供应商管理</li>
          <div class="item">
            <img class="item-icon" src="../../assets/images/xiangmuguanli.png" />
            <span>供应商选定</span>
          </div>
          <div class="item">
            <img class="item-icon" src="../../assets/images/xiangmuguanli.png" />
            <span>供应商库</span>
          </div>
          <div class="item">
            <img class="item-icon" src="../../assets/images/xiangmuguanli.png" />
            <span>对账单</span>
          </div>
        </div>
      </transition>
    </div>

    <el-dialog v-model="dialogVisible" title="编辑应用">
      <el-form :model="currentApp" label-width="80px">
        <el-form-item label="名称">
          <el-input v-model="currentApp.name"></el-input>
        </el-form-item>
        <el-form-item label="图标">
          <el-input v-model="currentApp.icon"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="saveApp">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import draggable from 'vuedraggable'
import { ElMessage } from 'element-plus'
import { Edit } from '@element-plus/icons-vue'
const dialogVisible = ref(false)
const currentApp = ref({ id: 0, name: '', icon: '' })
const showAll = ref(false)

const state = reactive({
  approvalList: [
    { name: '项目管理', id: 0, icon: 'src/assets/images/xiangmuguanli.png', num: 54401 },
    { name: '收入合同', id: 1, icon: 'src/assets/images/shouruhetong.png', num: 54402 },
    { name: '支出合同', id: 2, icon: 'src/assets/images/zhichuhetong.png', num: 54403 },
    { name: '费用报销', id: 3, icon: 'src/assets/images/feiyongbaoxiao.png', num: 54404 }
  ],
  commonList: [
    { name: '项目管理', id: 0, icon: 'src/assets/images/xiangmuguanli.png' },
    { name: '收入合同', id: 1, icon: 'src/assets/images/shouruhetong.png' },
    { name: '支出合同', id: 2, icon: 'src/assets/images/zhichuhetong.png' },
    { name: '费用报销', id: 3, icon: 'src/assets/images/feiyongbaoxiao.png' }
  ]
})

const onStart = () => {
  console.log('开始拖拽')
}

const onEnd = () => {
  console.log('结束拖拽')
}

const showAllApps = () => {
  showAll.value = !showAll.value
}

// 添加应用
const addApp = () => {
  const newApp = { id: Date.now(), name: '新应用', icon: 'path/to/new-icon.png' }
  state.commonList.push(newApp)
  editApp(newApp)
}

// 编辑应用
const editApp = (app) => {
  currentApp.value = { ...app }
  dialogVisible.value = true
}

// 删除应用
const deleteApp = (app) => {
  const index = state.commonList.findIndex((a) => a.id === app.id)
  if (index !== -1) {
    state.commonList.splice(index, 1)
    ElMessage.success('删除成功')
  }
}

// 保存应用
const saveApp = () => {
  const index = state.commonList.findIndex((a) => a.id === currentApp.value.id)
  if (index !== -1) {
    state.commonList[index] = { ...currentApp.value }
    dialogVisible.value = false
    ElMessage.success('保存成功')
  }
}
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  height: auto;

  .home-approval {
    position: relative;

    @each $property, $value in $card-bg {
      #{$property}: #{$value};
    }

    .home-title {
      display: flex;
      justify-content: space-between;

      .home-approval-title {
        @include text-styles($important-text);
      }
    }

    .approval-item {
      margin: 10px 0;

      .home-approval-content {
        display: flex;
        align-items: center;

        .home-approval-content-num {
          @include text-styles($important-text);
        }

        .home-approval-content-text {
          @include text-styles($desc-text);
        }

        .home-approval-content-left {
          width: 52px;
          height: 52px;
          margin-right: 10px;

          img {
            width: 100%;
            height: 100%;
          }
        }

        .home-approval-content-right {
          text-align: left;
        }
      }
    }
  }

  .home-itxst {
    position: relative;
    margin-top: 20px;

    @each $property, $value in $card-bg {
      #{$property}: #{$value};
    }

    .home-title {
      display: flex;
      justify-content: space-between;

      .home-itxst-title {
        @include text-styles($important-text);
      }

      .home-itxst-add {
        color: $primary-color;
      }
    }

    .home-all-apps {
      transition: max-height 0.5s ease-out;
      overflow: hidden;

      &.fade-enter-active,
      &.fade-leave-active {
        transition: max-height 0.5s ease-out;
      }

      &.fade-enter-to,
      &.fade-leave-from {
        max-height: 1000px;
      }
    }
  }

  .home-itxst>div:nth-of-type(1) {
    display: flex;
    align-items: center;
  }

  .item {
    flex: 1;
    display: flex;
    align-items: center;
    margin: 10px 0;
    padding: 6px 10px;
    text-align: left;
    position: relative;

    .item-icon {
      width: 36px;
      height: 36px;
      margin-right: 10px;
    }
  }

  .item:hover {
    cursor: move;
  }

  .chosenClass {
    background-color: #f1f1f1;
  }
}
</style>
