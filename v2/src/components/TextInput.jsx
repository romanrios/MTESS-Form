export const TextInput = (props) => {
    return <div className="form-group">
        <label>{props.label}</label>
        <input type="text" id="props.input_id" className="input" />
    </div>
}