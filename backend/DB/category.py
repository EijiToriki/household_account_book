##########################################
# category テーブルを作成
##########################################
import sqlite3

## DB接続
dbname = "house_account.db"
conn = sqlite3.connect(dbname)

## sqliteを操作するカーソルオブジェクトを作成
cur = conn.cursor()

## テーブル削除
cur.execute(
    'drop table category'
)

## テーブル作成
cur.execute(
    "create table category(id INTEGER, flag INTEGER, name TEXT, PRIMARY KEY(id, flag))"
)

## データ挿入：家計簿アプリ上はこのDBに新たに値が追加されることを想定していない
cur.execute("insert into category(id, flag, name) values (1, 0, '給料(本業)')")
cur.execute("insert into category(id, flag, name) values (2, 0, '賞与')")
cur.execute("insert into category(id, flag, name) values (3, 0, '特別収入')")
cur.execute("insert into category(id, flag, name) values (4, 0, '給料(副業)')")
cur.execute("insert into category(id, flag, name) values (5, 0, 'その他')")
cur.execute("insert into category(id, flag, name) values (1, 1, '家賃')")
cur.execute("insert into category(id, flag, name) values (2, 1, '食品')")
cur.execute("insert into category(id, flag, name) values (3, 1, '日用品')")
cur.execute("insert into category(id, flag, name) values (4, 1, '趣味')")
cur.execute("insert into category(id, flag, name) values (5, 1, '遊び')")
cur.execute("insert into category(id, flag, name) values (6, 1, '自己投資')")
cur.execute("insert into category(id, flag, name) values (7, 1, '交通費')")
cur.execute("insert into category(id, flag, name) values (8, 1, '電気')")
cur.execute("insert into category(id, flag, name) values (9, 1, 'ガス')")
cur.execute("insert into category(id, flag, name) values (10, 1, '水道')")
cur.execute("insert into category(id, flag, name) values (11, 1, 'ジム')")
cur.execute("insert into category(id, flag, name) values (12, 1, '投資(NISA・株など)')")
cur.execute("insert into category(id, flag, name) values (13, 1, 'その他')")

conn.commit()
conn.close