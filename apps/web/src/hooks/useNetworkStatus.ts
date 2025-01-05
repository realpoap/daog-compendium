import { useEffect, useState } from 'react';

const mode = import.meta.env.MODE;

const useNetworkStatus = () => {
	const [isOnline, setOnline] = useState<boolean>(false);

	const updateNetworkStatus = async () => {
		console.log('mode:', mode);

		if (mode === 'production') {
			const req = await fetch(
				'https://daog-compendium.onrender.com/healthcheck',
			);
			if (req.status !== 200) {
				setOnline(false);
			} else {
				setOnline(true);
			}
		}
		if (mode === 'development') {
			console.log('in dev server ping');
			setTimeout(() => {
				setOnline(true);
			}, 1000);
		}
	};

	//sometimes, the load event does not trigger on some browsers, that is why manually calling updateNetworkStatus on initial mount
	useEffect(() => {
		updateNetworkStatus();
	}, []);

	useEffect(() => {
		window.addEventListener('load', updateNetworkStatus);
		window.addEventListener('online', updateNetworkStatus);
		window.addEventListener('offline', updateNetworkStatus);

		return () => {
			window.removeEventListener('load', updateNetworkStatus);
			window.removeEventListener('online', updateNetworkStatus);
			window.removeEventListener('offline', updateNetworkStatus);
		};
	}, [navigator.onLine]);

	return { isOnline };
};

export default useNetworkStatus;
