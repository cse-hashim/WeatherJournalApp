//////////////spes//////////////////
/* Global Variables */
// Create a new date instance dynamically with JS
/**
 * date object
 */
const d = new Date();
/**
 * debug purpose counter
 */
let counter = 0;

/**
 * 
 * @returns the current date
 */
const newDate = () => d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

/**
 * @type {HTMLElement}
 */

const generate = document.getElementById('generate');

/**
 * @type {HTMLElement}
 */

const feelings = document.getElementById('feelings');

/**
 * @type {HTMLElement}
 */
const msg = document.getElementById('msg');

/**
 * 
 * @type {HTMLInputElement}
 */
const zip = document.getElementById('zip');

/**
 * @type {HTMLElement}
 */
const entryHolder_date = document.querySelector('#entryHolder #date');

/**
 * @type {HTMLElement}
 */
const entryHolder_temp = document.querySelector('#entryHolder #temp');

/**
 * @type {HTMLElement}
 */
const entryHolder_content = document.querySelector('#entryHolder #content');

// Personal API Key for OpenWeatherMap API
const apiKey = '73b5b77d027e9ae927052c696060eb4a';

/**
 * 
 * @returns well formatted url of the remote server GET
 */
const url = () => `http://api.openweathermap.org/data/2.5/weather?zip=${zip.value ? zip.value : '00000'/*94040'*/}&appid=${apiKey}`;
/**
 * 
 * @param {string} x 
 * @param {string} y 
 * @returns fragment with a raw
 */
const createTableRaw = (x, y) => {
  const frag = document.createDocumentFragment();
  const c1 = document.createElement('div');
  c1.innerHTML = x;
  c1.className = 'cell';
  const c2 = document.createElement('div');
  c2.innerHTML = y;
  c2.className = 'cell';
  frag.appendChild(c1);
  frag.appendChild(c2);
  return frag;
};
/**
 * 
 * @param {any} entry - the entry object
 */
const updateUI = async (entry) => {
  if (entry) {
    entryHolder_temp.innerHTML='';
    entryHolder_date.innerHTML='';
    entryHolder_content.innerHTML='';
    entryHolder_temp.appendChild(createTableRaw('TEMP:', `${entry['temperature']}`));
    entryHolder_date.appendChild(createTableRaw('DATE:', `${entry['date']}`));
    entryHolder_content.appendChild(createTableRaw('CONTENT:', `${entry['user-response']}`));
    zip.value = '';
    feelings.value = '';
  }
};

/**
 * @description shows a message to the user
 * @param {String} str - a message to show
 */
const showMSG = (str) => {
  const navBarMenu = document.getElementsByClassName('navbar__menu')[0];
  new Promise((resolve) => {
    setTimeout(() => {
      navBarMenu.style.top = 0;
      msg.innerHTML = str;
      resolve(1);
    }, 0);
  }).then(() => {
    setTimeout(() => {
      navBarMenu.style.top = `${-navBarMenu.clientHeight}px`;
      msg.innerHTML = '';
    }, 2000);
  });
};

// Event listener to add function to existing HTML DOM element
/**
 * @description starting point of the web page logic
 */
const init = async () => {
  document.addEventListener('DOMContentLoaded', () => {
    console.group('Hashim Hossam');
    console.log('<computetional.h@gmail.com>');
    console.groupEnd();
    generate.addEventListener('click', eventCBF);
    showMSG('Hello.');
  });
};

/* Function called by event listener */
/**
 * @description chaines the promisses all together
 * @returns {Promise<any>}
 */
const chainCall = async () => {
  return new Promise(async (resolve, _) => {
    // GET weather data from the remote server
    console.group('request-' + counter++);
    resolve(await getWeatherDataWeb());
  }).then(async (result) => {
    console.log('GET-REMOTE: ', result);

    // POST data to local server and make sure that it is posted    
    if (result.cod == 200) {
      // if the GET remote is done successfuly then post data to local server
      const response = await PostweatherDataServ(result);
      showMSG('OK');
      console.log('[PostweatherDataServ]: ', response);
      return response.entry;
    }

    // if not do not POST entry to local server  and show message
    console.log('NOT-OK(NOT-POSTED): ', result);
    showMSG('ERR: ' + result.message);
    return { 'temperature': 'none', 'date': 'none', 'user-response': 'none' };
  }).then(async (result) => {
    console.log('POSTED/NOT-OK: ', result);

    // GET last entry from our local server
    const response = await getWeatherDataServ();
    return response;
  }).then(async (result) => {
    console.log('GET-LOCAL: ', result);

    // update the UI 
    updateUI(result);
  }).then(async () => {
    console.groupEnd();
  });
};
/**
 * @description the event call back function for the event listener of the button #generate
 */
const eventCBF = async () => {
  if (zip.value == '') {
    //if zip code is not provided
    showMSG('please fill in zip code field');
  } else {
    //call the promisses chaining functio
    await chainCall();
  }
};
/* Function to GET Web API Data*/
/**
 * @description make a remote GET request and return the response
 * @returns {Promise<any>} 
 */
const getWeatherDataWeb = async () => {
  const response = await retrieveData(url());
  try {
    return response;
  } catch (error) {
    console.log('error', error);
  }
};
/**
 * @description takes a weather object and select temperature and add it to a new object alongside with date and feelings
 * @param {any} weatherObject 
 * @returns entry object
 */
const parseWeatherObj = async (weatherObject) => {
  return {
    'temperature': ('' + zip.value ? weatherObject.main.temp : 'none'),
    'date': zip.value != '' ? '' + newDate() : 'none',
    'user-response': '' + feelings.value || 'none'
  };
};
/* Function to POST data */
/**
 * @description make a local POST request and return the results
 * @param {any} weatherObject 
 * @returns custom debug object to make sure that the post is done 
 */
const PostweatherDataServ = async (weatherObject) => {
  const entry = await parseWeatherObj(weatherObject);
  console.log('Parsed Entry Object: ', entry);
  const response = await postData('/addEntry', entry);
  if (!response) {
    console.log('error in PostweatherDataServ');
  }
  return {
    'posted': response,
    'originalWeatherObject': weatherObject,
    'entry': entry
  };
};

/* Function to GET Project Data */
/**
 * @description returns the data stored in the local server
 * @returns 
 */
const getWeatherDataServ = async () => {
  const response = await retrieveData('/getLastEntry');
  try {
    return response;
  } catch (error) {
    console.log('error', error);
  }
};

// Call Function
init();
