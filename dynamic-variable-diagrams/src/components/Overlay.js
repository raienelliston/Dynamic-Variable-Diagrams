import React, { useState }from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { addContainer, updateContainer } from "../store/actions";
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
        const newContainer = { id: containers.length + 1, name: newName , x:200, y:200 };
        dispatch(addContainer(newContainer));
      };

    const EditContainer = () => {

        const dispacth = useDispatch();
        const [ newName, setNewName ] = useState('');
        const selectedContainer = containers.find((container) => container.id === selected);

        const handleUpdateContainer = () => {

            console.log("selected: " + selected);
            if (selectedContainer && newName) {
                console.log(selectedContainer.id + newName);
              dispatch(updateContainer({ ...selectedContainer, name: newName }));
            }

        };

        const onChange = (event) => {
            setNewName(event.target.value);
        };

        const RelationFormulas = () => {
            const relations = useSelector((state) => state.diagram.relations);
            const variables = useSelector((state) => state.diagram.variables);
            const container = useSelector((state) => state.diagram.containers[selected]);

            if (!container) {
              return null;
            }

            console.log(JSON.stringify(container));
            const containerRelations = container.relations.map((relationId) => {
              const relation = relations[relationId];
              const value = relation.formula;
              return (
                <div key={relationId}>
                  {relation.name}: {value}
                </div>
              );
            });
        
            return (
              <div>
                {containerRelations}
              </div>
            );
          }


        return (
            <div>
                <div>
                    <input
                        type="text"
                        value={newName}
                        onChange={(e) => onChange(e)}
                    />
                    <button onClick={handleUpdateContainer}>Update Container</button>
                    <RelationFormulas />
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