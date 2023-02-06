<template>
  <el-card style="width:780px;height: 50px;margin-bottom:20px;">
     <div class="features">
        <el-select v-model="value" class="m-2" :placeholder="options[0].label">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
      :change="changeTheme(value)"
    />
  </el-select>
    
  <!-- <el-select v-model="value1" class="m-2" placeholder="se">
    <el-option
      v-for="item in comList"
      :key="item.name"
      :label="item.name"
      :value="item.name"
      :change="changeTheme(value)"
    />
  </el-select> -->
    </div>
  </el-card>
<el-card style="width:780px;">
  <div class="main" id="printC">
    <div class="personal">
      <Personal></Personal>
    </div>
    <ShowList :resumeMoudle="resumeMoudle"></ShowList>
  </div>
</el-card>
</template>
<script lang="ts" setup>
import Personal from '@/components/Resume/components/Personal.vue'
import store from '@/store';
import printjs from 'print-js'
import { ref,markRaw, onMounted, onUpdated } from 'vue'
import ShowList from './components/ShowList.vue';
import resumeMoudleMock from '@/utils/mock.js'

  const value = ref(store.state.color_theme)
      const options = [
    {
      value: 'red-theme',
      label: 'red',
    }
    ,
    {
      value: 'green-theme',
      label: 'green',
    }
    ,
    {
      value: 'blue-theme',
      label: 'blue',
    }
    ,
    {
      value: 'org-theme',
      label: 'org',
    }
  ]
  const value1 = ref('Degree')
  const changeTheme = (theme:string)=>{
      window.document.getElementById('app')?.setAttribute('data-theme', theme)
      store.commit('switchThemeColor',theme)
  }
  let resumeMoudle = ref(JSON.parse(localStorage.getItem('resumeMoudle')))

  const print = () => {
    printjs({
      printable: 'printC',
      type: 'html',
      targetStyles: ['*'],
      header: null,
      scanStyles:false
    })
  }
  onMounted:{
      if (!localStorage.getItem('resumeMoudle')) {
          localStorage.setItem('resumeMoudle', JSON.stringify(resumeMoudleMock));
      }
  }

</script>

<style scoped lang="scss">
.main {
  width: 780px;
  height: 1106px;
  // @include base-color();
  // @include base-background();
  font-size: $font-size;
  .personal {
    margin-bottom: 20px;
  }
  .active{
    background-color: darkgray;
    opacity: 0.4;
  }
}
.features{
    height: 50px;
    width: 100%;
    display: flex;
    .el_select{
      justify-content: center;
    }
    
}
.v-enter,
			.v-leave-to{
				opacity: 0;
			}
			.v-enter-active,
			.v-leave-active{
				opacity: 1;
      }
  :deep .el-card__body {
    padding: 0;
    width: 780px;
  }
</style>