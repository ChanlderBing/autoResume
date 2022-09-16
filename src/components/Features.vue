<template>
     <div class="main" id="dn">
    <el-select v-model="value" class="m-2" :placeholder="options[0].label">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
      :change="changeTheme(value)"
    />
  </el-select>
    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue'
    const value = ref('light-theme')
    const options = [
  {
    value: 'light-theme',
    label: 'ligth',
  },
  {
    value: 'dark-theme',
    label: 'dark',
  }
]
    const changeTheme = (theme:string)=>{
        window.document.getElementById('app')?.setAttribute('data-theme', theme)
    }
</script>
<style scoped lang="scss">
.main{
    height: 60px;
    margin-bottom: 10px;
}
</style>