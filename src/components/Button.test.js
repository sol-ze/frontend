import { render, screen, fireEvent } from "@testing-library/react";
import Button from "./Button";

test("renders Button with correct text", () => {
  render(<Button btnOption="primary">Click Me</Button>);
  expect(screen.getByText("Click Me")).toBeInTheDocument();
});

test("calls onClick handler when clicked", () => {
  const onClickMock = jest.fn();
  render(
    <Button btnOption="primary" onClick={onClickMock}>
      Click Me
    </Button>
  );

  fireEvent.click(screen.getByText("Click Me"));
  expect(onClickMock).toHaveBeenCalledTimes(1);
});
