import sys
import os
import uuid
import random
from faker import Faker
from datetime import datetime

# Add parent directory and backend directory to path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../backend')))

from backend.database import SessionLocal
from backend import sql_models

fake = Faker()

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

# 5 main competitors
GUEST_POOL = [str(uuid.uuid4()) for _ in range(5)]

def seed_direct(entries=50):
    db = SessionLocal()
    try:
        print(f"🌱 Seeding {entries} entries directly to DB...")
        for _ in range(entries):
            item = random.choice(ITEMS)
            price_variation = random.uniform(-0.15, 0.15)
            final_price = round(item["base_price"] * (1 + price_variation), 2)
            
            report = sql_models.PriceReport(
                item_name=item["name"],
                price=final_price,
                store_name=random.choice(STORES),
                category=item["category"],
                reported_by=random.choice(GUEST_POOL)
            )
            db.add(report)
        
        db.commit()
        print(f"✅ Successfully added {entries} reports.")
    except Exception as e:
        print(f"❌ Error seeding: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    seed_direct()
