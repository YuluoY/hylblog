# Mongoose之aggregate

> 如果在本地安装了[mongodb](https://www.mongodb.org.cn/)，那么在终端输入`mongo`就会显示你的数据库连接url。
> 首先你得开启了mongodb服务，具体的请参考[我的MongoDB笔记](/notes/MongoDB.md)。

## 连接MongoDB

```js
// 1、导入mongoose模块
const db = require('mongoose');

// 2、本地mongodb数据库的url
const url = 'mongodb://127.0.0.1:27017/mongoosePractice'

// 3、进行连接
db.connect(url, {
    useNewUrlParser: true
}, function (err) {
    if (err) {
        console.log("连接失败！")
    } else {
        console.log("连接成功！")
    }
})
```

## 创建Schema（表）

```js
const db = require('mongoose');

let categorySchema = new db.Schema({
    name: {type: String},
})

let articleSchema = new db.Schema({
    title: {type: String},
    cate: {type: String}
})
// model 参数一：模型名称。 参数二：schema实例，模型实例。  参数三：数据库表名
const Article = db.model('Article', articleSchema, 'article'); 
const Category = db.model("Category", categorySchema, 'category');
```

## 数据导入

> 这里也引用了上面的代码

```js
// 在article表中添加的三行数据
new Article({title: 'Java', cate: '技术文章'}).save();
new Article({title: 'NodeJs', cate: '技术文章'}).save();
new Article({title: '追风筝的人', cate: '生活随感'}).save();

// 在category表中添加二行数据
new Category({name: '技术文章'}).save();
new Category({name: '生活随感'}).save();
```

## 聚合查询

> 这里没有引用数据导入的代码，但是仍需要连接MongoDB和创建`Schema`的代码。

```js
// 1、category的聚合查询。当查询完输出时，在每一个类别下面都会有相同类别的文章。
Category.aggregate([
    {
        $lookup: {
            from: 'article',  // 关联article表
            foreignField: 'cate', // 外部字段，即：article表中的cate字段
            localField: 'name', // 本地字段，即：category表中的name字段
            as: 'category_items' // 当本地字段与外部字段中的值相等时，就将article表中的这一行数据添加在category_items字段中。
        },
    },
], function (err, data) {
    console.log(JSON.stringify(data));
})

// 2、article的聚合查询，根据文章id进行聚合查询
Article.aggregate([
    {
        $lookup: {
            from: 'category',
            foreignField: 'name',
            localField: 'cate',
            as: 'article_items'
        },
    },
    {
        // 在$match选项中，获取mongoose的id需要db.Types.ObjectId(_id)的方式获取。
        // 因为该id的类型为ObjectId，而非字符串或者其他类型的id。
        $match: {_id: db.Types.ObjectId('6258215a747cc3136f26d60e')}
    }
], function (err, data) {
    console.log(JSON.stringify(data));
})
```

## aggregate聚合管道的其他配置项

| 操作符       | 含义            |
|-----------|:--------------|
| $group    | 过滤数据，只输出符合结果的文档              |
| $match    | 设置用户签名        |
| $project  | 修改输入文档的结构&#40;例如重命名，增加、删除字段，创建结算结果等&#41;        |
| $sort     | 将结果进行排序后输出       |
| $limit    | 限制管道输出的结果个数        |
| $skip     | 跳过制定数量的结果，并且返回剩下的结果        |
| $unwind   | 将数组类型的字段进行拆分        |

### $group

```js
Article.aggregate([
    {
        $lookup: {
            from: 'category',
            foreignField: 'name',
            localField: 'cate',
            as: 'article_items'
        },
    },
    {
        $group: {
            _id: '$cate'  // 根据article中的cate字段进行分组
        }
    }
], function (err, data) {
    console.log(JSON.stringify(data));
    // out: [{"_id":"技术文章"},{"_id":"生活随感"}]
})
```

### $match 、 $limit and $sort

```js
Person.aggregate([
    {
        $match: {age: {$gt: 22, $lte: 26}}  // age>22 and age<=26
        // $gt: > , $gte:>= , $lt: < , $lte: <=
    },
    {
        $limit: 2 // 限制两条输出
    },
    {
        $sort: {age: -1} // 按年龄降序排序。 （-1:降序，1:升序）
    }
], function (err, data) {
    console.log(JSON.stringify(data));
})
```