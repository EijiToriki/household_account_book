import sqlite3
import datetime
import calendar

def connect_db():
  ## DB接続
  dbname = "./DB/house_account.db"
  conn = sqlite3.connect(dbname)

  return conn


# yearで与えた年の収入・支出額の合計値を出力する
## type : 'in' or 'out'
## bop = balance of payments = 収支
def select_year_bop(year, type, id):
  conn = connect_db()
  ## sqliteを操作するカーソルオブジェクトを作成
  cur = conn.cursor()

  ## データ抽出
  res = cur.execute(
      "select sum(money) from "+ type +"come where user_id =  " + str(id) + " and " + type +"_date between '"+ year +"-01-01' and '"+ year +"-12-31'"
  ).fetchall()

  conn.commit()
  conn.close

  return res[0][0]


# monthで与えた月の収入・支出額の合計値を出力する（※ 6月の場合は '06' を渡す)
## type : 'in' or 'out'
def select_month_bop(month, type, id):
  conn = connect_db()
  ## sqliteを操作するカーソルオブジェクトを作成
  cur = conn.cursor()

  ## データ抽出
  res = cur.execute(
    "select sum(money) from "+ type +"come where user_id =  " + str(id) + " and strftime('%m', "+ type +"_date) = '"+ month + "'"
  ).fetchall()

  conn.commit()
  conn.close

  return res[0][0]


# monthで与えた月におけるカテゴリごとの支出額の合計値を出力する
# （※ 6月の場合は '06' を渡す)
def select_month_outcome(month, id):
  conn = connect_db()
  ## sqliteを操作するカーソルオブジェクトを作成
  cur = conn.cursor()

  ## データ抽出
  res = cur.execute(
    "select category_id, sum(money) from outcome where user_id =  " + str(id) + " and strftime('%m', out_date) = '"+ month + "' group by category_id order by category_id"
  ).fetchall()

  conn.commit()
  conn.close

  return res


# あるユーザの予算を取得する
def select_budget_by_user(id):
  conn = connect_db()
  ## sqliteを操作するカーソルオブジェクトを作成
  cur = conn.cursor()

  ## データ抽出
  res = cur.execute(
    "select category_id, money from budget where user_id = " + str(id)
  ).fetchall()

  conn.commit()
  conn.close

  return res


# 支出カテゴリの取得
def select_category_all():
  conn = connect_db()
  ## sqliteを操作するカーソルオブジェクトを作成
  cur = conn.cursor()

  ## データ抽出
  res = cur.execute(
    "select name from category where flag = 1 order by id"
  ).fetchall()

  conn.commit()
  conn.close

  return res


# あるカテゴリの合計支出（月別）
## 変動費、固定費共に使う
def select_out_sum_category(year, month, category, id):
  year = str(year)
  
  conn = connect_db()
  ## sqliteを操作するカーソルオブジェクトを作成
  cur = conn.cursor()

  ## データ抽出
  res = cur.execute(
    "select sum(money) from outcome where user_id = " + str(id) + " and strftime('%Y', out_date) = '" + year + "' and strftime('%m', out_date) = '" + month + "' and category_id = " + str(category)
  ).fetchall()

  conn.commit()
  conn.close

  return res


# ある月における日ごとの合計支出
def select_out_day_category(year, month, category, id):
  last_day = calendar.monthrange(year, month)[1]

  conn = connect_db()
  ## sqliteを操作するカーソルオブジェクトを作成
  cur = conn.cursor()

  res_list = []
  for day in range(1, last_day+1):
    date = "{0}-{1}-{2}".format(year, str(month).zfill(2), str(day).zfill(2))
    ## データ抽出
    res = cur.execute(
      "select sum(money) from outcome where user_id = " + str(id) + " and out_date = '" + date + "' and category_id = " + str(category)
    ).fetchall()

    if res[0][0]:
      res_list.append((date, res[0][0]))
    else:
      res_list.append((date, 0))

  conn.commit()
  conn.close

  return res_list



if __name__ == '__main__':
  # print(select_year_bop('2023', 'in'))
  # print(select_month_bop('06', 'in'))
  out = select_month_outcome('06', 1)
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
    res = select_out_sum_category('06', cid+1, 1)
    if res[0][0] != 'null':
      fixed_response.append((category[cid][0], res[0][0]))
    else:
      fixed_response.append((category[cid][0], 0))

  print(fixed_response)
  ## 変動費
  variable_response = []
  variable_ids = [1, 2, 3, 4, 5, 6, 12]
  for cid in variable_ids:
    res = select_out_sum_category('06', cid+1, 1)
    day_res = select_out_day_category(6, cid+1, 1)
    if res[0][0]:
      variable_response.append((category[cid][0], res[0][0], day_res))
    else:
      variable_response.append((category[cid][0], 0, day_res))

  print(variable_response)
