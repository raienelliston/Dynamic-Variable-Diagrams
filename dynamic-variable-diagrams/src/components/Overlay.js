import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { addContainer } from "../store/actions";
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
    justify-content: space-between;
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
    justify-content: space-between;
    align-items: center;
    padding: 20px 0;
    pointer-events: fill;
`;

const Overlay = () => {
    const containers = useSelector((state) => state.diagram.containers);
    const dispatch = useDispatch();

    const handleAddContainer = () => {
        const newContainer = { id: containers.length + 1, name: `Container ${containers.length + 1}`, x:0, y:0 };
        dispatch(addContainer(newContainer));
      };

    const EditContainer = () => {
        return (
            <div>
                <input type="text" placeholder="Container Name" />
                <button>Save</button>
                <button>Delete</button>
            </div>
        );
    };
    


    return (
        <OverlayContainer>
            <TopMenuBar>
                <div>Dynamic Variable Diagrams</div>
                <div>File Edit View</div>
            </TopMenuBar>
            <LeftMenuBar>
                <button onClick={handleAddContainer}>Add Container</button>
            </LeftMenuBar>
            <RightMenuBar>
                <EditContainer />
            </RightMenuBar>
        </OverlayContainer>
    );
}

export default Overlay;