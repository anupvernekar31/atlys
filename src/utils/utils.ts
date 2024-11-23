export const validateEquation = (equation: string): boolean => {
    const regex = /^[0-9x+\-*/^() ]+$/;
    return regex.test(equation);
  };
  