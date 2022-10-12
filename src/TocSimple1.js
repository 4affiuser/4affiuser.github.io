// ID = "TocSimpleTop"のHTMLタグを抽出
let TocTop = document.getElementById('TocSimpleTop');

// HTMLタグ(ID = "TocSimpleTop")の存在を確認
if (null !== TocTop) {
    //
    //HTMLタグ(ID = "TocSimpleTop")が存在する場合
    //

    // 見出しタグh3を含む文を抽出し、NodeList化
    let TagList = document.body.querySelectorAll('h3');

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

        TagList.forEach(
            // 見出しタグの個数だけ繰り返し

            function(element) {
                // LIタグを追加
                let TocLiTag = document.createElement('li');
                // 見出しタグの内容
                TocLiTag.innerHTML = element.textContent;

                // ULタグの子要素としてLIタグを追加
                TocUlTag.appendChild(TocLiTag);
            }
        );

        // 目次リストを子要素としてULタグを追加
        TocTop.appendChild(TocUlTag);
    }
}
