<template>
  <div id="app" class="theme-one" v-finger:swipe="swipe" ref="whole">
    <section class="calc-display">
      <div>{{symble}}</div>
      <div class="content">
        <div>{{lastMsg}}</div>
      </div>
      <div class="result">{{numberLegnth}}</div>
    </section>
    <section class="calc-input">
      <ul>
        <li v-for="(item,index) in items" :key="index">
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
        isFirstPress: true,
        isBeginInputNum: true,
        result: 0,
        symble: '',
        isStart: false,
        lastArr: [],
        classNameArr: ['theme-one', 'theme-two', 'theme-three', 'theme-four'],
        count: 0,
        resultRecord: '',
        lastSymbol: '',
        items: {
          row1: [{
              value: 'C',
              idx: 0,
              className: 'clear'
            },
            {
              value: 'DEL',
              idx: 0,
              className: 'delete'
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
      numberLegnth() { //自动添加逗号
        let message = this.msg
        let arr = String(this.msg).split('')
        if (arr.indexOf('.') === -1) { //如果没有有小数点的情况
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
        } else { //有小数点的情况，输入小数点也可以自动补逗号
          let dotIndex = message.indexOf('.')
          let leftNum = arr.slice(0, dotIndex)
          let leftLength = leftNum.length
          if (leftLength > 3 && leftLength <= 6) {
            arr.splice(leftLength - 3, 0, ',')
          } else if (leftLength > 6) {
            arr.splice(leftLength - 6, 0, ',')
            arr.splice(leftLength - 2, 0, ',')
          } else {
            return arr.splice(0, 11).join('')
          }
        }
        return arr.splice(0, 11).join('')
      }
    },
    methods: {
      press(key) {
        let val = key.value
        let className = key.className
        if (val === 'C') { // 清空所有数据,初始化所有数据
          this.msg = '0'
          this.lastMsg = '0'
          this.isStart = false
          this.lastArr = []
          this.resultRecord = ''
          this.result = 0
          return
        }
        if (this.numberLegnth.length === 11 && !isNaN(val)) { //限制最大输入长度
          return
        }
        if (!isNaN(val) || val === '.') { //输入的是数字或者小数点的情况
          if (!this.isStart) { // 如果没有开始，就把msg还原
            this.msg = '0'
          }
          this.isStart = true
          if (this.isStart) { //第一次输入数字，要先把默认的0去掉
            if (this.msg.indexOf('0') === 0) {
              this.msg = this.msg.substring(1, this.msg.length)
            }
          }
          if (String(this.msg).indexOf('.') !== -1) { //输入内容已经有小数点
            if (val !== '.') { //如果输入不是点的情况，否则就没有输出
              this.msg += val
            }
          } else { //没有点的情况，直接拼接字符串
            this.msg += val
          }
        } else { //输入符号的情况
          if (val === 'DEL') { // 退格,在输出结果之后不能退格
            if (!this.isStart) { //刚开始的时候不能输入符号
              return
            }
            this.msg = this.msg.substring(0, this.msg.length - 1)
            return
          }
          if (val !== '=') { //是符号但不是等号的情
            if (!this.isStart) { //刚开始的时候不能输入符号
              return
            }
            this.lastMsg = this.numberLegnth + val //储存输入的数字和符号
            this.lastArr[this.lastArr.length] = this.lastMsg
            if (this.lastArr.length > 1) { //第二次输入符号的时候也可以进行计算
              if (this.resultRecord === '') { //第一次求值的情况
                this.result = eval(this.lastArr[this.lastArr.length - 2] + this.numberLegnth)
                this.resultRecord = this.result
                this.msg = String(this.result)
              } else { //第二次求值，可以使用上一次求值结果直接计算
                this.result = eval(this.resultRecord + this.lastSymbol + this.numberLegnth)
                this.resultRecord = this.result
                this.msg = String(this.result)
              }
              this.lastSymbol = val //储存上一个符号
              this.isStart = false
            } else {
              this.msg = '' //清屏
            }
          } else { //是等号的情况
            if (this.resultRecord === '') { //第一次求值的情况
              this.result = eval(this.lastMsg + this.numberLegnth)
              this.resultRecord = this.result
              this.msg = String(this.result)
            } else { //第二次求值，可以使用上一次求值结果直接计算
              this.result = eval(this.resultRecord + this.lastSymbol + this.numberLegnth)
              this.resultRecord = this.result
              this.msg = String(this.result)
            }
            this.lastArr = [] //点击等于号之后清除lastArr，还原状态
            this.resultRecord = '' //点击等于号之后清除resultRecord，还原状态
          }
        }
      },
      swipe(e) { // 左右滑动切换背景
        this.count++;
        let curClassName = this.$refs.whole.className
        if (this.count === this.classNameArr.length) {
          this.count = 0
        }
        if (e.direction === 'Left' || e.direction === 'Right') {
          this.$refs.whole.classList.remove(curClassName)
          this.$refs.whole.classList.add(this.classNameArr[this.count])
        }
      }
    },
    watch: {
      msg(val) { //检测msg的变化，如果为空的情况下，只能输入数字，相当于重置
        if (val === '') {
          this.isStart = false
        }
      }
    }
  }

</script>

<style <style lang="less">
  body,
  html {
    height: 100%;
  }

  .theme-one {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    padding: 16px 24px 8px 24px;
    background-color: white;
    display: flex;
    flex-direction: column;
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
        color: #757575;
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
        font-size: 52px;
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
        color: #757575;
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
      box-shadow: 1px 3px 11px 0px #e5a2a0;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .theme-two {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    padding: 16px 24px 8px 24px;
    background-color: #414141;
    width: 100%;
    display: flex;
    flex-direction: column;
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
        color: #757575;
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
        font-size: 52px;
        overflow: hidden;
        outline: none;
        color: #fff;
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
        color: #757575;
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
      box-shadow: 1px 3px 11px 0px #e5a2a0;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .theme-three {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    padding: 16px 24px 8px 24px;
    background-color: #f06e6e;
    width: 100%;
    display: flex;
    flex-direction: column;
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
        color: #757575;
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
        font-size: 52px;
        overflow: hidden;
        outline: none;
        color: white;
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
        color: #757575;
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
    .plus,
    .minus,
    .divide,
    .multiply {
      color: #414141;
    }
    .equal {
      color: #e5a2a0;
      background-color: #ffffff;
      border-radius: 50%;
      box-shadow: 1px 3px 11px 0px #ffffff;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .theme-four {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    padding: 16px 24px 8px 24px;
    background-color: #b8e986;
    width: 100%;
    display: flex;
    flex-direction: column;
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
        color: #757575;
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
        font-size: 52px;
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
        color: #757575;
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
    .plus,
    .minus,
    .divide,
    .multiply {
      color: #ffffff;
    }
    .equal {
      color: #e5a2a0;
      background-color: #ffffff;
      border-radius: 50%;
      box-shadow: 1px 3px 11px 0px #ffffff;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

</style>
