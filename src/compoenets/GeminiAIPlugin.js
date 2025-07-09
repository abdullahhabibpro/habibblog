import { getGenerativeAI } from '@google/generative-ai';

export const setupGeminiAIPlugin = (editor) => {
  // Initialize Gemini AI client
  const apiKey = 'AIzaSyCejuGPZ1LfG1aD1Y0GCJEVHABqjt9KIec';
  const genAI = new getGenerativeAI({ apiKey });

  editor.addCommand('openGeminiAIDialog', () => {
    editor.windowManager.open({
      title: 'Generate Text with Gemini AI',
      body: {
        type: 'panel',
        items: [
          {
            type: 'input',
            name: 'prompt',
            label: 'Enter your prompt for Gemini AI',
            placeholder: 'E.g., Write a blog intro about AI',
          },
        ],
      },
      buttons: [
        {
          type: 'submit',
          text: 'Generate',
          primary: true,
        },
        {
          type: 'cancel',
          text: 'Cancel',
        },
      ],
      onSubmit: async (api) => {
        const data = api.getData();
        const prompt = data.prompt;

        try {
          const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
          const result = await model.generateContent(prompt);
          const response = await result.response;
          const text = response.text();

          // Insert the generated text into the editor
          editor.insertContent(text);
        } catch (error) {
          editor.windowManager.alert('Error generating content: ' + error.message);
        }

        api.close();
      },
    });
  });

  editor.ui.registry.addButton('gemini-ai-button', {
    text: 'Generate with Gemini AI',
    onAction: () => {
      editor.execCommand('openGeminiAIDialog');
    },
  });

  return {
    getMetadata: () => ({
      name: 'Gemini AI Plugin',
      url: 'https://example.com/gemini-ai-plugin',
    }),
  };
};

// Register the plugin with TinyMCE
window.tinymce.PluginManager.add('gemini-ai', setupGeminiAIPlugin);