# React Native + 热更新(`Code Push`) 部署文档

## 1.解决什么问题：

1）`web` 端与原生端打包解偶，`web` 端打包可以不依赖原生一起打包。
2）`web` 端与原生部分联调问题，不需要再将 `bundle` 包传输给原生运行，在原生已支持对应功能 `api` 的情况下 `web` 端可自行下载安装安装包，将调试代码打包以热更新的方式推到 `app` 上，并在 `Android Studio` 或 `Xcode` 的上查看调试日志。

## 2.服务器部署

创建并连接`ECS`实例

### 一、部署`Node.js`环境

使用 `git` 将源码克隆到本地的`~/.nvm`目录下，并检查最新版本。

下载 `Node.js` 安装包。

```bash
wget https://nodejs.org/dist/v6.9.5/node-v14.0.0-linux-x64.tar.xz
```

#### 解压

```bash
tar xvf node-v6.9.5-linux-x64.tar.xz
```

创建软链接，您就可以在任意目录下直接使用`node`和`npm`命令。

```bash
ln -s /root/node-v6.9.5-linux-x64/bin/node /usr/local/bin/node
ln -s /root/node-v6.9.5-linux-x64/bin/npm /usr/local/bin/npm
```

#### 查看`node、npm`版本。

```bash
node -v
npm -v
```

如果需要将该软件安装到其他目录（例如：`/opt/node/`）下，请进行如下操作：

```bash
mkdir -p /opt/node/
mv /root/node-v6.9.5-linux-x64/* /opt/node/
rm -f /usr/local/bin/node
rm -f /usr/local/bin/npm
ln -s /opt/node/bin/node /usr/local/bin/node
ln -s /opt/node/bin/npm /usr/local/bin/npm
```

### 安装`mysql`

```bash
wget https://dev.mysql.com/get/Downloads/MySQL-5.7/mysql-5.7.24-linux-glibc2.12-x86_64.tar.gz
```

下载完

```bash
tar xzvf mysql-5.7.24-linux-glibc2.12-x86_64.tar.gz
```

移至`/usr/local/`

```bash
mv mysql-5.7.24-linux-glibc2.12-x86_64 /usr/local/
```

#### 改名

```bash
cd /usr/local/
mv mysql-5.7.24-linux-glibc2.12-x86_64 mysql
```

#### 在`/usr/local/mysql`目录下创建`data`目录

```bash
mkdir /usr/local/mysql/data
```

#### 更改`mysql`目录下所有的目录及文件夹所属的用户组和用户，以及权限

```bash
chown -R mysql:用户名 /usr/local/mysql
chmod -R 755 /usr/local/mysql
```

#### 安装链接库文件

```bash
sudo apt-get install libaio-dev
```

You need to be root to perform this command 怎么解决：
切换到`root`用户
`su`回车输入密码
刚安装完，没有设置`root`用户密码：`sudo passwd`，然后会让你输入当前用户密码，输入完后再输入`root`用户密码就可以了

编译安装并初始化`mysql`,务必记住初始化输出日志末尾的密码（数据库管理员临时密码）

```bash
root@localhost: 7Pa,9hIokNRe
cd /usr/local/mysql/bin
./mysqld --initialize --user=mysql --datadir=/usr/local/mysql/data --basedir=/usr/local/mysql
```

输入`vi /etc/my.cnf`，编辑配置文件`my.cnf`，添加配置如下:

```bash
[mysqld]
datadir=/usr/local/mysql/data
port=3306
sql_mode=NO_ENGINE_SUBSTITUTION,STRICT_TRANS_TABLES
symbolic-links=0
max_connections=600
innodb_file_per_table=1
lower_case_table_names=1
```

#### 启动`mysql`服务器

```bash
/usr/local/mysql/support-files/mysql.server start
```

如果出现如下提示信息

```
Starting MySQL... ERROR! The server quit without updating PID file
```

解决办法：

#### 查询服务

```bash
ps -ef|grep mysql | grep -v grep
ps -ef|grep mysqld | grep -v grep
```

#### 结束进程

```
kill -9 PID
```

#### 启动服务

```bash
/usr/local/mysql/support-files/mysql.server start
```

#### 添加软连接，并重启`mysql`服务

```bash
ln -s /usr/local/mysql/support-files/mysql.server /etc/init.d/mysql
ln -s /usr/local/mysql/bin/mysql /usr/bin/mysql
service mysql restart
```

#### 登录 mysql，修改密码(密码为步骤 5 生成的临时密码)

```bash
mysql -u root -p
Enter password:
mysql>set password for root@localhost = password('yourpass');
```

#### 开放远程连接

```
mysql>use mysql;
msyql>update user set user.Host='%' where user.User='root';
mysql>flush privileges;
```

#### 设置开机自动启动

-   1、将服务文件拷贝到`init.d`下，并重命名为`mysql`

```
[root@localhost /]# cp /usr/local/mysql/support-files/mysql.server /etc/init.d/mysqld
```

-   2、赋予可执行权限

```bash
[root@localhost /]# chmod +x /etc/init.d/mysqld
```

-   3、添加服务

```bash
[root@localhost /]# sysv-rc-conf mysqld on
```

-   4、显示服务列表

```bash
[root@localhost /]# sysv-rc-conf --list
```

### 部署 `code-push`

```bash
git clone http://172.16.6.11:8050/zhangyaohuang/work-hot-update.git
cd work-hot-update
```

#### 修改 code-push-server 仓库配置

```
vim config/config.js
```

#### 配置数据库

```js
// Config for database, only support mysql.
db: {
  username: process.env.RDS_USERNAME || "root",
  password: process.env.RDS_PASSWORD || "123456",
  database: process.env.DATA_BASE || "codepush",
  host: process.env.RDS_HOST || "127.0.0.1",
  port: process.env.RDS_PORT || 3306,
  dialect: "mysql",
  logging: false,
  operatorsAliases: false,
},
```

#### 修改 `local` 对象的下载地址为本机(或服务器的 `ip` 地址)

```js
local: {
  // Binary files storage dir, Do not use tmpdir and it's public download dir.
  storageDir: process.env.STORAGE_DIR || "/home/ubuntu/codepush/storage",
  // Binary files download host address which Code Push Server listen to. the files storage in storageDir.
  downloadUrl: process.env.LOCAL_DOWNLOAD_URL || "http://172.16.6.190:3000",
  // public static download spacename.
  public: ''
  },
  common: {
  //......//
  dataDir: '/home/ubuntu/codepush/data',
  //......//
},
```

#### 初始化数据库信息

```bash
./bin/db init --dbhost localhost --dbuser root --dbpassword 数据库密码
```

#### 安装依赖

```bash
npm install
```

#### 安装完成启动服务

```bash
npm run dev
```
