# 初始化
### Step 1 安裝相關套件

首先把相關套件安裝起來吧，需要安裝的有三個：mySQL、Sequelize、和 Sequelize CLI：

```
npm install mysql2@3.2.0 sequelize@6.30.0 sequelize-cli@6.6.0
```

### Step 2 透過 sequelize-cli 初始設置

在 Sequelize CLI 裡，已經把初始化時需要的設定寫成 sequelize init 腳本了，我們可以直接執行指令。這裡因為指令集安裝在工具目錄下，需要先使用 npx 指令來找到路徑，再呼叫 sequelize init：

```
npx sequelize init
```

指令執行後，請仔細看一下系統訊息，它就是自動幫你開了一些空的資料夾和檔案。

### Step 3 透過 sequelize-cli 建立表格

這個指令會同時生成 migrations 和 models 當中的檔案，新建表格時可以使用這個。

注意屬性之間不能有空白，空白在 command line 裡會被視為新的指令。

--name 後面的名稱會是類別的名稱，也是生成 SQL 語句時的依據，因此須注意它的大小寫。

```
npx sequelize model:generate --name user --attributes name:string,email:string,password:string
```

```
npx sequelize model:generate --name category --attributes name:string
```

```
npx sequelize model:generate --name record --attributes name:string,date:date,amount:integer
```

#### 執行 Migration

```
npx sequelize db:migrate
```

### Step 4 添加數據解析用的中間件

```javascript
// For json data
// 使用 express.json() 中間件來解析 POST 請求的 JSON 數據
router.use(express.json());

// For form data
// 需要使用 express.urlencoded 來從請求網址中獲取表單資料，否則就會回傳 undefined
router.use(express.urlencoded({ extended: true }));
```

### Step 5 允許表單使用 GET 和 POST 以外的方法

安裝依賴套件

```
npm install method-override@3.0.0
```

```javascript
const methodOverride = require("method-override");

// 「覆寫 (override)」HTTP 方法，允許表單傳送 GET 和 POST 以外的方法
app.use(methodOverride("_method"));
```

### Step 6 

```
npm install connect-flash@0.1.1
npm install express-session@1.17.3

npm install passport@0.6.0 passport-facebook@3.0.0 passport-local@1.0.0

npm install bcryptjs@2.4.3 dotenv@16.0.3
```

```javascript
const flash = require("connect-flash");
const session = require("express-session");
```

## 建立 Seeder 檔案

```
npx sequelize seed:generate --name categorySeeder
npx sequelize seed:generate --name recordSeeder
```

# 執行 Seeder 腳本

```
npm run seed
```

上方指令實際會執行下方指令

```
npx sequelize-cli db:seed --seed ./seeders/categorySeeder.js && npx sequelize-cli db:seed --seed ./seeders/recordSeeder.js
```