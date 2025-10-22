<template>
  <div class="category-page">
    <!-- 页面头部 -->
    <div class="page-header">
      <h1 class="page-title">{{ currentCategory?.name }}</h1>
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

    <!-- 资源列表 -->
    <div class="category-grid">
      <category-card
        v-for="resource in filteredCategoryResources"
        :key="resource.id"
        :resource="resource"
        class="resource-item"
      />
    </div>

    <!-- 无搜索结果提示 -->
    <div v-if="filteredCategoryResources.length === 0" class="no-results">
      <el-empty description="未找到相关资源" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import CategoryCard from '@/components/CategoryCard.vue'
import SearchInput from '@/components/SearchInput.vue'

const route = useRoute()

// 分类映射
const categoryMap = {
  web: { name: 'Web', color: '#67C23A' },
  pwn: { name: 'Pwn', color: '#F56C6C' },
  crypto: { name: 'Crypto', color: '#E6A23C' },
  reverse: { name: 'Reverse', color: '#409EFF' },
  misc: { name: 'Misc', color: '#909399' },
  universality: { name: '通用', color: '#C0C4CC' },
  awd: { name: 'AWD', color: '#E6A23C' },
}

const currentCategory = computed(() => {
  return categoryMap[route.params.id]
})

// 模拟分类资源数据
const categoryResources = ref([])

watch(
  () => route.params.id,
  (newId, oldId) => {
    if (newId !== oldId) {
      loadCategoryResources(newId)
    }
  },
)

const loadCategoryResources = (categoryId) => {
  const mockData = {
    web: [
      {
        id: 'portswigger',
        title: 'PortSwigger',
        description:
          'PortSwigger是知名网络安全公司，旗下开发了世界领先的Web应用程序安全测试工具Burp Suite，并提供免费的Web安全学院，通过系统的学习路径、交互式实验和真实漏洞环境。',
        link: 'https://portswigger.net/',
      },
      {
        id: 'antsword',
        title: '蚁剑',
        description: '蚁剑工具是一个非常强大的注入连接后端工具，适用于各种渗透测试和安全研究。',
        link: 'https://github.com/AntSwordProject/antSword',
      },
      {
        id: 'yujian',
        title: '御剑目录扫描 专业版',
        description:
          '御剑目录扫描 是一个基于Python的Web目录扫描工具，可对指定URL进行目录扫描，并返回扫描结果。',
        link: 'https://github.com/foryujian/yjdirscan',
      },
      {
        id: 'sqlmap',
        title: 'SQLMap',
        description:
          'SQLMap是一款开源的自动化SQL注入检测与利用工具，由Python语言编写，支持多种数据库类型和广泛的注入技术，能够帮助安全人员快速识别和利用Web应用中的SQL注入漏洞。',
        link: 'http://sqlmap.org/',
      },
      {
        id: 'gopherus',
        title: 'Gopherus',
        description:
          'Gopherus是一款专为利用Gopher协议进行SSRF（服务器端请求伪造）攻击而设计的开源工具，能够自动生成针对多种常见应用的Gopher payload。',
        link: 'https://github.com/tarunkant/Gopherus',
      },
      {
        id: 'nmap',
        title: 'Nmap',
        description:
          'Nmap是一款开源的网络扫描和安全审计工具，被广泛誉为网络安全领域的‘瑞士军刀’，是渗透测试和网络管理中的必备工具。',
        link: 'https://nmap.org/',
      },
      {
        id: 'dirbuster-gobuster',
        title: 'DirBuster',
        description:
          'DirBuster是网络安全领域中广泛使用的目录和文件暴力扫描工具，主要用于在Web渗透测试过程中发现隐藏的目录、文件和虚拟主机，通过字典攻击帮助安全人员识别潜在的可访问资源或敏感信息泄露点。',
        link: 'https://github.com/OJ/gobuster',
      },
      {
        id: 'wpscan',
        title: 'WPScan',
        description:
          'WPScan是一款专门针对WordPress网站的安全扫描工具，用于检测WordPress核心、主题和插件中的已知漏洞、弱配置及安全隐患，被广泛用于安全评估和渗透测试中，是WordPress安全审计的重要工具。',
        link: 'https://wpscan.com/',
      },
      {
        id: 'hackbar',
        title: 'Hackbar',
        description:
          'Hackbar是一款集成于浏览器中的渗透测试工具，主要用于快速构造和发送HTTP请求，支持SQL注入、XSS等常见Web安全漏洞的手动测试与验证，是Web安全研究人员和渗透测试人员的常用辅助工具。',
        link: 'https://addons.mozilla.org/zh-CN/firefox/addon/hackbar/',
      },
      {
        id: 'postman',
        title: 'Postman',
        description:
          'Postman是一款广泛使用的API开发、测试和文档化协作平台，提供强大的HTTP请求构建、自动化测试、环境变量管理和团队协作功能，极大提升了API开发调试效率，是Web开发和安全测试领域的核心工具之一。',
        link: 'https://www.postman.com/',
      },
    ],
    pwn: [
      {
        id: 'pwnable.kr',
        title: 'pwnable.kr',
        description:
          'pwnable.kr是一个专注于二进制漏洞利用（Pwn）的在线CTF挑战平台，提供从入门到高级的系列实战题目，旨在通过真实的系统环境帮助安全爱好者深入理解漏洞挖掘与利用技术，是国际知名的Pwn方向专项训练平台。',
        link: 'http://pwnable.kr/',
      },
      {
        id: 'libc-database',
        title: 'libc-database',
        description:
          'libc-database 是一个开源的 libc 数据库工具，用于快速查找和匹配不同版本 libc 库的基地址偏移，在 CTF 的 Pwn 题型中极大简化了漏洞利用时获取系统函数地址的流程，是二进制安全研究的重要辅助资源。',
        link: 'https://github.com/niklasb/libc-database',
      },
      {
        id: 'ptmalloc2',
        title: 'ptmalloc2 源码',
        description:
          'ptmalloc2是Linux系统glibc库中默认使用的动态内存分配器，专注于高效处理多线程环境下的内存分配与释放，其堆管理机制常成为CTF中堆漏洞利用的研究重点。',
        link: 'https://sourceware.org/git/?p=glibc.git;a=blob;f=malloc/malloc.c',
      },
      {
        id: 'vulnhub',
        title: 'VulnHub',
        description:
          'VulnHub是一个提供大量易受攻击的虚拟机的在线平台，专为网络安全爱好者和学习者设计，用于在安全合法的环境中练习渗透测试、漏洞挖掘和应急响应等实战技能。',
        link: 'https://www.vulnhub.com/',
      },
      {
        id: 'gdb',
        title: 'GDB',
        description:
          'GNU调试器（GDB）是类Unix系统下最强大的命令行调试工具，支持多种编程语言和处理器架构，为Linux系统开发和逆向工程提供核心调试能力。',
        link: 'https://www.sourceware.org/gdb/',
      },
      {
        id: 'ropgadget',
        title: 'ROPgadget',
        description:
          'ROPgadget是一款功能强大的开源工具，专为ROP漏洞利用开发而设计，能够自动在二进制文件中搜索并提取可用于构建ROP链的gadget序列，是二进制安全研究和漏洞利用中的常用工具。',
        link: 'https://github.com/JonathanSalwan/ROPgadget',
      },
      {
        id: 'checksec',
        title: 'Checksec',
        description:
          'checksec 是一个用于检查可执行文件安全属性的脚本工具，常集成于 pwntools 或单独使用，能够快速识别程序的防护机制（如 NX、PIE、Canary、RELRO 等），是二进制漏洞利用（Pwn）分析和调试中的必备辅助工具。',
        link: 'https://github.com/slimm609/checksec.sh',
      },
      {
        id: 'nc',
        title: 'Netcat',
        description:
          'nc（netcat）是一款网络调试和连接工具，被誉为“网络瑞士军刀”，常用于 CTF 中与远程服务进行 TCP/UDP 通信、端口扫描、数据传输或建立反向 shell，是网络攻防和渗透测试中的基础工具。',
        link: 'https://nmap.org/ncat/',
      },
      {
        id: 'objdump',
        title: 'Objdump',
        description:
          'objdump 是 GNU Binutils 套件中的反汇编工具，可用于显示二进制文件（如 ELF）的段信息、符号表、反汇编代码等，是逆向工程和漏洞分析中查看程序结构和逻辑的核心工具。',
        link: 'https://www.gnu.org/software/binutils/',
      },
      {
        id: 'libcsearcher',
        title: 'LibcSearcher',
        description:
          'LibcSearcher 是一款专为 Pwn 类题目设计的 Python 工具，用于在漏洞利用过程中快速查找和匹配目标系统的 libc 库版本，通过给定函数地址计算 libc 基址，简化 ROP 攻击链的构建。',
        link: 'https://github.com/lieanu/LibcSearcher',
      },
      {
        id: 'pwnpasi',
        title: 'pwnpasi',
        description:
          'pwnpasi 是一款专注于 Pwn 类题目辅助的自动化漏洞利用框架，集成常用漏洞利用模式与调试功能，帮助选手快速生成 exploit 脚本，提升解题效率。',
        link: 'https://github.com/heimao-box/pwnpasi',
      },
    ],
    crypto: [
      {
        id: 'md5-decrypt-online',
        title: 'md5在线解密',
        description:
          'md5在线解密是提供MD5哈希值查询与破解服务的网络工具平台，常用于密码恢复、数字取证及安全测试等场景。',
        link: 'https://www.cmd5.com/',
      },
      {
        id: 'cryptohack',
        title: 'CryptoHack',
        description:
          'CryptoHack是一个专注于密码学学习的交互式平台，通过游戏化方式提供从古典密码到现代公钥密码体系的系列挑战。',
        link: 'https://cryptohack.org/',
      },
      {
        id: 'cyberchef',
        title: 'CyberChef',
        description:
          'CyberChef 是由英国政府通信总部开源的一款强大的网络数据编解码与分析工具，提供超过300种数据操作功能，被誉为‘网络安全的瑞士军刀’，广泛应用于CTF竞赛、数字取证和日常安全分析工作。',
        link: 'https://gchq.github.io/CyberChef/',
      },
      {
        id: 'wolframalpha',
        title: 'WolframAlpha',
        description:
          'WolframAlpha是由Wolfram Research开发的全球知名计算知识引擎，它通过强大的符号计算、数据分析和知识查询能力，为CTF参赛者在密码学题目中提供关键的解题辅助与验证支持。',
        link: 'https://www.wolframalpha.com/',
      },
      {
        id: 'alpertron-factorization',
        title: 'Alpertron Integer Factorization Calculator',
        description:
          'Alpertron 支持试除法、Pollard rho算法和二次筛法等多种分解技术，适合中小规模大整数分解。',
        link: 'https://www.alpertron.com.ar/ECM.HTM',
      },
      {
        id: 'kinds-of-deciphering',
        title: '各种解码网站',
        description: '这是一个包含各种解码网站的帖子',
        link: 'https://www.cnblogs.com/ichunqiu/p/8297620.html',
      },
      {
        id: 'gmpy2',
        title: 'gmpy2',
        description:
          'gmpy2是一个专为Python设计的高性能多精度算术库，它封装了GMP、MPFR和MPC等底层C库，为密码学、数学计算和CTF竞赛中的大整数运算及高精度数学问题提供强大的计算支持。',
        link: 'https://pypi.org/project/gmpy2/',
      },
    ],
    reverse: [
      {
        id: 'ida-pro',
        title: 'IDA Pro 8.3 绿色版',
        description:
          'IDA Pro是Hex-Rays公司开发的业界顶级交互式反汇编器和调试器，广泛应用于软件逆向工程、漏洞分析和恶意代码研究领域。',
        link: 'https://www.52pojie.cn/archiver/tid-1874203.html',
      },
      {
        id: 'keypatch',
        title: 'Keypatch',
        description:
          'Keypatch是一款基于Keystone引擎的二进制文件补丁插件，最初作为IDA Pro的扩展工具开发，能够直接在反汇编视图中修改指令，极大简化了二进制分析和漏洞利用过程中的代码修补流程。',
        link: 'https://github.com/keystone-engine/keypatch',
      },
      {
        id: 'crackme',
        title: 'CrackME',
        description:
          'CrackME是一类专为逆向工程学习者设计的练习程序，通常以破解序列号、绕过验证或分析算法为目标，帮助安全爱好者实践软件逆向、调试及漏洞分析技能。',
        link: 'https://crackmes.one/',
      },
      {
        id: 'dogmamix-mime',
        title: 'Dogmamix MIME',
        description:
          'Dogmamix MIME 是一个专注于网络安全领域MIME类型安全研究的专业技术项目或平台，致力于分析和挖掘MIME类型处理过程中的安全漏洞与攻击面。',
        link: 'https://dogmamix.com/cms/blog/About',
      },
      {
        id: 'ghidra',
        title: 'Ghidra',
        description:
          'Ghidra是由美国国家安全局（NSA）研究部门开发的免费开源软件逆向工程框架，支持反编译、汇编、代码调试等功能，尤其擅长二进制文件分析和漏洞研究，是IDA Pro的强大替代工具。',
        link: 'https://ghidra-sre.org/',
      },
      {
        id: 'peid',
        title: 'PEiD',
        description:
          'PEiD是一款用于检测Windows PE文件打包器、加密器和编译器的工具，通过特征码识别常见保护方式，是早期Windows程序逆向分析中广泛使用的入门级工具。',
        link: 'https://gitcode.com/Universal-Tool/a1209',
      },
      {
        id: 'ollydbg',
        title: 'OllyDbg',
        description:
          'OllyDbg是一款经典的Windows平台动态调试工具，以其直观的界面和强大的汇编级调试能力著称，广泛应用于软件漏洞分析和破解领域，尤其适合32位应用程序调试。',
        link: 'http://www.ollydbg.de/',
      },
      {
        id: 'x64dbg',
        title: 'x64dbg',
        description:
          'x64dbg是面向Windows平台的开放源代码调试器，支持32位和64位应用程序的动态调试，具有现代界面和插件扩展功能，已成为OllyDbg的重要替代方案。',
        link: 'https://x64dbg.com/',
      },
      {
        id: 'gdb',
        title: 'GDB',
        description:
          'GNU调试器（GDB）是类Unix系统下最强大的命令行调试工具，支持多种编程语言和处理器架构，为Linux系统开发和逆向工程提供核心调试能力。',
        link: 'https://www.sourceware.org/gdb/',
      },
      {
        id: 'jeb',
        title: 'JEB Decompiler',
        description:
          'JEB是由PNF软件开发的专业级反编译平台，支持Android Dalvik字节码、Java字节码和原生代码的高级反编译，广泛应用于移动应用安全评估和恶意软件分析。',
        link: 'https://www.pnfsoftware.com/jeb/',
      },
      {
        id: 'frida',
        title: 'Frida',
        description:
          'Frida是一款动态代码插桩工具框架，允许通过JavaScript注入方式监控和修改运行中程序的函数执行，支持多平台移动应用和桌面程序的运行时分析。',
        link: 'https://frida.re/',
      },
      {
        id: 'androidkiller',
        title: 'AndroidKiller',
        description:
          'AndroidKiller是一款集成了Apk反编译、代码编辑、重打包等功能的Android应用综合分析工具，为Android应用安全研究提供一站式解决方案。',
        link: 'https://github.com/lumirelle/android-killer',
      },
      {
        id: 'radare2',
        title: 'Radare2',
        description:
          'Radare2是功能强大的开源逆向工程框架，支持命令行环境的二进制文件分析、调试和漏洞挖掘，以其跨平台能力和脚本自动化特性深受安全研究人员青睐。',
        link: 'https://rada.re/n/',
      },
      {
        id: 'die',
        title: 'DIE',
        description:
          'DIE（Detect It Easy）是一款功能强大的跨平台文件类型识别和特征分析工具，支持多种文件格式的深度检测，常用于CTF竞赛中的逆向工程和杂项题目分析，能够快速识别文件真实类型、加密方式及隐藏信息。',
        link: 'https://github.com/horsicq/Detect-It-Easy/',
      },
    ],
    misc: [
      {
        id: 'stegsolve',
        title: 'Stegsolve',
        description:
          'Stegsolve是一款专用于解决CTF竞赛中图像隐写类题目的轻量级Java工具，提供多种图像分析功能（如帧浏览、色彩通道分离、色彩平面查看等），能够有效辅助参赛者发现隐藏在图片中的敏感信息或flag。',
        link: 'https://github.com/Giotino/stegsolve',
      },
      {
        id: 'koczkatamas',
        title: 'Koczkatamas',
        description:
          'Koczkatamas是一款离线解码工具，主要用于ASCII、十六进制、八进制之间的转换以及Base64等编码的解码。',
        link: 'https://koczkatamas.github.io/',
      },
      {
        id: 'audacity',
        title: 'Audacity',
        description:
          'Audacity是一款开源、免费且跨平台的音频录制与编辑软件，支持多种音频格式处理、特效添加及音轨混合等功能，广泛应用于播客制作、音乐编辑和音频研究等场景。',
        link: 'https://www.audacityteam.org/',
      },
      {
        id: 'potplayer64',
        title: 'PotPlayer64',
        description:
          'PotPlayer64是韩国开发者姜龙喜开发的64位Windows平台多媒体播放器，以轻量高效、支持格式广泛和强大的自定义功能著称，是本地视频播放的常用工具。',
        link: 'https://potplayer.daum.net/',
      },
      {
        id: '010editor',
        title: '010 Editor',
        description:
          '010 Editor是一款专业的十六进制编辑器和二进制文件分析工具，支持通过强大的模板解析技术对文件结构进行深度分析，广泛应用于数字取证、文件格式研究等网络安全领域。',
        link: 'https://www.sweetscape.com/010editor/',
      },
      {
        id: 'winhex',
        title: 'WinHEX',
        description:
          'WinHEX是一款由X-Ways公司开发的专业十六进制编辑器及磁盘数据恢复工具，广泛应用于计算机取证、数据恢复、底层数据分析及日常编程工作中。',
        link: 'https://www.x-ways.net/winhex/',
      },
      {
        id: 'archpr',
        title: 'ARCHPR',
        description:
          'ARCHPR是一款专业的压缩文件密码恢复工具，主要用于通过暴力破解、字典攻击或掩码攻击等方式恢复ZIP、RAR等压缩文件的密码，在CTF竞赛的Misc题型中常用于加密压缩包破解挑战。',
        link: 'https://www.elcomsoft.com/archpr.html',
      },
      {
        id: 'ziperello',
        title: 'Ziperello',
        description:
          'Ziperello是一款专注于恢复ZIP压缩包密码的免费工具，支持通过字典攻击、暴力破解及混合攻击等方式帮助用户找回遗忘的密码，是数字取证和数据恢复领域的实用辅助软件。',
        link: 'https://soft.3dmgame.com/down/193773.html',
      },
      {
        id: 'tweakpng',
        title: 'TweakPNG',
        description:
          'TweakPNG是一款专门用于查看和编辑PNG图像文件底层数据结构的轻量级工具，可解析PNG块（Chunk）结构、修改元数据及修复文件错误，常被CTF参赛者用于解决与PNG隐写术相关的MISC题目。',
        link: 'http://entropymine.com/jason/tweakpng/',
      },
      {
        id: 'qr_research',
        title: 'QR_Research',
        description:
          'QR_Research是一个专注于二维码（QR Code）安全研究的CTF竞赛方向或专项挑战，通常涉及二维码的编解码分析、数据隐写、漏洞挖掘及创新攻击手法研究，旨在通过实战题目提升参赛者对二维码安全风险的认识和防护能力。',
        link: 'https://gitcode.com/open-source-toolkit/97c34',
      },
      {
        id: 'zipcenop',
        title: 'ZipCenOp',
        description:
          'ZipCenOp是一款专门用于检测和修复ZIP压缩包因数据起始位置被修改而导致无法正常打开的CTF工具，常用于解决MISC类题目中因ZIP文件头被篡改或中心目录起始记录被覆盖而产生的文件修复问题。',
        link: 'https://gitcode.com/Universal-Tool/4a242',
      },
      {
        id: 'foremost',
        title: 'Foremost',
        description:
          'Foremost是一款基于文件头、尾和内部数据结构的开源数据恢复与取证工具，主要用于从磁盘镜像或原始存储介质中恢复被删除的文件，支持多种文件格式的识别与提取。',
        link: 'http://foremost.sourceforge.net/',
      },
      {
        id: 'wireshark',
        title: 'Wireshark',
        description:
          'Wireshark是一款全球广泛使用的开源网络协议分析工具，能够实时捕获并深入检测网络数据包，支持上千种协议的解码和可视化分析，是网络故障排查、安全分析、协议学习和开发调试的核心工具。',
        link: 'https://www.wireshark.org/',
      },
      {
        id: 'tcpdump',
        title: 'tcpdump',
        description:
          'tcpdump是一款功能强大的命令行网络数据包分析工具，用于实时捕获和分析网络接口上传输的数据包。它支持针对网络层、协议、主机、端口等进行过滤，并提供灵活的表达式来精确筛选流量。',
        link: 'https://www.tcpdump.org/index.html',
      },
      {
        id: 'john-the-ripper',
        title: 'John the Ripper',
        description:
          'John the Ripper 是一款经典的开源密码破解工具，专注于通过字典攻击、暴力破解等多种方式检测弱密码强度，广泛应用于系统安全审计和数字取证领域。',
        link: 'https://www.openwall.com/john/',
      },
    ],
    awd: [
      {
        id: 'awd-platform',
        title: 'AWD Platform',
        description:
          'AWD Platform是赛宁网安推出的专业化网络攻防竞技平台，专注于AWD 攻防混战赛制，提供实时攻防对抗、漏洞利用与修复、自动化评分等核心功能，广泛应用于各类网络安全竞赛和实战训练。',
        link: 'https://github.com/Mitooooo/Cardinal',
      },
    ],
    universality: [
      {
        id: 'ctf-tools',
        title: 'CTF Tools',
        description:
          'CTF Tools是专为CTF竞赛设计的工具集合平台或资源站，整合了逆向工程、密码学、漏洞利用等领域的常用软件和脚本，为参赛者提供一站式的工具查询、下载和使用指南。',
        link: 'https://www.ctftools.com/',
      },
      {
        id: 'getshell',
        title: '极核GetShell',
        description:
          '极核GetShell是由国内知名安全团队或企业发起的网络安全实战技能竞赛平台，专注于通过模拟真实场景的漏洞利用与渗透测试挑战，提升参赛者的攻防实战能力与漏洞挖掘技术。',
        link: 'https://get-shell.com/',
      },
      {
        id: 'ctfever-toolkit',
        title: 'CTFever Toolkit',
        description:
          'CTFever Toolkit是一款专为CTF竞赛设计的集成化工具包，集成了编码解码、密码学分析、网络抓包等常用功能，旨在为参赛者提供便捷的一站式解题辅助工具，提升竞赛效率。',
        link: 'https://ctfever.uniiem.com/',
      },
      {
        id: 'personal-toolkit',
        title: 'Binary 军火库',
        description:
          'Binary 军火库是由IVN工作室创始人所汇总，用于CTF竞赛的常用工具包、网课资源、电子书籍等等。',
        link: 'https://pan.baidu.com/s/1eeetP0eOB61LTJ8kINbgnQ?pwd=cjbs',
      },
      {
        id: 'ctftool',
        title: 'CTF在线工具',
        description:
          'CTF在线工具是一个集成了多种CTF竞赛常用加解密、编码转换、漏洞利用等功能的Web工具平台，旨在为参赛者提供便捷高效的解题辅助工具，大幅提升解题效率。',
        link: 'http://www.hiencode.com/',
      },
      {
        id: 'kali-linux',
        title: 'Kali Linux',
        description:
          'Kali Linux 是由 Offensive Security 团队维护的、基于 Debian 的 Linux 发行版，专为渗透测试、安全审计和数字取证设计。它预装了 600 多种安全工具（如 Nmap、Metasploit、Wireshark），支持滚动更新和多平台部署，广泛应用于网络安全研究、渗透测试、教育培训及 CTF 竞赛。',
        link: 'https://www.kali.org',
      },
      {
        id: 'vmware-workstation-pro',
        title: 'VMware Workstation Pro 17',
        description:
          'VMware Workstation Pro 17是VMware公司推出的专业级桌面虚拟化软件，广泛应用于软件开发、测试、教学及网络安全攻防演练等领域，提供沙箱隔离环境以安全执行各类实验。',
        link: 'https://www.vmware.com/products/workstation-pro.html',
      },
      {
        id: 'docker',
        title: 'Docker',
        description:
          'Docker 是一个开源的应用容器引擎，广泛应用于 CTF 赛事中用于隔离赛题环境、统一运行平台，确保题目在独立、可复现的容器中执行，提升比赛公平性和部署效率。',
        link: 'https://www.docker.com/',
      },
    ],
  }

  categoryResources.value = mockData[categoryId] || []
}

onMounted(() => {
  loadCategoryResources(route.params.id)
})

// 搜索关键词
const searchKeyword = ref('')

// 计算属性：根据搜索关键词过滤文章
const filteredCategoryResources = computed(() => {
  if (!searchKeyword.value.trim()) {
    return categoryResources.value
  }

  const keyword = searchKeyword.value.toLowerCase()
  return categoryResources.value.filter(
    (resource) =>
      resource.title.toLowerCase().includes(keyword) ||
      resource.description.toLowerCase().includes(keyword),
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
.category-page {
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

.category-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 24px;
}

.category-item {
  transition: all 0.3s ease;
}

.category-item:hover {
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
  .category-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .category-page {
    padding: 15px;
  }
}
</style>
