<template>
    <el-date-picker
       
        type="date"
        placeholder="开始时间"
        format="YYYY/MM/DD"
        value-format="YYYY-MM-DD"
    />
</template>

<script lang="ts" setup>
  //datePicker
  const shortcuts = [
    {
      text: 'Today',
      value: new Date(),
    },
    {
      text: 'Yesterday',
      value: () => {
        const date = new Date()
        date.setTime(date.getTime() - 3600 * 1000 * 24)
        return date
      },
    },
    {
      text: 'A week ago',
      value: () => {
        const date = new Date()
        date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
        return date
      },
    },
  ]
</script>