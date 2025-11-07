// Basic interactive behaviour: theme toggle, mobile menu, counters, project modal, form validation & localStorage
document.addEventListener('DOMContentLoaded', () => {
  // set current year
  document.getElementById('year').textContent = new Date().getFullYear();

  // THEME Toggle (remember in localStorage)
  const body = document.body;
  const themeBtn = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('site-theme');
  if (savedTheme === 'dark') body.classList.add('dark');

  const updateThemeIcon = () => {
    themeBtn.innerHTML = body.classList.contains('dark')
      ? '<i class="fa-solid fa-sun"></i>'
      : '<i class="fa-solid fa-moon"></i>';
  };
  updateThemeIcon();

  themeBtn.addEventListener('click', () => {
    body.classList.toggle('dark');
    localStorage.setItem('site-theme', body.classList.contains('dark') ? 'dark' : 'light');
    updateThemeIcon();
  });

  // Mobile menu toggle
  const menuBtn = document.getElementById('menuBtn');
  const navLinks = document.getElementById('navLinks');
  menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  // Simple counter animation (on scroll into view)
  const counters = document.querySelectorAll('.stat-num');
  const animateCounters = () => {
    counters.forEach(el => {
      const target = +el.dataset.target;
      if (el.dataset.animated) return;
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 50) {
        el.dataset.animated = '1';
        let start = 0;
        const step = Math.ceil(target / 60);
        const timer = setInterval(() => {
          start += step;
          if (start >= target) { el.textContent = target; clearInterval(timer); }
          else el.textContent = start;
        }, 12);
      }
    });
  };
  animateCounters();
  window.addEventListener('scroll', animateCounters);

  // Skill bars animate on load (reads --val inline)
  document.querySelectorAll('.skill-bar span').forEach(s => {
    const val = s.style.getPropertyValue('--val') || '50%';
    s.style.width = val;
  });

  // Project modal (view more)
  const modal = document.getElementById('modal');
  const modalImg = document.getElementById('modalImg');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  const modalClose = document.getElementById('modalClose');
  const modalViewCode = document.getElementById('modalViewCode');

  document.querySelectorAll('.view-more').forEach(btn => {
    btn.addEventListener('click', () => {
      modal.classList.add('active');
      modalImg.src = btn.dataset.img || './images/project-placeholder.jpg';
      modalTitle.textContent = btn.dataset.title || 'Project';
      modalDesc.textContent = btn.dataset.desc || '';
      modalViewCode.href = btn.dataset.code || '#';
      modal.setAttribute('aria-hidden','false');
    });
  });
  modalClose.addEventListener('click', () => {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden','true');
  });
  modal.addEventListener('click', e => { if (e.target === modal) modal.classList.remove('active'); });

  // Contact form: validation + save to localStorage as simple "sent" list (for demo)
  const form = document.getElementById('contactForm');
  const feedback = document.getElementById('formFeedback');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      message: form.message.value.trim(),
      time: new Date().toISOString()
    };
    if (!data.name || !data.email || !data.message) {
      feedback.textContent = 'من فضلك املأ كل الحقول.';
      feedback.style.color = 'crimson';
      return;
    }
    // save to localStorage (demo) — later connect to server / email
    const saved = JSON.parse(localStorage.getItem('messages') || '[]');
    saved.push(data);
    localStorage.setItem('messages', JSON.stringify(saved));
    form.reset();
    feedback.textContent = 'تم إرسال رسالتك. سأرد عليك قريباً — شكراً!';
    feedback.style.color = 'green';
    setTimeout(()=> feedback.textContent = '', 6000);
  });

  // simple sample projects loader: if you want to add projects dynamically,
  // push objects to this array or fetch from a JSON file / API.
  const projects = [
    {
      title: 'GamingZone — متجر ألعاب',
      desc: 'Landing page + منتجات + Dark/Light theme',
      img: './images/gamingzone-snap.jpg',
      code: 'https://github.com/yourusername/GamingZone',
      live: 'https://your-live-link.com/GamingZone'
    }
    // add more objects...
  ];

  const projectsGrid = document.getElementById('projectsGrid');
  // if there are more projects in array, append them (avoid duplicating first hard-coded card)
  if (projects.length > 0) {
    // remove existing demo cards if you want dynamic rendering — optional
    // projectsGrid.innerHTML = '';
    projects.slice(1).forEach(p => {
      const art = document.createElement('article');
      art.className = 'project-card';
      art.innerHTML = `
        <img src="${p.img}" alt="${p.title}" class="project-img">
        <div class="project-body">
          <h3>${p.title}</h3>
          <p>${p.desc}</p>
          <div class="project-actions">
            <a href="${p.code}" target="_blank" class="btn small">شيفرة المشروع</a>
            <a href="${p.live}" target="_blank" class="btn small ghost">عرض مباشر</a>
            <button class="btn small outline view-more" data-title="${p.title}" data-desc="${p.desc}" data-img="${p.img}" data-code="${p.code}">عرض</button>
          </div>
        </div>
      `;
      projectsGrid.appendChild(art);
    });
  }

});


// زر "أعرض المزيد"
const moreBtn = document.getElementById('moreProjects');
moreBtn.addEventListener('click', (e) => {
  e.preventDefault(); // يمنع الرجوع لأعلى الصفحة

  // هنا تقدر تضيف الأكواد اللي تحبها لما تضغط الزر
  // مثلاً: تحميل مشاريع إضافية، أو إظهار عناصر مخفية

  alert("هيتم إضافة مشاريع جديدة هنا لاحقًا 😎");
});
