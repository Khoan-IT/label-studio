from label_studio_sdk import Client

LABEL_STUDIO_URL = 'http://localhost:8080'
API_KEY = '9e02912edabfdf4622bf962e54bedd33e5f88454'

ls = Client(url=LABEL_STUDIO_URL, api_key=API_KEY)