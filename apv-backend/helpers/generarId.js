//ese return te devuelve un numero random (que nosotros lo usamos para token)

const generarId = () => {
    return Date.now().toString(32) + Math.random().toString(32).substring(2);
};

export default generarId;