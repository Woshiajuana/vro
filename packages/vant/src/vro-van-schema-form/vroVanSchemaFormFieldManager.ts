import { ComponentManager } from '@vrojs/base'

import { VroVanCheckbox } from '../vro-van-checkbox'
import { VroVanCheckboxButton } from '../vro-van-checkbox-button'
import { VroVanDatetimeRangeSelectPicker } from '../vro-van-datetime-range-select-picker'
import { VroVanDatetimeSelectPicker } from '../vro-van-datetime-select-picker'
import { VroVanField } from '../vro-van-field'
import { VroVanImageUploader } from '../vro-van-image-uploader'
import { VroVanPlateInput } from '../vro-van-plate-input'
import { VroVanRadio } from '../vro-van-radio'
import { VroVanRadioButton } from '../vro-van-radio-button'
import { VroVanSelectPicker } from '../vro-van-select-picker'
import { VroVanTextarea } from '../vro-van-textarea'

export const vroVanSchemaFormFieldManager = new ComponentManager()

vroVanSchemaFormFieldManager
  .add('VroVanField', VroVanField, {
    clearable: true,
  })
  .add('VroVanTextarea', VroVanTextarea, {
    autosize: { minRows: 3 },
  })
  .add('VroVanRadio', VroVanRadio)
  .add('VroVanCheckbox', VroVanCheckbox)
  .add('VroVanRadioButton', VroVanRadioButton)
  .add('VroVanCheckboxButton', VroVanCheckboxButton)
  .add('VroVanSelectPicker', VroVanSelectPicker, {
    clearable: true,
  })
  .add('VroVanDatetimeSelectPicker', VroVanDatetimeSelectPicker, {
    clearable: true,
  })
  .add('VroVanDatetimeRangeSelectPicker', VroVanDatetimeRangeSelectPicker, {
    clearable: true,
  })
  .add('VroVanImageUploader', VroVanImageUploader)
  .add('VroVanPlateInput', VroVanPlateInput, {
    clearable: true,
  })
