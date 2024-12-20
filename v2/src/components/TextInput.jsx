export const TextInput = (props) => {
    return <div className="form-group">
        <label>{props.label}</label>
        <input className="input" type={props.text} name={props.name} defaultValue={props.defaultValue} />
    </div>
}