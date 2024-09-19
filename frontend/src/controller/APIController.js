const refreshToken = async () => {
	console.log("Refreshing token");
	let currentToken = localStorage.getItem("currentToken");
	let invalid = false;
	if (currentToken === null || currentToken === undefined) {
		invalid = true;
	}
	if (!invalid) {
		currentToken = JSON.parse(currentToken);
		currentToken.expiry > Date.now() ? (invalid = true) : (invalid = false);
	}
	if (invalid) {
		const response = await fetch("http://localhost:8000/token");
		let jsonResponse = await response.json();
		let tokenObj = {
			token: jsonResponse.access_token,
			expiry: Date.now() + jsonResponse.expires_in,
		};
		localStorage.setItem("currentToken", JSON.stringify(tokenObj));
		return tokenObj.token;
	}
	return currentToken.token;
};

const fetchTopPlaylists = async () => {
	console.log("Fetching top playlists");
	const token = await refreshToken();
	const response = await fetch("http://localhost:8000/trending", {
		method: "GET",
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
		},
	});
	let jsonResponse = await response.json();
	console.log(jsonResponse);
	return jsonResponse;
};

const fetchTopArtisis = async () => {
	const response = await fetch("http://localhost:8000"); // Edit based on the local server
	return response.json();
};

const apiHelper = (type) => {
	if (type === "top-playlists") {
		return fetchTopPlaylists();
	} else if (type === "top-artists") {
		return fetchTopArtisis();
	}
	return null;
};

export default apiHelper;
