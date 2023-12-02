import i18next from "i18next";

import DashboardApp from "./DashboardApp";
import es from "./i18n/es";

i18next.addResourceBundle("es", "dashboardApp", es);

const DashboardAppConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: "dashboard",
      element: <DashboardApp />,
    },
  ],
};

export default DashboardAppConfig;
