$(function () {
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        pass: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        // 新密码
        newpwd: function (value) {
            var OldPwd = $('.layui-form [name=oldPwd]').val();
            if (OldPwd === value) {
                return '与原密码相同，请重新输入'
            }
            // 新确认密码
        }, repwd: function (value) {
            var newPwd = $('.layui-form [name=newPwd]').val();
            if (newPwd !== value) {
                return '两次密码输入不一致，请重新输入'
            }
        }
    })
    // 表单绑定提交事件
    $('.layui-form').on('submit', function (e) {
        // 阻止默认提交
        e.preventDefault();
        var data = {
            oldPwd: $('.layui-form [name=oldPwd]').val(),
            newPwd: $('.layui-form [name=rePwd]').val()
        };
        $.ajax({
            method: 'post',
            url: '/my/updatepwd',
            // data,
            // 或者如下简便方式 获取表单数据
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    layer.msg('重置密码失败')
                }
                layer.msg('更新密码成功');
                // 重置表单
                $('.layui-form')[0].reset();
            }
        })
    })

})