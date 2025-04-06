# 📈 Stock Advisor – AI-Powered Stock Recommendation System

## 💡 Overview
**Stock Advisor** is a user-friendly web application that helps investors make informed decisions about Indian stocks. By combining historical data, AI-based prediction models, and real-time stock prices from the Alpha Vantage API, the system recommends whether to **Invest** or **Trash** a selected stock.

---

## 🧠 Features

- ✅ **User Input**: Enter a user ID and investment amount.
- 📊 **Stock Selection**: Choose from a list of major Indian stocks.
- 🤖 **AI-Based Decision**: Uses a trained Random Forest model to suggest *Invest* or *Trash*.
- 📉 **Graph Visualization**: Displays a 30-day price trend chart for the selected stock.
- 🧾 **Search History**: Track past stock searches and recommendations using your user ID.
- 🔐 **Local Database**: SQLite used to store user activity securely.

---

## 🔧 Tech Stack

| Layer       | Technology Used         |
|-------------|--------------------------|
| Backend     | Python, Streamlit        |
| Database    | SQLite                   |
| API         | Alpha Vantage API        |
| AI Model    | Scikit-learn (Random Forest) |
| Visualization | Matplotlib              |

---

## 🚀 How It Works

1. **User Input**:
   - The user enters a user ID, selects a stock, and enters their investment amount.

2. **Stock Analysis**:
   - The backend fetches stock data using the **Alpha Vantage API**.
   - The latest price is passed into an **AI model** trained on historical user data.

3. **Recommendation**:
   - Based on the AI output or fallback logic, a suggestion is made: **Invest** or **Trash**.
   - The system displays this recommendation, along with a graph of price trends.

4. **Data Storage**:
   - The result is saved into the **SQLite** database under that user’s ID.

5. **History Viewing**:
   - Users can later view all their past stock analysis by entering their user ID.

---

