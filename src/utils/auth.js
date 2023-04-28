const BASE_URL = "https://api.mesto.harkova.nomoredomains.work";

function checkResponse(res) {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
};

function request(endPoint, options) {
  return fetch((`${BASE_URL}/${endPoint}`), options).then(checkResponse);
}

export function register(password, email) {
  return request("signup", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password, email }),
  });
};

export function authorize(password, email) {
  return request("signin", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password, email }),
  });
};

export function checkToken(token) {
  return request("users/me", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};