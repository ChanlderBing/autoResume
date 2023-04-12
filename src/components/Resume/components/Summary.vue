<template>
  <el-card>
    <div class="personal">
      <div class="information">
        <div class="plusBtn"><el-button class="btn" type="primary"><span>+</span>新建简历</el-button></div>
        <el-menu
          class="el-menu-demo"
          mode="horizontal"
        >
          <el-menu-item index="1">我的简历</el-menu-item>
          <el-menu-item index="2">简历模板</el-menu-item>
        </el-menu>
          <div class="resumeList">
            <div class="resume">
              <div class="content">
                <div class="pic"><img src="../../../assets/img/wyk.jpg"/> </div>
                <div class="resumeDetail">
                  <div class="top">
                    <span  class="resumeName">11</span>
                    <span  class="editBtn">12</span>
                  </div>         
                <div class="editTime">13</div>
              </div>
            </div>
            </div>
          </div>
    </div>
    </div>
  </el-card>
  </template>

<script lang="ts" setup>
import { Plus } from '@element-plus/icons-vue'
</script>

  <style scoped lang="scss">
 
    .personal{
        // height: 200px;
        width: 100%;
        .plusBtn{
          margin-bottom: 16px;
        .btn{
          width: 170px;
          height: 50px;
          border-radius: 10px;
          font-size: 16px;
          color:#ffffff;
          span{
            height:34px;
            width: 20px;
            margin: 0px 10px 0 0;
            font-size: 36px;
          }
        }
      }
        
        .resumeList{
          .resume:hover{
            box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12);
          }
          .resume{
            border: 1px solid #ececec;
            margin-top: 16px;
            .content{
            display: flex;
            margin: 10px 6px 10px 10px;
            .resumeDetail{
              width: 100%;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              .top{
                display: flex;
                justify-content: space-between;
              }
            }
          }
            .pic{
              // width: 60px;
              // height: 80px;
              margin-right: 8px;
              img{
                width: 55px;
                height: 70px;
              }
            }
          }
        }
    }

    
    
  </style>