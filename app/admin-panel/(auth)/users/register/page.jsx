import Breadcrumbs from "@/app/controlpanel/components/Breadcrumbs";
import Image from "next/image";
import Link from "next/link";
import AdminPanelUserRegistrationForm from "../components/RegisterForm";

// start for login check
import getConfig from "next/config";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { getFullDomainName } from "@/app/api/util/loginHandle";
let isLogin = false;
// end for login check

export default async function AdminPanelUserRegistration() {
  const { serverRuntimeConfig } = getConfig() || {};
  let accessToken = "";
  let apiBackendURL = "";
  let tenantID = 0;
  // get server side global store data
  if (serverRuntimeConfig) {
    // get api backend url
    apiBackendURL = serverRuntimeConfig.API_BACKEND_SERVER;
    // get access token
    accessToken = serverRuntimeConfig.API_ACCESS_TOKEN_SERVER;
    tenantID = serverRuntimeConfig.TENANT_ID;
    isLogin = serverRuntimeConfig.IS_LOGIN;

    // start check login
    let homeURL = getFullDomainName(headers);
    isLogin = serverRuntimeConfig.IS_LOGIN;
    if (!isLogin) {
      redirect(homeURL + "login");
    }
    // end check login
  }

  const breadcrumbItems = [
    { label: "Users", href: "/admin-panel/users" },
    { label: "New User", href: "/controlpanel/register" },
  ];

  return (
    <div className=" w-full">
      <div className="flex w-full">
        <Breadcrumbs items={breadcrumbItems} />
      </div>
      <AdminPanelUserRegistrationForm
        apiBackendURL={apiBackendURL}
        accessToken={accessToken}
        tenantID={tenantID}
      />
    </div>
  );
}
