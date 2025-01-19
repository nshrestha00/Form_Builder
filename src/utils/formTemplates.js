export const formTemplates = {
    contactForm: {
      name: 'Contact Form',
      elements: [
        {
          id: 'name',
          type: 'text',
          label: 'Full Name',
          required: true
        },
        {
          id: 'email',
          type: 'text',
          label: 'Email Address',
          required: true,
          validation: {
            type: 'email',
            message: 'Please enter a valid email address'
          }
        },
        {
          id: 'subject',
          type: 'select',
          label: 'Subject',
          required: true,
          options: [
            { label: 'General Inquiry', value: 'general' },
            { label: 'Support', value: 'support' },
            { label: 'Feedback', value: 'feedback' }
          ]
        },
        {
          id: 'message',
          type: 'text',
          label: 'Message',
          required: true
        }
      ]
    },
    surveyForm: {
      name: 'Survey Form',
      elements: [
        {
          id: 'satisfaction',
          type: 'radio',
          label: 'How satisfied are you with our service?',
          required: true,
          options: [
            { label: 'Very Satisfied', value: '5' },
            { label: 'Satisfied', value: '4' },
            { label: 'Neutral', value: '3' },
            { label: 'Dissatisfied', value: '2' },
            { label: 'Very Dissatisfied', value: '1' }
          ]
        },
        {
          id: 'recommendation',
          type: 'select',
          label: 'Would you recommend us to others?',
          required: true,
          options: [
            { label: 'Definitely', value: 'definitely' },
            { label: 'Maybe', value: 'maybe' },
            { label: 'Not Sure', value: 'not_sure' },
            { label: 'No', value: 'no' }
          ]
        }
      ]
    }
  };
  
  export const getTemplate = (templateId) => {
    return formTemplates[templateId] || null;
  };
  
  export const getAllTemplates = () => {
    return Object.entries(formTemplates).map(([id, template]) => ({
      id,
      name: template.name
    }));
  };