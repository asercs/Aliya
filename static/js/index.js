// При клике кнопки меняет класс
function onClickMenu() {
	document.getElementById("responsive-menu-btn").classList.toggle("change");
	document.getElementById("menu").classList.toggle("change");
}

// передвигает страницу на определенный элемент
function slowScroll(id) {
    $('html, body').animate({
    	scrollTop: $(id).offset().top
    	}, 500);
}

// меняет стили для шапки при прокрутке
$(document).on("scroll", function () {
	if ($(window).scrollTop() === 0)
	    $("header").removeClass("fixed");
	else
	    $("header").attr("class", "fixed");
})