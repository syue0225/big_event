$(function () {
    var form = layui.form;
    var layer = layui.layer;
    // 通过layui创建自己的验证规则
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称长度必须在1~6个字符之间'
            }
        }
    });
    initUserInfo();
    // 初始化用户基本信息
    function initUserInfo() {
        $.ajax({
            method: 'get',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败');
                }
                // form.val快速赋值
                // 为lay-filter='formUserInfo'属性的表单赋值
                form.val('formUserInfo', res.data);
            }
        })
    }

    // 监听表单提交事件
    $('.layui-form').on('submit', function (e) {
        // 阻止表单的默认提交行为
        e.preventDefault();
        // 发起post请求
        $.ajax({
            method: 'post',
            data: $(this).serialize(),
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('更新用户信息失败')
                }
                // 更新用户成功，如果有昵称欢迎文本显示昵称 如果没有欢迎文本欢迎用户名
                // 相当于有一个大页面 index.htm 中包含iframe iframe指定一个子页面 那么子页面如何调用父页面 并重新渲染欢迎文本呢？
                // 调用父页面方法 重新渲染用户的头像和信息
                window.parent.getUserInfo();//window指向当前iframe的页面，window.parent指向index页面，然后调用其中获得用户信息函数
                // return layer.msg('更新用户信息成功')
            }
        })
    })
    // 重置表单数据
    $('#btnReset').on('click', function (e) {
        // 阻止默认重置行为
        e.preventDefault();
        initUserInfo();
    })

})