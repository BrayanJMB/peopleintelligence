import SendIcon from '@mui/icons-material/Send';
import { Button } from '@mui/material';

const ComplexQuestionButton = ({ complexQuestion, option, index, SendQuestionByType }) => {
  if (!complexQuestion) return null;

  return (
    <Button
      onClick={() =>
        SendQuestionByType(
          option.type,
          option,
          index
        )
      }
      style={{
        marginLeft: '1rem',
        backgroundColor: '#00B0F0',
        color: 'white',
      }}
    >
      <SendIcon />
    </Button>
  );
};

export default ComplexQuestionButton;
