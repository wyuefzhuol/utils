export default {
  len: 15,   //棋盘长度
  count: 0,
  chessboard: [],  //棋盘布局数组
  wins: [],   //赢法数组
  myWin: [],
  computerWin: [],
  myScore: [],   //评分数组
  computerScore: [],

  starting: function() {
    const That = this;
    const $start = document.createElement("div");
    $start.id = 'start';
    $start.style.position = 'absolute';
    $start.style.top = '0';
    $start.style.left = '0';
    $start.style.display = 'flex'

    const comStart = document.createElement("div");
    comStart.style.width = '200px';
    comStart.style.height = '600px';
    comStart.style.display = 'flex';
    comStart.style.alignItems = 'center';
    comStart.style.justifyContent = 'center';
    comStart.style.cursor = 'pointer';
    comStart.style.background = '#e5e5e5';
    comStart.innerHTML = '<svg t="1680587034905" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6086" width="20" height="20"><path d="M810.551167 57.547768H213.847946C127.696233 57.547768 57.568888 127.674115 57.568888 213.827826v369.388137c0 86.209692 70.127346 156.280058 156.279058 156.280058h127.355226c-3.466781 45.518997-18.355547 118.090484-75.354508 146.618454a42.604022 42.604022 0 0 0 19.037307 80.69763h454.630169a42.585029 42.585029 0 0 0 19.037308-80.69763c-57.395822-28.698911-72.057667-101.154438-75.473467-146.618454h127.471186c86.209692 0 156.280058-70.070366 156.280058-156.280058V213.827826c0-86.152712-70.069366-156.280058-156.280058-156.280058z m-422.521457 824.020306c27.845211-48.645898 36.426194-103.996439 38.757374-142.072053h170.826944c2.330181 38.075614 10.969144 93.426155 38.814354 142.072053z m493.558483-298.352111a71.062017 71.062017 0 0 1-71.037026 71.037026H213.847946a71.098005 71.098005 0 0 1-71.032028-71.037026V213.827826a71.134992 71.134992 0 0 1 71.036026-71.037026h596.699223a71.099004 71.099004 0 0 1 71.037026 71.037026z" p-id="6087" fill="#3B3F51"></path></svg>';
    comStart.onclick = function() {   //电脑先
      That.myFalling("#e5e5e5", 7, 7, 2, That.$outobj, That.computerWin, That.myWin);
      $start.style.display = 'none';
    };
    $start.appendChild(comStart);

    const randomStart = document.createElement("div");
    randomStart.style.width = '200px';
    randomStart.style.height = '600px';
    randomStart.style.display = 'flex';
    randomStart.style.alignItems = 'center';
    randomStart.style.justifyContent = 'center';
    randomStart.style.cursor = 'pointer';
    randomStart.innerHTML = '<svg t="1680587540882" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6982" width="20" height="20"><path d="M380.571429 274.857143q-34.285714 52.571429-78.285715 156-12.571429-25.714286-21.142857-41.428572T258 353.142857t-29.142857-32.285714-36-20T146.285714 292.571429H18.285714q-8 0-13.142857-5.142858t-5.142857-13.142857V164.571429q0-8 5.142857-13.142858t13.142857-5.142857h128q142.857143 0 234.285715 128.571429z m643.428571 456.571428q0 8-5.142857 13.142858l-182.857143 182.857142q-5.142857 5.142857-13.142857 5.142858-7.428571 0-12.857143-5.428572t-5.428571-12.857143v-109.714285q-18.285714 0-48.571429 0.285714t-46.285714 0.571428-41.714286-0.571428-40.571429-2.857143-36.571428-6-36-10.571429-33.142857-16.285714-33.714286-22.857143-31.428571-30.571428-32-39.714286q33.714286-53.142857 77.714285-156 12.571429 25.714286 21.142857 41.428571t23.142858 36.285715 29.142857 32.285714 36 20 46.571428 8.285714h146.285715V548.571429q0-8 5.142857-13.142858t13.142857-5.142857q6.857143 0 13.714286 5.714286l182.285714 182.285714q5.142857 5.142857 5.142857 13.142857z m0-512q0 8-5.142857 13.142858l-182.857143 182.857142q-5.142857 5.142857-13.142857 5.142858-7.428571 0-12.857143-5.428572T804.571429 402.285714V292.571429h-146.285715q-27.428571 0-49.714285 8.571428t-39.428572 25.714286-29.142857 35.142857-25.714286 44.285714q-18.285714 35.428571-44.571428 97.714286-16.571429 37.714286-28.285715 63.428571t-30.857142 60-36.571429 57.142858-42.285714 47.428571-51.428572 39.142857-60.857143 24-73.142857 9.428572H18.285714q-8 0-13.142857-5.142858t-5.142857-13.142857v-109.714285q0-8 5.142857-13.142858t13.142857-5.142857h128q27.428571 0 49.714286-8.571428t39.428571-25.714286 29.142858-35.142857 25.714285-44.285714q18.285714-35.428571 44.571429-97.714286 16.571429-37.714286 28.285714-63.428572t30.857143-60 36.571429-57.142857 42.285714-47.428571 51.428571-39.142857 60.857143-24 73.142857-9.428572h146.285715V36.571429q0-8 5.142857-13.142858t13.142857-5.142857q6.857143 0 13.714286 5.714286l182.285714 182.285714q5.142857 5.142857 5.142857 13.142857z" p-id="6983" fill="#3B3F51"></path></svg>';
    randomStart.onclick = function() {   //电脑先
      That.myFalling("#e5e5e5", 7, 7, 2, That.$outobj, That.computerWin, That.myWin);
      $start.style.display = 'none';
    };
    $start.appendChild(randomStart);

    const userStart = document.createElement("div");
    userStart.style.width = '200px';
    userStart.style.height = '600px';
    userStart.style.display = 'flex';
    userStart.style.alignItems = 'center';
    userStart.style.justifyContent = 'center';
    userStart.style.cursor = 'pointer';
    userStart.style.background = '#000000';
    userStart.innerHTML = '<svg t="1680586980555" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3747" width="20" height="20"><path d="M512.00128 1008.84864c-273.96992 0-496.84608-222.8736-496.84608-496.84352s222.87616-496.8448 496.84608-496.8448S1008.8448 238.03776 1008.8448 512.00512 785.96864 1008.84864 512.00128 1008.84864z m248.4224-166.4v-9.93408a83.03104 83.03104 0 0 0-41.73568-71.91808l-113.4016-64.79744c-28.19584 14.368-59.58272 23.22944-93.28512 23.22944s-65.088-8.86144-93.24288-23.22944l-113.4464 64.79744a83.03872 83.03872 0 0 0-41.728 71.91936v9.93408c69.31072 52.2112 155.1808 83.59808 248.42368 83.59808s179.11424-31.34208 248.4224-83.59808zM636.2112 512.00512v-82.80064a124.2112 124.2112 0 0 0-248.42112 0v82.80704a124.2112 124.2112 0 1 0 248.42112 0zM512.00128 97.96864c-228.29952 0-414.03648 185.73824-414.03648 414.03648a412.0512 412.0512 0 0 0 94.52288 263.04c13.37344-35.6928 37.71904-66.86976 71.75552-86.32832l85.99424-49.152c-27.904-35.2768-45.25696-79.20256-45.25696-127.56352v-82.7968c0-114.14784 92.87296-207.0208 207.0208-207.0208s207.01568 92.86656 207.01568 207.0208v82.80704c0 48.36096-17.34784 92.288-45.25056 127.56352l85.9904 49.152c34.03648 19.456 58.38208 50.63552 71.7568 86.32832a412.06016 412.06016 0 0 0 94.52544-263.04c0-228.29824-185.7408-414.03648-414.03776-414.03648z" fill="#ffffff" p-id="3748"></path></svg>';
    userStart.onclick = function() {   //玩家先
      $start.style.display = 'none';
    };
    $start.appendChild(userStart);

    document.getElementById("golangBox").appendChild($start);
  },

  init: function() {
    let i, j, k;
    const $outobj = document.createElement("div"),
      wrap = document.getElementById("golangBox");
    if (wrap.children.length > 0) {
      wrap.textContent = '';
    }

    $outobj.style.width = '600px';
    $outobj.style.height = '600px';
    $outobj.style.border = '2px solid #e5e5e5';
    $outobj.style.position = 'relative';
    wrap.style.position = 'relative';
    wrap.appendChild($outobj);

    this.$outobj = $outobj;
    this.tablesize = $outobj.getBoundingClientRect().height / this.len;

    for (i = 0; i < this.len; i++) {  //棋盘和赢法数组初始化
      this.chessboard[i] = [];
      this.wins[i] = [];
      for (j = 0; j < this.len; j++) {
        this.chessboard[i][j] = 0;
        this.wins[i][j] = [];
      }
    }

    var len_4 = this.len - 4;

    for (i = 0; i < this.len; i++) {   //横向赢法
      for (j = 0; j < len_4; j++) {
        for (k = 0; k < 5; k++) {
          this.wins[i][j + k][this.count] = true;
        }
        this.count++;
      }
    }

    for (i = 0; i < this.len; i++) {   //纵向赢法
      for (j = 0; j < len_4; j++) {
        for (k = 0; k < 5; k++) {
          this.wins[j + k][i][this.count] = true;
        }
        this.count++;
      }
    }

    for (i = 0; i < len_4; i++) {    //正斜赢法
      for (j = 0; j < len_4; j++) {
        for (k = 0; k < 5; k++) {
          this.wins[i + k][j + k][this.count] = true;
        }
        this.count++;
      }
    }

    for (i = 0; i < len_4; i++) {   //反斜赢法
      for (j = 14; j > 3; j--) {
        for (k = 0; k < 5; k++) {
          this.wins[i + k][j - k][this.count] = true;
        }
        this.count++;
      }
    }

    for (i = 0; i < this.count; i++) {
      this.myWin[i] = 0;
      this.computerWin[i] = 0;
    }

    this.starting(); //
    this.falling();  //落子
  },

  falling: function() {
    const That = this;
    this.$outobj.onclick = function(e) {
      const box = That.$outobj.getBoundingClientRect();
      const ex = e.clientX,
        ey = e.clientY,
        thisX = box.left + window.pageXOffset - That.$outobj.clientLeft,
        thisY = box.top + window.pageYOffset - That.$outobj.clientTop,
        dx = ex - thisX,
        dy = ey - thisY,
        arrx = parseInt(dx / That.tablesize),
        arry = parseInt(dy / That.tablesize);

      if (That.chessboard[arrx][arry] === 0) {
        That.myFalling("#000000", arrx, arry, 1, That.$outobj, That.myWin, That.computerWin, "恭喜恭喜！你赢了");
        const ob = That.score();
        That.myFalling("#e5e5e5", ob.x, ob.y, 2, That.$outobj, That.computerWin, That.myWin, "电脑赢了，再接再厉");
      }
    };
  },

  myFalling: function(classed, obx, oby, aNum, obj, Win1, Win2, str) {
    const createpiece = document.createElement("div");
    createpiece.style.background = classed;
    createpiece.style.position = 'absolute';
    createpiece.style.borderRadius = '100px';
    createpiece.style.width = `${this.tablesize - 2}px`;
    createpiece.style.height = `${this.tablesize - 2}px`;
    createpiece.style.left = `${obx * this.tablesize}px`;
    createpiece.style.top = `${oby * this.tablesize}px`;
    this.chessboard[obx][oby] = aNum;
    obj.appendChild(createpiece);

    for (let k = 0; k < this.count; k++) {
      if (this.wins[obx][oby][k]) {
        Win1[k]++;
        Win2[k] = 6;
        if (Win1[k] === 5) {
          this.winned(str);
        }
      }
    }
  },

  score: function() {
    let j;
    let i;//评分函数
    let max = 0,
      fallclient = {
        x: 0,
        y: 0
      };

    for (i = 0; i < this.len; i++) {  //评分数组初始化
      this.myScore[i] = [];
      this.computerScore[i] = [];
      for (j = 0; j < this.len; j++) {
        this.myScore[i][j] = 0;
        this.computerScore[i][j] = 0;
      }
    }

    for (i = 0; i < this.len; i++) {
      for (j = 0; j < this.len; j++) {
        if (this.chessboard[i][j] === 0) {
          for (let k = 0; k < this.count; k++) {
            if (this.wins[i][j][k]) {

              if (this.myWin[k] === 1) {
                this.myScore[i][j] += 200;
              } else if (this.myWin[k] === 2) {
                this.myScore[i][j] += 400;
              } else if (this.myWin[k] === 3) {
                this.myScore[i][j] += 2000;
              } else if (this.myWin[k] === 4) {
                this.myScore[i][j] += 10000;
              }

              if (this.computerWin[k] === 1) {
                this.computerScore[i][j] += 200;
              } else if (this.computerWin[k] === 2) {
                this.computerScore[i][j] += 420;
              } else if (this.computerWin[k] === 3) {
                this.computerScore[i][j] += 2100;
              } else if (this.computerWin[k] === 4) {
                this.computerScore[i][j] += 20000;
              }
            }

          }
          if (this.myScore[i][j] > max) {
            max = this.myScore[i][j];
            fallclient.x = i;
            fallclient.y = j;
          } else if (this.myScore[i][j] === max) {
            if (this.computerScore[i][j] > this.computerScore[fallclient.x][fallclient.y]) {
              fallclient.x = i;
              fallclient.y = j;

            }
          }

          if (this.computerScore[i][j] > max) {
            max = this.computerScore[i][j];
            fallclient.x = i;
            fallclient.y = j;
          } else if (this.computerScore[i][j] === max) {
            if (this.myScore[i][j] > this.myScore[fallclient.x][fallclient.y]) {
              fallclient.x = i;
              fallclient.y = j;
            }
          }
        }

      }
    }
    return fallclient;
  },

  winned: function(str) {
    const That = this;
    const $win = document.createElement("div");
    $win.id = 'win';
    $win.style.width = `600px`;
    $win.style.height = `600px`;
    $win.style.background = 'black';
    $win.style.color = 'white';
    $win.style.opacity = '0.7';
    $win.style.border = '2px solid #e5e5e5';
    $win.style.position = 'absolute';
    $win.style.top = '0';
    $win.style.left = '0';
    $win.style.display = 'flex';
    $win.style.cursor = 'pointer';
    $win.style.alignItems = 'center';
    $win.style.justifyContent = 'center';
    $win.innerHTML = '<div>' +
      '<div style="display: flex;justify-content: center;"><svg t="1680588236050" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8943" width="20" height="20"><path d="M462.848 104A416 416 0 1 1 560 927.68a15.52 15.52 0 0 1-16-15.68v-32c0-8.832 7.168-15.968 16-16.352a351.968 351.968 0 0 0 263.264-565.92 352 352 0 0 0-619.264 123.136l60.576 16.224a16 16 0 0 1 5.344 28.352l-122.144 89.824a16 16 0 0 1-24.128-6.464l-60.832-138.88a16 16 0 0 1 18.784-21.856l60.576 16.224a416 416 0 0 1 320.64-300.288zM224 896a96 96 0 1 0 0-192 96 96 0 0 0 0 192z" fill="#ffffff" p-id="8944"></path></svg></div>' +
      `<div>${str}</div>` +
      '</div>'
    $win.onclick = function() {
      That.init();
    }
    document.getElementById("golangBox").appendChild($win);
  }
};
