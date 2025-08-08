import { useSelector } from "react-redux"


const Contador = () => {

    const contador = useSelector(state => state.contador.cuenta);

  return (
    <div><h1>{contador}</h1></div>
  )
}

export default Contador