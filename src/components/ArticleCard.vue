<template>
  <div class="article-card">
    <div class="card-header">
      <h3 class="card-title">{{ article.title }}</h3>
    </div>
    <div class="card-body">
      <p class="card-description">{{ article.description }}</p>
    </div>
    <div class="card-footer">
      <el-button type="primary" @click="goToArticle" class="card-link"> 浏览文章🚀 </el-button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const props = defineProps({
  article: {
    type: Object,
    required: true,
    default: () => ({
      id: '',
      title: '',
      description: '',
      link: '',
    }),
  },
})

const router = useRouter()

const goToArticle = () => {
  if (props.article.link) {
    window.open(props.article.link, '_blank')
  } else {
    router.push(`/article/${props.article.id}`)
  }
}
</script>

<style scoped>
.article-card {
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  padding: 12px;
  transition: all 0.3s ease;
  border: 1px solid #ebeef5;
  width: 100%;
}

.article-card:hover {
  box-shadow: 0 6px 20px 0 rgba(0, 0, 0, 0.15);
  transform: translateY(-3px);
}

.card-header {
  border-bottom: 1px solid #eee;
  padding-bottom: 12px;
  margin-bottom: 12px;
}

.card-title {
  margin: 0;
  font-size: 16px;
  font-weight: 700;
  color: #303133;
  line-height: 1.2;
}

.card-body {
  min-height: 10px;
  margin-bottom: 15px;
}

.card-description {
  margin: 0;
  color: #606266;
  font-size: 14px;
  line-height: 1.5;
}

.card-footer {
  margin-top: 10px;
  text-align: right;
}

.card-link {
  background: linear-gradient(135deg, #3a55ce 0%, #d03333 100%);
  border: none;
  padding: 8px 20px;
  font-size: 14px;
  font-weight: 500;
}

@media (max-width: 768px) {
  .article-card {
    padding: 10px;
  }

  .card-title {
    font-size: 15px;
  }

  .card-description {
    font-size: 13px;
  }

  .card-link {
    padding: 6px 16px;
    font-size: 13px;
  }
}
</style>
