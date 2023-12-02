import i18next from "i18next";
import ar from "./navigation-i18n/ar";
import en from "./navigation-i18n/en";
import tr from "./navigation-i18n/tr";
import es from "./navigation-i18n/es";

i18next.addResourceBundle("en", "navigation", en);
i18next.addResourceBundle("tr", "navigation", tr);
i18next.addResourceBundle("ar", "navigation", ar);
i18next.addResourceBundle("es", "navigation", es);

const navigationConfig = [
  {
    id: "dashboard",
    title: "Panel",
    translate: "DASHBOARD",
    type: "item",
    icon: "heroicons-outline:home",
    url: "dashboard",
  },
  {
    id: "example-component",
    title: "Example",
    translate: "EXAMPLE",
    type: "item",
    icon: "heroicons-outline:star",
    url: "example",
  },
  {
    id: "users",
    title: "Usuarios",
    translate: "USERS",
    type: "item",
    icon: "material-solid:person_outline",
    url: "example",
  },
  {
    id: "projects",
    title: "Proyectos",
    translate: "PROJECTS",
    type: "item",
    icon: "heroicons-outline:clipboard-check",
    url: "project",
  },
];

export default navigationConfig;
