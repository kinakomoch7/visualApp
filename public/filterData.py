import json

# JSONデータを読み込みます
with open('data.json', 'r') as json_file:
    data = json.load(json_file)

# フィルタリング条件を設定します（例：'value'が100以上のデータだけを抽出）
threshold = 100
filtered_data = [item for item in data if item.get('value', 0) >= threshold]

# 抽出したデータを新しいJSONファイルとして保存する場合
with open('filtered_data.json', 'w') as filtered_file:
    json.dump(filtered_data, filtered_file, indent=4)

# または、抽出したデータを直接使用することもできます
for item in filtered_data:
    print(item)
