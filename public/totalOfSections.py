import json


def filterJson():
    data = []
    # JSONデータを読み込みます
    for i in range(2):
        previous_data_path = '../formattedDatas/PieChartDatas/PieChartData0' + str(i+1) + '.json'
        with open(previous_data_path, 'r') as json_file:
            data.append(json.load(json_file))

    # 局ごとの支払額を格納する辞書を初期化
    total_by_division = {}
    total_by_section = {}

    for data_i in data:
        for item in data_i:
            division_name = item["divisionName"]
            section_name = item["sectionName"]
            payment = item["payment"]

            if division_name in total_by_division:
                # 既に局が辞書に存在する場合、支払額を追加
                total_by_division[division_name] += payment
            else:
                # 局が辞書に存在しない場合、新しいエントリを作成
                total_by_division[division_name] = payment
            
            if section_name in total_by_section:
                # 既に局が辞書に存在する場合、支払額を追加
                total_by_section[section_name] += payment
            else:
                # 局が辞書に存在しない場合、新しいエントリを作成
                total_by_section[section_name] = payment

    # 抜き出したデータを新しいJSONファイルとして保存
    with open('../formattedDatas/PieTotalDatas/divisionTotalData.json', 'w') as extracted_file:
        json.dump(total_by_division, extracted_file, indent=4, ensure_ascii=False)

    with open('../formattedDatas/PieTotalDatas/sectionTotalData.json', 'w') as extracted_file:
        json.dump(total_by_section, extracted_file, indent=4, ensure_ascii=False)

# フォーマット済みのデータを出力
filterJson()