const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const router = express.Router()
const DBHelper = require('./DBHelper');
const list = require('./list.json')


// 解决跨域
app.use(require('cors')())

// 挂载参数处理中间件(post)
app.use(bodyParser.urlencoded({ extended: false }))
// 处理json数据(get)
app.use(bodyParser.json())
// 连接数据库
let conn = new DBHelper().getConn();
// express 路由
router.get('/login', function (request, response) {
    response.render('login')
}).post('/login', (req, res) => {
  let data = req.body
  let sql = "select level, username from userLogin where username = ? and password = ?";
  conn.query(sql, [data.userName, data.password], (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });

  // 无数据库
  // if (data.userName === 'admin' && data.password === '111111') {
  //     res.send('OK');
  // } else {
  //     res.send('账号密码错误');
  // }
})

router.get('/list', (req, res) => {
    res.json(list)
})

router.get('/table', (req, res) => {
  let sql = "select * from userList";
  conn.query(sql, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(JSON.parse(JSON.stringify(result)))
    }
  });
}).post('/userUpdate', (req, res) => {
  let data = req.body
  let sql = ''
  let sqlData = []
  if(data.id) {
    sql = "update userList set name = ?, age = ?, address = ? where id = ?"
    sqlData = [data.name, data.age, data.address, data.id]
  } else {
    sql = "insert into userList(name, age, address) values (?, ?, ?)";
    sqlData = [data.name, data.age, data.address]
  }
  conn.query(sql, sqlData, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.send('OK');
    }
  });
}).post('/userDelete', (req, res) => {
  let data = req.body
  let sql = "delete from userList where id = ?"
  conn.query(sql, [data.id], (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.send('OK');
    }
  });
}).post('/userDetail', (req, res) => {
  let data = req.body
  let sql = "select * from userList where id = ?"
  conn.query(sql, [data.id], (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(JSON.parse(JSON.stringify(result)))
    }
  });
})

app.use('/', router)

app.listen(3000, () => {
    console.info('Running: 3000');
})
