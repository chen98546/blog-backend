layui.use(['element', 'layer', 'form', 'util'], function () {
    const layer = layui.layer;
    const form = layui.form;
    const util = layui.util;

    // 判断input值是否为空的正则表达式
    let emptyReg = /^\s*$/;
    // 特殊字符正则表达式
    let regSpecial = /[`~!=\-@#$%^&*()——……《》，。！：；|、\\·+<>?:"{},.\/;'[\]\s+]/im;




    // 回显用户头像和用户名
    const cookieInfo = JSON.parse(Cookies.get('userInfo'));
    $('#loginUname').val(cookieInfo.u_name) // 登录页面显示用户名
    $('#showAvatarImg').attr('src', cookieInfo.u_avatar);


    let infoStr = `
        <img src="${cookieInfo.u_avatar}" class="layui-nav-img" id="headerAvatar">
        <span id="uname">${cookieInfo.u_name}</span>`;
    $('#headerUserInfo').html(infoStr);

    let logoName = localStorage.getItem("logoName");
    let set_logoPic = localStorage.getItem("set_logoPic");

    let logoStr = `
        <img src="${set_logoPic}" alt="" id="logoImg" style="width:30px">
        <span id="logoText">${logoName ? logoName : "后台管理系统"}</span>`;
    $('#logoWarp').html(logoStr);


    //头部事件
    util.event('lay-header-event', {
        //左侧菜单事件
        menuLeft: function (othis) {
            layer.msg('展开左侧菜单的操作111', {
                icon: 0
            });
        },
        menuRight: function () {
            layer.open({
                type: 1,
                content: '<div style="padding: 15px;">处理右侧面板的操作234</div>',
                area: ['260px', '90.5%'],
                offset: 'rb', //右下角
                anim: 5,
                shadeClose: true
            });
        }
    });

    // 退出登录
    function logoutFn() {
        $("#logout").click(async function () {
            await $.post("/logout")
            layer.confirm('确认退出', function () {
                location.reload();
            })
        });
    }
    logoutFn();



    // 个人信息设置
    function setUserInfoFn() {
        let index;
        let isEditUserInfo = 0;

        // 个人信息弹窗
        $('#userInfo').click(function () {
            let userCookieInfo = JSON.parse(Cookies.get('userInfo'))
            index = layer.open({
                type: 1,
                anim: 2,
                title: false,
                area: ["600px", "350px"],
                content: `
                    <div class="login" id="setNewInfo">
                        <h1>个人资料</h1>
                        <form class="layui-form" id="personalForm">
                            <div id="avatar">
                                <input type="file" name="personalAvatar" id="avatarFile">
                                <img src="" alt="" id="avatarImg">
                            </div>
                            <div class="layui-form-item layuiItem">
                                <input type="text" class="layui-input" name="username" id="showUsername" style="height:40px" placeholder="请输入新用户名称" autocomplete="off">
                            </div>
            
                            <div class="layui-form-item layuiItem">
                                <button id="amendBtn" class="btn-primary btn-block btn-large layui-btn" lay-filter="amendBtn" lay-submit>修改</button>
                            </div>
                        </form> 
                    </div>
                `,

                // 右上角关闭回调函数
                cancel: function () {
                    $('#headerAvatar').attr('src', userCookieInfo.u_avatar);
                    isEditUserInfo = 0;
                }
            });

            // 个人资料回显
            $('#showUsername').val(userCookieInfo.u_name);
            $('#avatarImg').attr('src', userCookieInfo.u_avatar);
        });


        // 单击头像执行avatarFile点击事件
        $(document).on('click', '#avatar', function () {
            $('#avatarFile')[0].click()
        });


        // 二进制转换
        $(document).on('change', '#avatarFile', function () {
            let file = this.files[0]
            let reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = function () {
                $('#avatarImg').attr('src', this.result);
                $("#headerAvatar").attr('src', this.result);
                isEditUserInfo = 1;
            }
        });


        // 监听表单
        form.on("submit(amendBtn)", function (data) {
            let {
                username
            } = data.field;
            let formData = new FormData($('#personalForm')[0]);
            let formCookieInfo = JSON.parse(Cookies.get('userInfo'));
            formData.set('avatarPath', formCookieInfo.u_avatar);
            formData.set('isEditUserInfo', isEditUserInfo);


            // 判断用户名长度
            if (username.length > 12 || username.length < 2) {
                layer.msg('请输入2-12位的用户名')
                return false
            }

            // 是否为空判断
            if (emptyReg.test(username)) {
                layer.msg("请输入新昵称");
                return false;
            }

            // 判断用户名和密码是否有特殊符号
            if (regSpecial.test(username)) {
                layer.msg('名称不能包含特殊字符')
                return false
            }

            // 验证用户名是否已存在
            $.get('/getUsersData').then(res => {
                let result = res.find(item => {
                    let isExistUname = item.u_name == username;
                    return isExistUname;
                })

                // 对自己的名字取反不做是否占用判断
                let uname = !(username == formCookieInfo.u_name);
                if (result && uname) {
                    layer.msg('该用户名已被占用')
                    return false
                } else {
                    $.ajax({
                        type: "put",
                        url: "/amendPersonalData",
                        data: formData,
                        contentType: false,
                        processData: false,
                    }).then(res => {
                        $('#uname').text(res[0].u_name);
                        layer.msg("资料修改成功");
                        layer.close(index, function () {
                            isEditUserInfo = 0;
                        })
                    });
                }
            })
            return false;
        });
    }
    setUserInfoFn();



    // 修改密码
    function editPwdFn() {
        let index;
        let timer;
        clearTimeout(timer);

        $(document).on('click', '#editPassword', function () {
            index = layer.open({
                type: 1,
                title: false,
                area: ["600px", "350px"],
                content: `
                    <div class="login" id="editUserPwd">
                        <h1 style="margin:20px 0">修改密码</h1>
                        <form class="layui-form" active="/editPwdForm" method="post" id="editPwdForm">
                            <div class="layui-form-item">
                                <input type="password" class="input" name="password1" oncopy="return false" onpaste="return false" oncut="return false" placeholder="请输入原密码" autocomplete="off">
                            </div>
                            <div class="layui-form-item">
                                <input type="password" class="input" name="password2" oncopy="return false" onpaste="return false" oncut="return false" placeholder="请输入新密码" autocomplete="off">
                            </div>
                            <div class="layui-form-item">
                                <input type="password" class="input" name="password3" oncopy="return false" onpaste="return false" oncut="return false" placeholder="请确认新密码" autocomplete="off">
                            </div>
                            <div class="layui-form-item">
                                <button id="editPwdBtn" class="btn-primary btn-block btn-large layui-btn" lay-filter="editPwdBtn" lay-submit>修改</button>
                            </div>
                        </form> 
                    </div>
                `,
            });
        })

        form.on('submit(editPwdBtn)', function (data) {
            let {
                password1,
                password2,
                password3
            } = data.field;

            // 判断密码是否为空
            if (emptyReg.test(password1) || emptyReg.test(password2) || emptyReg.test(password3)) {
                layer.msg('密码不能为空，请确认后重新输入')
                return false;
            }

            // 判断用户名和密码是否有特殊符号
            if (regSpecial.test(password1) || regSpecial.test(password2) || regSpecial.test(password3)) {
                layer.msg('密码不能包含特殊字符')
                return false
            }

            // 判断密码长度
            if (password1.length > 15 || password1.length < 6 || password2.length > 15 || password2.length < 6 || password3.length > 15 || password3.length < 6) {
                layer.msg('请输入6-15位的密码')
                return false
            }


            $.ajax({
                type: 'put',
                url: '/editPwdForm',
                data: data.field,
            }).then(res => {
                if (res.password1 !== cookieInfo.u_password) {
                    layer.msg('旧密码输入不正确，请确认后重新输入');
                    return false;
                } else if (password2 !== password3) {
                    layer.msg('新密码输入不匹配，请确认后重新输入')
                    return false;
                };

                if (res.code === 0) {
                    layer.msg(res.message)
                    layer.close(index);

                    timer = setTimeout(() => {
                        layer.alert('身份有效期失效,请返回重新登录', function (alert) {
                            layer.close(alert, function () {
                                location.reload();
                            });
                        });
                    }, 500);

                }

            })
            return false
        })
    }
    editPwdFn();



});