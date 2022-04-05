$(function () {
    var layer = layui.layer;
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
    // 1.2 配置选项
    const options = {
        // 纵横比1;16/9;4/3
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)

    // 上传文件——更换图片
    $('#btnChooseImage').on('click', function () {
        // 通过点击button按钮手动调用上传文件按钮（隐藏起来了）
        $('#file').click();
        // 为文件选择框绑定change事件
        $('#file').on('change', function (e) {
            // 获取用户选择的文件夹
            var filelist = e.target.files
            if (filelist.length === 0) {
                return layer.msg('请导入照片')
            }
            // 1.拿到用户选择的文件
            var file = e.target.files[0];
            // 2.将文件转换为路径
            var imgURL = URL.createObjectURL(file);
            // 3.重新初始化裁剪区域
            $image
                .cropper('destroy')      // 销毁旧的裁剪区域
                .attr('src', imgURL)  // 重新设置图片路径
                .cropper(options);      // 重新初始化裁剪区域
        })
    })

    //上传头像图片 
    $('#btnUpload').on('click', function () {
        // 1.获取用户裁剪的头像
        var dataURL = $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png')       // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
        $.ajax({
            method: 'post',
            URL: '/my/update/avatar',
            data: { avatar: dataURL },
            success: function (res) {
                if (res.status !== 0) {
                    layer.msg('更新头像失败');
                }
                layer.msg('更新头像成功！');
                window.parent.getUserInfo();
            }
        })
    })
})