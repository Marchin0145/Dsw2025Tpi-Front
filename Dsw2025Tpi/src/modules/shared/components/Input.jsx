function Input({ messageError, inputProps, label }) {
    return (
      <div
       className="flex flex-col gap-1 justify-start items-start"
      >
        <label htmlFor={label}>{label}</label>
        <input className="w-full h-8 border-2 border-gray-300  rounded-md shadow-md" id={label} {...inputProps} />
        {messageError && (
          <div className="flex justify-center items-center"><span className="text-sm text-red-500" >{messageError}</span></div>
          
        )}
      </div>
    );
}

export { Input };