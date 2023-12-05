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

export const useFetch = (baseUrl: string) => {
    const [data, setData] = useState<any>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<any>(false);

	const {token, isAuthenticated} = useAuth();

	const fetchData = async (
		url: string,
		method: methodOptions,
		body: any = null
	) => {
		try {
			setLoading(true);
			setError(null);
			const config: FetchProps = isAuthenticated ? {
				method,
				url: `${baseUrl}${url}`,
				mode: "no-cors",
				headers: {
					'Authorization': `Bearer ${token}`,
					'Content-Type': 'application/json',
				},
				body: body,
			} : {
				method,
				url: `${baseUrl}${url}`,
				mode: "no-cors",
				headers: {
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
				throw new Error(errorCatched.msg || errorCatched.error);
			}
			const json: any = await response.json();
			setData(json);
		} catch (errorCatched: any) {
			setError(errorCatched.message)
		} finally {
			setLoading(false);
		}
	};

	const get = (url: string) => fetchData(url, 'GET');
	const post = (url: string, body: any) => fetchData(url, 'POST', JSON.stringify(body));
	const put = (url: string, body: any) => fetchData(url, 'PUT', JSON.stringify(body));
	const del = (url: string) => fetchData(url, 'DELETE');

	return {
		data,
		loading,
		error,
		get,
		post,
		put,
		del,
	};
};
