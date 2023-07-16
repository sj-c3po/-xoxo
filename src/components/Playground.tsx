import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Cell } from './Cell.tsx';
import { initPlayground } from "../store/cellSlice.ts";

export function Playground() {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(initPlayground());
    }, [dispatch]) 

    const cells = useSelector(state => state.playground.cells)

    return (
        <div className="playground">
            {cells.map(cell => (
                <Cell key={cell.id} index={cell.id} name={cell.cellValue}/>
            ))}         
        </div>
    );
}

