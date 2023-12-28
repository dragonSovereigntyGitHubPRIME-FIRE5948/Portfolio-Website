$(document).ready(function () {


    $.fn.isInViewport = function () {
        let elementTop = $(this).offset().top;
        let elementBottom = elementTop + $(this).outerHeight();

        let viewportTop = $(window).scrollTop();
        let viewportBottom = viewportTop + window.innerHeight; // <-- here

        return elementBottom > viewportTop && elementTop < viewportBottom;
    };

    $(window).scroll(function () {
        if ($('#Home-Hero .CTAGroup').isInViewport()) {
            $('nav').slideUp();
        } else {
            $('nav').slideDown();
        }
    });

    if ($('#Home-Hero .CTAGroup').isInViewport()) {
        $('nav').hide();
    } else {
        $('nav').show();
    }


    $("#Nav-Home").click(function () {
        // $("html, body").animate(
        //     {
        //         // scrollTop: $("#Home-Hero").offset().top
        //         scrollTop: '100000px'
        //     },
        //     100000 //speed   
        // );

        $(window).scrollTop(3000);
    });


    var homeExperiencesRowContainerClass = $(".Experiences__Row");
    var height = $(".Experiences__Container").height();
    var previoush = 0;
    var arrayPreviousHeights = [];
    var noOfExpandedRows = 0;

    $('.Timeline__line').css("height", height + "px");

    homeExperiencesRowContainerClass.click(function () {

        // arrow flip
        $(this).find('.Experiences__row-arrow').toggleClass("flip-anim");

        // prevent spam clicks
        homeExperiencesRowContainerClass.css("pointer-events", "none");

        if ($(this).find(".expandable-row").css("display") == "none") {
            // add height before row expands
            arrayPreviousHeights.push(previoush = $(".Experiences__Container").height());

            //  slideDown func
            $(this).find(".expandable-row").slideDown({
                duration: 700,
                start: function () {
                    height = $(".Experiences__Container").height()
                    $('.Timeline__line').css("height", height + "px");
                },
                complete: function () {
                    homeExperiencesRowContainerClass.css("pointer-events", "auto");
                }
            });
        }
        else {
            // get number of expanded rows
            noOfExpandedRows = $('.expandable-row:visible');
            // slideUp func
            $(this).find(".expandable-row").slideUp({
                duration: 700,
                start: function () {
                    $('.Timeline__line').css("height", arrayPreviousHeights.at(noOfExpandedRows.length - 1) + "px");
                    arrayPreviousHeights.splice(noOfExpandedRows.length - 1);
                },
                complete: function () {
                    homeExperiencesRowContainerClass.css("pointer-events", "auto");
                }
            });
        }

        // toggle 'expanded row text' fade in anim
        $(this).find('p').toggleClass("fade-down-anim");
    });



    // Tab
    var aboutTabItem = $("#Home-About .Home-TabItemContainer");
    var projectsTabItem = $("#Home-Works .Home-TabItemContainer");
    var experiencesTabItem = $("#Home-Experiences .Home-TabItemContainer");
    var aboutSectionId = '#Home-About';
    var projectsSectionId = '#Home-Works';
    var experiencesSectionId = '#Home-Experiences';

    onClickTabitem(aboutTabItem, aboutSectionId)
    onClickTabitem(projectsTabItem, projectsSectionId)
    onClickTabitem(experiencesTabItem, experiencesSectionId)


    var windowWidth = 0;
    // var sectionWidth = 0;
    var contentWidth = 0;
    var colGap = 0;
    var titleWidth = 0;
    var remainder = 0;
    var change = 0;
    var headerWidth = 0;
    var tabitemsWidth = 0;


    // alert(change)

    $('.ProjectCard').hover(
        function () {
            // section width
            // sectionWidth = $('section#Home-Works').width();
            // viewport width
            windowWidth = window.innerWidth;
            // content width
            contentWidth = $('#Home-Works .SectionContainer').width();
            colGap = $('.SectionContainer').css('column-gap').replace('p', '').replace('x', '');
            //title width
            titleWidth = $('#Home-Works .SectionContainer__title').width();
            // remainder
            // remainder = (sectionWidth - contentWidth) / 2;
            remainder = (windowWidth - contentWidth) / 2;
            // change
            change = contentWidth - titleWidth - colGap + remainder;

            // don't change
            headerWidth = $('.SectionContainer__content > .Header').width();
            tabitemsWidth = $('.SectionContainer__content > .Tab-Items').width();


            $('#Home-Works .ProjectsContainer').css("width", change + "px");


            $('#Home-Works .ProjectCard').not(this).css({
                "flex-basis": "21%",
                "opacity": "0.3"
            });

            $('.SectionContainer__content > .Header').css('width', headerWidth + 'px')
            $('.SectionContainer__content > .Tab-Items').css('width', tabitemsWidth + 'px')
            // $(this).css({
            //     // 'flex-grow': '1',
            //     // 'transition': '0.5s ease-in-out'
            // });
        },
        function () {
            $('#Home-Works .ProjectsContainer').css("width", "100%");
            $('#Home-Works .ProjectCard').css({
                "flex-basis": "33%",
                "opacity": "1"
            });

            $('.SectionContainer__content > .Header').css('width', '100%')
            $('.SectionContainer__content > .Tab-Items').css('width', '100%')
            // $(this).css({
            //     // 'flex-grow': '1',
            //     // 'transition': 'none'
            // });        
        });
});


function onClickTabitem(tabItem, sectionId) {
    tabItem.click(function () {
        // get id of tab item
        var id = $(this).find('.StampHoverFiller>h3').text().toString().toLowerCase().replace(/[^A-Za-z]/g, "");
        // remove 'active' class from containers
        $(sectionId + ' .Stamp-SvgContainer').removeClass('active')
        $(this).find('.Stamp-SvgContainer').addClass('active')
        // remove 'active' class from fillers
        $(sectionId + ' .StampHoverFiller').removeClass('active')
        $(this).find('.StampHoverFiller').addClass('active')
        // change content
        $(sectionId + ' .Tab-Content__container').removeClass('active');
        $(sectionId + '-TabContent__' + id + '.Tab-Content__container').addClass('active');
    });
}