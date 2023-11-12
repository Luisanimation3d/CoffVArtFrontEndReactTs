import { useState } from 'react';

type methodOptions = 'GET' | 'POST' | 'PUT' | 'DELETE';

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

			const config = {
				method,
				url: `${baseUrl}${url}`,
				headers: {
					'Content-Type': 'application/json',
				},
				data: body,
			};

			const response = await fetch(config.url, config);
			const json: any[] = await response.json();
			setData(json);
		} catch (error) {
			setError(error);
		} finally {
			setLoading(false);
		}
	};

	const get = (url: string) => fetchData(url, 'GET');
	const post = (url: string, body: any) => fetchData(url, 'POST', body);
	const put = (url: string, body: any) => fetchData(url, 'PUT', body);
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
