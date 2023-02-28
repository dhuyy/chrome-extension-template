interface ShowMessageParams {
  message: string;
}

const showMessage = ({ message }: ShowMessageParams) => console.log(message);

export default showMessage;
