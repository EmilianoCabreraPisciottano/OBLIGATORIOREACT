import { useRef, useState } from "react";
import { useNavigate } from "react-router";
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [cambiarBoton, setCambiarBoton] = useState(false);
  const cambiarInput = () => {
    const campoUser = user.current.value;
    const campoPass = pass.current.value;
    setCambiarBoton(!!campoUser && !!campoPass);
    // Limpiar error cuando el usuario empiece a escribir
    if (error) setError("");
  };

  const user = useRef(null);
  const pass = useRef(null);

  const ingresar = async (e) => {
    e.preventDefault();
    
    const campoUser = user.current.value;
    const campoPass = pass.current.value;

    try {
      console.log("Intentando login con:", { usuario: campoUser, password: campoPass });
      
      const response = await fetch("https://goalify.develotion.com/login.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          usuario: campoUser,
          password: campoPass
        })
      });

      console.log("Response status:", response.status);
      const data = await response.json();
      console.log("Data recibida:", data);

      if (data.codigo === 200) {
        // Guardar datos de sesión
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.id.toString());
        localStorage.setItem("usuario", campoUser);

        console.log("Login exitoso, navegando al dashboard");
        navigate("/dashboard");
      } else {
        console.error("Error en login:", data.mensaje);
        setError(data.mensaje || "Error en el login");
      }
    } catch (error) {
      console.error("Error de conexión:", error);
      setError("Error de conexión con el servidor");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4 shadow-lg" style={{ maxWidth: "400px", width: "100%", borderRadius: "20px" }}>
        <h3 className="text-center mb-4" style={{ color: "#04c3fdff" }}>Iniciar Sesión</h3>

        <form onSubmit={ingresar}>
          <div className="mb-3">
            <label htmlFor="txtUser" className="form-label ">  Usuario</label>
            <input type="text" id="txtUser" ref={user} className="form-control" placeholder="Ingrese su usuario" onChange={cambiarInput} />
          </div>

          <div className="mb-3">
            <label htmlFor="txtPass" className="form-label">Contraseña</label>
            <input type="password" id="txtPass" ref={pass} className="form-control" placeholder="Ingrese su contraseña" onChange={cambiarInput}  />
          </div>

          <div className="d-grid">
            <button type="submit" className="btn" style={{ backgroundColor: "#5ccddcff", color: "#fff" }} disabled={!cambiarBoton}>
              Ingresar
            </button>
          </div>
        </form>

        <div>
          <button onClick={() => navigate("/registrar")} className="btn btn-link">¿No tienes cuenta? Regístrate</button>
        </div>

        {error && (
          <div className="alert alert-danger mt-3 text-center p-2" role="alert">
            {typeof error === 'string' ? error : 'Usuario y/o contraseña incorrectos'}
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
