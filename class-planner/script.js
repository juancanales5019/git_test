async function generarPlanDeClase(topic) {
    const apiKey = 'TUhf_MAuxBpXmGzrSnlgXxlkHeJgRAURrngYpNk'; // Reemplaza con tu API key de Hugging Face

    try {
        const response = await fetch('https://api-inference.huggingface.co/models/gpt2', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                inputs: `Planifica una clase sobre ${topic}`
            })
        });

        if (!response.ok) {
            throw new Error('Error en la solicitud a la API');
        }

        const data = await response.json();
        console.log(data); // Imprimir la respuesta en la consola para verificar la estructura

        if (!data || !data[0] || !data[0].generated_text) {
            throw new Error('Respuesta de la API no válida');
        }

        const classPlan = data[0].generated_text;

        // Mostrar el plan de clase generado
        document.getElementById('classPlan').innerText = classPlan;

        // Descargar el plan de clase como PDF (opcional)
        const pdf = new jsPDF();
        pdf.text("Plan de Clase", 10, 10);
        pdf.text(classPlan, 10, 20);
        pdf.save("plan_de_clase.pdf");
    } catch (error) {
        console.error('Error:', error);
        alert('Error al generar el plan de clase.');
    }
}

document.getElementById('classForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const topic = document.getElementById('topic').value;
    generarPlanDeClase(topic);
});
