$(function () {
    var codeFailCount = sessionStorage.getItem('code-fail-count');
    if (codeFailCount == null) {
        codeFailCount = 1;
    }
    console.log(codeFailCount);
    // 判断用户输入验证码次数出错超过4次，就显示验证码
    function validateCode() {
        sessionStorage.setItem('code-fail-count', codeFailCount);
        if (codeFailCount > 4) {
            $(".vcode-box").removeClass("hidden");
        }
    }

    var codeVal = $("#js-code").val();
    var u = $("#js-username");
    var p = $("#js-pwd");
    var errorMsg = $(".error-msg");
    u.focus(function () {
        if ($(this).val() === "") {
            u.next().html("4-20位的字符");
            return false;
        }
    }).blur(function () {
        if ($(this).val() === "") {
            u.next().html("");
            return false;
        }
    });
    p.focus(function () {
        if ($(this).val() === "") {
            p.next().html("6-20位的字符");
            return false;
        }
    }).blur(function () {
        if ($(this).val() === "") {
            p.next().html("");
            return false;
        }
    });

    $(".js-submit").click(function () {
        validateCode();
        var userVal = $("#js-username").val();
        var pwdVal = $("#js-pwd").val();
        console.log(userVal, pwdVal);
        if (userVal === "" || pwdVal === "") {
            errorMsg.html("用户名或密码不能为空");
            return false;
        }

        $.ajax({
            type: "post",
            url: "../data/01_login.php",
            data: {
                uname: userVal,
                upwd: pwdVal,
                vcode: codeVal,
                code: codeFailCount
            },
            success: function (data) {
                if (data.code == -2) {
                    codeFailCount++;
                    errorMsg.html(data.msg);
                    return false;
                } else if (data.code == -3) {
                    codeFailCount++;
                    errorMsg.html(data.msg);
                    return false;
                } else if (data.code == 1) {
                    sessionStorage.setItem("uid", data.uid);
                    sessionStorage.setItem("uname", userVal);
                    swal({
                        title: '登陆成功',
                        type: 'success',
                        showCancelButton: false,
                        showConfirmButton: false
                    });
                    setTimeout(function () {
                        location.href = "../html/index.html";
                    }, 1500);
                }
            },
            error: function () {
                swal({
                    title: '网络故障',
                    type: 'error',
                    showCancelButton: false,
                    showConfirmButton: true
                });
            }
        });

        $(".js-change-vcode").click(e => {
            e.preventDefault();
            $(".js-vcode-img").attr("src", "../data/03_code_gg.php");
        });
    });
});
