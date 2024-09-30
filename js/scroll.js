// smooth scroll
gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.defaults({
  scroller: '[data-scroll-container]',
  markers: false
});

function runForWider() {
  if (window.innerWidth >= 768) {
    
    var scroll = new LocomotiveScroll( {
      el: document.querySelector( '[data-scroll-container]' ),
      smooth: true,
      multiplier: 1.2,
      getDirection: true,
      mobile: {
          breakpoint: 0,
          smooth: false,
          smoothMobile: false,
        },
        tablet: {
          breakpoint: 0,
          smooth: true,
          multiplier: 2,
          gestureDirection: 'vertical',
        },
    });

    // Update body height when DOM elements change height
    new ResizeObserver(() => scroll.update()).observe(
      document.querySelector("[data-scroll-container]")
    );

    // Smooth Scroll after click nav link
    const anchorLinks = document.querySelectorAll('a[href^=\\#]:not([href$=\\#])');

    anchorLinks.forEach((anchorLink) => {
      let hashval = anchorLink.getAttribute('href');
      let target = document.querySelector(hashval);

      anchorLink.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();

        scroll.scrollTo(target);
      });
    });

    // Handle animations for the animated_section
    ScrollTrigger.create({
      trigger: '#motto',
      start: 'top center',
      end: 'bottom center',
      onEnter: () => {
          document.querySelector('.animated_section').classList.add('in_view');
          document.querySelectorAll('.motto_heading').forEach((heading) => {
              heading.classList.add('in_view');
          });
      },
      onLeaveBack: () => {
          document.querySelector('.animated_section').classList.remove('in_view');
          document.querySelectorAll('.motto_heading').forEach((heading) => {
              heading.classList.remove('in_view');
          });
      },
    });

    // Update scroll position
    scroll.on( 'scroll', ( instance ) => {
      ScrollTrigger.update();
      document.documentElement.setAttribute( 'data-scrolling', instance.direction );
    });

    // Scroll position for ScrollTrigger
    ScrollTrigger.scrollerProxy( '[data-scroll-container]', {
      scrollTop( value ) {
          return arguments.length ? scroll.scrollTo( value, 0, 0 ) : scroll.scroll.instance.scroll.y;
      },
      getBoundingClientRect() {
          return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
      },
      pinType: document.querySelector( '[data-scroll-container]' ).style.transform ? "transform" : "fixed"
    });

    ScrollTrigger.addEventListener( 'refresh', () => scroll.update() );
    ScrollTrigger.refresh();

  }
  else {

  };

};

runForWider();

window.addEventListener('resize', function() {
  runForWider();
});