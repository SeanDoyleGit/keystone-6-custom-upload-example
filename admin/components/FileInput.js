/** @jsxRuntime classic */
/** @jsx jsx */
import { Fragment, useRef } from 'react';

import { jsx, Stack } from '@keystone-ui/core';
import { useToasts } from '@keystone-ui/toast';
import { FieldContainer, FieldLabel } from '@keystone-ui/fields';

import { Button } from '@keystone-ui/button';

export function FileInput({ value, onChange }) {
  const inputRef = useRef(null);

  const handleFileChange = ({
    target: { validity, files: [file] }
  }) => {
    if (!file || !validity.valid) return;

    onChange(file);
  };

  return (
    <FieldContainer as="fieldset">
      <FieldLabel as="legend">Select File</FieldLabel>
      <FileView
        value={value}
        onChange={onChange}
        inputRef={inputRef}
      />
      <input
        css={{ display: 'none' }}
        autoComplete="off"
        ref={inputRef}
        // value={value}
        onChange={handleFileChange}
        type="file"
      />
    </FieldContainer>
  );
}

function FileView({ value, onChange, inputRef }) {
  const { addToast } = useToasts();

  return value ? (
    <Stack gap="small" across align="center">
      <Fragment>
        <Stack across gap="small" align="center">
          <Button
            size="small"
            onClick={() => {
              inputRef.current?.click();
            }}
          >
            Change
          </Button>
          <Button
            size="small"
            tone="negative"
            onClick={() => {
              onChange(null);
            }}
          >
            Cancel
          </Button>
        </Stack>
      </Fragment>
    </Stack>
  ) : (
    <Stack gap="small">
      <Stack css={{ alignItems: 'center' }} gap="small" across>
        <Button
          size="small"
          onClick={() => {
            inputRef.current?.click();
          }}
          tone="positive"
        >
          Upload File
        </Button>
      </Stack>
    </Stack>
  );
}