  import Tarjeta from "./Tarjeta"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { cargarListaTareas } from "../store/slices/tareasSlices"

const Tarjetas = () => {

    const tareas = useSelector(state => state.tareas.listaTareas);
    const dispatch = useDispatch();

    useEffect(() => {
      fetch("https://jsonplaceholder.typicode.com/todos?userId=1")
      .then(r => r.json())
      .then(datos => {
        dispatch(cargarListaTareas(datos))
      })
    }, [])


  return (
      <div className="tarjetas">
        {tareas.map(t => <Tarjeta key={t.id} {...t}/>)}
      </div>
  )
}

export default Tarjetas