interface ReplaceMDSTextProps {
  text?: string;
  ReplacedTag: keyof JSX.IntrinsicElements;
  replaceClassName: string;
  replaceText: { [key: string]: string };
}

export const ReplaceMDSText = ({ text, ReplacedTag, replaceClassName, replaceText }: ReplaceMDSTextProps) => {
  const outsideBraces = text?.split(/{[^{}]*}/g);
  const replacedInsideBraces = Object.values(replaceText).map((text, index) => {
    return (
      <ReplacedTag key={index} className={replaceClassName}>
        {text}
      </ReplacedTag>
    );
  });

  const result = outsideBraces?.reduce((prev, curr, index) => {
    const replacedText = replacedInsideBraces[index];
    if (replacedText) {
      return [...prev, curr, replacedText];
    } else {
      return [...prev, curr];
    }
  }, []);

  return <div>{result}</div>;
};
