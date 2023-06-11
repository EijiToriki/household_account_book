import sqlite3

def connect_db():
  ## DB接続
  dbname = "./DB/house_account.db"
  conn = sqlite3.connect(dbname)

  return conn


def insert_XXcome(data, type):
  conn = connect_db()
  ## sqliteを操作するカーソルオブジェクトを作成
  cur = conn.cursor()

  table_name = type + "come"
  table_date_name = type + "_date"

  data["registerDate"] = arrange_time_format(data["registerDate"])

  ## データ挿入
  cur.execute(
      'insert into ' + table_name + '(user_id, ' + table_date_name + ', money, category_id, comment) values(1, :' + table_date_name + ', :money, :category_id, :comment)'
      , {
          table_date_name: data["registerDate"], 
          "money": data["money"], 
          "category_id": data["category"], 
          "comment": data["comment"]
        }
  )

  conn.commit()
  conn.close


def arrange_time_format(date):
  print(date)
  date = date.split('/')

  if len(date[1]) == 1:
    date[1] = '0' + date[1]
  if len(date[2]) == 1:
    date[2] = '0' + date[2]
  
  return '-'.join(date)


if __name__ == '__main__':
  print(arrange_time_format('2023/6/5'))