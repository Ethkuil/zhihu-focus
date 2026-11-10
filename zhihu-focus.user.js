// ==UserScript==
// @name         禁用知乎推荐页
// @namespace    zhihu-focus
// @version      2.2.1
// @description  首页只保留 Logo、搜索和快捷入口；关注页精简导航并隐藏热搜
// @author       Ethkuil
// @homepageURL  https://github.com/Ethkuil/zhihu-focus
// @supportURL   https://github.com/Ethkuil/zhihu-focus/issues
// @updateURL    https://raw.githubusercontent.com/Ethkuil/zhihu-focus/main/zhihu-focus.user.js
// @downloadURL  https://raw.githubusercontent.com/Ethkuil/zhihu-focus/main/zhihu-focus.user.js
// @match        https://www.zhihu.com/*
// @run-at       document-start
// @grant        none
// ==/UserScript==

(() => {
  'use strict';
  function start() {
  const ROOT = 'zhihu-focus-home';
  const HIDE = 'data-zhihu-focus-hidden';
  const html = document.documentElement;
  const style = document.createElement('style');
  style.textContent = "\n\n#zhihu-focus-home{position:fixed;inset:0;box-sizing:border-box;overflow:auto;padding:clamp(80px,20vh,200px) 20px 40px;background:#fff;color:#202124;font-family:Arial,\"Microsoft YaHei\",sans-serif;z-index:10}\n#zhihu-focus-home .zf-logo{display:flex;align-items:center;justify-content:center;height:90px;margin-bottom:30px;color:#1772f6;font-size:72px;font-weight:600;line-height:1}\n#zhihu-focus-home .zf-logo svg{display:block;width:174px;height:81px;color:#1772f6}\n#zhihu-focus-home form{display:flex;align-items:center;box-sizing:border-box;width:min(584px,100%);height:52px;margin:0 auto;padding:0 16px;border:1px solid #dfe1e5;border-radius:28px;background:#fff}\n#zhihu-focus-home form:hover,#zhihu-focus-home form:focus-within{border-color:transparent;box-shadow:0 1px 6px #20212447}\n#zhihu-focus-home input{flex:1;box-sizing:border-box;width:100%;min-width:0;height:100%;padding:0 12px;border:0;outline:0;background:transparent;box-shadow:none;color:#202124;font:inherit;font-size:18px}\n#zhihu-focus-home button{display:grid;place-items:center;flex:0 0 32px;width:32px;height:36px;padding:0;border:0;border-radius:50%;background:transparent;color:#9aa0a6;cursor:pointer}\n#zhihu-focus-home .zf-shortcuts{display:flex;align-items:center;justify-content:center;gap:20px;margin-top:28px}\n#zhihu-focus-home .zf-shortcut{display:inline-flex;align-items:center;justify-content:center;box-sizing:border-box;width:104px;height:38px;padding:0 14px;border:1px solid transparent;border-radius:10px;background:#f5f6f8;color:#505866;font:inherit;font-size:14px;text-decoration:none;cursor:pointer}\n#zhihu-focus-home .zf-create{position:relative}\n#zhihu-focus-home .zf-plus{display:grid;place-items:center;width:40px;height:40px;padding:0;border:0;border-radius:12px;background:#1772f6;color:white;box-shadow:0 3px 10px #1772f626}\n#zhihu-focus-home .zf-menu{position:absolute;top:50px;left:50%;z-index:1;width:144px;padding:6px;transform:translateX(-50%);border:1px solid #eceef2;border-radius:14px;background:white;box-shadow:0 8px 28px #2021241a}\n#zhihu-focus-home .zf-menu[hidden]{display:none!important}\n#zhihu-focus-home .zf-menu button{display:block;width:100%;height:40px;padding:0 14px;border:0;border-radius:8px;background:transparent;color:#303846;font:inherit;font-size:14px;text-align:left}\n#zhihu-focus-home .zf-menu button:hover{background:#f2f6ff;color:#1772f6}\n#zhihu-focus-home .zf-status{min-height:20px;margin-top:18px;color:#8590a6;font-size:13px;text-align:center}\n/* 追加到现有 style.textContent 的末尾；只调整首页布局。 */\n#zhihu-focus-home {\n  display: flex !important;\n  flex-direction: column !important;\n  align-items: center !important;\n  justify-content: flex-start !important;\n  gap: 0 !important;\n  padding: clamp(72px, 21vh, 200px) 20px 40px !important;\n  font-family: Arial, \"Microsoft YaHei\", sans-serif !important;\n}\n\n#zhihu-focus-home .zf-logo {\n  flex: 0 0 auto !important;\n  width: 100% !important;\n  height: 90px !important;\n  margin: 0 0 28px !important;\n  padding: 0 !important;\n  display: flex !important;\n  align-items: center !important;\n  justify-content: center !important;\n}\n\n#zhihu-focus-home form {\n  display: flex !important;\n  align-items: center !important;\n  flex: 0 0 auto !important;\n  box-sizing: border-box !important;\n  width: min(584px, 100%) !important;\n  min-width: 0 !important;\n  height: 54px !important;\n  margin: 0 !important;\n  padding: 0 16px !important;\n  border: 1px solid #dfe1e5 !important;\n  border-radius: 28px !important;\n}\n\n/* 搜索图标的尺寸只作用于 form 内，不再污染快捷按钮。 */\n#zhihu-focus-home form > button {\n  display: grid !important;\n  place-items: center !important;\n  flex: 0 0 24px !important;\n  width: 24px !important;\n  min-width: 24px !important;\n  height: 32px !important;\n  margin: 0 !important;\n  padding: 0 !important;\n  border: 0 !important;\n  background: transparent !important;\n  color: #9aa0a6 !important;\n}\n\n#zhihu-focus-home form > input {\n  display: block !important;\n  flex: 1 1 0% !important;\n  box-sizing: border-box !important;\n  width: 0 !important;\n  min-width: 0 !important;\n  height: 100% !important;\n  margin: 0 !important;\n  padding: 0 12px !important;\n  font-size: 17px !important;\n  line-height: normal !important;\n}\n\n#zhihu-focus-home .zf-shortcuts {\n  display: grid !important;\n  grid-template-columns: 112px 44px 112px !important;\n  align-items: center !important;\n  justify-content: center !important;\n  gap: 16px !important;\n  flex: 0 0 auto !important;\n  width: 300px !important;\n  max-width: 100% !important;\n  margin: 26px 0 0 !important;\n  padding: 0 !important;\n}\n\n#zhihu-focus-home .zf-shortcuts .zf-shortcut {\n  display: inline-flex !important;\n  align-items: center !important;\n  justify-content: center !important;\n  box-sizing: border-box !important;\n  flex: none !important;\n  width: 112px !important;\n  min-width: 112px !important;\n  max-width: none !important;\n  height: 44px !important;\n  margin: 0 !important;\n  padding: 0 14px !important;\n  border: 1px solid #eef0f3 !important;\n  border-radius: 12px !important;\n  background: #f7f8fa !important;\n  color: #505866 !important;\n  font: 14px/1.2 Arial, \"Microsoft YaHei\", sans-serif !important;\n  white-space: nowrap !important;\n  word-break: normal !important;\n  writing-mode: horizontal-tb !important;\n  text-align: center !important;\n  text-decoration: none !important;\n  cursor: pointer !important;\n}\n\n#zhihu-focus-home .zf-shortcuts .zf-shortcut:hover {\n  background: #eef1f5 !important;\n  border-color: #e2e6ec !important;\n}\n\n#zhihu-focus-home .zf-create {\n  position: relative !important;\n  display: block !important;\n  width: 44px !important;\n  height: 44px !important;\n  margin: 0 !important;\n  padding: 0 !important;\n}\n\n#zhihu-focus-home .zf-shortcuts .zf-plus {\n  display: grid !important;\n  place-items: center !important;\n  box-sizing: border-box !important;\n  flex: none !important;\n  width: 44px !important;\n  min-width: 44px !important;\n  height: 44px !important;\n  margin: 0 !important;\n  padding: 0 !important;\n  border: 0 !important;\n  border-radius: 12px !important;\n  background: #1772f6 !important;\n  color: #fff !important;\n  box-shadow: 0 3px 10px #1772f626 !important;\n  transform: none !important;\n  cursor: pointer !important;\n}\n\n#zhihu-focus-home .zf-shortcuts .zf-plus:hover {\n  background: #0865e8 !important;\n}\n\n#zhihu-focus-home .zf-plus svg {\n  display: block !important;\n  width: 20px !important;\n  height: 20px !important;\n  margin: 0 !important;\n}\n\n#zhihu-focus-home .zf-menu {\n  box-sizing: border-box !important;\n  top: 54px !important;\n  left: 50% !important;\n  width: 156px !important;\n  margin: 0 !important;\n  padding: 6px !important;\n  transform: translateX(-50%) !important;\n}\n\n#zhihu-focus-home .zf-menu button {\n  display: block !important;\n  box-sizing: border-box !important;\n  flex: none !important;\n  width: 100% !important;\n  min-width: 0 !important;\n  height: 42px !important;\n  margin: 0 !important;\n  padding: 0 14px !important;\n  font: 14px/1.2 Arial, \"Microsoft YaHei\", sans-serif !important;\n  white-space: nowrap !important;\n  text-align: left !important;\n}\n\n#zhihu-focus-home .zf-status {\n  flex: 0 0 auto !important;\n  width: min(584px, 100%) !important;\n  margin: 18px 0 0 !important;\n  text-align: center !important;\n}\n\n@media (max-width: 359px) {\n  #zhihu-focus-home .zf-shortcuts {\n    grid-template-columns: 100px 44px 100px !important;\n    width: 268px !important;\n    gap: 12px !important;\n  }\n  #zhihu-focus-home .zf-shortcuts .zf-shortcut {\n    width: 100px !important;\n    min-width: 100px !important;\n  }\n}\n\n[data-zhihu-focus-hidden]{display:none!important}\nhtml[data-zf=\"follow\"] .HotSearchCard{display:none!important}\nhtml[data-zf=\"home\"] body > :not(#zhihu-focus-home){visibility:hidden!important;pointer-events:none!important}\nhtml[data-zf=\"home\"] body .Modal-wrapper,html[data-zf=\"home\"] body .Modal-wrapper *{visibility:visible!important;pointer-events:auto!important}\nhtml[data-zf=\"home\"],html[data-zf=\"home\"] body{margin:0!important;min-height:100vh!important;background:white!important}\nhtml[data-zf=\"home\"] body{overflow:hidden!important}\n#zhihu-focus-home .zf-shortcuts button:focus-visible,#zhihu-focus-home .zf-shortcuts a:focus-visible{outline:2px solid #1772f6;outline-offset:3px}\n";
  html.appendChild(style);
  let panel;
  let hasLogo = false;
  let pending = false;
  const previouslyHidden = new Set();

  function createPanel() {
    const el = document.createElement('main');
    el.id = ROOT;
    el.innerHTML = "\n <div class=\"zf-logo\" role=\"img\" aria-label=\"知乎\">知乎</div>\n <form role=\"search\">\n  <button type=\"submit\" aria-label=\"搜索\"><svg width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><circle cx=\"10.5\" cy=\"10.5\" r=\"6.5\"/><path d=\"m16 16 5 5\"/></svg></button>\n  <input placeholder=\"搜索知乎\" aria-label=\"搜索知乎\" autocomplete=\"off\">\n </form>\n <nav class=\"zf-shortcuts\" aria-label=\"快捷入口\">\n  <a class=\"zf-shortcut\" href=\"/follow\">关注页</a>\n  <div class=\"zf-create\">\n   <button class=\"zf-plus\" type=\"button\" aria-label=\"创作\" aria-expanded=\"false\"><svg width=\"20\" height=\"20\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.5\" stroke-linecap=\"round\"><path d=\"M12 5v14M5 12h14\"/></svg></button>\n   <div class=\"zf-menu\" hidden><button type=\"button\">发想法</button><button type=\"button\">写文章</button></div>\n  </div>\n  <button class=\"zf-shortcut zf-profile\" type=\"button\">我的主页</button>\n </nav>\n <div class=\"zf-status\" role=\"status\"></div>\n";
    const plus = el.querySelector('.zf-plus');
    const menu = el.querySelector('.zf-menu');
    const status = el.querySelector('.zf-status');
    let busy = false;

    function closeMenu() {
      menu.hidden = true;
      plus.setAttribute('aria-expanded', 'false');
    }

    async function waitFor(find) {
      const deadline = Date.now() + 3000;
      do {
        const result = find();
        if (result) return result;
        await new Promise(resolve => setTimeout(resolve, 50));
      } while (Date.now() < deadline);
      throw new Error('知乎原生入口尚未加载，请稍后再试。');
    }

    function nativeItem(text, scope = document) {
      return Array.from(scope.querySelectorAll('button, a, [role="menuitem"]'))
        .find(node => !el.contains(node) && node.textContent.trim() === text);
    }

    async function run(task) {
      if (busy) return;
      busy = true;
      status.textContent = '';
      try { await task(); }
      catch (error) { status.textContent = error.message; }
      finally { busy = false; }
    }

    async function create(text) {
      const toggle = await waitFor(() => document.querySelector(
        '.SearchBar-askContainer button[aria-label="创作"]'
      ));
      if (toggle.getAttribute('aria-expanded') !== 'true') toggle.click();
      const item = await waitFor(() => {
        const popup = toggle.id ? Array.from(document.querySelectorAll('.Popover-content'))
          .find(node => (node.getAttribute('aria-labelledby') || '')
            .split(/\s+/).includes(toggle.id)) : null;
        return popup ? nativeItem(text, popup) : null;
      });
      item.click();
    }

    async function openProfile() {
      const existing = document.querySelector(
        '.AppHeader .AppHeader-profile a[href*="/people/"],' +
        '.AppHeader a.AppHeader-profileEntry[href*="/people/"]'
      );
      if (existing) { existing.click(); return; }
      const toggle = await waitFor(() => {
        const header = document.querySelector('.AppHeader');
        return header?.querySelector(
          'button.AppHeader-profileEntry,.AppHeader-profile button[aria-haspopup]'
        ) || header?.querySelector('.AppHeader-profileAvatar')?.closest('button');
      });
      if (toggle.getAttribute('aria-expanded') !== 'true') toggle.click();
      (await waitFor(() => nativeItem('我的主页'))).click();
    }

    el.querySelector('form').addEventListener('submit', event => {
      event.preventDefault();
      const query = el.querySelector('input').value.trim();
      if (query) location.assign('/search?type=content&q=' + encodeURIComponent(query));
    });
    plus.addEventListener('click', () => {
      menu.hidden = !menu.hidden;
      plus.setAttribute('aria-expanded', String(!menu.hidden));
      if (!menu.hidden) menu.querySelector('button').focus();
    });
    menu.addEventListener('click', event => {
      const button = event.target.closest('button');
      if (!button || !menu.contains(button)) return;
      closeMenu();
      plus.focus();
      run(() => create(button.textContent.trim()));
    });
    el.querySelector('.zf-profile').addEventListener('click', () => {
      closeMenu();
      run(openProfile);
    });
    document.addEventListener('click', event => {
      if (!el.querySelector('.zf-create').contains(event.target)) closeMenu();
    });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && !menu.hidden) {
        closeMenu();
        plus.focus();
      }
    });
    return el;
  }

  function update() {
    const path = location.pathname.replace(/\/+$/, '') || '/';
    const mode = path === '/' ? 'home' : path === '/follow' ? 'follow' : '';
    if (html.dataset.zf !== mode) html.dataset.zf = mode;
    for (const node of previouslyHidden) node.removeAttribute(HIDE);
    previouslyHidden.clear();
    if (!document.body) return;

    if (mode === 'home') {
      if (!panel) panel = createPanel();
      if (!panel.isConnected) document.body.appendChild(panel);
      if (!hasLogo) {
        const source = document.querySelector('.AppHeader .AppHeader-logo');
        const svg = source?.matches('svg') ? source : source?.querySelector('svg');
        if (svg) {
          const clone = svg.cloneNode(true);
          clone.removeAttribute('class');
          clone.removeAttribute('style');
          panel.querySelector('.zf-logo').replaceChildren(clone);
          hasLogo = true;
        }
      }
    } else if (panel?.isConnected) {
      panel.remove();
    }

    if (mode !== 'follow') return;
    const header = document.querySelector('.AppHeader');
    let branch = header?.querySelector('.SearchBar');
    while (branch && branch !== header) {
      let sibling = branch.previousElementSibling;
      while (sibling) {
        sibling.setAttribute(HIDE, '');
        previouslyHidden.add(sibling);
        sibling = sibling.previousElementSibling;
      }
      branch = branch.parentElement;
    }
  }

  function schedule() {
    if (pending) return;
    pending = true;
    requestAnimationFrame(() => { pending = false; update(); });
  }
  update();
  new MutationObserver(schedule).observe(html, {childList: true, subtree: true});
  for (const name of ['pushState', 'replaceState']) {
    const original = history[name];
    history[name] = function (...args) {
      const result = original.apply(this, args);
      schedule();
      return result;
    };
  }
  window.addEventListener('popstate', schedule);
  }
  // Some script managers execute before the <html> element exists.
  if (document.documentElement) {
    start();
  } else {
    const ready = new MutationObserver(() => {
      if (!document.documentElement) return;
      ready.disconnect();
      start();
    });
    ready.observe(document, {childList: true});
  }
})();
