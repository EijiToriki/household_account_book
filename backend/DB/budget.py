##########################################
# budget テーブルを作成
##########################################
import sqlite3

## DB接続
dbname = "house_account.db"
conn = sqlite3.connect(dbname)

## sqliteを操作するカーソルオブジェクトを作成
cur = conn.cursor()

## テーブル削除
# cur.execute(
#     'drop table budget'
# )

## テーブル作成
cur.execute("PRAGMA foreign_keys = true")
cur.execute(
    '''
    create table budget(
      id INTEGER PRIMARY KEY AUTOINCREMENT, 
      user_id INTEGER,
      category_id INTEGER,
      money INTEGER,
      foreign key(user_id) references user(id)
    )
    '''
)

cur.execute("insert into budget(user_id, category_id, money) values (1, 1, 70000)")
cur.execute("insert into budget(user_id, category_id, money) values (1, 2, 35000)")
cur.execute("insert into budget(user_id, category_id, money) values (1, 3, 7000)")
cur.execute("insert into budget(user_id, category_id, money) values (1, 4, 10000)")
cur.execute("insert into budget(user_id, category_id, money) values (1, 5, 20000)")
cur.execute("insert into budget(user_id, category_id, money) values (1, 6, 10000)")
cur.execute("insert into budget(user_id, category_id, money) values (1, 7, 13000)")
cur.execute("insert into budget(user_id, category_id, money) values (1, 8, 5000)")
cur.execute("insert into budget(user_id, category_id, money) values (1, 9, 5000)")
cur.execute("insert into budget(user_id, category_id, money) values (1, 10, 2000)")
cur.execute("insert into budget(user_id, category_id, money) values (1, 11, 8000)")
cur.execute("insert into budget(user_id, category_id, money) values (1, 12, 30000)")
cur.execute("insert into budget(user_id, category_id, money) values (1, 13, 10000)")

conn.commit()
conn.close