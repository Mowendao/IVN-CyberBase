<!-- src/views/CommunityView.vue -->
<template>
  <div class="community-page">
    <div class="page-header">
      <h1 class="page-title">社区资讯</h1>
      <p class="page-description">发现最新的网络安全资讯和漏洞工具</p>
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

    <div class="community-grid">
      <community-card
        v-for="community in filteredCommunities"
        :key="community.id"
        :community="community"
        class="community-item"
      />
    </div>

    <!-- 无搜索结果提示 -->
    <div v-if="filteredCommunities.length === 0" class="no-results">
      <el-empty description="未找到相关社区" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import CommunityCard from '@/components/CommunityCard.vue'
import SearchInput from '@/components/SearchInput.vue'

// 赛事数据
const communities = ref([
  {
    id: 'pediy',
    title: '看雪',
    description:
      '看雪是中国最早成立的专业安全技术社区之一，专注于软件逆向工程、漏洞挖掘和移动安全等底层安全技术研究。社区汇聚了大量资深安全专家，提供系统化的安全课程、工具资源和行业资讯，是国内逆向工程和安全研究领域最具影响力的技术社区。',
    link: 'https://www.kanxue.com/',
  },
  {
    id: 'xianzhi',
    title: '先知社区',
    description:
      '先知社区是阿里巴巴集团旗下的安全技术社区，致力于构建开放共享的白帽黑客技术交流平台。社区聚焦于Web安全、漏洞挖掘、安全研究等前沿领域，为安全研究者提供技术分享、漏洞提交和行业交流的专业环境，推动安全生态的健康发展。',
    link: 'https://xz.aliyun.com/',
  },
  {
    id: '52pojie',
    title: '吾爱破解',
    description:
      '吾爱破解是国内知名的软件安全技术交流社区，以软件逆向分析、安全工具开发和资源分享为主要特色。社区拥有活跃的用户群体和丰富的技术资源，为安全爱好者提供从入门到进阶的学习交流平台，在软件分析和安全工具领域具有重要影响力。',
    link: 'https://www.52pojie.cn/',
  },
  {
    id: 'freebuf',
    title: 'FreeBuf',
    description:
      'FreeBuf是国内领先的网络安全行业门户，集安全资讯、技术研究、行业报告和社区交流于一体。平台涵盖前沿安全动态、深度技术分析和行业趋势解读，为安全从业者提供全面的信息服务和专业的内容输出，是网络安全领域最具影响力的媒体平台之一。',
    link: 'https://www.freebuf.com/',
  },
  {
    id: 'oss-security',
    title: 'OSS-Security',
    description:
      'OSS-Security是专注于开源软件安全的国际知名邮件列表和社区平台，由开源安全基金会（OpenSSF）等组织支持，为开发者和安全研究人员提供关键的安全公告与最佳实践交流。',
    link: 'https://oss-security.openwall.org/',
  },
  {
    id: 'levelblue',
    title: 'LevelBlue',
    description:
      'LevelBlue是由AT&T网络安全事业部与WillJam Ventures合资成立的专业网络安全公司，专注于提供托管安全服务、威胁情报和高级网络安全解决方案，致力于帮助企业提升网络威胁防护能力。',
    link: 'https://www.levelblue.com/',
  },
])

// 搜索关键词
const searchKeyword = ref('')

// 计算属性：根据搜索关键词过滤文章
const filteredCommunities = computed(() => {
  if (!searchKeyword.value.trim()) {
    return communities.value
  }

  const keyword = searchKeyword.value.toLowerCase()
  return communities.value.filter(
    (community) =>
      community.title.toLowerCase().includes(keyword) ||
      community.description.toLowerCase().includes(keyword),
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
.community-page {
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

.community-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 24px;
}

.community-item {
  transition: all 0.3s ease;
}

.community-item:hover {
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

@media (max-width: 768px) {
  .community-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .community-page {
    padding: 15px;
  }
}
</style>
