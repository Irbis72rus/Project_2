class Validator {
  constructor() {
    this._errors = [];
  }

  get Errors() {
    return this._errors;
  }

  /**
   *
   * @param schema
   * @param dataToValidate
   * @returns {boolean}
   */
  isValid(schema = {}, dataToValidate) {
    if (schema.type === 'number') {
      // console.log({schema: schema, dataToValidate: dataToValidate})
      // console.log(schema, dataToValidate);
      // console.log(schema);
      // console.log(schema.enum);


      // schema.enum.forEach(function(item){
      //   console.log(item);
      //   // this.Errors.push('The enum does not support value');
      //   }
      // )


      if (typeof dataToValidate !== 'number') {
        this.Errors.push('Type is incorrect')

        return false;
      }
      
      if ('minimum' in schema) {
        // console.log(schema, dataToValidate)

        if (schema.minimum <= dataToValidate) {
          return true;
        }
      }
      
      if ('maximum' in schema) {
        // console.log(schema, dataToValidate)

        if (schema.maximum >= dataToValidate) {
          return true;
        }
      }

      if (dataToValidate < schema.minimum){
        this.Errors.push('Value is less than it can be')

        return false;
      }

      if (dataToValidate > schema.maximum){
        this.Errors.push('Value is greater than it can be')

        return false;
      }
      // if (schema.enum.includes(number)){
      //   return true;
      // }
      
      // if(schema.enum !== undefined){
      //     // console.log(id + " - ", element);
      //     if(!schema.enum.includes(number)){
      //       this.Errors.push('The enum does not support value');
      //       console.log('Нашли не число');
      //     }
      // }
      return true;
    }

    else if(schema.type === 'string') {
      // console.log({shema:schema, dataToValidate: dataToValidate});
      // console.log(schema);

      // console.log(schema.format);
      // if(schema.format){
      //   if(schema.format === date){
      //     return true;
      //   }
      // }
      // console.log({dataToValidate:dataToValidate, type:typeof dataToValidate});

      
      if(schema.format === 'date'){
        console.log(schema.format);
        return true;
      }

      console.log(schema.maxLength);
      console.log(dataToValidate);


      // console.log(schema);
      // console.log(schema.format);
      // if(schema.format && schema.format === date){
      //   return true;
      // }
      return true;
    }
    this.Errors.push('The enum does not support value');
    return false;
  }
}
