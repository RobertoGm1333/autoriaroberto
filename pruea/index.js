
document.getElementById('update-seat-btn').addEventListener('click', async () => {
    const endpoint = 'https://localhost:7057/MinimalCinema/Sala/1/asientos/9'; // URL del endpoint
    try {
        const response = await fetch(endpoint, {
            method: 'PUT', 
            headers: {
                'Content-Type': 'application/json', 
            },
            body: JSON.stringify(true), 
        });

        if (response.ok) {
            alert('Asiento actualizado con éxito!');
        } else {
            const errorText = await response.text();
            alert('Error al actualizar el asiento: ' + errorText);
        }
    } catch (error) {
        console.error('Error en la solicitud:', error);
        alert('Hubo un problema al procesar la solicitud.');
    }
});
