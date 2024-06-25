import React, { useState }from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { addContainer, updateContainer, updateRelation, updateVariable, addVariable, addRelation } from "../store/actions";
import { useSelector } from "react-redux";

const OverlayContainer = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
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
    const handleAddContainer = () => {
        const newContainer = { id: containers.length + 1, name: newName, text:"" , x:200, y:200, variables: [], relations: []};
        console.log(newContainer);
        dispatch(addContainer(newContainer));
      };

    const EditContainer = () => {

        const dispacth = useDispatch();
        const [ newName, setNewName ] = useState('');
        const [ newVariableName, setNewVariableName ] = useState('');
        const selectedContainer = containers.find((container) => container.id === selected);
        const relations = useSelector((state) => state.diagram.relations);
        const variables = useSelector((state) => state.diagram.variables);
        const container = useSelector((state) => state.diagram.containers[selected]);

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
                dispacth(updateRelation({ ...relations[relationId], formula: newFormula }));
                setEditing(null);
            };

            console.log(JSON.stringify(container));
            const containerRelations = container.relations.map((relationId) => {
              const relation = relations[relationId];
              var value = relation.formula;

              for (const [key, variable] of Object.entries(variables)) {
                const regex = new RegExp(`variables\\[${key}\\]`, 'g');
                value = value.replace(regex, variable.name);
              }

              for (const [key, relation] of Object.entries(relations)) {
                const regex = new RegExp(`relations\\[${key}\\]`, 'g');
                value = value.replace(regex, relation.name);
              }

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
                    <span onClick={() => handleEdit(relationId, relation.formula)}>
                        {relation.formula}
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
            const newVariable = { id: variables.length, name: newVariableName, value: '1' };
            const container = containers.find((container) => container.id === selected);
            console.log(newVariable);
            dispatch(addVariable(newVariable));
            container.variables.push(newVariable.id);
        }

        const onVariableNameChange = (event) => {
            setNewVariableName(event.target.value);
        }

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
                dispacth(updateVariable({ ...variables[variableId], value: newValue }));
                setEditing(null);
            }
            
            const containerVariables = container.variables.map((variableId) => {
              const variable = variables[variableId];
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

        return (
            <div>
                <div>
                    <div>
                        <input type="text" value={newName} onChange={(e) => onNameChange(e)}/>
                        <button onClick={handleUpdateContainer}>Update Container</button>
                    </div>
                    <div>
                        <input type="text" value={newVariableName} onChange={(e) => onVariableNameChange(e)} placeholder="Variable Name" />
                        <button onClick={handleAddVariable}>Add Variable</button>
                    </div>
                    <RelationFormulas />
                    <Variables />
                </div>
            </div>
        );
    };

    const changeNewName = (event) => {
        newName = event.target.value;
    };

    console.log(selected);

    return (
        <OverlayContainer>
            <TopMenuBar>
                <div>Dynamic Variable Diagrams</div>
                <div>File Edit View</div>
            </TopMenuBar>
            <LeftMenuBar>
                <input type="text" onChange={changeNewName} placeholder="Container Name" />
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