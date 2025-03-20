// App.jsx

import React, { useState, useEffect } from 'react';
import { db } from './firebaseConfig'; // Importa la configuración de Firebase
import { collection, addDoc, getDocs, updateDoc, doc, deleteDoc } from 'firebase/firestore';

function App() {
  const [data, setData] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [editItem, setEditItem] = useState('');
  const [editId, setEditId] = useState(null);

  // Función para obtener los datos
  const fetchData = async () => {
    const querySnapshot = await getDocs(collection(db, 'items'));
    const items = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    setData(items);
  };

  // Función para agregar un nuevo item
  const addItem = async () => {
    if (newItem) {
      await addDoc(collection(db, 'items'), {
        name: newItem,
      });
      setNewItem('');
      fetchData(); // Recarga los datos
    }
  };

  // Función para actualizar un item
  const updateItem = async () => {
    if (editItem && editId) {
      const itemRef = doc(db, 'items', editId);
      await updateDoc(itemRef, {
        name: editItem,
      });
      setEditItem('');
      setEditId(null);
      fetchData(); // Recarga los datos
    }
  };

  // Función para eliminar un item
  const deleteItem = async (id) => {
    const itemRef = doc(db, 'items', id);
    await deleteDoc(itemRef);
    fetchData(); // Recarga los datos
  };

  // Cargar los datos cuando se monta el componente
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">
      <h1>CRUD con Firestore</h1>

      {/* Formulario para agregar un item */}
      <input
        type="text"
        placeholder="Nuevo item"
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
      />
      <button onClick={addItem}>Agregar Item</button>

      {/* Lista de items */}
      <ul>
        {data.map((item) => (
          <li key={item.id}>
            {editId === item.id ? (
              <>
                <input
                  type="text"
                  value={editItem}
                  onChange={(e) => setEditItem(e.target.value)}
                />
                <button onClick={updateItem}>Actualizar</button>
              </>
            ) : (
              <>
                {item.name}
                <button onClick={() => {
                  setEditId(item.id);
                  setEditItem(item.name);
                }}>
                  Editar
                </button>
                <button onClick={() => deleteItem(item.id)}>Eliminar</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
