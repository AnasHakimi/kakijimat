import sys
import os
from sqlalchemy import text
from sqlalchemy.orm import Session

# Add parent directory and backend directory to path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../backend')))

from backend.database import SessionLocal

def check_users():
    db = SessionLocal()
    try:
        print("🔍 Inspecting 'reported_by' in price_reports...")
        result = db.execute(text("SELECT reported_by, COUNT(*) as count FROM price_reports GROUP BY reported_by"))
        rows = result.fetchall()
        
        if not rows:
            print("❌ No data found in price_reports!")
        else:
            print(f"✅ Found {len(rows)} distinct users:")
            for row in rows:
                print(f"   - User {row[0][:8]}... : {row[1]} reports")
                
    except Exception as e:
        print(f"❌ Error: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    check_users()
