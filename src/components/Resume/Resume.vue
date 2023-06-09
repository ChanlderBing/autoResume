<template>
  <el-card style="width:780px;height:50px;margin-bottom:20px;" class="card">
     <div class="features">
        <div class="colorPick">
          <el-select v-model="value" class="m-2" :placeholder="options[0].label">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              :change="changeTheme(value)"
            >
              <div :style="{'backgroundColor':item.color,'width':'20px','height':'20px','margin-top':'6px'}"></div>
            </el-option>
          </el-select>
        </div>
        <div class="modelAdd">
          <el-select  class="m-2" placeholder="添加模块">
            <el-option
              v-for="(item,index) in resumeMoudle"
              :key="index"
              :label="item.title"
              value="添加模块"
              :disabled="item.isShow"
              @click="resumeMoudleChange(index)"
            >
            <div>{{ item.title }} <span style="margin-left:20px"></span></div>
            </el-option>
          </el-select>
        </div>
      </div>
  </el-card>
  <el-card style="width:780px;">
    <div class="main" id="printC">
      <div class="personal">
        <Personal></Personal>
      </div>
      <ShowList  @clickChild="resumeMoudleChange" ></ShowList>
    </div>
  </el-card>
</template>
<script lang="ts" setup>
import Personal from '@/components/Resume/components/Personal.vue'
import store from '@/store';
import { reactive, ref,inject, watchEffect} from 'vue'
import ShowList from './components/ShowList.vue';
import resumeMoudleMock from '@/utils/mock.js'

const resumeMoudle1 = inject('resumeMoudle') as any
const resumeMoudle =  resumeMoudle1
  const value = ref(store.state.color_theme)
  const options = [
    {
      value: 'red-theme',
      label: '红色',
      color: '#F56C6C',
    }
    ,
    {
      value: 'green-theme',
      label: '绿色',
      color: '#67C23A',
    }
    ,
    {
      value: 'blue-theme',
      label: '蓝色',
      color: '#409EFF',
    }
    ,
    {
      value: 'org-theme',
      label: '橙色',
      color: '#E6A23C',
    }
  ]


  const changeTheme = (theme:string)=>{
      window.document.getElementById('app')?.setAttribute('data-theme', theme)
      store.commit('switchThemeColor',theme)
  }
 
  let modelResume
  const resumeMoudleChange = (index)=>{
    resumeMoudle[index].isShow = resumeMoudle[index].isShow ? false:true
    localStorage.setItem("resumeMoudle",JSON.stringify(resumeMoudle))
  }

  onMounted:{
    //获取数据 1.未登录获取默认简历 2.登录后获取个人简历库首个简历 axios.get()

  }                 

</script>

<style scoped lang="scss">
.main {
  width: 780px;
  height: 1106px;
  font-size: $font-size;
  .personal {
    margin-bottom: 20px;
  }
  .active{
    background-color: darkgray;
    opacity: 0.4;
  }
}
.card{
  @include left-background();
  @include border-background();
  @include home-color();
}
.features{
  
    height: 50px;
    width: 100%;
    display:flex;
    justify-content:flex-start;
    align-items: center;
    .colorPick{
      ::v-deep .el-select .el-input__inner{
      width: 30px;
      }
      ::v-deep .el-input__wrapper{
        @include left-background();
        @include border-background();
      }
    }
    .modelAdd{
      ::v-deep .el-select .el-input__inner{
      width: 80px;
      }
    }
}

::v-deep .el-select-dropdown__item {
       height: 80px;
    }
::v-deep .el-card__body {
padding: 0px !important;
}
</style>