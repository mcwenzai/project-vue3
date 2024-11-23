<template>
  <div class="header-nav">
    <div class="item" :class="{ active: currentIndex === index }" v-for="(item, index) in getMenuList"
      :key="item.menuId" @click="selectMenu(item, index)">
      {{ item.menuName }}
    </div>
  </div>
  <div class="toolbar">
    <el-dropdown @command="handleCommand">
      <el-icon size="20" color="#fff">
        <setting />
      </el-icon>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="modifyPassword">修改密码</el-dropdown-item>
          <el-dropdown-item command="modifyHeadImage">修改头像</el-dropdown-item>
          <el-dropdown-item command="logout">登出</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <span class="username">管理员</span>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { doLogout } from '@/api/url'
import { post } from '@/api/http'
import { encrypt, setToken } from '@/utils/index';
import { useAuthStore } from '@/store'
const store = useAuthStore();
const router = useRouter();



// 定义菜单项类型
interface MenuItem {
  menuName: string
  menuId: string
}

// 初始化菜单列表
const getMenuList = ref<MenuItem[]>([
  { menuName: '工作台', menuId: '001' },
  { menuName: '智能看板', menuId: '002' },
  { menuName: '管理中心', menuId: '003' }
])

// 当前选中的索引
const currentIndex = ref(1)


// 映射表
const menuToRoute = {
  '001': 'home',
  '002': 'dashboard',
  '003': 'management'
}

// 选择菜单项
const selectMenu = (item: MenuItem, index: number) => {
  currentIndex.value = index
  const routeName = menuToRoute[item.menuId]
  console.log(routeName)
  if (routeName === 'home') {
    window.location.href = 'http://192.168.50.70:9010/#/main/welcome'
  } else {
    router.push({ name: routeName })
  }
}


const handleCommand = (command: string) => {
  if (command === 'logout') {
    post({
      url: doLogout
    }).then((res: { data: { menuList: any[]; tokenData: any; }; }) => {
      store.clearAllTags
      // delete res.data.menuList;
      store.setUserInfo(res.data, res.data.tokenData);
      setToken
      store.setCurrentMenuId(null);
      window.sessionStorage.removeItem('isUaaLogin');
      router.replace({ name: 'login' });
    }).catch((e) => {
      console.error(e)
    });
  }
}

</script>

<style lang="scss">
.header-nav {
  width: 92%;
  min-width: 100px;
  overflow-x: auto;
  white-space: nowrap;
  display: flex;
  align-items: center;
  margin: 0 20px;

  &::-webkit-scrollbar {
    width: 0 !important;
    height: 0 !important;
    background: transparent;
  }

  .item {
    color: #fff;
    font-size: 16px;
    cursor: pointer;
    padding: 9px 20px;
    text-align: center;
    margin: 0 5px;
    min-width: 120px;
    line-height: 1;
    transition: none;

    &.active {
      background: #fff;
      color: #1677fe;
      border-radius: 100px;
    }
  }

  .item:hover {
    background: #fff;
    color: #1677fe;
    border-radius: 100px;
  }
}

.toolbar {
  color: #fff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  right: 20px;
}

.uswername {
  @include text-styles($body-text-white);
}
</style>
