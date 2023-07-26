import os
import random
from flask import Flask, render_template
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret_key'

# SQLite 데이터베이스 설정
db_path = os.path.join(os.getcwd(), 'Database', 'count.db')
app.config['SQLALCHEMY_DATABASE_URI'] = f"sqlite:///{db_path}"

db = SQLAlchemy(app)

class Count(db.Model):
    address = db.Column(db.String, primary_key=True)
    lat = db.Column(db.Float)
    lng = db.Column(db.Float)
    can_count = db.Column(db.Integer)
    pet_count = db.Column(db.Integer)

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/map_bin')
def map_bin():
    return render_template('map_bin.html')

@app.route('/map_trash')
def map_trash():
    count = Count.query.first()
    
    if count:
        address = count.address
        lat = count.lat
        lng = count.lng
        can = count.can_count
        pet = count.pet_count
    else:
        address = ""
        lat = 0.0
        lng = 0.0
        can = 0
        pet = 0

    return render_template('map_trash.html', address=address, lat=lat, lng=lng, can=can, pet=pet)




if __name__ == '__main__':
    app.run(port=8080)

