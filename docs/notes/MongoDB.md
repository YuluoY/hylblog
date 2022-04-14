# MongoDB

## 1、安装MongoDB(win)

> 以下只适用于windows操作系统，mac用户请移步...

### 1.1、下载

[MongoDB](https://www.mongodb.com/download-center/community)

### 1.2、安装

- 点击"Custom（自定义）"来自定义安装目录。

<img src="D:\桌面\Typora\img\MongoDB\win-install1.jpg" alt="步骤一" style="zoom:67%;" />

- 点击"Browse..."按钮来选中安装位置。（我安装的位置：D:\MongoDB）

<img src="D:\桌面\Typora\img\MongoDB\win-install2.jpg" alt="步骤二" style="zoom: 67%;" />

- **"install mongoDB compass"** 不勾选（当然你也可以选择安装它，可能需要更久的安装时间），MongoDB Compass 是一个图形界面管理工具，我们可以在后面自己到官网下载安装。下载地址：[MongoDB Compass](https://www.mongodb.com/download-center/compass。)

![步骤三](D:\桌面\Typora\img\MongoDB\win-install3.jpg)

### 1.3、目录结构

```js
MongoDB
|------bin
|------|---InstallCompass.ps1
|------|---mongo.exe
|------|---mongod.cfg // 配置文件
|------|---mongod.exe
|------|---mongod.pdb 
|------|---mongos.exe
|------|---mongos.pdb
|------data
|------|---diagnostic.data // 文件夹
|------|---journal
|------|---... // 一堆文件
|------log
|------|--mongod.log
|------LICENSE-Community.txt
|------MPL-2 // 文件
|------README // 文件
|------THIRD-PARTY-NOTICES // 文件
```

## 2、连接MongoDB

#### 1、运行MongoDB服务器（方法一）

> 以下操作均在`bin`目录中打开`cmd`进行。或者将`bin`目录配置到`path`环境变量中。
>
> > 只能关掉第三步的终端，第二步的终端关掉将与MongoDB服务器断开连接。

1. 在`data`文件夹中新建`db`文件夹
2. 打开`cmd`，输入： ` mongod --dbpath D:\MongoDB\data\db `
3. 重新再调出一个cmd终端，输入：`mongo`

#### 2、打开MongoDB服务（方法二）

> 由于权限原因，我们需要已管理员的身份打开终端进行网络服务打开操作。

1. 以管理员身份打开`cmd`
2. 启动服务：`net start MongoDB`
3. 关闭服务：`net stop MongoDB`
4. 移除服务：`mongod --remove`



## 3、MongoDB命令操作

### **数据库操作**

- db：查询当前数据库。

- show dbs：查询所有的数据库。

- db.dropDatabase()：删除数据库。



### **集合操作**

- db.createCollection("user")：创建一个user集合。

- db.getCollection("user")：得到user集合。

- db.getCollectionNames()：得到当前db的所有集合。

- db.printCollectionStats()：显示当前db所有集合的状态。

- db.user.drop()：删除user集合。

- db.user.dataSize()：输出user集合的大小。

- db.user.count()：输出user集合中的数据条数。



### **文档操作**

#### **添加/更新/插入操作**

- db.users.save([{key1:value1,...}, {}, ...])：向users集合中添加数据。

- db.users.insert([{name:'zhangsan', age:10}, {name:'李四', age:12}, ...])：向users集合中插入数据。

- db.users.update({age:25}, {$set: {name:'changeName'}}, true)：匹配users集合中年龄等于25的数据，并修改他们的name为changeName。

- true：表示找不到更新的数据就添加数据，如果为false则不添加，默认为false。

- db.users.update({name:'张三'}, {$inc:{age:30}, $set:{name:'李四'}})：将张三的age增加30，将name更改为李四。

 

#### **查询操作**

**条件查询**

- db.users.find().pretty()：格式化显示所有数据。

- db.users.distince('name')：查询去重后的数据，根据name值去重。

- db.users.find()：查找users里所有的数据。

- db.users.find({'age', 22})：查找`age = 22`的数据。

- db.users.find({age:{$gt:22}))：查找`age > 22`的数据。

- db.users.find({age:{$lt:22}))：查找`age < 22`的数据。

- db.users.find({age:{$gte:22}))：查找`age >= 22`的数据。

- db.users.find({age:{$gt:22, $lte:26}})：查找`age > 22 并且 age <= 26`的数据。

- db.users.find({}, {name:1, age:1})：查询指定列name，age的数据。

- db.users.find({age:{$gt:25}}, {name:1, age:1})：查询指定列name，age且age>25的数据。

- db.users.findOne()：查询第一条数据。

- db.users.find({age:{$gte:25}}).count()：查询`age>=25`的条数。

**正则查询**

- db.users.find({name:/mongo/})：查询name中包含mongo的数据。

- db.users.find({name:/^mongo/ })：查询name中以mongo开头的数据。

 **sort排序查询**

- db.user.find().sort({age:1})：按年龄升序排序。

- db.user.find().sort({age:-1})：按年龄降序排序。

**limit限制查询**

- db.user.find().limit(5)：查询前五条数据。

- db.user.find().skip(10)：查询十条之后的数据。

- db.user.find().limit(10).skip(5)：查询5-10条之间的数据。

**or与查询**

- db.user.find({$or:[{age:22}, {age:25}]})：查询age=22或者age=25的数据。

**type类型查询**

> Double=1，String=2，Object=3，Array=4，Binary data=5，Boolean=8，Date=9，
>
> Null=10，Regular Expression=11，JavaScript=13，Symbol=14

- db.user.find({'title': {$type : 2}})：查询title中类型为string的数据。

- db.user.find({'title': {$type : 'string'}})：查询title中类型为string的数据。



#### **删除操作**

- db.user.remove({name:'张三'})：删除name为张三的数据。

- db.user.remove({})：删除所有数据。

















