## 運行專案

### 1. 安裝依賴套件(首次執行才需要)

確保當前路徑為專案資料夾下，指令將安裝 package-lock.json 內的套件

```
npm install
```

### 2. 生成資料庫表格(首次執行才需要)

須確保資料庫 alphacamp 存在

```
npx sequelize db:migrate
```

### 3. 透過 Seeder 生成初始數據(首次執行才需要)

```
npx sequelize db:seed:all
```

### 4. 設置環境變數

VS code in Windows
```
$env:NODE_ENV="development"
```

### 5. 專案啟動

```
npm run dev
```

### 6. 使用預設帳密登入

廣志
```
信箱: hiroshi@email.com
密碼: password
```

小新
```
信箱: hiroshi@email.com
密碼: password
```

## 使用者功能：User story

使用者可以：

1. 註冊帳號
    1. 註冊之後，可以登入/登出
    2. 只有登入狀態的使用者可以看到 app 內容，否則一律被導向登入頁
2. 在首頁一次瀏覽所有支出的清單(使用者只能看到自己建立的資料)
3. 在首頁看到所有支出清單的總金額
4. 新增一筆支出 (資料屬性參見下方規格說明)
5. 編輯支出的屬性 (一次只能編輯一筆)
6. 刪除任何一筆支出 (一次只能刪除一筆)
7. 根據「類別」篩選支出；總金額的計算只會包括被篩選出來的支出總和

## 版面示意圖

![版面示意圖](/repo/images/C4BM3-1-1.png)

## 資料表設計

![資料表設計](/repo/images/C4BM3-1-2.png)
