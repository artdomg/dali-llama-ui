import { useEffect, useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';

const GameUrl = () => {
  const [urlCopied, setUrlCopied] = useState(false);
  // eslint-disable-next-line no-restricted-globals
  const url = location.href;

  useEffect(() => {
    if (urlCopied) {
      setTimeout(() => setUrlCopied(false), 3000);
    }
  }, [urlCopied]);

  return (
    <InputGroup>
      <Form.Control type="text" readOnly value={url} />
      <Button
        variant="dark"
        onClick={() => {
          navigator.clipboard.writeText(url);
          setUrlCopied(true);
        }}
      >
        {urlCopied ? 'Copied!' : 'Copy'}
      </Button>
    </InputGroup>
  );
};

export default GameUrl;
