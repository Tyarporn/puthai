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

// ── Site search ─────────────────────────────────────────
(function () {
  const INDEX = [
    { th: 'ปูไทย รสพริกไทยดำ',            en: 'Pu Thai Black Pepper',          href: 'products.html', cat_th: 'สินค้า',   cat_en: 'Products' },
    { th: 'ปูไทย รสปลาหมึก',               en: 'Pu Thai Squid',                 href: 'products.html', cat_th: 'สินค้า',   cat_en: 'Products' },
    { th: 'ปูไทย รสไก่อบ',                 en: 'Pu Thai Roasted Chicken',       href: 'products.html', cat_th: 'สินค้า',   cat_en: 'Products' },
    { th: 'ปูไทย กลิ่นรสสาหร่าย',          en: 'Pu Thai Seaweed',               href: 'products.html', cat_th: 'สินค้า',   cat_en: 'Products' },
    { th: 'ปูไทย เคลือบช็อคโกแลต',         en: 'Pu Thai Chocolate',             href: 'products.html', cat_th: 'สินค้า',   cat_en: 'Products' },
    { th: 'เกี่ยวกับเรา / ข้อมูลบริษัท',   en: 'About Us / Company Info',       href: 'about.html',    cat_th: 'หน้า',     cat_en: 'Pages' },
    { th: 'นโยบายบริษัท',                  en: 'Company Policy',                href: 'about.html#policy',       cat_th: 'หน้า', cat_en: 'Pages' },
    { th: 'มาตรฐานที่ได้รับ',              en: 'Certifications',                href: 'about.html#certificate',  cat_th: 'หน้า', cat_en: 'Pages' },
    { th: 'ผลิตภัณฑ์ทั้งหมด',              en: 'All Products',                  href: 'products.html', cat_th: 'หน้า',     cat_en: 'Pages' },
    { th: 'ทีมงาน',                        en: 'Our Team',                      href: 'team.html',     cat_th: 'หน้า',     cat_en: 'Pages' },
    { th: 'โฆษณา TVC',                     en: 'TVC Commercials',               href: 'advertise.html',cat_th: 'หน้า',     cat_en: 'Pages' },
    { th: 'กิจกรรม',                       en: 'Activities',                    href: 'activity.html', cat_th: 'หน้า',     cat_en: 'Pages' },
    { th: 'คำถามที่พบบ่อย',               en: 'FAQ',                           href: 'question.html', cat_th: 'หน้า',     cat_en: 'Pages' },
    { th: 'เกร็ดน่ารู้',                   en: 'Tips & Info',                   href: 'question.html#tips', cat_th: 'หน้า', cat_en: 'Pages' },
    { th: 'ติดต่อเรา',                     en: 'Contact Us',                    href: 'contact.html',  cat_th: 'หน้า',     cat_en: 'Pages' },
    { th: 'ร่วมงานกับเรา',                 en: 'Careers',                       href: 'career.html',   cat_th: 'หน้า',     cat_en: 'Pages' },
    { th: 'สั่งซื้อสินค้าปูไทยออนไลน์ได้ที่ไหน', en: 'Where can I buy Pu Thai online?',         href: 'question.html', cat_th: 'คำถาม', cat_en: 'FAQ' },
    { th: 'ปูไทยเคลือบช็อคโกแลตทำมาจากอะไร',     en: 'What is Pu Thai Chocolate made of?',       href: 'question.html', cat_th: 'คำถาม', cat_en: 'FAQ' },
    { th: 'ปูไทยกลิ่นรสสาหร่ายใช้สาหร่ายจริงไหม',en: 'Does Pu Thai Seaweed use real seaweed?',   href: 'question.html', cat_th: 'คำถาม', cat_en: 'FAQ' },
    { th: 'ปูไทยรสพริกไทยดำเผ็ดมากแค่ไหน',       en: 'How spicy is Pu Thai Black Pepper?',       href: 'question.html', cat_th: 'คำถาม', cat_en: 'FAQ' },
    { th: 'ปูไทยมีปริมาณโซเดียมเท่าไหร่',         en: 'How much sodium is in Pu Thai?',           href: 'question.html', cat_th: 'คำถาม', cat_en: 'FAQ' },
    { th: 'สินค้าปูไทยมีจำหน่ายในต่างประเทศไหม',  en: 'Is Pu Thai available internationally?',    href: 'question.html', cat_th: 'คำถาม', cat_en: 'FAQ' },
  ];

  document.querySelectorAll('.search-wrap').forEach(wrap => {
    const input = wrap.querySelector('input');
    const btn   = wrap.querySelector('button');

    const dropdown = document.createElement('div');
    dropdown.className = 'search-dropdown';
    dropdown.setAttribute('role', 'listbox');
    wrap.appendChild(dropdown);

    let focusedIdx = -1;

    function currentLang() {
      return localStorage.getItem('ph_lang') || 'th';
    }

    function labelFor(item) {
      return currentLang() === 'en' ? item.en : item.th;
    }

    function catFor(item) {
      return currentLang() === 'en' ? item.cat_en : item.cat_th;
    }

    function getResults(q) {
      const lq = q.toLowerCase().trim();
      if (lq.length < 2) return [];
      return INDEX.filter(item =>
        item.th.toLowerCase().includes(lq) || item.en.toLowerCase().includes(lq)
      ).slice(0, 10);
    }

    function renderDropdown(results) {
      focusedIdx = -1;
      dropdown.innerHTML = '';
      if (!results.length) {
        dropdown.innerHTML = `<div class="search-no-results">${currentLang() === 'en' ? 'No results found.' : 'ไม่พบผลลัพธ์'}</div>`;
        dropdown.classList.add('open');
        return;
      }

      const groups = {};
      results.forEach(item => {
        const cat = catFor(item);
        if (!groups[cat]) groups[cat] = [];
        groups[cat].push(item);
      });

      Object.entries(groups).forEach(([cat, items]) => {
        const label = document.createElement('div');
        label.className = 'search-group-label';
        label.textContent = cat;
        dropdown.appendChild(label);
        items.forEach(item => {
          const a = document.createElement('a');
          a.className = 'search-result-item';
          a.href = item.href;
          a.textContent = labelFor(item);
          a.setAttribute('role', 'option');
          dropdown.appendChild(a);
        });
      });

      dropdown.classList.add('open');
    }

    function closeDropdown() {
      dropdown.classList.remove('open');
      focusedIdx = -1;
    }

    function getFocusableItems() {
      return Array.from(dropdown.querySelectorAll('.search-result-item'));
    }

    function moveFocus(dir) {
      const items = getFocusableItems();
      if (!items.length) return;
      items.forEach(el => el.classList.remove('focused'));
      focusedIdx = Math.max(0, Math.min(items.length - 1, focusedIdx + dir));
      items[focusedIdx].classList.add('focused');
    }

    input.addEventListener('input', () => {
      renderDropdown(getResults(input.value));
    });

    input.addEventListener('keydown', e => {
      if (e.key === 'ArrowDown') { e.preventDefault(); moveFocus(1); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); moveFocus(-1); }
      else if (e.key === 'Enter') {
        const items = getFocusableItems();
        const target = focusedIdx >= 0 ? items[focusedIdx] : items[0];
        if (target) { e.preventDefault(); window.location.href = target.href; }
      }
      else if (e.key === 'Escape') { closeDropdown(); input.blur(); }
    });

    btn.addEventListener('click', () => {
      const results = getResults(input.value);
      if (results.length) window.location.href = results[0].href;
    });

    document.addEventListener('click', e => {
      if (!wrap.contains(e.target)) closeDropdown();
    });
  });
})();

// ── Language switcher ────────────────────────────────────
(function () {
  const PAGE_TITLES = {
    'index.html':    { th: 'P.H. Foods Thailand — ปูไทย & โรโด้',    en: 'P.H. Foods Thailand — Pu Thai & Rodo' },
    'about.html':    { th: 'เกี่ยวกับเรา — P.H. Foods Thailand',       en: 'About Us — P.H. Foods Thailand' },
    'activity.html': { th: 'กิจกรรม — P.H. Foods Thailand',            en: 'Activities — P.H. Foods Thailand' },
    'advertise.html':{ th: 'โฆษณา TVC — P.H. Foods Thailand',          en: 'TVC Commercials — P.H. Foods Thailand' },
    'career.html':   { th: 'ร่วมงานกับเรา — P.H. Foods Thailand',      en: 'Careers — P.H. Foods Thailand' },
    'contact.html':  { th: 'ติดต่อเรา — P.H. Foods Thailand',          en: 'Contact Us — P.H. Foods Thailand' },
    'products.html': { th: 'ผลิตภัณฑ์ — P.H. Foods Thailand',          en: 'Products — P.H. Foods Thailand' },
    'question.html': { th: 'คำถามที่พบบ่อย — P.H. Foods Thailand',    en: 'FAQ — P.H. Foods Thailand' },
    'team.html':     { th: 'ทีมงาน — P.H. Foods Thailand',             en: 'Our Team — P.H. Foods Thailand' },
  };
  const META_DESC = {
    th: 'บริษัท พี.เอช.ฟู้ดส์ จำกัด ผู้ผลิตขนมทอดกรอบและขนมอบกรอบตราปูไทยและโรโด้ ก่อตั้งมาตั้งแต่ปี พ.ศ. 2493',
    en: 'P.H. Foods Co., Ltd. — producer of crispy fried and baked snacks under the Pu Thai and Rodo brands, established since 1950.',
  };

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
    document.querySelectorAll('.hamburger[data-label-en]').forEach(el => {
      el.setAttribute('aria-label', lang === 'en' ? el.dataset.labelEn : el.dataset.labelTh);
    });
    const page = location.pathname.split('/').pop() || 'index.html';
    if (PAGE_TITLES[page]) document.title = PAGE_TITLES[page][lang] || PAGE_TITLES[page].th;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', lang === 'en' ? META_DESC.en : META_DESC.th);
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
