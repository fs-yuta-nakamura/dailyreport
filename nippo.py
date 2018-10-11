from flask import Flask, render_template, jsonify, request
import requests
app = Flask(__name__)

@app.route('/')
def hello_world():
    return render_template('index.html') 

@app.route('/ifttt', methods=['GET', 'POST'])
def ifttt():
    if request.method  == 'POST':
        data = request.json
        r = requests.post("https://maker.ifttt.com/trigger/" + "nippo_submit" + "/with/key/lip6cStAxjJdAr7J08bMGuWxpHQdPFyxyvxbD6_zbjn", data=data)
        return "", 201

