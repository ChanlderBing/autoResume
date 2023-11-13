
const realationshipMap = {
    'phoneNumber':'手机',
    'email':'邮件',
    'degree':'gitHub/gittee',
    'cityYoulived':'所在城市',
    'cityItent': '意向城市',
    'currentStatus':'就职状态',
    'postIntent':'意向岗位'
}

const options =[
{
  value: '在职-暂不考虑',
  label: '在职-暂不考虑',
},
{
  value: '在职-月内到岗',
  label: '在职-月内到岗',
},
{
  value: '在职-考虑机会',
  label: '在职-考虑机会',
},
{
  value: '离职-随时到岗',
  label: '离职-随时到岗',
},
{
  value: '应届毕业生',
  label: '应届毕业生',
},
{
  value: '寻找实习中',
  label: '寻找实习中',
},
{
  value: '其他',
  label: '其他',
},
]

export {realationshipMap,options }