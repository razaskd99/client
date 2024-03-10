
import { getAllRfxRecords } from "@/app/api/rfx/scripts";
import RfxList from "@/components/Rfx";

// start for login check
import getConfig from "next/config";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { getFullDomainName } from "@/app/api/util/loginHandle";
let isLogin = false;
// end for login check

const RfxPage = async () => {


  const { serverRuntimeConfig } = getConfig() || {};

  let accessToken = ''
  let apiBackendURL = ''
  let tenantID = 0
  let isLogin = false
  // get server side global store data
  if (serverRuntimeConfig) {
    // get api backend url
    apiBackendURL = serverRuntimeConfig.API_BACKEND_SERVER
    // get access token
    accessToken = serverRuntimeConfig.API_ACCESS_TOKEN_SERVER
    tenantID = serverRuntimeConfig.TENANT_ID

    // start check login
    let homeURL = getFullDomainName(headers);
    isLogin = serverRuntimeConfig.IS_LOGIN;
    if (!isLogin) {
      redirect(homeURL + "login");
    }
    // end check login


  }


  // call all rfx request
  let records = await getAllRfxRecords(apiBackendURL, accessToken, tenantID)
  let rfxdata = records.rfxData

  // get all rfx
  let rfxRecords = rfxdata.find(item => item.bid_number === "")
  if (rfxRecords?.length > 0) {
  }
  else {
    rfxRecords = [{ ...rfxRecords }]
  }

  rfxRecords = records.rfxData


  return (
    rfxRecords.length > 0
    ?
    <RfxList rfxRec={rfxRecords} />
    :
    <div class="p-4 text-center text-sm text-gray-800 rounded-lg bg-gray-50 dark:bg-gray-800 dark:text-gray-300" role="alert">
      Rfx records are not found.
    </div>
  )
}
export default RfxPage

// const rows = [
//     {id: 1,checkbox: 'dddd.png',description: 'Urea Plant Expansion',rfxid: 'RFX-101132',customer: 'Farmer Fertilizers',type: 'Firm',duedate: '8 Jul 2021',contacts: 'Sara Andrew',status: 'RFx Issued',
//       biId:'BID-187678',new: 'New', issue:'19 June, 2022', sales: 'Tysen',},
//     {id: 2,checkbox: 'Galaxy Petroleum.png',description: 'Sixth Terminal DRX',rfxid: 'RFX-101732',customer: 'Farmer Fertilizers',type: 'Firm',duedate: '4 Jul 2022',contacts: 'Nathan Phillip',status: 'RFx Acknowledg.',
//     },
//     {id: 3,checkbox: 'dddd.png',description: 'Cross Country Pipeline',rfxid: 'RFX-101132',customer: 'Farmer Fertilizers',type: 'Firm',duedate: '8 Jul 2021',contacts: 'Sara Andrew',status: 'RFx Issued',
//     },
//     {id: 4,checkbox: 'Galaxy Petroleum.png',description: 'Ring 3 Gas Plant',rfxid: 'RFX-101732',customer: 'Farmer Fertilizers',type: 'Firm',duedate: '4 Jul 2022',contacts: 'Nathan Phillip',status: 'RFx Acknowledg.',
//     },
//     {id: 5,checkbox: 'dddd.png',description: 'Phase-II Electrification',rfxid: 'RFX-101132',customer: 'Farmer Fertilizers',type: 'Firm',duedate: '8 Jul 2021',contacts: 'Sara Andrew',status: 'RFx Issued',
//     },
//     {id: 6,checkbox: 'Galaxy Petroleum.png',description: 'Gemon Energy storage',rfxid: 'RFX-101732',customer: 'Farmer Fertilizers',type: 'Firm',duedate: '4 Jul 2022',contacts: 'Nathan Phillip',status: 'RFx Acknowledg.',
//     },
//     {id: 7,checkbox: 'Galaxy Petroleum.png',description: 'DRP Refinery Automation',rfxid: 'RFX-101732',customer: 'Farmer Fertilizers',type: 'Firm',duedate: '4 Jul 2022',contacts: 'Nathan Phillip',status: 'RFx Acknowledg.',
//     },
//     {id: 8,checkbox: 'Galaxy Petroleum.png',description: 'Digitalization - Phase-I ',rfxid: 'RFX-101732',customer: 'Farmer Fertilizers',type: 'Firm',duedate: '4 Jul 2022',contacts: 'Nathan Phillip',status: 'RFx Acknowledg.',
//     },
//   ];
