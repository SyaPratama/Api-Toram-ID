import axios from "axios";

class URI 
{
    constructor(URL = `https://toram-id.com`)
    {
        this.URI = URL;
    }

    async get(endpoint)
    {
        return axios.get(`${this.URI}${endpoint}`,
            {
                headers:
                {
                    "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36"
                }
            }
        )
    }

    async post(endpoint,data)
    {
        return axios.post(`${this.URI}${endpoint}`,data,{
            headers:
            {
                "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36"
            }
        })
    }
}

export const URL = new URI();