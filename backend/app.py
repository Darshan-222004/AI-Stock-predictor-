import streamlit as st
import sqlite3
import pandas as pd
import requests
from datetime import datetime
import matplotlib.pyplot as plt
import random
import locale
from sklearn.ensemble import RandomForestClassifier
import numpy as np
import json

# Set locale to Indian number format
locale.setlocale(locale.LC_ALL, 'en_IN.UTF-8')

# Database setup
conn = sqlite3.connect('user_data.db')
cursor = conn.cursor()

# Ensure the history table has the correct structure
cursor.execute("""
    CREATE TABLE IF NOT EXISTS history (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        stock_symbol TEXT,
        search_date TEXT,
        price REAL,
        investment REAL,
        decision TEXT,
        FOREIGN KEY(user_id) REFERENCES users(id)
    )
""")
conn.commit()

# Function to fetch stock data
def fetch_stock_data(symbol):
    try:
        api_key = "FW7628YDVAQ2FGVD"  # Replace with your Alpha Vantage API key
        url = f"https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol={symbol}&apikey={api_key}"
        response = requests.get(url)
        data = response.json()
        if "Time Series (Daily)" in data:
            time_series = data["Time Series (Daily)"]
            dates = []
            prices = []
            for date in sorted(time_series.keys(), reverse=True)[:30]:  # Get last 30 days
                dates.append(datetime.strptime(date, '%Y-%m-%d'))
                prices.append(float(time_series[date]["4. close"]))
            return dates, prices
        else:
            return None, None
    except Exception as e:
        return None, None

# Train a simple AI model using historical data
def train_ai_model():
    cursor.execute("SELECT price, decision FROM history")
    rows = cursor.fetchall()

    if len(rows) < 10:  # Ensure enough data for training
        return None

    data = pd.DataFrame(rows, columns=["price", "decision"])
    data["decision"] = data["decision"].map({"Invest": 1, "Trash": 0})

    X = data[["price"]].values
    y = data["decision"].values

    model = RandomForestClassifier(n_estimators=100, random_state=42)
    model.fit(X, y)
    return model

# Streamlit app setup
st.set_page_config(page_title="Stock Advisor", page_icon="📈", layout="wide")

# Sidebar Navigation
from streamlit_option_menu import option_menu

with st.sidebar:
    selected = option_menu(
        menu_title="Main Menu",
        options=["Home", "Stock Analysis",  "History"],
        icons=["house", "graph-up", "history"],
        menu_icon="menu-app",
        default_index=0,
    )

# Predefined list of Indian stocks
indian_stocks = [
    "RELIANCE.BSE",
    "TCS.BSE",
    "INFY.BSE",
    "HDFCBANK.BSE",
    "ICICIBANK.BSE",
    "BHARTIARTL.BSE",
    "HINDUNILVR.BSE",
    "ITC.BSE",
    "KOTAKBANK.BSE",
    "LT.BSE"
]

# Train the AI model
ai_model = train_ai_model()

# Home Page
if selected == "Home":
    st.title("Welcome to Stock Advisor")
    st.markdown("### Your trusted platform for stock insights")

    # Add a "Go Back to Home" button
    if st.button("Go Back to Home  "):
        st.markdown('<a href="http://localhost:3000" target="_blank">Go Back to Home</a>', unsafe_allow_html=True)

# Stock Analysis Page
elif selected == "Stock Analysis":
    st.title("Stock Analysis")
    user_id = st.number_input("Enter your User ID (for tracking search history)", min_value=1, step=1)
    stock_symbol = st.selectbox("Select a Stock Symbol", indian_stocks)
    investment = st.number_input("Enter Investment Amount (₹):", min_value=0.0, step=100.0)

    if st.button("Analyze"):
        if stock_symbol:
            dates, prices = fetch_stock_data(stock_symbol.upper())
            if dates and prices:
                latest_price = prices[0]

                # AI prediction logic
                decision = ""
                if ai_model:
                    prediction = ai_model.predict(np.array([[latest_price]]))
                    decision = "Invest" if prediction[0] == 1 else "Trash"
                else:
                    avg_price = sum(prices[-5:]) / 5
                    decision = "Invest" if latest_price > avg_price else "Trash"

                # Save the search history
                cursor.execute("""
                    INSERT INTO history (user_id, stock_symbol, search_date, price, investment, decision) 
                    VALUES (?, ?, ?, ?, ?, ?)
                """, (user_id, stock_symbol.upper(), str(datetime.now().date()), latest_price, investment, decision))
                conn.commit()

                # Display analysis
                st.write(f"*Stock Symbol:* {stock_symbol.upper()}")
                st.write(f"*Latest Price:* ₹{locale.format_string('%.2f', latest_price, grouping=True)}")
                st.write(f"*Recommendation:* {decision}")

                # Decision: Display stylized text for 'Invest' or 'Trash'
                if decision == "Invest":
                    st.markdown("<h3 style='color: green; text-align: center; font-weight: bold;'>Invest</h3>", unsafe_allow_html=True)
                else:
                    st.markdown("<h3 style='color: red; text-align: center; font-weight: bold;'>Trash</h3>", unsafe_allow_html=True)

                # Plot stock graph
                fig, ax = plt.subplots()
                ax.plot(dates, prices, label=stock_symbol.upper(), color="blue", linewidth=2)
                ax.set_title(f"{stock_symbol.upper()} Price Trends")
                ax.set_xlabel("Date")
                ax.set_ylabel("Price (₹)")
                plt.xticks(rotation=45)
                st.pyplot(fig)
            else:
                st.error("Invalid stock symbol or API issue.")
        else:
            st.error("Please select a valid stock symbol.")

# Database Page (If you want to show data)
elif selected == "Database":
    st.title("Database")
    # Add logic here to show and interact with your database if required

# History Page
elif selected == "History":
    st.title("History")
    user_id = st.number_input("Enter your User ID to view search history:", min_value=1, step=1)
    if user_id:
        cursor.execute("""
            SELECT * FROM history WHERE user_id = ?
        """, (user_id,))
        rows = cursor.fetchall()
        if rows:
            for row in rows:
                st.write(f"Stock: {row[2]} | Date: {row[3]} | Price: ₹{locale.format_string('%.2f', row[4], grouping=True)} | Investment: ₹{locale.format_string('%.2f', row[5], grouping=True)} | Decision: {row[6]}")
        else:
            st.write("No history found for this user ID.")
    else:
        st.write("Please enter a valid user ID.")

# Close the database connection 
conn.close()
