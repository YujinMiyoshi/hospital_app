## 環境
>Next.js 14.1.3
>Python 3.9.13


## 始めるには
### 必要なパッケージをインストール
```
npm i lucide-react next-auth react-hot-toast react-images-uploading date-fns react-hook-form tailwindcss
```

### 必要なライブラリをインストール
```
pip install -r requirements.txt
```

### .envファイルを設置（変数の中身は適宜変更）
>./.env
```
NEXT_PUBLIC_API_URL=http://localhost:5000
```
>./backend/.env
```
SITE_DOMAIN=http://localhost:3000
```

### 変数を設定
#### linux、macの場合
```
export NEXT_PUBLIC_API_URL=http://localhost:5000
export SITE_DOMAIN=http://localhost:3000
```
#### windowsの場合
```
set NEXT_PUBLIC_API_URL=http://localhost:5000
set SITE_DOMAIN=http://localhost:3000
```

### フロントエンド立ち上げ
```
npm run start
```
>番号入力ページ（例）
>http://localhost:3000/input
>番号表示ページ（例）
>http://localhost:3000/display

### バックエンド立ち上げ
```
cd backend
python api.py
```