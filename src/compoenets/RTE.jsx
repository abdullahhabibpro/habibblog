import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Controller } from 'react-hook-form';

export default function RTE({ name, control, label, defaultValue = '' }) {
  return (
    <div className="mb-4">
      {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
      <Controller
        name={name || 'content'}
        control={control}
        render={({ field: { onChange } }) => (
          <Editor
            apiKey="ams12x0f0paavjuxcbqj7scmm4vffq2j7xuau26iu7hxyfea"
            initialValue={defaultValue}
            init={{
              height: 500,
              menubar: true,
              plugins: [
                'advlist autolink lists link image charmap print preview anchor',
                'searchreplace visualblocks code fullscreen',
                'insertdatetime media table paste code help wordcount',
                'gemini-ai', // Custom Gemini AI plugin
              ],
              toolbar:
                'undo redo | formatselect | bold italic backcolor | \
                alignleft aligncenter alignright alignjustify | \
                bullist numlist outdent indent | removeformat | help | gemini-ai-button',
              setup: (editor) => {
                editor.ui.registry.addButton('gemini-ai-button', {
                  text: 'Generate with Gemini AI',
                  onAction: () => {
                    editor.execCommand('openGeminiAIDialog');
                  },
                });
              },
            }}
            onEditorChange={onChange}
          />
        )}
      />
    </div>
  );
}