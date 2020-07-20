  const {
    app,
    BrowserWindow
  } = require('electron')

  // 保持对window对象的全局引用，如果不这么做的话，当JavaScript对象被
  // 垃圾回收的时候，window对象将会自动的关闭
  let win;

  function createWindow() {
    const windowOptions = {
      width: 1000,
      height: 600,
      frame: false,
    };
    // 创建浏览器窗口。
    win = new BrowserWindow(windowOptions);


    //这个地方会报错，因为在主进程中没有window对象，window对象只有在web页面里面才会有
    // console.log("主进程中的window对象=============================》》》："+window);

    // 加载应用----react 打包
    // win.loadURL(url.format({
    //   pathname: path.join(__dirname, './index.html'),
    //   protocol: 'file:',
    //   slashes: true
    // }))
    console.log("__dirname=========================》》》：" + __dirname);
    console.log("__filename=========================》》》：" + __filename);

    // 加载应用----适用于 react 开发时项目
    win.loadURL("http://localhost:3000")


    // 打开开发者工具
    win.webContents.openDevTools()

    // 当 window 被关闭，这个事件会被触发。
    win.on('closed', () => {
      // 取消引用 window 对象，如果你的应用支持多窗口的话，
      // 通常会把多个 window 对象存放在一个数组里面，
      // 与此同时，你应该删除相应的元素。
      win = null
    })

    //接收渲染进程的信息
    const ipc = require('electron').ipcMain;
    ipc.on('min', function () {
      console.log("===============================》》》：接收到min消息");
      win.minimize();
    });

    //接收渲染进程的信息
    ipc.on('min', function () {
      win.minimize();
    });
    ipc.on('max', function () {
      win.maximize();
    });
    ipc.on("login", function () {
      win.maximize();
    });

    makeSingleInstance();
  }

  function makeSingleInstance() {
    if (process.mas) return;
    app.requestSingleInstanceLock();
    app.on('second-instance', () => {
      if (win) {
        if (win.isMinimized()) win.restore()
        win.focus()
      }
    })
  }

  // Electron 会在初始化后并准备
  // 创建浏览器窗口时，调用这个函数。
  // 部分 API 在 ready 事件触发后才能使用。
  app.on('ready', () => {
    createWindow()
  })

  // 当全部窗口关闭时退出。
  app.on('window-all-closed', () => {
    // 在 macOS 上，除非用户用 Cmd + Q 确定地退出，
    // 否则绝大部分应用及其菜单栏会保持激活。
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })

  app.on('activate', () => {
    // 在macOS上，当单击dock图标并且没有其他窗口打开时，
    // 通常在应用程序中重新创建一个窗口。
    if (win === null) {
      createWindow()
    }
  })

  // 在这个文件中，你可以续写应用剩下主进程代码。
  // 也可以拆分成几个文件，然后用 require 导入。
