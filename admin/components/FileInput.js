/** @jsxRuntime classic */
/** @jsx jsx */
import { Fragment, useEffect, useRef } from 'react';

import { jsx, Stack } from '@keystone-ui/core';
import { FieldContainer } from '@keystone-ui/fields';

import { Button } from '@keystone-ui/button';

export function FileInput({ accept, value, onChange }) {
  const inputRef = useRef(null);

  const handleFileChange = ({
    target: {
      validity,
      files: [file],
    },
  }) => {
    if (!file || !validity.valid) return;

    onChange(file);
  };

  useEffect(() => {
    if (!value) {
      inputRef.current.value = '';
    }
  }, [value]);

  return (
    <FieldContainer as="fieldset">
      <FileView value={value} onChange={onChange} inputRef={inputRef} />
      <input
        css={{ display: 'none' }}
        accept={accept}
        autoComplete="off"
        ref={inputRef}
        onChange={handleFileChange}
        type="file"
      />
    </FieldContainer>
  );
}

function FileView({ value, onChange, inputRef }) {
  return value ? (
    <Stack gap="small" across align="center">
      <Fragment>
        <Stack across gap="small" align="center">
          <Button
            onClick={() => {
              inputRef.current?.click();
            }}
          >
            Change
          </Button>
          <Button
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
          onClick={() => {
            inputRef.current?.click();
          }}
          tone="positive"
        >
          Select File
        </Button>
      </Stack>
    </Stack>
  );
}
