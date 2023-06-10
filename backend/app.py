from flask import Flask, request
from flask_cors import CORS
from db_insert import insert_income

app = Flask(__name__)
CORS(app)

@app.after_request
def after_request(response):
  response.headers.add('Access-Control-Allow-Origin', '*')
  response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
  response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  return response


@app.route("/incomeRegister", methods=['GET', 'POST'])
def income_register():
   data = request.get_json()
   insert_income(data)

   return data



if __name__ == '__main__':
   app.run(debug=True, port=5000)