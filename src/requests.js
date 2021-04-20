const apiBase = 'https://jsonplaceholder.typicode.com';

const getResource = async url => {
	const res = await fetch(`${apiBase}${url}`);

	if (!res.ok) {
		throw new Error(`Could not fetch ${url}, received ${res.status}`);
	}
	return await res.json();
};

export const fetchUsers = () => {
	return getResource(`/users`);
};

export const fetchAlbums = () => {
	return getResource(`/albums`);
};

export const fetchPhotos = () => {
	return getResource(`/photos`);
};
