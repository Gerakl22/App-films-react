export async function makeRequest(url, method="GET", body) {
    const params = {
        method,
    };

    if(body && (method === "POST" || method === "PATCH" || method === "PUT")) {
        params.body = JSON.stringify(body);
        params.headers = {
            "content-type": 'application/json',
        }
    }

    const response = await fetch(url, params);

    if(!response.ok) {
        throw new Error(`Unexpected status code: ${response.status}`)
    }

    if(response.status !== 204) {
        return response.json();
    }

}