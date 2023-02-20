
const InputField = (props) => {
    const {type, placeholder, name, value, onChange,onBlur} = props
    return ( 

        <>
            <input type={type} placeholder ={placeholder} name={name} value={value} onChange={onChange} onBlur={onBlur}/>
        </>
     );
}
 
export default InputField
