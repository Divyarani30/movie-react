import React from 'react';

const Input = ({ name, label, value, error, onChange}) => {
    return ( 
        <React.Fragment>
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
                    <input 
                       value={value}
                       onChange={onChange}
                       name={name}
                       id={name} 
                       type="text" 
                       className="form-control"
                    />
                </div>
            {error && <div className="alert alert-danger">{error}</div>}
        </React.Fragment>    
     );
};
 
export default Input;