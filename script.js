/* ===========================
   Data
=========================== */

const DOGS = [
  {
    id: "aika",
    name: "Айка",
    breed: "Сибирская лайка",
    sex: "девочка",
    ageMonths: 8,
    ageGroup: "young",
    energy: "high",
    status: "available",
    short: "Активная, ориентирована на человека. Любит прогулки и игры.",
    details: [
      "Вакцинации по возрасту, ветпаспорт",
      "Дружит с людьми и собаками",
      "Подходит активной семье",
      "Знает базовые команды: «ко мне», «сидеть»"
    ]
  },
  {
    id: "bruno",
    name: "Бруно",
    breed: "Лабрадор ретривер",
    sex: "мальчик",
    ageMonths: 14,
    ageGroup: "young",
    energy: "medium",
    status: "available",
    short: "Добрый компаньон, любит детей, спокойно остаётся дома.",
    details: [
      "Вакцинации, обработка от паразитов",
      "Обучен поводку, не тянет",
      "Подходит для квартиры/дома",
      "Хорошо ладит с детьми"
    ]
  },
  {
    id: "luna",
    name: "Луна",
    breed: "Самоед",
    sex: "девочка",
    ageMonths: 6,
    ageGroup: "puppy",
    energy: "high",
    status: "available",
    short: "Щенок с отличной социализацией. Очень контактная и умная.",
    details: [
      "Щенячья метрика, ветпаспорт",
      "Социализация и адаптация к городу",
      "Рекомендуем занятия с кинологом",
      "Любит внимание и игры"
    ]
  },
  {
    id: "thor",
    name: "Тор",
    breed: "Немецкая овчарка",
    sex: "мальчик",
    ageMonths: 30,
    ageGroup: "adult",
    energy: "high",
    status: "available",
    short: "Сильный, обучаемый, отличный для спорта и охраны территории.",
    details: [
      "Базовый ОКД, отличный контакт",
      "Требует уверенного владельца",
      "Лучше в дом с участком",
      "Регулярные тренировки обязательны"
    ]
  },
  {
    id: "marta",
    name: "Марта",
    breed: "Корги пемброк",
    sex: "девочка",
    ageMonths: 20,
    ageGroup: "adult",
    energy: "medium",
    status: "available",
    short: "Уравновешенная, ласковая, легко обучается. Отличный компаньон.",
    details: [
      "Привита, ветпаспорт",
      "Дружелюбная к гостям",
      "Любит короткие активные игры",
      "Подходит для квартиры"
    ]
  },
  {
    id: "snow",
    name: "Сноу",
    breed: "Хаски",
    sex: "мальчик",
    ageMonths: 10,
    ageGroup: "young",
    energy: "high",
    status: "reserved",
    short: "Очень энергичный. Для людей, которые любят долгие прогулки.",
    details: [
      "Рекомендуем шлейку и беговые занятия",
      "Нужна нагрузка и дисциплина",
      "Любит общение",
      "Статус: бронь"
    ]
  }
];

const ENERGY_LABEL = {
  low: "низкая активность",
  medium: "средняя активность",
  high: "высокая активность"
};

const AGE_GROUP_LABEL = {
  puppy: "щенок",
  young: "юниор",
  adult: "взрослый"
};

const STATUS_LABEL = {
  available: "доступен",
  reserved: "бронь"
};

/* Images from local `images/` folder. If an image with a dog's id doesn't exist,
   files from `IMAGE_FILES` are assigned by index fallback. */
const IMAGE_FILES = [
  "images/1.jpg",
  "images/2.jpg",
  "images/3.jpg",
  "images/4.jpg",
  "images/5.jpg",
  "images/6.jpg",
  "images/7.jpg",
  "images/8.jpg"
];

function getDogImageSrc(dog, idx){
  // try id-based filename (e.g. images/aika.jpg, images/aika.png)
  const byId = IMAGE_FILES.find(p => p.endsWith(`/${dog.id}.jpg`) || p.endsWith(`/${dog.id}.png`));
  if (byId) return byId;
  // fallback by index
  if (typeof idx === "number" && IMAGE_FILES.length) return IMAGE_FILES[idx % IMAGE_FILES.length];
  return null;
}

/* ===========================
   Utils
=========================== */

function $(sel, root = document) { return root.querySelector(sel); }
function $$(sel, root = document) { return Array.from(root.querySelectorAll(sel)); }

function clamp(n, min, max){ return Math.min(max, Math.max(min, n)); }

function ageText(months){
  if (months < 12) return `${months} мес.`;
  const years = Math.floor(months / 12);
  const rem = months % 12;
  if (rem === 0) return `${years} г.`;
  return `${years} г. ${rem} мес.`;
}

function escapeHtml(str){
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function getFavs(){
  try{
    const raw = localStorage.getItem("kennel_favs");
    const ids = raw ? JSON.parse(raw) : [];
    return Array.isArray(ids) ? ids : [];
  }catch{
    return [];
  }
}

function setFavs(ids){
  localStorage.setItem("kennel_favs", JSON.stringify(ids));
}

function isFav(id){
  return getFavs().includes(id);
}

function toggleFav(id){
  const ids = getFavs();
  const idx = ids.indexOf(id);
  if (idx >= 0) ids.splice(idx, 1);
  else ids.push(id);
  setFavs(ids);
  return ids;
}

function setYear(){
  const el = $("#year");
  if (el) el.textContent = new Date().getFullYear();
}

/* ===========================
   SVG placeholder (no images needed)
=========================== */

function dogSvg(name){
  const n = escapeHtml(name);
  return `
  <svg viewBox="0 0 600 360" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Фото ${n}">
    <defs>
      <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
        <stop offset="0" stop-color="rgba(37,99,235,.35)"/>
        <stop offset="1" stop-color="rgba(22,163,74,.30)"/>
      </linearGradient>
    </defs>
    <rect x="10" y="10" width="580" height="340" rx="26" fill="rgba(255,255,255,.55)" stroke="rgba(15,23,42,.12)"/>
    <circle cx="220" cy="165" r="78" fill="url(#g)" opacity=".85"/>
    <circle cx="365" cy="165" r="78" fill="url(#g)" opacity=".55"/>
    <path d="M210 210c18 16 46 16 64 0" fill="none" stroke="rgba(15,23,42,.55)" stroke-width="10" stroke-linecap="round"/>
    <path d="M350 210c18 16 46 16 64 0" fill="none" stroke="rgba(15,23,42,.55)" stroke-width="10" stroke-linecap="round"/>
    <circle cx="250" cy="150" r="8" fill="rgba(15,23,42,.65)"/>
    <circle cx="390" cy="150" r="8" fill="rgba(15,23,42,.65)"/>
    <text x="50%" y="310" text-anchor="middle"
      font-family="Inter, Arial" font-size="36" font-weight="800" fill="rgba(15,23,42,.75)">${n}</text>
  </svg>`;
}

/* ===========================
   Modals
=========================== */

let lastFocus = null;

function openModal(type, payload = null){
  const overlay = $("#modalOverlay");
  const content = $("#modalContent");
  if (!overlay || !content) return;

  lastFocus = document.activeElement;

  content.innerHTML = renderModal(type, payload);
  // ensure any <img> in modal get fallback handlers
  attachImageFallbacks(content);
  overlay.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";

  // focus first
  const focusable = getFocusableElements(overlay);
  if (focusable.length) focusable[0].focus();

  // close events
  overlay.addEventListener("click", overlayClickClose);
  document.addEventListener("keydown", escClose);
  document.addEventListener("keydown", trapFocus);

  // bind modal forms
  bindModalLogic(type, payload);
}

function closeModal(){
  const overlay = $("#modalOverlay");
  if (!overlay) return;

  overlay.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";

  overlay.removeEventListener("click", overlayClickClose);
  document.removeEventListener("keydown", escClose);
  document.removeEventListener("keydown", trapFocus);

  const content = $("#modalContent");
  if (content) content.innerHTML = "";

  if (lastFocus && typeof lastFocus.focus === "function") lastFocus.focus();
}

function overlayClickClose(e){
  const closeBtn = e.target.closest("[data-close-modal]");
  if (closeBtn) closeModal();
}

function escClose(e){
  if (e.key === "Escape") closeModal();
}

function getFocusableElements(root){
  return $$('a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])', root)
    .filter(el => !el.hasAttribute("hidden") && el.offsetParent !== null);
}

function trapFocus(e){
  if (e.key !== "Tab") return;
  const overlay = $("#modalOverlay");
  if (!overlay || overlay.getAttribute("aria-hidden") === "true") return;

  const focusable = getFocusableElements(overlay);
  if (!focusable.length) return;

  const first = focusable[0];
  const last = focusable[focusable.length - 1];

  if (e.shiftKey && document.activeElement === first){
    e.preventDefault();
    last.focus();
  }else if (!e.shiftKey && document.activeElement === last){
    e.preventDefault();
    first.focus();
  }
}

function renderModal(type, payload){
  if (type === "dog" && payload){
    const d = payload;
    // pick image for modal (try id-based, fallback by index)
    const idxForModal = DOGS.findIndex(x => x.id === d.id);
    const modalImgSrc = getDogImageSrc(d, idxForModal);
    const modalImgHtml = modalImgSrc
      ? `<img src="${escapeHtml(modalImgSrc)}" alt="Фото ${escapeHtml(d.name)}" loading="lazy">`
      : dogSvg(d.name);

    const tags = `
      <span class="tag">${AGE_GROUP_LABEL[d.ageGroup]}</span>
      <span class="tag tag--amber">${ENERGY_LABEL[d.energy]}</span>
      <span class="tag tag--green">${STATUS_LABEL[d.status]}</span>
    `;

    return `
      <h2 class="modal__title" id="modalTitle">${escapeHtml(d.name)} — подробнее</h2>
      <div class="modal__grid">
        <div class="modal__img">${modalImgHtml}</div>
        <div>
          <div class="card__meta" style="margin-bottom:10px">${tags}</div>
          <p class="muted" style="margin:0 0 10px">
            <strong>${escapeHtml(d.breed)}</strong>, ${escapeHtml(d.sex)}, возраст: <strong>${ageText(d.ageMonths)}</strong>.
          </p>
          <p class="muted" style="margin:0 0 12px">${escapeHtml(d.short)}</p>
          <ul class="modal__list">
            ${d.details.map(x => `<li>${escapeHtml(x)}</li>`).join("")}
          </ul>

          <div class="modal__actions">
            <button class="btn btn--primary" data-action="book-dog" ${d.status !== "available" ? "disabled" : ""}>
              Записаться на знакомство
            </button>
            <button class="btn btn--ghost" data-action="toggle-fav">
              ${isFav(d.id) ? "Убрать из избранного" : "В избранное"}
            </button>
          </div>

          ${d.status !== "available"
            ? `<div class="helper" style="margin-top:10px">Сейчас на собаку оформлена бронь. Можно оставить заявку на ожидание.</div>`
            : `<div class="helper" style="margin-top:10px">Нажми «Записаться» — мы уточним детали и предложим время.</div>`
          }
        </div>
      </div>
    `;
  }

  if (type === "contact"){
    return `
      <h2 class="modal__title" id="modalTitle">Контакты</h2>
      <p class="muted" style="margin-top:0">
        Напишите нам — ответим в течение дня.
      </p>

      <div class="panel" style="padding:14px; box-shadow:none">
        <div class="contact-mini">
          <div class="contact-mini__item">
            <span class="contact-mini__label">Телефон</span>
            <a class="contact-mini__value" href="tel:+79990000000">+7 (999) 000-00-00</a>
          </div>
          <div class="contact-mini__item">
            <span class="contact-mini__label">Почта</span>
            <a class="contact-mini__value" href="mailto:info@severnaya-lapa.ru">info@severnaya-lapa.ru</a>
          </div>
          <div class="contact-mini__item">
            <span class="contact-mini__label">Адрес</span>
            <span class="contact-mini__value">Москва, (условный адрес), по записи</span>
          </div>
        </div>
      </div>

      <div style="height:12px"></div>

      <form class="form" id="contactForm" novalidate>
        <div class="form__row">
          <div class="field">
            <label class="label" for="cName">Имя</label>
            <input class="input" id="cName" name="name" placeholder="Ваше имя" required />
            <div class="error" data-error-for="cName" hidden>Введите имя</div>
          </div>
          <div class="field">
            <label class="label" for="cPhone">Телефон</label>
            <input class="input" id="cPhone" name="phone" placeholder="+7 (___) ___-__-__" required />
            <div class="error" data-error-for="cPhone" hidden>Введите телефон</div>
          </div>
        </div>

        <div class="field">
          <label class="label" for="cMsg">Сообщение</label>
          <textarea class="textarea" id="cMsg" name="msg" rows="4" placeholder="Например: хочу спокойного компаньона в квартиру" required></textarea>
          <div class="error" data-error-for="cMsg" hidden>Напишите сообщение</div>
        </div>

        <button class="btn btn--primary btn--block" type="submit">Отправить</button>
        <div class="helper">Это демо-форма: данные не уходят на сервер, но логика работает.</div>
      </form>
    `;
  }

  if (type === "booking"){
    return `
      <h2 class="modal__title" id="modalTitle">Заявка на подбор / знакомство</h2>
      <p class="muted" style="margin-top:0">
        Оставьте контакты и коротко опишите условия — мы предложим подходящих собак и время встречи.
      </p>

      <form class="form" id="bookingForm" novalidate>
        <div class="form__row">
          <div class="field">
            <label class="label" for="bName">Имя</label>
            <input class="input" id="bName" name="name" placeholder="Ваше имя" required />
            <div class="error" data-error-for="bName" hidden>Введите имя</div>
          </div>
          <div class="field">
            <label class="label" for="bPhone">Телефон</label>
            <input class="input" id="bPhone" name="phone" placeholder="+7 (___) ___-__-__" required />
            <div class="error" data-error-for="bPhone" hidden>Введите телефон</div>
          </div>
        </div>

        <div class="form__row">
          <div class="field">
            <label class="label" for="bCity">Город</label>
            <input class="input" id="bCity" name="city" placeholder="Москва" required />
            <div class="error" data-error-for="bCity" hidden>Укажите город</div>
          </div>
          <div class="field">
            <label class="label" for="bType">Что нужно?</label>
            <select class="select" id="bType" name="type" required>
              <option value="">Выберите</option>
              <option value="meet">Знакомство с конкретной собакой</option>
              <option value="pick">Подбор по анкете</option>
            </select>
            <div class="error" data-error-for="bType" hidden>Выберите вариант</div>
          </div>
        </div>

        <div class="field">
          <label class="label" for="bMsg">Комментарий</label>
          <textarea class="textarea" id="bMsg" name="msg" rows="4"
            placeholder="Условия (квартира/дом), опыт, график, есть ли дети/животные, желаемый характер"></textarea>
          <div class="helper">Чем подробнее — тем точнее подбор.</div>
        </div>

        <button class="btn btn--primary btn--block" type="submit">Отправить заявку</button>
        <div class="helper">Демо: показывает уведомление, без отправки на сервер.</div>
      </form>
    `;
  }

  if (type === "favorites"){
    const favIds = getFavs();
    const favDogs = DOGS.filter(d => favIds.includes(d.id));
    return `
      <h2 class="modal__title" id="modalTitle">Избранное</h2>
      ${favDogs.length ? `
        <p class="muted" style="margin-top:0">Нажмите на карточку, чтобы открыть подробнее.</p>
        <div class="cards-grid" style="grid-template-columns: repeat(2, 1fr)">
          ${favDogs.map(d => renderCardHtml(d, DOGS.findIndex(x => x.id === d.id))).join("")}
        </div>
      ` : `
        <p class="muted" style="margin-top:0">Пока пусто. Добавляйте собак в избранное в каталоге.</p>
        <button class="btn btn--primary" data-close-modal>Понятно</button>
      `}
    `;
  }

  return `<h2 class="modal__title" id="modalTitle">Окно</h2><p class="muted">Контент не найден.</p>`;
}

function bindModalLogic(type, payload){
  const root = $("#modalContent");
  if (!root) return;

  if (type === "dog" && payload){
    root.addEventListener("click", (e) => {
      const book = e.target.closest('[data-action="book-dog"]');
      const fav = e.target.closest('[data-action="toggle-fav"]');

      if (book){
        closeModal();
        openModal("booking");
        showToast(`Заявка на знакомство: ${payload.name}`);
      }
      if (fav){
        const ids = toggleFav(payload.id);
        updateFavCount();
        // Update button text instantly
        fav.textContent = isFav(payload.id) ? "Убрать из избранного" : "В избранное";
        showToast(isFav(payload.id) ? "Добавлено в избранное" : "Удалено из избранного");
        // also update icons on page
        syncFavIcons(ids);
      }
    }, { once: true });
  }

  if (type === "favorites"){
    // allow open dog modal from favorites modal
    root.addEventListener("click", (e) => {
      const card = e.target.closest("[data-dog-id]");
      if (!card) return;
      const id = card.getAttribute("data-dog-id");
      const d = DOGS.find(x => x.id === id);
      if (d){
        openModal("dog", d);
      }
    });
  }

  if (type === "contact"){
    const form = $("#contactForm");
    if (form) form.addEventListener("submit", (e) => {
      e.preventDefault();
      const ok = validateForm(form);
      if (!ok) return;
      form.reset();
      closeModal();
      showToast("Сообщение отправлено ✅");
    });
  }

  if (type === "booking"){
    const form = $("#bookingForm");
    if (form) form.addEventListener("submit", (e) => {
      e.preventDefault();
      const ok = validateForm(form);
      if (!ok) return;
      form.reset();
      closeModal();
      showToast("Заявка отправлена ✅");
    });
  }
}

/* ===========================
   Toast
=========================== */

let toastTimer = null;

function showToast(text){
  const el = $("#toast");
  if (!el) return;
  el.textContent = text;
  el.hidden = false;

  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    el.hidden = true;
  }, 2400);
}

/* ===========================
   Forms
=========================== */

function validateForm(form){
  let ok = true;
  const required = $$("[required]", form);

  required.forEach((input) => {
    const id = input.id;
    const err = form.querySelector(`[data-error-for="${CSS.escape(id)}"]`);
    const value = (input.value || "").trim();

    let valid = true;
    if (!value) valid = false;

    if (valid && input.name === "phone"){
      // very basic phone validation
      const digits = value.replace(/\D/g, "");
      valid = digits.length >= 10;
    }

    if (valid && input.tagName === "SELECT"){
      valid = value !== "";
    }

    if (!valid){
      ok = false;
      if (err) err.hidden = false;
      input.setAttribute("aria-invalid", "true");
    }else{
      if (err) err.hidden = true;
      input.removeAttribute("aria-invalid");
    }
  });

  if (!ok) showToast("Проверьте поля формы");
  return ok;
}

/* ===========================
   Cards render
=========================== */

function energyTag(energy){
  if (energy === "low") return `<span class="tag tag--green">${ENERGY_LABEL[energy]}</span>`;
  if (energy === "high") return `<span class="tag tag--amber">${ENERGY_LABEL[energy]}</span>`;
  return `<span class="tag">${ENERGY_LABEL[energy]}</span>`;
}

function statusTag(status){
  if (status === "available") return `<span class="tag tag--green">${STATUS_LABEL[status]}</span>`;
  return `<span class="tag tag--amber">${STATUS_LABEL[status]}</span>`;
}

function renderCardHtml(d, idx){
  const fav = isFav(d.id);
  const imgSrc = getDogImageSrc(d, idx);
  const imgHtml = imgSrc ? `<img src="${escapeHtml(imgSrc)}" alt="Фото ${escapeHtml(d.name)}" loading="lazy">` : dogSvg(d.name);
  return `
    <article class="card" data-dog-id="${escapeHtml(d.id)}" tabindex="0" aria-label="Карточка: ${escapeHtml(d.name)}">
      <div class="card__img">${imgHtml}</div>
      <div class="card__body">
        <div class="card__top">
          <div>
            <h3 class="card__name">${escapeHtml(d.name)}</h3>
            <p class="card__breed">${escapeHtml(d.breed)} • ${escapeHtml(d.sex)} • ${ageText(d.ageMonths)}</p>
          </div>
        </div>

        <div class="card__meta">
          <span class="tag">${AGE_GROUP_LABEL[d.ageGroup]}</span>
          ${energyTag(d.energy)}
          ${statusTag(d.status)}
        </div>

        <p class="card__desc">${escapeHtml(d.short)}</p>

        <div class="card__actions">
          <button class="btn btn--primary" data-open-dog="${escapeHtml(d.id)}" ${d.status !== "available" ? "disabled" : ""}>
            Подробнее
          </button>

          <button class="icon-btn" data-fav="${escapeHtml(d.id)}" aria-label="${fav ? "Убрать из избранного" : "Добавить в избранное"}">
            <span class="icon ${fav ? "is-active" : ""}">⭐</span>
          </button>
        </div>
      </div>
    </article>
  `;
}

function syncFavIcons(ids){
  $$("[data-fav]").forEach((btn) => {
    const id = btn.getAttribute("data-fav");
    const active = ids.includes(id);
    const icon = btn.querySelector(".icon");
    if (icon){
      icon.classList.toggle("is-active", active);
    }
    btn.setAttribute("aria-label", active ? "Убрать из избранного" : "Добавить в избранное");
  });
}

/* ===========================
   Page logic
=========================== */

function updateFavCount(){
  const countEl = $("#favCount");
  if (!countEl) return;
  countEl.textContent = String(getFavs().length);
}

function bindGlobalModalButtons(){
  document.addEventListener("click", (e) => {
    const open = e.target.closest("[data-open-modal]");
    const close = e.target.closest("[data-close-modal]");
    if (open){
      const type = open.getAttribute("data-open-modal");
      openModal(type);
    }
    if (close){
      closeModal();
    }
  });
}

function bindBurger(){
  const burger = $("[data-burger]");
  const mobile = $("[data-mobile-nav]");
  if (!burger || !mobile) return;

  burger.addEventListener("click", () => {
    const expanded = burger.getAttribute("aria-expanded") === "true";
    burger.setAttribute("aria-expanded", String(!expanded));
    mobile.hidden = expanded;
  });

  // close on link click
  mobile.addEventListener("click", (e) => {
    const isLink = e.target.closest("a,button");
    if (!isLink) return;
    burger.setAttribute("aria-expanded", "false");
    mobile.hidden = true;
  });
}

function bindDogCards(container){
  if (!container) return;

  container.addEventListener("click", (e) => {
    const openBtn = e.target.closest("[data-open-dog]");
    const favBtn = e.target.closest("[data-fav]");
    const card = e.target.closest("[data-dog-id]");

    if (openBtn){
      const id = openBtn.getAttribute("data-open-dog");
      const d = DOGS.find(x => x.id === id);
      if (d) openModal("dog", d);
      return;
    }

    if (favBtn){
      const id = favBtn.getAttribute("data-fav");
      const ids = toggleFav(id);
      updateFavCount();
      syncFavIcons(ids);
      showToast(isFav(id) ? "Добавлено в избранное" : "Удалено из избранного");
      return;
    }

    // click on card (not on buttons) -> open dog
    if (card && !e.target.closest("button,a,input,select,textarea")){
      const id = card.getAttribute("data-dog-id");
      const d = DOGS.find(x => x.id === id);
      if (d) openModal("dog", d);
    }
  });

  // open with Enter on focused card
  container.addEventListener("keydown", (e) => {
    if (e.key !== "Enter") return;
    const card = e.target.closest("[data-dog-id]");
    if (!card) return;
    const id = card.getAttribute("data-dog-id");
    const d = DOGS.find(x => x.id === id);
    if (d) openModal("dog", d);
  });
}

/* Attach image error fallbacks: replace failed <img> with SVG placeholder. */
function attachImageFallbacks(root){
  if (!root) return;
  const imgs = Array.from(root.querySelectorAll("img"));
  imgs.forEach(img => {
    // Avoid attaching multiple handlers
    if (img.__fallback_attached) return;
    img.__fallback_attached = true;
    img.addEventListener("error", () => {
      // try to find dog name from nearest card or alt attribute
      const card = img.closest("[data-dog-id]");
      let name = null;
      if (card) {
        const id = card.getAttribute("data-dog-id");
        const d = DOGS.find(x => x.id === id);
        if (d) name = d.name;
      }
      if (!name){
        const alt = img.getAttribute("alt") || "";
        name = alt.replace(/^Фото\s*/i, "") || "собака";
      }
      const parent = img.parentElement;
      if (parent) parent.innerHTML = dogSvg(name);
    });
  });
}

function initIndex(){
  const featured = $("#featuredDogs");
  if (!featured) return;

  const picks = DOGS.filter(d => d.status === "available").slice(0, 3);
  featured.innerHTML = picks.map((d,i) => renderCardHtml(d, DOGS.findIndex(x => x.id === d.id))).join("");
  bindDogCards(featured);
  attachImageFallbacks(featured);
}

function initDogs(){
  const grid = $("#dogsGrid");
  if (!grid) return;

  const search = $("#search");
  const age = $("#age");
  const energy = $("#energy");
  const sort = $("#sort");
  const resetBtn = $("#resetBtn");
  const empty = $("#emptyState");
  const clearSearchBtn = $("#clearSearchBtn");
  const showFavBtn = $("#showFavoritesBtn");

  function apply(){
    let list = [...DOGS];

    const q = (search?.value || "").trim().toLowerCase();
    const ageVal = age?.value || "all";
    const enVal = energy?.value || "all";
    const sortVal = sort?.value || "new";

    if (q){
      list = list.filter(d =>
        d.name.toLowerCase().includes(q) ||
        d.breed.toLowerCase().includes(q) ||
        d.short.toLowerCase().includes(q) ||
        AGE_GROUP_LABEL[d.ageGroup].includes(q) ||
        ENERGY_LABEL[d.energy].includes(q)
      );
    }

    if (ageVal !== "all") list = list.filter(d => d.ageGroup === ageVal);
    if (enVal !== "all") list = list.filter(d => d.energy === enVal);

    // sorting
    if (sortVal === "name") list.sort((a,b) => a.name.localeCompare(b.name, "ru"));
    if (sortVal === "ageAsc") list.sort((a,b) => a.ageMonths - b.ageMonths);
    if (sortVal === "ageDesc") list.sort((a,b) => b.ageMonths - a.ageMonths);
    if (sortVal === "new") {
      // "new" just keep array order as in data
    }

    grid.innerHTML = list.map(d => renderCardHtml(d, DOGS.findIndex(x => x.id === d.id))).join("");
    bindDogCards(grid);
    attachImageFallbacks(grid);

    const isEmpty = list.length === 0;
    if (empty) empty.hidden = !isEmpty;
  }

  function reset(){
    if (search) search.value = "";
    if (age) age.value = "all";
    if (energy) energy.value = "all";
    if (sort) sort.value = "new";
    apply();
    showToast("Фильтры сброшены");
  }

  [search, age, energy, sort].forEach(el => {
    if (!el) return;
    el.addEventListener("input", apply);
    el.addEventListener("change", apply);
  });

  if (resetBtn) resetBtn.addEventListener("click", reset);
  if (clearSearchBtn) clearSearchBtn.addEventListener("click", reset);

  if (showFavBtn){
    showFavBtn.addEventListener("click", () => openModal("favorites"));
  }

  apply();
}

/* ===========================
   Boot
=========================== */

document.addEventListener("DOMContentLoaded", () => {
  setYear();
  updateFavCount();

  bindGlobalModalButtons();
  bindBurger();

  // page init
  initIndex();
  initDogs();

  // close modal if click elements have [data-close-modal]
  document.addEventListener("click", (e) => {
    const close = e.target.closest("[data-close-modal]");
    if (close) closeModal();
  });
});
