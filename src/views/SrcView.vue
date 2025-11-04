<!-- src/views/CompetitionView.vue -->
<template>
  <div class="src-page">
    <div class="page-header">
      <h1 class="page-title">SRC漏洞平台</h1>
      <p class="page-description">发现多种多样的SRC漏洞平台</p>
    </div>

    <!-- 使用封装的搜索组件 -->
    <div class="search-container">
      <search-input
        v-model="searchKeyword"
        placeholder="搜索文章标题或内容..."
        @search="handleSearch"
        @clear="handleClear"
      />
    </div>

    <div class="src-grid">
      <src-card v-for="src in filteredSrcs" :key="src.id" :src="src" class="src-item" />
    </div>

    <!-- 无搜索结果提示 -->
    <div v-if="filteredSrcs.length === 0" class="no-results">
      <el-empty description="未找到相关知识库" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import SrcCard from '@/components/SrcCard.vue'
import SearchInput from '@/components/SearchInput.vue'

// 赛事数据
const srcs = ref([
  {
    id: 'cnnvd',
    title: '国家信息安全漏洞库',
    description:
      '国家信息安全漏洞库（CNNVD）是中国信息安全测评中心负责建设运维的国家级信息安全漏洞资源管理平台，致力于对信息安全漏洞开展采集收录、分析研判、预警通报和修复消控，为国内信息安全保障工作提供权威漏洞数据服务和专业技术支撑。',
    link: 'https://www.cnnvd.org.cn/',
  },
  {
    id: 'butian',
    title: '补天',
    description:
      '补天是奇安信集团旗下的知名漏洞响应平台，为企业与白帽黑客之间搭建安全协作桥梁，专注于漏洞挖掘、报告与修复，通过众测模式帮助企业提升网络安全防护能力，是国内最具影响力的漏洞众测平台之一。',
    link: 'https://www.butian.net/',
  },
  {
    id: 'vulbox',
    title: '漏洞盒子',
    description:
      '漏洞盒子是国内领先的网络安全众测平台，连接企业安全需求与白帽黑客资源，提供漏洞悬赏、安全众测、应急响应等服务，构建开放的协同安全生态，助力企业提升安全防护能力。',
    link: 'https://www.vulbox.com/',
  },
  {
    id: 'alibaba-src',
    title: '阿里安全响应中心',
    description:
      '阿里安全响应中心是阿里巴巴集团官方设立的安全漏洞报告与处理平台，负责接收和处理阿里系产品安全漏洞，通过漏洞奖励计划携手白帽黑客共同提升产品安全性。',
    link: 'https://security.alibaba.com/',
  },
  {
    id: 'dbappsecurity-src',
    title: '安恒安全响应中心',
    description:
      '安恒安全响应中心是安恒信息设立的官方安全漏洞收集与应急响应平台，负责处理安恒产品及服务的安全漏洞报告，建立与安全研究者的协作机制，持续完善产品安全体系。',
    link: 'https://security.dbappsecurity.com.cn/index',
  },
])

// 搜索关键词
const searchKeyword = ref('')

// 计算属性：根据搜索关键词过滤文章
const filteredSrcs = computed(() => {
  if (!searchKeyword.value.trim()) {
    return srcs.value
  }

  const keyword = searchKeyword.value.toLowerCase()
  return srcs.value.filter(
    (src) =>
      src.title.toLowerCase().includes(keyword) || src.description.toLowerCase().includes(keyword),
  )
})

// 搜索处理函数
const handleSearch = (value) => {
  // 可以在这里添加额外的搜索逻辑
  console.log('搜索:', value)
}

// 清空处理函数
const handleClear = () => {
  console.log('清空搜索')
}
</script>

<style scoped>
.src-page {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.page-header {
  text-align: center;
  margin-bottom: 40px;
  padding: 20px 0;
}

.page-title {
  font-family: 'Segoe UI', 'Microsoft YaHei UI', sans-serif; /* 现代字体 */
  font-size: 1.8rem; /* 醒目大小 */
  font-weight: 700;
  background: linear-gradient(135deg, #87ceeb 0%, #00bfff 100%); /* 渐变背景 */
  -webkit-background-clip: text; /* 关键：将背景限制在文字内 */
  background-clip: text;
  -webkit-text-fill-color: transparent; /* 关键：让文字颜色透明，露出背景 */
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.15); /* 增加立体感 */
  text-align: center;
  letter-spacing: 1px; /* 轻微字间距，提升质感 */
  margin: 1rem 0;
  padding: 0.5rem;
}

.page-description {
  font-size: 1.1rem;
  color: #64748b;
  margin: 0 auto;
  max-width: 600px;
  line-height: 1.6;
  font-weight: 400;
  text-align: center;
  padding: 0 20px;
}

.src-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 24px;
}

.src-item {
  transition: all 0.3s ease;
}

.src-item:hover {
  transform: translateY(-5px);
}

.search-container {
  max-width: 500px;
  margin: 0 auto 30px auto;
  padding: 0 20px;
}

.no-results {
  margin-top: 40px;
}

/* 在所有页面的 <style scoped> 中添加 */
@media (max-width: 768px) {
  /* 平板和手机 */
  .page-header {
    margin-bottom: 20px;
    padding: 10px 0;
  }

  .page-title {
    font-size: 1.5rem;
    padding: 0.3rem;
  }

  .page-description {
    font-size: 1rem;
    padding: 0 10px;
  }
}

@media (max-width: 480px) {
  /* 手机 */
  .page-title {
    font-size: 1.3rem;
  }

  .page-description {
    font-size: 0.9rem;
  }
}
</style>
