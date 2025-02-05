import React, { createContext, ReactNode, useContext, useState } from "react";
import { MenuItem } from "../features/menu/menuInterfaces";


interface UiContextType {
    isRegularModalOpen: boolean;
    setIsRegularModalOpen(value: boolean): void;
    toggleModel: () => void;
    selectedPizza:MenuItem|null;
    setSelectedPizza:React.Dispatch<React.SetStateAction<MenuItem|null>>;
    canCancel:boolean;
    setCanCancel:(x:boolean)=>void;
    canUpdate:boolean;
    setCanUpdate:(x:boolean)=>void;
    selectedEditOrder:number|null;
    setSelectedEditOrder:(x:number|null)=>void;
    editAction:"cancel"|"update"|null
    setEditAction:(x:"cancel"|"update"|null)=>void;
    user_id:string|null;
    setUser_id:(x:string|null)=>void;
    
}
const UiContext=createContext<UiContextType|undefined>(undefined);


function UiProvider({children}:{children:ReactNode}) {
    // const [isRegularModalOpen,setIsRegularModalOpen]=useState<boolean>(false);
    const [isRegularModalOpen,setIsRegularModalOpen]=useState<boolean>(true);
    function toggleModel():void {
        setIsRegularModalOpen(!isRegularModalOpen);
    }
    
    const [selectedPizza, setSelectedPizza] = useState<MenuItem | null>(null);
    // const [selectedEditOrder, setSelectedEditOrder] = useState<number|null>(73);
    // const [editAction, setEditAction] = useState<"cancel"|"update"|null>("cancel");
    // const [selectedEditOrder, setSelectedEditOrder] = useState<number|null>(82);
    const [selectedEditOrder, setSelectedEditOrder] = useState<number|null>(null);
    // const [editAction, setEditAction] = useState<"cancel"|"update"|null>("cancel");
    const [editAction, setEditAction] = useState<"cancel"|"update"|null>(null);
    const [user_id, setUser_id] = useState<string|null>(null);
    
    const [canCancel, setCanCancel] = useState(false);
    const [canUpdate,setCanUpdate] =useState<boolean>(false);


    
    const value={isRegularModalOpen,toggleModel,selectedPizza,setSelectedPizza,canCancel,setCanCancel,selectedEditOrder,setSelectedEditOrder,editAction,setEditAction,user_id,setUser_id,setIsRegularModalOpen,canUpdate,setCanUpdate}
    
    return <UiContext.Provider value={value}>{children}</UiContext.Provider>
}

function useUiContext() {
    const context = useContext(UiContext);
    if(context===undefined){
        throw new Error("UiContext was used outside of the ui provider");
    }
    return context;
}

export {UiProvider,useUiContext};