(function () {
    function init() {
        var input = document.getElementById("fulltext-input");
        var results = document.getElementById("fulltext-results");
        if (!input || !results) return;
        var indexUrl = results.getAttribute("data-url") || "/search.json";
        var index = null;
        var loading = false;

        function esc(s) {
            return String(s).replace(/[&<>"]/g, function (c) {
                return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
            });
        }

        function snippet(content, kw) {
            var lower = content.toLowerCase();
            var pos = lower.indexOf(kw);
            if (pos < 0) pos = 0;
            var start = Math.max(0, pos - 60);
            var end = Math.min(content.length, pos + kw.length + 120);
            var text =
                (start > 0 ? "…" : "") +
                content.slice(start, end).replace(/\s+/g, " ") +
                (end < content.length ? "…" : "");
            var re = new RegExp(kw.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi");
            return esc(text).replace(re, function (m) {
                return "<mark>" + m + "</mark>";
            });
        }

        function render(kw) {
            kw = kw.trim().toLowerCase();
            if (!kw) {
                results.innerHTML =
                    '<div class="search-empty">输入关键词开始搜索</div>';
                return;
            }
            var hits = [];
            for (var i = 0; i < index.length; i++) {
                var p = index[i];
                if (!p.title || !p.url || !p.content) continue;
                var title = (p.title || "").toLowerCase();
                var body = (p.content || "").replace(/<[^>]+>/g, " ");
                var ti = title.indexOf(kw);
                var bi = body.toLowerCase().indexOf(kw);
                if (ti >= 0 || bi >= 0) {
                    hits.push({ p: p, ti: ti, bi: bi });
                }
                if (hits.length >= 20) break;
            }
            if (!hits.length) {
                results.innerHTML =
                    '<div class="search-empty">没有找到与「' +
                    esc(kw) +
                    '」相关的文章</div>';
                return;
            }
            hits.sort(function (a, b) {
                if (a.ti >= 0 && b.ti < 0) return -1;
                if (b.ti >= 0 && a.ti < 0) return 1;
                return 0;
            });
            var html = "";
            for (var j = 0; j < hits.length; j++) {
                var p = hits[j].p;
                var body = (p.content || "").replace(/<[^>]+>/g, " ");
                var d = p.date ? String(p.date).slice(0, 10) : "";
                html +=
                    '<a class="search-result-item" href="' +
                    p.url +
                    '"><div class="sr-title">' +
                    esc(p.title || "无标题") +
                    '</div><div class="sr-meta">' +
                    d +
                    '</div><div class="sr-snippet">' +
                    snippet(body, kw) +
                    "</div></a>";
            }
            results.innerHTML = html;
        }

        input.addEventListener("input", function () {
            if (!index) {
                if (loading) return;
                loading = true;
                results.innerHTML =
                    '<div class="search-empty">搜索索引加载中…</div>';
                fetch(indexUrl)
                    .then(function (r) {
                        return r.json();
                    })
                    .then(function (data) {
                        index = data;
                        loading = false;
                        render(input.value);
                    })
                    .catch(function () {
                        results.innerHTML =
                            '<div class="search-empty">索引加载失败，请刷新重试</div>';
                        loading = false;
                    });
                return;
            }
            render(input.value);
        });
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})();
