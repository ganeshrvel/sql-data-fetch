import React from 'react';

import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-sql.min';
import 'prismjs/themes/prism.css';
import { QueryEntity } from '../../features/QueryBuilderTool/ui/types';

export interface QueryEditorProps {
  query: QueryEntity;
  onCodeChange: (value: string) => void;
  isTemporaryQuery: boolean;
}

export default function QueryEditor({
  query,
  onCodeChange,
  isTemporaryQuery,
}: QueryEditorProps) {
  return (
    <Editor
      readOnly={isTemporaryQuery}
      placeholder="Type your SQL code here"
      autoFocus={!isTemporaryQuery}
      value={query.code}
      onValueChange={(code) => {
        onCodeChange(code);
      }}
      highlight={(code) => highlight(code, languages.sql)}
      padding={10}
      style={{
        fontFamily: '"Fira code", "Fira Mono", monospace',
        fontSize: 12,
      }}
    />
  );
}
