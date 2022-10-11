// ID = "toc_top"のHTMLタグを抽出
let TocTop = document.getElementById('toc_top')

// HTMLタグ(ID = "toc_top")の存在を確認
if (null != TocTop) {
    //
    //HTMLタグ(ID = "toc")が存在する場合
    //

    // 見出しタグh3を含む文を抽出し、NodeList化
    let TagList = document.body.querySelectorAll('h3')

    //
    // 目次リストを作成
    //

    // ブログ内の見出しタグの存在を確認
    if (0 < TagList.length) {
        //
        // 見出しタグが含まれている場合
        //

        // <ul>タグを追加
        let TocUlTag = document.createElement('ul')

        TagList.forEach(
            // 見出しタグの個数だけ繰り返し

            function(tmp) {
                // <li>タグを追加
                let TocLiTag = document.createElement('li')
                TocLiTag.innerHTML = tmp.textContent // 見出しタグの内容

                // <ul>タグの子要素として追加
                TocUlTag.appendChild(TocLiTag)
            }
        )

        // 目次リストを子要素として追加
        TocTop.appendChild(TocUlTag)
    }
}
