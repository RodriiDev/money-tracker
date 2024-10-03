import './App.css';
import { useEffect, useState } from 'react';

function App() {
  //Se inicializa los estados
  const [nombre,setNombre] = useState(''); 
  const [datetime,setDatetime] = useState(''); 
  const [descripcion,setDescripcion] = useState('');
  const [transacciones,setTransacciones] = useState([]);

  console.log(import.meta.env.VITE_REACT_APP_API_URL+'/transacciones');

  useEffect(() => {
    obtenTransacciones().then(setTransacciones)
  }, []);

  async function obtenTransacciones(){
    const url = import.meta.env.VITE_REACT_APP_API_URL+'/transacciones';
    const response = await fetch(url);
    return await response.json();
  }

  function añadirNuevaTransaccion(ev){
    ev.preventDefault();
    const url = import.meta.env.VITE_REACT_APP_API_URL+'/transaccion'; //Se construye la URL a la que se enviará la solicitud
    const precio = nombre.split(' ')[0];
    
    fetch(url, {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
        precio,
        nombre: nombre.substring(precio.length+1),
        descripcion,
        datetime
      })
    }).then(response => {
      response.json().then( json => {
        setNombre(''); //Clean
        setDatetime('');
        setDescripcion('');
        // Se actualiza la lista de transacciones con la nueva transaccion
        setTransacciones([...transacciones, json]); //Añade el json al arreglo transacciones
      })
    })
  }
  let balance = 0;
  for (const transaccion of transacciones){
    balance = balance + transaccion.precio;
  }

  balance = balance.toFixed(2);
  const fraction = balance.split('.')[1];
  balance = balance.split('.')[0];

  return (
    <main>
      <h1>${balance}<span>{fraction}</span></h1>
      <form onSubmit={añadirNuevaTransaccion}>
        <div className="basic">
          <input type="text" 
                 value={nombre}
                 onChange={ev => setNombre(ev.target.value)}
                 placeholder={'+200 new samsung tv'}/>
          <input type="datetime-local" 
                  value={datetime} 
                  onChange={ev => setDatetime(ev.target.value)}/>
        </div>
        <div className="descripcion">
          <input type="text" placeholder={'descripcion'} 
                  value={descripcion} 
                  onChange={ev => setDescripcion(ev.target.value)}/>
        </div>
        <button type="submit">Añadir nueva transacción</button>
      </form>
      <div className="transacciones">
        {transacciones.length > 0 && transacciones.map(transaccion => (
          <div className="transaccion">
            <div className="left">
              <div className="nombre">{transaccion.nombre}</div>
              <div className="descripcion">{transaccion.descripcion}</div>
            </div>
            <div className="right">
              <div className={"precio "+ (transaccion.precio<0 ? 'red' : 'green')}>{transaccion.precio}</div>
              <div className="datetime">{transaccion.datetime.substring(0,19)}</div>
            </div>
          </div>
        ))}
        
        

      </div>
    </main>
  );
}

export default App;
