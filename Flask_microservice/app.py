from flask import Flask, request, jsonify
from sklearn import linear_model
import numpy as np
import pandas as pd

#Agg deactivates instantiation of pyplot window 
import matplotlib
matplotlib.use('Agg')
from matplotlib import pyplot as plt

import base64
import io 
import os

app = Flask(__name__)

@app.route('/', methods=['GET'])
def getWelcome():
    return jsonify({ 'msg': 'Hello world' })

@app.route('/linear-regression', methods=['POST'])
def linearRegression():
    data = request.json['weightData']
    df = pd.DataFrame(data)
    daysIn = []
    i=0
    for index, row in df.iterrows():
        i=i+1
        daysIn.append(i)

    df['days'] = daysIn
    df.columns = ['Weight', "Days"]

    X = df.iloc[:, 1].values
    y = df.iloc[:, 0].values
    X = X.reshape(-1, 1)
    X = X.reshape(-1, 1)
    from sklearn.linear_model import LinearRegression
    regressor = LinearRegression()
    regressor.fit(X, y)
    coef = regressor.coef_.tolist()

    plt.scatter(X, y, color = 'red')
    plt.plot(X, regressor.predict(X), color = 'blue')
    plt.title('Days vs weight')
    plt.xlabel('Days')
    plt.ylabel('Weight')

    #Creates base64 encoded utf-8 string of pyplot to add to the req.body
    pic_IObytes = io.BytesIO()
    plt.savefig(pic_IObytes,  format='png')
    pic_IObytes.seek(0)
    pic_hash = base64.b64encode(pic_IObytes.read()).decode('utf-8')
    #Switch default backend to new to prevent crashes for subsequent requests.
    plt.clf
    plt.switch_backend('agg')
    return jsonify({ 'coef': coef, "plt": pic_hash})

    

if __name__ == '__main__':
    app.run(debug=True)