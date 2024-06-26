import React, { useState }from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { addContainer, updateContainer, deleteContainer, updateRelation, updateVariable, addVariable, addRelation, deleteVariable, selectItem } from "../store/actions";
import { useSelector } from "react-redux";

const OverlayContainer = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    pointer-events: none;
    z-index: 100;
    `;

const TopMenuBar = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    min-height: 50px;
    background-color: #8a8a8a;
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0;
    `;

const LeftMenuBar = styled.div`
    position: absolute;
    top: 50px;
    left: 0;
    width: flex;
    height: calc(100% - 50px);
    background-color: #8a8a8a;
    color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px 0;
    pointer-events: fill;
    `;

const RightMenuBar = styled.div`
    position: absolute;
    top: 50px;
    right: 0;
    width: flex;
    height: calc(100% - 50px);
    background-color: #8a8a8a;
    color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px 0;
    pointer-events: fill;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 20px 0;
    pointer-events: fill;
`;

const Overlay = () => {
    const containers = useSelector((state) => state.diagram.containers);
    const dispatch = useDispatch();
    const selected = useSelector((state) => state.diagram.selected);
    var newName = '';
    var newText = '';

    const handleAddContainer = () => {

        if (!newName) {
            alert('Please enter a name');
            return;
        }
        console.log(newName);
        const newContainer = { id: containers.length, name: newName, text:newText , x:200, y:200, variables: [], relations: []};
        console.log(newContainer);
        dispatch(addContainer(newContainer));
      };

    const EditContainer = () => {


        const dispatch = useDispatch();
        const [ newName, setNewName ] = useState('');
        const [ newVariableName, setNewVariableName ] = useState('');
        const [ newVariableValue, setNewVariableValue ] = useState(1);
        const [ newRelationName, setNewRelationName ] = useState('');
        const [ newRelationFormula, setNewRelationFormula ] = useState("1");
        const selectedContainer = containers.find((container) => container.id === selected);
        const relations = useSelector((state) => state.diagram.relations);
        const variables = useSelector((state) => state.diagram.variables);
        const container = useSelector((state) => state.diagram.containers[selected]);

        if (selected === null) {
            return null;
        }

        const handleUpdateContainer = () => {

            console.log("selected: " + selected);
            if (selectedContainer && newName) {
                console.log(selectedContainer.id + newName);
              dispatch(updateContainer({ ...selectedContainer, name: newName }));
            }

        };

        const onNameChange = (event) => {
            setNewName(event.target.value);
        };

        const RelationFormulas = () => {
            const [editing, setEditing] = useState(null);
            const [newFormula, setNewFormula] = useState('');

            if (!container) {
              return null;
            }

            const handleEdit = (relationId, formula) => {
                setEditing(relationId);
                setNewFormula(formula);
            };

            const handleFormulaChange = (event) => {
                setNewFormula(event.target.value);
            };

            const handleSave = (relationId) => {
                const updatedFormula = newFormula
                    .replace(/(\b\w+\b)/g, (match) => {
                    const variable = variables.find((variable) => variable.name === match);
                    if (variable) return `variables[${variable.id}]`;
                    const relation = relations.find((relation) => relation.name === match);
                    if (relation) return `relations[${relation.id}]`;
                    return match;
                    });
                console.log(updatedFormula);

                dispatch(updateRelation({ ...relations[relationId], formula: updatedFormula }));
                setEditing(null);
            };

            console.log(JSON.stringify(container));
            const containerRelations = container.relations.map((relationId) => {
              const relation = relations.find((relation) => relation.id === relationId);


              const renamedFormula = relation.formula.replace(/variables\[(\d+)\]/g, (match, id) => variables.find((variable) => variable.id === parseInt(id)).name).replace(/relations\[(\d+)\]/g, (match, id) => relations.find((relation) => relation.id === parseInt(id)).name);

              return (
                <div key={relationId}>
                    {editing === relationId ? (
                        <div>
                            {relation.name}:
                            <input
                                type="text"
                                value={newFormula}
                                onChange={handleFormulaChange}
                            />
                            <button onClick={() => handleSave(relationId)}>Save</button>
                        </div>
                    ) : (
                    <div>
                        {relation.name}: 
                    <span onClick={() => handleEdit(relationId, renamedFormula)}>
                        {renamedFormula}
                    </span>
                    </div>
            )}
                </div>
              );
            });
        
            return (
              <div>
                {containerRelations}
              </div>
            );
          }

        const handleAddVariable = () => {

            if (!newVariableName) {
                alert('Please enter a name');
                return;
            }

            if (variables.find((variable) => variable.name === newVariableName)) {
                alert('Variable already exists');
                return;
            }

            if (relations.find((relation) => relation.name === newVariableName)) {
                alert('Variable name already exists as a relation');
                return;
            }

            const newVariable = { id: variables.length, name: newVariableName, value: newVariableValue };
            const container = containers.find((container) => container.id === selected);
            dispatch(addVariable(newVariable));
            dispatch(updateContainer({ ...selectedContainer, variables: [...selectedContainer.variables, newVariable.id] }));
        }

        const handleAddRelation = () => {

            if (!newRelationName) {
                alert('Please enter a name');
                return;
            }

            if (relations.find((relation) => relation.name === newRelationName)) {
                alert('Relation already exists');
                return;
            }

            const updatedFormula = newRelationFormula.replace(/(\b\w+\b)/g, (match) => {
                const variable = variables.find((variable) => variable.name === match);
                if (variable) return `variables[${variable.id}]`;
                const relation = relations.find((relation) => relation.name === match);
                if (relation) return `relations[${relation.id}]`;
                return match;
            });

            const newRelation = { id: Object.keys(relations).length, name: newRelationName, formula: updatedFormula };
            dispatch(addRelation(newRelation));
            dispatch(updateContainer({ ...selectedContainer, relations: [...selectedContainer.relations, newRelation.id] }));
        };

        const Variables = () => {
            const variables = useSelector((state) => state.diagram.variables);
            const container = useSelector((state) => state.diagram.containers[selected]);
            const [editing, setEditing] = useState(null);
            const [newValue, setNewValue] = useState('');

            if (!container) {
              return null;
            }

            const handleEdit = (variableId, value) => {
                setEditing(variableId);
                setNewValue(value);
            }

            const handleValueChange = (event) => {
                setNewValue(event.target.value);
            }

            const handleSave = (variableId) => {
                
                const value = parseFloat(eval(newValue));
                
                try {
                    eval(value);
                } catch (e) {
                    alert('Invalid formula');
                    return;
                }
                dispatch(updateVariable({ ...variables[variableId], value: value }));
                setEditing(null);
            }
            
            const containerVariables = container.variables.map((variableId) => {
              const variable = variables.find((variable) => variable.id === variableId);
              return (
                <div key={variableId}>
                {editing === variableId ? (
                    <div>
                        {variable.name}:
                        <input
                            type="text"
                            value={newValue}
                            onChange={handleValueChange}
                        />
                        <button onClick={() => handleSave(variableId)}>Save</button>
                    </div>
                ) : (
                <div>
                    {variable.name}: 
                <span onClick={() => handleEdit(variableId, variable.value)}>
                    {variable.value}
                </span>
                </div>
            )}
                </div>
              );
            });
        
            return (
                <div>
                    {containerVariables}
                </div>
            );
          }

          const DeleteContainer = () => {
            const handleDelete = () => {
                console.log(selected)
                dispatch(selectItem(null));
                dispatch(deleteContainer(container));
            };
        
            return (
                <button onClick={handleDelete}>Delete Container</button>
            );
        }

          return (
            <div>
                <div>
                    <div>
                        <input type="text" value={newName} onChange={(e) => onNameChange(e)}/>
                        <button onClick={handleUpdateContainer}>Update Container</button>
                    </div>
                    <div>
                        <input type="text" value={newVariableName} onChange={(e) => setNewVariableName(e.target.value)} placeholder="Variable Name" />
                        <input type="number" value={newVariableValue} onChange={(e) => setNewVariableValue(e.target.value)} placeholder="Variable Value" />
                        <button onClick={handleAddVariable}>Add Variable</button>
                    </div>
                    <div>
                        <input type="text" value={newRelationName} onChange={(e) => setNewRelationName(e.target.value)} placeholder="Relation Name" />
                        <input type="text" value={newRelationFormula} onChange={(e) => setNewRelationFormula(e.target.value)} placeholder="Relation Formula" />
                        <button onClick={handleAddRelation}>Add Relation</button>
                    </div>
                    <RelationFormulas />
                    <Variables />
                    <DeleteContainer />
                </div>
            </div>
        );
    };

    const changeNewName = (event) => {
        newName = event.target.value;
    };

    const changeNewText = (event) => {
        newText = event.target.value
    }

    console.log(selected);

    return (
        <OverlayContainer>
            <TopMenuBar>
                <div>Dynamic Variable Diagrams</div>
                <div>File Edit View</div>
            </TopMenuBar>
            <LeftMenuBar>
                <input type="text" onChange={changeNewName} placeholder="Container Name" />
                <input type="text" onChange={changeNewText} placeholder="Container Text" />
                <button onClick={handleAddContainer}>Add Container</button>
            </LeftMenuBar>
            <RightMenuBar>
                Selected Item: {selected}
                <EditContainer />
            </RightMenuBar>
        </OverlayContainer>
    );
}

export default Overlay;