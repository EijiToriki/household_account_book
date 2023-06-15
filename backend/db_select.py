import sqlite3

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


if __name__ == '__main__':
  # print(select_year_bop('2023', 'in'))
  # print(select_month_bop('06', 'in'))
  out = select_month_outcome('06', 1)
  bud = select_budget_by_user(1)
  category = select_category_all()

  blank_category = []
  out_category = set([o[0] for o in out])

  for i in range(len(bud)):
    if i+1 not in out_category:
      blank_category.append(i+1)

  for bc in blank_category:
    out.insert(bc-1, (bc, 0))

  budget_summary = []
  for i in range(len(bud)):
    budget_summary.append([category[i][0], out[i][1], bud[i][1]])
  
  print(budget_summary)