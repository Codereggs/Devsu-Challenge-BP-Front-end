type Props = {
  icon?: JSX.Element;
  text?: string;
  returnFunction?: (event?: any) => void;
  disabled?: boolean;
};

const CustomizedButton: React.FC<Props> = ({
  icon,
  text,
  returnFunction,
  disabled,
}) => {
  return (
    <div>
      <button
        type="button"
        disabled={disabled}
        onClick={returnFunction}
        className="customized-button"
      >
        {icon} {text}
      </button>
    </div>
  );
};

CustomizedButton.defaultProps = {
  icon: undefined,
  text: "Button",
  returnFunction: () => null,
  disabled: false,
};

export default CustomizedButton;
