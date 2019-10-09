import './style.css';

// Polyfill
if (!Element.prototype.matches)
  Element.prototype.matches =
    Element.prototype.msMatchesSelector ||
    Element.prototype.webkitMatchesSelector;

if (!Element.prototype.closest)
  Element.prototype.closest = function(s) {
    var el = this;
    if (!document.documentElement.contains(el)) return null;
    do {
      if (el.matches(s)) return el;
      el = el.parentElement;
    } while (el !== null);
    return null;
  };

const root = document.getElementById('toast-root');

const removeToast = el => {
  root.removeChild(el);
  el.removeEventListener('click', onToastClick);
  el.remove();
};

const onToastClick = e => {
  const toast = e.target.closest('.viewer-toast');
  if (toast) {
    const duration = toast.toast_duration;
    const transition = toast.toast_transition;

    toast.style.opacity = '0';
    if (duration && duration < 0) {
      setTimeout(() => {
        removeToast(toast);
      }, transition);
    }
  }
};

class Toast {
  static show({
    html = '',
    duration = 3000,
    transition = 200,
    color = '#fff',
    background = '#323232',
  } = {}) {
    let id = new Date().getTime().toString(36) + Math.random().toString(36);
    let el = Toast._createElement(id);

    el.innerHTML = html;
    el.style.color = color;
    el.style.background = background;
    el.style.transition = `opacity ${transition}ms`;

    el.toast_duration = duration;
    el.toast_transition = transition;

    root.appendChild(el);
    setTimeout(() => {
      el.style.opacity = '1';
    }, 0);
    if (duration > 0) {
      setTimeout(() => {
        el.style.opacity = '0';
      }, duration);
      setTimeout(() => {
        removeToast(el);
        el = null;
        id = null;
      }, duration + transition);
    }
  }

  static _createElement(id) {
    const el = document.createElement('div');
    el.classList.add('viewer-toast');
    el.id = id;
    el.addEventListener('click', onToastClick);
    return el;
  }
}

window.Toast = Toast;
export default Toast;
