<!-- src/views/ArticleView.vue -->
<template>
  <div class="article-page">
    <div class="page-header">
      <h1 class="page-title">文章推荐</h1>
      <p class="page-description">精选优质的CTF文章</p>
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

    <div class="article-grid">
      <article-card
        v-for="article in filteredArticles"
        :key="article.id"
        :article="article"
        class="article-item"
      />
    </div>

    <!-- 无搜索结果提示 -->
    <div v-if="filteredArticles.length === 0" class="no-results">
      <el-empty description="未找到相关文章" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import ArticleCard from '@/components/ArticleCard.vue'
import SearchInput from '@/components/SearchInput.vue'

// 文章数据结构
const articles = ref([
  {
    id: 'ctf-from-zero-to-one',
    title: 'CTF：从0到1 -> zero2one',
    description:
      'CTF：从0到1 -> zero2one 是一个专注于CTF竞赛入门与技能提升的技术博客，通过系统化的教程、详细的赛题解析和实战经验分享，帮助网络安全初学者从零基础逐步掌握CTF竞赛所需的核心知识与解题技巧。',
    link: 'https://www.cnblogs.com/c10udlnk/p/14213804.html',
  },
  {
    id: 'security-cert-guide',
    title: '攻防领域考证指南：从入门到高级',
    description:
      '攻防领域考证指南是系统梳理网络安全攻防方向职业认证路径的实用资源，涵盖从基础入门到专家级别的国际国内主流认证，为安全从业者提供认证选择、备考建议和职业发展指导。',
    link: 'https://mp.weixin.qq.com/s?__biz=MzU4MjUxNjQ1Ng==&mid=2247522220&idx=1&sn=625a299ccd415dd54f5b7f03703c5320&chksm=fc7e89e4b87ee494c18abfd3666e28d706a3dee0db443b9d67d43190d01b6510d34f6ceb1156&scene=27',
  },
  {
    id: 'ida-kali-remote-debug',
    title: 'IDA在Kali上进行远程调试',
    description:
      'IDA Pro在Kali Linux上进行远程调试是一种常见的高级逆向工程技术配置，通过搭建IDA Windows主机与Kali Linux目标机之间的调试环境，实现对Linux平台二进制程序的动态分析和漏洞挖掘。',
    link: 'https://blog.csdn.net/liKeQing1027520/article/details/137482798',
  },
  {
    id: 'vmware-tutorial',
    title: 'VMware 保姆级安装教程',
    description:
      'VMware保姆级安装教程是一份面向初学者的详细虚拟化软件安装指南，通过步骤拆解、截图标注和常见问题解答，帮助用户快速掌握VMware Workstation或VMware Player的安装、配置及基本操作，为后续搭建渗透测试或CTF练习环境奠定基础。',
    link: 'https://blog.csdn.net/weixin_74195551/article/details/127288338',
  },
  {
    id: 'kali-mirror',
    title: 'Kali 更换源',
    description:
      'Kali Linux 更换源是指将其默认的软件包下载服务器地址替换为国内镜像源（如阿里云、清华大学、中科大等），以大幅提升软件更新和安装的速度及稳定性，避免因网络延迟或限制导致的下载失败问题。',
    link: 'https://blog.csdn.net/ak450203619/article/details/142287625',
  },
  {
    id: 'docker-mirrors-cn',
    title: '国内Docker镜像源汇总',
    description:
      '国内Docker镜像源是由各大云服务商、高校及开源组织提供的Docker镜像加速服务，旨在解决国内用户拉取Docker官方镜像速度慢的问题，通过替换镜像源可实现镜像下载加速，提升容器化开发与部署效率。',
    link: 'https://blog.csdn.net/c12312303/article/details/146428465',
  },
  {
    id: 'reverse-engineering-practice',
    title: '[反汇编练习]',
    description: '[反汇编练习] 160个CrackMe 是比较适合新手学习逆向破解的CrackMe系列。',
    link: 'https://www.52pojie.cn/thread-709699-1-1.html',
  },
  {
    id: 'kali-pwn-config',
    title: 'Kali Pwn 环境配置',
    description:
      'Kali Pwn 环境配置是指在Kali Linux操作系统中搭建和配置用于二进制漏洞利用（Pwn）研究的工具集合，核心包括GDB调试器及其增强插件（如Pwndbg、GEF、Peda）、漏洞利用开发框架（如Pwntools）以及相关依赖库，旨在为CTF竞赛和二进制安全研究提供高效的漏洞分析与利用环境。',
    link: 'https://www.cnblogs.com/kenwblack/p/18404024',
  },
  {
    id: 'vmware-nat-service-error',
    title: 'VMware NAT Service 服务无法启动',
    description:
      'VMware NAT Service服务无法启动是VMware虚拟机网络连接常见问题，通常由服务冲突、网络配置错误或软件损坏引起，表现为虚拟机无法通过NAT模式访问外部网络，需通过服务重启、网络重置或软件修复等方式解决。',
    link: 'https://blog.csdn.net/OMGcome/article/details/123237972',
  },
  {
    id: 'student-security-income',
    title: '网络安全在校大学生赚外快',
    description:
      '网络安全在校大学生可通过参与众测项目、漏洞赏金计划、CTF赛事奖金、安全服务兼职、技术文章投稿及知识付费等多种合规途径，利用专业技能获取额外收入，同时在实践中提升实战能力。',
    link: 'https://blog.csdn.net/wananxuexihu/article/details/144025988',
  },
  {
    id: 'ctf-training-methods',
    title: '针对CTF，大家都是怎么训练的？',
    description: '该帖子详细讨论了"针对CTF，大家都是怎么训练的？"',
    link: 'https://www.zhihu.com/question/30505597',
  },
])

// 搜索关键词
const searchKeyword = ref('')

// 计算属性：根据搜索关键词过滤文章
const filteredArticles = computed(() => {
  if (!searchKeyword.value.trim()) {
    return articles.value
  }

  const keyword = searchKeyword.value.toLowerCase()
  return articles.value.filter(
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
.article-page {
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

.article-grid {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  margin: 0 auto;
}

.article-item {
  transition: all 0.3s ease;
  width: 100%;
}

.article-item:hover {
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
