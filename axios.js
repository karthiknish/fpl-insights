import axios from "axios";

export const req = axios.create({
  baseUrl: '"https://fantasy.premierleague.com/api/bootstrap-static"',
  headers: {
    "User-Agent": "PostmanRuntime/7.26.2",
  },
});
