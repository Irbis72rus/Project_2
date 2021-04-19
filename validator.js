class Validator {
  constructor() {
    this._errors = [];
  }

  get Errors() {
    return this._errors;
  }

  validateNumber(schema, dataToValidate) {
    if ('enum' in schema) {
      if (!schema.enum.includes(dataToValidate)) {
        this.Errors.push('The enum does not support value');

        return false;
      }
    }
    

    if (typeof dataToValidate !== 'number') {
      this.Errors.push('Type is incorrect');

      return false;
    }
    
    if ('minimum' in schema) {
      if (schema.minimum <= dataToValidate) {
        return true;
      }
    }
    
    if ('maximum' in schema) {
      if (schema.maximum >= dataToValidate) {
        return true;
      }
    }

    if (dataToValidate < schema.minimum) {
      this.Errors.push('Value is less than it can be');

      return false;
    }

    if (dataToValidate > schema.maximum) {
      this.Errors.push('Value is greater than it can be');

      return false;
    }

    return true;
  }

  validateString(schema, dataToValidate) {
    // Должен добавлять ошибку, если тип неверный
    if (typeof dataToValidate != 'string') {
      this.Errors.push('Type is incorrect');

      return false;
    }

    // Должен добавлять ошибку, если длина строки меньше минимальной
    if (schema.minLength != undefined && schema.minLength >= dataToValidate.length) {
      this.Errors.push('Too short string');

      return false;
    }

    // Должен добавлять ошибку, если длина строки больше максимальной
    if (schema.maxLength != undefined && schema.maxLength <=  dataToValidate.length) {
      this.Errors.push('Too long string');

      return false;
    }

    // Должен добавлять ошибку, если значение не из перечисленных возможных
    if ('enum' in schema) {
      if (!schema.enum.includes(dataToValidate)) {
        this.Errors.push('The enum does not support value');

        return false;
      }
    }

    /*
                  Форматы
      Должен проверять, что строка это email
      Должен добавлять ошибку, если строка не дата
      Должен добавлять ошибку, если строка не email
      Должен проверять, что строка это дата
    */
    if('format' in schema) {
      // debugger
      const regexpEmail = /[a-zA-Z]*@[a-zA-Z-0-9]*.[a-z]*/;
      const isEmail = dataToValidate.match(regexpEmail);
      
      const regexpDate = /\d{4}-\d{2}-\d{2}$/;
      const isDate = dataToValidate.match(regexpDate);

      if (schema.format == 'email'){
        if (!isEmail) {
          // this.Errors.push('Format of string is not valid');
          return false;
        }
      }
        
      if (schema.format == 'date'){
        if (!isDate) {
          this.Errors.push('Format of string is not valid');
          return false;
        }
      }
    }
    // Должен добавлять ошибку, если строка не соответствует переданному регулярному выражению
    if ('pattern' in schema){
      const pat = schema.pattern;
      const isPat = dataToValidate.match(pat);
      if (!isPat){
        this.Errors.push('String does not match pattern');
        
        return false;
      }
    }
    return true;
  }
  // Проверка значений Boolean 
  validateBoolean(schema, dataToValidate){
    if('nullable' in schema){
      if(schema.nullable === true){

        return true;
      }
    }
    
    if (typeof dataToValidate != 'boolean') {
      this.Errors.push('Type is incorrect');

      return false;
    }

    return true;
  }

  /**
   *
   * @param schema
   * @param dataToValidate
   * @returns {boolean}
   */
  isValid(schema = {}, dataToValidate) {
    //Проверка для Числа
    if (schema.type === 'number') {
      return this.validateNumber(schema, dataToValidate);
    }

    // Проверка для строки
    if (schema.type === 'string') {
      return this.validateString(schema, dataToValidate);
    }
    if (schema.type === 'boolean') {
      return this.validateBoolean(schema, dataToValidate);
    }
    if (schema.type === 'object') {
      // return this.validateObject(schema, dataToValidate);
      console.log({schema: schema, dataToValidate: dataToValidate});
              // console.log(typeof dataToValidate);
              // console.log(dataToValidate);
              // if (typeof dataToValidate === 'object') {
              //   console.log(1111);
              //   this.Errors.push('Type is incorrect');
          
              //   return true;
              // }
      
      // console.log(dataToValidate);
      // console.log(typeof dataToValidate);

      for (let i in dataToValidate) {
        if (schema.minProperties >= dataToValidate[i]) {
          this.Errors.push('Too few properties in object');
          return false;
        }
      }
      for (let i in dataToValidate) {
        if (schema.maxProperties <= dataToValidate[i]) {
          this.Errors.push('Too many properties in object');
          return false;
        }
      }
      if ('nullable' in schema) {
        if(schema.nullable === true){
  
          return true;
        }
      }
      if ('additionalProperties' in schema) {
        if (schema.additionalProperties === false) {
          return true;
        }
      }
      if ('required' in schema) {
        console.log(typeof schema.required);
        if (schema.required.length === 0) {
          this.Errors.push('Property required, but value is undefined');
          return false;
        }
      }
      return true;
    }

    return false;
  }
}