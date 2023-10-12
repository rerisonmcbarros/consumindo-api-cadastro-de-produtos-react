import { useEffect, useState } from 'react'

const useFetch = (url = null, apiToken = null) => {
    const baseURL = "http://localhost:81/api";
    const [response, setResponse] = useState(false);
    const [error, setError] = useState(null);
    const [config, setConfig] = useState(null);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);
    const [token, setToken] =  useState(null);

    useEffect(() => {
        if(apiToken){
            setToken(apiToken);
        }
    }, [apiToken]);

    useEffect(() => {
        
        if (token && url) {
            const httpRequest = async () => {
    
                setLoading(true);
                let response = await fetch(baseURL + url, {
                    headers:{
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                })

                if (!response.ok) {
                    setError({
                        status: response.status, 
                        statusText: response.statusText,
                        data: await response.json()
                    });
                    setLoading(false);
                    return;
                }

                setLoading(false);
                setData(await response.json());
            }    
        
            httpRequest();
        }
    }, [response, token]);


    useEffect(() => {
        if (!config) {
            return;
        }

        try {
            const httpRequest = async () => {
                let response = null; 

                if (config.method == "GET") {
                    setLoading(true);
                    response = await fetch(baseURL + `${url ?? config.url}`, {
                        headers:{
                            'Accept': 'application/json',
                            'Authorization': `Bearer ${token ?? config.token}`
                        }
                    })
                }

                if (config.method == "DELETE") {
                    let idItem = config.data.id;
                    setLoading(true);
                    response = await fetch(baseURL + `${url ?? config.url}` + `/${idItem}`, {
                        method: "DELETE",
                        headers:{
                            'Accept': 'application/json',
                            'Authorization': `Bearer ${token ?? config.token}`
                        }
                    })
                }
        
                if (config.method == "POST") {
                    setLoading(true);
                    response = await fetch(baseURL + `${url ?? config.url}`, {
                        method: "POST",
                        headers:{
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                            'Authorization': `Bearer ${token ?? config.token}`
                        },
                        body: JSON.stringify(config.data)
                    });
                }

                if (config.method == "PUT") {
                    setLoading(true);
                    response = await fetch(baseURL + `${url ?? config.url}`, {
                        method: "PUT",
                        headers:{
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                            'Authorization': `Bearer ${token ?? config.token}`
                        },
                        body: JSON.stringify(config.data)
                    });
                }

                if (!response.ok) {
                    setLoading(false);
                    setError({
                        status: response.status, 
                        statusText: response.statusText, 
                        data: await response.json()
                    });
                    setLoading(false);
                    return;
                }

                let data = null;

                if (response.status != 204) {
                    data = await response.json();
                }

                setLoading(false);
                setData(data);
                setResponse(response);
            }
         
            httpRequest();

        } catch (error) {
            console.log(error);
            setLoading(false);
        }
        
    }, [config]);

    const httpConfig = (url = null, method = null, data = null, token = null) => {

        setConfig({
            url,
            method,
            data,
            token
        })
    }

  return {data, setToken, httpConfig, error, loading, baseURL};
}

export default useFetch