// ID = "TocTop"のHTMLタグを抽出
let TocTop = document.getElementById('TocTop');

// HTMLタグ(ID = "TocTop")の存在を確認
if (null != TocTop) {
    //
    //HTMLタグ(ID = "TocTop")が存在する場合
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

        // <ul>タグを追加
        let TocUlTag = document.createElement('ul');

        //見出しタグのid用カウンタ
        var HTagIdCounter = 0;

        TagList.forEach(
            // 見出しタグの個数だけ繰り返し

            function(element) {
                // 見出しタグのidの存在を確認
                if ('' == element.id) {
                    //
                    // 見出しタグにidが存在しない場合
                    //

                    // 見出しタグにidを設定
                    element.id = 'HTag-' + HTagIdCounter;

                    // id用カウンタのインクリメント
                    HTagIdCounter++;
                }

                // <li>タグを追加
                let TocLiTag = document.createElement('li');

                // <a>タグを追加
                let TocATag = document.createElement('a');
                // 見出しタグの内容
                TocATag.innerHTML = element.textContent;
                // ページ内リンクのジャンプ先
                TocATag.href = '#' + element.id;
                
                // <li>タグの子要素として<a>タグを追加
                TocLiTag.appendChild(TocATag);

                // <ul>タグの子要素として<li>タグを追加
                TocUlTag.appendChild(TocLiTag);
            }
        );

        // 目次リストを子要素として<ul>タグを追加
        TocTop.appendChild(TocUlTag);
    }
}
