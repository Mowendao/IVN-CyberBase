<!-- src/components/PracticeCard.vue -->
<template>
  <div class="practice-card">
    <div class="card-header">
      <h3 class="card-title">{{ practice.title }}</h3>
    </div>
    <div class="card-body">
      <p class="card-description">{{ practice.description }}</p>
    </div>
    <div class="card-footer">
      <el-button type="primary" @click="goToPractice" class="card-link"> 开始练习💻 </el-button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const props = defineProps({
  practice: {
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

const goToPractice = () => {
  if (props.practice.link) {
    window.open(props.practice.link, '_blank')
  } else {
    router.push(`/practice/${props.practice.id}`)
  }
}
</script>

<style scoped>
.practice-card {
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

.practice-card:hover {
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
