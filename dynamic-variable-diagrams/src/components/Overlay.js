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

        const [ newName, setNewName ] = useState('');

        const handleUpdateContainer = () => {

            const selectedContainer = containers.find((container) => container.id === selected);
            console.log(selected);
            if (selectedContainer && newName) {
                console.log(JSON.stringify(selectedContainer));
              dispatch(updateContainer({ ...selectedContainer.id, name: newName }));
            }

        };

        const onChange = (event) => {
            setNewName(event.target.value);
        };

        return (
            <div>
                <div>
                    <input
                        type="text"
                        value={newName}
                        onChange={(e) => onChange(e)}
                    />
                    <button onClick={handleUpdateContainer}>Update Container</button>
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
                <EditContainer />
                Selected Item: {selected}
            </RightMenuBar>
        </OverlayContainer>
    );
}

export default Overlay;