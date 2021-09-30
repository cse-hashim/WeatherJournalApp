const tests = [
    async () => {
        setTimeout(async () => {
            const urlExample = `http://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=73b5b77d027e9ae927052c696060eb4a`;
            console.group('Test-1 [test retrieveData() function]:');
            console.group('input');
            console.log(urlExample);
            console.groupEnd();
            console.group('output');
            console.log(JSON.stringify(await retrieveData(urlExample), null, 2));
            console.groupEnd();
            console.groupEnd();
        }, 5000);

    },
    async () => {
        setTimeout(() => {
            const entry = { temperature: 'test_temp', date: 'test_date', 'user-response': 'test_contents' };
            console.group('Test-2 [test postData() function]:');
            console.group('input:the entry passed to post is: ');
            console.log(JSON.stringify(entry, null, 2));
            console.groupEnd();
            console.group('output:')
            postData('/addEntry', entry).then(() => {
                console.log('postData() is running fine');
                console.groupEnd();
                console.groupEnd();
            });
        }, 0);

    },
    async () => {
        setTimeout(() => {
            console.group('Test-3 Testing showMSG()');
            showMSG('Testing showMSG()');
            console.log('ok');
            console.groupEnd();
        }, 1500);
    },
    async () => {
        setTimeout(async () => {
            console.group('Test-4 getWeatherDataWeb() Error TEST [this test is entended to throw an error]');
            console.log(JSON.stringify(await getWeatherDataWeb(), null, 2));
            console.log('ok');
            console.groupEnd();
        }, 1000);
    },
    async () => {
        setTimeout(async () => {
            console.group('Test-5 Testing getWeatherDataServ()');
            console.log(JSON.stringify(await getWeatherDataServ(), null, 2));
            console.log('ok');
            console.groupEnd();
        }, 500);
    }
];

tests.forEach(element => {
    element();
});