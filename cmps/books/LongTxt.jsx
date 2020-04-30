const LongTxt = ({ text, isLongTxtShown }) => {
  const textToShow = isLongTxtShown ? text : `${text.slice(0, 100)}...`;
  return <span>{ textToShow }</span>;
};

export default LongTxt;
