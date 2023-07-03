import sqlite3
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


# year で与えた年の月ごとの収支を返す
def select_year_groupby_month(year, type, id):
  conn = connect_db()
  ## sqliteを操作するカーソルオブジェクトを作成
  cur = conn.cursor()

  ## データ抽出
  res = cur.execute(
    "select "+ type + "_date, money from "+ type + "come where user_id = " + str(id) + " and strftime('%Y', "+ type + "_date) = '" + str(year) + "'" 
  ).fetchall()

  conn.commit()
  conn.close



  return res


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


# ユーザ名検索
def select_user(name):
  conn = connect_db()
  ## sqliteを操作するカーソルオブジェクトを作成
  cur = conn.cursor()

  res = cur.execute(
    "select count(*) from user where user_name = '" + name + "'"
  ).fetchall()

  conn.commit()
  conn.close

  return res[0][0]


if __name__ == '__main__':
  print(select_user('mizuki'))