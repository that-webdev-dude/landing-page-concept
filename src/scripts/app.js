function app() {
  class StyleManager {
    static set(element, property, value) {
      if (element) element.style[property] = value;
    }
  }

  class ScrollBarManager {
    static hide(selector = "body") {
      const element = document.querySelector(selector);
      if (element) {
        StyleManager.set(element, "overflow", "hidden");
      } else {
        console.warn(
          `ScrollBarManager: selector = ${selector} points to NO element`
        );
      }
    }

    static show(selector = "body") {
      const element = document.querySelector(selector);
      if (element) {
        StyleManager.set(element, "overflow", "auto");
      } else {
        console.warn(
          `ScrollBarManager: selector = ${selector} points to NO element`
        );
      }
    }
  }

  const navDrawer = {
    active: false,
    element: document.querySelector("#drawer"),
    triggers: [
      document.querySelector("#drawer-close"),
      document.querySelector("#nav-menu"),
      ...Array.from(document.querySelectorAll(".drawer-link")),
    ],
  };
  const toggleClass = (element, className) => {
    element.classList.contains(className)
      ? element.classList.remove(className)
      : element.classList.add(className);
  };
  const toggleState = () => {
    navDrawer.active = !navDrawer.active;
    navDrawer.active ? ScrollBarManager.hide() : ScrollBarManager.show();
    toggleClass(navDrawer.element, "active");
  };
  navDrawer.triggers.forEach((trigger) => {
    trigger.addEventListener("click", toggleState);
  });
}

app();
