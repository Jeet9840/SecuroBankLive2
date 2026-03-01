🏦 Securo Bank

A college banking system project designed as a frontend foundation and a backend-ready architecture for future development using Java Servlets.

Securo Bank is a structured banking simulation platform built to serve as a base system for backend integration.
The frontend already implements complete banking flows, making it ready for backend logic to be plugged in without restructuring the UI.

This project is intentionally designed so backend developers can connect real APIs, real databases, and real server logic later.

🎯 Project Purpose

This is a college project created to:

Learn system design

Practice frontend → backend architecture

Build real application flow

Prepare structure for Java Servlet backend development

Create a scalable foundation for full-stack banking systems

Frontend = working simulation
Backend = future real system

🧱 Current System (Frontend)
✅ Implemented Features

Account balance system

Deposit funds

Withdraw funds

Fund transfer

Transaction history

Multi-page banking UI

Dynamic dashboard

IPO module

Profile system

LocalStorage-based state management

🧠 Current Storage System
Browser localStorage

This is a temporary data layer
→ will be replaced by database + backend APIs.

🧭 System Flow (Step-by-Step)
Deposit → Balance Update → Transaction Log → UI Refresh
Withdraw → Balance Update → Transaction Log → UI Refresh
Transfer → Balance Update → Transaction Log → UI Refresh
Dashboard → Reads Balance + Stats
Transactions → Reads Transaction History

Flow logic:
Action → Logic → Data Update → Transaction Record → UI Render

🗂️ Project Structure
SecuroBankLive2/
│
├── css/
│   └── style.css
│
├── js/
│   ├── auth.js
│   ├── bank.js
│   ├── dashboard.js
│   ├── ipo.js
│   └── profile.js
│
├── README.md
│
├── index.html
├── register.html
├── dashboard.html
├── transfer.html
├── transactions.html
├── loans.html
├── ipo.html
├── profile.html
🧩 Frontend Logic Mapping
File	Purpose
auth.js	Login / auth logic
bank.js	Balance, deposit, withdraw, transactions
dashboard.js	Dashboard rendering & stats
ipo.js	IPO system logic
profile.js	Profile management
style.css	Full UI design system

This structure makes backend replacement easy:

Frontend logic → API calls → Servlet endpoints → Database

🔁 Backend Integration Plan

Future backend will use:

Java Servlets

JDBC

REST APIs

MySQL (or any relational DB if changed)

JSON-based communication

HTTP request/response flow

🧬 Future Database Design (Concept)
USERS
- id
- name
- email
- password

ACCOUNTS
- id
- user_id
- balance
- currency

TRANSACTIONS
- id
- account_id
- type (deposit/withdraw/transfer)
- amount
- timestamp
- description
☕ Java Servlet Backend Skeleton
Database Connection
public class DBConnection {
    private static final String URL = "jdbc:mysql://localhost:3306/securobank";
    private static final String USER = "root";
    private static final String PASSWORD = "password";

    public static Connection getConnection() throws Exception {
        Class.forName("com.mysql.cj.jdbc.Driver");
        return DriverManager.getConnection(URL, USER, PASSWORD);
    }
}
Deposit Servlet
@WebServlet("/deposit")
public class DepositServlet extends HttpServlet {

    protected void doPost(HttpServletRequest req, HttpServletResponse resp) {
        try {
            int userId = Integer.parseInt(req.getParameter("userId"));
            double amount = Double.parseDouble(req.getParameter("amount"));

            Connection con = DBConnection.getConnection();

            PreparedStatement ps = con.prepareStatement(
                "UPDATE accounts SET balance = balance + ? WHERE user_id = ?"
            );
            ps.setDouble(1, amount);
            ps.setInt(2, userId);
            ps.executeUpdate();

            PreparedStatement tx = con.prepareStatement(
                "INSERT INTO transactions(account_id, type, amount, timestamp) VALUES(?,?,?,NOW())"
            );
            tx.setInt(1, userId);
            tx.setString(2, "DEPOSIT");
            tx.setDouble(3, amount);
            tx.executeUpdate();

        } catch(Exception e){
            e.printStackTrace();
        }
    }
}
Withdraw Servlet
@WebServlet("/withdraw")
public class WithdrawServlet extends HttpServlet {

    protected void doPost(HttpServletRequest req, HttpServletResponse resp) {
        try {
            int userId = Integer.parseInt(req.getParameter("userId"));
            double amount = Double.parseDouble(req.getParameter("amount"));

            Connection con = DBConnection.getConnection();

            PreparedStatement ps = con.prepareStatement(
                "UPDATE accounts SET balance = balance - ? WHERE user_id = ?"
            );
            ps.setDouble(1, amount);
            ps.setInt(2, userId);
            ps.executeUpdate();

            PreparedStatement tx = con.prepareStatement(
                "INSERT INTO transactions(account_id, type, amount, timestamp) VALUES(?,?,?,NOW())"
            );
            tx.setInt(1, userId);
            tx.setString(2, "WITHDRAW");
            tx.setDouble(3, amount);
            tx.executeUpdate();

        } catch(Exception e){
            e.printStackTrace();
        }
    }
}
Transaction History Servlet
@WebServlet("/transactions")
public class TransactionServlet extends HttpServlet {

    protected void doGet(HttpServletRequest req, HttpServletResponse resp) {
        try {
            int userId = Integer.parseInt(req.getParameter("userId"));

            Connection con = DBConnection.getConnection();
            PreparedStatement ps = con.prepareStatement(
                "SELECT * FROM transactions WHERE account_id=? ORDER BY timestamp DESC"
            );
            ps.setInt(1, userId);

            ResultSet rs = ps.executeQuery();

            // Convert to JSON and send to frontend

        } catch(Exception e){
            e.printStackTrace();
        }
    }
}
🔗 Frontend → Backend Example Connection
fetch("http://localhost:8080/deposit", {
  method: "POST",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded"
  },
  body: `userId=1&amount=500`
});
🧠 Notes for Backend Developers

Frontend currently uses localStorage

Replace localStorage with:

API calls

Servlet endpoints

Database logic

Keep same logic flow:

UI → API → Servlet → DB → Response → UI
🌱 Future Expansion

Multi-currency support

Admin dashboard

User roles

API authentication

REST architecture

Mobile integration

Microservices

🧑‍💻 Project Owner

Jeet
GitHub: https://github.com/Jeet9840

📜 License

Educational / College Project
Not for commercial use
