function FormField({ label, name, type = 'text', placeholder }) {
  return <label className="form-field">{label}<input required name={name} type={type} placeholder={placeholder} /></label>
}

export default FormField
