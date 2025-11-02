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

  // ======================= Dedications Dynamic Loader =======================
  // Set this to your JSON endpoint that returns { range, majorDimension, values: [...] }
  // (Google Sheets API or Apps Script that returns the "values" matrix.)
  const DEDICATIONS_URL =
    "https://us-central1-torah-campaigns.cloudfunctions.net/donor-tally?id=1e4sQHHSWjnIoSaPZt7a2__Wq52siWNqdDlVJWe3-cZM&range=A1:I300";

  function slugify(str) {
    return String(str || "")
      .toLowerCase()
      .replace(/&/g, " and ")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .replace(/-{2,}/g, "-");
  }

  function safeInt(v) {
    if (v === null || v === undefined || v === "") return null;
    const n = Number(v);
    return isFinite(n) ? Math.floor(n) : null;
  }

  function formatMoneyShort(usd, priceType) {
    if (usd == null || isNaN(usd)) return "";
    let n = Number(usd);
    let suffix = "";
    const abs = Math.abs(n);
    if (abs >= 1_000_000) { n = n / 1_000_000; suffix = "m"; }
    else if (abs >= 1_000) { n = n / 1_000; suffix = "k"; }
    const s = (Math.round(n * 10) % 10 === 0)
      ? String(Math.round(n))
      : String(Math.round(n * 10) / 10);
    return "$" + s + suffix + (priceType === "plus" ? "+" : "");
  }

  function rowsFromGoogleValuesPayload(payload) {
    // payload.values = [ [header...], [row...], ... ]
    const values = (payload && payload.values) || [];
    if (!values.length) return [];
    const headers = values[0].map((h) => String(h || "").trim());
    return values.slice(1).map((arr) => {
      const obj = {};
      headers.forEach((h, i) => (obj[h] = arr[i] !== undefined ? arr[i] : ""));
      return obj;
    });
  }

  function normalize(rows) {
    // Expect minimal schema columns:
    // category_label, item_name, price_usd, price_type, status, availability_total, availability_reserved, notes, display_order
    return rows.map((r) => {
      const price_usd = safeInt(r.price_usd);
      const price_type = String(r.price_type || "fixed").toLowerCase() === "plus" ? "plus" : "fixed";
      const status = String(r.status || "available").toLowerCase() === "reserved" ? "reserved" : "available";
      const availability_total = safeInt(r.availability_total);
      const availability_reserved = safeInt(r.availability_reserved);
      const availability_available =
        availability_total != null ? Math.max((availability_total || 0) - (availability_reserved || 0), 0) : null;

      return {
        category_label: r.category_label || "",
        category_key: slugify(r.category_label || ""),
        item_name: r.item_name || "",
        item_key: slugify(r.item_name || ""),
        price_usd: price_usd,
        price_type: price_type,
        price_display: formatMoneyShort(price_usd, price_type),
        status: status,
        availability_total: availability_total,
        availability_reserved: availability_reserved,
        availability_available: availability_available,
        notes: r.notes || "",
        display_order: safeInt(r.display_order),
      };
    });
  }

  function groupByCategory(items) {
    const map = {};
    items.forEach((it) => {
      const key = it.category_label || "Other";
      (map[key] = map[key] || []).push(it);
    });
    Object.keys(map).forEach((k) => {
      map[k].sort((a, b) => {
        const ao = a.display_order, bo = b.display_order;
        if (ao == null && bo == null) return 0;
        if (ao == null) return 1;
        if (bo == null) return -1;
        return ao - bo;
      });
    });
    return map;
  }

  function render(root, grouped) {
    const frag = document.createDocumentFragment();
    
    // Create tab buttons container
    const tabBtns = document.createElement("div");
    tabBtns.className = "donate_tab_btns";
    
    const categories = Object.keys(grouped);
    categories.forEach((category_label, idx) => {
      const catKey = slugify(category_label);
      const btn = document.createElement("button");
      btn.className = "tab_btn" + (idx === 0 ? " active" : "");
      btn.setAttribute("data-tab", catKey);
      const h4 = document.createElement("h4");
      h4.appendChild(document.createTextNode(category_label));
      btn.appendChild(h4);
      tabBtns.appendChild(btn);
    });
    
    frag.appendChild(tabBtns);
    
    // Create tab contents container
    const tabContents = document.createElement("div");
    tabContents.className = "donation_tab_contents";
    
    const tabContentItems = document.createElement("div");
    tabContentItems.className = "donation_tab_content_items";
    
    categories.forEach((category_label, idx) => {
      const catKey = slugify(category_label);
      const tabContent = document.createElement("div");
      tabContent.className = "tab_content" + (idx === 0 ? " active" : "");
      tabContent.id = catKey;
      
      // Donation Options container
      const donationOptions = document.createElement("div");
      donationOptions.className = "donation_options";
      
      grouped[category_label].forEach((item, itemIdx) => {
        const itemId = "item_" + catKey + "_" + itemIdx;
        
        // Donation Item
        const donationItem = document.createElement("div");
        donationItem.className = "donation_item" + (item.status === "reserved" ? " reserved" : "");
        
        const input = document.createElement("input");
        input.type = "checkbox";
        input.id = itemId;
        input.name = "donation";
        input.value = item.item_name + (item.price_display ? " - " + item.price_display : "");
        if (item.status === "reserved") input.disabled = true;
        
        const label = document.createElement("label");
        label.setAttribute("for", itemId);
        if (!item.price_display) {
          label.className = "no_price";
        }
        
        const donationBox = document.createElement("span");
        donationBox.className = "donation_box";
        
        // Check if we need donation_flex wrapper (for reserved items or availability)
        if (item.status === "reserved" || item.availability_total != null) {
          const donationFlex = document.createElement("span");
          donationFlex.className = "donation_flex";
          
          const itemName = document.createElement("p");
          itemName.appendChild(document.createTextNode(item.item_name));
          donationFlex.appendChild(itemName);
          
          if (item.status === "reserved" || item.availability_total != null) {
            const seat = document.createElement("span");
            seat.className = "seat";
            if (item.status === "reserved") {
              seat.appendChild(document.createTextNode("Reserved"));
            } else if (item.availability_total != null) {
              const availText = item.availability_available + " available";
              seat.appendChild(document.createTextNode(availText));
            }
            donationFlex.appendChild(seat);
          }
          
          donationBox.appendChild(donationFlex);
        } else {
          const itemName = document.createElement("p");
          itemName.appendChild(document.createTextNode(item.item_name));
          donationBox.appendChild(itemName);
        }
        
        if (item.price_display) {
          const price = document.createElement("h5");
          price.className = "price";
          price.appendChild(document.createTextNode(item.price_display));
          donationBox.appendChild(price);
        }
        
        label.appendChild(donationBox);
        
        donationItem.appendChild(input);
        donationItem.appendChild(label);
        donationOptions.appendChild(donationItem);
      });
      
      // Add checkout button after items
      const checkoutButton = document.createElement("div");
      checkoutButton.className = "checkout_button";
      const button = document.createElement("button");
      button.setAttribute("onclick", "checkout()");
      const h5 = document.createElement("h5");
      h5.appendChild(document.createTextNode("make an impact"));
      const span = document.createElement("span");
      const img = document.createElement("img");
      img.src = "./icons/arrow.svg";
      img.alt = "";
      span.appendChild(img);
      button.appendChild(h5);
      button.appendChild(span);
      checkoutButton.appendChild(button);
      donationOptions.appendChild(checkoutButton);
      
      tabContent.appendChild(donationOptions);
      tabContentItems.appendChild(tabContent);
    });
    
    tabContents.appendChild(tabContentItems);
    frag.appendChild(tabContents);
    
    while (root.firstChild) root.removeChild(root.firstChild);
    root.appendChild(frag);
  }

  async function loadDedications() {
    const root = document.getElementById("dedications-root");
    if (!root) return;
    try {
      const res = await fetch(DEDICATIONS_URL, { cache: "no-store" });
      const ct = (res.headers.get("content-type") || "").toLowerCase();
      let rows = [];
      if (ct.indexOf("application/json") !== -1) {
        const payload = await res.json();
        rows = rowsFromGoogleValuesPayload(payload);
      } else {
        // Fallback: some endpoints return JSON as text
        const text = await res.text();
        try {
          const payload = JSON.parse(text);
          rows = rowsFromGoogleValuesPayload(payload);
        } catch (e) {
          throw new Error("Unexpected non-JSON response for dedications");
        }
      }
      const items = normalize(rows);
      const grouped = groupByCategory(items);
      render(root, grouped);
      
      // Re-initialize tab functionality for dynamically loaded tabs
      initializeDedicationTabs();
    } catch (err) {
      console.error("Dedications render error:", err);
      if (root) root.innerHTML = "<div class='dedications-error'>Unable to load dedications.</div>";
    }
  }

  function initializeDedicationTabs() {
    const dedicationTabGroup = document.querySelector("#dedications-root");
    if (!dedicationTabGroup) return;
    
    const buttons = dedicationTabGroup.querySelectorAll(".tab_btn");
    const contents = dedicationTabGroup.querySelectorAll(".tab_content");

    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        const tabId = button.getAttribute("data-tab");

        // Remove active class from all buttons and contents
        buttons.forEach((btn) => {
          btn.classList.remove("active");
        });
        contents.forEach((content) => {
          content.classList.remove("active");
        });

        // Add active class to the clicked button and corresponding content
        button.classList.add("active");
        const targetContent = document.getElementById(tabId);
        if (targetContent) {
          targetContent.classList.add("active");
        }
      });
    });
  }

  loadDedications();

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

// Checkout Button
function checkout() {
  const selectedItems = document.querySelectorAll(
    'input[name="donation"]:checked',
  );
  const selectedValues = [];
  selectedItems.forEach((item) => {
    selectedValues.push(item.value);
  });
  console.log("Selected Donation Items:", selectedValues);

  basicLightbox.create(`
    <iframe src="https://www.chabadch.com/templates/articlecco_cdo/aid/7074383/jewish/Building-Campaign.htm" width="560" height="90%" frameborder="0"></iframe>
  `).show();

  setTimeout(() => {
    const iframe = document.querySelector('.basicLightbox__content iframe');
    iframe.contentWindow.postMessage(selectedValues, '*');
  }, 1000);
}
