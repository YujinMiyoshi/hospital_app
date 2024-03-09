from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from dotenv import load_dotenv
import sqlite3
from apscheduler.schedulers.background import BackgroundScheduler

load_dotenv()

app = Flask(__name__)
CORS(app, origins=[os.getenv('SITE_DOMAIN')])

DATABASE = 'numbers.db'

def get_db_connection():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    with app.app_context():
        db = get_db_connection()
        db.execute('CREATE TABLE IF NOT EXISTS numbers (id INTEGER PRIMARY KEY AUTOINCREMENT, number INTEGER)')
        db.commit()

def trim_numbers():
    with app.app_context():
        db = get_db_connection()
        # 最新の20件のidを取得
        ids = db.execute('SELECT id FROM numbers ORDER BY id DESC LIMIT 20').fetchall()
        if ids:
            # 最も古い保持するidを特定
            min_id_to_keep = ids[-1]['id']
            # それより古いレコードを削除
            db.execute('DELETE FROM numbers WHERE id < ?', (min_id_to_keep,))
            db.commit()

@app.route('/api/numbers/', methods=['POST'])
def save_number():
    data = request.json
    number = data.get('number')
    
    db = get_db_connection()
    db.execute('INSERT INTO numbers (number) VALUES (?)', (number,))
    db.commit()
    
    return jsonify(success=True), 200

@app.route('/api/numbers/', methods=['GET'])
def get_numbers():
    db = get_db_connection()
    numbers = db.execute('SELECT number FROM numbers ORDER BY id DESC LIMIT 10').fetchall()
    
    return jsonify([number['number'] for number in numbers]), 200

if __name__ == '__main__':
    init_db()
    scheduler = BackgroundScheduler()
    scheduler.add_job(func=trim_numbers, trigger="interval", hours=12)
    scheduler.start()
    app.run(debug=False, use_reloader=False)
