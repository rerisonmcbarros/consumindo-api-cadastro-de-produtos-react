import { useState } from 'react'

const useFetch = () => {
    const baseURL = "http://localhost:81/api";
    const [loading, setLoading] = useState(false);

    const get = async (url, token) => {
        try {
            setLoading(true);
            let response = await fetch(baseURL + `${url}`, {
                headers:{
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })

            setLoading(false);
            return response;
            
        } catch (error) {
            console.log(error);            
        }
    }

    const create = async (url, data, token) => {
        let formData = new FormData();
        Object.keys(data).map((value) => {
            if (data[value] instanceof Array) {
                data[value].map(item => {
                    formData.append(`${value}[]`, item);
                });
                return;
            }
            formData.append(value, data[value]);
        });

        try {
            setLoading(true);
            let response = await fetch(baseURL + `${url}`, {
                method: "POST",
                headers:{
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });

            setLoading(false);
            return response;
            
        } catch (error) {
            console.log(error);            
        }
    }

    const edit = async (url, data, token) => {
        try {
            setLoading(true);
            let response = await fetch(baseURL + `${url}`, {
                method: "PUT",
                headers:{
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(data)
            });

            setLoading(false);
            return response;
            
        } catch (error) {
            console.log(error);            
        }
    }

    const remove = async (url, data, token) => {
        try {
            let idItem = data.id;
            setLoading(true);
            let response = await fetch(baseURL + `${url}` + `/${idItem}`, {
                method: "DELETE",
                headers:{
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })

            setLoading(false);
            return response;
            
        } catch (error) {
            console.log(error);            
        }
    }

  return {get, create, edit, remove, loading, baseURL};
}

export default useFetch
