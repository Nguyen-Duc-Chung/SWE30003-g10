# 🚀 How to Deploy & Run the **Long Châu Pharmacy Management System**

## 📌 Prerequisites
Make sure you have installed:
- [Visual Studio Code](https://code.visualstudio.com/)
- [MongoDB Compass](https://www.mongodb.com/products/tools/compass)
- [NodeJS](https://nodejs.org/en/download)

> 💡 If not installed, follow this tutorial (For MongoDB Compass): [Watch on YouTube](https://youtu.be/jvaBaxlTqU8?si=kgnqJeNO1tA5jlnd)

---

## 1️⃣ Clone the Project
```bash
git clone https://github.com/Nguyen-Duc-Chung/SWE30003-g10.git

```

## 2. Create an `.env` file in `LongChauProject` root directory

## 3. Copy the following content into  **.env** file:

```bash
PORT = 5000

MONGO_URL = mongodb://127.0.0.1:27017/pharmacy

UPSTASH_REDIS_URL='rediss://default:AUWFAAIjcDFiOGZhOWExNzVmY2Q0N2NkYmUwYzczMTBiMTA4ZWRhZHAxMA@aware-polliwog-17797.upstash.io:6379'

ACCESS_TOKEN_SECRET= access_token_secret
REFRESH_TOKEN_SECRET= refresh_token_secret


CLOUDINARY_CLOUD_NAME = duvuzr9wd
CLOUDINARY_API_KEY = 431331559822377
CLOUDINARY_API_SECRET = Ma_oVu5jy3I89G3gx8PtVKyK3as

STRIPE_SECRET_KEY = sk_test_51RNDbxFRT31SpY0BjpL0lJjSTxB5NXWxB9uOshudt7dPtAHMCcw7uq04JSAqRs9d03BHp67mltrPZ82ahqhCC3A300zlzpTy7L

```

## 4. Open Terminal , In `LongChauProject` directory ennter this command:
```bash
    npm install
```

## 5. Enter this command to start backend server:
```bash
    npm start
```

## 6. Open new Terminal , naviagte to `LongChauProject/frontend` directory :
```bash
    cd frontend
```

## 7. Start the Frontend Development:
```bash
    npm run dev
```

## 8. Open  Browser (Google Chrome recommended) and go to:
```bash
    http://localhost:5173
```