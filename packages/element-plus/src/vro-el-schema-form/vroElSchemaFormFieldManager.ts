import { ComponentManager } from '@vrojs/base'
import {
  ElCascader,
  ElCheckboxGroup,
  ElDatePicker,
  ElDivider,
  ElInput,
  ElInputNumber,
  ElRadioGroup,
  ElSelect,
  ElTreeSelect,
} from 'element-plus'

import { VroElCheckboxGroup } from '../vro-el-checkbox-group'
import VroElFileUpload from '../vro-el-file-upload'
import VroElImageUpload from '../vro-el-image-upload'
import { VroElRadioGroup } from '../vro-el-radio-group'
import { VroElSelect } from '../vro-el-select'
import VroElTags from '../vro-el-tags'
import VroElTree from '../vro-el-tree'

export const vroElSchemaFormFieldManager = new ComponentManager()

// 注册
vroElSchemaFormFieldManager
  .add('ElInput', ElInput, {
    clearable: true,
    showWordLimit: true,
    autosize: { minRows: 2 },
  })
  .add('ElSelect', ElSelect, {
    clearable: true,
    filterable: true,
  })
  .add('ElRadioGroup', ElRadioGroup)
  .add('ElCheckboxGroup', ElCheckboxGroup)
  .add('ElDatePicker', ElDatePicker, {
    type: 'date',
    clearable: true,
  })
  .add('ElInputNumber', ElInputNumber)
  .add('ElTreeSelect', ElTreeSelect)
  .add('ElCascader', ElCascader, {
    clearable: true,
    validateEvent: false,
  })
  .add('ElDivider', ElDivider, {
    contentPosition: 'center',
  })
  .add('VroElSelect', VroElSelect, {
    clearable: true,
    filterable: true,
  })
  .add('VroElCheckboxGroup', VroElCheckboxGroup)
  .add('VroElRadioGroup', VroElRadioGroup)
  .add('VroElImageUpload', VroElImageUpload)
  .add('VroElFileUpload', VroElFileUpload)
  .add('VroElTags', VroElTags)
  .add('VroElTree', VroElTree)
