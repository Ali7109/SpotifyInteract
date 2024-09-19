import base64
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os
import requests

# Load environment variables
load_dotenv()

app = FastAPI()

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

CLIENT_ID = os.getenv("CLIENT_ID")
CLIENT_SECRET = os.getenv("CLIENT_SECRET")

# Get access token using API Credentials
url = "https://accounts.spotify.com/api/token"
headers = {
    "Authorization": "Basic "
    + base64.b64encode(f"{CLIENT_ID}:{CLIENT_SECRET}".encode()).decode(),
}

data = {"grant_type": "client_credentials"}


@app.get("/token")
def read_root():
    response = requests.post(url, headers=headers, data=data)
    return response.json()


# Get list of trending playlists
@app.get("/trending")
def get_trending_playlists(request: Request):

    def format_res(res):
        playlists = res["playlists"]["items"]
        formatted_playlists = []
        for playlist in playlists:
            formatted_playlists.append(
                {
                    "name": playlist["name"],
                    "description": playlist["description"],
                    "url": playlist["external_urls"]["spotify"],
                    "image": playlist["images"][0]["url"],
                }
            )
        return formatted_playlists

    auth_header = request.headers["Authorization"]

    if not auth_header:
        return {"error": "No Authorization header provided"}

    token = auth_header.split(" ")[1]
    response = requests.get(
        "https://api.spotify.com/v1/browse/featured-playlists",
        headers={
            "Authorization": f"Bearer {token}",
        },
    )
    response_json = response.json()

    formatted_response = format_res(response_json)
    return formatted_response
