import sys
import os

# Add parent directory and backend directory to path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../backend')))

from sqlalchemy.orm import Session
from backend.database import SessionLocal, engine
from backend import sql_models
from sqlalchemy import text

def clear_data():
    db = SessionLocal()
    try:
        print("🗑️ Clearing all price reports...")
        # Delete all rows from price_reports table
        db.query(sql_models.PriceReport).delete()
        db.commit()
        print("✅ Database cleared!")
    except Exception as e:
        print(f"❌ Error clearing data: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    # Ensure tables exist (just in case)
    sql_models.Base.metadata.create_all(bind=engine)
    clear_data()
