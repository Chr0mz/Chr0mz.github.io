// Får referencer fra bluetooth hjemmesiden, til UI elementer.
let connectButton = document.getElementById('connect');
let disconnectButton = document.getElementById('disconnect');
let terminalContainer = document.getElementById('terminal');
let sendForm = document.getElementById('send-form');
let inputField = document.getElementById('input')
let deviceCache = null;
let characteristicCache = null;


// Connecter til et device ved button click
connectButton.addEventListener('click', function() {
    connect();
});

// Disconnecter fra et device ved button click
disconnectButton.addEventListener('click', function() {
    disconnect();
});

// Handle form submit event
sendForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevents form sending
    send(inputField.value); // Sends the inputfield contents
    inputField.value = '';  // Zero text field
    inputField.focus();     // Focus on the text field.
});


// Launch Bluetooth device chooser and connect to the selected.
function connect() {
    return (deviceCache ? Promise.resolve(deviceCache) : 
    requestBluetoothDevice()).
    then(device => connectDeviceAndCacheCharacteristic(device)).
    then(characterisic => startNotifications(characterisic)).catch(error => log(error));
}

function requestBluetoothDevice() {
    log('Requesting bluetooth device...');

    return navigator.bluetooth.requestDevice({
        filters: [{services: [0xFFE0]}],

    }).
    then(device => {
        log('"' + device.name + '"Bluetooth device selected');
        deviceCache = device;

        return deviceCache;
    })
}

function connectDeviceAndCacheCharacteristic(device) {
    if (device.gatt.connected && characteristicCache) {
        return Promise.resolve(characteristicCache);

    }

    log('Connecting to GATT server..');

    return device.gatt.connect().
        then(server => {
            log('GATT server connected, getting service..');
            return server.getPrimaryService(0xFFE0);
        }).
        then(service => {
            log('Service found, getting characteristic..');

            return service.getCharacteristic(0xFFE1);
        }).
        then(characterisic => {
            log('Characteristic found');
            characteristicCache = characterisic

            return characteristicCache
        });
}

function startNotifications(characterisic) {
    log('Starting notifications...');

    return characterisic.startNotifications().
    then(() => {
        log('Notifications started');
    });
}

function log(data, type = '') {
    terminalContainer.insertAdjacentHTML('beforeend', '<div' + (type ? ' class=""' + type + '"' : '') + '>' + data + '</div>');
    
}

// Disconnect from the connected device
function disconnect() {
    // intet endnu
}


function send(data) {
    // intet endnu
}