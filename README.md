# Instruction to Deploy and Run the Long Chau Pharmacy Project

1. Clone this project github's link : 
```bash
https://github.com/Nguyen-Duc-Chung/SWE30003-g10.git 
```

2. Create an **.env** file in `LongChauProject` root directory

3. Copy the text below into **.env** file:

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

4. Open Terminal , In **LongChauProject** directory ennter this command:
```bash
    npm install
```

6. Enter this command to start backend server:
```bash
    npm start
```

5. Open new Terminal , naviagte to **LongChauProject/frontend** directory :
```bash
    cd frontend
```

6. Start the frontend deveLOPMENT:
```bash
    npm run dev
```

7. Open  Browser (Google Chrome recommended) and go to:
```bash
    http://localhost:5173
```
