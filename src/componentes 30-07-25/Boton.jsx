import { useDispatch } from "react-redux"
import { incrementar, resetear } from "../store/slices/contadorSlice";

const Boton = () => {

    const dispatch = useDispatch();
    
    const aumentarCuenta = () => {
        dispatch(incrementar())
    }

    const resetearCuenta = () => {
        dispatch(resetear())
    }


  return (
    <div>
        <input type="button" value="Incrementar" onClick={aumentarCuenta}/>
        <input type="button" value="Reset" onClick={resetearCuenta}/>
    </div>
  )
}

export default Boton