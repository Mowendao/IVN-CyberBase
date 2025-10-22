<!-- src/components/SearchInput.vue -->
<template>
  <div class="search-wrapper">
    <el-input
      v-model="searchValue"
      :placeholder="placeholder"
      clearable
      class="search-input"
      @input="handleInput"
      @clear="handleClear"
    >
      <template #prefix>
        <el-icon><Search /></el-icon>
      </template>
    </el-input>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { Search } from '@element-plus/icons-vue'

// 定义组件属性
const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: '请输入搜索内容...',
  },
})

// 定义事件
const emit = defineEmits(['update:modelValue', 'search', 'clear'])

// 内部响应式变量
const searchValue = ref(props.modelValue)

// 监听外部值变化
watch(
  () => props.modelValue,
  (newValue) => {
    searchValue.value = newValue
  },
)

// 处理输入事件
const handleInput = (value) => {
  emit('update:modelValue', value)
  emit('search', value)
}

// 处理清空事件
const handleClear = () => {
  emit('update:modelValue', '')
  emit('clear')
}
</script>

<style scoped>
.search-wrapper {
  width: 100%;
}

.search-input {
  width: 100%;
}

.search-input :deep(.el-input__wrapper) {
  border-radius: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
</style>
