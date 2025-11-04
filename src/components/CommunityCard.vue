<!-- src/components/CommunityCard.vue -->
<template>
  <div class="community-card">
    <div class="card-header">
      <h3 class="card-title">{{ community.title }}</h3>
    </div>
    <div class="card-body">
      <p class="card-description">{{ community.description }}</p>
    </div>
    <div class="card-footer">
      <el-button type="primary" @click="goToCommunity" class="card-link"> 参加社区🏠 </el-button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const props = defineProps({
  community: {
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

const goToCommunity = () => {
  if (props.community.link) {
    window.open(props.community.link, '_blank')
  } else {
    router.push(`/community/${props.community.id}`)
  }
}
</script>

<style scoped>
.community-card {
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  padding: 20px;
  transition: all 0.3s ease;
  border: 1px solid #ebeef5;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.community-card:hover {
  box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.15);
  transform: translateY(-2px);
}

.card-header {
  border-bottom: 1px solid #eee;
  padding-bottom: 12px;
  margin-bottom: 12px;
}

.card-title {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #303133;
}

.card-body {
  flex: 1;
  min-height: 60px;
}

.card-description {
  margin: 0;
  color: #606266;
  font-size: 14px;
  line-height: 1.5;
}

.card-footer {
  margin-top: 15px;
  text-align: right;
}

.card-link {
  background: linear-gradient(135deg, #3a55ce 0%, #d03333 100%);
  border: none;
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
