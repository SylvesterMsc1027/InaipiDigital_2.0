// <!-- ToolTip  -->

tippy('[data-tippy-content]');
tippy('#myButton1', {
    content: 'Dashboard',
    placement: 'right',
    animation: 'fade',
    theme: 'tomato',
});
tippy('#myButton2', {
    content: 'Tickets',
    placement: 'right',
    animation: 'fade',
    theme: 'tomato',
});
tippy('#myButton3', {
    content: 'Customers',
    placement: 'right',
    animation: 'fade',
    theme: 'tomato',
});
tippy('#myButton4', {
    content: 'Reports',
    placement: 'right',
    animation: 'fade',
    theme: 'tomato',
});

tippy('#myButton5', {
    content: 'Knowledge Base',
    placement: 'right',
    animation: 'fade',
    theme: 'tomato',
});
tippy('#myButton6', {
    content: 'SMS Template',
    placement: 'right',
    animation: 'fade',
    theme: 'tomato',
});
tippy('#myButton7', {
    content: 'Email Template',
    placement: 'right',
    animation: 'fade',
    theme: 'tomato',
});
tippy('#myButton8', {
    content: 'Masters',
    placement: 'right',
    animation: 'fade',
    theme: 'tomato',
});


// <!-- ToolTip End  -->
// Toasts start 
var toastTrigger = document.getElementById('liveToastBtn')
var toastLiveExample = document.getElementById('liveToast')
if (toastTrigger) {
    toastTrigger.addEventListener('click', function () {
        var toast = new bootstrap.Toast(toastLiveExample)

        toast.show()
    })
}
// Toasts end 
// <!-- counter  -->

$('.counter').each(function () {
    var $this = $(this),
        countTo = $this.attr('data-count');

    $({
        countNum: $this.text()
    }).animate({
            countNum: countTo
        },

        {
            duration: 8000,
            easing: 'linear',
            step: function () {
                $this.text(Math.floor(this.countNum));
            },
            complete: function () {
                $this.text(this.countNum);
                //alert('finished');
            }

        });
});

// <!-- counter end  -->
// ////////////////////////drag form start 

// layout sidemenu right customer create page

$('.dismiss').on('click', function () {
    $('.sidebar_formedit').removeClass('active-r');

});

$('.open-formedits').on('click', function (e) {
    $(".sidebar_formedit").addClass('active-r');
    $(".sidebar_formedit").removeClass("active");

});

// layout sidemenu right customer create pageend
// layout sidemenu right file uplode page

$('.dismiss').on('click', function () {
    $('.sidebar_fileupedit').removeClass('active-r');

});

$('.open-upfileedit').on('click', function (e) {
    $(".sidebar_fileupedit").addClass('active-r');
    $(".sidebar_fileupedit").removeClass("active");

});

// layout sidemenu right file uplode  end
// layout sidemenu right radio page

$('.dismiss').on('click', function () {
    $('.sidebar_radioedit').removeClass('active-r');

});

$('.open-radioedit').on('click', function (e) {
    $(".sidebar_radioedit").addClass('active-r');
    $(".sidebar_radioedit").removeClass("active");

});

// layout sidemenu right radio end
// sla create page

$('.dismiss').on('click', function () {
    $('.sidebar_sla').removeClass('active-r');

});

$('.open-sla').on('click', function (e) {
    $(".sidebar_sla").addClass('active-r');
    $(".sidebar_sla").removeClass("active");

});

// sla create  end
// ////////////////////////drag form End `
// sidemenu right

$('.dismiss').on('click', function () {
    $('.sidebar').removeClass('active-r');

});

$('.open-rsidebar').on('click', function (e) {
    $(".sidebar").addClass('active-r');
    $(".sidebar").removeClass("active");

});

// sidemenu right end
// history sidemenu right

$('.dismiss').on('click', function () {
    $('.sidebar_history').removeClass('history_r');

});

$('.open-history').on('click', function (e) {
    $(".sidebar_history").addClass('history_r');
    $(".sidebar_history").removeClass("active");

});

// history sidemenu right end
// sidemenu right ticket page

$('.dismiss').on('click', function () {
    $('.sidebar_ticket').removeClass('active-r');

});

$('.open-rsidebar').on('click', function (e) {
    $(".sidebar_ticket").addClass('active-r');
    $(".sidebar_ticket").removeClass("active");

});

// sidemenu right ticket page end

// sidemenu right ticket_filter page

$('.dismiss').on('click', function () {
    $('.sidebar_filter').removeClass('active-r');

});

$('.open-filter').on('click', function (e) {
    $(".sidebar_filter").addClass('active-r');
    $(".sidebar_filter").removeClass("active");

});

// sidemenu right ticket_filter page end
// sidemenu right email create page

$('.dismiss').on('click', function () {
    $('.sidebar_create_email').removeClass('active-r');

});

$('.open-emailcreate').on('click', function (e) {
    $(".sidebar_create_email").addClass('active-r');
    $(".sidebar_create_email").removeClass("active");

});

// sidemenu right email create page end
// sidemenu right email edit page

$('.dismiss').on('click', function () {
    $('.sidebar_edit').removeClass('active-r');

});

$('.open-emailedit').on('click', function (e) {
    $(".sidebar_edit").addClass('active-r');
    $(".sidebar_edit").removeClass("active");

});

// sidemenu right email edit page end
// sidemenu right sms create page

$('.dismiss').on('click', function () {
    $('.sidebar_create_sms').removeClass('active-r');

});

$('.open-smscreate').on('click', function (e) {
    $(".sidebar_create_sms").addClass('active-r');
    $(".sidebar_create_sms").removeClass("active");

});

// sidemenu right sms create page end
// sidemenu right sms edit page

$('.dismiss').on('click', function () {
    $('.sidebar_smsedit').removeClass('active-r');

});

$('.open-smsedit').on('click', function (e) {
    $(".sidebar_smsedit").addClass('active-r');
    $(".sidebar_smsedit").removeClass("active");

});

// sidemenu right sms edit page end


// sidemenu right kb create page

$('.dismiss').on('click', function () {
    $('.sidebar_create_kb ').removeClass('active-r');

});

$('.open-kbcreate').on('click', function (e) {
    $(".sidebar_create_kb ").addClass('active-r');
    $(".sidebar_create_kb ").removeClass("active");

});

// sidemenu right kb create page end

// sidemenu right kb create group

$('.dismiss').on('click', function () {
    $('.sidebar_group_kb ').removeClass('active-r');

});

$('.open-kbgroup').on('click', function (e) {
    $(".sidebar_group_kb ").addClass('active-r');
    $(".sidebar_group_kb ").removeClass("active");

});

// sidemenu right kb create group end
// sidemenu right kb edit page

$('.dismiss').on('click', function () {
    $('.sidebarkb_edit').removeClass('active-r');

});

$('.open-kbedit').on('click', function (e) {
    $(".sidebarkb_edit").addClass('active-r');
    $(".sidebarkb_edit").removeClass("active");

});

// sidemenu right kb edit page end
// sidemenu right tr filter page

$('.dismiss').on('click', function () {
    $('.sidebar_trfilter').removeClass('active-r');

});

$('.open-trfilter').on('click', function (e) {
    $(".sidebar_trfilter").addClass('active-r');
    $(".sidebar_trfilter").removeClass("active");

});

// sidemenu right tr filter page end

// sidemenu right tr filter page

$('.dismiss').on('click', function () {
    $('.sidebar_trexport').removeClass('active-r');

});

$('.open-trexport').on('click', function (e) {
    $(".sidebar_trexport").addClass('active-r');
    $(".sidebar_trexport").removeClass("active");

});

// sidemenu right tr filter page end

// sidemenu right customer create page

$('.dismiss').on('click', function () {
    $('.sidebar_create_customer').removeClass('active-r');

});

$('.open-customercreate').on('click', function (e) {
    $(".sidebar_create_customer ").addClass('active-r');
    $(".sidebar_create_customer ").removeClass("active");

});

// sidemenu right customercreate page end

// sidemenu right customer edit page

$('.dismiss').on('click', function () {
    $('.sidebar_edit_customer').removeClass('active-r');

});

$('.open-customeredit').on('click', function (e) {
    $(".sidebar_edit_customer ").addClass('active-r');
    $(".sidebar_edit_customer ").removeClass("active");

});

// sidemenu right customer edit page end


// <!-- ticket_id_content pop up window start  -->

$(document).click(function (e) {
    if (!e.target.closest("#ticketdetails")) {
        $(".ticket_id_content").removeClass("active-n");
    }
});
$("#ticketdetails").click(function () {
    $(".ticket_id_content").toggleClass("active-n");
});

// <!-- ticket_id_content pop up window end  -->

// headeer Notification start 

$(document).click(function (e) {
    if (!e.target.closest("#notifiction")) {
        $(".Menu_NOtification_Wrap").removeClass("active-n");
    }

});

$("#notifiction").click(function () {
    $(".Menu_NOtification_Wrap").toggleClass("active-n");

});

// headeer Notification end

// user Notification start 

$(document).click(function (e) {
    if (!e.target.closest("#userdetails")) {
        $(".Menu_user_Wrap").removeClass("active-n");
    }

});

$("#userdetails").click(function () {
    $(".Menu_user_Wrap").toggleClass("active-n");

});

// user Notification end

// sidebar ticket view start

window.addEventListener('DOMContentLoaded', event => {

    // Toggle the side navigation
    const sidebarToggle = document.body.querySelector('#sidebarToggle');
    if (sidebarToggle) {
        // Uncomment Below to persist sidebar toggle between refreshes
        // if (localStorage.getItem('sb|sidebar-toggle') === 'true') {
        //     document.body.classList.toggle('sb-sidenav-toggled');
        // }
        sidebarToggle.addEventListener('click', event => {
            event.preventDefault();
            document.body.classList.toggle('sb-sidenav-toggled');
            localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
        });
    }

});

// sidebar ticket view end

// ticket id show and hide 

$(document).ready(function () {
    $("#buttonhideshow").click(function () {
        $(".ticket_side_show").toggle();
    });
});

// ticket id show and hide end

// add comment 

$(document).ready(function () {
    $("#addcomment").click(function () {
        $(".add_comment").toggle();
    });
});

// add comment end

// add Reassign 

$(document).ready(function () {
    $("#reassign").click(function () {
        $(".add_reassign").toggle();
    });
});
// add Reassign 


// multi select or slim select 

new SlimSelect({
    select: '#multiple'
})
new SlimSelect({
    select: '#multiple2'
})
new SlimSelect({
    select: '#multiple3'
})
// multi select or slim select end