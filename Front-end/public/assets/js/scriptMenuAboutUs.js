function checkOffset() {
    if($('#about-menu ul').offset().top + $('#about-menu ul').height() >= $('footer').offset().top - 30)
        $('#about-menu ul').css('position', 'relative');
    if($(document).scrollTop() + window.innerHeight < $('footer').offset().top)
        $('#about-menu ul').css('position', 'fixed'); // restore when you scroll up
}
$(document).scroll(function() {
    checkOffset();
});