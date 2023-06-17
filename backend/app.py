import datetime
from collections import defaultdict

from flask import Flask, request, jsonify
from flask_cors import CORS
from db_insert import insert_XXcome
from db_select import select_year_bop, select_month_bop, select_month_outcome, select_budget_by_user, select_category_all

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

   ## その年の収支
   year_data = []
   year_data.append(select_year_bop(year, 'in', 1))
   year_data.append(select_year_bop(year, 'out', 1))
   summary_data['year'] = year_data

   ## その月の収支
   month_data = []
   month_data.append(select_month_bop(month, 'in', 1))
   month_data.append(select_month_bop(month, 'out', 1))
   summary_data['month'] = month_data

   ## その月のカテゴリ別の収支
   out = select_month_outcome(month, 1)
   bud = select_budget_by_user(1)
   category = select_category_all()

   blank_category = []
   out_category = set([o[0] for o in out])

   for i in range(len(bud)):
      if i+1 not in out_category:
         blank_category.append(i+1)

   for bc in blank_category:
      out.insert(bc-1, (bc, 0))

   summary_budget = []
   for i in range(len(bud)):
      summary_budget.append([category[i][0], out[i][1], bud[i][1]])
   summary_data['budget'] = summary_budget
   
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