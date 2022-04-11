const CustomInputRadio = ({ name, id, setStateFunction }) => (
    <>
        <input 
            type="radio" 
            name={name} 
            id={id} 
            onSelect={setStateFunction}
        />
        <label htmlFor={id}>{id.replace('_', ' ')}</label>
    </>
)

export default CustomInputRadio