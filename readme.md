1.  npx knex migrate:make create_hr_users
2.  npx knex migrate:latest   যখন আপনি npx knex migrate:latest কমান্ডটি দেন, তখন এই up ফাংশনটি কাজ করে।

3. npx knex migrate:rollback  down ফাংশন.. যদি কোনো কারণে আপনি আগের অবস্থায় ফিরে যেতে চান (Rollback), তখন এই ফাংশনটি কাজ করে।


"migrate:make": "knex migrate:make",
    "migrate:latest": "knex migrate:latest",
    "migrate:rollback": "knex migrate:rollback"


আপনি যা লিখবেন,আসলে যা রান হবে (Background),কাজ
npm run migrate:make hr_table,knex migrate:make hr_table,নতুন মাইগ্রেশন ফাইল তৈরি করবে।
npm run migrate:latest,knex migrate:latest,ডাটাবেসে টেবিল তৈরি করবে।
npm run migrate:rollback,knex migrate:rollback,সবশেষ পরিবর্তন মুছে দেবে।