
# 🏠 Apartment Listing Backend  

## 📥 Installation & Deployment Guide  

### 🚀 Getting Started  

#### 1️⃣ Clone the Repository  

To set up the backend separately, clone this repository:  

```sh
# Clone the backend repository
git clone https://github.com/MazenOth/apartment-listing-backend.git

# Navigate into the backend directory
cd apartment-listing-backend
```

Alternatively, if you want to use **Docker Compose for full deployment**, clone the deployment repository instead:  

```sh
git clone https://github.com/MazenOth/apartment-listing-deployment.git
cd apartment-listing-deployment
```

📌 _For Docker deployment, follow the instructions in the **apartment-listing-deployment** README._

---

### 🛠 Local Development Setup  

#### 2️⃣ Install Dependencies  

```sh
# Install all required dependencies
npm install
```

#### 3️⃣ Setup Environment Variables  

Create a `.env` file in the root of the backend project and add the following:  

```sh
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=rootpassword
DB_NAME=apartment_db
DB_PORT=3306

```

---

#### 4️⃣ Start the Backend Locally  

Ensure you have **MySQL** running locally, then start the backend:  

```sh
npm run start
```

By default, the backend will be available at:  

🟢 **API Base URL:** [http://localhost:3333](http://localhost:3333)

---

### 🏗 Database Seeders  

Run the following command to apply migrations and seed data:  

```sh
npm run seed
```

---

### 🔗 Full Deployment with Docker  

To deploy both frontend and backend using **Docker Compose**, follow the instructions in the [`apartment-listing-deployment`](https://github.com/MazenOth/apartment-listing-deployment) repository.

---

💡 _You're now ready to run the backend locally or via Docker! 🚀_

