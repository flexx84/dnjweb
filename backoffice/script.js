$(function(){
    $('#loginBtn').on('click', function(){
        $.post('auth.php', {password: $('#password').val()}, function(res){
            if(res === 'OK'){
                $('#loginPanel').hide();
                $('#mainPanel').show();
                loadPageList();
            }else{
                alert('패스워드 오류');
            }
        });
    });

    $('nav button').on('click', function(){
        var view = $(this).data('view');
        $('.view').hide();
        $('#' + view).show();
    });

    $('#loadPage').on('click', function(){
        var path = $('#pageSelect').val();
        $('#pageFrame').attr('src', path);
    });

    $('#toggleDesign').on('click', function(){
        var frame = document.getElementById('pageFrame');
        frame.contentDocument.designMode = frame.contentDocument.designMode === 'on' ? 'off' : 'on';
    });

    $('#savePage').on('click', function(){
        var frame = document.getElementById('pageFrame');
        var content = frame.contentDocument.documentElement.outerHTML;
        $.post('save_page.php', {
            path: $('#pageSelect').val(),
            content: content
        }, function(res){
            alert(res);
        });
    });

    $('#sendMail').on('click', function(){
        $.post('notify.php', {
            subject: $('#mailSubject').val(),
            message: $('#mailMessage').val()
        }, function(res){
            $('#mailStatus').text(res);
        });
    });

    function loadPageList(){
        $.getJSON('list_pages.php', function(pages){
            $('#pageSelect').empty();
            pages.forEach(function(p){
                $('#pageSelect').append('<option value="'+p+'">'+p+'</option>');
            });
        });
    }
});
