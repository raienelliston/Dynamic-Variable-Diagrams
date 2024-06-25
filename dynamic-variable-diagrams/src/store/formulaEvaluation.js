const evaluateCustomFormula = (formula, variables, relations) => {
    let evaluatedFormula = formula;
  
    Object.keys(variables).forEach((key) => {
      const regex = new RegExp(`variables\\[${key}\\]`, 'g');
      evaluatedFormula = evaluatedFormula.replace(regex, variables[key].value);
    });
  
    Object.keys(relations).forEach((key) => {
      const regex = new RegExp(`relations\\[${key}\\]`, 'g');
      evaluatedFormula = evaluatedFormula.replace(regex, relations[key].value);
    });
  
    try {
      const result = eval(evaluatedFormula);
      return result;
    } catch (error) {
      console.error("Error evaluating formula: ", formula, error);
      return null;
    }
  };

export default evaluateCustomFormula;