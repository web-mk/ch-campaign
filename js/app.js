document.addEventListener("DOMContentLoaded", function () {
  // Check if we're on the About page (use your page identifier here)
  const isAboutPage = document.body.classList.contains("about");

  // ===============================
  // Tabs Functionality (Both Pages)
  // ===============================

  const tabGroups = document.querySelectorAll(".tab_group");

  tabGroups.forEach((group) => {
    const buttons = group.querySelectorAll(".tab_btn");
    const contents = group.querySelectorAll(".tab_content");

    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        const tabId = button.getAttribute("data-tab");

        // Remove active class from all buttons and contents in this group
        buttons.forEach((btn) => {
          btn.classList.remove("active");
        });
        contents.forEach((content) => {
          content.classList.remove("active");
        });

        // Add active class to the clicked button and corresponding content
        button.classList.add("active");
        document.getElementById(tabId).classList.add("active");
      });
    });
  });

  // ===========================
  // Tabs Gallery Carousel (Both Pages)
  // ===========================

  document
    .querySelectorAll(".tabs_gallery_carousel")
    .forEach((carousel, index) => {
      var tabsGallerySlider = tns({
        container: carousel,
        items: 1,
        gutter: 0,
        slideBy: "1",
        speed: 800,
        edgePadding: 0,
        loop: true,
        autoplay: true,
        autoplayTimeout: 2000,
        mouseDrag: true,
        nav: false,
        controls: false,
        autoplayButtonOutput: false,
        autoplayHoverPause: true,
        easing: "ease-in-out",
      });

      // Progress bar selector for each instance
      const progressBarSelector = `.tab_progress[data-carousel-index="${index}"] .progress`;

      // Update Progress Bar for each tabs_gallery_carousel
      function updateProgressBar(slider) {
        const totalSlides = slider.getInfo().slideCount;
        const currentIndex = slider.getInfo().displayIndex;

        const progressPercentage =
          ((currentIndex - 1) / (totalSlides - 1)) * 100;
        const progressBar = document.querySelector(progressBarSelector);

        if (progressBar) {
          progressBar.style.width = progressPercentage + "%";
        }
      }

      // Attach progress bar update function to the 'indexChanged' event
      tabsGallerySlider.events.on("indexChanged", () =>
        updateProgressBar(tabsGallerySlider),
      );

      // Custom navigation buttons for each tabs_gallery_carousel
      const prevButtonTabGallery = document.querySelector(
        `.slider__arrow--prev[data-carousel-index="${index}"]`,
      );
      const nextButtonTabGallery = document.querySelector(
        `.slider__arrow--next[data-carousel-index="${index}"]`,
      );

      // Event listeners for navigation
      if (prevButtonTabGallery && nextButtonTabGallery) {
        prevButtonTabGallery.addEventListener("click", () => {
          tabsGallerySlider.goTo("prev");
          updateProgressBar(tabsGallerySlider);
        });

        nextButtonTabGallery.addEventListener("click", () => {
          tabsGallerySlider.goTo("next");
          updateProgressBar(tabsGallerySlider);
        });
      }

      // Pause and resume autoplay for each tabs_gallery_carousel on hover
      carousel.addEventListener("mouseenter", () => tabsGallerySlider.pause());
      carousel.addEventListener("mouseleave", () => tabsGallerySlider.play());

      // Pause and resume autoplay for the navigation arrows of each tabs_gallery_carousel
      if (prevButtonTabGallery && nextButtonTabGallery) {
        [prevButtonTabGallery, nextButtonTabGallery].forEach((button) => {
          button.addEventListener("mouseenter", () =>
            tabsGallerySlider.pause(),
          );
          button.addEventListener("mouseleave", () => tabsGallerySlider.play());
        });
      }
    });

  // ============================
  // Initialize Sliders (Only on About Page)
  // ============================

  if (isAboutPage) {
    // Initialize Tiny Slider for timeline_slider if it exists on the page
    const timelineContainer = document.querySelector(".timeline_slider");
    if (timelineContainer) {
      var timelineSlider = tns({
        container: ".timeline_slider",
        items: 3.5,
        gutter: 0,
        slideBy: "1",
        speed: 800,
        edgePadding: 0,
        loop: true,
        autoplay: false,
        autoplayTimeout: 2000,
        mouseDrag: true,
        nav: false,
        controls: false,
        autoplayButtonOutput: false,
        autoplayHoverPause: true,
        easing: "ease-in-out",
        responsive: {
          100: { items: 1.3 },
          768: { items: 2.3 },
          901: { items: 2.4 },
          1024: { items: 3.5 },
        },
      });
    }

    // Initialize Tiny Slider for gallery_carousel if it exists on the page
    const galleryContainer = document.querySelector(".gallery_carousel");
    if (galleryContainer) {
      var gallerySlider = tns({
        container: ".gallery_carousel",
        gutter: 20,
        slideBy: "1",
        speed: 800,
        edgePadding: 50,
        loop: true,
        autoWidth: true,
        autoplay: true,
        autoplayTimeout: 2000,
        mouseDrag: true,
        nav: false,
        controls: false,
        autoplayButtonOutput: false,
        autoplayHoverPause: true,
        easing: "ease-in-out",
        lazyload: true,
      });
    }

    // Initialize Tiny Slider for growth_carousel on mobile view if it exists on the page
    const growthContainer = document.querySelector(".growth_carousel");
    const initializeGrowthSlider = () => {
      if (window.innerWidth < 768 && growthContainer) {
        var growthSlider = tns({
          container: ".growth_carousel",
          gutter: 0,
          slideBy: "1",
          speed: 800,
          edgePadding: 20,
          loop: true,
          autoWidth: true,
          autoplay: true,
          autoplayTimeout: 2000,
          mouseDrag: true,
          nav: false,
          controls: false,
          autoplayButtonOutput: false,
          autoplayHoverPause: true,
          easing: "ease-in-out",
          lazyload: true,
        });
      }
    };

    initializeGrowthSlider();
    window.addEventListener("resize", initializeGrowthSlider);

    // Update Progress Bar for timeline_slider
    function updateProgressBar(slider, progressBarSelector) {
      const totalSlides = slider.getInfo().slideCount;
      const currentIndex = slider.getInfo().displayIndex;

      const progressPercentage = ((currentIndex - 1) / (totalSlides - 1)) * 100;
      const progressBar = document.querySelector(progressBarSelector);

      if (progressBar) {
        progressBar.style.width = progressPercentage + "%";
      }
    }

    // Attach the progress bar update function for timeline_slider
    timelineSlider.events.on("indexChanged", () =>
      updateProgressBar(timelineSlider, ".timeline_progress .progress"),
    );

    // Function to toggle active class on arrows
    function setActiveArrow(slider, prevButton, nextButton) {
      const currentIndex = slider.getInfo().displayIndex;

      // Remove active class from both buttons
      prevButton.classList.remove("active");
      nextButton.classList.remove("active");

      // Add active class to the respective button based on the current index
      if (currentIndex === 1) {
        prevButton.classList.add("active");
      } else if (currentIndex === slider.getInfo().slideCount) {
        nextButton.classList.add("active");
      }
    }

    // Custom navigation buttons for timeline_slider
    const prevButtonTimeline = document.querySelector(
      ".slider__arrow--prev.timeline_arrow",
    );
    const nextButtonTimeline = document.querySelector(
      ".slider__arrow--next.timeline_arrow",
    );

    if (prevButtonTimeline && nextButtonTimeline) {
      prevButtonTimeline.addEventListener("click", () => {
        timelineSlider.goTo("prev");
        updateProgressBar(timelineSlider, ".timeline_progress .progress");
        setActiveArrow(timelineSlider, prevButtonTimeline, nextButtonTimeline);
      });

      nextButtonTimeline.addEventListener("click", () => {
        timelineSlider.goTo("next");
        updateProgressBar(timelineSlider, ".timeline_progress .progress");
        setActiveArrow(timelineSlider, prevButtonTimeline, nextButtonTimeline);
      });

      setActiveArrow(timelineSlider, prevButtonTimeline, nextButtonTimeline);
    }

    // Custom navigation buttons for gallery_carousel
    const prevButtonGallery = document.querySelector(
      ".slider__arrow--prev.gallery_arrow",
    );
    const nextButtonGallery = document.querySelector(
      ".slider__arrow--next.gallery_arrow",
    );

    if (prevButtonGallery && nextButtonGallery) {
      prevButtonGallery.addEventListener("click", () => {
        gallerySlider.goTo("prev");
        setActiveArrow(gallerySlider, prevButtonGallery, nextButtonGallery);
      });

      nextButtonGallery.addEventListener("click", () => {
        gallerySlider.goTo("next");
        setActiveArrow(gallerySlider, prevButtonGallery, nextButtonGallery);
      });

      setActiveArrow(gallerySlider, prevButtonGallery, nextButtonGallery);
    }

    // General hover effect for all navigation arrows
    const arrows = document.querySelectorAll(".nav_arrow");

    arrows.forEach((arrow) => {
      arrow.addEventListener("mouseenter", () => {
        arrow.classList.add("hovered");
      });

      arrow.addEventListener("mouseleave", () => {
        arrow.classList.remove("hovered");
      });
    });

    // Pause and resume autoplay on hover for timeline and gallery sliders
    const timelineCarousel = document.querySelector(".timeline_slider");
    const galleryCarousel = document.querySelector(".gallery_carousel");

    if ((timelineCarousel || galleryCarousel) && arrows.length) {
      [timelineCarousel, galleryCarousel, ...arrows].forEach((element) => {
        element.addEventListener("mouseenter", () => {
          timelineSlider.pause();
          gallerySlider.pause();
        });

        element.addEventListener("mouseleave", () => {
          timelineSlider.play();
          gallerySlider.play();
        });
      });
    }
  }

  // =======================
  // Navigation Menu (Both Pages)
  // =======================
  const navMenu = () => {
    const topBurger = document.querySelector(".top_burger");
    const mainBurger = document.querySelector(".main_burger");
    const topNav = document.querySelector(".top_nav");
    const mainNav = document.querySelector(".main_nav");
    const body = document.querySelector("body");
    const menuLinks = document.querySelectorAll("nav ul li a");

    const toggleNav = (burger, nav) => {
      burger.addEventListener("click", () => {
        nav.classList.toggle("nav_active");
        burger.classList.toggle("togglemenu");
        body.classList.toggle("no_overflow");
      });

      menuLinks.forEach((menuLink) => {
        menuLink.addEventListener("click", () => {
          nav.classList.remove("nav_active");
          burger.classList.remove("togglemenu");
          body.classList.remove("no_overflow");
        });
      });
    };

    toggleNav(topBurger, topNav);
    toggleNav(mainBurger, mainNav);
  };

  navMenu();
});
