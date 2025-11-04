<!-- src/views/CompetitionsView.vue -->
<template>
  <div class="competition-page">
    <div class="page-header">
      <h1 class="page-title">赛事中心</h1>
      <p class="page-description">发现最新的CTF竞赛和网络安全挑战</p>
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

    <div class="competition-grid">
      <competition-card
        v-for="competition in filteredCompetitions"
        :key="competition.id"
        :competition="competition"
        class="competition-item"
      />
    </div>

    <!-- 无搜索结果提示 -->
    <div v-if="filteredCompetitions.length === 0" class="no-results">
      <el-empty description="未找到相关竞赛" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import CompetitionCard from '@/components/CompetitionCard.vue'
import SearchInput from '@/components/SearchInput.vue'

// 赛事数据
const competitions = ref([
  {
    id: 'xctf',
    title: '攻防世界',
    description:
      'XCTF国际网络攻防联赛是由清华大学蓝莲花战队发起、赛宁网安总体承办的，亚洲规模最大、水平最高的网络安全竞赛平台之一，旨在通过实战对抗选拔和培养网络安全人才。',
    link: 'https://adworld.xctf.org.cn/home/index',
  },
  {
    id: 'defcon-ctf-qualifier',
    title: 'DEF CON CTF Qualifier',
    description: '世界顶级黑客大会DEF CON的资格赛，被誉为CTF界的奥运会，挑战难度极高。',
    link: 'https://legitbs.net/',
  },
  {
    id: 'google-ctf',
    title: 'Google CTF',
    description: '由Google主办的年度网络安全竞赛，包含Web、Crypto、Pwn等多个方向的高质量题目。',
    link: 'https://capturetheflag.withgoogle.com/',
  },
  {
    id: 'picoctf',
    title: 'picoCTF',
    description: '适合初学者的入门级CTF竞赛，由卡内基梅隆大学主办，提供丰富的学习资源。',
    link: 'https://picoctf.org/',
  },
  {
    id: 'gamma-community',
    title: '伽马社区',
    description:
      '伽马社区是一个专注于网络安全技术交流与学习的平台，通常提供CTF赛事信息、技术文章分享、工具资源及社区互动功能，旨在帮助安全爱好者提升技能并促进专业交流。',
    link: 'https://cqgame.ichunqiu.com/',
  },
  {
    id: 'hello-ctf',
    title: 'Hello CTF',
    description:
      'Hello CTF是一个面向CTF新手的入门平台或赛事活动，通常提供基础题目、解题指导和练习环境，帮助初学者快速了解CTF竞赛格式和常见题型，降低参与门槛。',
    link: 'https://hello-ctf.com/Event/',
  },
  {
    id: 'ctftime',
    title: 'CTFtime',
    description:
      'CTFtime是全球最权威的CTF赛事信息聚合平台，提供全球CTF比赛日历、战队排名、赛事积分统计及往届赛题存档，是CTF参赛者和组织者必备的参考资源。',
    link: 'https://ctftime.org',
  },
  {
    id: 'ciscn',
    title: '全国大学生信息安全竞赛',
    description:
      '全国大学生信息安全竞赛（简称CISCN）是由教育部高等学校网络空间安全专业教学指导委员会主办、面向全国高校学生的权威性网络安全赛事，是国内高校网络安全领域最具影响力的官方竞赛之一。',
    link: 'http://www.ciscn.cn/',
  },
  {
    id: 'ctfhub',
    title: 'CTFHub',
    description:
      'CTFHub是专注于CTF技能训练与赛事服务的在线平台，提供丰富的实战题库、技能树学习路径及赛事管理功能，致力于通过系统化训练提升网络安全爱好者的CTF实战能力。',
    link: 'https://www.ctfhub.com/',
  },
  {
    id: 'nisp',
    title: 'NISP',
    description:
      'NISP是由中国信息安全测评中心主导推出的国家级专业认证体系，其认证分为多个等级，涵盖网络安全意识、技能到管理等多个层面，是国内信息安全行业广泛认可的专业水平证明。',
    link: 'https://www.nisp.org.cn/',
  },
  {
    id: 'ruankao',
    title: '全国计算机技术与软件专业技术资格考试',
    description:
      '全国计算机技术与软件专业技术资格（水平）考试是由国家人力资源和社会保障部、工业和信息化部联合组织实施的国家级专业技术人员资格考试，是IT行业唯一的职称资格考试。',
    link: 'https://www.ruankao.org.cn',
  },
  {
    id: 'cisphome',
    title: 'CISP之家',
    description:
      'CISP之家是专注于CISP认证培训与服务的专业平台，致力于帮助信息安全从业者顺利通过CISP认证并提升专业能力。',
    link: 'https://www.cisp.cn/page/1801337?navIndex=0',
  },
])

// 搜索关键词
const searchKeyword = ref('')

// 计算属性：根据搜索关键词过滤文章
const filteredCompetitions = computed(() => {
  if (!searchKeyword.value.trim()) {
    return competitions.value
  }

  const keyword = searchKeyword.value.toLowerCase()
  return competitions.value.filter(
    (competition) =>
      competition.title.toLowerCase().includes(keyword) ||
      competition.description.toLowerCase().includes(keyword),
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
.competition-page {
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

.competition-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 24px;
}

.competition-item {
  transition: all 0.3s ease;
}

.competition-item:hover {
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
