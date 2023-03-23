import MDForm from './components/MDForm.vue';
import MDCheckbox from './components/MDCheckbox.vue';
import MDDatePicker from './components/MDDatePicker.vue';
import MDDraggablePicker from './components/MDDraggablePicker.vue';
import MDDropZone from './components/MDDropZone.vue';
import MDError from './components/MDError.vue';
import MDGroup from './components/MDGroup.vue';
import MDHelpBlock from './components/MDHelpBlock.vue';
import MDInput from './components/MDInput.vue';
import MDLabel from './components/MDLabel.vue';
import MDSelect from './components/MDSelect.vue';
import MDText from './components/MDText.vue';
import MDTextArea from './components/MDTextArea.vue';

export default {
  install: (app) => {
    app.component('MDForm', MDForm);
    app.component('MDCheckbox', MDCheckbox);
    app.component('MDDatePicker', MDDatePicker);
    app.component('MDDraggablePicker', MDDraggablePicker);
    app.component('MDDropZone', MDDropZone);
    app.component('MDError', MDError);
    app.component('MDGroup', MDGroup);
    app.component('MDHelpBlock', MDHelpBlock);
    app.component('MDInput', MDInput);
    app.component('MDLabel', MDLabel);
    app.component('MDSelect', MDSelect);
    app.component('MDText', MDText);
    app.component('MDTextArea', MDTextArea);
  },
};

export {
  MDForm,
  MDCheckbox,
  MDDatePicker,
  MDDraggablePicker,
  MDDropZone,
  MDError,
  MDGroup,
  MDHelpBlock,
  MDInput,
  MDLabel,
  MDSelect,
  MDText,
  MDTextArea,
};
