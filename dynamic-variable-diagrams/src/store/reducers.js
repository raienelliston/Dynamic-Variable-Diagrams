// src/store/reducers.js
import { ADD_CONTAINER, UPDATE_CONTAINER, DELETE_CONTAINER, ADD_RELATION, UPDATE_RELATION, DELETE_RELATION, ADD_VARIABLE, UPDATE_VARIABLE, DELETE_VARIABLE, ADD_NODE_TO_CONTAINER, DELETE_NODE_FROM_CONTAINER, SELECT_ITEM, EVALUATE_RELATIONS, EVALUATE_ALL_RELATIONS } from './actions';
import evaluateFormula from './formulaEvaluation';

function checkSavedDiagram() {
  if (localStorage.getItem('diagram')) {
    const diagram = JSON.parse(localStorage.getItem('diagram'));
    return( {
      containers: diagram.containers,
      relations: diagram.relations,
      variables: diagram.variables,
      selected: null,
    });
  } else {
    const diagram = {
      containers: [
        { id: 0, name: 'Container 1', text: "this is a container", x: 100, y: 100, variables: [], relations: []},
        { id: 1, name: 'Container 2', text: "", x: 200, y: 100, variables: [1,2], relations: [0,1]},
        { id: 2, name: 'Container 3', text: "", x: 400, y: 200, variables: [5,3], relations: [2]},
    ],
      relations: [
        { id: 0, name: 'Relation 1', formula: "variables[1] + variables[2]", value: 0},
        { id: 1, name: 'Relation 2', formula: "variables[1] * relations[0]", value: 0},
        { id: 2, name: 'Relation 3', formula: "relations[1] - variables[5]", value: 0},
      ],
      variables: [
        { id: 0, name: 'Variable 1', value: 1},
        { id: 1, name: 'Variable 2', value: 2},
        { id: 2, name: 'Variable 3', value: 3},
        { id: 3, name: 'Variable 4', value: 4},
        { id: 4, name: 'Variable 5', value: 5},
        { id: 5, name: 'Variable 6', value: 6},
      ],
      selected: null,
    };
    localStorage.setItem('diagram', JSON.stringify(diagram));
    return ( diagram );
  }
}

const initialState = checkSavedDiagram();

const evaluateRelation = (relation, variables, relations) => {
  return ( {
    id: relation.id,
    name: relation.name,
    formula: relation.formula,
    value: evaluateFormula(relation.formula, variables, relations),
  } );
};

const evaluateAllRelations = (relations, variables) => {
  const updatedRelations = [];

  for (const [id, relation] of Object.entries(relations)) {
    updatedRelations[id] = evaluateRelation(relation, variables, relations);
  }

  if (JSON.stringify(updatedRelations) !== JSON.stringify(relations)) {
    return evaluateAllRelations(updatedRelations, variables);
  }

  return updatedRelations;
};

const diagramReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CONTAINER:
      return {
        ...state,
        containers: [...state.containers, action.payload],
      };
    case 'UPDATE_CONTAINER':
      return {
        ...state,
        containers: state.containers.map(container =>
          container.id === action.payload.id
            ? { ...container, ...action.payload }
            : container
        ),
      };
    case DELETE_CONTAINER:
      return {
        ...state,
        containers: state.containers.filter(container => container.id !== action.payload.id),
      };
    case 'ADD_RELATION':
      return {
        ...state,
        relations: {
          ...state.relations,
          [action.payload.id]: action.payload,
        },
      };
    case 'UPDATE_RELATION':
        return {
          ...state,
          relations: {
            ...state.relations,
            [action.payload.id]: action.payload,
          },
        };
    case DELETE_RELATION:
      return {
        ...state,
        relations: state.relations.filter(relation => relation.id !== action.payload.id),
      };
    case ADD_VARIABLE:
      return {
        ...state,
        variables: [...state.variables, action.payload],
        containers: state.containers.map(container =>
          container.id === action.payload.containerId
            ? { ...container, variables: [...container.variables, action.payload.id] }
            : container
        ),
      };
    case UPDATE_VARIABLE:
      return {
        ...state,
        variables: state.variables.map(variable =>
          variable.id === action.payload.id ? action.payload : variable
        ),
      };
    case DELETE_VARIABLE:
      return {
        ...state,
        variables: state.variables.filter(variable => variable.id !== action.payload.id),
      };
    case ADD_NODE_TO_CONTAINER:
      return state;
    case DELETE_NODE_FROM_CONTAINER:
      return state;
    case SELECT_ITEM:
      return {
        ...state,
        selected: action.payload,
      }
    case EVALUATE_RELATIONS:
      const updatedRelations = [];
      for (const [id, relation] of Object.entries(state.relations)) {
        console.log("evaluating relation: ", relation);
        updatedRelations[id] = evaluateRelation("0", state.relations, state.variables);
      }
      return {
        ...state,
        relations: updatedRelations,
      };
    case EVALUATE_ALL_RELATIONS:
      return {
        ...state,
        relations: evaluateAllRelations(state.relations, state.variables),
      };
    default:
      return state;
  }
};

export default diagramReducer;