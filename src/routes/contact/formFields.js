const contactFrmFields = [
  {
    frmType: 'text',
    title: 'first name',
    labelfor: 'fname',
    name: 'fname',
    placeholder: 'First Name',
    required: true,
    fieldId: 'fname' 
  },
  {
    frmType: 'text',
    title: 'last name',
    labelfor: 'lname',
    name: 'lname',
    placeholder: 'Last Name',
    required: false,
    fieldId: 'lname' 
  },
  {
    frmType: 'email',
    title: 'email address',
    labelfor: 'email',
    name: 'email',
    placeholder: 'Your Email Address',
    required: true,
    fieldId: 'email' 
  },
  {
    frmType: 'tel',
    title: 'phone',
    labelfor: 'phone',
    name: 'phone',
    placeholder: '917 232 1234',
    required: true,
    fieldId: 'tel' 
  },
  {
    frmType: 'text',
    title: 'subject',
    labelfor: 'subject',
    name: 'subject',
    placeholder: 'Message subject, or title',
    required: true,
    fieldId: 'subject' 
  },
  {
    frmType: 'textarea',
    title: 'message',
    labelfor: 'message',
    name: 'message',
    placeholder: 'Write you message or what you want to enquire about here.',
    required: true,
    fieldId: 'message'
  },
  // {
  //   frmType: 'radio',
  //   title: 'Are you the patient?',
  //   name: 'patient',
  //   required: true,
  //   valueOpts: [{radioName: 'Yes', value: 'yes', fieldId: 'yes', labelFor: 'yes'}, {radioName: 'No', value: 'no', fieldId: 'no', labelFor: 'no'}]
  // },
  // {
  //   frmType: 'radio',
  //   title: 'Are you interested in CDPAP?',
  //   name: 'CDPAP',
  //   required: true,
  //   valueOpts: [{radioName: 'Yes', value: 'yes', fieldId: 'yes', labelFor: 'yes'}, {radioName: 'No', value: 'no', fieldId: 'no', labelFor: 'no'}]
  // }
]


export default contactFrmFields