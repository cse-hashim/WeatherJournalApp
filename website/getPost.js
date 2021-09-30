// Async POST
const postData = async (url = '', data = {}) => {
  const res = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  try {
    const json = await res.json();
    console.log('successful POST: ' + url);
    return json;
  } catch (error) {
    console.log(error);
  }
};
// Async GET
const retrieveData = async (url = '') => {
  try {
    const res = await fetch(url);
    const json = await res.json();
    console.log('successful GET: ' + url)
    return json;
  }
  catch (error) {
    console.log('error', error);
  }
};
