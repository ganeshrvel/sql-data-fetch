import React, { useState } from 'react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-sql.min';
import 'prismjs/themes/prism.css';
import { QueryEntity } from '../../features/QueryBuilderTool/ui/types';
import styles from './index.module.scss';
import classNames from 'classnames';

export interface QueryEditorProps {
  query: QueryEntity;
  onCodeChange: (value: string) => void;
  isTemporaryQuery: boolean;
  title: string;
}

export default function QueryEditor({
  query,
  onCodeChange,
  isTemporaryQuery,
  title,
}: QueryEditorProps) {
  const [isFocused, setIsFocused] = useState<boolean>(!isTemporaryQuery);

  return (
    <div className={styles.root}>
      <span className={styles.title}>{title}</span>
      <Editor
        className={classNames(styles.editor, { [styles.focus]: isFocused })}
        readOnly={isTemporaryQuery}
        placeholder="Type your SQL code here"
        value={query.code}
        onValueChange={(code) => {
          onCodeChange(code);
        }}
        highlight={(code) => highlight(code, languages.sql)}
        padding={15}
        onFocus={() => {
          setIsFocused(true);
        }}
        onBlur={() => {
          setIsFocused(false);
        }}
        
      />
    </div>
  );
}
