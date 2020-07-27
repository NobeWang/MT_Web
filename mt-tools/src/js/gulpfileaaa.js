//合并js文件,减小http请求
//cnpm install gulp gulp-concat gulp-uglify node-cmd node-zip del
var gp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var JSZip = require("node-zip");
var fs = require("fs");
var del = require('del');
var crypto = require("crypto");
//var images = require("images");
var cdnResPath;
var configDir;
var releasePath;
var releaseDir;
var webPath;
var outRootPath;
var webDir;
var verDir;
var needAddPackage;
var platformCfg;
var fileSuffixs = ["json","png","jpg","bin","mp3","js","fnt"];
var md5Dic = {defaultVersion:0,files:{}};//files:{path:xxxx.png,md5:xxxx,version:1},
var md5DataFile = "md5_data.json";

var minimist = require('minimist');

var knownOptions = {
  string: ['env', "target"],
  default: { 
	  target: "config",
	  env: process.env.NODE_ENV || 'production' }
};

var options = minimist(process.argv.slice(2), knownOptions);

initCfg();

//读取配置文件
function initCfg() {
	var configName = options.target;
	// console.log("configName " + options.target);
	var data = fs.readFileSync(configName + '.json');
	var str = data.toString();
	str = str.replace(/\\/g, "/");
	var json = JSON.parse(str);
	cdnResPath = json.cdnResPath;
	configDir = json.configDir;
	outRootPath = json.outPath;
	webDir = json.webDir;
	webPath = outRootPath + "/" + webDir;
	verDir = json.verDir;
	needAddPackage = json.needAddPackage == "yes";
	platformCfg = json.platformCfg;
	// console.log("needAddPackage=", needAddPackage);
	releaseDir = json.releaseDir;
	releasePath = "./" + releaseDir;
}

function modifyVersionFile(version) {
	if(platformCfg){
		var path = webPath + "/platformCfg/" + platformCfg +".json"
		var data = fs.readFileSync(path);
		var str = data.toString();
		// console.log("modifyVersionFile str = ", str);
		//读进来的文件头部可能会有一些其他符号，只取需要的json内容
		var index1 = str.indexOf("{");
		str = str.substr(index1);
		var json = JSON.parse(str);
		// console.log("json = ", json);
		var gameVersion = json.gameVersion;
		// console.log("gameVersion = ", gameVersion);
		var gameVersionArr = gameVersion.split("&");
		// console.log("gameVersionArr = ", gameVersionArr);
		var gameVersionItem;
		var len = gameVersionArr.length;
		// console.log("len = ", len);
		for(var i = 0; i < len; i++)
		{
		   	gameVersionItem = gameVersionArr[i];
			var indexV = gameVersionItem.indexOf(verDir + "/");
			// console.log("i = ",i, "indexV = ", indexV);
			if(indexV >= 0){
				var indexVer = gameVersionItem.indexOf("/");
				var verStr = gameVersionItem.substr(indexVer);
				gameVersionItem = gameVersionItem.replace(verStr, "/" + version);
				gameVersionArr[i] = gameVersionItem;
			}
		}
		gameVersion = "";
		for(var i = 0; i < len; i++)
		{
		   	gameVersionItem = gameVersionArr[i];
			gameVersion += gameVersionItem;
			if(i < len - 1){
				gameVersion += "&";
			}
			// console.log("i = ",i, "gameVersion = ", gameVersion);
		}
		json.gameVersion = gameVersion;
		// console.log(json);
		fs.writeFileSync(path, JSON.stringify(json, null, 4), 'utf-8');
	}
}

//运行gulp命令
//gulp default或者gulp
function egret(){
    // 把1.js和2.js合并为main.js，输出到dest/js目录下
	//gp.src(['1.js','2.js']).pipe(concat('main.js')).pipe(gp.dest('./dest/js'));
    let stream = gp.src([
		releasePath + '/js/egret.min.js',
		releasePath + '/js/jszip.min.js',
		releasePath + '/js/eui.min.js',
		releasePath + '/js/assetsmanager.min.js',
		releasePath + '/js/tween.min.js',
		releasePath + '/js/socket.min.js',
		releasePath + '/js/game.min.js',
		releasePath + '/js/md5.min.js',
		releasePath + '/js/mobile-detect.min.js',
		releasePath + '/js/egret.web.min.js',
		releasePath + '/js/promise.min.js'
	]).pipe(concat('libs.min.js')).pipe(gp.dest(releasePath + '/js'));
	return stream;
}

function login(){
    // 把1.js和2.js合并为main.js，输出到dest/js目录下
	//gp.src(['1.js','2.js']).pipe(concat('main.js')).pipe(gp.dest('./dest/js'));

    let stream = gp.src([
		releasePath + '/js/protobuf-library.min.js',
		releasePath + '/js/protobuf-bundles-login.min.js',
		releasePath + '/js/login.thm.js',
		releasePath + '/js/login.min.js'
	]).
	pipe(concat('main-login.min.js')).pipe(gp.dest(releasePath + '/js'))
	
	// pipe(concat('egret.login.js')).pipe(uglify()).pipe(gp.dest(releasePath + '/js'))


	//done();
	// gp.pipe(uglify());
	return stream;
}

function createRole(){
    // 把1.js和2.js合并为main.js，输出到dest/js目录下
	//gp.src(['1.js','2.js']).pipe(concat('main.js')).pipe(gp.dest('./dest/js'));

    let stream = gp.src([
		releasePath + '/js/createrole.thm.js',
		releasePath + '/js/createrole.min.js'
	]).
	pipe(concat('main-createrole.min.js')).pipe(gp.dest(releasePath + '/js'))
	
	// pipe(concat('egret.login.js')).pipe(uglify()).pipe(gp.dest(releasePath + '/js'))


	//done();
	// gp.pipe(uglify());
	return stream;
}

function libsAndLogin(){
    // 把1.js和2.js合并为main.js，输出到dest/js目录下
	//gp.src(['1.js','2.js']).pipe(concat('main.js')).pipe(gp.dest('./dest/js'));

    let stream = gp.src([
		releasePath + '/js/egret.min.js',
		releasePath + '/js/jszip.min.js',
		releasePath + '/js/eui.min.js',
		releasePath + '/js/assetsmanager.min.js',
		releasePath + '/js/tween.min.js',
		releasePath + '/js/socket.min.js',
		releasePath + '/js/game.min.js',
		releasePath + '/js/md5.min.js',
		releasePath + '/js/mobile-detect.min.js',
		releasePath + '/js/egret.web.min.js',
		releasePath + '/js/promise.min.js',
		releasePath + '/js/protobuf-library.min.js',
		releasePath + '/js/protobuf-bundles-login.min.js',
		releasePath + '/js/login.thm.js',
		releasePath + '/js/login.min.js'
	]).
	pipe(concat('libs-login.min.js')).pipe(gp.dest(releasePath + '/js'))
	
	// pipe(concat('egret.login.js')).pipe(uglify()).pipe(gp.dest(releasePath + '/js'))


	//done();
	// gp.pipe(uglify());
	return stream;
}

function main(){
    let stream = gp.src([
		releasePath + '/js/protobuf-bundles.min.js',
		releasePath + '/js/default.thm.min.js',
		releasePath + '/js/main.min.js'
	]).
	pipe(concat('main-game.min.js')).pipe(gp.dest(releasePath + '/js'))
	return stream;

}

function uglifyTest(){
	let stream = gp.src(["js/egret.login.js"]).pipe(uglify());
	return stream;
}


function clean(){
    return del(['./node_modules','./package.json','./package-lock.json']);
}

function copyConfigToResource(done){
	if(configDir){
		var configFileName = 'config.bin';
		var srcPath = './' + configDir + '/' + configFileName;
		var destPath = releasePath + '/resource/config/' + configFileName;
		fs.copyFileSync(srcPath, destPath);
	}
	done();
}

/** 循环读取所有文件列表 */
function readDirSync(exmlDir, fileArr) {
	// console.log("exmlDir:"+exmlDir);
	var pa = fs.readdirSync(exmlDir);
	pa.forEach(function (ele, index) {
		if (ele == "gulpfile.js" || ele == "config.json" || ele == "configbak.json"){
			return;
		}
		var filePath = exmlDir + "/" + ele;
		var info = fs.statSync(filePath);
		if (info.isDirectory()) {			
			readDirSync(exmlDir + "/" + ele, fileArr);
		} else{
			var suffix = ele.substring(ele.lastIndexOf(".") + 1);
			if (fileSuffixs.indexOf(suffix) != -1){
				// console.log("file: " + filePath, info.mtime.getTime())
				fileArr.push({name:ele, path:filePath, time:info.mtime.getTime()});
			}
		}
	})
}

/** 增加版本号 */
function resourceMd5(addVersion, callback){	
	var newMd5Dic = {};
	var md5Path = webPath + "/" + verDir + "/" + md5DataFile;
	//在输出目录存在md5码对应文件，则读取
	if (fs.existsSync(md5Path)){
		var md5Str = fs.readFileSync(md5Path, "utf-8");
		md5Dic = JSON.parse(md5Str);
	}
	var newVersion = 1;
	var defaultVersion = md5Dic.defaultVersion;
	if (addVersion){
		defaultVersion++;
		md5Dic.defaultVersion = defaultVersion;
	}
	var resFileArr = [];
	md5MakeDir(webPath);
	readDirSync(cdnResPath, resFileArr);
	// console.log("dir: " + cdnResPath);
	readDirSync(releasePath, resFileArr);
	// console.log("dir: " + __dirname);
	if (resFileArr.length == 0){
		callback(null,null);
		return;
	}
	var fileCount = 0;
	var newCount = 0;
	for(var obj of resFileArr){
		var path = obj.path;
		if(path.indexOf(cdnResPath) >= 0)
		{
			path = path.replace(cdnResPath, "resource");
		} else if(path.indexOf(releasePath + "/") >= 0)
		{
			path = path.replace(releasePath + "/", "");
		}
		obj.pathKey = path;
		// console.log("226", path)
		fileCount++;
		getFileMd5(obj.path, obj, function(error, md5, obj) {
			var path = obj.pathKey;
			var fileObj = md5Dic.files[path];
			if(fileObj){
				if (fileObj.time != obj.time){
					fileObj.time = obj.time;//最后修改时间
					if (fileObj.md5 != md5){
						fileObj.md5 = md5;
						fileObj.version = defaultVersion;
						newMd5Dic[path] = {ver:defaultVersion, source:obj.path};
						newCount++;
						console.log("file changed:", path);
					}else{
						// console.log("file time change:", path);
					}
				}
			}
			else{
				md5Dic.files[path] = {time:obj.time, version:newVersion, md5:md5};
				newMd5Dic[path] = {ver:newVersion, source:obj.path};
				newCount++;
			}
			fileCount--;
			if (fileCount == 0){
				if (newCount > 0){
					callback(newMd5Dic, defaultVersion);
				}
				else{
					callback(null,null);
				}
			}
		});
	}
}

/** 根据path创建文件夹，否则写入文件会报错  */
function md5TargetMakeDir(root, targetPath){
	// console.log("md5TargetMakeDir", root, targetPath);
	var index = targetPath.indexOf("/");
	if (index == -1){
		return;
	}
	var prePath = targetPath.substring(0, index);
	targetPath = targetPath.substring(index + 1);
	md5MakeDir(root + "/" + prePath);
	md5TargetMakeDir(root + "/" + prePath, targetPath);
}

function md5MakeDir(dirPath){
	if (!fs.existsSync(dirPath)){
		fs.mkdirSync(dirPath);
	}
}

function formatTimeNumberToStr(value){
	var valueStr = "" + value;
	if(value < 10) {
		valueStr = "0" + value;
	}
	return valueStr;
}

/** 增加版本号 */
function genMd5Version(addVersion, callback){
	var time = Date.now();
	resourceMd5(addVersion, function(newMd5Dic, defaultVersion){
		if (newMd5Dic == null){
			console.log("no file changed!");
			console.log("version not changed!");
			callback();
			return;
		}
		var addDir = "add_" + webDir + "_" + verDir;
		var date = new Date();
		var fullYear = date.getFullYear();
		var month = date.getMonth() + 1;
		var day = date.getDate();
		var hour = date.getHours();
		var minutes = date.getMinutes();
		// addDir = addDir+"_"+md5Dic.defaultVersion+"_"+fullYear+"_"+formatTimeNumberToStr(month)+"_"+ formatTimeNumberToStr(day)+"_"+formatTimeNumberToStr(hour)+"_"+formatTimeNumberToStr(minutes);
		addDir = addDir+"_"+md5Dic.defaultVersion
		var verPath = webPath + "/" + verDir + "/";
		var addPath = outRootPath + "/" + addDir + "/";
		var md5Path = webPath + "/" + verDir + "/" + md5DataFile;
		md5MakeDir(verPath);
		if(needAddPackage){
			md5MakeDir(addPath);
		} 
		addPath += "" + verDir + "/";
		if(needAddPackage){
			md5MakeDir(addPath);
		} 
		md5MakeDir(verPath + defaultVersion);
		if(needAddPackage){
			md5MakeDir(addPath + defaultVersion);
		} 

		//写入md5码对应该json文件md5_data.json
		var md5Data = JSON.stringify(md5Dic);
		fs.writeFileSync(md5Path, md5Data);

		//每个版本备份一次md5文件，用于还原版本数据md5_data
		var bakPath = verPath + defaultVersion + "/" + md5DataFile;
		fs.writeFileSync(bakPath, md5Data);
		//写入版本对应该版本号json文件/ver/new/version.json
		var key;
		var versionData = {defaultVer:1, fileCount:0, defaultCount:0, verDic:{}};
		for(key in md5Dic.files){
			var version = md5Dic.files[key].version;
			if (version == 1){//默认版本号
				versionData.defaultCount = versionData.defaultCount + 1;
			}
			else{
				versionData.verDic[key] = version;
			}
			versionData.fileCount = versionData.fileCount + 1;
		}
		
		var jsonDataPath = verPath + defaultVersion + "/version.json";
		var jsonDataPathadd = addPath + defaultVersion + "/version.json";
		fs.writeFileSync(jsonDataPath, JSON.stringify(versionData));
		if(needAddPackage){
			fs.writeFileSync(jsonDataPathadd, JSON.stringify(versionData));
		} 
		// console.log("writeFileSync:", jsonDataPath);
		//写入新版本产生文件对应该版本目录/ver/new/....
		for(key in newMd5Dic){
			var newObj = newMd5Dic[key];
			var fileVersion = newObj.ver;
			var destPath = verPath + fileVersion + "/" + key
			var destPathadd = addPath + fileVersion + "/" + key;
			if(needAddPackage){
				md5MakeDir(addPath + fileVersion);
			}
			// console.log("358", verPath , fileVersion, key);
			md5TargetMakeDir(verPath + fileVersion, key);
			if(needAddPackage){
				md5TargetMakeDir(addPath + fileVersion, key);
			}
			if (!fs.existsSync(destPath)){
				fs.copyFileSync(newObj.source, destPath);
				if(needAddPackage){
					fs.copyFileSync(newObj.source, destPathadd);
				} 
				// console.log("copy to file:", key);
			}
		}
		modifyVersionFile(defaultVersion);
		console.log("version added:" + defaultVersion + "!", Date.now() - time, "ms");
		callback();
	});
}

/** 增加版本号 */
function resourceMd5AddVersion(done){
	genMd5Version(true, done);
}
/** 不增加版本号 */
function resourceMd5NoneVersion(done){
	genMd5Version(false, done);
}
/** 获取文件md5码 */
function getFileMd5(path, key, callback){
	var hash = crypto.createHash('md5');
	var stream = fs.createReadStream(path);

	stream.on('data', function(data){
		hash.update(data);
	});

	stream.on('end', function() {
		callback(null, hash.digest('hex'), key);
	});
}
/** 不增加版本号 */
function test(done){
	//md5 ./test/testfile.txt
	let time = Date.now();
	getFileMd5(releasePath + "/resource/res/bag/jiahao.png", "xx", function(error, path, md5) {
		// console.log("md5:", md5, path, Date.now() - time, "ms");
		done();
	});
}

/** 修改输出目录 */
function changeOutPath(done){
	webPath = "E:/newHxf/Publish_H5Game_XYWSCli/webInspect";
	done();
}


//gulp.series 用于串行（顺序）执行
//gulp.parallel 用于并行执行
//var buildlib = gp.series(egret, zip_lib, login, zip_main, zip_thm);
//var build = gp.series(login, zip_main, zip_thm);
var buildlib = gp.series(libsAndLogin);
var buildMergeJs = gp.series(login,main);
var build = gp.series(libsAndLogin,createRole,main,copyConfigToResource,resourceMd5AddVersion);
var buildNone = gp.series(login,clean,resourceMd5NoneVersion);
var buildIOS = gp.series(changeOutPath,login,clean,resourceMd5AddVersion);


gp.task('login', login);//序列执行
// gp.task('uglifyTest', uglifyTest);//序列执行
gp.task('build', build);//序列执行
gp.task('buildlib', buildlib);//序列执行
gp.task('buildMergeJs', buildMergeJs);//序列执行
gp.task('buildNone', buildNone);//序列执行
gp.task('addVersion', resourceMd5AddVersion);//序列执行
gp.task('noneVersion', resourceMd5NoneVersion);//序列执行
gp.task('default', test);//序列执行
gp.task('buildIOS', buildIOS);//序列执行

// exports.default = test;