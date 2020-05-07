import bottle
from bottle import run, route, template, error
import bluetooth


#  Hjemmeside
bottle.TEMPLATE_PATH.insert(0, 'C:/Users/jeppe/OneDrive - Rybners/Teknologiprojekt Noah, Jeppe, Bakir/Bluetooth Website'
                               ' og Arduino kode/hjemmeside/views')

# Route 
@route('/home')
def home():
    return template('index')


@route('/information')
def information():
    return template('information')


@route('/contact')
def contact():
    return template('contact')


@route('/bluetooth')
def bluetoothpg():
    return template('bluetooth')
    return "<h2>bltooth()</h2>"


@error(404)
def fof(error):
    return 'error 404 no page found'


# Bluetooth funktion, så jeg forhåbentlig kan bruge bluetooth
def bltooth():
    nearby_devices = bluetooth.discover_devices(lookup_names=True)
    print("Found {} devices.".format(len(nearby_devices)))

    for addr, name in nearby_devices:
        print("  {} - {}".format(addr, name))


run(host='localhost', port=8080, reloader=True, debug=True)
