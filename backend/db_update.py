import sqlite3

def connect_db():
  ## DB接続
  dbname = "./DB/house_account.db"
  conn = sqlite3.connect(dbname)

  return conn


def update_daily_table(id, money, category, date):
  conn = connect_db()
  ## sqliteを操作するカーソルオブジェクトを作成
  cur = conn.cursor()

  ## 問い合わせの存在確認
  res = cur.execute(
    "select * from outcome where user_id = 1 and category_id = "+ str(category) +" and out_date = '" + date + "'"
  ).fetchall()

  ## レコードが存在してたら消す
  if len(res) != 0:
    cur.execute(
      "delete from outcome where user_id = "+ str(id) +" and category_id = "+ str(category) +" and out_date = '" + date + "'"
    )

  ## データ挿入
  cur.execute(
    "insert into outcome (user_id, out_date, money, category_id) values(:id, :out_date, :money, :category)",{
      "id": id,
      "out_date": date,
      "money": money,
      "category": category
    }
  )


  conn.commit()
  conn.close


# if __name__ == '__main__':
#   update_daily_table()