<!-- src/views/PracticeView.vue -->
<template>
  <div class="practice-page">
    <div class="page-header">
      <h1 class="page-title">题库平台</h1>
      <p class="page-description">寻找丰富的CTF实战题库</p>
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

    <div class="practice-grid">
      <practice-card
        v-for="practice in filteredPractices"
        :key="practice.id"
        :practice="practice"
        class="practice-item"
      />
    </div>

    <!-- 无搜索结果提示 -->
    <div v-if="filteredPractices.length === 0" class="no-results">
      <el-empty description="未找到相关平台" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import PracticeCard from '@/components/PracticeCard.vue'
import SearchInput from '@/components/SearchInput.vue'

// 赛事数据
const practices = ref([
  {
    id: 'xctf',
    title: '攻防世界',
    description:
      'XCTF国际网络攻防联赛是由清华大学蓝莲花战队发起、赛宁网安总体承办的，亚洲规模最大、水平最高的网络安全竞赛平台之一，旨在通过实战对抗选拔和培养网络安全人才。',
    link: 'https://adworld.xctf.org.cn/home/index',
  },
  {
    id: 'nssctf',
    title: 'NSSCTF平台',
    description:
      'NSSCTF是由南京宁盾信息科技有限公司（NSS）打造的在线CTF竞赛及学习平台，提供丰富的赛题库、赛事承办和战队管理系统，致力于为网络安全爱好者提供实战练习和技能提升的社区环境。',
    link: 'https://www.nssctf.cn/',
  },
  {
    id: 'buuctf',
    title: 'BUUCTF',
    description:
      'BUUCTF是由北京联合大学主办的CTF竞赛平台，是国内知名的网络安全实战训练平台之一。平台汇集了大量优质的CTF赛题，涵盖Web安全、逆向工程、密码学、杂项等多个方向，为网络安全爱好者提供了丰富的学习资源和实战机会，致力于培养网络安全领域的专业人才。',
    link: 'https://buuoj.cn/',
  },
  {
    id: 'bugkuctf',
    title: 'Bugku CTF',
    description:
      'Bugku CTF是起源于Bugku社区的知名CTF竞赛平台，长期为网络安全初学者和爱好者提供入门及进阶的CTF挑战。平台以丰富的题目类型、友好的社区氛围和系统的学习路径著称，帮助众多安全爱好者打下坚实的实战基础，是国内最具影响力的CTF训练平台之一。',
    link: 'https://ctf.bugku.com/',
  },
  {
    id: 'ctfshow',
    title: 'ctf.show',
    description:
      'ctf.show是国内知名的CTF学习与竞赛平台，以Web安全方向的题目见长，提供从入门到精通的系统化学习路径。平台以其详细的题目解析、活跃的社区交流和丰富的实战题目而深受网络安全初学者喜爱，是提升CTF技能的重要训练基地。',
    link: 'https://ctf.show/',
  },
  {
    id: 'polarctf',
    title: 'PolarD&N',
    description:
      'PolarD&N（北极星攻防）是安恒信息旗下的网络安全竞赛平台，专注于网络攻防实战能力的培养。平台集CTF竞赛、攻防对抗、安全人才培养于一体，提供专业的赛事服务和训练环境，致力于为企业和社会输送高素质的网络安全实战人才。',
    link: 'https://www.polarctf.com/',
  },
  {
    id: 'ctfhub',
    title: 'CTFHub',
    description:
      'CTFHub是专注于CTF技能训练与赛事服务的在线平台，提供丰富的实战题库、技能树学习路径及赛事管理功能，致力于通过系统化训练提升网络安全爱好者的CTF实战能力。',
    link: 'https://www.ctfhub.com/',
  },
  {
    id: 'n1book',
    title: 'N1BOOK平台',
    description:
      '本平台为《从0到1：CTFer成长之路》书籍配套平台，书中的部分例题程序都会在本平台上进行注明。',
    link: 'https://book.nu1l.com/tasks/#/',
  },
  {
    id: 'ichunqiu',
    title: 'i春秋',
    description:
      'i春秋是永信至诚旗下的网络安全在线教育与实践平台，提供丰富的网络安全课程、实战演练环境及CTF竞赛服务，致力于通过“演训赛”一体化模式培养实战型网络安全人才。',
    link: 'https://www.ichunqiu.com/',
  },
  {
    id: 'springcloud-mirror',
    title: '春秋云镜',
    description:
      '春秋云镜是春秋伽玛科技推出的网络安全实战演练平台，专注于提供高度仿真的网络攻防环境，集漏洞复现、攻防对抗、技能评估于一体，提供专业的红蓝对抗实战训练与能力验证服务。',
    link: 'https://yunjing.ichunqiu.com/',
  },
  {
    id: 'tryhackme',
    title: 'TryHackMe',
    description:
      'TryHackMe是一个面向网络安全初学者的在线学习平台，通过交互式虚拟实验环境和结构化学习路径，帮助用户从零开始掌握渗透测试、网络防御等实战技能，其游戏化学习模式深受全球安全爱好者欢迎。',
    link: 'https://tryhackme.com',
  },
])

// 搜索关键词
const searchKeyword = ref('')

// 计算属性：根据搜索关键词过滤文章
const filteredPractices = computed(() => {
  if (!searchKeyword.value.trim()) {
    return practices.value
  }

  const keyword = searchKeyword.value.toLowerCase()
  return practices.value.filter(
    (practice) =>
      practice.title.toLowerCase().includes(keyword) ||
      practice.description.toLowerCase().includes(keyword),
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
.practice-page {
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

.practice-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 24px;
}

.practice-item {
  transition: all 0.3s ease;
}

.practice-item:hover {
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
  .practice-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .practice-page {
    padding: 15px;
  }
}
</style>
