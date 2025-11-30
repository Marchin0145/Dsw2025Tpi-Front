
export function parsearFechaAR(fechaStr) {
    if (!fechaStr || fechaStr.startsWith('0001-01-01')) {
        return "Sin fecha";
    }
    
    const fechaISO = fechaStr.endsWith('Z') ? fechaStr : fechaStr + 'Z';
    const fecha = new Date(fechaISO);
    
    if (isNaN(fecha.getTime())) {
        return "Fecha inválida";
    }
    
    return fecha.toLocaleString('es-AR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZone: 'America/Argentina/Buenos_Aires'
    });
}