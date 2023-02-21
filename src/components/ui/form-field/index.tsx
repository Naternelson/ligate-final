import {
  FocusEventHandler,
  ForwardedRef,
  forwardRef,
  ReactNode,
  Ref,
  useState,
} from "react";
import {
  ChangeHandler,
  FieldValues,
  RegisterOptions,
  useFormContext,
} from "react-hook-form";
import { joinClass } from "../../utility/joinClass";
import { Collapse } from "../Collapse";
import { FlexBox, FlexBoxProps } from "../FlexBox";
import "./style.css";

export type FormFieldProps = BaseFormFieldProps & {
  useForm?: boolean;
  rules?: RegisterOptions<FieldValues>;
};

export const FormField = (props: FormFieldProps) => {
  const { useForm, name, ...otherProps } = props;
  if (useForm && name)
    return <RegisteredFormField {...otherProps} useForm name={name} />;

  return <BaseFormField {...otherProps} name={name} />;
};

type RegisteredFormField = FormFieldProps & {
  useForm: true;
  name: string;
};

export const RegisteredFormField = (
  props: Omit<FormFieldProps, "name"> & { name: string }
) => {
  const { name, rules, ...baseProps } = props;
  const { register } = useFormContext();
  const { ref, ...registry } = register(name, rules);
  return <BaseFormField {...baseProps} {...registry} ref={ref} />;
};

type BaseFormFieldProps = FlexBoxProps & {
  variant?: "standard";
  placeholder?: string;
  className?: string;
  value?: string;
  label?: ReactNode;
  success?: boolean, 
  error?: boolean;
  helperText?: ReactNode;
  name?: string;
  disabled?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: string | number;
  max?: string | number;
  pattern?: string;
  required?: boolean;
  containerRef?: Ref<HTMLDivElement>;
  onChange?: ChangeHandler;
  onBlur?: ChangeHandler;
};

export const BaseFormField = forwardRef(
  (props: BaseFormFieldProps, ref: ForwardedRef<HTMLInputElement>) => {
    const hasInitialValue = !!props.value || !!props.placeholder;
    const [hasValue, setHasValue] = useState(hasInitialValue);
    const {
      variant,
      className,
      label,
      helperText,
      disabled,
      name,
      error,
      success, 
      onHover,
      onClick,
      id,
      fullPage,
      direction,
      justifyContent,
      alignItems,
      center,
      style,
      container,
      containerRef,
      onBlur,
      ...inputProps
    } = props;

    const flexboxProps: FlexBoxProps = {
      className: joinClass(
        "form-group",
        variant ? variant : "standard",
        hasValue ? "has-value" : undefined,
        error ? "error" : undefined,
        success ? "success" : undefined,
        className
      ),
      fullPage,
      container,
      style,
      onHover,
      id,
      justifyContent,
      center,
      alignItems,
      direction: direction || "column",
    };
    const inputOnBlur: FocusEventHandler<HTMLInputElement> = (e) => {
      if (props.placeholder) return;
      const value = e.target.value;
      const hasValue = value !== "";

      if (hasValue) setHasValue(true);
      else setHasValue(false);
      onBlur && onBlur(e);
    };
    return (
      <FlexBox ref={containerRef} {...flexboxProps}>
        <div className="input-group">
          {label && <label htmlFor={name}>{label}</label>}
          <input
            onBlur={inputOnBlur}
            aria-invalid={!!error}
            name={name}
            ref={ref}
            {...inputProps}
          />
        </div>
        
          <Collapse disapear appear>
            {helperText &&<div role={"alert"} className="helper-text">
              {helperText}
            </div>}
          </Collapse>
        
      </FlexBox>
    );
  }
);
