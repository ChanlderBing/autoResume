<template>
    <!-- <el-card class="box-card main"id="printC">
        <div class="personal">
            <Personal></Personal>
        </div>
        <div class="degree"></div>
        <button @click="print()"></button>
    </el-card>  -->
        <div class="main" id="printC">
            <div class="personal">
                <Personal></Personal>
            </div>
        <div class="degree" v-for="(item,index) in comList" @click="switchTabUp(index)">
            <button @click="switchTabUp(index)">上</button>
            <transition mode="out-in"> <component :is="item"></component></transition>
        </div>
        
        <button @click="print()"></button>
         </div> 
    
</template>
<script lang="ts" setup>
import Personal from '@/components/Resume/components/Personal.vue';
import printjs from 'print-js'
import { ref } from "vue";
import Degree from './components/Degree.vue';
import Worked from './components/Worked.vue';
import Skill from './components/Skill.vue';
import Summary from './components/Summary.vue';


const style = '.main{margin:0;padding:0;}'
let comList = ref([Degree,Worked,Skill,Summary])
const print = ()=>{
    printjs({
        printable:'printC',
        type: 'html',
        targetStyles: ['*'],
        style,
        header:null,
    }) 
}
const switchTabUp = (index:number)=>{
    if (index === 0) {
        console.log(index);
    }else{
        comList.value[index] = comList.value.splice(index-1, 1, comList.value[index])[0]
    }
}
const switchTabDown = (index:any)=>{
    if (index >= comList.value.length - 1) {
        console.log(comList);
    }else{
        comList.value[index] = comList.value.splice(index+1, 1, comList.value[index])[0]
    }
}
</script>

<style scoped lang="scss">
        .main{
            width: 780px;
            height: 1106px;
            @include base-color();
            @include base-background();
            font-size: $font-size;
        .personal{
            height: 100px;
        }
    }
    
   
</style>