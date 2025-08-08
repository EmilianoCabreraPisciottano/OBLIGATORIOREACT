import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { agregarRegistro } from "../store/slices/registrarSlice";



const Registro = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [paises, setPaises] = useState([]);
  const [paisesLoading, setPaisesLoading] = useState(true);

  const user = useRef(null);
  const pass = useRef(null);
  const pais = useRef(null);

  // Cargar países al montar el componente
  useEffect(() => {
    const fetchPaises = async () => {
      try {
        setPaisesLoading(true);
        console.log("Iniciando carga de países...");
        const response = await fetch("https://goalify.develotion.com/paises.php", {
          method: "GET"
        });
        console.log("Response status:", response.status);
        const data = await response.json();
        console.log("Data recibida:", data);
        console.log("Tipo de data.paises:", typeof data.paises, "Es array:", Array.isArray(data.paises));
        
        if (data.codigo === 200) {
          console.log("Países cargados:", data.paises);
          const paisesArray = Array.isArray(data.paises) ? data.paises : [];
          setPaises(paisesArray);
        } else {
          console.error("Error al cargar países:", data.mensaje);
          setError("Error al cargar países: " + (data.mensaje || "Error desconocido"));
          setPaises([]); // Asegurar que sea un array vacío
        }
      } catch (error) {
        console.error("Error al conectar con la API de países:", error);
        setError("Error de conexión con la API de países");
        setPaises([]); // Asegurar que sea un array vacío
      } finally {
        setPaisesLoading(false);
      }
    };

    fetchPaises();
  }, []);

  const registrar = async (e) => {
    e.preventDefault();
    const campoUser = user.current.value;
    const campoPass = pass.current.value;
    const campoPais = pais.current.value;

    if (campoUser && campoPass && campoPais) {
      try {
        const response = await fetch("https://goalify.develotion.com/usuarios.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            usuario: campoUser,
            password: campoPass,
            idPais: parseInt(campoPais)
          })
        });

        const data = await response.json();
        
        if (data.codigo === 200) {
          // Si la respuesta es exitosa
          const nuevoUsuario = {
            id: data.id,
            nombre: campoUser,
            pais: campoPais,
            token: data.token
          };
          
          dispatch(agregarRegistro(nuevoUsuario));
          
          // Guardar en localStorage para mantener la sesión
          localStorage.setItem("token", data.token);
          localStorage.setItem("userId", data.id.toString());
          localStorage.setItem("usuario", campoUser);
          
          // Limpiar formulario
          user.current.value = "";
          pass.current.value = "";
          pais.current.value = "";
          setError(false);
          
          navigate("/menu"); // Auto-login después del registro
        } else {
          setError(data.mensaje || "Error en el registro");
        }
      } catch (error) {
        console.error("Error:", error);
        setError("Error de conexión con el servidor");
      }
    } else {
      setError("Todos los campos son obligatorios");
    }
  };

  console.log("Render - paisesLoading:", paisesLoading, "paises.length:", paises.length);

  return (
    <div className="container">
      <div className="form-container">
        <h2 className="form-title">Registro</h2>
        
        <form onSubmit={registrar}>
          <div className="mb-3">
            <label htmlFor="usuario" className="form-label">Usuario</label>
            <input type="text" id="usuario" ref={user} className="form-control" placeholder="Ingresa tu nombre de usuario" required />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Contraseña</label>
            <input type="password" id="password" ref={pass} className="form-control" placeholder="********" required />
          </div>

          <div className="mb-3">
            <label htmlFor="pais" className="form-label">País</label>
            <select id="pais" ref={pais} className="form-control" required disabled={paisesLoading}>
              <option value="">
                {paisesLoading ? "Cargando países..." : "Selecciona un país"}
              </option>
              {Array.isArray(paises) && paises.map((paisItem) => (
                <option key={paisItem.id} value={paisItem.id}>
                  {paisItem.name}
                </option>
              ))}
            </select>
          </div>

          <div className="d-grid">
            <button type="submit" className="btn" disabled={paisesLoading}>
              {paisesLoading ? "Cargando..." : "Registrar"}
            </button>
            {error && <p className="text-danger mt-2">Error: {error}</p>}
          </div>
        </form>

        <div className="mt-3">
          <button onClick={() => navigate("/login")} className="btn btn-link">
            ¿Ya tienes cuenta? Inicia sesión
          </button>
        </div>
      </div>
    </div>
  );
}

export default Registro;