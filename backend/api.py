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
        # Ensure the table exists but does not need to prepare for multiple records
        db.execute('CREATE TABLE IF NOT EXISTS numbers (id INTEGER PRIMARY KEY, number INTEGER)')
        db.commit()

@app.route('/api/numbers/', methods=['POST'])
def save_number():
    data = request.json
    number = data.get('number')
    
    db = get_db_connection()
    # Check if a record exists
    exists = db.execute('SELECT 1 FROM numbers WHERE id = 1').fetchone()
    if exists:
        # Update the existing record
        db.execute('UPDATE numbers SET number = ? WHERE id = 1', (number,))
    else:
        # Insert a new record if no record exists
        db.execute('INSERT INTO numbers (id, number) VALUES (1, ?)', (number,))
    db.commit()
    
    return jsonify(success=True), 200

@app.route('/api/numbers/', methods=['GET'])
def get_numbers():
    db = get_db_connection()
    number = db.execute('SELECT number FROM numbers WHERE id = 1').fetchone()
    return jsonify(number['number'] if number else None), 200

@app.route('/api/numbers/', methods=['DELETE'])
def delete_number():
    db = get_db_connection()
    db.execute('DELETE FROM numbers WHERE id = 1')
    db.commit()
    db.close()
    return jsonify(success=True), 200

if __name__ == '__main__':
    init_db()
    app.run(host='0.0.0.0', debug=False, use_reloader=False)
