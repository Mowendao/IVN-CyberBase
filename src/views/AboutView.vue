<template>
  <div class="about-page">
    <div class="container">
      <el-card>
        <template #header>
          <h2>关于IVN CTF军火库</h2>
        </template>

        <div class="about-content">
          <p>
            本站是一个专注于CTF（Capture The
            Flag）竞赛资源的导航网站，旨在为网络安全爱好者和CTF参赛者提供全面的资源整合服务。
          </p>

          <h3>网站特色</h3>
          <ul>
            <li>🔍 全面的CTF资源分类整理</li>
            <li>🛠️ 丰富的在线工具集合</li>
            <li>🎯 精准的资源搜索功能</li>
            <li>📚 持续更新的资源库</li>
          </ul>

          <h3>技术栈</h3>
          <el-tag type="primary">Vue 3</el-tag>
          <el-tag type="success">Element Plus</el-tag>
          <el-tag type="warning">Vue Router</el-tag>
          <el-tag type="danger">JavaScript</el-tag>

          <h3>联系我们</h3>
          <p>如有建议或问题，请联系我们：3049252967@qq.com</p>
        </div>
      </el-card>
    </div>
  </div>
</template>

<style scoped>
.about-page {
  padding: 40px 20px;
  min-height: 100%;
}

.container {
  max-width: 800px;
  margin: 0 auto;
}

.about-content h3 {
  color: #333;
  margin: 20px 0 10px 0;
}

.about-content ul {
  color: #666;
  line-height: 1.8;
}

.about-content .el-tag {
  margin: 5px;
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
