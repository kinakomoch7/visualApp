import csv
import json


def csv_to_json(csv_file_path, json_file_path):
    # CSVファイルを開く
    with open(csv_file_path, 'r', encoding='utf-8-sig') as csv_file:
        # CSVを読み込む
        csv_data = csv.reader(csv_file)
        headers = next(csv_data)  # ヘッダー行をスキップ

        # JSONデータを作成
        json_data = []
        for row in csv_data:
            json_row = {}
            for i in range(len(headers)):
                json_row[headers[i]] = row[i]
            json_data.append(json_row)

    # JSONファイルに書き込む
    with open(json_file_path, 'w', encoding='utf-8') as json_file:
        json.dump(json_data, json_file, indent=4, ensure_ascii=False)

for i in 3:
    # CSVファイルのパス
    csv_file_path = '../csvDatas/opData0' + str(i+1) + '.csv'
    # JSONファイルのパス
    json_file_path = '../jsonDatas/originalDatas/opData0' + str(i+1) + '.json'

    # CSVをJSONに変換する
    csv_to_json(csv_file_path, json_file_path)