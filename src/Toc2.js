// 目次を設置するHTMLタグのIDを確認
if ('undefined' === typeof TocHtmlId) {
    //
    // HTMLタグのIDが指定されていない場合
    //

    // HTMLタグのIDとして'TocTop'を設定する
    var TocHtmlId = 'TocTop';
}

// 目次を設置するHTMLタグを抽出
let TocTop = document.getElementById(TocHtmlId);

// HTMLタグ(ID = TocHtmlId)の存在を確認
if (null !== TocTop) {
    //
    //HTMLタグ(ID = TocHtmlId)が存在する場合
    //

    // 見出しタグH2, H3を含む文を抽出し、NodeList化
    let TagList = document.body.querySelectorAll('h2, h3');

    //
    // 目次リストを作成
    //

    // ブログ内の見出しタグの存在を確認
    if (0 < TagList.length) {
        //
        // 見出しタグが含まれている場合
        //

        // ULタグを追加
        let TocUlTag = document.createElement('ul');

        // 子階層ULタグ変数
        let TocUlTagChild = '';

        //見出しタグのID用カウンタ
        let HTagIdCounter = 0;

        TagList.forEach(
            // 見出しタグの個数だけ繰り返し

            function(element) {
                // 見出しタグのIDの存在を確認
                if ('' === element.id) {
                    //
                    // 見出しタグにIDが存在しない場合
                    //

                    // 見出しタグにIDを設定
                    element.id = 'HTag-' + HTagIdCounter;

                    // ID用カウンタのインクリメント
                    HTagIdCounter++;
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

                //NodeListのHTMLタグを確認
                if ('H2' === element.tagName) {
                    //
                    // H2タグの場合
                    //

                    // 子階層ULタグ変数をクリア
                    TocUlTagChild = '';

                    // ULタグの子要素としてLIタグを追加
                    TocUlTag.appendChild(TocLiTag);
                } else if ('H3' === element.tagName) {
                    //
                    // H3タグの場合
                    //

                    // 子階層ULタグ変数の設定を確認
                    if ('' === TocUlTagChild) {
                        //
                        // 子階層ULタグ変数が設定されていない場合
                        //

                        // 子階層ULタグを追加
                        TocUlTagChild = document.createElement('ul');

                        // 親階層ULタグの子要素として子階層ULタグを追加
                        TocUlTag.appendChild(TocUlTagChild);
                    }

                    // 子階層ULタグの子要素としてLIタグを追加
                    TocUlTagChild.appendChild(TocLiTag);
                }
            }
        );

        // 目次リストを子要素として<ul>タグを追加
        TocTop.appendChild(TocUlTag);
    }
}
