/* P.H. Foods — main.js */

// ── Mobile nav ──────────────────────────────────────────
const hamburger = document.querySelector('.hamburger');
const mobileNav = document.querySelector('.mobile-nav');

if (hamburger && mobileNav) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileNav.classList.toggle('open');
  });
}

// ── Active nav link ─────────────────────────────────────
(function () {
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-list a, .mobile-nav a').forEach(a => {
    const href = a.getAttribute('href') || '';
    if (href && href !== '#' && page.startsWith(href.split('#')[0])) {
      a.classList.add('active');
    }
  });
})();

// ── FAQ accordion ───────────────────────────────────────
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const wasOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(el => el.classList.remove('open'));
    if (!wasOpen) item.classList.add('open');
  });
});

// ── Career accordion ────────────────────────────────────
document.querySelectorAll('.job-header').forEach(btn => {
  btn.addEventListener('click', () => {
    const card = btn.closest('.job-card');
    const wasOpen = card.classList.contains('open');
    document.querySelectorAll('.job-card.open').forEach(el => el.classList.remove('open'));
    if (!wasOpen) card.classList.add('open');
  });
});

// ── TVC playlist ────────────────────────────────────────
const videoIds = {
  rodo:     'h0ULNZcbk7E',
  ad43:     'RwUH0VMZbPE',
  ad42:     'AECMBRzewsI',
  ad33:     'hNAq_KWM-P4',
  ad28:     'aFgqWkjVDHU',
  ad10:     'jSsx6off-3Y',
};

const mainFrame  = document.getElementById('main-tvc-frame');
const mainTitle  = document.getElementById('main-tvc-title');
const thumbBtns  = document.querySelectorAll('.tvc-thumb[data-video]');

function loadVideo(id, title, btn) {
  if (!mainFrame) return;
  mainFrame.src = `https://www.youtube.com/embed/${id}?rel=0&autoplay=1`;
  if (mainTitle) mainTitle.textContent = title || '';
  thumbBtns.forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
}

thumbBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    loadVideo(btn.dataset.video, btn.dataset.title, btn);
  });
});

// set first thumb active on load
if (thumbBtns.length) thumbBtns[0].classList.add('active');

// ── Product flavor filter ────────────────────────────────
const filterBtns  = document.querySelectorAll('[data-filter]');
const productCards = document.querySelectorAll('[data-flavor]');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const f = btn.dataset.filter;
    productCards.forEach(card => {
      const show = f === 'all' || card.dataset.flavor === f;
      card.style.display = show ? '' : 'none';
    });
  });
});

// ── Fade-up on scroll ────────────────────────────────────
if ('IntersectionObserver' in window) {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('fade-up');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll(
    '.product-card, .activity-card, .policy-item, .cert-card, .value-card, .tip-card, .job-card'
  ).forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity .45s ease, transform .45s ease';
    obs.observe(el);
    el.addEventListener('animationend', () => {
      el.style.opacity = '';
      el.style.transform = '';
    }, { once: true });
  });

  const io2 = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.opacity = '1';
        e.target.style.transform = 'translateY(0)';
        io2.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll(
    '.product-card, .activity-card, .policy-item, .cert-card, .value-card, .tip-card, .job-card'
  ).forEach(el => io2.observe(el));
}

// ── Language switcher ────────────────────────────────────
(function () {
  const NAV_EN = {
    'เกี่ยวกับเรา':'About Us','ผลิตภัณฑ์':'Products','ทีมงาน':'Team',
    'โฆษณา':'Advertising','คำถาม':'FAQ','ติดต่อเรา':'Contact Us','ร่วมงาน':'Careers',
    'ข้อมูลบริษัท':'Company Info','นโยบาย':'Policy','มาตรฐานที่ได้รับ':'Certifications',
    'สินค้าปูไทย':'Pu Thai Snacks','สินค้าใหม่':'New Products',
    'TVC โฆษณา':'TVC Commercials','กิจกรรม':'Activities','ถาม-ตอบ':'Q&A','เกร็ดน่ารู้':'Tips & Info',
    '↳ ข้อมูลบริษัท':'↳ Company Info','↳ นโยบาย':'↳ Policy','↳ มาตรฐานที่ได้รับ':'↳ Certifications',
    '↳ สินค้าปูไทย':'↳ Pu Thai Snacks','↳ TVC โฆษณา':'↳ TVC Ads','↳ กิจกรรม':'↳ Activities',
    '↳ ถาม-ตอบ':'↳ Q&A','↳ เกร็ดน่ารู้':'↳ Tips & Info',
  };
  const FOOTER_EN = { 'เมนู':'Menu','สินค้า':'Products','ติดต่อ':'Contact' };
  const FOOTER_LINK_EN = {
    'เกี่ยวกับเรา':'About Us','ผลิตภัณฑ์':'Products','ทีมงาน':'Team',
    'โฆษณา':'Advertising','คำถาม':'FAQ','ติดต่อเรา':'Contact Us','ร่วมงาน':'Careers',
    'ปูไทย รสพริกไทยดำ':'Pu Thai Black Pepper','ปูไทย รสปลาหมึก':'Pu Thai Squid',
    'ปูไทย รสไก่อบ':'Pu Thai Roasted Chicken','ปูไทย กลิ่นรสสาหร่าย':'Pu Thai Seaweed',
    'ปูไทย เคลือบช็อคโกแลต':'Pu Thai Chocolate',
  };

  function applyLang(lang) {
    document.querySelectorAll('.lang-btn').forEach(b =>
      b.classList.toggle('active', b.textContent.trim() === lang.toUpperCase())
    );
    document.querySelectorAll('.nav-list a, .mobile-nav a').forEach(a => {
      if (!a.dataset.th) a.dataset.th = a.textContent.trim();
      a.textContent = lang === 'en' ? (NAV_EN[a.dataset.th] || a.dataset.th) : a.dataset.th;
    });
    document.querySelectorAll('[data-en]').forEach(el => {
      if (!el.dataset.th) el.dataset.th = el.innerHTML;
      el.innerHTML = lang === 'en' ? el.dataset.en : el.dataset.th;
    });
    document.querySelectorAll('.footer-col h5').forEach(el => {
      if (!el.dataset.th) el.dataset.th = el.textContent.trim();
      el.textContent = lang === 'en' ? (FOOTER_EN[el.dataset.th] || el.dataset.th) : el.dataset.th;
    });
    document.querySelectorAll('.footer-col a').forEach(a => {
      if (!a.dataset.th) a.dataset.th = a.textContent.trim();
      a.textContent = lang === 'en' ? (FOOTER_LINK_EN[a.dataset.th] || a.dataset.th) : a.dataset.th;
    });
    const yr = new Date().getFullYear();
    document.querySelectorAll('.footer-bottom p').forEach(el => {
      if (!el.dataset.th) el.dataset.th = el.textContent.trim();
      el.textContent = lang === 'en'
        ? `© ${yr} P.H. Foods Co., Ltd. · All rights reserved`
        : `© ${yr} บริษัท พี.เอช.ฟู้ดส์ จำกัด · All rights reserved`;
    });
    document.querySelectorAll('.search-wrap input').forEach(el => {
      el.placeholder = lang === 'en' ? 'Search…' : 'ค้นหา / Search…';
    });
    localStorage.setItem('ph_lang', lang);
    document.documentElement.lang = lang === 'en' ? 'en' : 'th';
  }

  document.querySelectorAll('.lang-btn').forEach(btn =>
    btn.addEventListener('click', () => applyLang(btn.textContent.trim().toLowerCase()))
  );

  const saved = localStorage.getItem('ph_lang');
  if (saved && saved !== 'th') applyLang(saved);
})();

// ── Smooth counter animation (home stats) ────────────────
function animateCount(el, target, duration = 1800) {
  let start = null;
  const step = ts => {
    if (!start) start = ts;
    const progress = Math.min((ts - start) / duration, 1);
    const val = Math.floor(progress * target);
    el.textContent = val.toLocaleString() + (el.dataset.suffix || '');
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target.toLocaleString() + (el.dataset.suffix || '');
  };
  requestAnimationFrame(step);
}

const statNums = document.querySelectorAll('.stat-num[data-count]');
if (statNums.length && 'IntersectionObserver' in window) {
  const cObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        animateCount(e.target, +e.target.dataset.count);
        cObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });
  statNums.forEach(el => cObs.observe(el));
}
