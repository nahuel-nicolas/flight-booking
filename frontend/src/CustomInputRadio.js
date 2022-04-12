const CustomInputRadio = ({ name, id, setStateFunction, selected }) => (
    <>
        <input 
            selected={selected}
            type="radio" 
            name={name} 
            id={id} 
            onSelect={setStateFunction}
        />
        <label htmlFor={id}>{id.replace('_', ' ')}</label>
    </>
)

export default CustomInputRadio