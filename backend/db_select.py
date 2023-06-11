import sqlite3

def connect_db():
  ## DB接続
  dbname = "./DB/house_account.db"
  conn = sqlite3.connect(dbname)

  return conn


# yearで与えた年の収入・支出額の合計値を出力する
## type : 'in' or 'out'
def select_year_income(year, type):
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


# yearで与えた年の収入・支出額の合計値を出力する（※ 6月の場合は '06' を渡す)
## type : 'in' or 'out'
def select_month_income(month, type):
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


if __name__ == '__main__':
  print(select_year_income('2023', 'in'))
  print(select_month_income('06', 'in'))
