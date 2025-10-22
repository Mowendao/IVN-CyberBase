<template>
  <el-container class="layout-container" style="height: 100%">
    <!-- 顶部导航栏 -->
    <el-header height="80px" class="header">
      <div class="header-content">
        <div class="logo" @click="$router.push('/')">
          <span class="logo-icon">🛡️</span>
          <h1>IVN CTF军火库</h1>
        </div>

        <!-- 主导航菜单 -->
        <el-menu mode="horizontal" router :default-active="$route.path" class="main-menu">
          <el-menu-item index="/home">首页</el-menu-item>
          <el-menu-item index="/knowledge">知识库</el-menu-item>
          <el-menu-item index="/competition">赛事中心</el-menu-item>
          <el-menu-item index="/practice">题库平台</el-menu-item>
          <el-menu-item index="/community">社区资讯</el-menu-item>
          <el-sub-menu index="categories">
            <template #title>资源宝库</template>
            <el-menu-item
              v-for="category in categories"
              :key="category.id"
              :index="`/category/${category.id}`"
            >
              {{ category.name }}
            </el-menu-item>
          </el-sub-menu>
          <el-menu-item index="/article">文章推荐</el-menu-item>
          <el-menu-item index="/src">SRC漏洞平台</el-menu-item>
          <el-menu-item index="/about">关于本站</el-menu-item>
        </el-menu>
      </div>
    </el-header>

    <!-- 主要内容区 -->
    <el-main class="main-content">
      <router-view />
    </el-main>

    <!-- 页脚 -->
    <el-footer height="60px" class="footer">
      <div class="footer-content">
        <p>&copy; 2025 IVN CyberBase | Built by Binary.</p>
      </div>
    </el-footer>
  </el-container>
</template>

<script setup>
import { ref } from 'vue'

// 分类数据
const categories = ref([
  { id: 'web', name: 'Web' },
  { id: 'pwn', name: 'Pwn' },
  { id: 'crypto', name: 'Crypto' },
  { id: 'reverse', name: 'Reverse' },
  { id: 'misc', name: 'Misc' },
  { id: 'awd', name: 'AWD' },
  { id: 'universality', name: '通用' },
])
</script>

<style scoped>
.layout-container {
  height: 100%;
  width: 100vw;
}

.header {
  background: linear-gradient(135deg, #3a55ce 0%, #d03333 100%);
  border-bottom: none;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.logo {
  display: flex;
  align-items: center;
  color: white;
  cursor: pointer;
}

.logo-icon {
  font-size: 32px;
  margin-right: 10px;
}

.logo h1 {
  margin: 0;
  font-size: 24px;
  font-weight: 600;
}

.main-menu {
  background: transparent;
  border: none;
  flex: 1;
  justify-content: center;
}

.main-menu .el-menu-item,
.main-menu .el-sub-menu__title {
  color: white !important;
  font-size: 14px; /* 从16px调整为14px */
  font-weight: 500;
  padding: 0 12px !important; /* 减小内边距 */
  margin: 0 4px; /* 添加外边距以保持间距 */
}

.main-menu .el-menu-item:hover,
.main-menu .el-sub-menu__title:hover {
  background: rgba(255, 255, 255, 0.1) !important;
}

.search-box {
  width: 200px;
}

.main-content {
  padding: 0;
  background: #f5f7fa;
  min-height: calc(100vh - 140px);
}

.footer {
  background: #2c3e50;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.footer p {
  margin: 0;
  font-size: 14px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    height: auto;
    padding: 10px;
  }

  .logo h1 {
    font-size: 20px;
  }

  .search-box {
    width: 100%;
    margin-top: 10px;
  }

  .main-menu .el-menu-item,
  .main-menu .el-sub-menu__title {
    font-size: 13px;
    padding: 0 8px !important;
  }
}
</style>
