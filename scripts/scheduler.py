import time
import subprocess
import sys
import os
from datetime import datetime

# Configuration
INTERVAL_SECONDS = 60  # Run every 1 minute for demo purposes

def run_dbt():
    script_path = os.path.join(os.path.dirname(__file__), 'run_dbt.py')
    cmd = [sys.executable, script_path, 'run']
    
    print(f"⏰ [{datetime.now().strftime('%H:%M:%S')}] Triggering dbt pipeline...")
    try:
        result = subprocess.run(cmd, check=True, capture_output=True, text=True)
        print("✅ dbt run successful!")
        # Optional: Print last few lines of output
        print(result.stdout[-200:]) 
    except subprocess.CalledProcessError as e:
        print(f"❌ dbt run failed: {e}")
        print(e.stderr)

if __name__ == "__main__":
    print(f"🚀 Starting Scheduler. Running dbt every {INTERVAL_SECONDS} seconds.")
    print("Press Ctrl+C to stop.")
    
    try:
        while True:
            run_dbt()
            print(f"... Sleeping for {INTERVAL_SECONDS}s ...")
            time.sleep(INTERVAL_SECONDS)
    except KeyboardInterrupt:
        print("\n🛑 Scheduler stopped.")
