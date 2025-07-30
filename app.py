from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

# Diccionario de reglas del chatbot
# Las claves son patrones o palabras clave, los valores son las respuestas.
# Puedes hacer esto más sofisticado con expresiones regulares si lo necesitas.
chatbot_rules = {
    "hola": "¡Hola! ¿En qué puedo ayudarte hoy?",
    "como estas": "Estoy bien, ¡gracias por preguntar! Soy un programa, así que siempre estoy listo para trabajar.",
    "que haces": "Soy un chatbot sencillo, diseñado para responder a tus preguntas básicas.",
    "adios": "¡Hasta luego! Que tengas un buen día.",
    "gracias": "De nada, estoy aquí para ayudar.",
    "nombre": "Mi nombre es Boty, tu asistente virtual."
}

# Ruta principal que sirve el frontend HTML
@app.route('/')
def index():
    return render_template('index.html')

# Ruta para la interacción del chatbot (API)
@app.route('/chat', methods=['POST'])
def chat():
    user_message = request.json.get('message')
    response = "Lo siento, no entiendo tu pregunta. Intenta con algo como 'hola', 'como estas' o 'gracias'."

    if user_message:
        user_message_lower = user_message.lower()
        for pattern, bot_response in chatbot_rules.items():
            if pattern in user_message_lower:
                response = bot_response
                break # Una vez que encontramos una coincidencia, salimos del bucle

    return jsonify({"response": response})

if __name__ == '__main__':
    app.run(debug=True)