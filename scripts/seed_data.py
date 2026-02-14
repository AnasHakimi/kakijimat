from faker import Faker
import random
import requests
import uuid
from datetime import datetime

fake = Faker()
API_URL = "http://127.0.0.1:8000/api/report"

ITEMS = [
    {"name": "Milo 1KG", "category": "Groceries", "base_price": 32.00},
    {"name": "Beras Jati 5KG", "category": "Groceries", "base_price": 26.00},
    {"name": "Ayam Goreng", "category": "Food", "base_price": 15.00},
    {"name": "Teh Tarik", "category": "Food", "base_price": 2.50},
    {"name": "Roti Canai", "category": "Food", "base_price": 1.50},
    {"name": "Minyak Masak 5KG", "category": "Groceries", "base_price": 30.00},
    {"name": "Gunting Rambut", "category": "Services", "base_price": 12.00},
]

STORES = [
    "99 Speedmart", "KK Mart", "Village Grocer", "Jaya Grocer", "Mamak ABC", "Restoran Ali", "Warung Pak Mat"
]


# 5 main competitors with consistent IDs
GUEST_POOL = [str(uuid.uuid4()) for _ in range(5)] 

def seed_data(entries=50):
    print(f"Seeding {entries} entries...")
    for _ in range(entries):
        item = random.choice(ITEMS)
        price_variation = random.uniform(-0.15, 0.15)
        final_price = round(item["base_price"] * (1 + price_variation), 2)
        
        reported_by = random.choice(GUEST_POOL)

        payload = {
            "item_name": item["name"],
            "price": final_price,
            "store_name": random.choice(STORES),
            "category": item["category"],
            "reported_by": reported_by
        }

        try:
            res = requests.post(API_URL, json=payload)
            if res.status_code == 200:
                print(f"✅ Added {item['name']} at RM{final_price}")
            else:
                print(f"❌ Failed: {res.text}")
        except Exception as e:
            print(f"Error: {e}")

if __name__ == "__main__":
    seed_data()
