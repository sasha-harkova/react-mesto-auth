class Api {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }

  _checkResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status} ${res.statusText}`)
  }

  _request(endPoint, options) {
    return fetch((`${this._url}/${endPoint}`), options).then(this._checkResponse)
  }

  getUserInfoAndAvatar() {
    return this._request('users/me', {
      headers: this._headers
    })
  }

  setUserInfo({ name, about }) {
    return this._request('users/me', {
      headers: this._headers,
      method: 'PATCH',
      body: JSON.stringify({ name, about })
    })
  }

  getInitialCards() {
    return this._request('cards', {
      headers: this._headers,
    })
  }

  addNewCard({ name, link }) {
    return this._request('cards', {
      headers: this._headers,
      method: 'POST',
      body: JSON.stringify({ name, link })
    })
  }

  deleteCard(id) {
    return this._request(`cards/${id}`, {
      headers: this._headers,
      method: 'DELETE'
    })
  }

  changeLikeCardStatus(id, isLiked) {
    return this._request(`cards/${id}/likes`, {
      headers: this._headers,
      method: isLiked ? 'DELETE' : 'PUT'
    })
  }

  setAvatar({ avatar }) {
    return this._request('users/me/avatar', {
      headers: this._headers,
      method: 'PATCH',
      body: JSON.stringify({ avatar })
    })
  }
}

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-55',
  headers: {
    authorization: 'abb2bbf6-61b5-4346-b7aa-47dedd2bc449',
    'Content-Type': 'application/json'
  }
});

export default api