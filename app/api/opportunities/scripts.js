"use server"
const axios = require('axios');

export const getAllOppotunitiesRecords = async (apiBackendURL, accessToken, tenantID) => {
    try {
        const url = `${apiBackendURL}opportunity/Opportunity/${tenantID}`;

        const response = await axios.get(url, {
            cache: "no-store",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
            timeout: 0, // Setting timeout to maximum value
        });

        if (!response.status === 200) {
            return {
                statusCode: "400",
                rfxData: [],
                error: response.statusText || 'Request failed for Rfxs',
            };
        }

        return {
            statusCode: 200,
            rfxData: response.data,
        };
    } catch (error) {
        return {
            statusCode: "400",
            rfxData: [],
            error: error.message || 'Request failed for Rfxs',
        };
    }
};


export const getOpportunityByID = async (apiBackendURL, accessToken, tenantID, id) => {
    try {
        const url = `${apiBackendURL}opportunity/Opportunity/${tenantID}/id/${id}`;

        const response = await axios.get(url, {
            cache: "no-store",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
            timeout: 0, // Setting timeout to maximum value
        });

        if (!response.status === 200) {
            return {
                statusCode: "400",
                opportunityData: [],
                error: response.statusText || 'Request failed for Rfxs',
            };
        }

        return {
            statusCode: 200,
            opportunityData: response.data,
        };
    } catch (error) {
        return {
            statusCode: "400",
            opportunityData: [],
            error: error.message || 'Request failed for Rfxs',
        };
    }
};
