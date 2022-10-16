// 目次を設置するHTMLタグのIDを確認
if ('undefined' === typeof TocHtmlId) {
    //
    // HTMLタグのIDが指定されていない場合
    //

    // HTMLタグのIDとして'TocTop'を設定
    var TocHtmlId = 'TocTop';
}

// 抽出する見出しタグの種類を確認
if ('undefined' === typeof HTagType) {
    //
    // 抽出する見出しタグの種類が指定されていない場合
    //

    // 抽出する見出しタグの種類としてH3, H4タグを設定
    var HTagType = 'H3, H4';
}

// 文字列を大文字に変換
HTagType = HTagType.toLocaleUpperCase();

// 文字列内の' 'を削除し、コンマで分割した配列を生成
let HTagTypeAry = HTagType.replace(/ /g,'').split(',');

// 配列内の重複した要素を削除
HTagTypeAry = Array.from(new Set(HTagTypeAry));

// 見出しタグの順序を昇順に並び替え
HTagTypeAry.sort(
    function(a, b) {
        if (a < b) return -1;
        else return 1;
    }
)

// 配列を文字列に変更
HTagType = HTagTypeAry.join(',');

// 目次を設置するHTMLタグを抽出
let TocTop = document.getElementById(TocHtmlId);

// HTMLタグ(ID = TocHtmlId)の存在を確認
if (null !== TocTop) {
    //
    //HTMLタグ(ID = TocHtmlId)が存在する場合
    //

    // 見出しタグを含む文を抽出し、NodeList化
    let TagList = document.body.querySelectorAll(HTagType);

    //
    // 目次リストを作成
    //

    // ブログ内の見出しタグの存在を確認
    if (0 < TagList.length) {
        //
        // 見出しタグが含まれている場合
        //

        // 目次リスト用HTML変数にULタグを追加
        let TocHtmlTop = document.createElement('ul');

        // 目次リスト用HTMLのノードポインタ
        let CurrentNode = TocHtmlTop;

        // 見出しタグのID用カウンタ
        let HTagIdCounter = 0;

        // 1つ前の見出しタグの階層
        let PreHTagLayer = 0;

        TagList.forEach(
            // 見出しタグの個数だけ繰り返し
            function(element) {
                // 見出しタグのIDの存在を確認
                if ('' === element.id) {
                    //
                    // 見出しタグにIDが存在しない場合
                    //

                    // 見出しタグにIDを設定
                    element.id = 'HTagId-' + HTagIdCounter;

                    // ID用カウンタのインクリメント
                    HTagIdCounter++;
                }

                // 見出しタグの階層を確認(H2: 0, H3: 1, H4: 2, ...)
                const HTagLayer = HTagTypeAry.indexOf(element.tagName);

                // 見出しタグの階層が繰り上がったため、各変数を初期化
                if (HTagLayer < PreHTagLayer) {
                    // ノードポインタの階層を初期化
                    CurrentNode = TocHtmlTop;

                    // 1つ前の見出しタグの階層情報を初期化
                    PreHTagLayer = 0;
                }

                // 見出しタグの階層に従ってULタグを追加
                if (HTagLayer !== PreHTagLayer) {
                    // ULタグ追加処理ループ(Ex. H2 → H4を想定)
                    for (let i = PreHTagLayer; i < HTagLayer; i++) {
                        // ULタグを追加
                        let TmpTag = document.createElement('ul');

                        // ULタグをノードポインタの最後の子要素として追加
                        CurrentNode.appendChild(TmpTag);

                        // ノードポインタの階層を更新
                        CurrentNode = CurrentNode.lastElementChild;
                    }
                }

                // LIタグを追加
                let TocLiTag = document.createElement('li');

                // Aタグを追加
                let TocATag = document.createElement('a');
                // 見出しタグの内容
                TocATag.innerHTML = element.textContent;
                // ページ内リンクのジャンプ先
                TocATag.href = '#' + element.id;
                
                // LIタグの子要素としてAタグを追加
                TocLiTag.appendChild(TocATag);

                // LIタグをノードポインタの最後の子要素として追加
                CurrentNode.appendChild(TocLiTag);

                // 1つ前の見出しタグの階層情報を更新
                PreHTagLayer = HTagLayer;
            }
        );

        // 目次リストをHTMLに追加
        TocTop.appendChild(TocHtmlTop);
    }
}
