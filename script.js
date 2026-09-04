/**
 * GEETANJALI BHARPOOR — OFFICIAL SCRIPT
 * Centralized Configuration Hub & Smooth Micro-Interactions
 */

// ==========================================================================
// 1. Centralized Brand Configuration
// Update these values anytime — all links & contact references update across the site
// ==========================================================================
const GB_CONFIG = {
  brandName: "Geetanjali Bharpoor",
  tagline: "Homemade Goodness. Protein-Packed Nutrition.",
  
  // Primary Direct Order Phone Number
  phoneNumber: "9667376816",
  phoneFormatted: "+91 96673 76816",
  
  // WhatsApp Contact (with country code, no symbols)
  whatsappNumber: "919667376816",
  
  // Instagram Profile Link
  instagramUrl: "https://www.instagram.com/geetanjalibharpoor?igsi=MzZ1eGszNXYydm5i",
  instagramHandle: "@geetanjalibharpoor"
};

// ==========================================================================
// 2. DOM Initialization & Link Synchronization
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  initContactLinks();
  initHeaderScroll();
  initMobileDrawer();
  initSmoothScroll();
  initScrollAnimations();
});

/**
 * Ensures all phone, WhatsApp, and Instagram links reflect GB_CONFIG
 */
function initContactLinks() {
  // Sync all elements with data-sync="phone-link"
  document.querySelectorAll('[data-sync="phone-link"]').forEach(el => {
    el.setAttribute('href', `tel:${GB_CONFIG.phoneNumber}`);
  });

  // Sync all elements with data-sync="phone-text"
  document.querySelectorAll('[data-sync="phone-text"]').forEach(el => {
    el.textContent = GB_CONFIG.phoneFormatted;
  });

  // Sync all elements with data-sync="instagram-link"
  document.querySelectorAll('[data-sync="instagram-link"]').forEach(el => {
    el.setAttribute('href', GB_CONFIG.instagramUrl);
  });

  // Setup default pre-filled WhatsApp redirect message
  const defaultWaMessage = encodeURIComponent(
    "Hi Geetanjali Bharpoor! I would like to place an order for Geetanjali Bharpoor Nutrition Powder. Please share the pack details and delivery options."
  );
  const defaultWaUrl = `https://wa.me/${GB_CONFIG.whatsappNumber}?text=${defaultWaMessage}`;

  document.querySelectorAll('a.btn-whatsapp').forEach(el => {
    if (!el.hasAttribute('data-order-pack')) {
      el.setAttribute('href', defaultWaUrl);
    }
  });

  // Sync elements with data-sync="whatsapp-link"
  document.querySelectorAll('[data-sync="whatsapp-link"]').forEach(el => {
    el.setAttribute('href', defaultWaUrl);
    el.setAttribute('target', '_blank');
    el.setAttribute('rel', 'noopener');
  });

  // Setup WhatsApp ordering with pre-filled messages for pack buttons (no prices)
  document.querySelectorAll('[data-order-pack]').forEach(btn => {
    const packName = btn.getAttribute('data-order-pack') || 'Pack';
    const message = encodeURIComponent(
      `Hi Geetanjali Bharpoor! I would like to order the ${packName}. Please share the payment and delivery details.`
    );
    const waUrl = `https://wa.me/${GB_CONFIG.whatsappNumber}?text=${message}`;
    btn.setAttribute('href', waUrl);
    btn.setAttribute('target', '_blank');
    btn.setAttribute('rel', 'noopener');
  });
}

/**
 * Sticky Header Scroll State
 */
function initHeaderScroll() {
  const header = document.getElementById('main-header');
  if (!header) return;

  let ticking = false;
  const onScroll = () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        if (window.scrollY > 30) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
        ticking = false;
      });
      ticking = true;
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/**
 * Mobile Drawer Menu Open/Close
 */
function initMobileDrawer() {
  const menuToggle = document.getElementById('menu-toggle');
  const menuClose = document.getElementById('menu-close');
  const drawerBackdrop = document.getElementById('drawer-backdrop');
  const drawerLinks = document.querySelectorAll('.drawer-link');

  if (!menuToggle || !drawerBackdrop) return;

  const openDrawer = () => {
    drawerBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    drawerBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  };

  menuToggle.addEventListener('click', openDrawer);
  if (menuClose) menuClose.addEventListener('click', closeDrawer);

  // Close when tapping outside the drawer
  drawerBackdrop.addEventListener('click', (e) => {
    if (e.target === drawerBackdrop) {
      closeDrawer();
    }
  });

  // Close when clicking any nav link in drawer
  drawerLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });
}

/**
 * Smooth In-Page Anchor Scrolling with Header Offset
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = 76;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/**
 * IntersectionObserver for Smooth Scroll Reveal Animations
 */
function initScrollAnimations() {
  // Check user preference for reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    document.querySelectorAll('.reveal-on-scroll').forEach(el => {
      el.classList.add('is-revealed');
    });
    return;
  }

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  document.querySelectorAll('.reveal-on-scroll').forEach(el => {
    revealObserver.observe(el);
  });
}
