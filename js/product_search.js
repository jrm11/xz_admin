$(function () {
    $(".js-product-search").on("click", "[data-action='update-search']", function () {
        console.log("dddd");

        loadPage(1, 8);
        function loadPage(cur, pageSize) {
            let tbody = $("#tbody");
            let lower = $("#lower").val();
            let upper = $("#upper").val();
            let keyword = $("#keyword").val();
            console.log(lower,upper,keyword);
            $.ajax({
                type: "get",
                url: "../data/product_search.php",
                data: {low: lower, high: upper, kw: keyword, pno: cur, pageSize: pageSize},
                success: function (data) {
                    var d = JSON.parse(data);
                    console.log(d);
                },
                error: function () {
                    alert("网络故障");
                }
            });
        }
    });
});
