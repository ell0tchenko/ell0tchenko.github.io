import { queryList } from "./query"
export function encodeCredentials(username, password) {
    const credentials = `${username}:${password}`
    const encodedCredentials = btoa(credentials)
    return encodedCredentials
}

export async function getData(auth) {
    const queries = [
        { query: queryList.userQuery },
        { query: queryList.xpAmountQuery },
        { query: queryList.skillsQuery },
        { query: queryList.nestedQuery },
        { query: queryList.upAuditQuery },
        { query: queryList.downAuditQuery },

    ]
    if (auth === false) {
        return false
    }
    const response = await fetch('https://01.kood.tech/api/graphql-engine/v1/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${auth}`
        },
        body: JSON.stringify(queries)
    });
    const data = await response.json()
    return data
}


export async function login(username, password) {
    let encodedCredentials = encodeCredentials(username, password)
    const response = await fetch('https://01.kood.tech/api/auth/signin', {
        method: 'POST',
        headers: {
            'Authorization': `Basic ${encodedCredentials}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({})
    });

    if (!response.ok) {
        // Handle non-successful response (e.g., network errors, HTTP errors)
        // throw new Error(`HTTP error! Status: ${response.status}`);
        return false
    }

    const data = await response.json();
    return data
}


