class Api {
  constructor({ url }) {
    this._url = url;
  }

  _checkResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status} ${res.statusText}`)
  }

  _request(endPoint, options) {
    return fetch((`${this._url}/${endPoint}`), options).then(this._checkResponse)
  }

  getUserInfoAndAvatar() {
    return this._request('users/me', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
      },
    })
  }

  setUserInfo({ name, about }) {
    return this._request('users/me', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
      },
      credentials: 'include',
      method: 'PATCH',
      body: JSON.stringify({ name, about })
    })
  }

  getInitialCards() {
    return this._request('cards', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
      },
    })
  }

  addNewCard({ name, link }) {
    return this._request('cards', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
      },
      credentials: 'include',
      method: 'POST',
      body: JSON.stringify({ name, link })
    })
  }

  deleteCard(id) {
    return this._request(`cards/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
      },
      credentials: 'include',
      method: 'DELETE'
    })
  }

  changeLikeCardStatus(id, isLiked) {
    return this._request(`cards/${id}/likes`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
      },
      credentials: 'include',
      method: isLiked ? 'DELETE' : 'PUT'
    })
  }

  setAvatar({ avatar }) {
    return this._request('users/me/avatar', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
      },
      credentials: 'include',
      method: 'PATCH',
      body: JSON.stringify({ avatar })
    })
  }
}

const api = new Api({
  url: 'https://api.mesto.harkova.nomoredomains.work',
});

export default api