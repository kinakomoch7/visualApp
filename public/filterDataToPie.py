import json


def filterJson(previous_data_path, filtered_data_path):
    # JSONデータを読み込みます
    with open(previous_data_path, 'r') as json_file:
        data = json.load(json_file)
    
    # 抜き出されたデータを格納するリスト
    extracted_data = []

    # JSONデータから指定の要素を抜き出してリストに追加
    for entry in data:
        entry_data = {
            "bureauName": entry["局名"],
            "divisionName": entry["部名"],
            "sectionName": entry["課名"],
            "payment": int(entry["支払額（円）"].replace(",", ""))
        }
        extracted_data .append(entry_data)

    # 抜き出したデータを新しいJSONファイルとして保存
    with open(filtered_data_path, 'w') as extracted_file:
        json.dump(extracted_data, extracted_file, indent=4, ensure_ascii=False)

# フォーマット済みのデータを出力
for i in range(3):
    previous_data_path = '../jsonDatas/originalDatas/opData0' + str(i+1) + '.json'
    filtered_data_path = '../formattedDatas/PieChartDatas/PieChartData0' + str(i+1) + '.json'
    filterJson(previous_data_path, filtered_data_path)