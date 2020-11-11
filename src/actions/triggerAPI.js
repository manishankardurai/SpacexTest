import axios from 'axios/index';

export default function triggerSimpleAjax(
  url,
  type = 'POST',
  req_data,
  onSuccess,
  onFailure
) {
  let headers = {
    'Content-Type': 'application/json'
  };
  if (type !== 'GET') {
    const axiosMethod = type.toLowerCase();
    axios[axiosMethod](url, req_data)
      .then(function (response) {
        onSuccess(response.data);
      })
      .catch(error => {
        onFailure && onFailure(error);
      });
  } else {
    axios
      .get(url, {
        headers: headers,
        data: { a: 'b' }
      })
      .then(function(response) {
        onSuccess(response.data);
      })
      .catch(function(error) {
        if (typeof onFailure === 'function') onFailure(error);
      });
  }
}
