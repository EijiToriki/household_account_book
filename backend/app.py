import datetime
from collections import defaultdict

from flask import Flask, request, jsonify
from flask_cors import CORS
from db_insert import insert_XXcome, insert_user
from db_select import select_year_bop, select_month_bop, select_month_outcome, select_budget_by_user, select_category_all, select_out_day_category, select_out_sum_category, select_year_groupby_month, select_user, select_user_auth
from db_update import update_daily_table

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


@app.route("/monthlyGetter", methods=['GET', 'POST'])
def get_monthly():
   year = request.get_json()
   year = year['y']

   ## その年における各月の収支
   monthly_data = defaultdict(dict)
   
   in_res = select_year_groupby_month(year, 'in', 1)
   month_sum_in = defaultdict(int)
   for el in in_res:
      month_sum_in[el[0].split('-')[1]] += el[1]
   for i in range(1, 13):
      if str(i).zfill(2) not in month_sum_in.keys():
         month_sum_in[str(i).zfill(2)] = 0
   month_sum_in = sorted(month_sum_in.items())

   out_res = select_year_groupby_month(year, 'out', 1)
   month_sum_out = defaultdict(int)
   for el in out_res:
      month_sum_out[el[0].split('-')[1]] += el[1]
   for i in range(1, 13):
      if str(i).zfill(2) not in month_sum_out.keys():
         month_sum_out[str(i).zfill(2)] = 0
   month_sum_out = sorted(month_sum_out.items())

   monthly_data['in'] = month_sum_in
   monthly_data['out'] = month_sum_out

   return jsonify(monthly_data)


@app.route("/dailyGetter", methods=['GET', 'POST'])
def get_daily():
   month_year_data = request.get_json()
   daily_data = defaultdict(list)
   month = str(month_year_data['m']).zfill(2)
   year = int(month_year_data['y'])
   
   out = select_month_outcome(month, 1)
   category = select_category_all()

   blank_category = []
   out_category = set([o[0] for o in out])

   for i in range(len(category)):
      if i+1 not in out_category:
         blank_category.append(i+1)

   for bc in blank_category:
      out.insert(bc-1, (bc, 0))

   budget_summary = []
   for i in range(len(category)):
      budget_summary.append([category[i][0], out[i][1]])

   ## 固定費
   fixed_response = []
   fixed_ids = [0, 7, 8, 9, 10, 11]
   for cid in fixed_ids:
      res = select_out_sum_category(year, month, cid+1, 1)
      if res[0][0]:
         fixed_response.append((category[cid][0], res[0][0]))
      else:
         fixed_response.append((category[cid][0], 0))

   daily_data['fixed'] = fixed_response

   ## 変動費
   variable_response = []
   variable_ids = [1, 2, 3, 4, 5, 6, 12]
   for cid in variable_ids:
      res = select_out_sum_category(year, month, cid+1, 1)
      day_res = select_out_day_category(year, month_year_data['m'], cid+1, 1)
      if res[0][0]:
         variable_response.append((category[cid][0], res[0][0], day_res))
      else:
         variable_response.append((category[cid][0], 0, day_res))

   daily_data['variable'] = variable_response

   return jsonify(daily_data)


@app.route("/variableUpdator", methods=['GET', 'POST'])
def variable_updator():
   data = request.get_json()
   update_daily_table(id=1, money=data['money'], category=data['category'], date=data['date'])

   return data

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


@app.route("/userSignUp", methods=['GET', 'POST'])
def userSignUp():
   data = request.get_json()
   name, password = data['name'], data['password']

   result = {}
   if select_user(name) == 0:
      insert_user(name, password)
      result['result'] = select_user_auth(name, password)
   else:
      result['result'] = -1

   return jsonify(result)


@app.route("/userLogin", methods=['GET', 'POST'])
def userLogin():
   data = request.get_json()
   name, password = data['name'], data['password']

   result = {}
   result['result'] = select_user_auth(name, password)

   return jsonify(result)


if __name__ == '__main__':
   app.run(debug=True, port=5000)