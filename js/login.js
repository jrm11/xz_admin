$(function () {
    var codeFailCount = sessionStorage.getItem('code-fail-count');
    var regs = {
        userNameReg: /^(([\u4e00-\u9fa5])|[a-zA-Z0-9-_]){4,20}$/,
        pwdReg: /^.{6,20}$/,
        vReg: /[a-zA-Z0-9]{4}/
    };

    var errorMsg = $(".error-msg");
    if (codeFailCount == null) {
        codeFailCount = 1;
    }
    // 判断用户输入验证码次数出错超过4次，就显示验证码
    function validateCode() {
        sessionStorage.setItem('code-fail-count', codeFailCount);
        if (codeFailCount > 4) {
            $(".vcode-box").removeClass("hidden");
        }
    }

    // validateCode();
    $(".js-submit").click(function () {
        // validateCode();
        var userVal = $("[name='uname']").val();
        var pwdVal = $("[name='upwd']").val();
        var codeVal = $("[name='code']").val();
        console.log(userVal, pwdVal, codeVal);
        (function () {
            if (userVal === "" || pwdVal === "") {
                errorMsg.html("用户名或密码不能为空");
                return false;
            }

            if (!regs.pwdReg.test(pwdVal)) {
                errorMsg.html("密码格式不正确");
                return false;
            }
            //当登录次数超过4次而且验证码输的不正确才验证
            if (codeFailCount > 4 && !regs.vReg.test(codeVal)) {
                errorMsg.html("验证码格式不正确");
                return false;
            }
            if (userVal === "" || pwdVal === "") {
                errorMsg.html("用户名或密码不能为空");
                return false;
            }

            if (codeFailCount > 4 && codeVal == "") {
                errorMsg.html("验证码不能为空");
                return false;
            }
        })();

        $.ajax({
            type: "post",
            url: "../data/01_login.php",
            data: {
                uname: userVal,
                upwd: pwdVal,
                code: codeVal,
                ncode: codeFailCount
            },
            success: function (data) {
                console.log(data);
                if (data.code == -3) {
                    codeFailCount++;
                    // validateCode();
                    errorMsg.html(data.msg);
                } else if (data.code == -2) {
                    codeFailCount++;
                    // validateCode();
                    errorMsg.html(data.msg);
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
                    }, 1300);
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
    });
    $("#js-change-vcode").click(function (e) {
        e.preventDefault();
        $(".js-vcode-img").attr("src", "../data/03_code_gg.php");
    });
});
