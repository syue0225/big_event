$(function () {
  // alert(11)
  // 点击去注册账号，
  var root_url = 'http://www.liulongbin.top:3007';
  $('#link_reg').on('click', function () {
    $('.login-box').hide();
    $('.reg-box').show();
  })
  // 点击去登陆账号
  $('#link_login').on('click', function () {
    $('.login-box').show();
    $('.reg-box').hide();
  })
  // 从layui中获取form对象
  var form = layui.form;
  var layer = layui.layer;
  //通过form.varify自定义校验规则
  form.verify({
    // 自定义了pwd的校验规则
    pwd: [
      /^[\S]{6,12}$/
      , '密码必须6到12位，且不能出现空格'
    ], repwd: function (value) {
      //校验两次密码是否一致的规则
      //形参拿到的是确认密码框的内容，还需要拿到密码框的内容，进行一次判断
      var pwd = $('.reg-box [name=password]').val();
      console.log(pwd);
      if (pwd !== value) {
        return '两次密码不一致';
      }
    }
  })

  // 监听注册表单的提交事件
  $('#form_reg').on('submit', function (e) {
    // 1.阻止默认行为
    e.preventDefault();
    var data = {//[]属性选择器
      username: $('#form_reg [name=username]').val(),
      password: $('#form_reg [name=password]').val()
    };
    $.post('/api/reguser',
      data,
      function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message);
        }
        layer.msg('注册成功，请登录');
        // 自动跳转到登录页面
        $('#link_login').click();
      }
    )
  })

  // 登录的提交事件
  $('#form-login').submit(function (e) {
    e.preventDefault();
    $.ajax({
      url: '/api/login',
      method: 'post',
      data: $(this).serialize(),//快速获得表单数据
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('登录失败')
        }
        layer.msg('登录成功！');
        // 将登录成功的token字符串保存到locakStorage中
        localStorage.setItem('token', res.token)
        // 跳转到后台主页
        location.href = 'index.htm'
      }
    })
  })

})  