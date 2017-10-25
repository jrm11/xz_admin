;(function () {

    $.validator.setDefaults({
        submitHandler: function () {
            alert("submitted!");
        }
    });

    $().ready(function () {
        $("#form-product-add").validate({
            rules: {
                title: {
                    required: true,
                    maxlength: 128
                },
                subtitle: {
                    required: true,
                    maxlength: 128
                },
                price: {
                    required: true,
                },
                promise: {
                    required: true,
                },
                spec: {
                    required: true,
                    minlength: 128,
                },
                lname: {
                    required: true,
                },
                os: {
                    required: true,
                    minlength: 2
                },
                memory: {
                    required: true
                },
                resolution: {
                    required: true
                },
                video_card: {
                    required: true
                },
                cpu: {
                    required: true
                },
                video_memory: {
                    required: true
                },
                category: {
                    required: true
                },
                disk: {
                    required: true
                },
                is_onsale: {
                    required: true
                },
                details: {
                    required: true
                }
            },
            messages: {
                title: {
                    required: "长度不超过128个字符",
                    maxlength: 128
                },
                subtitle: {
                    required: "长度不超过128个字符",
                    maxlength: 128
                },
                price: {
                    required: "长度不超过128个字符",
                },
                promise: {
                    required: "长度不超过128个字符",
                },
                spec: {
                    required: "长度不超过128个字符",
                    minlength: 128,
                },
                lname: {
                    required: "长度不超过128个字符",
                },
                os: {
                    required: "长度不超过128个字符",
                    minlength: 2
                },
                memory: {
                    required: "长度不超过128个字符",
                },
                resolution: {
                    required: "长度不超过128个字符",
                },
                video_card: {
                    required: "长度不超过128个字符",
                },
                cpu: {
                    required: "长度不超过128个字符",
                },
                video_memory: {
                    required: "长度不超过128个字符",
                },
                category: {
                    required: "长度不超过128个字符",
                },
                disk: {
                    required: "长度不超过128个字符",
                },
                is_onsale: {
                    required: "长度不超过128个字符",
                },
                details: {
                    required: "长度不超过128个字符",
                }
            }
        });
    });
})();