<template>
  <div class="ctf-intro">
    <!-- 页面标题 -->
    <h1 class="ctf-title-glitzy">CTF竞赛简介</h1>

    <!-- CTF基本定义 -->
    <el-card class="intro-card">
      <template #header>
        <div class="card-header">
          <h2>什么是CTF竞赛？</h2>
        </div>
      </template>
      <div class="intro-content">
        <p>
          <strong>CTF（Capture The Flag，夺旗赛）</strong>是网络安全领域的技术竞技比赛，
          起源于1996年DEFCON全球黑客大会，旨在通过安全可控的方式替代早期黑客间的真实攻击比拼。
        </p>
        <p>
          参赛者通过破解漏洞、分析程序或攻防对抗，寻找隐藏的<el-tag type="danger">Flag</el-tag>
          （一串特定格式的字符串）来得分。这种竞赛形式已成为发现和培养网络安全人才的重要途径。
        </p>
      </div>
    </el-card>

    <!-- 竞赛模式对比 -->
    <h3 class="section-title">竞赛模式对比</h3>
    <el-row :gutter="20" class="mode-comparison">
      <el-col :xs="24" :md="8">
        <el-card shadow="hover" class="mode-card">
          <template #header>
            <div class="mode-header">
              <el-icon><Reading /></el-icon>
              <span>解题模式（Jeopardy）</span>
            </div>
          </template>
          <div class="mode-content">
            <p><strong>特点：</strong>类似闯关答题，按题目分值和解题时间排名</p>
            <p><strong>题目类型：</strong>Web、逆向、密码学、杂项等分类挑战</p>
            <p><strong>适合人群：</strong>新手入门首选，可独立解题</p>
          </div>
        </el-card>
      </el-col>

      <el-col :xs="24" :md="8">
        <el-card shadow="hover" class="mode-card">
          <template #header>
            <div class="mode-header">
              <el-icon><Connection /></el-icon>
              <span>攻防模式（AWD）</span>
            </div>
          </template>
          <div class="mode-content">
            <p><strong>特点：</strong>实时攻防对抗，同时进行攻击和防御</p>
            <p><strong>比赛形式：</strong>各队维护相同漏洞的服务，互相攻击夺旗</p>
            <p><strong>适合人群：</strong>有经验选手，考验团队协作和实战能力</p>
          </div>
        </el-card>
      </el-col>

      <el-col :xs="24" :md="8">
        <el-card shadow="hover" class="mode-card">
          <template #header>
            <div class="mode-header">
              <el-icon><MagicStick /></el-icon>
              <span>混合模式（Mix）</span>
            </div>
          </template>
          <div class="mode-content">
            <p><strong>特点：</strong>结合解题和攻防两种模式特点</p>
            <p><strong>比赛形式：</strong>先解题获得基础分，再进行攻防对抗</p>
            <p><strong>适合人群：</strong>全面型选手，适应多种比赛场景</p>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 题目类型分布 -->
    <h3 class="section-title">核心题目类型</h3>
    <el-table :data="questionTypes" style="width: 100%" empty-text="暂无数据">
      <el-table-column prop="type" label="类型" width="120">
        <template #default="scope">
          <el-tag :type="scope.row.tagType">{{ scope.row.type }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="名称" width="150" />
      <el-table-column prop="focus" label="考察重点" min-width="200" />
      <el-table-column prop="tools" label="常用工具" min-width="250" />
    </el-table>

    <!-- 学习路径 -->
    <el-card class="learning-path">
      <template #header>
        <div class="card-header">
          <h2>CTF学习路径建议</h2>
        </div>
      </template>
      <el-steps direction="vertical" :active="6">
        <el-step title="基础阶段" description="掌握计算机网络、操作系统、编程语言（Python）基础" />
        <el-step title="专项入门" description="从Web安全或Misc杂项入手，了解常见漏洞和解题思路" />
        <el-step title="工具熟悉" description="学习使用Burp Suite、Wireshark、IDA Pro等安全工具" />
        <el-step title="实战练习" description="在CTF平台上刷题，阅读Writeup学习解题思路" />
        <el-step title="团队协作" description="加入战队参与比赛，锻炼协作和临场问题解决能力" />
        <el-step title="持续精进" description="关注新技术漏洞研究，参加高水平赛事提升技能" />
      </el-steps>
    </el-card>

    <!-- 知名赛事 -->
    <h3 class="section-title">知名CTF赛事</h3>
    <el-collapse accordion class="competition-list">
      <el-collapse-item name="1">
        <template #title>
          <span class="competition-title">DEFCON CTF</span>
        </template>
        <div class="competition-content">
          <p><strong>级别：</strong>全球顶级，被誉为CTF"世界杯"</p>
          <p><strong>特点：</strong>题目难度极高，采用攻防对抗模式</p>
          <p><strong>技术方向：</strong>逆向工程、0day漏洞利用、内核安全</p>
        </div>
      </el-collapse-item>

      <el-collapse-item name="2">
        <template #title>
          <span class="competition-title">GeekPwn（极客大赛）</span>
        </template>
        <div class="competition-content">
          <p><strong>级别：</strong>国际知名，侧重实战漏洞利用</p>
          <p><strong>特点：</strong>结合智能设备、物联网安全等新兴领域</p>
          <p><strong>技术方向：</strong>Web漏洞、硬件破解、逆向分析</p>
        </div>
      </el-collapse-item>

      <el-collapse-item name="3">
        <template #title>
          <span class="competition-title">强网杯</span>
        </template>
        <div class="competition-content">
          <p><strong>级别：</strong>国内官方顶级赛事</p>
          <p><strong>特点：</strong>聚焦关键信息基础设施安全，贴近实际防护需求</p>
          <p><strong>技术方向：</strong>Web安全、内网渗透、工控安全</p>
        </div>
      </el-collapse-item>

      <el-collapse-item name="4">
        <template #title>
          <span class="competition-title">XCTF联赛</span>
        </template>
        <div class="competition-content">
          <p><strong>级别：</strong>亚洲最大规模的国际性CTF联赛 [5]</p>
          <p>
            <strong>特点：</strong
            >由清华大学蓝莲花战队发起，赛宁网安总体承办，联合多家高校与企业共同举办，旨在发现和培养网络安全实战型技术人才
          </p>
          <p>
            <strong>技术方向：</strong
            >覆盖Web渗透、逆向工程、密码分析、二进制漏洞挖掘利用、取证分析、安全编程等
          </p>
        </div>
      </el-collapse-item>

      <el-collapse-item name="5">
        <template #title>
          <span class="competition-title">长城杯网络安全大赛</span>
        </template>
        <div class="competition-content">
          <p><strong>级别：</strong>由京津冀三地网信办与教委联合主办的全国性社会竞赛</p>
          <p>
            <strong>特点：</strong
            >分设高校组与社会组双赛道，采用全程录屏监控与专家评议机制保障公平性，优胜者可获得企业直通卡
          </p>
          <p><strong>技术方向：</strong>聚焦Web安全、逆向分析、信创安全等前沿安全领域</p>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// 题目类型数据
const questionTypes = ref([
  {
    type: 'WEB',
    name: 'Web安全',
    focus: 'SQL注入、XSS、CSRF等Web漏洞利用',
    tools: 'Burp Suite、SQLMap、浏览器开发者工具',
    tagType: 'danger',
  },
  {
    type: 'REVERSE',
    name: '逆向工程',
    focus: '软件逆向分析、程序逻辑理解',
    tools: 'IDA Pro、Ghidra、x64dbg',
    tagType: 'warning',
  },
  {
    type: 'PWN',
    name: '漏洞利用',
    focus: '二进制漏洞挖掘与利用',
    tools: 'GDB、Pwntools、ROPgadget',
    tagType: 'success',
  },
  {
    type: 'CRYPTO',
    name: '密码学',
    focus: '加解密算法分析与破解',
    tools: 'Python密码学库、CyberChef',
    tagType: '',
  },
  {
    type: 'MISC',
    name: '安全杂项',
    focus: '数字取证、隐写分析、流量分析',
    tools: 'Wireshark、StegSolve、Binwalk',
    tagType: 'info',
  },
])
</script>

<style scoped>
.ctf-title-glitzy {
  font-family: 'Segoe UI', 'Microsoft YaHei UI', sans-serif; /* 现代字体 */
  font-size: 2.8rem; /* 醒目大小 */
  font-weight: 700;
  background: linear-gradient(135deg, #d8bfd8 0%, #4b0082 100%); /* 渐变背景 */
  -webkit-background-clip: text; /* 关键：将背景限制在文字内 */
  background-clip: text;
  -webkit-text-fill-color: transparent; /* 关键：让文字颜色透明，露出背景 */
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.15); /* 增加立体感 */
  text-align: center;
  letter-spacing: 1px; /* 轻微字间距，提升质感 */
  margin: 1rem 0;
  padding: 0.5rem;
}

.section-title {
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

.ctf-intro {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.page-title {
  font-size: 1.8em;
  font-weight: 600;
  color: #333;
}

.intro-card {
  margin: 30px 0;
}

.card-header h2 {
  margin: 0;
  color: #333;
  border-left: 4px solid #409eff;
  padding-left: 10px;
}

.intro-content {
  line-height: 1.6;
  color: #666;
}

.intro-content p {
  margin-bottom: 15px;
}

.mode-comparison {
  margin: 30px 0;
}

.mode-card {
  height: 100%;
  transition: all 0.3s ease;
}

.mode-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
}

.mode-header {
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 600;
  color: #333;
}

.mode-content p {
  margin: 10px 0;
  font-size: 0.9em;
  line-height: 1.4;
}

.learning-path {
  margin: 40px 0;
}

.competition-list {
  margin: 20px 0;
}

.competition-title {
  font-weight: 600;
  font-size: 1.1em;
}

.competition-content {
  padding: 10px 0;
  color: #666;
  line-height: 1.6;
}

.competition-content p {
  margin: 5px 0;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .ctf-intro {
    padding: 15px;
  }

  .page-title {
    font-size: 1.5em;
  }

  .section-title {
    font-size: 1.3em;
  }

  .mode-comparison {
    margin: 20px 0;
  }
}
</style>
