const delay = 400

window.addEventListener('DOMContentLoaded', function() {

    // Меню

    const menu = document.querySelector('.header__menu')
    const header = document.querySelector('.header')
    let lock = false
    const burger = document.querySelector('.header__burger')

    burger.addEventListener('click', function() {

        if (lock) return

        lock = true

        toggleMenu()

        setTimeout(() => {
            lock = false
        }, delay)
    })

    function toggleMenu() {
        burger.classList.toggle('active')
        menu.classList.toggle('active')
        header.classList.toggle('active')
        lockBody()
    }


    function lockBody() {
        const scrollWidth = window.innerWidth - document.body.clientWidth

        document.body.classList.toggle('lock')

        document.body.style.paddingRight = scrollWidth + 'px'
    }

    header.addEventListener('click', function(e) {
        if (
            document.querySelector('.header__menu.active')
            && !e.target.closest('.header__burger')
        ) {
            toggleMenu()
        }
    })


    const casesSlider = new Swiper('.cases__slider', {
        spaceBetween: 16,
        slidesPerView: 1,
        centeredSlides: true,
        speed: 1000,

        breakpoints: {
            991.98: {
                slidesPerView: 'auto',
            }
            // 1300.98: {
            //
            //     slidesPerGroup: 5
            // },
            // 767.98: {
            //     slidesPerGroup: 4,
            //
            // },
            // 575.98: {
            //     slidesPerGroup: 3,
            // }
        },

        navigation: {
            nextEl: '.cases__next',
            prevEl: '.cases__prev'
        },
    })

    fixHeader()
    function fixHeader() {
        if (document.body.scrollTop > 10 && !header.classList.contains('fix')) {
            header.classList.add('fix')
        }
        if (document.body.scrollTop <= 0 && header.classList.contains('fix')) {
            header.classList.remove('fix')
        }
    }

    window.addEventListener('scroll', fixHeader)


    const animItems = document.querySelectorAll('.anim-items');

    if (animItems.length > 0) {
        window.addEventListener('scroll', animOnScroll);
        function animOnScroll() {
            for (let index = 0; index < animItems.length; index++) {
                const animItem = animItems[index];
                const animItemHeight = animItem.offsetHeight;
                const animItemOffset = offset(animItem).top;
                const animStart = 10;

                let animItemPoint = window.innerHeight - animItemHeight / animStart;
                if (animItemHeight > window.innerHeight) {
                    animItemPoint = window.innerHeight - window.innerHeight / animStart;
                }

                if (
                    pageYOffset > animItemOffset - animItemPoint &&
                    pageYOffset < animItemOffset + animItemHeight
                ) {
                    animItem.classList.add('active');
                }
            }
        }
        function offset(el) {
            const rect = el.getBoundingClientRect();
            const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
        }
        setTimeout(() => {
            animOnScroll();
        }, 400);
    }
})
