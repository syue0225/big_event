$(function () {
    // 
    getUserInfo();

    var layer = layui.layer;
    // 点击按钮，实现退出功能
    $('#btn-logout').on('click', function () {
        layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function (index) {
            //do something
            console.log('OK');
            // 跳转到 登录页面 并清空本地存储中的token
            localStorage.removeItem('token')
            location.href = 'login.htm';
            // 这是关闭confirm询问框
            layer.close(index);
        });

    })
    // 获取用户信息
    function getUserInfo() {
        $.ajax({
            type: 'get',
            url: '/my/userinfo',
            // 请求头配置字段  身份认证字段
            // 统一在baseAPI 中添加headers请求头
            // headers: {
            //     Authorization: localStorage.getItem('token') || ''
            // },
            success: function (res) {
                if (res.status !== 0)
                    return layui.layer.msg('获取用户信息失败！')
                renderAvatar(res.data);
            }
            // 不论是成功还是失败，最终会调用complete回调函数
            // 将一下代码写入baseAPI 中，就不需要每次用权限的时候 都写下面代码了 
            // , complete: function (res) {
            //     // console.log(res);
            //     // console.log('z执行了complete回调');
            //     // 在complete回调函数中，可以使用res.responseJSON拿到服务器响应回来的数据
            //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            //         // 1.强制清空token
            //         localStorage.removeItem('token')
            //         // 2.强制跳转login.html  不让其跳转到index.html页面（访问该页面是有权限的）
            //         location.href = '/login.html';
            //     }
            // }
        })
    }
    // 渲染用户头像
    function renderAvatar(user) {
        // 1.获取用户姓名
        var name = user.nickname || user.username;
        // 2.设置欢迎文本
        $('#welcome').html('欢迎&nbsp;&nbsp;' + name);
        // 3.按需渲染用户图片头像
        if (user.user_pic !== null) {//渲染用户头像
            $('.layui-nav-img').attr('src', user.user_pic);
            $('.text-avatar').hide();
        } else {
            //渲染文本头像
            $('.layui-nav-img').hide();
            var firstName = name[0].toUpperCase();
            $('.text-avatar').html(firstName).show();
        }
    }
})
