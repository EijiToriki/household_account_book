import sqlite3

def connect_db():
  ## DB接続
  dbname = "./DB/house_account.db"
  conn = sqlite3.connect(dbname)

  return conn


def insert_income(data):
  conn = connect_db()
  ## sqliteを操作するカーソルオブジェクトを作成
  cur = conn.cursor()

  print(cur.execute("select name from sqlite_master where type='table';").fetchall())

  ## テーブル作成
  cur.execute(
      '''
      insert into 
      income(user_id, in_date, money, category_id, comment)
      values(1, :in_date, :money, :category_id, :comment)
      '''
      , {
          "in_date": data["registerDate"], 
          "money": data["money"], 
          "category_id": data["category"], 
          "comment": data["comment"]
        }
  )

  conn.commit()
  conn.close