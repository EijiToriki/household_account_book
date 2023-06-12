import sqlite3

def connect_db():
  ## DB接続
  dbname = "./DB/house_account.db"
  conn = sqlite3.connect(dbname)

  return conn


# yearで与えた年の収入・支出額の合計値を出力する
## type : 'in' or 'out'
## bop = balance of payments = 収支
def select_year_bop(year, type):
  conn = connect_db()
  ## sqliteを操作するカーソルオブジェクトを作成
  cur = conn.cursor()

  ## データ抽出
  res = cur.execute(
      "select sum(money) from "+ type +"come where "+ type +"_date between '"+ year +"-01-01' and '"+ year +"-12-31'"
  ).fetchall()

  conn.commit()
  conn.close

  return res[0][0]


# monthで与えた月の収入・支出額の合計値を出力する（※ 6月の場合は '06' を渡す)
## type : 'in' or 'out'
def select_month_bop(month, type):
  conn = connect_db()
  ## sqliteを操作するカーソルオブジェクトを作成
  cur = conn.cursor()

  ## データ抽出
  res = cur.execute(
    "select sum(money) from "+ type +"come where strftime('%m', "+ type +"_date) = '"+ month + "'"
  ).fetchall()

  conn.commit()
  conn.close

  return res[0][0]


# monthで与えた月におけるカテゴリごとの支出額の合計値を出力する
# （※ 6月の場合は '06' を渡す)
def select_month_outcome(month):
  conn = connect_db()
  ## sqliteを操作するカーソルオブジェクトを作成
  cur = conn.cursor()

  ## データ抽出
  res = cur.execute(
    "select category_id, sum(money) from outcome where strftime('%m', out_date) = '"+ month + "' group by category_id order by category_id"
  ).fetchall()

  conn.commit()
  conn.close

  return res


if __name__ == '__main__':
  # print(select_year_bop('2023', 'in'))
  # print(select_month_bop('06', 'in'))
  print(select_month_outcome('06'))
