import { getVisualString } from '../../../Utils/utilities'

const CustomInputRadio = ({ name, id, setStateFunction, selected }) => (
    <>
        <input 
            selected={selected}
            type="radio" 
            name={name} 
            id={id} 
            onClick={setStateFunction}
        />
        <label htmlFor={id}>{getVisualString(id)}</label>
    </>
)

export default CustomInputRadio