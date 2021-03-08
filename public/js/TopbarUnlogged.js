var nav = document.getElementById('navbar');

var prevPositionScroll = 0;
$(window).scroll(function (event){
    var scroll = $(window).scrollTop();
    if(scroll==0 && prevPositionScroll!=0)
    {
        prevPositionScroll = 0;
        nav.classList.remove('scroll1');
        nav.classList.add('scroll0');
    }
    else if(scroll>0 && prevPositionScroll==0)
    {
        prevPositionScroll = scroll;
        nav.classList.remove('scroll0');
        nav.classList.add('scroll1');
    }
})


function loginButton()
{
    $('.ui.modal.LoginModal').modal('show');
}

function registerButton()
{
    $('.ui.modal.RegisterModal').modal('show');
}