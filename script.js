/* Portfolio site script. No build step, no libraries.
   Reads site.json (your info) and projects.json (your work) and fills the pages.
   You should not need to edit this file to add projects or change text. */
(function () {
  'use strict';

  var STAGES = { final: 'Final work', render: '3D renders', drawing: 'Shop drawings', process: 'Process', reference: 'Site reference' };
  var STAGE_ORDER = ['final', 'render', 'drawing', 'process', 'reference'];
  var PAGE = document.body.getAttribute('data-page');

  /* ---------- tiny helpers ---------- */
  function $(sel, root) { return (root || document).querySelector(sel); }
  function h(tag, attrs) {
    var node = document.createElement(tag);
    Object.keys(attrs || {}).forEach(function (k) {
      var v = attrs[k];
      if (v === false || v == null) return;
      if (k === 'text') node.textContent = v; else node.setAttribute(k, v === true ? '' : v);
    });
    for (var i = 2; i < arguments.length; i++) {
      var kid = arguments[i];
      if (kid == null || kid === false) continue;
      node.appendChild(typeof kid === 'string' ? document.createTextNode(kid) : kid);
    }
    return node;
  }
  function slug(s) { return String(s).toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); }
  function getJSON(url) { return fetch(url).then(function (r) { if (!r.ok) throw new Error(url + ' ' + r.status); return r.json(); }); }
  function setMeta(sel, value) { var m = $(sel); if (m) m.setAttribute('content', value); }
  function addJsonLd(obj) {
    var s = document.createElement('script');
    s.type = 'application/ld+json';
    s.textContent = JSON.stringify(obj);
    document.head.appendChild(s);
  }
  function isPlaceholder(v) { return typeof v === 'string' && /^\[.*\]$/.test(v.trim()); }
  function clear(node) { while (node.firstChild) node.removeChild(node.firstChild); }

  /* ---------- load everything, then build the page ---------- */
  Promise.all([getJSON('site.json'), getJSON('projects.json')]).then(function (res) {
    var site = res[0], projects = res[1].projects || [];
    buildChrome(site);
    fillSite(site);
    personSchema(site);
    var pages = { home: home, work: work, project: project, about: about, resume: resume, contact: function () {} };
    if (pages[PAGE]) pages[PAGE](site, projects);
    document.documentElement.classList.add('ready');
  }).catch(function (err) {
    var main = $('#main');
    if (main) main.appendChild(h('div', { class: 'wrap section' },
      h('p', { text: 'This page could not load its content. If you are viewing the files directly from your computer, start a local server (see HOW-TO-UPDATE.md) or view the published site.' })));
    if (window.console) console.error(err);
  });

  /* ---------- header, footer, site-wide text ---------- */
  function buildChrome(site) {
    var items = [['work.html', 'Work', 'work'], ['about.html', 'About', 'about'], ['resume.html', 'Résumé', 'resume'], ['contact.html', 'Contact', 'contact']];
    var current = PAGE === 'project' ? 'work' : PAGE;
    var list = h('ul', { class: 'nav-list', id: 'site-nav' });
    items.forEach(function (it) {
      list.appendChild(h('li', {}, h('a', { href: it[0], 'aria-current': it[2] === current ? 'page' : false, text: it[1] })));
    });
    var toggle = h('button', { class: 'nav-toggle', type: 'button', 'aria-expanded': 'false', 'aria-controls': 'site-nav', text: 'Menu' });
    toggle.addEventListener('click', function () {
      var open = list.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && list.classList.contains('is-open')) { list.classList.remove('is-open'); toggle.setAttribute('aria-expanded', 'false'); toggle.focus(); }
    });
    var header = $('#site-header');
    if (header) header.appendChild(h('div', { class: 'wrap' }, h('a', { class: 'brand', href: 'index.html', text: site.name }), toggle, list));

    var footer = $('#site-footer');
    if (footer) {
      var links = h('p', {});
      if (site.email) links.appendChild(h('a', { href: 'mailto:' + site.email, text: site.email }));
      if (site.linkedin) { links.appendChild(document.createTextNode(' · ')); links.appendChild(h('a', { href: site.linkedin, rel: 'noopener', text: 'LinkedIn' })); }
      links.appendChild(document.createTextNode(' · ')); links.appendChild(h('a', { href: '#top', text: 'Back to top' }));
      footer.appendChild(h('div', { class: 'wrap' },
        h('p', { text: '© ' + new Date().getFullYear() + ' ' + site.name + '. All work shown remains the property of the artist.' }), links));
    }
  }

  function fillSite(site) {
    document.querySelectorAll('[data-site]').forEach(function (el) {
      var v = site[el.getAttribute('data-site')];
      if (v) el.textContent = v; else (el.closest('[data-optional]') || el).hidden = true;
    });
    document.querySelectorAll('[data-site-link]').forEach(function (el) {
      var key = el.getAttribute('data-site-link'), v = site[key];
      if (!v) { (el.closest('[data-optional]') || el).hidden = true; return; }
      if (key === 'email') {
        el.href = 'mailto:' + v + (el.hasAttribute('data-subject') ? '?subject=' + encodeURIComponent(el.getAttribute('data-subject')) : '');
        if (el.hasAttribute('data-show-value')) el.textContent = v;
      } else {
        el.href = v;
        if (el.hasAttribute('data-show-value')) el.textContent = v.replace(/^https?:\/\/(www\.)?/, '');
      }
    });
  }

  function personSchema(site) {
    var same = [site.linkedin, site.instagram].filter(function (u) { return u && !isPlaceholder(u); });
    var o = { '@context': 'https://schema.org', '@type': 'Person', name: site.name, jobTitle: site.jobTitle, url: site.url, description: site.valueStatement,
      knowsAbout: (site.skills || []).concat(site.software || []) };
    if (site.email && !/example\.com$/.test(site.email)) o.email = site.email;
    if (same.length) o.sameAs = same;
    if (site.location && !isPlaceholder(site.location)) o.address = site.location;
    addJsonLd(o);
  }

  /* ---------- cards ---------- */
  function card(p, eager) {
    return h('li', {}, h('a', { class: 'card', href: 'project.html?p=' + encodeURIComponent(p.id) },
      h('div', { class: 'card-img' }, h('img', { src: p.cover.src, alt: p.cover.alt, width: p.cover.w, height: p.cover.h, loading: eager ? 'eager' : 'lazy', decoding: 'async' })),
      h('div', { class: 'card-body' },
        h('h3', { class: 'card-title', text: p.title }),
        h('p', { class: 'card-meta', text: [p.category, p.year].filter(Boolean).join(' · ') }))));
  }

  /* ---------- HOME ---------- */
  function home(site, projects) {
    var grid = $('#featured-grid');
    projects.filter(function (p) { return p.featured; }).forEach(function (p, i) { grid.appendChild(card(p, i < 3)); });
  }

  /* ---------- WORK (filterable gallery) ---------- */
  function work(site, projects) {
    var names = (site.categories || []).map(function (c) { return c.name; });
    projects.forEach(function (p) { [p.category].concat(p.alsoIn || []).forEach(function (n) { if (names.indexOf(n) < 0) names.push(n); }); });
    function inCat(p, n) { return p.category === n || (p.alsoIn || []).indexOf(n) > -1; }
    var cats = names.filter(function (n) { return projects.some(function (p) { return inCat(p, n); }); });
    var blurbs = {}; (site.categories || []).forEach(function (c) { blurbs[c.name] = c.blurb; });

    var bar = $('#filters'), grid = $('#work-grid'), count = $('#work-count'), blurb = $('#work-blurb');
    var chips = [];
    function chip(label, name, n) {
      var b = h('button', { type: 'button', class: 'chip', 'aria-pressed': 'false', text: label + ' (' + n + ')' });
      b.addEventListener('click', function () { select(name, true); });
      b._name = name; chips.push(b); bar.appendChild(b); return b;
    }
    chip('All', null, projects.length);
    cats.forEach(function (n) { chip(n, n, projects.filter(function (p) { return inCat(p, n); }).length); });

    function select(name, push) {
      chips.forEach(function (b) { b.setAttribute('aria-pressed', b._name === name ? 'true' : 'false'); });
      var list = name ? projects.filter(function (p) { return inCat(p, name); }) : projects;
      clear(grid);
      list.forEach(function (p, i) { grid.appendChild(card(p, i < 3)); });
      count.textContent = list.length + (list.length === 1 ? ' project' : ' projects') + (name ? ' in ' + name : '');
      blurb.textContent = name && blurbs[name] ? blurbs[name] : '';
      if (push) history.replaceState(null, '', name ? '#' + slug(name) : location.pathname + location.search);
    }
    var want = decodeURIComponent(location.hash.replace('#', ''));
    var match = cats.filter(function (n) { return slug(n) === want; })[0] || null;
    select(match, false);
  }

  /* ---------- PROJECT (one template for every project) ---------- */
  function project(site, projects) {
    var id = new URLSearchParams(location.search).get('p');
    var idx = projects.map(function (p) { return p.id; }).indexOf(id);
    var root = $('#project');
    if (idx < 0) {
      root.appendChild(h('div', { class: 'wrap section' }, h('h1', { text: 'Project not found' }),
        h('p', {}, h('a', { href: 'work.html', text: 'See all work' }))));
      document.title = 'Project not found | ' + site.name;
      return;
    }
    var p = projects[idx];
    var pageUrl = site.url + '/project.html?p=' + encodeURIComponent(p.id);
    var img = site.url + '/' + p.cover.src;
    document.title = p.title + ' | ' + site.name + ', ' + site.jobTitle;
    setMeta('meta[name="description"]', p.summary);
    setMeta('meta[property="og:title"]', p.title + ' | ' + site.name);
    setMeta('meta[property="og:description"]', p.summary);
    setMeta('meta[property="og:image"]', img);
    setMeta('meta[property="og:url"]', pageUrl);
    var canon = $('link[rel="canonical"]'); if (canon) canon.setAttribute('href', pageUrl);
    addJsonLd({ '@context': 'https://schema.org', '@type': 'CreativeWork', name: p.title, description: p.description || p.summary, image: img, url: pageUrl,
      creator: { '@type': 'Person', name: site.name }, genre: p.category, dateCreated: p.year || undefined, keywords: (p.tools || []).join(', ') || undefined });

    // header block
    var meta = h('dl', { class: 'meta' });
    [['Category', [p.category].concat(p.alsoIn || []).join(', ')], ['Year', p.year], ['Role', p.role], ['Tools', (p.tools || []).join(', ')]].forEach(function (r) {
      if (r[1]) meta.appendChild(h('div', {}, h('dt', { text: r[0] }), h('dd', { text: r[1] })));
    });
    var head = h('div', { class: 'project-head' },
      h('h1', { text: p.title }), p.summary ? h('p', { class: 'lede', text: p.summary }) : null, meta);
    if (p.pdf) head.appendChild(h('div', { class: 'btn-row' }, h('a', { class: 'btn btn--primary', href: p.pdf, download: '', text: 'Download shop drawings (PDF)' })));

    // story: brief / overview / process
    var story = h('div', { class: 'story' });
    if (p.description) story.appendChild(h('section', {}, h('h2', { text: 'Overview' }), h('p', { text: p.description })));
    if (p.brief) story.appendChild(h('section', {}, h('h2', { text: 'The brief' }), h('p', { text: p.brief })));
    if ((p.process || []).length) {
      var ol = h('ol'); p.process.forEach(function (s) { ol.appendChild(h('li', { text: s })); });
      story.appendChild(h('section', { class: 'full' }, h('h2', { text: 'Process' }), ol));
    }

    // galleries grouped by stage (folder name inside the project's image folder)
    function stageOf(im) { return im.src.split('/')[3] || 'final'; }
    var imgs = (p.images || []).slice().sort(function (a, b) {
      var ia = STAGE_ORDER.indexOf(stageOf(a)), ib = STAGE_ORDER.indexOf(stageOf(b));
      return (ia < 0 ? 99 : ia) - (ib < 0 ? 99 : ib);
    });
    var groups = [], byStage = {};
    imgs.forEach(function (im) { var s = stageOf(im); if (!byStage[s]) { byStage[s] = []; groups.push(s); } byStage[s].push(im); });
    var frag = document.createDocumentFragment(), n = 0;
    groups.forEach(function (s) {
      var list = byStage[s];
      var cls = 'gallery' + (s === 'drawing' ? ' gallery--wide' : list.length === 1 ? ' gallery--single' : '');
      var g = h('div', { class: cls });
      list.forEach(function (im) { g.appendChild(shot(im, n++)); });
      frag.appendChild(h('section', { class: 'gallery-section', 'aria-label': STAGES[s] || s }, h('h2', { text: STAGES[s] || s.charAt(0).toUpperCase() + s.slice(1) }), g));
    });

    // prev / next
    var prev = projects[(idx + projects.length - 1) % projects.length], next = projects[(idx + 1) % projects.length];
    var pager = h('nav', { class: 'pager', 'aria-label': 'More projects' },
      h('a', { class: 'prev', href: 'project.html?p=' + encodeURIComponent(prev.id) }, h('span', { text: '← Previous' }), h('strong', { text: prev.title })),
      h('a', { class: 'next', href: 'project.html?p=' + encodeURIComponent(next.id) }, h('span', { text: 'Next →' }), h('strong', { text: next.title })));

    var crumbs = h('nav', { class: 'crumbs', 'aria-label': 'Breadcrumb' },
      h('a', { href: 'work.html', text: 'Work' }), ' / ', h('a', { href: 'work.html#' + slug(p.category), text: p.category }), ' / ', document.createTextNode(p.title));
    root.appendChild(h('div', { class: 'wrap' }, crumbs, head, story, frag, pager));
    lightbox(imgs);
  }

  function shot(im, i) {
    var btn = h('button', { type: 'button', class: 'zoom', 'data-i': i, 'aria-label': 'View larger: ' + (im.caption || im.alt) },
      h('img', { src: im.src, alt: im.alt, width: im.w, height: im.h, loading: i === 0 ? 'eager' : 'lazy', decoding: 'async' }));
    var cap = h('figcaption', {}, h('span', { text: im.caption || '' }));
    if (im.animation) {
      var still = im.src, playing = false, pic = btn.firstChild;
      var t = h('button', { type: 'button', class: 'link-btn', text: 'Play animation' });
      t.addEventListener('click', function () {
        playing = !playing; pic.src = playing ? im.animation : still;
        t.textContent = playing ? 'Show still image' : 'Play animation';
      });
      cap.appendChild(t);
    }
    return h('figure', { class: 'shot' }, btn, cap);
  }

  /* ---------- lightbox (native <dialog>) ---------- */
  function lightbox(items) {
    if (!items.length || typeof HTMLDialogElement === 'undefined') return;
    var pic = h('img', { alt: '' }), cap = h('div', { class: 'lightbox-cap', 'aria-live': 'polite' }), cur = 0;
    var close = h('button', { type: 'button', class: 'lb-btn lb-close', 'aria-label': 'Close image viewer', text: '×' });
    var prev = h('button', { type: 'button', class: 'lb-btn lb-prev', 'aria-label': 'Previous image', text: '‹' });
    var next = h('button', { type: 'button', class: 'lb-btn lb-next', 'aria-label': 'Next image', text: '›' });
    var dlg = h('dialog', { class: 'lightbox', 'aria-label': 'Image viewer' },
      h('div', { class: 'lightbox-inner' }, close, prev, next, h('div', { class: 'lightbox-stage' }, pic), cap));
    document.body.appendChild(dlg);
    if (items.length < 2) { prev.hidden = true; next.hidden = true; }
    function show(i) {
      cur = (i + items.length) % items.length;
      pic.src = items[cur].src; pic.alt = items[cur].alt;
      cap.textContent = (items[cur].caption || '') + (items.length > 1 ? '  (' + (cur + 1) + ' / ' + items.length + ')' : '');
    }
    close.addEventListener('click', function () { dlg.close(); });
    prev.addEventListener('click', function () { show(cur - 1); });
    next.addEventListener('click', function () { show(cur + 1); });
    dlg.addEventListener('click', function (e) {
      if (e.target === dlg || e.target.classList.contains('lightbox-inner') || e.target.classList.contains('lightbox-stage')) dlg.close();
    });
    dlg.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') { e.preventDefault(); show(cur - 1); }
      if (e.key === 'ArrowRight') { e.preventDefault(); show(cur + 1); }
    });
    document.querySelectorAll('.zoom').forEach(function (b) {
      b.addEventListener('click', function () { show(+b.getAttribute('data-i')); dlg.showModal(); });
    });
  }

  /* ---------- ABOUT ---------- */
  function listInto(sel, arr, mk) {
    var box = $(sel); if (!box) return;
    if (!arr || !arr.length) { var s = box.closest('section'); (s || box).hidden = true; return; }
    arr.forEach(function (x) { box.appendChild(mk(x)); });
  }
  function tag(x) { return h('li', { text: x }); }
  function job(x) {
    var d = h('div', { class: 'entry' }, h('h3', { text: x.role + (x.org ? ' — ' + x.org : '') }), x.years ? h('p', { class: 'when', text: x.years }) : null);
    if ((x.bullets || []).length) { var ul = h('ul'); x.bullets.forEach(function (b) { ul.appendChild(h('li', { text: b })); }); d.appendChild(ul); }
    return d;
  }
  function school(x) {
    return h('div', { class: 'entry' }, h('h3', { text: x.credential ? x.credential + ' — ' + x.school : x.school }), x.years ? h('p', { class: 'when', text: x.years }) : null);
  }
  function about(site) {
    listInto('#bio', site.bio, function (t) { return h('p', { text: t }); });
    listInto('#skills', site.skills, tag);
    listInto('#software', site.software, tag);
    listInto('#experience', site.experience, job);
    listInto('#education', site.education, school);
  }
  function resume(site) {
    var s = $('#resume-summary'); if (s) s.textContent = site.resumeSummary || '';
    listInto('#experience', site.experience, job);
    listInto('#education', site.education, school);
    listInto('#skills', (site.skills || []).concat(site.software || []), tag);
  }
})();
