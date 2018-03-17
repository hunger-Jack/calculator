<template>
  <div id="app">
    <section class="calc-display">
      <div class="content">
        <div>{{lastMsg}}</div>
      </div>
      <input class="result" v-model="msg">
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
        result: 0,
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
              className: 'dot'
            },
            {
              value: 0,
              idx: 1,
              className: 'dot'
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
    methods: {
      press(key) {
        let val = key.value
        let className = key.className
        if (this.isFirstPress) {
          if (val === '0' && val.length === 1) {
            this.msg = '0'
            return
          }
          if (typeof val !== 'number' && val.length === 1) {
            this.msg = '0'
            return
          }
          if(val === '+/-') {
            this.msg = '0'
            return
          }
          this.msg = ''
        }
        this.isFirstPress = false
        if(className === 'equal') {
          this.result = eval(this.msg)
          this.msg += val
           this.lastMsg = this.msg
           this.msg = this.result
          return
        }
        this.msg += val
      }
    },
    created() {}
  }

</script>

<style <style lang="less">
body {
  height: 100vh;
  background-color: #f7f6f7;
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
        height: 46%;
        text-align: right;
        font-size: 59px;
        overflow: hidden;
        outline: none;
        color: #414141;
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
              width: 48px;
              height: 48px;
              text-align: center;
              line-height: 48px;
            }
          }
        }
      }
    }
  }
  .plus,.minus,.divide,.multiply {
    color: #f06e6e;
  }
  .equal {
    color: #ffffff;
    background-color: #f06e6e;
    border-radius: 50%;
    box-shadow: 2px 3px 12px 1px #e5a2a0;
  }
</style>
