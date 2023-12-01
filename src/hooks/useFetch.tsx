import { useState } from 'react';

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

	const fetchData = async (
		url: string,
		method: methodOptions,
		body: any = null
	) => {
		try {
			setLoading(true);
			setError(null);
			const config: FetchProps = {
				method,
				url: `${baseUrl}${url}`,
				mode: "no-cors",
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(body),
			};

			const response = config.method === 'GET' ? await fetch(config.url, {
				method: config.method,
				headers: config.headers,
			}) : await fetch(config.url, {
				method: config.method,
				headers: config.headers,
				body: config.body,
			});
			const json: any[] = await response.json();
			setData(json);
		} catch (error) {
			setError(error);
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
