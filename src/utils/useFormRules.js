import { reactive } from 'vue'

const validatePhone = (rule,value,callback)=>{
    const regExp = /^1[3-9][0-9]{9}$/
      if (!regExp.test(value)) {
        callback(new Error('请输入有效的手机号'))
      } else {
        callback()
      }
    }
    const validateEmail = (rule,value,callback)=>{
    const regExp = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+(.[a-zA-Z0-9]+)+$/
      if (!regExp.test(value)) {
        callback(new Error('请输入有效的邮箱'))
      } else {
        callback()
      }
    }
  const rules = reactive({
    "inputList[0].cityYoulived": [
      { required: true, message: '请输入城市名', trigger: 'blur' },
      { min: 2, max: 7, message: '长度应该在2-7个字符', trigger: 'blur' },
    ],
    "inputList[0].degree": [
      {
        required: true,
        message: '请输入你的专业',
        trigger: 'blur',
      },
      { min: 2, max: 7, message: '长度应该在2-7个字符', trigger: 'blur' },
    ],
    "inputList[0].email": [
      {
        required: true,
        message: '请输入邮箱',
        trigger: 'blur',
      },
      {
        validator: validateEmail,
        trigger: 'blur',
      }],
      "inputList[0].phoneNumber": [
      {
        required: true,
        message: '请输入手机号',
        trigger: 'blur',
      },
      {
        validator: validatePhone,
        trigger: 'blur',
      }
    ],
    "inputList[1].cityItent": [
      {
        required: true,
        message: '请输入你意向城市',
        trigger: 'blur',
      },
      { min: 2, max: 7, message: '长度应该在2-7个字符', trigger: 'blur' },
    ],
    "inputList[1].currentStatus": [
      {
        type: 'string',
        required: true,
        message: '请输入就职状态',
        trigger: 'blur',
      },
      { min: 2, max: 7, message: '长度应该在2-7个字符', trigger: 'blur' },
    ],
    "inputList[1].postIntent": [
      {
        required: true,
        message: '请输入投递意向',
        trigger: 'blur',
      },
      { min: 2, max: 7, message: '长度应该在2-7个字符', trigger: 'blur' },
    ],
    userName: [
      { required: true, message: 'Please input activity form', trigger: 'blur' },
      { min: 2, max: 7, message: '长度应该在2-7个字符', trigger: 'blur' },
    ],
  })

  export default rules