# Expense Tracker

## Introduction

"Welcome to my expense tracker! Register or log in, including via Facebook, to record personalized expense lists. Manage your data by adding, updating, or deleting information. Utilize search and dropdown filters for easy navigation, and enjoy seamless browsing with pagination."

## Features

- After registering or logging in, users can also sign in through third-party authentication via Facebook to create their own expense lists.
- Expense List: Browse through a comprehensive list of expenses.
- Add, Update, Delete: Users can add new expenses, update existing ones, and delete items.
- Dropdown Filters: Filter expenses by name, price, location, and category.
- Pagination: Navigate through the data more conveniently with the pagination feature.
- Status Notifications: Receive notifications for successful or failed data operations (add, update, delete).
- Prevent accidental data loss: Clicking the delete button will prompt an alert to confirm deletion.

## Environment Setup
This project requires the following software to be installed:
- Node.js v18
- MySQL v8

## How to Use

1. Open your terminal and clone the repository:
   ```shell
    git clone https://github.com/MrMasterOfc/EXPENSE-TRACKER.git
   
2. Navigate to the project directory:
   ```shell
   cd EXPENSE-TRACKER
   
3. Install the necessary dependencies:
   ```shell
   npm install
   
4. Set up the MySQL database to match the configuration in config/config.json.
   
5. Create database:
   ```shell
   Create database expenseTracker;
   
6. Create a table:
   ```shell
   npx sequelize db:migrate
   
7. Set seed data:
   ```shell
   npx sequelize-cli db:seed:all
   
8. Setting Environment Variables ( If using MAC / Linux, kindly ignore this step. )
- Set up Development Environment
  ```shell
  export NODE_ENV=development
   
9. Once the installation is complete, start the application:
   ```shell
   npm run dev
   
10. If you see the following message, the server is running successfully:

- express server is running on http://localhost:3000

- Open your web browser and navigate to http://localhost:3000 to view the application.

11. To stop the server, you can exit the terminal by typing:
    ```shell
    ctrl + c

- If you'd like to use Facebook to log in, please configure FACEBOOK_CLIENT_ID, and FACEBOOK_CLIENT_SECRET.

  If you don't have a Facebook Client Id / Secret, please obtain one as Facebook login won't work without it.

- Here are two sets of username and password for use:

1. Account (user1)
   ```shell
     
   Username: user1@example.com

   Password: 12345678

2. Account (user2)
   ```shell
     
   Username: user2@example.com

   Password: 12345678

## Development Tools
- bcryptjs 2.4.3
- bootstrap 5.1.3
- connect-flash 0.1.1
- dayjs 1.11.11
- dotenv 16.4.5
- express 4.19.2
- express-handlebars 7.1.2
- express-session 1.18.0
- handlebars-helpers 0.10.0
- method-override 3.0.0
- mysql2 3.9.7
- nodemon 3.1.0
- npm 9.5.0
- passport 0.7.0
- passport-facebook 3.0.0 
- passport-local 1.0.0
- sequelize 6.37.3
- sequelize-cli 6.6.2

## Screenshot
![screencapture-localhost-3000 ( Login Page )](https://github.com/maomao0007/Expense-Tracker/assets/164178703/7ea507ea-2310-4efc-8b0d-8ddc0119c4c4)
![screencapture-localhost-3000 ( Home Page )](https://github.com/maomao0007/Expense-Tracker/assets/164178703/bfa73a4e-e0ba-4cd4-9e1e-a42d2cf4184b)
![screencapture-localhost-3000 ( Create Page)](https://github.com/maomao0007/Expense-Tracker/assets/164178703/3f31d796-a378-4ec9-996e-a7116b454d34)





