import {createContext, EventHandler, useContext} from "react";

export const BehaviourContext = createContext<Map<BasicBehaviourTypes, EventHandler<any>>>(new Map());

export type BehaviourMap<BehaviourTypes extends BasicBehaviourTypes> = Map<BehaviourTypes, EventHandler<any>>;

export interface BasicBehaviourTypes {
    BasicTypes?: "Continue" | "Return" | "Close" | "OK";
}
