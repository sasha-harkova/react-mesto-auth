class Api {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }

  _checkResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status} ${res.statusText}`)
  }

  getUserInfoAndAvatar() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers
    })
      .then(res => this._checkResponse(res))
  }

  setUserInfo({ name, about }) {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers,
      method: 'PATCH',
      body: JSON.stringify({ name, about })
    })
      .then(res => this._checkResponse(res))
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers
    })
      .then(res => this._checkResponse(res))
  }

  addNewCard({ name, link }) {
    return fetch(`${this._url}/cards`, {
      headers: this._headers,
      method: 'POST',
      body: JSON.stringify({ name, link })
    })
      .then(res => this._checkResponse(res))
  }

  deleteCard(id) {
    return fetch(`${this._url}/cards/${id}`, {
      headers: this._headers,
      method: 'DELETE'
    })
      .then(res => this._checkResponse(res))
  }

  changeLikeCardStatus(id, isLiked) {
    return fetch(`${this._url}/cards/${id}/likes`, {
      headers: this._headers,
      method: isLiked ? 'DELETE' : 'PUT'
    })
      .then(res => this._checkResponse(res))    
  }

  setAvatar({ avatar }) {
    return fetch(`${this._url}/users/me/avatar`, {
      headers: this._headers,
      method: 'PATCH',
      body: JSON.stringify({ avatar })
    })
    .then(res => this._checkResponse(res))
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