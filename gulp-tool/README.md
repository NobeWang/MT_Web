gulp创建项目
npm install -g cnpm --registry=https://registry.npm.taobao.org

1.npm init;//自动为你创建package.json文件（储存项目的相关信息）
2.npm install gulp --save-dev//局部安装gulp，完成这后自动生成node_module文件
3.cnpm i gulp-uglify --save-dev //安装js文件压缩模块
4.cnpm i gulp-babel --save-dev//将es6转换成es5
5.cnpm i gulp-gulp-concat --save-dev//合并两个js文件


gulp与node版本兼容问题
win10系统下使用django时，用到了node,gulp等插件，但是在执行gulp命令时一直报错，网上找了n种方法，靠自己一步步填坑，终于解决了这个bug。记录一下完整的过程。

一、node与gulp版本兼容问题略谈。
我们使用nvm管理node版本，使用npm下载node中的各种插件，包括gulp，node版本需要与gulp版本相适应，比如node12以上的版本不能兼容gulp3，反过来一样gulp4不能适应node12一下的版本（我猜的，嘻嘻）。而node版本号中奇数为测试版，偶数为稳定版，所以我们需要选择合适的版本。我本来打算使用node12版本，但是在下载gulp4.0.2版本时cmd命令行总是显示为2版本，所以最后改为使用node10.20.1，gulp3.9.1。

二、完整操作过程
首先，假设已经安装了nvm,我们在命令行窗口下安装node10:
nvm install 10.20.1
然后使用10：
nvm use 10.20.1
接下来就可以安装gulp3，注意如果之前安装过其它版本，需要先清空npm_cache文件（在C/用户/APPDATA/roaming/下）并卸载gulp旧版本，卸载命令如下：
npm cache clean -f
npm uninstall --global gulp
安装命令如下：
npm install --global gulp@3.9.1

下面在命令行进入django项目中对应的文件夹，如果之前在该文件夹使用过npm install 命令，还需清空npm_cache 文件夹并清空缓存，命令如下：
npm cache clean -f
然后可以进行安装：
npm install
查看gulp版本：
gulp -v
如果全局与局部都是3.9.1版本，可以执行gulp命令：
gulp
然后会打开浏览器，这就表明命令成功了！！
喜欢的话，请点赞哦！