import datetime
from collections import defaultdict

from flask import Flask, request, jsonify
from flask_cors import CORS
from db_insert import insert_XXcome
from db_select import select_year_bop, select_month_bop, select_month_outcome

app = Flask(__name__)
CORS(app)

@app.after_request
def after_request(response):
  response.headers.add('Access-Control-Allow-Origin', '*')
  response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
  response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  return response

now = datetime.datetime.now()

@app.route("/summaryGetter")
def get_summary():
   summary_data = defaultdict(list)
   year = str(now.year)
   month = str(now.month).zfill(2)

   year_data = []
   year_data.append(select_year_bop(year, 'in'))
   year_data.append(select_year_bop(year, 'out'))
   summary_data['year'] = year_data

   month_data = []
   month_data.append(select_month_bop(month, 'in'))
   month_data.append(select_month_bop(month, 'out'))
   summary_data['month'] = month_data
   
   return jsonify(summary_data)



@app.route("/incomeRegister", methods=['GET', 'POST'])
def income_register():
   data = request.get_json()
   insert_XXcome(data, 'in')

   return data


@app.route("/outcomeRegister", methods=['GET', 'POST'])
def outcome_register():
   data = request.get_json()
   insert_XXcome(data, 'out')

   return data


if __name__ == '__main__':
   app.run(debug=True, port=5000)