window.addEventListener("DOMContentLoaded", () => {
  const steps = new StepIndicator(".steps");
});

class StepIndicator {
  el = 1;
  steps = 6;

  constructor(el) {
    this.el = document.querySelector(el);
    document.addEventListener("click", this.clickAction.bind(this));
    this._step = 0;
    this.displayStep(this.step);
    this.checkExtremes();
  }

  get step() {
    return this._step;
  }

  set step(value) {
    this.displayStep(value);
    this._step = value;
    this.checkExtremes();
  }

  clickAction(e) {
    const button = e.target;
    const actionName = button?.getAttribute("data-action");

    if (actionName === "prev") {
      this.prev();
    } else if (actionName === "next") {
      this.next();
    }
  }

  prev() {
    if (this.step > 0) {
      this.step--;
    }
  }


  next() {
    if (this.step < this.steps - 1) {
      this.step++;
    }
  }


  checkExtremes() {
    const prevBtnEl = document.querySelector(`[data-action="prev"]`);
    const nextBtnEl = document.querySelector(`[data-action="next"]`);

    if (prevBtnEl) {
      prevBtnEl.disabled = this.step <= 0;
    }
    if (nextBtnEl) {
      nextBtnEl.disabled = this.step >= this.steps - 1;
    }
  }

  displayStep(targetStep) {
    const current = "steps__step--current";
    const done = "steps__step--done";

    for (let s = 0; s < this.steps; ++s) {
      const stepEl = this.el?.querySelector(`[data-step="${s}"]`);
      stepEl?.classList.remove(current, done);

      if (s < targetStep) {
        stepEl?.classList.add(done);
      } else if (s === targetStep) {
        stepEl?.classList.add(current);
      }
    }
  }
}
