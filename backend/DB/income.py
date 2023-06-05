##########################################
# income テーブルを作成
##########################################
import sqlite3

## DB接続
dbname = "house_account.db"
conn = sqlite3.connect(dbname)

## sqliteを操作するカーソルオブジェクトを作成
cur = conn.cursor()

## テーブル作成
cur.execute("PRAGMA foreign_keys = true")
cur.execute(
    '''
    create table income(
      id INTEGER PRIMARY KEY AUTOINCREMENT, 
      user_id INTEGER,
      in_date DATE,
      money INTEGER,
      category_id INTEGER,
      comment TEXT,
      foreign key(user_id) references user(id),
      foreign key(category_id) references category(id)
    )
    '''
)

conn.commit()
conn.close