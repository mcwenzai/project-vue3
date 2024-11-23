<template>
  <div class="project" v-for="(item, index) in props.list" :key="index" @click="handleClick(item)">
    <div class="project-header">
      <div class="line">
        <div class="title">{{ item.name }}</div>
        <el-tag round v-if="item.status === 'CONSTRUCT'">施工准备</el-tag>
        <el-tag round v-if="item.status === 'ABUILD'">在建</el-tag>
        <el-tag round v-if="item.status === 'SHUTDOWN'">停工</el-tag>
        <el-tag round v-if="item.status === 'COMPLETION'">完工</el-tag>
        <el-tag round v-if="item.status === 'SETTLEMENT'">待结算</el-tag>
        <el-tag round v-if="item.status === 'COMPLETED'">竣工</el-tag>
        <el-tag round v-if="item.status === 'CANCEL'">已销项</el-tag>
      </div>
      <div class="desc">{{ item.code }}</div>
    </div>
    <div class="project-content">

      <el-row justify="space-between">
        <el-col :span="12">
          <p class="">{{ item.leaderUserName }}</p>
          <p class="">{{ item.leaderUserId }}</p>
        </el-col>
        <el-col :span="10">
          <div class="">{{ item.plannedDuration }}</div>
          <div class="">计划工期（天）</div>
        </el-col>
        <el-col :span="2" style="text-align: center;">
          <el-progress type="circle" :indeterminate="true" :width="68" :percentage="item.projectProgress">
            <template #default="{ percentage }">
              <div class="percentage-label">进度</div>
              <div class="percentage-value">{{ percentage }}%</div>
            </template>
          </el-progress>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, onUnmounted, defineProps, defineEmits, toRaw } from 'vue'
import * as echarts from 'echarts'

interface projectList {
  id: number;
  name: string;
  leaderUserName: string,
  plannedDuration: string,
  projectProgress: number
}

const props = defineProps({
  options: {
    type: Object as () => echarts.EChartsOption | undefined,
    default: undefined
  },
  list: []
})


const chart = ref<HTMLDivElement>()

onMounted(() => {
  if (props.options) {
    initChart()
  }
})

const emits = defineEmits(['click']);

const handleClick = (item: projectList) => {
  const plainItem = toRaw(item);
  emits('click', plainItem);
};



const initChart = () => {
  const myChart = echarts.init(chart.value!)
  if (props.options) {
    myChart.setOption(props.options)
  }

  onUnmounted(() => {
    myChart.dispose()
  })
}


</script>
<style lang="scss">
.project {
  width: 100%;
  height: auto;
  padding: 20px;
  background-color: #ffffff;
  margin: 20px 0;
  border-radius: 10px;

  .project-header {
    .line {
      display: flex;
      align-items: center;

      .title {
        font-size: 24px;
        font-weight: bold;
        margin-right: 20px;

        &:hover {
          color: $primary-color;
        }
      }
    }

    .desc {
      text-align: left;
      font-size: 14px;
      color: #999;
    }
  }

  .project-content {
    .el-row:last-child {
      margin-bottom: 0;
    }

    .el-col {
      text-align: left;
      border-radius: 4px;
    }

    .grid-content {
      border-radius: 4px;
      min-height: 36px;
    }

    .percentage-label {
      font-size: 14px;
      color: #3a3a3a;
    }

    .percentage-value {
      font-size: 18px;
      color: #333333;
    }
  }
}
</style>
