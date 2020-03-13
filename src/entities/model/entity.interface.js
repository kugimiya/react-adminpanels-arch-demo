import { IItem } from './item.interface';


export const FieldType = {
  text: 'text',
  date: 'date',
  number: 'number',
  extendedSelector: 'extendedSelector'
};

/**
 * @typedef {Object} FieldScheme
 * @property {string} name - Text & human-readable presentation of field
 * @property {(any|undefined)} value - Default value
 * @property {FieldType} type - Type of field (text, checkbox, date, extendedSelector)
 * @property {boolean} isRequired - Indicates that field should not been empty on form sending
 * @property {boolean} isShown - Indicates that field should been displayed
 * @property {boolean} isAllowed - Indicates that user had permissions for field
 */

export class IEntityModel extends IItem {
  /**
   * @param {Object<string, FieldScheme>} entityScheme
   */
  constructor (entityScheme) {
    super();

    const dataForUpdate = {};
    Object.entries(entityScheme).forEach(([fieldId, fieldScheme]) => {
      dataForUpdate[fieldId] = fieldScheme.value;
    });

    this.update(dataForUpdate);
  }
}
