$(function() {
    loadPage(1, 8);

    function loadPage(cur, pageSize) {
        let tbody = document.querySelector("#tbody");
        let xhr = new XMLHttpRequest();
        xhr.open("get", `../data/product_list.php?pno=${cur}&pageSize=${pageSize}`, true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    doResponseText(xhr);
                } else {
                    console.log("响应完成但有问题");
                }
            }
        };
        xhr.send();

        function doResponseText(xhr) {

            let resText = JSON.parse(xhr.responseText);
            console.log("开始响应");
            let rows = resText.data;
            console.log(rows);
            // 当前页
            var currPage = resText.pno;
            var pageCount = resText.pageCount;
            // console.log(currPage);
            let html = "";
            for (var i = 0; i < rows.length; i++) {
                var list = rows[i];

                console.log(list);
                console.log(list.sm);
                html +=
                    `<tr>
                            <td><input type="checkbox" aria-label="..."></td>
                            <td>${list.lid}</td>
                            <td><img class="product-list-pic" src="../${list.sm}"></td>
                            <td>${list.fname}</td>
                            <td>${list.os}</td>
                            <td>${list.spec}</td>
                            <td>${list.price}</td>
                            <td>
                                <a href="#" data-action="del" data-id="${list.lid}" data-pno="${rows.pno}" class="btn btn-danger btn-xs">删除</a>
                                <a href="#" data-action="detail" data-id="${list.lid}" class="btn btn-primary btn-xs" data-toggle="modal" data-target="#detail-modal">详情</a>
                                <a href="#" data-action="update" data-id="${list.lid}" class="btn btn-primary btn-xs" data-toggle="modal" data-target="#modify-modal">修改</a>
                            </td>
                            </tr>`;
            }
            tbody.innerHTML = html;

            var lis = "";
            var halfCount = 2;
            var startPage = currPage - halfCount;
            var endPage = currPage + halfCount;
            if (startPage < 1) {
                endPage += 1 - startPage;
                startPage = 1;
                if (endPage > pageCount) {
                    endPage = pageCount;
                }
            } else if (endPage > pageCount) {

                startPage -= endPage - pageCount;
                endPage = pageCount;
                if (startPage < 1) {
                    startPage = 1;
                }
            }
            /**
             * 首页 与上一页
             *  如果当前页大于1按钮可用
             */
            lis += `<li class="${currPage > 1 ? "" : "disabled"}"><a href="1">首页</a></li>`;
            lis += `<li class="${currPage > 1 ? "" : "disabled"}"><a href="${currPage > 1 ? currPage - 1 : '#'}" >上一页</a></li>`;

            lis += `<li><a href="1" >1</a></li>`;

            if (startPage > 1) {
                lis += `<li ><a href="${startPage}">...</a></li>`;
            }

            for (var i = startPage; i < endPage - 1; i++) {
                lis += `<li class=""><a href="${i + 1}">${i + 1}</a></li>`;
            }

            if (endPage < pageCount) {
                lis += `<li><a href="${endPage}">...</a></li>`;
            }

            lis += `<li><a href="${pageCount}" >${pageCount}</a></li>`;
            lis += `<li class="${currPage >= endPage ? "disabled" : ""}"><a href="${currPage <= endPage ? currPage + 1 : '#'}" >下一页</a></li>`;

            lis += `<li class="${currPage >= endPage ? "disabled" : ""}"><a href="${pageCount}">尾页</a></li>`;


            $("#pagination").html(lis);
        }
    }

    // 实现点击后分页效果
    $("#pagination").on("click", "li a", function(e) {
        e.preventDefault();
        var curr = $(this).attr('href');
        console.log("pno======" + curr);
        loadPage(curr, 8);
    });


    // $(("#minimal-checkbox input")).iCheck({
    //     checkboxClass: 'icheckbox_minimal-red',
    //     radioClass: 'iradio_minimal-red'
    // });


    $("#table-laptop").on("click", "[data-action='del']", function(e) {
        e.preventDefault();
        var rs = window.confirm("确认删除?");
        if (!rs) {
            return;
        } else {
            var lid = $(this).data("id");
            var currPage = $(this).data("pno");
            var tr = $(this).parents("tr");
            var td = $(this).parent();
            $.ajax({
                type: "post",
                url: "../data/product_del.php",
                data: {
                    lid: lid
                },
                success: function(data) {
                    if (data.code > 0) {
                        alert("删除成功");
                        tr.remove();
                        loadProductByPage(currPage, 5);
                        // location.reload();
                    } else {
                        alert("删除失败");
                    }
                },
                error: function() {
                    alert("网络故障请检查");
                }
            });
        }
    });

    // //更新产品
    $("#table-laptop").on("click", "[data-action='update']", function(e) {
        e.preventDefault();
        console.log("update");
        var lid = $(this).attr("data-id");
        var div = $(".update-jumbotron");
        $("[data-action='update-ok']").attr("data-lid", lid);
        $.ajax({
            type: "get",
            url: "../data/product_detail.php",
            data: {
                lid: lid
            },
            success: function(data) {
                $(".js-pname").html(data.lname);
                $(".js-price").val(data.price);

            },
            error: function() {
                alert("网路故障");
            }
        });
        // div.slideDown(500);
    });


    $("[data-action='update-ok']").click(function(e) {
        e.preventDefault();
        var lid = $(this).attr("data-lid");
        var price = $(".js-price").val();
        $.ajax({
            type: "post",
            url: "../data/product_modify.php",
            data: {
                lid: lid,
                price: price
            },
            success: function(data) {
                if (data.code > 0) {
                    alert(data.msg);
                    $(".update-jumbotron").hide();
                    location.reload();
                } else {
                    alert(data.msg);
                    $(".update-jumbotron").hide();
                }
            },
            error: function(error) {
                alert("网络故障")
            }
        })
    });


    // $("[data-action='update-cancel']").click(function(e) {
    //     e.preventDefault();
    //     $(".update-jumbotron").slideUp(500);
    // });

    $("#table-laptop").on("click", "[data-action='detail']", function(e) {
        e.preventDefault();
        var lid = $(this).attr("data-id");
        console.log(lid);
        // $("[data-action='pdate-oku']").attr("data-lid", lid);
        var div = $(".detail-jumbotron");
        var detailName = $(".dname");
        var detailCategory = $(".dcategory");
        var detailPrice = $(".dprice");
        var detailPos = $(".dpos");
        console.log("===" + detailPos);
        $.ajax({
            type: "get",
            url: "../data/product_detail.php",
            data: {
                lid
            },
            success: function(txt) {
                console.log(txt);
                detailName.html(txt.lname);
                detailCategory.html(txt.spec);
                detailPrice.html(txt.price);
                detailPos.html(txt.os);
            },
            error: function() {
                alert("网络故障");
            }
        });
        div.slideDown(500);
    });

    // $(".detail-jumbotron").on("click", "li a", function(e) {
    //     e.preventDefault();
    //     console.log("dddd");
    //     $(this).slideUp(500);
    // });

});