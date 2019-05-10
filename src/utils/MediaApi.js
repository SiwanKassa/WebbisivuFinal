const apiUrl = 'http://media.mw.metropolia.fi/wbma/';

const handleFetchErrors = (response) => {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
};

const getAllMedia = () => {
  return fetch(apiUrl + 'media/').then(response => {
    return response.json();
  }).then(json => {
    console.log(json);
    return Promise.all(json.map(pic => {
      return fetch(apiUrl + 'media/' + pic.file_id).then(response => {
        return response.json();
      });
    })).then(pics => {
      console.log(pics);
      return pics;
    });
  });
};

const getSingleMedia = (id) => {
  return fetch(apiUrl + 'media/' + id).then(response => {
    return response.json();
  });
};

const deleteMedia = (id, token) => {
  const options = {
    method: 'DELETE',
    headers: {
      'x-access-token': token,
    },
  };

  return fetch(apiUrl + 'media/' + id, options).then(handleFetchErrors).then(response => {
    return response.json();
  });
};

const getMediaFromUser = (id) => {
  return fetch(apiUrl + 'media/user/' + id).then(response => {
    return response.json();
  }).then(json => {
    console.log(json);
    return Promise.all(json.map(pic => {
      return fetch(apiUrl + 'media/' + pic.file_id).then(response => {
        return response.json();
      });
    })).then(pics => {
      console.log(pics);
      return pics;
    });
  });
};

const login = (username, password) => {
  const settings = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({username, password}),
  };
  return fetch(apiUrl + 'login', settings).then(response => {
    return response.json();
  });
};

const register = (user) => {
  const settings = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  };
  return fetch(apiUrl + 'users', settings).then(response => {
    return response.json();
  });
};

const getUser = (token) => {
  const settings = {
    headers: {
      'x-access-token': token,
    },
  };
  return fetch(apiUrl + 'users/user', settings).then(response => {
    return response.json();
  });
};

const checkUser = (username) => {
  return fetch(apiUrl + 'users/username/' + username).then(response => {
    return response.json();
  });
};

const getFilesByTag = (tag) => {
  return fetch(apiUrl + 'tags/' + tag).then(response => {
    return response.json();
  });
};

const upload = (data, token) => {
  const options = {
    method: 'POST',
    body: data,
    headers: {
      'x-access-token': token,
    },
  };

  return fetch(apiUrl + 'media', options).then(response => {
    return response.json();
  });
};

export {
  login,
  register,
  getUser,
  checkUser,
  getFilesByTag,
  upload,
  getMediaFromUser,
  deleteMedia,
  handleFetchErrors,
    getSingleMedia,
    getAllMedia
};