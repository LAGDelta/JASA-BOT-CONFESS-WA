from flask import Flask, request
import requests

app = Flask(__name__)

@app.route('/confess', methods=['POST'])
def confess():
    message = request.json.get('message')
    # Simpan pesan ke database di sini
    # Kirim pesan ke grup atau admin di sini
    return "Pesan terkirim dengan sukses!", 200

if __name__ == '__main__':
    app.run(port=5000)
