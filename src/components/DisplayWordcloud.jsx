import React from "react";
import WordCloud from "react-d3-cloud";

export const DisplayWordcloud = (props) => {
  const [data] = props;

  const test = kuromoji
    .builder({ dicPath: DIC_URL })
    .build((err, tokenizer) => {
      if (err) {
        console.log(err);
        return;
      }

      // テキストを引数にして形態素解析
      const tokens = tokenizer.tokenize(text);

      // 解析結果から単語と出現回数を抽出
      const dataForD3Cloud = tokens
        // pos（品詞）を参照し、'名詞', '動詞', '形容詞'のみを抽出
        .filter((t) => TARGET_POS.includes(t.pos))
        // 単語を抽出(basic_formかsurface_formに単語が存在する)
        .map((t) =>
          t.basic_form === NO_CONTENT ? t.surface_form : t.basic_form
        )
        // [{text: 単語, value: 出現回数}]の形にReduce
        .reduce((data, text) => {
          const target = data.find((c) => c.text === text);
          if (target) {
            target.value = target.value + 1;
          } else {
            data.push({
              text,
              value: 1,
            });
          }
          return data;
        }, []);

      // 加工した解析結果をstateにセット
      this.setState({ dataForD3Cloud });
    });

  return (
    <>
      <WordCloud />
    </>
  );
};
