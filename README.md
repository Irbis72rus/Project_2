## Практика неделя 2

В данном задании вам необходимо написать валидатор входных данных.
В файле `validator.js` находится класс Validator, который вам нужно дописать.
В классе содержится метод `isValid(schema: object, dataToValidate: any): boolean`

`dataToValidate` - данные, которые нужно проверить.

`schema` - объект с правилами, по которым будут проверяться данные.
Он может иметь следующие свойства:
- `type` - тип данных. Возможные значения: `'number', 'string', 'boolean', 'object', 'array'`
  
- `nullable` - может ли переданное значение быть null-ом. Возможные значения: `true, false`

- `anyOf` - Массив объектов типа `schema`. Соответствуют ли переданные данные хотя бы одной из схем.

- `oneOf` - Массив объектов типа `schema`. Соответствуют ли переданные данные ровно одной из схем.

Для `type === 'number'`:
- `minimum` - минимальное значение
- `maximum` - максимальное значение
- `enum` - массив с возможными значениями

Для `type === 'string'`:
- `minLength` - минимальная длина строки
- `maxLength` - максимальная длина строки
- `pattern` - регулярное выражение
- `enum` - массив с возможными значениями
- `format` - Возможные значения:
    - `email` - проверяет, что строка это email
    - `date` - проверяет, что строка это дата

Для `type === 'array'`:
- `minItems` - минимальное количество элементов
- `maxItems` - максимальное количество элементов
- `items` - проверка типов элементов массива. Либо объект с ключом `type`, либо массив таких объектов
- `contains` - проверка на вхождение элемента в массив
- `uniqueItems` - должны ли элементы быть уникальными
- `enum` - массив с возможными значениями

Для `type === 'object'`:
- `minProperties` - минимальное количество свойств
- `maxProperties` - максимальное количество свойств
- `required` - массив с обязательными свойствами
- `properties` - объект с описанием свойств и их значений
- `additionalProperties` - может ли объект содержать свойства кроме описанных в `properties`

Склонируйте себе этот репозиторий и напишите реализацию класса Validator. 

**!!!Вы можете редактировать только файл `validator.js`.**

Готовый код выложите в свой собственный репозиторий.

Совет: не пишите всё в одном методе, старайтесь разбить на разные.

## Тесты
Для проверки корректности вашей реализации используйте тесты, которые мы подготовили. Для этого откройте в браузере файл
`index.html`.

Тестирование производится при помощи библиотеки [jasmine](https://jasmine.github.io/)

