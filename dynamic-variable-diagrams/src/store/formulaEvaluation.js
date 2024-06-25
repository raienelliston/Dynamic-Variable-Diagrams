const evaluateCustomFormula = (formula, variables, relations) => {
    let evaluatedFormula = formula;
  
    console.log("variables: ", variables);
    console.log("relations: ", relations);
  
    variables.forEach((variable) => {
      const regex = new RegExp(`variables\\[${variable.id}\\]`, 'g');
      evaluatedFormula = evaluatedFormula.replace(regex, variable.value);
    });
  
    relations.forEach((relation) => {
      const regex = new RegExp(`relations\\[${relation.id}\\]`, 'g');
      evaluatedFormula = evaluatedFormula.replace(regex, relation.value);
    });
  
    console.log(variables, relations, evaluatedFormula);
  
    try {
      console.log("evaluating formula: ", formula);
      const result = eval(evaluatedFormula);
  
      if (result === Infinity) {
        console.log("Infinity");
        return "Infinity";
      }
      return result;
    } catch (error) {
      console.error("Error evaluating formula: ", formula, error);
      return "ERROR";
    }
  };
  
  export default evaluateCustomFormula;