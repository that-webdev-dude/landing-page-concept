// import HelloWorldClass from "./components/HelloWorld";

export default function() {
  // const hello = new HelloWorldClass();

  class ScrollBar {
    static hide(selector) {
      el = document.querySelector(selector);
      el.style.overflow = "hidden";
    }

    static show(selector) {
      el = document.querySelector(selector);
      el.style.overflow = "auto";
    }
  }

  const navDrawer = {
    active: false,
    element: document.querySelector("#drawer"),
    triggers: [document.querySelector("#drawer-close"), document.querySelector("#nav-menu"), ...Array.from(document.querySelectorAll(".drawer-link"))],
    container: document.querySelector("#body")
  };

  const toggleClass = (element, className) => {
    element.classList.contains(className) ? element.classList.remove(className) : element.classList.add(className);
  };

  const hideScrollbar = element => {
    element.style.overflow = "hidden";
  };

  const showScrollbar = element => {
    element.style.overflow = "auto";
  };

  const toggleState = () => {
    navDrawer.active = !navDrawer.active;
    navDrawer.active ? hideScrollbar(navDrawer.container) : showScrollbar(navDrawer.container);
    toggleClass(navDrawer.element, "active");
  };

  navDrawer.triggers.forEach(trigger => {
    trigger.addEventListener("click", () => {
      toggleState();
    });
  });
}
