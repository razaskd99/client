
import { getAllRfxRecords } from "@/app/api/rfx/scripts";
import BidsList from "@/components/Bids";
import getConfig from 'next/config'
import { redirect } from 'next/navigation'

const BidPage = async () => {

  
  const { serverRuntimeConfig } = getConfig() || {};

  let accessToken = ''
  let apiBackendURL = ''
  let tenantID = 0
  let isLogin=false
  // get server side global store data
  if (serverRuntimeConfig) {
    // get api backend url
    apiBackendURL = serverRuntimeConfig.API_BACKEND_SERVER
    // get access token
    accessToken = serverRuntimeConfig.API_ACCESS_TOKEN_SERVER
    tenantID = serverRuntimeConfig.TENANT_ID
    isLogin = serverRuntimeConfig.IS_LOGIN

  }
  // call all rfx request
  let records = await getAllRfxRecords(apiBackendURL, accessToken, tenantID)

  // get all rfx 
  let rfxRecords = records.rfxData;
if(!isLogin) redirect("/login")
  return (
    rfxRecords.length > 0
    ?
    <BidsList rfxRec={rfxRecords} />
    :
    <div class="p-4 text-center text-sm text-gray-800 rounded-lg bg-gray-50 dark:bg-gray-800 dark:text-gray-300" role="alert">
      Bid records are not found.
    </div>
  )
}
export default BidPage

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
