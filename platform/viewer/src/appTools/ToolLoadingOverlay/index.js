import './style.css';

class ToolLoadingOverlay {
  constructor(id) {
    this.el = document.createElement('div');
    this.el.classList.add('tool-loading-overlay');
    this.el.id = id;
    this.el.innerHTML = '<span>Loading...</span>';

    this.parent = null;
  }

  show(element) {
    if (!element) this.parent = document.body;
    else this.parent = element.parentElement;
    this.parent.appendChild(this.el);
  }

  hide() {
    if (!this.parent) return;

    this.parent.removeChild(this.el);
    this.parent = null;
  }
}

export default ToolLoadingOverlay;
