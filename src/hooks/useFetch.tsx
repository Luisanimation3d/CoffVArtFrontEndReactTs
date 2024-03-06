import { useState } from 'react';
import {useAuth} from "../context/AuthContext.tsx";

type methodOptions = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface FetchProps {
	method: methodOptions;
	url: string;
	body?: any;
	mode?: RequestMode | undefined;
	headers?: HeadersInit;
}

function isJson(str: string) {
	try {
		JSON.parse(str);
		return true
	} catch (e) {
		return false;
	}
}

export const useFetch = (baseUrl: string) => {
    const [data, setData] = useState<any>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<any>(false);

	const {token, isAuthenticated} = useAuth();

	const fetchData = async (
		url: string,
		method: methodOptions,
		body: any = null,
		file: boolean = false
	) => {
		try {
			setLoading(true);
			setError(null);
			const config: FetchProps =  file ? isAuthenticated ? {
				method,
				url: `${baseUrl}${url}`,
				headers: {
					'Authorization': `Bearer ${token}`,
				},
				mode: "no-cors",
				body: body,
			} : {
				method,
				url: `${baseUrl}${url}`,
				mode: "no-cors",
				body: body,
			} : {
				method,
				url: `${baseUrl}${url}`,
				mode: "no-cors",
				headers: isAuthenticated ? {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${token}`,
				} : {
					'Content-Type': 'application/json',
				},
				body: body,
			}

			const response = config.method === 'GET' || config.method === 'DELETE' ? await fetch(config.url, {
				method: config.method,
				headers: config.headers,
			}) : await fetch(config.url, {
				method: config.method,
				headers: config.headers,
				body: config.body,
			});
			if (!response.ok) {
				const errorCatched = await response.json();
				throw new Error(isJson(JSON.stringify({...errorCatched})) ? JSON.stringify({...errorCatched}) : errorCatched || errorCatched.error);
			}
			const json: any = await response.json();
			setData(json);
		} catch (errorCatched: any) {
			setError(isJson(errorCatched.message) ? JSON.parse(errorCatched.message) : errorCatched.message)
		} finally {
			setLoading(false);
		}
	};

	const get = (url: string) => fetchData(url, 'GET');
	const post = (url: string, body: any) => fetchData(url, 'POST', JSON.stringify(body));
	const postFile = (url: string, body: any) => fetchData(url, 'POST', body, true);
	const put = (url: string, body: any) => fetchData(url, 'PUT', JSON.stringify(body));
	const del = (url: string) => fetchData(url, 'DELETE');

	return {
		data,
		loading,
		error,
		get,
		post,
		postFile,
		put,
		del,
	};
};
