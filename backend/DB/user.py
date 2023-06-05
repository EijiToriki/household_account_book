##########################################
# user テーブルを作成
##########################################
import sqlite3
from hash_password import get_digest

## DB接続
dbname = "house_account.db"
conn = sqlite3.connect(dbname)

## sqliteを操作するカーソルオブジェクトを作成
cur = conn.cursor()

## テーブル削除
cur.execute(
    'drop table user'
)

## テーブル作成
cur.execute(
    "create table user(id INTEGER PRIMARY KEY AUTOINCREMENT, user_name TEXT, password TEXT)"
)

## サンプルデータの挿入
password = get_digest('torikie0404')
cur.execute(
    "insert into user(user_name, password) values ('eiji', :password);", {"password": password}
)

conn.commit()
conn.close