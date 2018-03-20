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
        isBeginInputNum: true,
        result: 0,
        symble: '',
        isStart: false,
        lastArr: [],
        classNameArr: ['theme-one', 'theme-two', 'theme-three', 'theme-four'],
        count: 0,
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
      numberLegnth() {
        let message = this.msg
        let arr = String(this.msg).split('')
        // if (this.isStart) {
        //   if (arr.indexOf('0') === 0) {
        //     arr.splice(0, 1)
        //   }
        //   this.isStart = false
        // }
        for (let i = 0; i < arr.length; i++) {
          if (arr.indexOf('.') === -1) {
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

        }
        return arr.splice(0, 11).join('')
      }
    },
    methods: {
      press(key) {
        let val = key.value
        let className = key.className

        if (this.numberLegnth.length === 11 && !isNaN(val)) { //限制最大输入长度
          return
        }
        if (val === 'C') { // 清空所有数据
          this.msg = '0'
          this.lastMsg = '0'
          return
        }

        if (val === 'DEL') { // 退格
          console.log(2, this.msg.length - 1)
          this.msg = this.msg.substring(1, this.msg.length)
          return
        }
        if (!isNaN(val) || val === '.') { //输入的是数字或者小数点的情况
          this.isStart = true
          if (this.isStart) {//第一次输入数字，要先把默认的0去掉
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
          if (val !== '=') { //是符号但不是等号的情况
            if (!this.isStart) { //刚开始的时候不能输入符号
              return
            }
            this.lastMsg = this.numberLegnth + val //储存输入的数字和符号
            this.lastArr[this.lastArr.length] = this.lastMsg

            if (this.lastArr.length > 1) { //输入符号的时候也可以进行计算
              this.result = eval(this.lastArr[0] + this.numberLegnth)
              this.msg = String(this.result)
              this.lastArr = []
            } else {
              this.msg = '' //清屏
            }
          } else { //是等号的情况
            this.result = eval(this.lastMsg + this.numberLegnth)
            this.msg = String(this.result)
          }
        }
      },
      swipe(e) {
        let curClassName = this.$refs.whole.className
        console.log(this.count, this.classNameArr.length)
        if (this.count === this.classNameArr.length - 1) {
          this.count = 0
        }
        this.count++
          if (e.direction === 'Left' || e.direction === 'Right') {
            this.$refs.whole.classList.remove(curClassName)
            this.$refs.whole.classList.add(this.classNameArr[this.count])
          }
      }
    },
  }

</script>

<style <style lang="less">
  .theme-one {
    height: 100vh;
    padding: 16px 24px 8px 24px;
    background-color: white;
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
    height: 100vh;
    padding: 16px 24px 8px 24px;
    background-color: #414141;
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
    height: 100vh;
    padding: 16px 24px 8px 24px;
    background-color: #f06e6e;
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
    height: 100vh;
    padding: 16px 24px 8px 24px;
    background-color: #b8e986;
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
