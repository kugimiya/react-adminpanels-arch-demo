import { action, computed, observable, toJS } from 'mobx';

/**
 * @typedef {Object} FieldScheme
 * @property {string} name - Text & human-readable presentation of field
 * @property {(any|undefined)} value - Default value
 * @property {FieldType} type - Type of field (text, checkbox, date, extendedSelector)
 * @property {boolean} isRequired - Indicates that field should not been empty on form sending
 * @property {boolean} isShown - Indicates that field should been displayed
 * @property {boolean} isAllowed - Indicates that user had permissions for field
 */

export class IFormModel {
  scheme = {};
  @observable errors = {};
  @observable defaultValues = {};
  @observable fields = {};

  /**
   * @param {Object<string, FieldScheme>} entityScheme
   */
  constructor(entityScheme) {
    Object.entries(entityScheme).forEach(([fieldId, fieldScheme]) => {
      this.constructField({ fieldId, ...fieldScheme });
    });

    this.reset();
  }

  constructField({
    fieldId,
    isRequired = false,
    type = 'text',
    formatRegexp = /.*/,
    placeholder = 'placeholder',
    defaultValue,
    errorTips = {
      required: 'Its required field',
      format: 'Wrong format'
    }
  }) {
    this.scheme[fieldId] = { isRequired, type, placeholder, formatRegexp,  errorTips };
    this.defaultValues[fieldId] = defaultValue;
  }

  validate() {
    let result = true;

    Object.entries(this.fields).forEach(([id, value]) => {
      if (this.scheme[id].isRequired) {
        if (value.length === 0) {
          result = false;
          this.errors[id] = 'required';
        }
      }

      // TODO: format validating (note: skip for fields, that already had error)
    });

    return result;
  }

  clearValidation() {
    this.errors = {};
  }

  @computed get values () {
    return toJS(this.fields);
  }

  @action.bound setValue (fieldId, value) {
    this.fields[fieldId] = value;
  }

  @action.bound reset () {
    this.fields = { ...this.defaultValues };
  }
}
