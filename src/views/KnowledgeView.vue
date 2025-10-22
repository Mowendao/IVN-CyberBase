<!-- src/views/CompetitionView.vue -->
<template>
  <div class="knowledge-page">
    <div class="page-header">
      <h1 class="page-title">知识库</h1>
      <p class="page-description">获取最全面的CTF知识内容</p>
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

    <div class="knowledge-grid">
      <knowledge-card
        v-for="knowledge in filteredKnowledges"
        :key="knowledge.id"
        :knowledge="knowledge"
        class="knowledge-item"
      />
    </div>

    <!-- 无搜索结果提示 -->
    <div v-if="filteredKnowledges.length === 0" class="no-results">
      <el-empty description="未找到相关知识库" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import KnowledgeCard from '@/components/KnowledgeCard.vue'
import SearchInput from '@/components/SearchInput.vue'

// 赛事数据
const knowledges = ref([
  {
    id: 'ctf-wiki',
    title: 'CTF Wiki',
    description:
      'CTF Wiki 是一个由社区驱动的、全面开源的CTF知识库，系统性地整理了CTF竞赛中涉及的各类安全技术、解题技巧和工具使用指南，涵盖Web安全、逆向工程、密码学、二进制漏洞利用等核心领域，被誉为CTF学习和备赛的‘百科全书’。',
    link: 'https://ctf-wiki.org/',
  },
  {
    id: 'ctf-all-in-one',
    title: 'CTF All In One',
    description:
      'CTF All In One 是一个综合性的CTF学习资源整合项目，通常以文档、工具包或GitHub仓库形式存在，系统性地汇总了CTF竞赛所需的基础知识、解题技巧、工具使用和实战经验，为CTF爱好者提供一站式的学习指南和资源导航。',
    link: 'https://firmianay.gitbooks.io/ctf-all-in-one/content/',
  },
  {
    id: 'wolf-team-knowledge-base',
    title: '狼队安全团队公开知识库',
    description:
      '狼队安全团队公开知识库是由国内知名安全团队狼队（Wolf Team）维护的开源技术文档库，系统整理了渗透测试、漏洞挖掘、安全工具使用等领域的实战经验与知识体系，为安全研究人员提供免费且高质量的学习参考资料。',
    link: 'https://wiki.wgpsec.org/knowledge/ctf/ctf.html',
  },
  {
    id: 'assembly-language',
    title: '汇编语言',
    description:
      '汇编语言是一种用助记符代替机器指令操作码的低级编程语言，直接对应特定的计算机处理器架构，具有执行效率高、硬件控制能力强等特点，广泛应用于驱动程序、嵌入式系统、实时控制和逆向工程等对性能要求严格的领域。',
    link: 'https://www.cainiaoya.com/assemblylanguage/assembly-language-jiaocheng.html',
  },
  {
    id: 'runoob',
    title: '菜鸟教程',
    description:
      '菜鸟教程（Runoob）是国内知名的免费编程学习网站，提供包括HTML/CSS、JavaScript、Python、Java、SQL等在内的多种编程语言及网络安全基础技术的入门教程、在线工具和实例代码，致力于以简洁易懂的方式帮助初学者快速掌握实用技能。',
    link: 'https://www.runoob.com/',
  },
  {
    id: 'cs-self-learning',
    title: 'CS自学指南',
    description:
      'CS自学指南是由北京大学学生团队维护的计算机科学开源学习资源聚合平台，提供系统化的课程路径、经典书单、实战项目及名校公开课推荐，涵盖从编程基础到人工智能等前沿领域，旨在帮助学习者构建完整的计算机科学知识体系。',
    link: 'https://csdiy.wiki/',
  },
  {
    id: 'xiaodi',
    title: '小迪渗透',
    description:
      '小迪渗透是专注于网络安全实战技能培养的学习平台，以小迪老师的系列渗透测试课程为核心，提供从基础到进阶的Web安全、渗透测试、漏洞挖掘等实战教程，深受安全初学者喜爱，是国内网络安全实战教育领域具有重要影响力的平台之一。',
    link: 'http://www.xiaodi8.com/',
  },
  {
    id: 'the-ctf-primer',
    title: 'The CTF Primer',
    description:
      'The CTF Primer 是一个专注于CTF入门教育与技能培养的开源项目或学习平台，通常提供系统性的基础知识讲解、分类题型解析和实战练习指南，旨在帮助初学者构建完整的CTF知识体系并掌握核心解题技巧。',
    link: 'https://primer.picoctf.org/#_introduction',
  },
  {
    id: 'the-missing-semester',
    title: '计算机教育中缺失的一课',
    description:
      '《计算机教育中缺失的一课》是麻省理工学院开设的著名公开课程，旨在系统讲授传统计算机科学教育中常被忽视但至关重要的工具使用技能。该课程通过实践性教学帮助学生掌握软件开发中的关键生态系统知识，弥补学术课程与工业需求间的差距。',
    link: 'https://missing.csail.mit.edu/',
  },
])

// 搜索关键词
const searchKeyword = ref('')

// 计算属性：根据搜索关键词过滤文章
const filteredKnowledges = computed(() => {
  if (!searchKeyword.value.trim()) {
    return knowledges.value
  }

  const keyword = searchKeyword.value.toLowerCase()
  return knowledges.value.filter(
    (article) =>
      article.title.toLowerCase().includes(keyword) ||
      article.description.toLowerCase().includes(keyword),
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
.knowledge-page {
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

.knowledge-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 24px;
}

.knowledge-item {
  transition: all 0.3s ease;
}

.knowledge-item:hover {
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
  .knowledge-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .knowledge-page {
    padding: 15px;
  }
}
</style>
