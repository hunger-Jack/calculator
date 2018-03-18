<template>
  <div id="app">
    <section class="calc-display">
      <div>{{symble}}</div>
      <div class="content">
        <div>{{lastMsg}}</div>
      </div>
      <div class="result">{{numberLegnth}}</div>
    </section>
    <section class="calc-input">
      <ul>
        <li v-for="(item,index) in items" :key="index" :class="'row'+index">
          <ul>
            <li v-for="(key,index) in item" :key="index" :class="key.className" @touchstart="press(key)">
              {{key.value}}
            </li>
          </ul>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
  export default {
    name: 'App',
    data() {
      return {
        msg: '0',
        lastMsg: '0',
        total: 0,
        isFirstPress: true,
        isBeginInputNum: false,
        result: 0,
        symble: '',
        items: {
          row1: [{
              value: 'C',
              idx: 0,
              className: 'clear'
            },
            {
              value: '+/-',
              idx: 0,
              className: 'posOrneg'
            }, {
              value: '%',
              idx: 0,
              className: 'remainder'
            }, {
              value: '/',
              idx: 0,
              className: 'divide'
            }
          ],
          row2: [{
              value: 7,
              idx: 0,
              className: 'number7'
            },
            {
              value: 8,
              idx: 1,
              className: 'number8'
            }, {
              value: 9,
              idx: 2,
              className: 'number9'
            }, {
              value: '*',
              idx: 3,
              className: 'multiply'
            }
          ],
          row3: [{
              value: 4,
              idx: 0,
              className: 'number4'
            },
            {
              value: 5,
              idx: 1,
              className: 'number5'
            }, {
              value: 6,
              idx: 2,
              className: 'number6'
            }, {
              value: '-',
              idx: 3,
              className: 'minus'
            }
          ],
          row4: [{
              value: 1,
              idx: 0,
              className: 'number1'
            },
            {
              value: 2,
              idx: 1,
              className: 'number2'
            }, {
              value: 3,
              idx: 2,
              className: 'number3'
            }, {
              value: '+',
              idx: 3,
              className: 'plus'
            }
          ],
          row5: [{
              value: '00',
              idx: 0,
              className: 'number00'
            },
            {
              value: 0,
              idx: 1,
              className: 'number0'
            }, {
              value: '.',
              idx: 2,
              className: 'dot'
            }, {
              value: '=',
              idx: 3,
              className: 'equal'
            }
          ]
        }
      }
    },
    computed: {
      numberLegnth() {
        let message = this.msg
        let arr = String(this.msg).split('')
        for (let i = 0; i < arr.length; i++) {
          if (i === 3 || i === 7) {
            arr.splice(1, 0, ',')
          }
          if (i > 4 && i !== 7) {
            arr.splice(i - 4, 1)
            arr.splice(i - 3, 0, ',')
          }
          if (i > 8) {
            arr.splice(i - 8, 1)
            arr.splice(i - 7, 0, ',')
          }
        }
        return arr.splice(0, 11).join('')
      }
    },
    methods: {
      press(key) {
        let val = key.value
        let className = key.className
        if (className === 'equal') { //按等于号按钮处理一些数据
          console.log(this.msg + this.numberLegnth)
          this.result = eval(this.lastMsg + this.numberLegnth)
          this.msg += val
          this.lastMsg = this.lastMsg + this.numberLegnth
          this.msg = this.result
          return
        }
        if (className === 'clear') { //按清除按钮重置数据
          this.msg = '0'
          this.lastMsg = '0'
          this.isFirstPress = true
          return
        }
        if (this.numberLegnth.length === 11) { //限制最大输入长度
          return
        }
        if (this.lastMsg.length > 1 && this.isFirstPress) {
          this.msg = ''
        }
        if (this.isFirstPress) { //第一次输入不能输入符号或者0
          if (((typeof val) !== 'number' || val === '00' || val === 0)) {
            this.msg = '0'
            return
          } else {
            this.isFirstPress = false
            this.msg = String(val)
          }
        }else {
             this.msg += val
        }
        if (typeof val !== 'number' || key.value === '00') { //第二次输入开始不能连续多次输入符号
        let arr = this.msg.split('')
          this.symble = val
          arr.splice(arr.length-1,1)
          console.log(arr)
          this.msg = arr.join('')
          this.lastMsg = this.numberLegnth + val
          return
        } else {

        }
       
      }
    },
    created() {},
    filters: {
      // numberLegnth(val) {
      //   return val.split('').splice(0,9).join('')
      // }
    }
  }

</script>

<style <style lang="less">
  body {
    height: 100vh;
    background-color: white;
  }

  #app {
    height: 100vh;
    padding: 16px 24px 8px 24px;
    background-color: #ffffff;
    width: 100%;
    display: flex;
    flex-direction: column;
    border-radius: 6px;
    .calc-display {
      border-bottom: 1px solid #eee;
      height: 40%;
      display: flex;
      flex-direction: column;
      .content {
        position: relative;
        flex-grow: 1;
        text-align: right;
        word-break: break-all;
        font-size: 24px;
        color: #aaa;
        div {
          position: absolute;
          right: 0;
          bottom: 0;
        }
      }
      .result {
        display: inline-block;
        padding: 8px 0;
        height: 36%;
        text-align: right;
        font-size: 55px;
        overflow: hidden;
        outline: none;
        color: #414141;
        word-break: break-all;
      }
    }
    .calc-input {
      height: 60%;
      ul {
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: space-around;
        justify-content: space-around;
        font-size: 22px;
        color: #aaa;
        li {
          ul {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            li {
              flex-flow: 1;
              width: 40px;
              height: 40px;
              text-align: center;
              line-height: 48px;
            }
          }
        }
      }
    }
  }

  .plus,
  .minus,
  .divide,
  .multiply {
    color: #f06e6e;
  }

  .equal {
    color: #ffffff;
    background-color: #f06e6e;
    border-radius: 50%;
    box-shadow: 2px 3px 12px 1px #e5a2a0;
    display: flex;
    justify-content: center;
    align-items: center;
  }

</style>
